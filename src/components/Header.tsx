import React, { useState, useEffect } from 'react';
import { PawPrint, Heart, Menu, X, User, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenAdopt: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLogin,
  onOpenAdopt,
  onNavigate,
  activeSection,
  favoritesCount,
  onOpenFavorites
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'adoptar', label: 'Adoptar' },
    { id: 'donaciones', label: 'Donaciones' },
    { id: 'voluntariado', label: 'Voluntariado' },
    { id: 'nosotros', label: 'Nosotros' }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white shadow-xs py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button
            id="header-logo-btn"
            onClick={() => handleItemClick('inicio')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="Ir al inicio de Huellas Felices"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-white shadow-md shadow-[#2E7D32]/20 group-hover:bg-[#1B5E20] transition-colors">
              <PawPrint className="w-6 h-6 transition-transform group-hover:scale-110" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-[#263238] block leading-none">
                Huellas <span className="text-[#FF8A00]">Felices</span>
              </span>
              <span className="text-xs font-medium text-gray-500 tracking-wide">
                Refugio & Adopción Responsable
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Navegación principal"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-[16px] transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${
                    isActive
                      ? 'text-[#2E7D32] bg-[#2E7D32]/10 font-semibold'
                      : 'text-[#263238] hover:text-[#2E7D32] hover:bg-gray-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Iniciar Sesión + ¡Adopta! */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Favorites Counter Button */}
            <button
              id="header-fav-btn"
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl text-gray-600 hover:text-[#FF8A00] hover:bg-orange-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label={`Ver mascotas favoritas (${favoritesCount})`}
              title="Mascotas guardadas en favoritos"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-[#FF8A00] text-[#FF8A00]' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF8A00] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Iniciar Sesión */}
            <button
              id="btn-login"
              onClick={onOpenLogin}
              className="px-4 py-2.5 rounded-xl border border-gray-300 font-medium text-[#263238] text-[16px] hover:border-[#2E7D32] hover:text-[#2E7D32] transition-colors min-h-[44px] flex items-center gap-2 cursor-pointer"
              aria-label="Iniciar sesión en la plataforma"
            >
              <User className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </button>

            {/* Botón Destacado Verde ¡Adopta! */}
            <button
              id="btn-adopta-primary"
              onClick={onOpenAdopt}
              className="px-6 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-[16px] shadow-md shadow-[#2E7D32]/25 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center gap-2 cursor-pointer"
              aria-label="Abrir formulario de adopción directa"
            >
              <PawPrint className="w-5 h-5" />
              <span>¡Adopta!</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-fav-btn"
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Favoritos"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-[#FF8A00] text-[#FF8A00]' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute 0 top-0 right-0 bg-[#FF8A00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#263238] hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="sm:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium text-[16px] min-h-[44px] flex items-center justify-between ${
                activeSection === item.id
                  ? 'bg-[#2E7D32]/10 text-[#2E7D32] font-semibold'
                  : 'text-[#263238] hover:bg-gray-100'
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.id && <span className="w-2 h-2 rounded-full bg-[#2E7D32]"></span>}
            </button>
          ))}

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              id="mobile-login-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-3 px-4 rounded-xl border border-gray-300 text-center font-medium text-[#263238] min-h-[44px] flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </button>

            <button
              id="mobile-adopta-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdopt();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#2E7D32] text-white text-center font-semibold min-h-[44px] flex items-center justify-center gap-2 shadow-md"
            >
              <PawPrint className="w-5 h-5" />
              <span>¡Adopta!</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
