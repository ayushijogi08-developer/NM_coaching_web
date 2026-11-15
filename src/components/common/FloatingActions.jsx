import React, { useState, useEffect } from 'react';
import { ArrowUp, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../../data/contactConfig';
import { useLanguage } from '../../i18n/LanguageContext';

// Official WhatsApp SVG icon
function WhatsAppIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.479 1.332 5.002L2 22l5.176-1.356a9.92 9.92 0 0 0 4.855 1.258h.004c5.508 0 9.984-4.476 9.984-9.984 0-2.668-1.039-5.175-2.926-7.062A9.923 9.923 0 0 0 12.031 2zm0 18.25c-1.503 0-2.973-.404-4.253-1.169l-.305-.181-3.158.828.843-3.078-.198-.316a8.232 8.232 0 0 1-1.265-4.35c0-4.57 3.718-8.288 8.289-8.288 2.214 0 4.296.863 5.862 2.43 1.566 1.567 2.428 3.649 2.428 5.863 0 4.57-3.718 8.288-8.288 8.288zm4.542-6.205c-.249-.125-1.474-.727-1.703-.81-.228-.083-.395-.125-.561.125-.166.249-.644.81-.79 1-.145.187-.291.208-.54.083-.249-.125-1.053-.388-2.006-1.238-.741-.661-1.242-1.478-1.387-1.728-.146-.249-.016-.384.108-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.437-.062-.125-.561-1.352-.769-1.851-.203-.487-.409-.42-.561-.428-.145-.008-.312-.01-.478-.01s-.437.062-.665.312c-.228.249-.873.853-.873 2.08s.894 2.413 1.019 2.58c.125.166 1.758 2.685 4.259 3.765.595.257 1.06.411 1.423.527.599.19 1.144.163 1.575.099.48-.072 1.474-.603 1.682-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.478-.291z" />
    </svg>
  );
}

const WHATSAPP_PREFILLED_MSG = "Hi, I would like to know about batches at Ninamore Knowledge Academy";
const WHATSAPP_FULL_URL = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(WHATSAPP_PREFILLED_MSG)}`;

export default function FloatingActions() {
  const { t, tr } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // 1. Scroll listener for Back-to-Top (Desktop only: appears only after > 600px scroll)
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Hide mobile sticky bar when typing or when virtual keyboard is open
  useEffect(() => {
    const handleFocusIn = (e) => {
      const tag = e.target.tagName?.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
      if (isInput) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    // Visual viewport listener for modern mobile browsers
    const handleViewportResize = () => {
      if (window.visualViewport) {
        const keyboardActive = window.visualViewport.height < window.innerHeight * 0.75;
        if (keyboardActive) {
          setIsKeyboardOpen(true);
        }
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize);
    }

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
    };
  }, []);

  const scrollToTop = () => {
    const prefersReduced = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP FLOATING CONTROLS (md and above only)                         */}
      {/*    - ONE floating WhatsApp button at bottom-right                         */}
      {/*    - Compact scroll-to-top button above WhatsApp (appears only > 600px)   */}
      {/*    - Zero clutter, safe 14px gap, never overlaps card buttons             */}
      {/* ========================================================================= */}
      <div 
        className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-center gap-3.5 pointer-events-none"
        aria-label="Quick site actions"
      >
        {/* Compact Back-to-Top Button (Appears only after 600px scroll) */}
        <button
          type="button"
          onClick={scrollToTop}
          className={`pointer-events-auto w-11 h-11 rounded-full bg-brand-deep text-white shadow-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-brand-purple hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${
            showBackToTop 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
          aria-label="Scroll back to top of page"
        >
          <ArrowUp className="w-4 h-4 text-brand-yellow" />
        </button>

        {/* WhatsApp Floating Circle Trigger */}
        <div className="pointer-events-auto relative group">
          {/* Tooltip */}
          <span className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-brand-deep text-white text-xs font-medium whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {tr("Chat on WhatsApp")}
            <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-brand-deep" />
          </span>

          <a
            href={WHATSAPP_FULL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 hover:bg-emerald-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 relative"
            aria-label="Chat with Ninamore Knowledge Academy on WhatsApp"
          >
            {/* Soft pulsing ring */}
            <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-60 animate-ping -z-10" />
            <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE STICKY BOTTOM BAR (below md only)                              */}
      {/*    - Floating circles are 100% hidden on mobile                           */}
      {/*    - Two equal-width (50/50) buttons: "Call" and "WhatsApp"               */}
      {/*    - Hides automatically when virtual keyboard opens or user types        */}
      {/*    - Includes safe-area-inset-bottom padding for iPhones                  */}
      {/* ========================================================================= */}
      <aside 
        className={`fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-purple-100 shadow-[0_-4px_20px_rgba(63,31,107,0.12)] px-3 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] transition-all duration-300 ease-in-out ${
          isKeyboardOpen ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
        }`}
        aria-label="Quick Mobile Actions"
      >
        <div className="flex items-center justify-between gap-2.5 max-w-md mx-auto">
          {/* Equal-Width Button 1: Call (Secondary on Light Background) */}
          <a
            href={CONTACT_INFO.phoneTel}
            className="btn-secondary-light flex-1"
            aria-label={`Call Ninamore Knowledge Academy at ${CONTACT_INFO.phoneDisplay}`}
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>{t('mobileBar.call')}</span>
          </a>

          {/* Equal-Width Button 2: WhatsApp (Primary Action) */}
          <a
            href={WHATSAPP_FULL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1"
            aria-label="Chat with Ninamore Knowledge Academy on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>{t('mobileBar.whatsapp')}</span>
          </a>
        </div>
      </aside>
    </>
  );
}
