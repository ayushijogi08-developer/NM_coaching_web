import React from 'react';

/**
 * Signature design motif: small pixel/square patterns in orange and yellow fading out from a corner,
 * echoing the Ninamore logo's book-to-pixels dissolution effect.
 */
export default function PixelDisperseMotif({
  position = 'top-right',
  variant = 'dark', // 'dark' (on purple background) or 'light' (on lavender/white background)
  className = '',
  size = 'md' // 'sm', 'md', 'lg'
}) {
  // Placement coordinates / orientation
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'inline': 'relative'
  }[position] || 'top-0 right-0';

  // Pixel data array: [col, row, colorType, opacity, delay, sizeMultiplier]
  // Colors: 1 = accent orange (#F28C28), 2 = golden yellow (#F6B93B), 3 = white/purple
  const pixels = [
    // Core burst
    { col: 1, row: 1, color: '#F28C28', opacity: '0.9', delay: '0s', s: 12 },
    { col: 2, row: 1, color: '#F6B93B', opacity: '0.85', delay: '0.2s', s: 10 },
    { col: 3, row: 1, color: '#FFFFFF', opacity: variant === 'dark' ? '0.9' : '0.4', delay: '0.4s', s: 8 },
    { col: 4, row: 1, color: '#F6B93B', opacity: '0.6', delay: '0.1s', s: 6 },
    { col: 5, row: 1, color: '#F28C28', opacity: '0.35', delay: '0.5s', s: 5 },

    // Row 2
    { col: 1, row: 2, color: '#F6B93B', opacity: '0.85', delay: '0.3s', s: 10 },
    { col: 2, row: 2, color: '#F28C28', opacity: '0.95', delay: '0.1s', s: 14 },
    { col: 3, row: 2, color: '#F6B93B', opacity: '0.75', delay: '0.4s', s: 10 },
    { col: 4, row: 2, color: '#FFFFFF', opacity: variant === 'dark' ? '0.7' : '0.3', delay: '0.6s', s: 7 },
    { col: 5, row: 2, color: '#F28C28', opacity: '0.45', delay: '0.2s', s: 5 },
    { col: 6, row: 2, color: '#F6B93B', opacity: '0.25', delay: '0.7s', s: 4 },

    // Row 3
    { col: 1, row: 3, color: '#FFFFFF', opacity: variant === 'dark' ? '0.8' : '0.4', delay: '0.5s', s: 8 },
    { col: 2, row: 3, rowOffset: 2, color: '#F6B93B', opacity: '0.8', delay: '0.2s', s: 10 },
    { col: 3, row: 3, color: '#F28C28', opacity: '0.7', delay: '0.3s', s: 8 },
    { col: 4, row: 3, color: '#F6B93B', opacity: '0.5', delay: '0.5s', s: 6 },
    { col: 5, row: 3, color: '#FFFFFF', opacity: variant === 'dark' ? '0.4' : '0.2', delay: '0.3s', s: 5 },

    // Row 4 (dispersing further)
    { col: 2, row: 4, color: '#F28C28', opacity: '0.55', delay: '0.6s', s: 7 },
    { col: 3, row: 4, color: '#F6B93B', opacity: '0.45', delay: '0.4s', s: 6 },
    { col: 4, row: 4, color: '#F28C28', opacity: '0.35', delay: '0.7s', s: 5 },
    { col: 5, row: 4, color: '#F6B93B', opacity: '0.2', delay: '0.5s', s: 4 },
    { col: 6, row: 4, color: '#FFFFFF', opacity: '0.15', delay: '0.8s', s: 3 },

    // Outliers (drifting away)
    { col: 3, row: 5, color: '#F6B93B', opacity: '0.3', delay: '0.8s', s: 5 },
    { col: 5, row: 5, color: '#F28C28', opacity: '0.25', delay: '0.9s', s: 4 },
    { col: 7, row: 3, color: '#F6B93B', opacity: '0.2', delay: '1.0s', s: 4 },
  ];

  const scaleFactor = size === 'sm' ? 0.75 : size === 'lg' ? 1.3 : 1;

  // Invert orientation if left or bottom
  const transformStyle = 
    position === 'top-left' ? 'scaleX(-1)' :
    position === 'bottom-right' ? 'scaleY(-1)' :
    position === 'bottom-left' ? 'scale(-1, -1)' : 'none';

  // Multiple drifting/twinkling speeds for natural dynamic twinkling
  const animationDurations = ['3.2s', '4.5s', '3.8s', '5.2s', '2.8s', '4.2s'];

  return (
    <div 
      className={`absolute ${positionClasses} pointer-events-none select-none z-0 overflow-hidden ${className}`}
      style={{ transform: transformStyle }}
      aria-hidden="true"
    >
      <div className="relative w-48 h-48 md:w-60 md:h-60 p-4">
        {pixels.map((p, idx) => {
          const pixelSize = Math.round(p.s * scaleFactor);
          const leftPos = (p.col - 1) * 24 * scaleFactor + (p.row % 2 === 0 ? 8 : 0);
          const topPos = (p.row - 1) * 24 * scaleFactor;
          const duration = animationDurations[idx % animationDurations.length];
          
          return (
            <span
              key={idx}
              className="absolute rounded-none transition-transform duration-700 hover:scale-125"
              style={{
                left: `${leftPos}px`,
                top: `${topPos}px`,
                width: `${pixelSize}px`,
                height: `${pixelSize}px`,
                backgroundColor: p.color,
                opacity: p.opacity,
                boxShadow: p.color === '#F28C28' ? '0 0 8px rgba(242, 140, 40, 0.5)' : 
                           p.color === '#F6B93B' ? '0 0 8px rgba(246, 185, 59, 0.4)' : 'none',
                animation: `pixelDriftTwinkle ${duration} ease-in-out infinite`,
                animationDelay: p.delay,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
