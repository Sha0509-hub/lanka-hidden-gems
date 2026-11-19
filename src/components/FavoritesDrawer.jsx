import React from 'react';
import { X, Trash2, MapPin, ArrowRight, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function FavoritesDrawer({ lang, isOpen, onClose, savedGems, toggleSave, onSelectGem }) {
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-teal-500/30 p-6 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <h3 className="text-lg font-bold text-white">{t.navFavorites}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                  {savedGems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of saved spots */}
            <div className="mt-6 space-y-3 max-h-[75vh] overflow-y-auto no-scrollbar">
              {savedGems.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  <p>{lang === 'si' ? 'ඔබ තවම කිසිදු ස්ථානයක් සුරැක නැත.' : 'No saved hidden gems yet.'}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'si' ? 'Card එකක ඇති Heart icon එක ක්ලික් කරන්න.' : 'Click the heart icon on any spot card to save it.'}
                  </p>
                </div>
              ) : (
                savedGems.map((gem) => (
                  <div key={gem.id} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3 group">
                    <img
                      src={gem.image}
                      alt={gem.title[lang] || gem.title.en}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                        {gem.title[lang] || gem.title.en}
                      </h4>
                      <div className="flex items-center space-x-1 text-[11px] text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{gem.district}</span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectGem(gem);
                        }}
                        className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center space-x-1 mt-1"
                      >
                        <span>{t.viewDetails}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => toggleSave(gem)}
                      className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer close button */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
