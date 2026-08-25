import React from 'react';
import { X, Heart, Trash2, PawPrint, ArrowRight } from 'lucide-react';
import { Pet } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoritePets: Pet[];
  onRemoveFavorite: (id: string) => void;
  onViewProfile: (pet: Pet) => void;
  onAdopt: (pet: Pet) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoritePets,
  onRemoveFavorite,
  onViewProfile,
  onAdopt
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="favorites-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="favorites-drawer-content"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-[#F5F5F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 fill-[#FF8A00] text-[#FF8A00]" />
            <h3 className="font-heading font-bold text-xl text-[#263238]">
              Mis Favoritos ({favoritePets.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
            aria-label="Cerrar favoritos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Favorite Pets */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {favoritePets.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-gray-500">
              <Heart className="w-12 h-12 mx-auto text-gray-300 stroke-1" />
              <p className="font-medium text-base text-[#263238]">Aún no tienes favoritos guardados</p>
              <p className="text-xs max-w-xs mx-auto">
                Haz clic en el corazón de cualquier tarjeta de mascota para tenerlos a mano mientras decides.
              </p>
            </div>
          ) : (
            favoritePets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white border border-gray-200 rounded-2xl p-3 flex items-center gap-3 hover:border-[#2E7D32] transition-colors"
              >
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="w-16 h-16 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-base text-[#263238] truncate">{pet.name}</h4>
                  <p className="text-xs text-gray-500 capitalize">{pet.species} • {pet.age}</p>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => {
                        onClose();
                        onViewProfile(pet);
                      }}
                      className="text-xs text-[#2E7D32] font-semibold hover:underline cursor-pointer"
                    >
                      Ver perfil
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        onClose();
                        onAdopt(pet);
                      }}
                      className="text-xs text-[#FF8A00] font-semibold hover:underline cursor-pointer"
                    >
                      Adoptar
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFavorite(pet.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Quitar de favoritos"
                  aria-label={`Eliminar a ${pet.name} de favoritos`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoritePets.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-[#F5F5F5]">
            <button
              onClick={() => {
                onClose();
                onAdopt(favoritePets[0]);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PawPrint className="w-4 h-4" />
              <span>Solicitar adopción de {favoritePets[0].name}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
