import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, MapPin, Image as ImageIcon, FileText } from 'lucide-react';
import { translations } from '../data/translations';
import confetti from 'canvas-confetti';

export default function SubmitGemModal({ lang, isOpen, onClose, onAddGem }) {
  const t = translations[lang];

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('catWaterfall');
  const [region, setRegion] = useState('regUpcountry');
  const [district, setDistrict] = useState('');
  const [description, setDescription] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newGemObj = {
      id: `gem-custom-${Date.now()}`,
      title: { si: title, en: title },
      category,
      region,
      district: district || 'Sri Lanka',
      image: imageUrl.trim() || '/images/secret_waterfall.jpg',
      difficulty: 'diffModerate',
      rating: 5.0,
      reviewsCount: 1,
      bestTime: 'All Year',
      entryFee: 'Free',
      coordinates: '7.8731, 80.7718',
      mapsUrl: mapsUrl.trim() || 'https://maps.google.com',
      description: { si: description, en: description },
      highlights: [
        { si: 'නැවුම් සැඟවුණු ස්ථානයක්', en: 'Freshly discovered hidden spot' }
      ],
      guideContact: '+94 77 000 0000 (Community Member)',
      reviews: [
        { author: 'You (Contributor)', avatar: 'ME', rating: 5, comment: 'I recently explored this gem. Highly recommended!' }
      ]
    };

    onAddGem(newGemObj);
    setIsSuccess(true);
    
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setIsSuccess(false);
      setTitle('');
      setDescription('');
      setDistrict('');
      setMapsUrl('');
      setImageUrl('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-teal-500/30 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="mb-6">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 mb-1">
            <PlusCircle className="w-4 h-4" />
            <span>Community Contribution</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {t.submitTitle}
          </h3>
          <p className="text-xs text-slate-300">
            {t.submitSub}
          </p>
        </div>

        {/* Success Alert */}
        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">{t.successMsg}</h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Spot Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">{t.spotName}</label>
              <input
                type="text"
                required
                placeholder="e.g., Mini Adam's Peak Secret Cave / රහස් සූරිය පතන"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Category & Region */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{t.spotCategory}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="catWaterfall">{t.catWaterfall}</option>
                  <option value="catPeak">{t.catPeak}</option>
                  <option value="catCave">{t.catCave}</option>
                  <option value="catBeach">{t.catBeach}</option>
                  <option value="catCamping">{t.catCamping}</option>
                  <option value="catFood">{t.catFood}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{t.spotRegion}</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="regUpcountry">{t.regUpcountry}</option>
                  <option value="regSouthern">{t.regSouthern}</option>
                  <option value="regCentral">{t.regCentral}</option>
                  <option value="regSabaragamuwa">{t.regSabaragamuwa}</option>
                  <option value="regUva">{t.regUva}</option>
                  <option value="regNorthEast">{t.regNorthEast}</option>
                </select>
              </div>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">District / Nearest Town</label>
              <input
                type="text"
                placeholder="e.g., Badulla / Koslanda"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">{t.spotDesc}</label>
              <textarea
                required
                rows={3}
                placeholder="Describe how to reach, trail difficulty, best time of day..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Google Maps Link */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">{t.spotLocationUrl}</label>
              <input
                type="url"
                placeholder="https://maps.google.com/..."
                value={mapsUrl}
                onChange={(e) => setMapsUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">{t.spotImage}</label>
              <input
                type="text"
                placeholder="Leave blank to use default image or paste image link"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg transition-all"
            >
              {t.submitBtn}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
