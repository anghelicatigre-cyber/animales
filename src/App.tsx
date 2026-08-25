import React, { useState, useMemo, useEffect } from 'react';
import { PETS_DATA } from './data/petsData';
import { Pet, FilterState } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterSection } from './components/FilterSection';
import { PetCard } from './components/PetCard';
import { PetModal } from './components/PetModal';
import { AdoptionModal } from './components/AdoptionModal';
import { DonationModal } from './components/DonationModal';
import { VolunteerModal } from './components/VolunteerModal';
import { LoginModal } from './components/LoginModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { PawPrint, Sparkles, Frown, Filter, Heart, ArrowUp } from 'lucide-react';

export default function App() {
  // State
  const [pets] = useState<Pet[]>(PETS_DATA);
  const [filters, setFilters] = useState<FilterState>({
    species: '',
    size: '',
    ageCategory: '',
    energyLevel: '',
    searchTerm: ''
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hf_favorites');
      return saved ? JSON.parse(saved) : ['luna-01', 'milo-03'];
    } catch {
      return ['luna-01', 'milo-03'];
    }
  });

  // Modal States
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Active section for navigation highlight
  const [activeSection, setActiveSection] = useState('inicio');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Persistence of favorites
  useEffect(() => {
    try {
      localStorage.setItem('hf_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Scroll listener for back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle Favorite
  const handleToggleFavorite = (petId: string) => {
    const isFav = favorites.includes(petId);
    const pet = pets.find(p => p.id === petId);
    if (isFav) {
      setFavorites(prev => prev.filter(id => id !== petId));
      showToast(`${pet?.name || 'Mascota'} eliminada de favoritos`);
    } else {
      setFavorites(prev => [...prev, petId]);
      showToast(`¡${pet?.name || 'Mascota'} guardada en tus favoritos! ❤️`);
    }
  };

  // Filter handlers
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      species: '',
      size: '',
      ageCategory: '',
      energyLevel: '',
      searchTerm: ''
    });
    showToast('Filtros restablecidos');
  };

  // Scroll to catalog when user submits search
  const handleSearchSubmit = () => {
    const catalogElement = document.getElementById('catalogo-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter logic
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      if (filters.species && pet.species !== filters.species) return false;
      if (filters.size && pet.size !== filters.size) return false;
      if (filters.ageCategory && pet.ageCategory !== filters.ageCategory) return false;
      if (filters.energyLevel && pet.energyLevel !== filters.energyLevel) return false;
      if (filters.searchTerm) {
        const query = filters.searchTerm.toLowerCase();
        const matchName = pet.name.toLowerCase().includes(query);
        const matchBreed = pet.breed.toLowerCase().includes(query);
        const matchTags = pet.personalityTags.some(t => t.toLowerCase().includes(query));
        const matchStory = pet.story.toLowerCase().includes(query);
        if (!matchName && !matchBreed && !matchTags && !matchStory) return false;
      }
      return true;
    });
  }, [pets, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.species) count++;
    if (filters.size) count++;
    if (filters.ageCategory) count++;
    if (filters.energyLevel) count++;
    if (filters.searchTerm) count++;
    return count;
  }, [filters]);

  const favoritePetsList = useMemo(() => {
    return pets.filter(p => favorites.includes(p.id));
  }, [pets, favorites]);

  // Open Handlers
  const handleViewProfile = (pet: Pet) => {
    setSelectedPet(pet);
    setIsPetModalOpen(true);
  };

  const handleOpenAdoptModal = (pet?: Pet) => {
    if (pet) {
      setSelectedPet(pet);
    } else if (!selectedPet && pets.length > 0) {
      setSelectedPet(pets[0]);
    }
    setIsAdoptModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'adoptar') {
      const el = document.getElementById('filtros-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'donaciones') {
      setIsDonationModalOpen(true);
    } else if (sectionId === 'voluntariado') {
      setIsVolunteerModalOpen(true);
    } else if (sectionId === 'nosotros') {
      const el = document.getElementById('nosotros-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] font-sans antialiased text-[#263238]">
      
      {/* 1. ENCABEZADO SUPERIOR */}
      <Header
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenAdopt={() => handleOpenAdoptModal()}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main className="flex-1">
        
        {/* 2. SECCIÓN HERO */}
        <HeroSection
          onScrollToCatalog={handleSearchSubmit}
          onOpenAdopt={() => handleNavigate('nosotros')}
        />

        {/* 3. SECCIÓN DE FILTROS */}
        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onSearchSubmit={handleSearchSubmit}
          totalResults={filteredPets.length}
          activeFilterCount={activeFilterCount}
        />

        {/* 4. CATÁLOGO DE MASCOTAS (Cuadrícula 3 Columnas) */}
        <section
          id="catalogo-section"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24"
          aria-labelledby="catalogo-heading"
        >
          {/* Catalog Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-[#2E7D32] font-semibold text-sm mb-1">
                <PawPrint className="w-4 h-4" />
                <span>Nuestros Amigos Rescatados</span>
              </div>
              <h2
                id="catalogo-heading"
                className="font-heading font-extrabold text-3xl sm:text-4xl text-[#263238] tracking-tight"
              >
                Mascotas esperando un hogar
              </h2>
            </div>
            
            <p className="text-gray-600 text-sm sm:text-base font-normal max-w-md">
              Todos nuestros animales se entregan 100% esterilizados, vacunados, desparasitados y con cartilla médica oficial.
            </p>
          </div>

          {/* Grid Layout: 3 Columns on desktop, 2 on tablet, 1 on mobile */}
          {filteredPets.length === 0 ? (
            <div
              id="empty-results-message"
              className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-2xl mx-auto my-8 space-y-4"
            >
              <div className="w-16 h-16 bg-orange-100 text-[#FF8A00] rounded-full mx-auto flex items-center justify-center">
                <Frown className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#263238]">
                No encontramos mascotas con esos filtros
              </h3>
              <p className="text-gray-600 text-base max-w-md mx-auto">
                Prueba ajustando la especie, el tamaño o el nivel de energía para ver más compañeros rescatados.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-base shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span>Restablecer filtros</span>
              </button>
            </div>
          ) : (
            <div
              id="pets-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  isFavorite={favorites.includes(pet.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onViewProfile={handleViewProfile}
                  onQuickAdopt={handleOpenAdoptModal}
                />
              ))}
            </div>
          )}

          {/* Quick Support Callout Banner */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF8A00] flex items-center justify-center shrink-0">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[#263238]">
                  ¿No puedes adoptar en este momento?
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Puedes amadrinar a uno de nuestros rescatados o ser voluntario en paseos de fin de semana.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FF8A00] hover:bg-[#E65100] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                Padrinazgo
              </button>
              <button
                onClick={() => setIsVolunteerModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                Ser Voluntario
              </button>
            </div>
          </div>

        </section>

        {/* Process & About Section */}
        <AboutSection
          onOpenAdopt={() => handleOpenAdoptModal()}
          onOpenVolunteer={() => setIsVolunteerModalOpen(true)}
          onOpenDonate={() => setIsDonationModalOpen(true)}
        />

      </main>

      {/* 5. PIE DE PÁGINA */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdopt={() => handleOpenAdoptModal()}
        onOpenDonate={() => setIsDonationModalOpen(true)}
        onOpenVolunteer={() => setIsVolunteerModalOpen(true)}
      />

      {/* MODALS */}
      <PetModal
        pet={selectedPet}
        isOpen={isPetModalOpen}
        onClose={() => setIsPetModalOpen(false)}
        onAdopt={(pet) => {
          setIsPetModalOpen(false);
          handleOpenAdoptModal(pet);
        }}
        isFavorite={selectedPet ? favorites.includes(selectedPet.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <AdoptionModal
        isOpen={isAdoptModalOpen}
        onClose={() => setIsAdoptModalOpen(false)}
        selectedPet={selectedPet}
        allPets={pets}
        onSelectPet={(pet) => setSelectedPet(pet)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />

      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoritePets={favoritePetsList}
        onRemoveFavorite={handleToggleFavorite}
        onViewProfile={handleViewProfile}
        onAdopt={handleOpenAdoptModal}
      />

      {/* Toast notification */}
      {toastMessage && (
        <div
          id="app-toast-notification"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#263238] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-sm font-medium border border-gray-700 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <PawPrint className="w-4 h-4 text-[#FF8A00]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back to top floating button */}
      {showBackToTop && (
        <button
          id="btn-back-to-top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Volver arriba de la página"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
