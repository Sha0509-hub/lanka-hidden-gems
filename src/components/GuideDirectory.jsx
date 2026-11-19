import React from 'react';
import { UserCheck, Star, PhoneCall, ShieldCheck, Languages, Award } from 'lucide-react';
import { translations } from '../data/translations';

export default function GuideDirectory({ guides, lang }) {
  const t = translations[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>Sustainable Tourism Directory</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {t.guidesTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          {t.guidesSub}
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div key={guide.id} className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between group">
            <div>
              
              {/* Header Profile */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-700 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
                  {guide.avatar}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {guide.name}
                  </h3>
                  <div className="text-xs text-emerald-300 font-semibold">
                    {guide.role[lang] || guide.role.en}
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Experience</div>
                  <div className="text-xs font-extrabold text-white">{guide.experienceYears} Years</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Rating</div>
                  <div className="text-xs font-extrabold text-amber-400 flex items-center justify-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{guide.rating}</span>
                  </div>
                </div>
              </div>

              {/* Services offered */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 mb-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Services</div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {guide.services[lang] || guide.services.en}
                </p>
              </div>

              {/* Languages spoken */}
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
                <Languages className="w-4 h-4 text-cyan-400" />
                <span>{guide.languages.join(' • ')}</span>
              </div>
            </div>

            {/* Direct Contact Button */}
            <a
              href={`tel:${guide.phone}`}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center justify-center space-x-2 shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.contactGuide}: {guide.phone}</span>
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
