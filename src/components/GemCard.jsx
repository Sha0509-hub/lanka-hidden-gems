import React from 'react';
import { Star, MapPin, Heart, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';
import { translations } from '../data/translations';

export default function GemCard({ gem, lang, onSelectGem, isSaved, toggleSave, currency }) {
  const t = translations[lang];

  const getDifficultyColor = (diffKey) => {
    switch (diffKey) {
      case 'diffEasy': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'diffModerate': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'diffHard': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  const formatFee = (lkrFee) => {
    if (!lkrFee || lkrFee === 0) return lang === 'si' ? 'නොමිලේ' : 'Free';
    if (currency === 'USD') {
      return `$${Math.round(lkrFee / 310)}`;
    }
    return `LKR ${lkrFee.toLocaleString()}`;
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between group shadow-xl">
      
      {/* Image Thumbnail Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={gem.image}
          alt={gem.title[lang] || gem.title.en}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${getDifficultyColor(gem.difficulty)}`}>
            {t[gem.difficulty]}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(gem);
            }}
            className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-slate-700/50 transition-all hover:scale-110"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`} />
          </button>
        </div>

        {/* Rating & Fee Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-xs font-semibold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{gem.rating}</span>
            <span className="text-slate-400 text-[10px]">({gem.reviewsCount})</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-teal-950/90 text-teal-300 border border-teal-500/40 text-[11px] font-extrabold backdrop-blur-md">
            {formatFee(gem.entryFeeLkr)}
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{gem.district}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{t[gem.category]}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-300 transition-colors">
            {gem.title[lang] || gem.title.en}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
            {gem.description[lang] || gem.description.en}
          </p>
        </div>

        {/* Bottom Details Footer */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[11px] text-emerald-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.verifiedSpot}</span>
          </div>

          <button
            onClick={() => onSelectGem(gem)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all group-hover:translate-x-0.5"
          >
            <span>{t.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
