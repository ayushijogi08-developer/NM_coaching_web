import React from 'react';

/**
 * Enhanced Section Divider supporting organic wave and curve SVG transitions
 * between alternating section backgrounds, with optional pixel constellations.
 */
export default function SectionDivider({
  variant = 'wave', // 'wave' | 'curve' | 'pixels' | 'pixel-wave'
  fillColor = '#F5F0FA',
  flip = false,
  className = '',
}) {
  if (variant === 'pixels') {
    return (
      <div className={`relative w-full overflow-hidden select-none py-4 ${className}`} aria-hidden="true">
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto opacity-75">
          <span className="w-1.5 h-1.5 bg-brand-yellow/40 animate-pulse" />
          <span className="w-2.5 h-2.5 bg-brand-orange/60" />
          <span className="w-3.5 h-3.5 bg-brand-yellow shadow-sm" />
          <span className="w-4 h-4 bg-brand-orange shadow-md transform rotate-12" />
          <span className="w-3 h-3 bg-brand-purple" />
          <span className="w-2.5 h-2.5 bg-brand-yellow/80" />
          <span className="w-1.5 h-1.5 bg-brand-orange/40" />
        </div>
      </div>
    );
  }

  const transformStyle = flip ? 'scale(1, -1)' : 'none';

  return (
    <div
      className={`relative w-full overflow-hidden select-none pointer-events-none -my-px ${className}`}
      style={{ transform: transformStyle }}
      aria-hidden="true"
    >
      {variant === 'curve' ? (
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 md:h-16 block text-current"
        >
          <path
            d="M0,0 C480,55 960,55 1440,0 L1440,60 L0,60 Z"
            fill={fillColor}
          />
        </svg>
      ) : (
        /* Organic gentle wave (default) */
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 md:h-16 block text-current"
        >
          <path
            d="M0,32 C240,65 480,10 720,38 C960,66 1200,18 1440,32 L1440,80 L0,80 Z"
            fill={fillColor}
          />
        </svg>
      )}

      {/* Floating pixel constellation along the wave for signature brand feel */}
      {variant === 'pixel-wave' && (
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-60">
          <span className="w-2 h-2 bg-brand-yellow/50 rotate-12" />
          <span className="w-3 h-3 bg-brand-orange/60" />
          <span className="w-2.5 h-2.5 bg-brand-yellow" />
        </div>
      )}
    </div>
  );
}
