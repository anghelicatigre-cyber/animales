import React from 'react';
import { ArrowDown, Heart, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface HeroSectionProps {
  onScrollToCatalog: () => void;
  onOpenAdopt: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToCatalog,
  onOpenAdopt
}) => {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-stone-900 text-white min-h-[560px] lg:min-h-[620px] flex items-center"
      aria-labelledby="hero-title"
    >
      {/* Background Image with optimized blur and high-contrast dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80"
          alt="Perros y gatos felices jugando juntos en un jardín soleado"
          className="w-full h-full object-cover object-center scale-105 filter blur-[2px]"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer gradient overlay for WCAG 2.1 compliance (>4.5:1 text contrast) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60 backdrop-brightness-75" />
        <div className="absolute inset-0 bg-[#1B5E20]/25 mix-blend-multiply" />
      </div>

      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#FF8A00]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/10 w-96 h-96 bg-[#2E7D32]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="max-w-3xl">
          
          {/* Badge */}
          <div
            id="hero-badge"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-amber-300 text-sm sm:text-base font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#FF8A00]" />
            <span>Refugio sin fines de lucro • Adopciones transparentes</span>
          </div>

          {/* Título Principal */}
          <h1
            id="hero-title"
            className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight sm:leading-tight mb-6"
          >
            Dales un hogar, <br className="hidden sm:inline" />
            <span className="text-[#FF8A00] drop-shadow-sm">cambia una vida</span>
          </h1>

          {/* Subtítulo */}
          <p
            id="hero-subtitle"
            className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-normal leading-relaxed mb-8 max-w-2xl text-balance"
          >
            Encuentra a tu compañero fiel entre nuestros animales rescatados. Cada mirada es una segunda oportunidad de amar.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            
            {/* Botón Principal Grande Verde */}
            <button
              id="hero-btn-catalog"
              onClick={onScrollToCatalog}
              className="px-8 py-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-lg shadow-xl shadow-[#2E7D32]/40 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[52px] flex items-center justify-center gap-3 cursor-pointer group"
              aria-label="Ver todas las mascotas disponibles para adopción"
            >
              <span>Ver todas las mascotas</span>
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </button>

            {/* Botón Secundario */}
            <button
              id="hero-btn-how-to-adopt"
              onClick={onOpenAdopt}
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-lg border border-white/30 backdrop-blur-md transition-all min-h-[52px] flex items-center justify-center gap-2 cursor-pointer"
              aria-label="Conocer el proceso de adopción responsable"
            >
              <Heart className="w-5 h-5 text-[#FF8A00]" />
              <span>¿Cómo funciona?</span>
            </button>
          </div>

          {/* Trust Metrics / Badges */}
          <div
            id="hero-trust-metrics"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/80 flex items-center justify-center text-white shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-snug">100% Sanitizados</p>
                <p className="text-gray-300 text-xs">Vacunados y desparasitados</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF8A00]/80 flex items-center justify-center text-white shrink-0">
                <Award className="w-5 h-5 text-yellow-200" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-snug">+480 Adopciones</p>
                <p className="text-gray-300 text-xs">Familias felices unidas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                <Heart className="w-5 h-5 text-pink-300" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-snug">Acompañamiento</p>
                <p className="text-gray-300 text-xs">Asesoría veterinaria continua</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
