import React, { useState } from 'react';
import { X, CheckCircle2, PawPrint, Heart, Shield, Home, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { Pet, AdoptionApplication } from '../types';

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPet: Pet | null;
  allPets: Pet[];
  onSelectPet: (pet: Pet) => void;
}

export const AdoptionModal: React.FC<AdoptionModalProps> = ({
  isOpen,
  onClose,
  selectedPet,
  allPets,
  onSelectPet
}) => {
  const [formData, setFormData] = useState<AdoptionApplication>({
    petId: selectedPet ? selectedPet.id : allPets[0]?.id || '',
    petName: selectedPet ? selectedPet.name : allPets[0]?.name || '',
    fullName: '',
    email: '',
    phone: '',
    city: '',
    housingType: 'casa',
    hasYard: 'si',
    hasOtherPets: 'no',
    familyAgrees: true,
    experienceNotes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  if (!isOpen) return null;

  const currentPet = allPets.find(p => p.id === (selectedPet?.id || formData.petId)) || allPets[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = 'HF-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(generatedId);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="adoption-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="adoption-modal-title"
      onClick={handleResetAndClose}
    >
      <div
        id="adoption-modal-content"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#2E7D32] text-white p-6 sm:p-7 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                Proceso de Adopción Responsable
              </span>
              <h2 id="adoption-modal-title" className="font-heading font-bold text-2xl sm:text-3xl">
                {isSubmitted ? '¡Solicitud Recibida!' : 'Formulario de Adopción'}
              </h2>
            </div>
          </div>

          <button
            id="btn-close-adoption-modal"
            onClick={handleResetAndClose}
            className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            aria-label="Cerrar formulario de adopción"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-[#2E7D32] rounded-full mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#263238]">
                  ¡Gracias por abrir tu corazón!
                </h3>
                <p className="text-gray-600 text-base max-w-md mx-auto">
                  Tu solicitud para adoptar a <strong className="text-[#2E7D32] font-bold">{currentPet?.name || 'tu nuevo compañero'}</strong> ha sido registrada exitosamente.
                </p>
              </div>

              {/* Reference ID card */}
              <div className="bg-[#F5F5F5] p-5 rounded-2xl max-w-md mx-auto border border-gray-200 text-left space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase">
                  <span>Código de Solicitud</span>
                  <span className="text-[#2E7D32]">Estado: En Revisión</span>
                </div>
                <p className="font-mono text-xl font-bold text-[#263238] tracking-wider">
                  {applicationId}
                </p>
                <p className="text-xs text-gray-600">
                  Un voluntario del equipo de Huellas Felices se pondrá en contacto contigo en un plazo de 24 a 48 horas al teléfono y correo proporcionados.
                </p>
              </div>

              {/* Next steps list */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl max-w-md mx-auto text-left text-xs sm:text-sm text-emerald-900 space-y-2 border border-emerald-100">
                <p className="font-bold flex items-center gap-1.5 text-[#2E7D32]">
                  <Shield className="w-4 h-4" /> Próximos pasos:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Entrevista telefónica breve de verificación de datos.</li>
                  <li>Cita para visita presencial en el refugio con {currentPet?.name}.</li>
                  <li>Firma del acta de compromiso y entrega de cartilla veterinaria.</li>
                </ul>
              </div>

              <button
                id="btn-finish-adoption-success"
                onClick={handleResetAndClose}
                className="px-8 py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-base shadow-md transition-all cursor-pointer"
              >
                Volver a la página principal
              </button>
            </div>
          ) : (
            /* Adoption Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Pet Selected Card */}
              <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-4 flex items-center gap-4">
                <img
                  src={currentPet.photo}
                  alt={currentPet.name}
                  className="w-16 h-16 rounded-xl object-cover border border-white shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <span className="text-xs font-semibold text-[#FF8A00] uppercase tracking-wide">Mascota seleccionada</span>
                  <h4 className="font-heading font-bold text-lg text-[#263238]">{currentPet.name}</h4>
                  <p className="text-xs text-gray-600">{currentPet.breed} • {currentPet.age}</p>
                </div>
                
                {/* Change pet dropdown */}
                <div>
                  <select
                    value={currentPet.id}
                    onChange={(e) => {
                      const found = allPets.find(p => p.id === e.target.value);
                      if (found) {
                        onSelectPet(found);
                        setFormData({ ...formData, petId: found.id, petName: found.name });
                      }
                    }}
                    className="text-xs bg-white font-semibold text-[#2E7D32] border border-[#2E7D32]/30 rounded-lg p-2 cursor-pointer focus:ring-2 focus:ring-[#2E7D32]"
                    aria-label="Cambiar mascota a adoptar"
                  >
                    {allPets.map((p) => (
                      <option key={p.id} value={p.id}>
                        Cambiar a: {p.name} ({p.species})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 1. Datos Personales */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-[#263238] border-b border-gray-100 pb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2E7D32]" />
                  1. Información del Solicitante
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="adopt-fullName" className="block text-sm font-semibold text-[#263238]">
                      Nombre completo *
                    </label>
                    <input
                      id="adopt-fullName"
                      type="text"
                      required
                      placeholder="Ej. Ana Martínez Silva"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-base focus:bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="adopt-email" className="block text-sm font-semibold text-[#263238]">
                      Correo electrónico *
                    </label>
                    <input
                      id="adopt-email"
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-base focus:bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="adopt-phone" className="block text-sm font-semibold text-[#263238]">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="adopt-phone"
                      type="tel"
                      required
                      placeholder="+34 600 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-base focus:bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="adopt-city" className="block text-sm font-semibold text-[#263238]">
                      Ciudad / Distrito *
                    </label>
                    <input
                      id="adopt-city"
                      type="text"
                      required
                      placeholder="Ej. Madrid / Centro"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-base focus:bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Entorno y Hogar */}
              <div className="space-y-4 pt-2">
                <h3 className="font-heading font-bold text-lg text-[#263238] border-b border-gray-100 pb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#FF8A00]" />
                  2. Entorno del Hogar
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="adopt-housing" className="block text-sm font-semibold text-[#263238]">
                      Tipo de vivienda
                    </label>
                    <select
                      id="adopt-housing"
                      value={formData.housingType}
                      onChange={(e) => setFormData({ ...formData, housingType: e.target.value as any })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-base focus:bg-white focus:border-[#2E7D32]"
                    >
                      <option value="casa">Casa propia</option>
                      <option value="departamento">Departamento / Piso</option>
                      <option value="finca">Casa de campo / Finca</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="adopt-yard" className="block text-sm font-semibold text-[#263238]">
                      ¿Cuenta con patio, jardín o terraza?
                    </label>
                    <select
                      id="adopt-yard"
                      value={formData.hasYard}
                      onChange={(e) => setFormData({ ...formData, hasYard: e.target.value as any })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-base focus:bg-white focus:border-[#2E7D32]"
                    >
                      <option value="si">Sí, patio o terraza segura</option>
                      <option value="no">No, paseos en exteriores</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="adopt-experience" className="block text-sm font-semibold text-[#263238]">
                    ¿Por qué deseas adoptar a {currentPet.name}? (Experiencia previa o mensaje)
                  </label>
                  <textarea
                    id="adopt-experience"
                    rows={3}
                    placeholder="Cuéntanos un poco sobre tu rutina y por qué crees que harían un gran equipo..."
                    value={formData.experienceNotes}
                    onChange={(e) => setFormData({ ...formData, experienceNotes: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-base focus:bg-white focus:border-[#2E7D32]"
                  />
                </div>
              </div>

              {/* 3. Declaración de compromiso */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                <input
                  id="adopt-agreement"
                  type="checkbox"
                  required
                  checked={formData.familyAgrees}
                  onChange={(e) => setFormData({ ...formData, familyAgrees: e.target.checked })}
                  className="mt-1 w-5 h-5 text-[#2E7D32] rounded-md border-gray-300 focus:ring-[#2E7D32] cursor-pointer"
                />
                <label htmlFor="adopt-agreement" className="text-xs sm:text-sm text-emerald-950 font-medium cursor-pointer">
                  Declaro que todos los miembros del hogar están de acuerdo con la adopción y me comprometo a brindarle atención veterinaria, alimentación de calidad y cariño de por vida.
                </label>
              </div>

              {/* Botón de Enviar Solicitud */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-submit-adoption-application"
                  className="w-full py-4 px-6 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-lg shadow-lg shadow-[#2E7D32]/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PawPrint className="w-5 h-5" />
                  <span>Enviar Solicitud de Adopción</span>
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  La postulación es totalmente gratuita y sin compromiso de compra.
                </p>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
