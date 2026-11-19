import React, { useState } from 'react';
import { 
  Compass, Map, Route, MapPin, Utensils, Calendar, Image as ImageIcon, 
  UserCheck, Shield, PlusCircle, Heart, Globe, ChevronLeft, ChevronRight, 
  Volume2, VolumeX, Menu, X, Sparkles, DollarSign 
} from 'lucide-react';
import { translations } from '../data/translations';

export default function SidebarNav({ 
  lang, setLang, activeTab, setActiveTab, savedCount, 
  setIsSavedOpen, setIsSubmitOpen, currency, setCurrency,
  ambientSound, setAmbientSound
}) {
  const t = translations[lang];
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: t.navExplore, icon: Compass, color: 'text-emerald-400' },
    { id: 'map', label: t.navMap, icon: Map, color: 'text-teal-400' },
    { id: 'routes', label: t.navRoutes, icon: Route, color: 'text-amber-400' },
    { id: 'planner', label: t.navPlanner, icon: MapPin, color: 'text-cyan-400' },
    { id: 'food', label: t.navFood, icon: Utensils, color: 'text-orange-400' },
    { id: 'season', label: t.navSeason, icon: Calendar, color: 'text-emerald-400' },
    { id: 'gallery', label: t.navGallery, icon: ImageIcon, color: 'text-pink-400' },
    { id: 'guides', label: t.navGuides, icon: UserCheck, color: 'text-blue-400' },
    { id: 'toolkit', label: t.navToolkit, icon: Shield, color: 'text-rose-400' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 glass-panel border-b border-teal-500/20 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3" onClick={() => setActiveTab('explore')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-400 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <span className="text-base font-bold text-white tracking-tight">{t.brandName}</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Saved Heart button */}
          <button
            onClick={() => setIsSavedOpen(true)}
            className="relative p-2 rounded-xl bg-slate-800 text-rose-400 border border-slate-700"
          >
            <Heart className="w-4 h-4 fill-rose-500/20" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'si' ? 'en' : 'si')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
          >
            {lang === 'si' ? 'සිං' : 'EN'}
          </button>

          {/* Menu Drawer Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Desktop Left Vertical Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col justify-between sticky top-0 h-screen glass-panel border-r border-teal-500/20 z-40 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Top Header Logo */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-slate-800/80">
            <div 
              onClick={() => setActiveTab('explore')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-amber-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>

              {!isCollapsed && (
                <div>
                  <h1 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                    {t.brandName}
                  </h1>
                  <span className="text-[10px] font-semibold text-emerald-400 badge-live">
                    Sri Lanka Hidden Gems
                  </span>
                </div>
              )}
            </div>

            {/* Collapse / Expand Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title={isCollapsed ? t.sidebarExpand : t.sidebarCollapse}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[50vh] no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-3 py-3 rounded-2xl text-xs font-semibold flex items-center space-x-3 transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white shadow-lg shadow-emerald-600/25 border border-emerald-400/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : item.color} group-hover:scale-110 transition-transform`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Action Controls */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          
          {/* Quick Controls Box */}
          {!isCollapsed && (
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              
              {/* Currency Selector */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Currency</span>
                <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setCurrency('LKR')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${currency === 'LKR' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
                  >
                    LKR
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${currency === 'USD' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                  >
                    USD
                  </button>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Language</span>
                <button
                  onClick={() => setLang(lang === 'si' ? 'en' : 'si')}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 text-emerald-300 text-[11px] font-bold border border-slate-800 hover:border-emerald-500/40"
                >
                  {lang === 'si' ? 'සිංහල ↔ EN' : 'EN ↔ සිංහල'}
                </button>
              </div>

              {/* Nature Soundscape Toggle */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                <span className="text-slate-400 font-medium flex items-center space-x-1">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ambience</span>
                </span>
                <button
                  onClick={() => {
                    const nextSound = ambientSound === 'off' ? 'rainforest' : ambientSound === 'rainforest' ? 'waves' : 'off';
                    setAmbientSound(nextSound);
                  }}
                  className="px-2 py-1 rounded-xl bg-slate-900 text-cyan-300 text-[10px] font-bold border border-slate-800"
                >
                  {ambientSound === 'rainforest' ? '🌿 Waterfall' : ambientSound === 'waves' ? '🌊 Waves' : '🔇 Off'}
                </button>
              </div>

            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-2">
            
            {/* Favorites Drawer Toggle */}
            <button
              onClick={() => setIsSavedOpen(true)}
              className={`w-full py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                isCollapsed ? 'px-0' : 'px-3'
              }`}
            >
              <Heart className="w-4 h-4 fill-rose-500/20 text-rose-500" />
              {!isCollapsed && <span>{t.navFavorites} ({savedCount})</span>}
            </button>

            {/* Add Gem CTA */}
            <button
              onClick={() => setIsSubmitOpen(true)}
              className={`w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all ${
                isCollapsed ? 'px-0' : 'px-3'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {!isCollapsed && <span>{t.navSubmit}</span>}
            </button>
          </div>

        </div>
      </aside>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsMobileOpen(false)} />
          
          <div className="relative w-4/5 max-w-sm glass-panel h-full border-r border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-base font-bold text-white">{t.brandName}</span>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-xl bg-slate-900 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Items */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-4 py-3 rounded-2xl text-xs font-semibold flex items-center space-x-3 ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                          : 'text-slate-300 bg-slate-900/60'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  setIsSubmitOpen(true);
                }}
                className="w-full py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.navSubmit}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
