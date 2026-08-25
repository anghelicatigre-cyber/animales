import React, { useState } from 'react';
import { X, Users, HeartHandshake, CheckCircle2, Calendar, Sparkles } from 'lucide-react';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState('paseos');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      id="volunteer-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="volunteer-modal-title"
      onClick={onClose}
    >
      <div
        id="volunteer-modal-content"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="btn-close-volunteer"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center cursor-pointer"
          aria-label="Cerrar modal de voluntariado"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-[#2E7D32] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-[#263238]">
              ¡Bienvenido a la manada!
            </h3>
            <p className="text-gray-600 text-sm">
              Hemos recibido tu postulación para voluntariado. Te contactaremos para coordinar tu inducción este fin de semana en el refugio.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-[#2E7D32] text-white font-bold cursor-pointer"
            >
              Entendido
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#2E7D32] tracking-wider">Únete al equipo</span>
                <h3 id="volunteer-modal-title" className="font-heading font-bold text-2xl text-[#263238]">
                  Voluntariado Huellas Felices
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Dona un par de horas a la semana paseando perros, socializando gatitos o ayudando en eventos de adopción.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nombre completo</label>
                <input required type="text" placeholder="Ej. Carlos Mendoza" className="w-full h-11 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-sm focus:bg-white focus:border-[#2E7D32]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp de contacto</label>
                <input required type="tel" placeholder="+34 611 222 333" className="w-full h-11 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-sm focus:bg-white focus:border-[#2E7D32]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Área de interés</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-sm focus:bg-white focus:border-[#2E7D32]"
                >
                  <option value="paseos">Paseos y juego con perros</option>
                  <option value="gatil">Cuidado y cepillado en módulo felino</option>
                  <option value="ferias">Ferias de adopción y difusión</option>
                  <option value="fotografia">Fotografía y redes sociales</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              <span>Quiero ser voluntario</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
