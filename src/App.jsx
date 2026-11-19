import React, { useState, useEffect, useRef } from 'react';
import SidebarNav from './components/SidebarNav';
import Hero from './components/Hero';
import GemFilters from './components/GemFilters';
import GemCard from './components/GemCard';
import GemModal from './components/GemModal';
import InteractiveMap from './components/InteractiveMap';
import TripPlanner from './components/TripPlanner';
import FoodDirectory from './components/FoodDirectory';
import SeasonCalendar from './components/SeasonCalendar';
import PhotoGallery from './components/PhotoGallery';
import SubmitGemModal from './components/SubmitGemModal';
import GuideDirectory from './components/GuideDirectory';
import TravelToolkit from './components/TravelToolkit';
import FavoritesDrawer from './components/FavoritesDrawer';
import Footer from './components/Footer';

import { initialGems } from './data/gemsData';
import { routesData } from './data/routesData';
import { foodSpots } from './data/foodData';
import { guidesData } from './data/guidesData';
import { translations } from './data/translations';

import { Route, MapPin, Grid, Map, Volume2, Sparkles, DollarSign } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('si');
  const [activeTab, setActiveTab] = useState('explore');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [currency, setCurrency] = useState('LKR'); // 'LKR' | 'USD'
  const [ambientSound, setAmbientSound] = useState('off'); // 'off' | 'rainforest' | 'waves'

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');

  const [gems, setGems] = useState(() => {
    const savedLocal = localStorage.getItem('lanka_gems_list');
    return savedLocal ? JSON.parse(savedLocal) : initialGems;
  });

  const [savedGems, setSavedGems] = useState(() => {
    const savedFavs = localStorage.getItem('lanka_saved_gems');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const [selectedGemModal, setSelectedGemModal] = useState(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);

  // Web Audio Synth for Ambient Nature Soundscapes
  const audioCtxRef = useRef(null);
  const soundNodeRef = useRef(null);

  useEffect(() => {
    if (ambientSound === 'off') {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate soft organic pink noise for rainforest river or beach waves
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = ambientSound === 'rainforest' ? 'bandpass' : 'lowpass';
      filter.frequency.value = ambientSound === 'rainforest' ? 800 : 400;

      const gain = ctx.createGain();
      gain.gain.value = 0.08;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      soundNodeRef.current = whiteNoise;
    } catch (e) {
      console.log('Audio ambient init', e);
    }
  }, [ambientSound]);

  useEffect(() => {
    localStorage.setItem('lanka_gems_list', JSON.stringify(gems));
  }, [gems]);

  useEffect(() => {
    localStorage.setItem('lanka_saved_gems', JSON.stringify(savedGems));
  }, [savedGems]);

  const toggleSave = (gem) => {
    const exists = savedGems.some(item => item.id === gem.id);
    if (exists) {
      setSavedGems(savedGems.filter(item => item.id !== gem.id));
    } else {
      setSavedGems([...savedGems, gem]);
    }
  };

  const handleAddGem = (newGemObj) => {
    setGems([newGemObj, ...gems]);
  };

  const handleAddReview = (gemId, reviewObj) => {
    const updated = gems.map(g => {
      if (g.id === gemId) {
        const newReviews = [reviewObj, ...(g.reviews || [])];
        const newCount = (g.reviewsCount || 0) + 1;
        return {
          ...g,
          reviews: newReviews,
          reviewsCount: newCount
        };
      }
      return g;
    });
    setGems(updated);
    if (selectedGemModal && selectedGemModal.id === gemId) {
      setSelectedGemModal(updated.find(g => g.id === gemId));
    }
  };

  // Filter gems logic
  const filteredGems = gems.filter((gem) => {
    const titleText = (gem.title[lang] || gem.title.en || '').toLowerCase();
    const descText = (gem.description[lang] || gem.description.en || '').toLowerCase();
    const districtText = (gem.district || '').toLowerCase();
    const query = searchTerm.toLowerCase().trim();

    const matchesSearch = !query || titleText.includes(query) || descText.includes(query) || districtText.includes(query);
    const matchesCategory = selectedCategory === 'ALL' || gem.category === selectedCategory;
    const matchesRegion = selectedRegion === 'ALL' || gem.region === selectedRegion;
    const matchesDifficulty = selectedDifficulty === 'ALL' || gem.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesRegion && matchesDifficulty;
  });

  const t = translations[lang];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0b131e] text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Modern Side Navigation Bar */}
      <SidebarNav
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedGems.length}
        setIsSavedOpen={setIsSavedOpen}
        setIsSubmitOpen={setIsSubmitOpen}
        currency={currency}
        setCurrency={setCurrency}
        ambientSound={ambientSound}
        setAmbientSound={setAmbientSound}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1">
          
          {/* Explore View */}
          {activeTab === 'explore' && (
            <>
              <Hero
                lang={lang}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                gemsCount={gems.length}
                foodCount={foodSpots.length}
                routesCount={routesData.length}
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
                <GemFilters
                  lang={lang}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                  selectedDifficulty={selectedDifficulty}
                  setSelectedDifficulty={setSelectedDifficulty}
                />

                {/* View Switcher (Grid ↔ Map) */}
                <div className="hidden sm:flex items-center space-x-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 self-start mt-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                      viewMode === 'grid' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Grid View</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                      viewMode === 'map' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span>Map Pins</span>
                  </button>
                </div>
              </div>

              {/* View Content: Either Grid Cards or Interactive Map */}
              {viewMode === 'grid' ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                  {filteredGems.length === 0 ? (
                    <div className="text-center py-16 glass-card rounded-3xl border border-slate-800">
                      <p className="text-lg font-bold text-slate-300">
                        {lang === 'si' ? 'ගැලපෙන Hidden Gem සොයාගත නොහැකි විය' : 'No matching hidden spots found'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredGems.map((gem) => (
                        <GemCard
                          key={gem.id}
                          gem={gem}
                          lang={lang}
                          onSelectGem={setSelectedGemModal}
                          isSaved={savedGems.some(item => item.id === gem.id)}
                          toggleSave={toggleSave}
                          currency={currency}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <InteractiveMap
                  gems={filteredGems}
                  lang={lang}
                  onSelectGem={setSelectedGemModal}
                  currency={currency}
                />
              )}
            </>
          )}

          {/* Interactive Map View Tab */}
          {activeTab === 'map' && (
            <InteractiveMap
              gems={filteredGems}
              lang={lang}
              onSelectGem={setSelectedGemModal}
              currency={currency}
            />
          )}

          {/* Travel Routes Tab */}
          {activeTab === 'routes' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-4">
                  <Route className="w-4 h-4 text-teal-400" />
                  <span>Curated Offbeat Itineraries</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
                  {lang === 'si' ? 'විශේෂ සංචාරක මාර්ග (Travel Trails)' : 'Curated Offbeat Travel Routes'}
                </h2>
              </div>

              <div className="space-y-8">
                {routesData.map((route) => (
                  <div key={route.id} className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <img
                        src={route.image}
                        alt={route.title[lang] || route.title.en}
                        className="w-full md:w-80 h-52 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                            {route.durationDays}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                            📍 Start: {route.startPoint}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                          {route.title[lang] || route.title.en}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                          {route.description[lang] || route.description.en}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Smart Planner Tab */}
          {activeTab === 'planner' && (
            <TripPlanner lang={lang} gems={gems} />
          )}

          {/* Village Food Tab */}
          {activeTab === 'food' && (
            <FoodDirectory foodSpots={foodSpots} lang={lang} />
          )}

          {/* Weather Season Calendar Tab */}
          {activeTab === 'season' && (
            <SeasonCalendar gems={gems} lang={lang} onSelectGem={setSelectedGemModal} />
          )}

          {/* Community Photo Gallery Tab */}
          {activeTab === 'gallery' && (
            <PhotoGallery lang={lang} />
          )}

          {/* Guides Tab */}
          {activeTab === 'guides' && (
            <GuideDirectory guides={guidesData} lang={lang} />
          )}

          {/* Travel Toolkit Tab */}
          {activeTab === 'toolkit' && (
            <TravelToolkit lang={lang} />
          )}

        </main>

        <Footer lang={lang} setLang={setLang} />
      </div>

      {/* Modals & Drawers */}
      {selectedGemModal && (
        <GemModal
          gem={selectedGemModal}
          lang={lang}
          onClose={() => setSelectedGemModal(null)}
          isSaved={savedGems.some(item => item.id === selectedGemModal.id)}
          toggleSave={toggleSave}
          onAddReview={handleAddReview}
        />
      )}

      <SubmitGemModal
        lang={lang}
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onAddGem={handleAddGem}
      />

      <FavoritesDrawer
        lang={lang}
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedGems={savedGems}
        toggleSave={toggleSave}
        onSelectGem={setSelectedGemModal}
      />

    </div>
  );
}
