import React, { useState, useEffect } from 'react';
import { Search, Sparkles, MapPin, Compass, Flame, Users, Layers } from 'lucide-react';
import { translations } from '../data/translations';

export default function Hero({ lang, searchTerm, setSearchTerm, gemsCount, foodCount, routesCount }) {
  const t = translations[lang];

  const backgroundImages = [
    '/images/secret_waterfall.jpg',
    '/images/misty_peak.jpg',
    '/images/hidden_beach.jpg',
    '/images/village_food.jpg'
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl mb-10 mx-4 sm:mx-6 lg:mx-8 border border-teal-500/20 shadow-2xl">
      
      {/* Dynamic Photo Carousel Background */}
      {backgroundImages.map((img, idx) => (
        <div
          key={img}
          style={{ backgroundImage: `url(${img})` }}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            idx === currentBgIndex ? 'opacity-35 scale-105' : 'opacity-0 scale-100'
          }`}
        />
      ))}

      {/* Dark Ambient Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-[#0b131e]" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-6 animate-glow backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{t.tagline}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
          {lang === 'si' ? (
            <>
              ලංකාවේ අඩුවෙන් දන්න <br className="hidden sm:inline" />
              <span className="text-gradient-emerald">ලස්සන රහස් තැන්</span> එකම තැනකින්
            </>
          ) : (
            <>
              Uncover Sri Lanka's Most <br className="hidden sm:inline" />
              <span className="text-gradient-emerald">Breathtaking Secret Gems</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md">
          {t.subtitle}
        </p>

        {/* Unified Search Input */}
        <div className="max-w-2xl mx-auto relative mb-12">
          <div className="glass-panel p-2 rounded-2xl shadow-2xl flex items-center border border-teal-500/40 focus-within:border-emerald-400 transition-all backdrop-blur-xl">
            <div className="p-3 text-emerald-400">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent border-none text-white text-sm sm:text-base placeholder-slate-400 focus:outline-none px-2"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="px-3 py-1 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Community Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-card p-4 rounded-2xl text-center border border-slate-800 backdrop-blur-md">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-white">{gemsCount}+</div>
            <div className="text-xs text-slate-300 font-semibold">{t.statGems}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl text-center border border-slate-800 backdrop-blur-md">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-white">{foodCount}+</div>
            <div className="text-xs text-slate-300 font-semibold">{t.statFood}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl text-center border border-slate-800 backdrop-blur-md">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-white">{routesCount}+</div>
            <div className="text-xs text-slate-300 font-semibold">{t.statRoutes}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl text-center border border-slate-800 backdrop-blur-md">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-white">1,240+</div>
            <div className="text-xs text-slate-300 font-semibold">{t.statCommunity}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
