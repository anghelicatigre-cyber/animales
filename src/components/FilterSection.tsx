import React from 'react';
import { Search, RotateCcw, Filter, Sparkles, Dog, Cat, Layers } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onSearchSubmit: () => void;
  totalResults: number;
  activeFilterCount: number;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onSearchSubmit,
  totalResults,
  activeFilterCount
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section
      id="filtros-section"
      className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      aria-labelledby="filter-section-title"
    >
      <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/70 border border-gray-100 p-6 sm:p-8 transition-all">
        
        {/* Header & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-[#FF8A00] font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Filtro de compatibilidad</span>
            </div>
            <h2
              id="filter-section-title"
              className="font-heading font-bold text-2xl sm:text-3xl text-[#263238]"
            >
              Busca tu compañero ideal
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span
              id="filter-results-badge"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] font-semibold text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
              {totalResults} {totalResults === 1 ? 'mascota encontrada' : 'mascotas disponibles'}
            </span>

            {activeFilterCount > 0 && (
              <button
                id="btn-reset-filters"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer min-h-[36px]"
                aria-label="Restablecer todos los filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpiar ({activeFilterCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Form Row */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Especie */}
            <div className="space-y-1.5">
              <label
                htmlFor="filter-especie"
                className="block text-sm font-semibold text-[#263238]"
              >
                Especie
              </label>
              <div className="relative">
                <select
                  id="filter-especie"
                  value={filters.species}
                  onChange={(e) => onFilterChange({ species: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-[#263238] font-medium text-base focus:bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all cursor-pointer appearance-none"
                  aria-label="Filtrar por especie"
                >
                  <option value="">Todas las especies</option>
                  <option value="perro">🐕 Perro</option>
                  <option value="gato">🐈 Gato</option>
                  <option value="otros">🐇 Otros (Conejo, etc.)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <Filter className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 2. Tamaño */}
            <div className="space-y-1.5">
              <label
                htmlFor="filter-tamano"
                className="block text-sm font-semibold text-[#263238]"
              >
                Tamaño
              </label>
              <div className="relative">
                <select
                  id="filter-tamano"
                  value={filters.size}
                  onChange={(e) => onFilterChange({ size: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-[#263238] font-medium text-base focus:bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all cursor-pointer appearance-none"
                  aria-label="Filtrar por tamaño"
                >
                  <option value="">Todos los tamaños</option>
                  <option value="pequeño">Pequeño (&lt; 10 kg)</option>
                  <option value="mediano">Mediano (10 - 22 kg)</option>
                  <option value="grande">Grande (&gt; 22 kg)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 3. Edad */}
            <div className="space-y-1.5">
              <label
                htmlFor="filter-edad"
                className="block text-sm font-semibold text-[#263238]"
              >
                Edad
              </label>
              <div className="relative">
                <select
                  id="filter-edad"
                  value={filters.ageCategory}
                  onChange={(e) => onFilterChange({ ageCategory: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-[#263238] font-medium text-base focus:bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all cursor-pointer appearance-none"
                  aria-label="Filtrar por rango de edad"
                >
                  <option value="">Todas las edades</option>
                  <option value="cachorro">Cachorro (&lt; 1 año)</option>
                  <option value="joven">Joven (1 - 3 años)</option>
                  <option value="adulto">Adulto (3 - 7 años)</option>
                  <option value="senior">Senior (7+ años)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <Filter className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 4. Nivel de energía */}
            <div className="space-y-1.5">
              <label
                htmlFor="filter-energia"
                className="block text-sm font-semibold text-[#263238]"
              >
                Nivel de energía
              </label>
              <div className="relative">
                <select
                  id="filter-energia"
                  value={filters.energyLevel}
                  onChange={(e) => onFilterChange({ energyLevel: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-[#263238] font-medium text-base focus:bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all cursor-pointer appearance-none"
                  aria-label="Filtrar por nivel de energía"
                >
                  <option value="">Cualquier energía</option>
                  <option value="baja">Baja (Tranquilo / Sofá)</option>
                  <option value="media">Media (Paseos moderados)</option>
                  <option value="alta">Alta (Muy activo / Deporte)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <Filter className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

          {/* Quick Search bar + Submit Button Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            
            {/* Search by Name / Word */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="filter-search-input"
                type="text"
                value={filters.searchTerm}
                onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
                placeholder="Buscar por nombre o característica (ej. Luna, cariñoso, obediente)..."
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#F5F5F5] border border-gray-300 text-[#263238] font-normal text-base placeholder:text-gray-500 focus:bg-white focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                aria-label="Buscar por texto"
              />
              {filters.searchTerm && (
                <button
                  type="button"
                  onClick={() => onFilterChange({ searchTerm: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-semibold p-1"
                  aria-label="Borrar texto de búsqueda"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Green Submit Button: "Buscar mascota" */}
            <button
              type="submit"
              id="btn-submit-search"
              className="w-full sm:w-auto px-8 h-12 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-base shadow-md shadow-[#2E7D32]/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shrink-0"
              aria-label="Ejecutar búsqueda de mascota"
            >
              <Search className="w-5 h-5" />
              <span>Buscar mascota</span>
            </button>

          </div>

        </form>

        {/* Quick Filter Species Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-600">
          <span className="font-semibold text-gray-500">Accesos directos:</span>
          <button
            type="button"
            onClick={() => onFilterChange({ species: 'perro' })}
            className={`px-3 py-1 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              filters.species === 'perro'
                ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                : 'bg-gray-50 border-gray-200 hover:border-[#2E7D32] hover:text-[#2E7D32]'
            }`}
          >
            <Dog className="w-3.5 h-3.5" />
            <span>Perros rescatados</span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange({ species: 'gato' })}
            className={`px-3 py-1 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              filters.species === 'gato'
                ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                : 'bg-gray-50 border-gray-200 hover:border-[#2E7D32] hover:text-[#2E7D32]'
            }`}
          >
            <Cat className="w-3.5 h-3.5" />
            <span>Gatitos en adopción</span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange({ ageCategory: 'cachorro' })}
            className={`px-3 py-1 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              filters.ageCategory === 'cachorro'
                ? 'bg-[#FF8A00] text-white border-[#FF8A00]'
                : 'bg-gray-50 border-gray-200 hover:border-[#FF8A00] hover:text-[#FF8A00]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cachorritos</span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange({ ageCategory: 'senior' })}
            className={`px-3 py-1 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              filters.ageCategory === 'senior'
                ? 'bg-[#FF8A00] text-white border-[#FF8A00]'
                : 'bg-gray-50 border-gray-200 hover:border-[#FF8A00] hover:text-[#FF8A00]'
            }`}
          >
            <span>Seniors cariñosos</span>
          </button>
        </div>

      </div>
    </section>
  );
};
