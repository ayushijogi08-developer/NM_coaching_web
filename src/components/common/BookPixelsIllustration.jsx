import React, { useState, useRef, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Custom SVG & CSS illustration of an open book breaking into floating pixels
 * matching the Ninamore Knowledge Academy logo aesthetic.
 * Features a desktop mouse-follow 3D tilt/parallax (max ~8deg) with graceful fallback for touch and reduced-motion.
 */
export default function BookPixelsIllustration() {
  const { tr } = useLanguage();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const checkDisabled = () => {
      if (typeof window === 'undefined') return;
      const reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      const touchDevice = !!(window.matchMedia && window.matchMedia('(hover: none) or (pointer: coarse)').matches) || ('ontouchstart' in window);
      setDisabled(reducedMotion || touchDevice);
    };

    checkDisabled();
    window.addEventListener('resize', checkDisabled);
    return () => window.removeEventListener('resize', checkDisabled);
  }, []);

  const handleMouseMove = (e) => {
    if (disabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const maxTilt = 8;
    setTilt({
      x: -percentY * maxTilt,
      y: percentX * maxTilt,
    });
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-md mx-auto select-none animate-float-slow" style={{ perspective: '1000px' }}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 via-brand-yellow/15 to-purple-400/20 rounded-full blur-3xl transform scale-90 pointer-events-none" />

      {/* Main Illustration Glass Container with 3D Tilt */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl bg-white/10 backdrop-blur-md p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden will-change-transform"
        style={{
          transform: disabled
            ? 'none'
            : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        
        {/* Floating Top Status Card: "Open today 11 AM – 8 PM" */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-deep/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-lg animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3" />
            <Clock className="w-3.5 h-3.5 text-brand-yellow ml-0.5" />
            <span className="font-medium tracking-wide">{tr("Open today 11 AM – 8 PM")}</span>
          </div>
        </div>

        {/* Book to Pixels SVG Canvas */}
        <div className="pt-8 pb-4 flex items-center justify-center">
          <svg
            viewBox="0 0 340 220"
            width="340"
            height="220"
            className="w-full h-auto max-h-56 drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft backdrop radial highlight */}
            <circle cx="170" cy="110" r="90" fill="#6B3FA0" fillOpacity="0.3" />

            {/* Book Spine Base / Underline (Curved double spine in orange #F28C28) */}
            <path
              d="M 50 160 Q 110 175 160 162 Q 210 175 270 160"
              stroke="#F28C28"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 54 168 Q 110 182 160 170 Q 210 182 266 168"
              stroke="#F6B93B"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Left Page (White open solid book page with subtle shading) */}
            <g>
              <path
                d="M 160 155 Q 110 168 50 152 L 50 78 Q 110 94 160 80 Z"
                fill="#FFFFFF"
                className="transition-all duration-300"
              />
              {/* Subtle page fold highlight */}
              <path
                d="M 158 82 L 158 153"
                stroke="#E2D9F3"
                strokeWidth="2"
              />
              {/* Text lines on left page */}
              <rect x="68" y="98" width="68" height="4" rx="2" fill="#6B3FA0" fillOpacity="0.25" />
              <rect x="68" y="112" width="76" height="4" rx="2" fill="#6B3FA0" fillOpacity="0.2" />
              <rect x="68" y="126" width="60" height="4" rx="2" fill="#6B3FA0" fillOpacity="0.25" />
              <rect x="68" y="140" width="48" height="4" rx="2" fill="#F28C28" fillOpacity="0.5" />
            </g>

            {/* Right Page (Page lines breaking and dissolving into floating pixels) */}
            <g>
              {/* Connected base parts of right page text lines */}
              <path d="M 164 81 Q 200 90 220 84" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 164 96 Q 200 105 230 99" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 164 111 Q 200 120 235 114" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 164 126 Q 200 135 230 129" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 164 141 Q 200 150 225 144" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 164 156 Q 200 165 218 159" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />

              {/* Highlight lines in yellow & orange */}
              <path d="M 205 97 L 226 95" stroke="#F6B93B" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 195 127 L 218 124" stroke="#F28C28" strokeWidth="5.5" strokeLinecap="round" />

              {/* Pixels: Level 1 (near the page edge) */}
              <rect x="232" y="80" width="8" height="8" rx="1.5" fill="#FFFFFF" />
              <rect x="244" y="83" width="7" height="7" rx="1.5" fill="#F6B93B" />
              
              <rect x="242" y="95" width="9" height="9" rx="1.5" fill="#F28C28" />
              <rect x="256" y="93" width="7" height="7" rx="1.5" fill="#FFFFFF" />

              <rect x="248" y="110" width="8" height="8" rx="1.5" fill="#FFFFFF" />
              <rect x="260" y="108" width="9" height="9" rx="1.5" fill="#F6B93B" />

              <rect x="242" y="125" width="8" height="8" rx="1.5" fill="#F28C28" />
              <rect x="254" y="123" width="7" height="7" rx="1.5" fill="#FFFFFF" />

              <rect x="232" y="140" width="8" height="8" rx="1.5" fill="#FFFFFF" />
              <rect x="245" y="139" width="7" height="7" rx="1.5" fill="#F6B93B" />

              {/* Pixels: Level 2 (floating outward & rising) */}
              <rect x="268" y="72" width="9" height="9" rx="1.5" fill="#FFFFFF" opacity="0.9" />
              <rect x="282" y="78" width="7" height="7" rx="1.5" fill="#F6B93B" opacity="0.85" />
              <rect x="294" y="84" width="6" height="6" rx="1" fill="#F28C28" opacity="0.8" />

              <rect x="274" y="92" width="8" height="8" rx="1.5" fill="#F6B93B" opacity="0.9" />
              <rect x="288" y="98" width="7" height="7" rx="1.5" fill="#F28C28" opacity="0.85" />

              <rect x="278" y="114" width="8" height="8" rx="1.5" fill="#FFFFFF" opacity="0.85" />
              <rect x="292" y="118" width="6" height="6" rx="1" fill="#F6B93B" opacity="0.75" />

              {/* Pixels: Level 3 (dispersing further into space) */}
              <rect x="278" y="58" width="7" height="7" rx="1" fill="#F28C28" opacity="0.8" />
              <rect x="295" y="66" width="6" height="6" rx="1" fill="#FFFFFF" opacity="0.75" />
              <rect x="306" y="75" width="5" height="5" rx="1" fill="#F6B93B" opacity="0.6" />

              <rect x="296" y="105" width="6" height="6" rx="1" fill="#FFFFFF" opacity="0.7" />
              <rect x="308" y="112" width="5" height="5" rx="1" fill="#F28C28" opacity="0.5" />
            </g>
          </svg>
        </div>

        {/* Bottom Banner inside the floating card */}
        <div className="mt-2 pt-4 border-t border-white/10 flex items-center justify-between text-left">
          <div>
            <span className="text-xs font-semibold tracking-wide text-brand-yellow block">
              {tr("Skill & Tutorial Institute")}
            </span>
            <span className="text-xs sm:text-sm font-heading font-semibold text-white">
              Ninamore Knowledge Academy
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-brand-orange/30 border border-brand-orange/50 text-xs font-semibold text-brand-yellow">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
            <span>{tr("Akola, MH")}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
