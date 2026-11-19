import React, { useState } from 'react';
import { Sparkles, Calendar, DollarSign, Compass, CheckCircle2, ArrowRight, RefreshCw, Flame } from 'lucide-react';
import { translations } from '../data/translations';
import confetti from 'canvas-confetti';

export default function TripPlanner({ lang, gems }) {
  const t = translations[lang];

  const [startCity, setStartCity] = useState('Kandy');
  const [duration, setDuration] = useState('3');
  const [budget, setBudget] = useState('budget');
  const [style, setStyle] = useState('waterfalls');
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();

    // Trigger confetti animation for delightful UX
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    const daysCount = parseInt(duration, 10);
    const costPerDay = budget === 'budget' ? 4000 : budget === 'mid' ? 12000 : 30000;
    const totalEstimatedCost = costPerDay * daysCount;

    // Filter matching gems
    const matchedGems = gems.slice(0, daysCount * 2);

    const generatedDays = Array.from({ length: daysCount }).map((_, idx) => {
      const dayNum = idx + 1;
      const morningGem = matchedGems[idx % matchedGems.length];
      const afternoonGem = matchedGems[(idx + 1) % matchedGems.length];

      return {
        day: dayNum,
        title: lang === 'si' ? `දවස ${dayNum}: ${morningGem.district} රහස් මංපෙත්` : `Day ${dayNum}: ${morningGem.district} Hidden Loop`,
        morning: morningGem,
        afternoon: afternoonGem,
        foodRecommendation: lang === 'si' ? "ගමේ ලිප් ලිපේ පිසූ බත් පත & කොළ කැඳ" : "Woodfired Village Rice & Curry & Kola Kanda",
        stayTip: lang === 'si' ? "ගමේ Eco Treehouse හෝ Homestay එකක නවාතැන් ගන්න" : "Overnight at Village Eco Treehouse Homestay"
      };
    });

    setGeneratedPlan({
      startCity,
      daysCount,
      budget,
      style,
      totalCostLkr: totalEstimatedCost.toLocaleString(),
      totalCostUsd: Math.round(totalEstimatedCost / 310),
      days: generatedDays
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Planner Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Smart Itinerary Generator</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {t.plannerTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          {t.plannerSub}
        </p>
      </div>

      {/* Generator Input Form Box */}
      <form onSubmit={handleGenerate} className="glass-panel p-6 sm:p-8 rounded-3xl border border-teal-500/30 max-w-4xl mx-auto mb-12 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          
          {/* Starting City */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center space-x-1">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>{t.startFrom}</span>
            </label>
            <select
              value={startCity}
              onChange={(e) => setStartCity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="Colombo">Colombo (කොළඹ)</option>
              <option value="Kandy">Kandy (මහනුවර)</option>
              <option value="Galle">Galle (ගාල්ල)</option>
              <option value="Ella">Ella (ඇල්ල)</option>
              <option value="Jaffna">Jaffna (යාපනය)</option>
            </select>
          </div>

          {/* Duration Days */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{t.durationDays}</span>
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="1">1 Day Express</option>
              <option value="2">2 Days Weekend</option>
              <option value="3">3 Days Trail</option>
              <option value="5">5 Days Island Explorer</option>
              <option value="7">7 Days Deep Hidden Lanka</option>
            </select>
          </div>

          {/* Budget Level */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span>{t.budgetLevel}</span>
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="budget">Backpacker / Budget (~LKR 4k/day)</option>
              <option value="mid">Mid-Range Eco Homestay (~LKR 12k/day)</option>
              <option value="luxury">Glamping & Treehouses (~LKR 30k/day)</option>
            </select>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center space-x-1">
              <Flame className="w-4 h-4 text-cyan-400" />
              <span>{t.travelStyle}</span>
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="waterfalls">Waterfalls & High Peaks</option>
              <option value="beaches">Secret Beaches & Reef Pools</option>
              <option value="culture">Ancient Caves & Heritage</option>
              <option value="foodie">Village Food & Culinary Trails</option>
            </select>
          </div>

        </div>

        {/* Generate Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-xl transition-all hover:scale-[1.01]"
        >
          <Sparkles className="w-5 h-5" />
          <span>{t.generatePlanBtn}</span>
        </button>
      </form>

      {/* Generated Itinerary Plan Display */}
      {generatedPlan && (
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Summary Card */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                {lang === 'si' ? 'ඔබගේ සංචාරක සැලැස්ම' : 'Generated Travel Plan'}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {startCity} → {generatedPlan.daysCount} {lang === 'si' ? 'දින සංචාරය' : 'Days Offbeat Itinerary'}
              </h3>
            </div>

            <div className="flex items-center space-x-4 bg-slate-950/80 px-6 py-3 rounded-2xl border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-bold">{t.estimatedCost}</div>
                <div className="text-xl font-black text-amber-400">LKR {generatedPlan.totalCostLkr}</div>
                <div className="text-[11px] text-slate-400">~ USD ${generatedPlan.totalCostUsd}</div>
              </div>
            </div>
          </div>

          {/* Day by Day Cards */}
          <div className="space-y-4">
            {generatedPlan.days.map((dayItem) => (
              <div key={dayItem.day} className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 text-sm font-black flex items-center justify-center border border-emerald-500/40">
                    #{dayItem.day}
                  </span>
                  <h4 className="text-lg font-bold text-white">{dayItem.title}</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Morning Activity */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex space-x-3">
                    <img
                      src={dayItem.morning.image}
                      alt="Morning Gem"
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase">
                        {lang === 'si' ? 'උදෑසන සංචාරය' : 'Morning Spot'}
                      </span>
                      <h5 className="text-xs font-bold text-white line-clamp-1">
                        {dayItem.morning.title[lang] || dayItem.morning.title.en}
                      </h5>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                        {dayItem.morning.description[lang] || dayItem.morning.description.en}
                      </p>
                    </div>
                  </div>

                  {/* Afternoon Activity */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex space-x-3">
                    <img
                      src={dayItem.afternoon.image}
                      alt="Afternoon Gem"
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase">
                        {lang === 'si' ? 'සවස සංචාරය' : 'Afternoon Spot'}
                      </span>
                      <h5 className="text-xs font-bold text-white line-clamp-1">
                        {dayItem.afternoon.title[lang] || dayItem.afternoon.title.en}
                      </h5>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                        {dayItem.afternoon.description[lang] || dayItem.afternoon.description.en}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Night Stay & Meal Tip */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                  <div className="flex items-center space-x-1.5 text-amber-300">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span><strong>Culinary Tip:</strong> {dayItem.foodRecommendation}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{dayItem.stayTip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
