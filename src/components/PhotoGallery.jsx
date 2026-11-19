import React, { useState } from 'react';
import { Image as ImageIcon, Heart, MapPin, X, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

export default function PhotoGallery({ lang }) {
  const t = translations[lang];

  const photos = [
    { id: 1, title: 'Lower Diyaluma Cliff Pools', location: 'Koslanda', image: '/images/secret_waterfall.jpg', likes: 142, author: 'Kasun P.' },
    { id: 2, title: 'Narangala Cloud Inversion', location: 'Badulla', image: '/images/misty_peak.jpg', likes: 198, author: 'Ruwan M.' },
    { id: 3, title: 'Dickwella Secret Cove', location: 'Matara', image: '/images/hidden_beach.jpg', likes: 215, author: 'Sarah J.' },
    { id: 4, title: 'Woodfired Village Feast', location: 'Matale', image: '/images/village_food.jpg', likes: 310, author: 'Amma Table' },
    { id: 5, title: 'Mandaram Nuwara Glamping', location: 'Nuwara Eliya', image: '/images/eco_stay.jpg', likes: 176, author: 'Manoj S.' },
    { id: 6, title: 'Bible Rock Ancient Steps', location: 'Kegalle', image: '/images/ancient_cave.jpg', likes: 89, author: 'Saman K.' }
  ];

  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [photoLikes, setPhotoLikes] = useState({});

  const handleLike = (id, e) => {
    e.stopPropagation();
    setPhotoLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-4">
          <ImageIcon className="w-4 h-4 text-pink-400" />
          <span>Traveler Photography Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {t.galleryTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          {t.gallerySub}
        </p>
      </div>

      {/* Photo Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhotoModal(item)}
            className="glass-card rounded-3xl overflow-hidden border border-slate-800 relative group cursor-pointer h-72"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* Bottom Overlay Content */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1 text-xs text-emerald-400 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {item.title}
                </h4>
                <p className="text-[10px] text-slate-400">By {item.author}</p>
              </div>

              {/* Like Button */}
              <button
                onClick={(e) => handleLike(item.id, e)}
                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-rose-500 text-white border border-slate-700 backdrop-blur-md flex items-center space-x-1 text-xs font-bold transition-all hover:scale-110"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>{item.likes + (photoLikes[item.id] || 0)}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Popup Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={() => setActivePhotoModal(null)}>
          <div className="relative max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border border-slate-700 shadow-2xl p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-white z-10 border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activePhotoModal.image}
              alt={activePhotoModal.title}
              className="w-full max-h-[75vh] object-cover rounded-2xl mb-4"
            />

            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="text-lg font-bold text-white">{activePhotoModal.title}</h3>
                <span className="text-xs text-emerald-400 font-semibold">📍 {activePhotoModal.location} • Photo by {activePhotoModal.author}</span>
              </div>

              <button
                onClick={(e) => handleLike(activePhotoModal.id, e)}
                className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center space-x-2"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>{activePhotoModal.likes + (photoLikes[activePhotoModal.id] || 0)} Likes</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
