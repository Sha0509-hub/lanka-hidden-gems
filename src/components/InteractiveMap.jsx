import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Star, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { translations } from '../data/translations';

export default function InteractiveMap({ gems, lang, onSelectGem, currency }) {
  const t = translations[lang];
  const [activePin, setActivePin] = useState(gems[0]);

  // Map pin relative position generator for Sri Lanka topography map preview
  const getMapPosition = (gem) => {
    switch (gem.region) {
      case 'regUpcountry': return { top: '55%', left: '52%' };
      case 'regSouthern': return { top: '82%', left: '48%' };
      case 'regCentral': return { top: '42%', left: '48%' };
      case 'regSabaragamuwa': return { top: '65%', left: '40%' };
      case 'regUva': return { top: '60%', left: '65%' };
      case 'regNorthEast': return { top: '22%', left: '55%' };
      default: return { top: '50%', left: '50%' };
    }
  };

  const formatPrice = (lkrPrice) => {
    if (lkrPrice === 0) return lang === 'si' ? 'නොමිලේ (Free)' : 'Free';
    if (currency === 'USD') {
      return `$${Math.round(lkrPrice / 310)}`;
    }
    return `LKR ${lkrPrice.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-4">
          <Navigation className="w-4 h-4 text-teal-400" />
          <span>Interactive Sri Lanka Location Pins</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {t.navMap}
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          {lang === 'si' 
            ? 'සිතියමේ ස්ථාන Pin මත ක්ලික් කර ප්‍රදේශ සහ මාර්ග තොරතුරු පරීක්ෂා කරන්න.' 
            : 'Click on interactive spot pins across Sri Lankan mountain ranges, waterfalls, and coastal coves.'}
        </p>
      </div>

      {/* Map + Detail Panel Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Stylized Visual Map Canvas */}
        <div className="lg:col-span-2 relative h-[500px] sm:h-[600px] rounded-3xl glass-panel border border-teal-500/30 overflow-hidden shadow-2xl p-4 flex items-center justify-center">
          
          {/* Topography Map Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40" />
          
          {/* Island Contour Visual Canvas */}
          <div className="relative w-full max-w-md h-full flex items-center justify-center">
            
            {/* Sri Lanka Stylized Island Shape SVG */}
            <svg viewBox="0 0 300 450" className="w-full h-full opacity-20 filter drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <path
                d="M 150 30 C 200 40, 220 120, 240 220 C 250 280, 220 380, 160 420 C 110 430, 80 370, 70 290 C 60 210, 100 80, 150 30 Z"
                fill="#10b981"
                stroke="#34d399"
                strokeWidth="2"
              />
            </svg>

            {/* Render Interactive Pins */}
            {gems.map((gem) => {
              const pos = getMapPosition(gem);
              const isSelected = activePin?.id === gem.id;

              return (
                <div
                  key={gem.id}
                  onClick={() => setActivePin(gem)}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                >
                  <div className={`relative p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                    isSelected 
                      ? 'bg-amber-500 text-slate-950 scale-125 shadow-xl shadow-amber-500/50 ring-4 ring-amber-400/40' 
                      : 'bg-emerald-600/80 text-white hover:scale-110 hover:bg-emerald-500'
                  }`}>
                    <MapPin className="w-5 h-5" />
                    
                    {/* Ripple animation for selected */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-50 pointer-events-none" />
                    )}
                  </div>

                  {/* Pin Hover Name Label */}
                  <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 rounded-xl bg-slate-900/90 text-white text-[11px] font-bold whitespace-nowrap border border-slate-700 pointer-events-none transition-all ${
                    isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}>
                    {gem.title[lang] || gem.title.en}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Legend Footer */}
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-semibold">Selected Spot Pin</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Click any pin to inspect spot details
            </div>
          </div>

        </div>

        {/* Selected Pin Details Side Card */}
        {activePin && (
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl">
            
            {/* Image Thumbnail */}
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <img
                src={activePin.image}
                alt={activePin.title[lang] || activePin.title.en}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-amber-400 flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{activePin.rating}</span>
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activePin.district}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {activePin.title[lang] || activePin.title.en}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {activePin.description[lang] || activePin.description.en}
              </p>

              {/* Price & Season Badges */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Entry Fee</div>
                  <div className="text-xs font-bold text-teal-300">{formatPrice(activePin.entryFeeLkr)}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Best Time</div>
                  <div className="text-xs font-bold text-emerald-300">{activePin.bestTime}</div>
                </div>
              </div>

              {/* Open Modal CTA */}
              <button
                onClick={() => onSelectGem(activePin)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition-all"
              >
                <span>{t.viewDetails}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
