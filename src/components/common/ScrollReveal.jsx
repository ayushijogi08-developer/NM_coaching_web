import React, { useEffect, useRef, useState } from 'react';

/**
 * Upgraded ScrollReveal foundation supporting multiple directional and scale variants,
 * configurable duration & delays up to 600ms, with fallbacks for reduced-motion,
 * missing IntersectionObserver, and safety unhide timer.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variant,
  direction = 'up', // backward compatibility
  duration = 700,
  threshold = 0.01,
}) {
  const activeVariant = variant || (direction === 'none' ? 'fade' : direction) || 'up';

  const [isVisible, setIsVisible] = useState(() => {
    // If IntersectionObserver is not supported or user prefers reduced motion, show immediately
    if (typeof window === 'undefined') return true;
    if (typeof window.IntersectionObserver === 'undefined') return true;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  const elementRef = useRef(null);
  const clampedDelay = Math.min(Math.max(delay, 0), 600);
  const animDuration = typeof duration === 'number' && duration > 0 ? duration : 700;

  useEffect(() => {
    if (isVisible) return;

    if (
      typeof window === 'undefined' ||
      typeof window.IntersectionObserver === 'undefined' ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Safety fallback: never keep content stuck hidden even if observer fails
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, Math.max(1000, clampedDelay + animDuration));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold, isVisible, clampedDelay, animDuration]);

  const getInitialTransform = (v) => {
    switch (v) {
      case 'down':
        return 'translateY(-24px)';
      case 'left':
        return 'translateX(-24px)';
      case 'right':
        return 'translateX(24px)';
      case 'scale':
        return 'scale(0.92)';
      case 'fade':
        return 'none';
      case 'up':
      default:
        return 'translateY(24px)';
    }
  };

  const initialTransform = getInitialTransform(activeVariant);
  const targetTransform = activeVariant === 'scale' ? 'scale(1)' : 'translate3d(0, 0, 0)';

  return (
    <div
      ref={elementRef}
      className={`will-change-transform ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? targetTransform : initialTransform,
        transition: `opacity ${animDuration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${animDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${clampedDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}
