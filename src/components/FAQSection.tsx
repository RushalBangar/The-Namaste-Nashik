import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'Cuisine & Purity',
    question: 'Is The Namastey Nashik strictly 100% pure vegetarian?',
    answer:
      'Yes, absolutely. The Namastey Nashik is a strictly certified 100% pure vegetarian kitchen. We cook with pure desi ghee, fresh cold-pressed oils, and farm-fresh ingredients sourced from Nashik and Lasalgaon with zero cross-contamination.',
  },
  {
    category: 'Jain Options',
    question: 'Do you offer Jain food without root vegetables (onion & garlic)?',
    answer:
      'Yes! We have an extensive Jain menu cooked on dedicated hygienic stations. Delicacies like Paneer Tikka Angara, Kaju Curry Shahi, Subz Dum Biryani, Dal Tadka, and artisanal pizzas can all be prepared 100% Jain according to strict dietary guidelines.',
  },
  {
    category: 'Ordering & Delivery',
    question: 'How can I order food online or pick up takeaway in Nashik?',
    answer:
      'You can select items from our digital menu on this website and click "Order Now" to instantly dispatch your order directly to our restaurant order desk on WhatsApp and SMS (0253 299 5031). We offer prompt doorstep delivery across Nashik and express drive-thru takeaway within 15 minutes.',
  },
  {
    category: 'Table Reservations',
    question: 'How do I book a table or plan a family celebration?',
    answer:
      'You can click the "Book Table" button anywhere on our website or call us directly at 0253 299 5031 / +91 98230 45678. We accommodate romantic candlelight dinners, family gatherings, birthday banquets, and corporate dinners with complimentary valet parking.',
  },
  {
    category: 'Timings & Location',
    question: 'What are your restaurant opening hours and exact location?',
    answer:
      'We are open daily from 11:30 AM to 11:00 PM. Our full thali meal service runs for lunch (12:00 PM – 3:30 PM) and dinner (7:00 PM – 10:30 PM). We are located at Shop No. 7, Samarth Krupa Apartment / Shop No. 1 Ganesh Gunjan, Lawate Nagar / Thatte Nagar, Nashik 422005.',
  },
  {
    category: 'Hospitality & Safety',
    question: 'What hygiene and safety standards are maintained in your kitchen?',
    answer:
      'We adhere to the highest sanitization protocols, including hospital-grade kitchen sanitization, RO-filtered cooking water, daily temperature checks, open viewing kitchen transparency, and eco-friendly spill-proof packaging for deliveries.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-cream-surface/70 border-t border-outline-variant/30" id="faqs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-widest bg-peach-tint/60 px-3 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-on-surface font-bold mt-3">
            Got Questions About Dining With Us?
          </h2>
          <p className="font-body-md text-sm sm:text-base text-charcoal-muted mt-2">
            Everything you need to know about our pure vegetarian kitchen, Jain preparations, doorstep delivery, and table bookings in Nashik.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-container-low/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col pr-2">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-0.5">
                      {faq.category}
                    </span>
                    <h3 className="font-title-md text-sm sm:text-base font-bold text-on-surface leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[24px] text-primary shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-saffron-deep' : ''
                    }`}
                  >
                    keyboard_arrow_down
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal-muted leading-relaxed border-t border-surface-container animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Footer Banner inside FAQ */}
        <div className="max-w-3xl mx-auto mt-10 p-5 rounded-2xl bg-peach-tint/40 border border-peach-tint flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-title-lg text-base font-bold text-primary">
              Have another question or specific dietary requirement?
            </h4>
            <p className="font-body-sm text-xs sm:text-sm text-charcoal-muted mt-0.5">
              Call our hospitality desk directly at {RESTAURANT_INFO.phone} — we are happy to assist.
            </p>
          </div>
          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-saffron-vibrant text-on-primary font-bold text-xs sm:text-sm whitespace-nowrap shadow-sm transition-all"
          >
            Call {RESTAURANT_INFO.phone}
          </a>
        </div>
      </div>
    </section>
  );
};
