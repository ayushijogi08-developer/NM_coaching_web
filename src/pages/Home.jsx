import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import PixelDisperseMotif from '../components/common/PixelDisperseMotif';
import BookPixelsIllustration from '../components/common/BookPixelsIllustration';
import { useLanguage } from '../i18n/LanguageContext';
import { CONTACT_INFO } from '../data/contactConfig';

export default function Home() {
  const { t, tr } = useLanguage();

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-brand-deep via-[#5A2E94] to-brand-purple text-white pt-10 pb-16 md:pt-16 md:pb-20 overflow-hidden">
      {/* Signature pixel pattern motif (hero only) */}
      <PixelDisperseMotif position="top-right" variant="dark" size="lg" className="opacity-90" />
      <PixelDisperseMotif position="bottom-left" variant="dark" size="sm" className="opacity-30" />

      {/* Decorative floating shapes in hero background (low opacity, perimeter only, non-interfering) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* 1. Yellow circle top-left */}
        <div
          className="absolute top-10 left-[5%] w-3.5 h-3.5 rounded-full border border-brand-yellow/35 animate-float"
          style={{ animationDuration: '6s', animationDelay: '0s' }}
        />
        {/* 2. Orange plus sign top-left */}
        <div
          className="absolute top-24 left-[20%] text-brand-yellow/30 font-bold text-sm animate-float-slow"
          style={{ animationDuration: '7.5s', animationDelay: '1.2s' }}
        >
          +
        </div>
        {/* 3. Yellow square bottom-left */}
        <div
          className="absolute bottom-24 left-[8%] w-2.5 h-2.5 bg-brand-yellow/20 rounded-sm rotate-12 animate-float"
          style={{ animationDuration: '5.8s', animationDelay: '2.5s' }}
        />
        {/* 4. White circle top-right */}
        <div
          className="absolute top-14 right-[12%] w-4 h-4 rounded-full border border-white/20 animate-float-slow"
          style={{ animationDuration: '8s', animationDelay: '0.8s' }}
        />
        {/* 5. Yellow plus sign middle-right */}
        <div
          className="absolute top-1/2 right-[4%] text-brand-yellow/30 font-bold text-base animate-float"
          style={{ animationDuration: '6.8s', animationDelay: '1.8s' }}
        >
          +
        </div>
        {/* 6. Orange diamond bottom-right */}
        <div
          className="absolute bottom-20 right-[18%] w-2.5 h-2.5 bg-brand-orange/25 rounded-sm rotate-45 animate-float-slow"
          style={{ animationDuration: '7.2s', animationDelay: '3s' }}
        />
        {/* 7. Tiny white circle bottom-center */}
        <div
          className="absolute bottom-16 left-[46%] w-2 h-2 rounded-full bg-white/25 animate-float"
          style={{ animationDuration: '6.2s', animationDelay: '2.2s' }}
        />
        {/* 8. White plus sign top-center-right */}
        <div
          className="absolute top-8 right-[36%] text-white/20 font-bold text-xs animate-float-slow"
          style={{ animationDuration: '8.5s', animationDelay: '1.5s' }}
        >
          +
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Eyebrow Badge (Fades up first on load) */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-brand-yellow shadow-sm animate-fade-in-up [animation-fill-mode:both]"
              style={{ animationDelay: '50ms' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Headline with sequential word slide-in & gradient-shift on "Grow." */}
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.15]">
              <span
                className="inline-block animate-fade-in-up [animation-fill-mode:both]"
                style={{ animationDelay: '150ms' }}
              >
                {t('hero.learn')}
              </span>{' '}
              <span
                className="inline-block animate-fade-in-up [animation-fill-mode:both]"
                style={{ animationDelay: '300ms' }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-yellow bg-[length:200%_auto] animate-gradient-shift">
                  {t('hero.grow')}
                </span>
              </span>{' '}
              <span
                className="inline-block animate-fade-in-up [animation-fill-mode:both]"
                style={{ animationDelay: '450ms' }}
              >
                {t('hero.succeed')}
              </span>
            </h1>

            {/* Subtext Paragraph */}
            <p
              className="text-[15px] sm:text-base text-purple-100 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in-up [animation-fill-mode:both]"
              style={{ animationDelay: '550ms' }}
            >
              {t('hero.paragraph')}
            </p>

            {/* Action Buttons (with pulsing glow ring on primary CTA) */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1 animate-fade-in-up [animation-fill-mode:both]"
              style={{ animationDelay: '700ms' }}
            >
              <Link
                to="/#courses"
                className="btn-primary btn-primary-lg w-full sm:w-auto relative group overflow-visible"
              >
                {/* Soft pulsing glow ring */}
                <span
                  className="absolute inset-0 rounded-xl bg-brand-orange/35 animate-pulse-ring -z-10 pointer-events-none"
                  aria-hidden="true"
                />
                <span>{t('hero.ctaCourses')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/#admissions"
                className="btn-secondary btn-primary-lg w-full sm:w-auto"
              >
                <span>{t('hero.ctaDemo')}</span>
              </Link>
            </div>

            {/* Small "Trusted by families in Akola" line (No fake numbers) */}
            <div 
              className="flex items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-purple-200/90 font-medium animate-fade-in-up [animation-fill-mode:both]"
              style={{ animationDelay: '800ms' }}
            >
              <ShieldCheck className="w-4 h-4 text-brand-yellow shrink-0" />
              <span>{t('trust.familiesLine')}</span>
            </div>

            {/* Quick Campus Snapshot */}
            <div
              className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-purple-100 animate-fade-in-up [animation-fill-mode:both]"
              style={{ animationDelay: '900ms' }}
            >
              <a
                href={CONTACT_INFO.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors"
                aria-label="Open academy location on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{tr("Alsi Plot 393, Akola")}</span>
              </a>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{tr("Small Batch Focus")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{tr("Mon–Sun: 11 AM – 8 PM")}</span>
              </div>
            </div>

          </div>

          {/* Right: Floating Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <BookPixelsIllustration />
          </div>

        </div>
      </div>

      {/* Animated Scroll Down Indicator (hidden on small mobile screens to prevent crowding) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center">
        <a
          href="#about"
          onClick={handleScrollToAbout}
          aria-label="Scroll to About section"
          className="group flex flex-col items-center gap-1 text-purple-200/75 hover:text-white transition-colors duration-200 focus:outline-none"
        >
          <span className="text-[10px] font-semibold tracking-widest uppercase opacity-75 group-hover:opacity-100 transition-opacity">
            {tr("Scroll")}
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-white/35 group-hover:border-white/80 flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-full bg-brand-yellow animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
