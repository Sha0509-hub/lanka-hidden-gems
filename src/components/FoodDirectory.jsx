import React from 'react';
import { Utensils, MapPin, Clock, Star, ExternalLink, Flame } from 'lucide-react';
import { translations } from '../data/translations';

export default function FoodDirectory({ foodSpots, lang }) {
  const t = translations[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
          <Utensils className="w-4 h-4 text-amber-400" />
          <span>Authentic Sri Lankan Culinary</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {t.foodTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          {t.foodSub}
        </p>
      </div>

      {/* Grid of Food Spots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {foodSpots.map((spot) => (
          <div key={spot.id} className="glass-card rounded-3xl overflow-hidden border border-slate-800 flex flex-col sm:flex-row group">
            
            {/* Thumbnail */}
            <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
              <img
                src={spot.image}
                alt={spot.title[lang] || spot.title.en}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-amber-400 flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{spot.rating}</span>
              </div>
            </div>

            {/* Spot Content */}
            <div className="p-6 sm:w-3/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{spot.location}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {spot.title[lang] || spot.title.en}
                </h3>

                {/* Must Try Specialty */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-4">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wide mb-1 flex items-center space-x-1">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>{t.mustTry}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {spot.specialty[lang] || spot.specialty.en}
                  </p>
                </div>
              </div>

              {/* Bottom Footer Info */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{spot.openingHours}</span>
                </div>

                <a
                  href={spot.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs flex items-center space-x-1.5 transition-all"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
