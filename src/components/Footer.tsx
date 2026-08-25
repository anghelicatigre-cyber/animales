import React, { useState } from 'react';
import { PawPrint, MapPin, Phone, Mail, Clock, Heart, Send, CheckCircle2, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdopt: () => void;
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAdopt,
  onOpenDonate,
  onOpenVolunteer
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="main-footer" className="bg-[#263238] text-white pt-16 pb-12 border-t border-stone-700" aria-label="Pie de página de Huellas Felices">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-700/80">
          
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white shadow-md">
                <PawPrint className="w-6 h-6" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Huellas <span className="text-[#FF8A00]">Felices</span>
              </span>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm">
              Refugio dedicado al rescate, rehabilitación y adopción responsable de animales en situación de abandono. Transformamos vidas mediante el amor y el respeto animal.
            </p>

            {/* Social Links with accessible labels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#FF8A00] hover:text-white text-gray-200 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Visitar nuestro Instagram de adopciones"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#2E7D32] hover:text-white text-gray-200 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Visitar nuestra página de Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-red-600 hover:text-white text-gray-200 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Visitar nuestro canal de YouTube con historias de rescate"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#FF8A00] hover:text-white text-gray-200 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Visitar nuestro perfil de X / Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Enlaces Rápidos (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-lg text-white border-b border-[#2E7D32] pb-1.5 inline-block">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-[#FF8A00] transition-colors py-1 block cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('filtros-section')}
                  className="hover:text-[#FF8A00] transition-colors py-1 block cursor-pointer"
                >
                  Adoptar Mascota
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDonate}
                  className="hover:text-[#FF8A00] transition-colors py-1 block cursor-pointer"
                >
                  Donaciones & Padrinazgo
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVolunteer}
                  className="hover:text-[#FF8A00] transition-colors py-1 block cursor-pointer"
                >
                  Voluntariado
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('nosotros-section')}
                  className="hover:text-[#FF8A00] transition-colors py-1 block cursor-pointer"
                >
                  Sobre Nosotros & Proceso
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacto & Refugio (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-lg text-white border-b border-[#2E7D32] pb-1.5 inline-block">
              Visítanos & Contacto
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                <span>Av. Los Rescatistas 450, Vía Verde, Sede Campestre Central</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-[#2E7D32] shrink-0" />
                <a href="tel:+34912345678" className="hover:text-white transition-colors">
                  +34 912 345 678 / +51 987 654 321
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-[#FF8A00] shrink-0" />
                <a href="mailto:adopciones@huellasfelices.org" className="hover:text-white transition-colors">
                  adopciones@huellasfelices.org
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                <span>Mar - Dom: 9:00 AM - 5:30 PM (Previa Cita)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Historias de Éxito (3.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-lg text-white border-b border-[#2E7D32] pb-1.5 inline-block">
              Historias & Novedades
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Recibe mensualmente historias de adopción inspiradoras y convocatorias para ferias de rescate.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-900/60 border border-[#2E7D32] rounded-xl flex items-center gap-2 text-emerald-200 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>¡Te has suscrito con éxito! Gracias por tu apoyo.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Tu correo electrónico..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2E7D32]"
                    aria-label="Correo para boletín mensual"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 h-9 px-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Suscribirme"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-gray-400 block">
                  Sin spam. Puedes desuscribirte cuando gustes.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Accessibility Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Huellas Felices. Todos los derechos reservados.</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Refugio Registrado</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-gray-300">
              Hecho con <Heart className="w-3.5 h-3.5 fill-[#FF8A00] text-[#FF8A00]" /> por los animales rescatados
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
