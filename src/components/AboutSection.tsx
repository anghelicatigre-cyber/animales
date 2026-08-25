import React from 'react';
import { Search, FileCheck, Heart, Home, ShieldCheck, Stethoscope, Sparkles, Award } from 'lucide-react';

interface AboutSectionProps {
  onOpenAdopt: () => void;
  onOpenVolunteer: () => void;
  onOpenDonate: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenAdopt,
  onOpenVolunteer,
  onOpenDonate
}) => {
  const steps = [
    {
      number: '1',
      title: 'Explora y Elige',
      description: 'Revisa nuestro catálogo interactivo y encuentra a la mascota cuyo tamaño, energía y personalidad coincidan con tu estilo de vida.',
      icon: Search,
      color: 'bg-emerald-100 text-[#2E7D32]'
    },
    {
      number: '2',
      title: 'Completa la Solicitud',
      description: 'Llena nuestro formulario digital gratuito con datos sobre tu hogar y experiencia. Evaluamos la compatibilidad con total dedicación.',
      icon: FileCheck,
      color: 'bg-orange-100 text-[#FF8A00]'
    },
    {
      number: '3',
      title: 'Conoce a tu Mascota',
      description: 'Coordinamos una visita presencial en nuestro refugio para que compartas momentos de juego y sientas esa conexión única.',
      icon: Heart,
      color: 'bg-emerald-100 text-[#2E7D32]'
    },
    {
      number: '4',
      title: 'Bienvenido a Casa',
      description: 'Firmamos el acta de adopción responsable y te entregamos su carnet de vacunación completo, microchip y guía de adaptación.',
      icon: Home,
      color: 'bg-orange-100 text-[#FF8A00]'
    }
  ];

  return (
    <section id="nosotros-section" className="py-16 sm:py-20 bg-white border-t border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] font-semibold text-sm mb-3">
            <Sparkles className="w-4 h-4 text-[#FF8A00]" />
            <span>Adopción Transparente & Segura</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#263238] tracking-tight">
            ¿Cómo es el proceso de adopción?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
            En Huellas Felices cuidamos cada detalle para asegurar que tanto la mascota como tu familia vivan una experiencia llena de amor y armonía.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#F5F5F5] rounded-2xl p-6 sm:p-7 border border-gray-200/80 hover:border-[#2E7D32] hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center font-heading font-bold text-lg shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading font-black text-3xl text-gray-300 group-hover:text-[#2E7D32]/40 transition-colors">
                      0{step.number}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#263238] group-hover:text-[#2E7D32] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shelter Mission & Commitment Banner */}
        <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-[#2E7D32]/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
                Nuestro Compromiso Veterinario
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Cada rescatado recibe atención médica integral y amor sin límites
              </h3>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-2xl">
                Nuestro refugio cuenta con áreas abiertas libres de jaulas, programa de enriquecimiento ambiental y seguimiento etológico para que los animales superen cualquier trauma de abandono.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm font-semibold text-emerald-100">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Protocolo de vacunación séxtuple</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                  <Stethoscope className="w-4 h-4 text-emerald-300" />
                  <span>Esterilización temprana garantizada</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={onOpenAdopt}
                className="w-full py-3.5 px-6 rounded-xl bg-[#FF8A00] hover:bg-[#E65100] text-white font-bold text-base shadow-md transition-all hover:scale-[1.02] cursor-pointer text-center"
              >
                Comenzar proceso de adopción
              </button>

              <button
                onClick={onOpenVolunteer}
                className="w-full py-3.5 px-6 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-base border border-white/30 backdrop-blur-xs transition-all cursor-pointer text-center"
              >
                Sumarme como voluntario
              </button>

              <button
                onClick={onOpenDonate}
                className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all cursor-pointer text-center"
              >
                Hacer una donación
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
