import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import { GALLERY_ITEMS } from '../data/galleryData';

// Available gallery categories
const CATEGORIES = ['All', 'Classroom', 'Events', 'Students'];

/**
 * Gallery Card Component
 * Tries loading /gallery/<image> and gracefully falls back to /gallery/<placeholder>.
 * Features lazy loading, decoding="async", explicit 4:3 aspect ratio,
 * separate white card body below the artwork (no overlay on illustrations),
 * and gentle hover zoom scale-[1.03].
 */
function GalleryCard({ item, onClick, cardRef }) {
  const [imgSrc, setImgSrc] = useState(`/gallery/${item.image}`);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(`/gallery/${item.image}`);
    setHasError(false);
  }, [item.image]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(`/gallery/${item.placeholder}`);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group flex flex-col h-full rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-[#6B3FA0]/15 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple select-none active:scale-[0.98]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View photo: ${item.title}`}
    >
      {/* 4:3 Compact Image Area with Deep Purple Background */}
      <div className="relative w-full aspect-[4/3] lg:max-h-[280px] bg-[#3F1F6B] overflow-hidden flex items-center justify-center">
        {/* Lazy loaded image with explicit decoding and gentle hover zoom */}
        <img
          src={imgSrc}
          alt={item.title}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          onError={handleError}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />

        {/* Top colored accent line on hover */}
        <span
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-yellow rounded-t-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-30"
          aria-hidden="true"
        />

        {/* Category Badge at Top-Left */}
        <div className="absolute top-3 left-3 z-20">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-brand-deep shadow-sm border border-gray-100">
            {item.category}
          </span>
        </div>

        {/* Expand Icon on Hover at Top-Right */}
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 rounded-xl bg-brand-orange text-brand-deep flex items-center justify-center shadow-md">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Clean White Card Body Below Image (Never obscures artwork) */}
      <div className="p-4 sm:p-5 bg-white flex flex-col flex-grow justify-between border-t border-gray-100">
        <div>
          <h3 className="text-brand-deep font-heading font-semibold text-base leading-snug group-hover:text-brand-purple transition-colors">
            {item.title}
          </h3>
          {item.caption && (
            <p className="text-[#5B4B75] text-sm line-clamp-2 mt-1.5 leading-relaxed">
              {item.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxFailed, setLightboxFailed] = useState(false);

  const lightboxRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const lastActiveElementRef = useRef(null);

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  useEffect(() => {
    if (currentLightboxItem) {
      setLightboxSrc(`/gallery/${currentLightboxItem.image}`);
      setLightboxFailed(false);
    }
  }, [currentLightboxItem]);

  const handleLightboxError = () => {
    if (!lightboxFailed && currentLightboxItem) {
      setLightboxFailed(true);
      setLightboxSrc(`/gallery/${currentLightboxItem.placeholder}`);
    }
  };

  const openLightbox = (idx) => {
    lastActiveElementRef.current = document.activeElement;
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    if (lastActiveElementRef.current) {
      lastActiveElementRef.current.focus?.();
    }
  };

  // Keyboard controls & scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, filteredItems.length]);

  // Focus Trapping inside Lightbox
  useEffect(() => {
    if (lightboxIndex === null || !lightboxRef.current) return;

    const focusable = lightboxRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleTabTrap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabTrap);
    return () => window.removeEventListener('keydown', handleTabTrap);
  }, [lightboxIndex]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  // Mobile Touch Swipe Handlers for Lightbox
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

  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Category Filter Tabs */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
              Campus Gallery
            </span>
            <div className="relative inline-block">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
                Life at Ninamore Knowledge Academy
              </h2>
              <span
                className="block h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow"
                aria-hidden="true"
              />
            </div>
            <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
              A glimpse of learning, collaboration, and mentorship at our Alsi Plot centre.
            </p>

            {/* Filter Pills */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 pt-4 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const count = cat === 'All'
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((i) => i.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setLightboxIndex(null);
                    }}
                    className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${isActive
                      ? 'bg-brand-purple text-white shadow-sm ring-2 ring-brand-purple/20'
                      : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-brand-purple border border-gray-200'
                      }`}
                    aria-pressed={isActive}
                  >
                    <span>{cat}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Uniform 3-Column Grid of Compact 4:3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id} variant="scale" delay={idx * 50} className="h-full flex flex-col">
              <GalleryCard
                item={item}
                onClick={() => openLightbox(idx)}
              />
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Lightbox Viewer (Full-Screen with Fade/Scale, Swipe & Focus Trapping) */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md select-none animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${currentLightboxItem.title}`}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-30">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium">
              <ImageIcon className="w-3.5 h-3.5 text-brand-yellow" />
              <span>
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-2xl bg-black/40 sm:bg-white/10 hover:bg-brand-orange text-white transition-all z-30 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-2xl bg-black/40 sm:bg-white/10 hover:bg-brand-orange text-white transition-all z-30 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content Box with Pop/Scale Animation */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] bg-brand-deep rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col z-20 my-auto animate-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full min-h-[260px] max-h-[62vh] bg-black/60 flex items-center justify-center overflow-hidden p-4 text-center">
              <img
                src={lightboxSrc}
                alt={currentLightboxItem.title}
                onError={handleLightboxError}
                decoding="async"
                className="max-h-[60vh] max-w-full object-contain mx-auto rounded-xl z-10"
              />
            </div>

            <div className="p-4 sm:p-5 bg-brand-deep text-white border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-yellow text-brand-dark mr-2">
                  {currentLightboxItem.category}
                </span>
                <span className="font-heading font-bold text-base text-white">
                  {currentLightboxItem.title}
                </span>
                {currentLightboxItem.caption && (
                  <p className="text-xs text-purple-100 font-light mt-1">
                    {currentLightboxItem.caption}
                  </p>
                )}
              </div>
              <div className="text-xs text-brand-yellow flex-shrink-0 font-medium">
                Alsi Plot, Akola
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
