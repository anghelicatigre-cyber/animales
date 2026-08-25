import React, { useState, useEffect } from 'react';
import { X, Heart, ShieldCheck, Check, Sparkles, MapPin, Calendar, Activity, Users, Dog, Cat, ArrowRight } from 'lucide-react';
import { Pet } from '../types';

interface PetModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onAdopt: (pet: Pet) => void;
  isFavorite: boolean;
  onToggleFavorite: (petId: string) => void;
}

export const PetModal: React.FC<PetModalProps> = ({
  pet,
  isOpen,
  onClose,
  onAdopt,
  isFavorite,
  onToggleFavorite
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    setActivePhotoIdx(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, pet]);

  if (!isOpen || !pet) return null;

  const photos = pet.gallery && pet.gallery.length > 0 ? pet.gallery : [pet.photo];

  return (
    <div
      id="pet-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pet-modal-title"
      onClick={onClose}
    >
      <div
        id="pet-modal-content"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col sm:flex-row border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-pet-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          aria-label="Cerrar ventana de detalles"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full sm:w-1/2 bg-gray-900 flex flex-col relative">
          <div className="relative aspect-4/3 sm:aspect-auto sm:flex-1 overflow-hidden">
            <img
              src={photos[activePhotoIdx] || pet.photo}
              alt={`${pet.name} en el refugio Huellas Felices`}
              className="w-full h-full object-cover object-center transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                  {pet.species.toUpperCase()} • {pet.gender.toUpperCase()}
                </span>
                <h3 className="font-heading font-bold text-2xl text-white">
                  {pet.name}
                </h3>
              </div>

              <button
                id={`modal-fav-btn-${pet.id}`}
                onClick={() => onToggleFavorite(pet.id)}
                className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                aria-label="Marcar como favorito"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? 'fill-[#FF8A00] text-[#FF8A00]' : 'text-white'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="p-3 bg-stone-900/90 flex gap-2 overflow-x-auto">
              {photos.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhotoIdx(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activePhotoIdx === i ? 'border-[#FF8A00] scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Adoption Flow */}
        <div className="w-full sm:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            {/* Header / Basic Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <div>
                <p className="text-sm font-semibold text-[#2E7D32]">
                  {pet.breed}
                </p>
                <h2 id="pet-modal-title" className="font-heading font-extrabold text-3xl text-[#263238]">
                  {pet.name}
                </h2>
              </div>
              <span className="text-sm font-bold px-3 py-1.5 rounded-xl bg-orange-50 text-[#FF8A00] border border-orange-200">
                {pet.age} de edad
              </span>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 bg-[#F5F5F5] p-4 rounded-2xl text-sm">
              <div>
                <span className="text-gray-500 block text-xs">Tamaño & Peso</span>
                <span className="font-bold text-[#263238] capitalize">{pet.size} ({pet.weight})</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Nivel de Energía</span>
                <span className="font-bold text-[#263238] capitalize">{pet.energyLevel}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Ubicación en Refugio</span>
                <span className="font-medium text-[#263238] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                  {pet.location}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Fecha de Rescate</span>
                <span className="font-medium text-[#263238] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF8A00]" />
                  {pet.rescueDate}
                </span>
              </div>
            </div>

            {/* Historia / Personalidad */}
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-base text-[#263238] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF8A00]" />
                Historia de rescate y carácter
              </h4>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {pet.story}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {pet.personalityTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Estado de Salud y Convivencia */}
            <div className="space-y-3 pt-2">
              <h4 className="font-heading font-bold text-base text-[#263238] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                Salud y Compatibilidad
              </h4>
              
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Check className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Vacunas al día</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <Check className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Esterilizado/a</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <Check className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Desparasitado/a</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Users className="w-4 h-4 text-[#FF8A00] shrink-0" />
                  <span>{pet.goodWithKids ? 'Apto con niños' : 'Solo adultos'}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Dog className="w-4 h-4 text-[#FF8A00] shrink-0" />
                  <span>{pet.goodWithPets ? 'Sociable con animales' : 'Único en el hogar'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
            <button
              id={`modal-btn-adopt-${pet.id}`}
              onClick={() => {
                onClose();
                onAdopt(pet);
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-base shadow-lg shadow-[#2E7D32]/30 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
              aria-label={`Iniciar adopción de ${pet.name}`}
            >
              <span>¡Quiero adoptar a {pet.name}!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
