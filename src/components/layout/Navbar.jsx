import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, MapPin, Clock, Globe, ChevronDown } from 'lucide-react';
import { CONTACT_INFO } from '../../data/contactConfig';
import { useLanguage } from '../../i18n/LanguageContext';

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Courses', id: 'courses' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'Contact', id: 'contact' },
];

// Mapping of all page sections to their corresponding navbar item
// Non-menu sections map to their nearest parent section or null
const SECTION_MAP = [
  { id: 'home', navId: 'home' },
  { id: 'about', navId: 'about' },
  { id: 'why-ninamore', navId: 'about' },      // Parent: About
  { id: 'courses', navId: 'courses' },
  { id: 'batch-timings', navId: 'courses' },   // Parent: Courses (Timings)
  { id: 'batch-finder', navId: 'courses' },    // Parent: Courses (Course Quiz)
  { id: 'mentors', navId: 'courses' },         // Parent: Courses (Faculty)
  { id: 'gallery', navId: 'gallery' },
  { id: 'admissions', navId: null },           // Dedicated "Enquire Now" CTA button
  { id: 'faq', navId: null },                  // No link highlighted
  { id: 'contact', navId: 'contact' },
];

export default function Navbar() {
  const { lang, setLang, languages, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  // Close the language dropdown on outside tap or Escape
  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  // Unified high-performance scroll handler for scroll detection & scroll spy
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // 1. Scrolled state threshold
          setScrolled(scrollY > 20);

          // 2. Scroll spy calculation
          if (scrollY < 120) {
            setActive('home');
          } else if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
            // Reached bottom of page -> highlight Contact
            setActive('contact');
          } else {
            const offset = 140; // Navbar height + scroll buffer
            let currentNavId = 'home';
            for (const { id, navId } of SECTION_MAP) {
              const el = document.getElementById(id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= offset) {
                  currentNavId = navId;
                }
              }
            }
            setActive(currentNavId);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll(); // Run immediately on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Body scroll locking when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#5A2E94]">
      {/* 
        Solid Deep-Purple Navbar:
        - Default state: Solid #5A2E94 (100% opaque), 68px desktop / 64px mobile, shadow-sm
        - Scrolled state: Solid #4A2680 (100% opaque, slightly darker), 60px desktop / 56px mobile, soft shadow
        - NEVER transparent or white in any state
      */}
      <nav
        className={`w-full flex items-center transition-all duration-300 ${scrolled
          ? 'h-14 md:h-[60px] bg-[#4A2680] shadow-md shadow-purple-950/40 border-b border-purple-900/60'
          : 'h-16 md:h-[68px] bg-[#5A2E94] shadow-sm border-b border-white/10'
          }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">

            {/* Logo on the left */}
            <Link
              to="/#home"
              className="flex items-center gap-2 sm:gap-2.5 group min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow rounded-xl p-0.5"
              aria-label="Ninamore Knowledge Academy Home"
            >
              <div className="relative flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Ninamore Knowledge Academy Logo"
                  className={`object-contain rounded-full ring-1 ring-white/20 bg-white/5 transition-all duration-300 ${scrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-9 h-9 sm:w-10 sm:h-10'
                    }`}
                  width="40"
                  height="40"
                />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-none bg-brand-yellow" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-heading font-bold text-white tracking-tight leading-tight group-hover:text-brand-yellow transition-all duration-300 ${scrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                    }`}>
                    NINAMORE
                  </span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-none bg-brand-orange" />
                </div>
                <span className="font-heading font-medium text-[11px] sm:text-xs tracking-wide text-brand-yellow whitespace-nowrap leading-tight">
                  Knowledge Academy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Animated Active-Section Underline */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.id;
                return (
                  <Link
                    key={link.id}
                    to={`/#${link.id}`}
                    className={`relative px-3.5 py-1.5 rounded-xl text-sm transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${isActive
                      ? 'text-white font-bold'
                      : 'text-purple-100 font-medium hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <span>{t('nav.' + link.id)}</span>

                    {/* Animated Active-Section Underline */}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand-yellow transition-all duration-300 ease-out origin-left ${isActive
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-60'
                        }`}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right: Enquire Now Button */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center rounded-full bg-white/10 p-1" role="group" aria-label="Language">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    aria-pressed={lang === l.code}
                    title={l.fullName}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors ${lang === l.code ? 'bg-brand-yellow text-brand-deep' : 'text-white hover:bg-white/10'
                      }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <Link
                to="/#admissions"
                className="btn-primary"
              >
                <span>{t('nav.enquireNow')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Actions: Language dropdown + Hamburger */}
            <div className="flex md:hidden items-center gap-1.5 shrink-0">
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setLangOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  aria-label="Change language"
                  className="flex items-center gap-1 h-9 px-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow transition-colors"
                >
                  <Globe className="w-4 h-4 text-brand-yellow" />
                  <span>{languages.find((l) => l.code === lang)?.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                {langOpen && (
                  <ul
                    role="listbox"
                    aria-label="Language"
                    className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-[#2F1553] border border-white/15 shadow-xl shadow-black/40 p-1.5 z-50"
                  >
                    {languages.map((l) => (
                      <li key={l.code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={lang === l.code}
                          onClick={() => {
                            setLang(l.code);
                            setLangOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${lang === l.code
                              ? 'bg-brand-yellow text-brand-deep font-bold'
                              : 'text-white hover:bg-white/10'
                            }`}
                        >
                          <span>{l.fullName}</span>
                          {lang === l.code && <span aria-hidden="true">✓</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-brand-yellow" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu (Solid Deep Purple, completely readable) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop: solid dark overlay */}
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Body: Solid Deep Purple (#3F1F6B) */}
        <div
          className={`fixed top-0 right-0 w-full max-w-xs h-full bg-[#3F1F6B] text-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out border-l border-white/10 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Drawer Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#2F1553]">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Ninamore Knowledge Academy Logo"
                width="36"
                height="36"
                className="w-9 h-9 rounded-full object-contain ring-1 ring-white/20"
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm text-white">NINAMORE</span>
                <span className="text-xs tracking-wide text-brand-yellow font-medium">Knowledge Academy</span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-purple-100 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="px-4 py-6 flex-1 overflow-y-auto space-y-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <Link
                  key={link.id}
                  to={`/#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${isActive
                    ? 'bg-[#5A2E94] text-white font-bold border-l-4 border-brand-yellow shadow-inner'
                    : 'text-purple-100 font-medium hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span>{t('nav.' + link.id)}</span>
                  <ArrowRight className={`w-4 h-4 ${isActive ? 'text-brand-yellow' : 'opacity-60'}`} />
                </Link>
              );
            })}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-white/10 bg-[#2F1553] space-y-3">
            {/* Language switch (moved here from the top bar on mobile) */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-purple-200 mb-2 font-semibold">
                Language
              </p>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Language">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    aria-pressed={lang === l.code}
                    className={`h-10 rounded-xl text-sm font-semibold transition-colors ${lang === l.code
                      ? 'bg-brand-yellow text-brand-deep'
                      : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-purple-100 space-y-1.5">
              <a
                href={CONTACT_INFO.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-brand-yellow transition-colors"
                aria-label="Open academy location on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                <span>{t('nav.addressShort')}</span>
              </a>
              <p className="flex items-center gap-2 text-xs text-purple-100">
                <Clock className="w-3 h-3 text-brand-yellow shrink-0" />
                <span>{t('nav.hoursShort')}</span>
              </p>
            </div>
            <Link
              to="/#admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full"
            >
              <span>{t('nav.enquireNow')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
