import React, { useState } from 'react';
import { Review } from '../types';

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-01',
    author: 'Rajesh Shah',
    role: 'Nashik Local Diner • Verified Visit',
    rating: 5,
    content:
      'The Dal Makhani and Paneer Tikka Angara took me straight to Old Delhi royalty. You can genuinely taste the pure desi ghee and freshness in every single bite!',
    date: 'Yesterday',
  },
  {
    id: 'rev-02',
    author: 'Dr. Pooja Kulkarni',
    role: 'Family Gathering Host',
    rating: 5,
    content:
      "We celebrated my parents' 50th wedding anniversary here. The Royal Nashik Thali presentation blew away our entire family. Impeccable hygiene and royal hospitality.",
    date: '3 days ago',
  },
  {
    id: 'rev-03',
    author: 'Anand Mehta',
    role: 'Jain Community Connoisseur',
    rating: 5,
    content:
      'As strict Jain diners, finding genuine zero-root vegetable cuisine with fine dining elegance was difficult until we found The Namastey Nashik. An absolute revelation!',
    date: '1 week ago',
  },
];

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      role: newRole.trim() || 'Verified Diner',
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
      setNewRole('');
      setNewContent('');
      setNewRating(5);
    }, 1500);
  };

  return (
    <section className="w-full bg-cream-canvas py-16 px-4 md:px-8 border-t border-outline-variant/30" id="reviews">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Rating Bento Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Rating Summary Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-cream-surface shadow-xs border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl sm:text-5xl lg:text-[56px] text-primary leading-none font-bold">
                4.8
              </span>
              <div className="flex flex-col">
                <div className="flex items-center text-saffron-vibrant">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                </div>
                <span className="font-label-md text-xs sm:text-sm text-charcoal-muted font-semibold mt-0.5">
                  Based on 2,400+ Verified Diners
                </span>
              </div>
            </div>

            <p className="font-body-sm text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Recognized as Nashik's crown jewel for clean vegetarian fine dining. Celebrated by families, food bloggers, and connoisseurs.
            </p>

            <div className="p-3.5 rounded-xl bg-peach-tint/50 border border-peach-tint flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">military_tech</span>
              <div className="flex flex-col">
                <span className="font-title-md text-sm sm:text-base text-primary font-bold">
                  Best Pure Veg Restaurant
                </span>
                <span className="font-label-sm text-xs text-charcoal-muted">
                  Food Connoisseur Award Nashik 2024
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-1 w-full py-2.5 rounded-xl bg-surface-container-lowest hover:bg-peach-tint/40 text-primary border border-primary/20 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">rate_review</span>
              <span>Write a Guest Review</span>
            </button>
          </div>

          {/* Rating Breakdown Bar Chart (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-cream-card shadow-xs border border-outline-variant/30 flex flex-col gap-4">
            <h3 className="font-title-lg text-base sm:text-title-lg text-primary font-bold">
              Guest Sentiment Breakdown
            </h3>
            
            <div className="flex flex-col gap-3 font-label-sm text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <span className="w-36 text-on-surface-variant font-medium shrink-0">Food Quality & Taste</span>
                <div className="flex-1 h-3 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-pure-veg-green rounded-full" style={{ width: '98%' }}></div>
                </div>
                <span className="font-bold text-on-surface w-14 text-right">4.9 / 5</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-36 text-on-surface-variant font-medium shrink-0">Hygiene & Cleanliness</span>
                <div className="flex-1 h-3 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-pure-veg-green rounded-full" style={{ width: '99%' }}></div>
                </div>
                <span className="font-bold text-on-surface w-14 text-right">5.0 / 5</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-36 text-on-surface-variant font-medium shrink-0">Regal Ambience</span>
                <div className="flex-1 h-3 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-saffron-vibrant rounded-full" style={{ width: '94%' }}></div>
                </div>
                <span className="font-bold text-on-surface w-14 text-right">4.7 / 5</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-36 text-on-surface-variant font-medium shrink-0">Staff Courtesy</span>
                <div className="flex-1 h-3 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '96%' }}></div>
                </div>
                <span className="font-bold text-on-surface w-14 text-right">4.8 / 5</span>
              </div>
            </div>
          </div>

        </div>

        {/* Testimonial Quotes Carousel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.slice(0, 3).map((review) => {
            const initials = review.author
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-cream-card shadow-xs border border-outline-variant/30 flex flex-col justify-between gap-4 transition-all hover:shadow-md"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-saffron-vibrant">
                    {[...Array(review.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface italic leading-relaxed">
                    "{review.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-surface-container">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary text-sm shrink-0">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-md text-xs sm:text-sm text-on-surface font-semibold truncate">
                      {review.author}
                    </span>
                    <span className="font-body-sm text-[11px] text-charcoal-muted truncate">
                      {review.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface mb-2">
              Share Your Namastey Nashik Experience
            </h3>
            <p className="font-body-sm text-xs sm:text-sm text-charcoal-muted mb-4">
              Your feedback is displayed on our community page and helps fellow Nashik diners.
            </p>

            {submittedMessage ? (
              <div className="p-4 rounded-xl bg-pure-veg-green/10 text-pure-veg-green text-center font-bold text-sm">
                Thank you! Your verified review has been submitted.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Favorite Dish or Visit Type</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Loved Dal Makhani Heritage / Family Dinner"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Rating</label>
                  <div className="flex items-center gap-1.5 text-saffron-vibrant">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer"
                      >
                        <span
                          className="material-symbols-outlined text-[26px]"
                          style={{ fontVariationSettings: star <= newRating ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Your Review *</label>
                  <textarea
                    required
                    rows={3}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Tell us about the flavors, ghee aroma, ambiance, and service..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-muted hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-saffron-vibrant text-on-primary font-bold text-xs shadow-xs"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
