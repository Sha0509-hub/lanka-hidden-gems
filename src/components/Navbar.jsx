import React from 'react';
import { Compass, MapPin, Utensils, Shield, Heart, PlusCircle, Globe, Route, UserCheck } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ lang, setLang, activeTab, setActiveTab, savedCount, setIsSavedOpen, setIsSubmitOpen }) {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-teal-500/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('explore')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-amber-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-6 h-6 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                {t.brandName}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 badge-live">
                LKA
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {lang === 'si' ? 'ශ්‍රී ලංකාවේ රහස් සංචාර' : 'Offbeat Sri Lanka Explorer'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'explore' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{t.navExplore}</span>
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'routes' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Route className="w-4 h-4" />
            <span>{t.navRoutes}</span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'planner' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{t.navPlanner}</span>
          </button>

          <button
            onClick={() => setActiveTab('food')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'food' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>{t.navFood}</span>
          </button>

          <button
            onClick={() => setActiveTab('guides')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'guides' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.navGuides}</span>
          </button>

          <button
            onClick={() => setActiveTab('toolkit')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'toolkit' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>{t.navToolkit}</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'si' ? 'en' : 'si')}
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition-all hover:scale-105"
            title="Toggle Language"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'si' ? 'සිංහල ↔ EN' : 'EN ↔ සිංහල'}</span>
          </button>

          {/* Saved Items Counter */}
          <button
            onClick={() => setIsSavedOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-rose-400 transition-all hover:scale-105"
            title={t.navFavorites}
          >
            <Heart className="w-5 h-5 fill-rose-500/20" />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-rose-500/40 animate-pulse">
                {savedCount}
              </span>
            )}
          </button>

          {/* Add Gem CTA */}
          <button
            onClick={() => setIsSubmitOpen(true)}
            className="hidden sm:flex px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide items-center space-x-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.navSubmit}</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex items-center justify-around py-2.5 px-2 bg-slate-950/90 border-t border-slate-800 text-xs overflow-x-auto">
        <button 
          onClick={() => setActiveTab('explore')} 
          className={`px-3 py-1.5 rounded-lg flex flex-col items-center space-y-1 ${activeTab === 'explore' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          <Compass className="w-4 h-4" />
          <span>{t.navExplore}</span>
        </button>
        <button 
          onClick={() => setActiveTab('routes')} 
          className={`px-3 py-1.5 rounded-lg flex flex-col items-center space-y-1 ${activeTab === 'routes' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          <Route className="w-4 h-4" />
          <span>{t.navRoutes}</span>
        </button>
        <button 
          onClick={() => setActiveTab('planner')} 
          className={`px-3 py-1.5 rounded-lg flex flex-col items-center space-y-1 ${activeTab === 'planner' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          <MapPin className="w-4 h-4" />
          <span>{t.navPlanner}</span>
        </button>
        <button 
          onClick={() => setActiveTab('food')} 
          className={`px-3 py-1.5 rounded-lg flex flex-col items-center space-y-1 ${activeTab === 'food' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          <Utensils className="w-4 h-4" />
          <span>{t.navFood}</span>
        </button>
        <button 
          onClick={() => setActiveTab('toolkit')} 
          className={`px-3 py-1.5 rounded-lg flex flex-col items-center space-y-1 ${activeTab === 'toolkit' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <Shield className="w-4 h-4" />
          <span>{t.navToolkit}</span>
        </button>
      </div>
    </header>
  );
}
