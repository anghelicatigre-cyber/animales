import React, { useState } from 'react';
import { X, User, Lock, Mail, PawPrint, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      id="login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onClick={onClose}
    >
      <div
        id="login-modal-content"
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="btn-close-login"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center cursor-pointer"
          aria-label="Cerrar modal de inicio de sesión"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center shadow-md">
            <PawPrint className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold text-[#FF8A00] tracking-wider">Comunidad Huellas Felices</span>
            <h3 id="login-modal-title" className="font-heading font-bold text-2xl text-[#263238]">
              {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </h3>
          </div>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
            <div className="w-14 h-14 bg-emerald-100 text-[#2E7D32] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="font-bold text-lg text-[#263238]">
              {isRegister ? '¡Cuenta creada con éxito!' : '¡Bienvenido de nuevo!'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nombre y Apellido</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-sm focus:bg-white focus:border-[#2E7D32]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-sm focus:bg-white focus:border-[#2E7D32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-sm focus:bg-white focus:border-[#2E7D32]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>{isRegister ? 'Registrarme' : 'Entrar a mi cuenta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-[#2E7D32] hover:underline font-semibold cursor-pointer"
              >
                {isRegister
                  ? '¿Ya tienes cuenta? Inicia sesión aquí'
                  : '¿No tienes cuenta aún? Regístrate gratis'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
