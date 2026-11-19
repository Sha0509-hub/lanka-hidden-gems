import React, { useState } from 'react';
import { X, MapPin, Star, PhoneCall, ShieldAlert, Heart, Calendar, DollarSign, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { translations } from '../data/translations';

export default function GemModal({ gem, lang, onClose, isSaved, toggleSave, onAddReview }) {
  const t = translations[lang];

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [submittedReview, setSubmittedReview] = useState(false);

  if (!gem) return null;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const reviewObj = {
      author: newReviewAuthor,
      avatar: newReviewAuthor.substring(0, 2).toUpperCase(),
      rating: Number(newReviewRating),
      comment: newReviewComment
    };

    onAddReview(gem.id, reviewObj);
    setSubmittedReview(true);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-teal-500/30 shadow-2xl my-8">
        
        {/* Header Image Cover */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={gem.image}
            alt={gem.title[lang] || gem.title.en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close & Save Buttons */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button
              onClick={() => toggleSave(gem)}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-md transition-all hover:scale-110"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-200'}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-md transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Header Title Info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{gem.district}</span>
              <span>•</span>
              <span>{t[gem.category]}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {gem.title[lang] || gem.title.en}
            </h2>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[65vh] overflow-y-auto no-scrollbar">
          
          {/* Key Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
              <Star className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">{t.rating}</div>
                <div className="text-sm font-bold text-white">{gem.rating} / 5.0</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">{t.bestTime}</div>
                <div className="text-sm font-bold text-white">{gem.bestTime}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-teal-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">{t.entryFee}</div>
                <div className="text-sm font-bold text-white">{gem.entryFee}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">GPS Links</div>
                <a
                  href={gem.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-cyan-400 underline hover:text-cyan-300"
                >
                  {t.mapLocation}
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">
              {lang === 'si' ? 'ස්ථානය පිළිබඳ විස්තරය' : 'Spot Overview'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {gem.description[lang] || gem.description.en}
            </p>
          </div>

          {/* Highlights List */}
          {gem.highlights && (
            <div>
              <h3 className="text-base font-bold text-white mb-3">
                {lang === 'si' ? 'විශේෂතා' : 'Highlights'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {gem.highlights.map((hl, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center space-x-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{hl[lang] || hl.en}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Guide & Safety Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Guide Contact Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/20">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 mb-2">
                <PhoneCall className="w-4 h-4" />
                <span>{t.localGuide}</span>
              </div>
              <p className="text-sm font-semibold text-white mb-3">
                {gem.guideContact}
              </p>
              <a
                href={`tel:${gem.guideContact.split(' ')[0]}`}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
              >
                <span>Call Guide Now</span>
              </a>
            </div>

            {/* Safety & Ethics Warning Box */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>{t.guideNotes}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                {gem.safetyTips ? (gem.safetyTips[lang] || gem.safetyTips.en) : t.leaveNoTrace}
              </p>
              <p className="text-[11px] text-amber-300 font-medium">
                ⚠️ {t.leaveNoTrace}
              </p>
            </div>
          </div>

          {/* Community Reviews Section */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'si' ? 'සංචාරකයන්ගේ අදහස් (Reviews)' : 'Visitor Reviews'}</span>
            </h3>

            {/* List of Reviews */}
            <div className="space-y-3 mb-6">
              {gem.reviews && gem.reviews.map((rev, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {rev.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{rev.author}</span>
                      <div className="flex items-center space-x-1 text-amber-400 text-xs">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                {lang === 'si' ? 'ඔබගේ අත්දැකීම එකතු කරන්න' : 'Leave a Review'}
              </h4>

              {submittedReview && (
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs">
                  ✓ {lang === 'si' ? 'ඔබගේ Review එක එකතු විය!' : 'Thank you for your review!'}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder={lang === 'si' ? 'ඔබගේ නම' : 'Your Name'}
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />

                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                </select>
              </div>

              <textarea
                required
                rows={2}
                placeholder={lang === 'si' ? 'ස්ථානය සහ පාර ගැන ඔබේ අත්දැකීම ලියන්න...' : 'Share tips about trail condition, crowd, or views...'}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'si' ? 'Review එක Submit කරන්න' : 'Post Review'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
