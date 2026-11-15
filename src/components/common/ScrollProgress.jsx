import React, { useState, useEffect } from 'react';

/**
 * Thin 3px orange-to-yellow progress bar fixed at the top of the page
 * that fills dynamically as the user scrolls down the page.
 * Uses requestAnimationFrame and a passive scroll listener for 60fps performance.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      const pct = Math.min(Math.max((scrolled / docHeight) * 100, 0), 100);
      setProgress(pct);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    calculateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-brand-orange to-brand-yellow transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
