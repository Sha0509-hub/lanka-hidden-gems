import React from 'react';
import { Compass, Heart, Globe, Shield } from 'lucide-react';
import { translations } from '../data/translations';

export default function Footer({ lang, setLang }) {
  const t = translations[lang];

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 pt-12 pb-8 mt-20 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">{t.brandName}</span>
            </div>
            <p className="text-slate-300 max-w-md leading-relaxed">
              {t.subtitle}
            </p>
            <p className="text-emerald-400 font-medium">
              {t.footerText}
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {lang === 'si' ? 'ප්‍රධාන කොටස්' : 'Explorer Categories'}
            </h4>
            <ul className="space-y-2">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">{t.catWaterfall}</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">{t.catPeak}</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">{t.catBeach}</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">{t.catFood}</li>
            </ul>
          </div>

          {/* Language & Ethics */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {lang === 'si' ? 'භාෂාව & උපදෙස්' : 'Language & Ethics'}
            </h4>
            <button
              onClick={() => setLang(lang === 'si' ? 'en' : 'si')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300 font-bold flex items-center space-x-2 mb-3 hover:bg-slate-800 transition-all"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'si' ? 'Switch to English' : 'සිංහල භාෂාවට මාරුවන්න'}</span>
            </button>
            <p className="text-[11px] text-amber-300/80 leading-relaxed">
              🌿 Leave No Trace - Always protect Sri Lanka's rainforests, rivers, and community wildlife.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © {new Date().getFullYear()} {t.brandName}. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>{t.developedWith}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
