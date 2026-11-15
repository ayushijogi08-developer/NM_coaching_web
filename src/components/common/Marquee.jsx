import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const DEFAULT_KEYS = ['cbse', 'state', 'class5to10', 'class12', 'doubts', 'tests', 'batches', 'parents'];

/**
 * Infinite, seamless, pauses-on-hover horizontal ticker banner.
 * Yellow/orange text on a deep-purple band with star/dot icons.
 */
export default function Marquee({
  items,
  className = '',
  speed = 'normal', // 'normal' | 'slow'
}) {
  const animClass = speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee';
  const { t } = useLanguage();
  const list = items || DEFAULT_KEYS.map((k) => t('marquee.' + k));

  return (
    <div
      className={`w-full overflow-hidden bg-brand-deep text-brand-yellow py-3 border-y border-white/10 select-none group relative z-20 ${className}`}
      role="region"
      aria-label="Highlights marquee"
    >
      <div className="flex w-max group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {/* Track 1 */}
        <div className={`flex items-center shrink-0 ${animClass}`}>
          {list.map((item, idx) => (
            <span key={`t1-${idx}`} className="inline-flex items-center text-xs sm:text-sm font-semibold tracking-wide">
              <span className="text-white hover:text-brand-yellow transition-colors whitespace-nowrap">
                {item}
              </span>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-yellow inline mx-3 sm:mx-5 shrink-0" aria-hidden="true" />
            </span>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless loop) */}
        <div className={`flex items-center shrink-0 ${animClass}`} aria-hidden="true">
          {list.map((item, idx) => (
            <span key={`t2-${idx}`} className="inline-flex items-center text-xs sm:text-sm font-semibold tracking-wide">
              <span className="text-white hover:text-brand-yellow transition-colors whitespace-nowrap">
                {item}
              </span>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-yellow inline mx-3 sm:mx-5 shrink-0" />
            </span>
          ))}
        </div>

        {/* Track 3 (Extra buffer for ultra-wide displays) */}
        <div className={`flex items-center shrink-0 ${animClass}`} aria-hidden="true">
          {list.map((item, idx) => (
            <span key={`t3-${idx}`} className="inline-flex items-center text-xs sm:text-sm font-semibold tracking-wide">
              <span className="text-white hover:text-brand-yellow transition-colors whitespace-nowrap">
                {item}
              </span>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-yellow inline mx-3 sm:mx-5 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
