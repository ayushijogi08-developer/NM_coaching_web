import React, { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { SHOW_TESTIMONIALS, TESTIMONIALS_DATA } from '../../data/testimonialsData';

/**
 * Student Voices / Testimonials Carousel
 * Auto-playing, swipeable carousel with indicator dots.
 * Controlled by SHOW_TESTIMONIALS in src/data/testimonialsData.js (returns null if false).
 */
export default function TestimonialCarousel() {
  if (!SHOW_TESTIMONIALS || !TESTIMONIALS_DATA || TESTIMONIALS_DATA.length === 0) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play interval (every 5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
              Student Experiences
            </span>
            <div className="relative inline-block">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
                Student & Parent Voices
              </h2>
              <span
                className="block h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow"
                aria-hidden="true"
              />
            </div>
            <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
              Feedback from students and families experiencing our tutorial mentorship.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <div
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Student and Parent testimonials carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative bg-[#F5F0FA] border border-[#6B3FA0]/15 rounded-3xl p-6 sm:p-10 shadow-lg text-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
        >
          {/* Decorative Quote Icon */}
          <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Quote className="w-6 h-6" />
          </div>

          {/* Testimonial Quote */}
          <div className="min-h-[110px] flex items-center justify-center" aria-live="polite">
            <p className="text-sm sm:text-lg text-brand-deep font-medium leading-relaxed italic max-w-2xl mx-auto transition-opacity duration-300">
              "{current.quote}"
            </p>
          </div>

          {/* Author Details */}
          <div className="mt-6 pt-5 border-t border-[#6B3FA0]/10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-purple to-brand-deep text-white font-heading font-bold text-xs flex items-center justify-center mb-2 shadow-xs">
              {current.initials}
            </div>
            <div className="font-heading font-bold text-sm sm:text-base text-brand-deep">
              {current.author}
            </div>
            <div className="text-xs text-[#5B4B75]">
              {current.detail} • <span className="text-[#B45309] font-medium">{current.location}</span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md text-brand-deep hover:text-brand-orange hover:scale-105 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md text-brand-deep hover:text-brand-orange hover:scale-105 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-1 mt-6">
            {TESTIMONIALS_DATA.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to testimonial ${dotIdx + 1} of ${TESTIMONIALS_DATA.length}`}
                className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-full"
              >
                <span
                  className={`transition-all duration-300 rounded-full block ${
                    dotIdx === currentIndex
                      ? 'w-6 h-2 bg-brand-orange shadow-xs'
                      : 'w-2 h-2 bg-purple-200 hover:bg-purple-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
