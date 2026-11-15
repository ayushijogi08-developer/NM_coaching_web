import React, { useState, useEffect } from 'react';

/**
 * Brand Page Loading Animation using the pixel-book logo motif.
 * Automatically fades out cleanly within 600ms total, and skips immediately for reduced motion.
 */
export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion; skip loader completely if so
    const prefersReduced = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReduced) {
      setLoading(false);
      return;
    }

    // Keep total loader duration <= 600ms (350ms display + 250ms fade transition)
    const timer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 250);
      return () => clearTimeout(removeTimer);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-deep text-white transition-opacity duration-250 ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Ninamore Knowledge Academy"
      role="status"
    >
      {/* Background ambient glow */}
      <div className="absolute w-72 h-72 rounded-full bg-brand-purple/40 blur-3xl pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full bg-brand-orange/20 blur-2xl pointer-events-none" />

      {/* Center Pixel Book Animation */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo Container with Pulsing Pixel Ring */}
        <div className="relative mb-6">
          {/* Animated Pixel Halo */}
          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-brand-yellow/40 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-purple opacity-75 blur-sm animate-pulse" />

          {/* Actual Circular Logo */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-brand-purple ring-4 ring-white/20 shadow-2xl p-1">
            <img 
              src="/logo.png" 
              alt="Ninamore Knowledge Academy Logo" 
              className="w-full h-full object-contain rounded-full"
              width="112"
              height="112"
            />
          </div>

          {/* Floating square pixels echoing the logo effect */}
          <span 
            className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-none bg-brand-orange shadow-md animate-bounce" 
            style={{ animationDelay: '0.1s' }}
          />
          <span 
            className="absolute top-3 -right-5 w-2.5 h-2.5 rounded-none bg-brand-yellow shadow-md animate-bounce" 
            style={{ animationDelay: '0.3s' }}
          />
          <span 
            className="absolute top-8 -right-4 w-2 h-2 rounded-none bg-white shadow-md animate-bounce" 
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        {/* Brand Text */}
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wider">
          NINAMORE
        </h2>
        <p className="font-heading font-semibold text-xs text-brand-yellow tracking-widest uppercase mt-0.5">
          KNOWLEDGE ACADEMY • AKOLA
        </p>

        {/* Shimmering Progress Bar */}
        <div className="w-44 h-1.5 bg-white/10 rounded-full overflow-hidden mt-6">
          <div className="w-full h-full bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
