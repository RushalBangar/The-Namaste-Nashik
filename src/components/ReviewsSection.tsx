import React, { useState } from 'react';
import { REVIEWS } from '../data/restaurantData';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newFavoriteDish, setNewFavoriteDish] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      role: newFavoriteDish.trim() ? `Loves ${newFavoriteDish.trim()}` : 'Google Verified Diner',
      rating: newRating,
      content: newContent.trim(),
      date: 'Just now',
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewFavoriteDish('');
      setNewContent('');
      setNewRating(5);
    }, 1500);
  };

  return (
    <section className="w-full py-12 sm:py-space-xl bg-surface-container-low border-b border-surface-container" id="reviews">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-margin">
        
        {/* Header & Scorecard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-space-xl items-center pb-8 sm:pb-space-xl">
          
          {/* Big Number Card (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-space-xl rounded-2xl bg-surface-container-lowest shadow-md flex flex-col gap-3 sm:gap-space-md border border-outline-variant/30">
            <div className="flex items-center gap-space-xs text-secondary">
              <span className="material-symbols-outlined text-[24px] sm:text-[28px]">reviews</span>
              <span className="font-label-sm text-xs sm:text-label-sm font-bold uppercase tracking-wider">
                Google Verified Feedback
              </span>
            </div>

            <div className="flex items-baseline gap-space-sm">
              <span className="font-display-lg text-4xl sm:text-5xl lg:text-[64px] font-bold text-on-surface leading-none">
                4.6
              </span>
              <div className="flex flex-col">
                <div className="flex items-center text-secondary">
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                </div>
                <span className="font-label-md text-xs sm:text-label-md text-on-surface-variant mt-0.5">
                  Based on 2,214+ diner reviews
                </span>
              </div>
            </div>

            <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant">
              Rated among the top pure vegetarian family destinations in Lawate Nagar & Tidke Colony circles.
            </p>

            <button
              className="w-full py-3 px-space-md rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container active:bg-surface-container-highest font-label-lg text-xs sm:text-label-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-symbols-outlined text-[20px] text-primary">edit_note</span>
              <span>Write a Diner Review</span>
            </button>
          </div>

          {/* Breakdown Dimension Bars (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-space-md">
            <div>
              <span className="font-label-sm text-xs sm:text-label-sm text-secondary uppercase tracking-widest font-bold">
                Uncompromising Quality
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface mt-1">
                What Our Diners Commend Most
              </h2>
            </div>

            <div className="flex flex-col gap-2.5 sm:gap-space-sm">
              {/* Metric 1 */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-md text-xs sm:text-label-md">
                  <span className="text-on-surface font-semibold truncate pr-2">Pure Veg Authenticity & Kitchen Hygiene</span>
                  <span className="text-tertiary font-bold shrink-0">4.9 / 5.0</span>
                </div>
                <div className="w-full h-2.5 sm:h-3 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full rounded-full bg-tertiary" style={{ width: '98%' }}></div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-md text-xs sm:text-label-md">
                  <span className="text-on-surface font-semibold truncate pr-2">Taste, Spice Balance & Freshness</span>
                  <span className="text-primary font-bold shrink-0">4.8 / 5.0</span>
                </div>
                <div className="w-full h-2.5 sm:h-3 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: '96%' }}></div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-md text-xs sm:text-label-md">
                  <span className="text-on-surface font-semibold truncate pr-2">Hospitality, Inclusivity & Welcoming Service</span>
                  <span className="text-secondary font-bold shrink-0">4.8 / 5.0</span>
                </div>
                <div className="w-full h-2.5 sm:h-3 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full rounded-full bg-secondary" style={{ width: '96%' }}></div>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-md text-xs sm:text-label-md">
                  <span className="text-on-surface font-semibold truncate pr-2">AC Dining Comfort & Ambiance</span>
                  <span className="text-on-surface font-bold shrink-0">4.7 / 5.0</span>
                </div>
                <div className="w-full h-2.5 sm:h-3 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full rounded-full bg-outline" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-space-md">
          {reviewsList.slice(0, 3).map((review, idx) => {
            const avatarBg =
              idx === 0
                ? 'bg-primary-fixed text-on-primary-fixed'
                : idx === 1
                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                : 'bg-secondary-fixed text-on-secondary-fixed';

            return (
              <div
                key={review.id}
                className="p-4 sm:p-space-lg rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col justify-between gap-3 sm:gap-space-md border border-outline-variant/30"
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center text-secondary">
                    {[...Array(review.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[16px] sm:text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body-md text-xs sm:text-body-md text-on-surface pt-1 leading-relaxed">
                    "{review.content}"
                  </p>
                </div>

                <div className="flex items-center gap-space-sm pt-2 sm:pt-space-xs border-t border-surface-container">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${avatarBg} flex items-center justify-center font-headline-sm text-sm sm:text-headline-sm font-bold shrink-0`}>
                    {review.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-label-lg text-xs sm:text-label-lg text-on-surface font-semibold truncate">
                      {review.author}
                    </h4>
                    <p className="font-body-sm text-[11px] sm:text-[12px] text-on-surface-variant truncate">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-lg rounded-2xl bg-surface-container-lowest shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150 my-auto max-h-[92vh]">
            <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-surface-container-high flex items-center justify-between border-b border-surface-container shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] sm:text-[24px] text-secondary">rate_review</span>
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                  Share Your Dining Experience
                </h3>
              </div>
              <button
                className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close review modal"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <form className="p-4 sm:p-5 flex flex-col gap-3.5 overflow-y-auto" onSubmit={handleSubmitReview}>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant font-bold">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-1.5 sm:gap-2 text-secondary text-[28px] sm:text-[32px] cursor-pointer py-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewRating(s)}
                      className="cursor-pointer hover:scale-110 active:scale-95 transition-transform p-0.5"
                    >
                      <span
                        className="material-symbols-outlined text-[28px] sm:text-[32px]"
                        style={{ fontVariationSettings: s <= newRating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                  <span className="font-label-md text-xs sm:text-sm text-on-surface-variant ml-2 font-bold">{newRating} / 5 Stars</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant font-bold">
                  Your Name *
                </label>
                <input
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface text-on-surface font-body-sm text-xs sm:text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 border border-outline-variant/60"
                  placeholder="e.g. Radhika Sharma"
                  required
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant font-bold">
                  Favorite Dish (Optional)
                </label>
                <input
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface text-on-surface font-body-sm text-xs sm:text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 border border-outline-variant/60"
                  placeholder="e.g. Maharashtrian Thali, Shev Bhaji"
                  type="text"
                  value={newFavoriteDish}
                  onChange={(e) => setNewFavoriteDish(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant font-bold">
                  Review Comments *
                </label>
                <textarea
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface text-on-surface font-body-sm text-xs sm:text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 border border-outline-variant/60"
                  placeholder="Tell others about the food quality, hospitality, and safe pure veg environment..."
                  required
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </div>

              {submittedMessage && (
                <div className="p-3 rounded-xl bg-tertiary text-on-tertiary font-label-md text-xs sm:text-sm text-center font-bold shadow-sm animate-in fade-in">
                  ✓ Thank you! Your verified review has been submitted.
                </div>
              )}

              <button
                className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer min-h-[44px] active:scale-[0.98]"
                type="submit"
              >
                Publish Review
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
