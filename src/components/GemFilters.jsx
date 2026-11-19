import React from 'react';
import { Filter, X, Droplets, Mountain, Landmark, Waves, Tent, Utensils } from 'lucide-react';
import { translations } from '../data/translations';

export default function GemFilters({ lang, selectedCategory, setSelectedCategory, selectedRegion, setSelectedRegion, selectedDifficulty, setSelectedDifficulty }) {
  const t = translations[lang];

  const categories = [
    { key: 'ALL', label: t.allCategories, icon: Filter },
    { key: 'catWaterfall', label: t.catWaterfall, icon: Droplets },
    { key: 'catPeak', label: t.catPeak, icon: Mountain },
    { key: 'catCave', label: t.catCave, icon: Landmark },
    { key: 'catBeach', label: t.catBeach, icon: Waves },
    { key: 'catCamping', label: t.catCamping, icon: Tent },
    { key: 'catFood', label: t.catFood, icon: Utensils }
  ];

  const regions = [
    { key: 'ALL', label: t.allRegions },
    { key: 'regUpcountry', label: t.regUpcountry },
    { key: 'regSouthern', label: t.regSouthern },
    { key: 'regCentral', label: t.regCentral },
    { key: 'regSabaragamuwa', label: t.regSabaragamuwa },
    { key: 'regUva', label: t.regUva },
    { key: 'regNorthEast', label: t.regNorthEast }
  ];

  const difficulties = [
    { key: 'ALL', label: t.allDifficulties },
    { key: 'diffEasy', label: t.diffEasy },
    { key: 'diffModerate', label: t.diffModerate },
    { key: 'diffHard', label: t.diffHard }
  ];

  const hasActiveFilters = selectedCategory !== 'ALL' || selectedRegion !== 'ALL' || selectedDifficulty !== 'ALL';

  const clearFilters = () => {
    setSelectedCategory('ALL');
    setSelectedRegion('ALL');
    setSelectedDifficulty('ALL');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      
      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/40 shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Dropdown Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Region Dropdown */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium focus:outline-none focus:border-emerald-500"
          >
            {regions.map((reg) => (
              <option key={reg.key} value={reg.key}>
                {reg.label}
              </option>
            ))}
          </select>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium focus:outline-none focus:border-emerald-500"
          >
            {difficulties.map((diff) => (
              <option key={diff.key} value={diff.key}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center space-x-1 hover:bg-rose-500/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
