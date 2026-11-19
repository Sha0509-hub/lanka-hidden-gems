import React, { useState } from 'react';
import { Shield, Phone, Volume2, AlertTriangle, CloudRain, ShieldCheck, Check } from 'lucide-react';
import { translations } from '../data/translations';

export default function TravelToolkit({ lang }) {
  const t = translations[lang];

  const [activeSpeech, setActiveSpeech] = useState(null);

  const phrases = [
    { si: "ආයුබෝවන්", phonetic: "Ayubowan", en: "May you live long (Greeting)" },
    { si: "ස්තූතියි", phonetic: "Stuthiyi", en: "Thank you" },
    { si: "කොහෙද තියෙන්නේ?", phonetic: "Koheda thiyenne?", en: "Where is it located?" },
    { si: "කෑම ගොඩක් රසයි!", phonetic: "Kaama godak rasayi!", en: "The food is very delicious!" },
    { si: "ගාන කීයද?", phonetic: "Gaana keeyada?", en: "How much does it cost?" },
    { si: "සැර අඩු කරන්න", phonetic: "Saara adu karanna", en: "Make it less spicy please" },
    { si: "වතුර තියෙනවද?", phonetic: "Wathura thiyenawada?", en: "Do you have drinking water?" },
    { si: "උදව් කරන්න පුළුවන්ද?", phonetic: "Udaw karanna puluwanda?", en: "Can you please help me?" }
  ];

  const speakPhrase = (text) => {
    setActiveSpeech(text);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'si-LK';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setActiveSpeech(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Traveler Emergency & Phrasebook</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {t.toolkitTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Essential emergency contacts, leech safety tips, monsoon weather advice, and audio Sinhala phrasebook for travelers.
        </p>
      </div>

      {/* Emergency Hotlines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-rose-500/30 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
            <Phone className="w-6 h-6" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase">Tourist Police</div>
          <div className="text-2xl font-black text-rose-400 my-1">1912</div>
          <a href="tel:1912" className="text-[11px] font-bold text-rose-300 underline">Dial 1912</a>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-amber-500/30 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Phone className="w-6 h-6" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase">Suwa Seriya Ambulance</div>
          <div className="text-2xl font-black text-amber-400 my-1">1990</div>
          <a href="tel:1990" className="text-[11px] font-bold text-amber-300 underline">Dial 1990</a>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Phone className="w-6 h-6" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase">Police Emergency</div>
          <div className="text-2xl font-black text-cyan-400 my-1">119</div>
          <a href="tel:119" className="text-[11px] font-bold text-cyan-300 underline">Dial 119</a>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Phone className="w-6 h-6" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase">Disaster Management</div>
          <div className="text-2xl font-black text-emerald-400 my-1">117</div>
          <a href="tel:117" className="text-[11px] font-bold text-emerald-300 underline">Dial 117</a>
        </div>

      </div>

      {/* Safety Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Leech & Jungle Trail Protection */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Leech & Jungle Trail Protection</h3>
              <p className="text-xs text-slate-400">High-altitude tea estates & wet rainforest hikes</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Wear leech socks (කූඩැළු මේස්) soaked in eucalyptus oil or salt solution.</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Carry a small pouch of salt or soap paste to detach leeches easily without skin irritation.</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Stay on marked trails in Knuckles & Sinharaja rainforests; avoid walking into wet grass.</span>
            </li>
          </ul>
        </div>

        {/* Monsoon & Waterfall Surge Advice */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <CloudRain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Monsoon & Water Surge Safety</h3>
              <p className="text-xs text-slate-400">Mountain river pools & waterfall cliff safety</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>If river water turns muddy brown suddenly, exit immediately—it indicates flash flood upstream!</span>
            </li>
            <li className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Never dive into un-surveyed natural pools or stand on algae-covered cliff edges.</span>
            </li>
            <li className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>South-West Monsoon (May-Sep): Best visit East & Upcountry. North-East Monsoon (Oct-Jan): Best visit South & West.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Sinhala Audio Phrasebook */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-teal-500/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Language Helper</span>
            <h3 className="text-2xl font-bold text-white mt-1">{t.phrasesTitle}</h3>
          </div>
          <Volume2 className="w-6 h-6 text-cyan-400 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {phrases.map((phrase, idx) => (
            <div
              key={idx}
              onClick={() => speakPhrase(phrase.si)}
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all hover:scale-105 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-cyan-300">{phrase.si}</span>
                <Volume2 className={`w-4 h-4 ${activeSpeech === phrase.si ? 'text-amber-400 scale-125' : 'text-slate-500 group-hover:text-cyan-400'} transition-all`} />
              </div>
              <div className="text-xs font-semibold text-white mb-1">"{phrase.phonetic}"</div>
              <div className="text-[11px] text-slate-400 line-clamp-1">{phrase.en}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
