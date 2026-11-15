import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, X, ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import { MENTORS_DATA } from '../../data/mentorsData';

/**
 * Meet the Mentors Section
 * 
 * Features:
 * - True 3D Flip Card architecture with backface-visibility hidden (zero visual bleed or overlap).
 * - Equal height across all cards (h-[420px]) to prevent row jumping when flipped.
 * - Back face incorporates the core mentorship focus bullet topics from About.
 * - Touch-friendly: tap to flip, tap close icon or back face to flip back.
 * - Keyboard accessible: Enter/Space toggles flip, Esc flips back to front.
 * - Mobile-first: Under 768px, cards display as a horizontal scroll-snap carousel
 *   with visible peek of the next card and interactive indicator dots.
 */
export default function MentorsSection() {
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef(null);

  const toggleFlip = (id) => {
    setFlippedCardId(prev => prev === id ? null : id);
  };

  // Esc key closes any flipped card
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && flippedCardId) {
        setFlippedCardId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flippedCardId]);

  // Sync active mobile dot with horizontal carousel scroll
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, offsetWidth } = carouselRef.current;
    const firstChild = carouselRef.current.children[0];
    const cardWidth = firstChild ? firstChild.offsetWidth : offsetWidth * 0.82;
    const activeIdx = Math.round(scrollLeft / (cardWidth + 16));
    setActiveMobileIndex(Math.min(Math.max(activeIdx, 0), MENTORS_DATA.length - 1));
  };

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.children[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveMobileIndex(index);
    }
  };

  return (
    <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
              Academic Mentors
            </span>
            <div className="relative inline-block">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
                Meet the Mentors
              </h2>
              <span
                className="block h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow"
                aria-hidden="true"
              />
            </div>
            <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
              Dedicated subject guides delivering conceptual clarity, board excellence, and structured personal mentorship in Alsi Plot, Akola.
            </p>
          </div>
        </ScrollReveal>

        {/* 
          Mentors Layout:
          - Under 768px (Mobile): horizontal scroll-snap carousel with peek of next card
          - 768px to 1024px: 2-column grid
          - 1024px and above: 4-column row
        */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 px-4 sm:px-0 -mx-4 sm:mx-0"
        >
          {MENTORS_DATA.map((mentor, idx) => {
            const isFlipped = flippedCardId === mentor.id;

            return (
              <div
                key={mentor.id}
                className="snap-center shrink-0 w-[82vw] max-w-[320px] md:w-auto md:max-w-none h-[420px]"
              >
                <ScrollReveal variant="scale" delay={idx * 70} className="h-full">

                  {/* 3D Flip Container with Perspective */}
                  <div className="perspective-1000 w-full h-full group">
                    <div
                      className={`relative w-full h-full transition-transform duration-500 ease-out transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
                        }`}
                    >

                      {/* ========================================================= */}
                      {/* FRONT FACE (Backface Hidden - Zero Text Bleed Through)   */}
                      {/* ========================================================= */}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={isFlipped}
                        aria-label={`${mentor.role}. Press Enter or Space to read bio and focus areas.`}
                        onClick={() => toggleFlip(mentor.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleFlip(mentor.id);
                          }
                        }}
                        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
                        className="backface-hidden absolute inset-0 w-full h-full bg-[#F5F0FA] border border-[#6B3FA0]/15 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple select-none overflow-hidden"
                      >
                        {/* Top colored gradient line */}
                        <span
                          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mentor.gradient} rounded-t-2xl transform origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-300 ease-out`}
                          aria-hidden="true"
                        />

                        {/* Top Info Area */}
                        <div>
                          {/* Circular Avatar + Class Tag Badge */}
                          <div className="flex items-center justify-between mb-3.5">
                            <div className="relative">
                              <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${mentor.gradient} text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-md ring-4 ring-white`}>
                                {mentor.avatarInitials}
                              </div>
                              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-gray-100 flex items-center justify-center text-brand-deep shadow-xs">
                                <Sparkles className="w-2.5 h-2.5 text-brand-orange" />
                              </span>
                            </div>

                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-brand-deep border border-[#6B3FA0]/15 shadow-xs">
                              {mentor.badge}
                            </span>
                          </div>

                          {/* Mentor Role */}
                          <h3 className="font-heading font-bold text-base sm:text-lg text-brand-deep mb-1 group-hover:text-brand-purple transition-colors leading-snug">
                            {mentor.role}
                          </h3>

                          {/* Short Quote / Teaching Style */}
                          <p className="text-xs text-[#5B4B75] leading-relaxed mb-3 italic line-clamp-3">
                            "{mentor.teachingStyle}"
                          </p>

                          {/* Subject Chips */}
                          <div className="flex flex-wrap gap-1.5">
                            {mentor.subjects.map((sub, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white text-brand-deep border border-gray-200/90 shadow-2xs"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Action: Read Bio Button */}
                        <div className="pt-3 border-t border-[#6B3FA0]/10 flex items-center justify-between text-xs text-brand-purple font-semibold">
                          <span className="text-[11px] text-[#5B4B75] font-normal">Tap or click</span>
                          <span className="inline-flex items-center gap-1 text-brand-purple group-hover:text-brand-orange transition-colors">
                            <span>Read bio & focus</span>
                            <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>

                      {/* ========================================================= */}
                      {/* BACK FACE (Rotated 180deg - Deep Purple Bio & Bullets)    */}
                      {/* ========================================================= */}
                      <div
                        role="region"
                        aria-label={`Bio and teaching focus for ${mentor.role}`}
                        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
                        className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full bg-gradient-to-br from-brand-deep via-[#4A2680] to-brand-purple text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col justify-between overflow-hidden"
                      >
                        {/* Back Face Header & Content */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/15 text-brand-yellow">
                              {mentor.badge}
                            </span>

                            {/* Close / Flip Back Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFlip(mentor.id);
                              }}
                              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
                              aria-label={`Close bio for ${mentor.role}`}
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Role Heading */}
                          <h4 className="font-heading font-bold text-sm sm:text-base text-white mb-1.5 leading-snug">
                            {mentor.role}
                          </h4>

                          {/* Short Bio */}
                          <p className="text-xs text-purple-100 leading-relaxed font-normal mb-3">
                            {mentor.bio}
                          </p>

                          {/* Mentorship Focus Bullets (Merged from About section) */}
                          <div className="space-y-1.5 pt-2 border-t border-white/15">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-yellow block">
                              Core Focus Areas
                            </span>
                            {mentor.focusBullets?.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-1.5 text-xs text-purple-100">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow shrink-0 mt-0.5" />
                                <span className="leading-tight">{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Back Face Footer Actions */}
                        <div className="pt-2.5 border-t border-white/15 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-brand-yellow font-medium">Alsi Plot, Akola</span>

                            {/* Ask a Question Primary Button */}
                            <a
                              href="#admissions"
                              onClick={(e) => e.stopPropagation()}
                              className="btn-primary"
                            >
                              <span>Ask a question</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          {/* Quick Flip Back Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(mentor.id);
                            }}
                            className="w-full text-center text-xs text-purple-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors py-2 min-h-[44px] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-brand-yellow" />
                            <span>Flip back to card</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>

                </ScrollReveal>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe & Tap Hint */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3 text-xs text-[#5B4B75]">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span>Swipe to explore mentors • Tap card to flip & view focus</span>
        </div>

        {/* Mobile Carousel Pagination Dots */}
        <div
          className="flex md:hidden items-center justify-center gap-1 mt-2"
          aria-label="Mentor carousel navigation"
        >
          {MENTORS_DATA.map((mentor, dotIdx) => (
            <button
              key={mentor.id}
              type="button"
              onClick={() => scrollToCard(dotIdx)}
              aria-label={`Go to ${mentor.role}`}
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-full"
            >
              <span
                className={`transition-all duration-300 rounded-full block ${dotIdx === activeMobileIndex
                  ? 'w-6 h-2 bg-brand-orange shadow-xs'
                  : 'w-2 h-2 bg-purple-200 hover:bg-purple-300'
                  }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
