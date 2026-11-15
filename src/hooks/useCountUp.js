import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 to a target when the element enters the viewport.
 * Uses easeOutCubic easing over 1.5s, runs once, and skips animation for prefers-reduced-motion.
 *
 * @param {number|object} targetInput - Target number or config object { target, duration, start }
 * @param {number} [customDuration=1500] - Duration in ms (default 1500ms / 1.5s)
 * @returns {[number, React.RefObject]} [count, ref] - Also accessible via .count and .ref
 */
export function useCountUp(targetInput, customDuration = 1500) {
  const target =
    typeof targetInput === 'object' && targetInput !== null
      ? (targetInput.target ?? targetInput.end ?? 0)
      : typeof targetInput === 'number'
      ? targetInput
      : parseInt(targetInput, 10) || 0;

  const duration =
    typeof targetInput === 'object' && targetInput !== null
      ? (targetInput.duration ?? 1500)
      : customDuration || 1500;

  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const checkReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  };

  const [count, setCount] = useState(() => {
    if (checkReducedMotion()) return target;
    return 0;
  });

  useEffect(() => {
    if (checkReducedMotion()) {
      setCount(target);
      return;
    }

    if (hasAnimated.current) return;

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setCount(target);
      return;
    }

    let animationFrameId;

    const startAnimation = () => {
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic: 1 - (1 - t)^3
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.round(easedProgress * target);

        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(entry.target);
          startAnimation();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [target, duration]);

  const result = [count, ref];
  result.count = count;
  result.ref = ref;
  return result;
}

export default useCountUp;
