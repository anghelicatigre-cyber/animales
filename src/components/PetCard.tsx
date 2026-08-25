import React from 'react';
import { Heart, Activity, CheckCircle2, MapPin, Zap, AlertCircle } from 'lucide-react';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  isFavorite: boolean;
  onToggleFavorite: (petId: string) => void;
  onViewProfile: (pet: Pet) => void;
  onQuickAdopt: (pet: Pet) => void;
}

export const PetCard: React.FC<PetCardProps> = ({
  pet,
  isFavorite,
  onToggleFavorite,
  onViewProfile,
  onQuickAdopt
}) => {
  const getSpeciesEmoji = (species: string) => {
    switch (species) {
      case 'perro': return '🐕 Perro';
      case 'gato': return '🐈 Gato';
      default: return '🐇 Otros';
    }
  };

  const getEnergyBadge = (level: string) => {
    switch (level) {
      case 'alta':
        return { label: 'Energía Alta', bg: 'bg-orange-100 text-orange-800' };
      case 'media':
        return { label: 'Energía Media', bg: 'bg-emerald-100 text-emerald-800' };
      case 'baja':
        return { label: 'Energía Serena', bg: 'bg-blue-100 text-blue-800' };
      default:
        return { label: 'Energía Media', bg: 'bg-gray-100 text-gray-800' };
    }
  };

  const energyInfo = getEnergyBadge(pet.energyLevel);

  return (
    <article
      id={`pet-card-${pet.id}`}
      className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2E7D32]/30 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-[#2E7D32]"
      aria-labelledby={`pet-name-${pet.id}`}
    >
      {/* Photo Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        <img
          src={pet.photo}
          alt={`Fotografía de ${pet.name}, ${pet.breed}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Urgent Adoption Badge */}
        {pet.urgent && (
          <div className="absolute top-3 left-3 bg-[#FF8A00] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Adopción Prioritaria</span>
          </div>
        )}

        {/* Species & Gender Pill */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          <span className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
            {getSpeciesEmoji(pet.species)}
          </span>
          <span className="bg-white/90 backdrop-blur-md text-[#263238] text-xs font-semibold px-2.5 py-1 rounded-lg capitalize">
            {pet.gender}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          id={`fav-btn-${pet.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pet.id);
          }}
          className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          aria-label={isFavorite ? `Quitar a ${pet.name} de favoritos` : `Guardar a ${pet.name} en favoritos`}
          title={isFavorite ? 'En tus favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite
                ? 'fill-[#FF8A00] text-[#FF8A00]'
                : 'text-gray-600 hover:text-[#FF8A00]'
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Name & Age Row */}
          <div className="flex items-baseline justify-between gap-2">
            <h3
              id={`pet-name-${pet.id}`}
              className="font-heading font-extrabold text-2xl text-[#263238] group-hover:text-[#2E7D32] transition-colors"
            >
              {pet.name}
            </h3>
            <span className="text-sm font-semibold text-[#FF8A00] bg-orange-50 px-2.5 py-0.5 rounded-full whitespace-nowrap">
              {pet.age}
            </span>
          </div>

          {/* Breed & Location */}
          <p className="text-sm text-gray-600 font-medium line-clamp-1">
            {pet.breed}
          </p>

          {/* Short Story / Personality snippet */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {pet.story}
          </p>

          {/* Personality Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {pet.personalityTags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#F5F5F5] text-[#263238] font-medium px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${energyInfo.bg}`}>
              {energyInfo.label}
            </span>
          </div>
        </div>

        {/* Health status summary */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
            Esterilizado
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
            Vacunado
          </span>
          <span className="text-gray-400 capitalize">
            {pet.size}
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Botón Ver Perfil */}
          <button
            id={`btn-view-${pet.id}`}
            onClick={() => onViewProfile(pet)}
            className="w-full py-2.5 px-4 rounded-xl border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10 font-semibold text-sm transition-colors min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label={`Ver perfil completo de ${pet.name}`}
          >
            Ver perfil
          </button>

          {/* Botón Adoptar Directo */}
          <button
            id={`btn-adopt-${pet.id}`}
            onClick={() => onQuickAdopt(pet)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-sm shadow-sm transition-all min-h-[44px] flex items-center justify-center gap-1.5 cursor-pointer"
            aria-label={`Iniciar solicitud para adoptar a ${pet.name}`}
          >
            <span>Adoptar</span>
          </button>
        </div>

      </div>
    </article>
  );
};
