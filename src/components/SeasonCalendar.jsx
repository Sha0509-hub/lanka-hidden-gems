import React, { useState } from 'react';
import { Calendar, Sun, CloudRain, Wind, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { translations } from '../data/translations';

export default function SeasonCalendar({ lang, gems, onSelectGem }) {
  const t = translations[lang];

  const months = [
    { name: 'January', siName: 'ජනවාරි', bestRegion: 'South & West Coast + Upcountry', monsoon: 'Dry Season (Sunny)' },
    { name: 'February', siName: 'පෙබරවාරි', bestRegion: 'South Coast & Hill Country', monsoon: 'Dry Season (Sunny)' },
    { name: 'March', siName: 'මාර්තු', bestRegion: 'Central Highlands & South Coast', monsoon: 'Inter-monsoon (Warm)' },
    { name: 'April', siName: 'අප්‍රේල්', bestRegion: 'All Island (Bak Maha Sunshine)', monsoon: 'Sunny & Mild Rains' },
    { name: 'May', siName: 'මැයි', bestRegion: 'East Coast (Trinco & Arugam Bay)', monsoon: 'South-West Monsoon starts' },
    { name: 'June', siName: 'ජූනි', bestRegion: 'East Coast & Cultural Triangle', monsoon: 'East Dry / West Wet' },
    { name: 'July', siName: 'ජූලි', bestRegion: 'Pasikudah & Jaffna Peninsula', monsoon: 'East Sunshine' },
    { name: 'August', siName: 'අගෝස්තු', bestRegion: 'Kandy & East Coast', monsoon: 'Kandy Perahera Season' },
    { name: 'September', siName: 'සැප්තැම්බර්', bestRegion: 'East & Cultural Triangle', monsoon: 'Inter-monsoon showers' },
    { name: 'October', siName: 'ඔක්තෝබර්', bestRegion: 'Upcountry Tea Trails', monsoon: 'Inter-monsoon Rains' },
    { name: 'November', siName: 'නොවැම්බර්', bestRegion: 'Southern Coastline', monsoon: 'North-East Monsoon starts' },
    { name: 'December', siName: 'දෙසැම්බර්', bestRegion: 'Galle & Mirissa Secret Bays', monsoon: 'South Coast Peak Sunshine' }
  ];

  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Monsoon & Climate Guide</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {t.seasonTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          {t.seasonSub}
        </p>
      </div>

      {/* Month Selector Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {months.map((m) => {
          const isSelected = selectedMonth.name === m.name;
          return (
            <button
              key={m.name}
              onClick={() => setSelectedMonth(m)}
              className={`p-3.5 rounded-2xl text-xs font-bold transition-all duration-200 border text-center ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <div>{lang === 'si' ? m.siName : m.name}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Month Forecast Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-teal-500/30 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
            {lang === 'si' ? 'තෝරාගත් මාසය' : 'Selected Month'}
          </span>
          <h3 className="text-3xl font-extrabold text-white mt-1">
            {lang === 'si' ? selectedMonth.siName : selectedMonth.name}
          </h3>
          <div className="flex items-center space-x-2 text-xs text-emerald-300 mt-2">
            <Sun className="w-4 h-4 text-amber-400" />
            <span>{selectedMonth.monsoon}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Recommended Region</span>
          <div className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{selectedMonth.bestRegion}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Climate Advice</span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'si'
              ? 'මෙම මාසයේ වැඩිපුරම අව්ව සහිත දේශගුණය පවතින ප්‍රදේශ තෝරාගෙන තිබේ.'
              : 'Ideal time for dry trail trekking and coastal swimming with minimal rainfall.'}
          </p>
        </div>
      </div>

      {/* Suggested Spots Grid */}
      <div>
        <h4 className="text-lg font-bold text-white mb-4">
          {lang === 'si' ? 'නිර්දේශිත Hidden Gems' : 'Recommended Gems for this Season'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gems.slice(0, 3).map((gem) => (
            <div
              key={gem.id}
              onClick={() => onSelectGem(gem)}
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer flex items-center space-x-3 group"
            >
              <img
                src={gem.image}
                alt={gem.title[lang] || gem.title.en}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h5 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {gem.title[lang] || gem.title.en}
                </h5>
                <span className="text-[11px] text-slate-400">{gem.district}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
