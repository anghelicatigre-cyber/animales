import React, { useState } from 'react';
import { X, Heart, Gift, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number>(20);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donationType, setDonationType] = useState<'once' | 'monthly'>('once');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const presets = [10, 20, 50, 100];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  return (
    <div
      id="donation-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
      onClick={onClose}
    >
      <div
        id="donation-modal-content"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="btn-close-donation"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center cursor-pointer"
          aria-label="Cerrar modal de donación"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-orange-100 text-[#FF8A00] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-[#263238]">
              ¡Muchas gracias por tu aporte!
            </h3>
            <p className="text-gray-600 text-sm">
              Tu contribución de <strong>${finalAmount}</strong> permite comprar alimento balanceado y medicinas veterinarias para nuestros rescatados.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-[#2E7D32] text-white font-bold cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF8A00] flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#FF8A00] tracking-wider">Apoya al refugio</span>
                <h3 id="donation-modal-title" className="font-heading font-bold text-2xl text-[#263238]">
                  Donaciones para Huellas Felices
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Cada aporte se destina al 100% en esterilizaciones, cirugías de emergencia, alimento y mantenimiento de las instalaciones.
            </p>

            {/* Type selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5F5F5] rounded-xl text-sm font-semibold">
              <button
                type="button"
                onClick={() => setDonationType('once')}
                className={`py-2.5 rounded-lg transition-all cursor-pointer ${
                  donationType === 'once' ? 'bg-white text-[#2E7D32] shadow-xs' : 'text-gray-600'
                }`}
              >
                Aporte único
              </button>
              <button
                type="button"
                onClick={() => setDonationType('monthly')}
                className={`py-2.5 rounded-lg transition-all cursor-pointer ${
                  donationType === 'monthly' ? 'bg-white text-[#2E7D32] shadow-xs' : 'text-gray-600'
                }`}
              >
                Padrino mensual ❤️
              </button>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setAmount(p);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-xl font-bold text-base border transition-all cursor-pointer ${
                    amount === p && !customAmount
                      ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                      : 'border-gray-200 text-[#263238] hover:border-[#2E7D32]'
                  }`}
                >
                  ${p}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div>
              <label htmlFor="custom-donation-input" className="block text-xs font-bold text-gray-600 mb-1">
                O ingresa otro monto ($ USD)
              </label>
              <input
                id="custom-donation-input"
                type="number"
                min="1"
                placeholder="Ej. 75"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-base font-semibold focus:bg-white focus:border-[#2E7D32]"
              />
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Transacciones seguras y transparentes con comprobante deducible.</span>
            </div>

            <button
              type="submit"
              id="btn-confirm-donation"
              className="w-full py-3.5 px-6 rounded-xl bg-[#FF8A00] hover:bg-[#E65100] text-white font-bold text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Donar ${finalAmount || 20} {donationType === 'monthly' ? '/ mes' : ''}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
