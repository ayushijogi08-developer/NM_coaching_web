import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

/**
 * Free Demo Class Highlight Banner
 * 
 * Bold, high-trust callout: "Free Demo Class: Try before you join"
 * Highlights 3 core trial benefits and guides students to the enquiry form.
 */
export default function FreeDemoBanner({ className = '' }) {
  const { t } = useLanguage();

  const benefits = [
    t('demoBanner.benefit1'),
    t('demoBanner.benefit2'),
    t('demoBanner.benefit3'),
  ];

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <ScrollReveal variant="scale">
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-brand-deep via-[#542B85] to-brand-purple p-5 sm:p-7 text-white shadow-xl border border-white/15 overflow-hidden">
          
          {/* Subtle background ambient glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-orange/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-yellow/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6">
            
            {/* Left: Icon + Heading + Benefits */}
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-brand-orange/20 text-brand-yellow flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 animate-bounce" style={{ animationDuration: '2.5s' }} />
                </span>
                <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-brand-yellow px-2.5 py-0.5 rounded-full bg-white/10">
                  {t('demoBanner.badge')}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                {t('demoBanner.title')}
              </h3>

              {/* 3 Short Benefit Points */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-purple-100 font-medium">
                {benefits.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA Button */}
            <div className="w-full lg:w-auto shrink-0 pt-1 lg:pt-0">
              <a
                href="#admissions"
                className="btn-primary btn-primary-lg w-full sm:w-auto"
              >
                <span>{t('demoBanner.button')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
