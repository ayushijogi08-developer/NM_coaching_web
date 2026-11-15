import React from 'react';
import { Clock, Users, Calendar, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { BATCH_TIMINGS_DATA } from '../../data/batchData';
import { CONTACT_INFO } from '../../data/contactConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

/**
 * Batch Timings and Capacity Section
 * 
 * Shows official operational batch hours (11:00 AM to 8:00 PM),
 * seat availability status badges, and official transparent fee contact notice.
 */
export default function BatchTimings() {
  const { t } = useLanguage();

  return (
    <section id="batch-timings" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
              {t('batch.badge')}
            </span>
            <div className="relative inline-block">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
                {t('batch.title')}
              </h2>
              <span
                className="block h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow"
                aria-hidden="true"
              />
            </div>
            <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
              {t('batch.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop Table / Mobile Cards */}
        <ScrollReveal variant="up" delay={80}>
          <div className="bg-[#F5F0FA] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#6B3FA0]/15 shadow-sm">
            
            {/* Grid of Batch Slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BATCH_TIMINGS_DATA.map((batch) => {
                const isOpen = batch.statusType === 'open';

                return (
                  <div
                    key={batch.id}
                    className="bg-white rounded-2xl p-5 border border-purple-100/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Slot Header + Seat Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                          {batch.slot}
                        </span>
                        
                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isOpen
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                            }`}
                          />
                          <span>{isOpen ? t('batch.seatsOpen') : t('batch.fewSeats')}</span>
                        </span>
                      </div>

                      {/* Batch Name */}
                      <h3 className="font-heading font-bold text-base text-brand-deep mb-2">
                        {batch.name}
                      </h3>

                      {/* Time Slot */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] bg-amber-50/70 p-2 rounded-xl mb-3 border border-amber-200/50">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-brand-orange" />
                        <span>{batch.time}</span>
                      </div>

                      {/* Days & Target Audience */}
                      <div className="space-y-1.5 text-xs text-[#5B4B75] mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                          <span>{batch.days}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Users className="w-3.5 h-3.5 text-brand-deep shrink-0 mt-0.5" />
                          <span className="font-medium text-brand-deep">{batch.targetAudience}</span>
                        </div>
                      </div>

                      {/* Highlight Note */}
                      <p className="text-[11px] text-[#5B4B75] italic leading-relaxed pt-2 border-t border-gray-100">
                        "{batch.highlight}"
                      </p>
                    </div>

                    {/* Quick Enquire CTA for this batch */}
                    <div className="pt-4 mt-3 border-t border-purple-50">
                      <a
                        href="#admissions"
                        className="btn-primary btn-sm w-full"
                      >
                        <span>Reserve Seat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Fees Notice & Academy Transparency Policy */}
            <div className="mt-6 pt-5 border-t border-[#6B3FA0]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-brand-deep font-semibold">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{t('batch.feesNotice')}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={CONTACT_INFO.phoneTel}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {CONTACT_INFO.phoneDisplay}</span>
                </a>
                <a
                  href="#admissions"
                  className="btn-primary btn-sm shrink-0"
                >
                  <span>Book Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
