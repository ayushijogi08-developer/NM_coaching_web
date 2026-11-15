import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Above-the-fold components loaded eagerly for immediate FCP
import Home from './Home';
import Marquee from '../components/common/Marquee';
import FreeDemoBanner from '../components/common/FreeDemoBanner';
import SectionDivider from '../components/common/SectionDivider';
import ScrollReveal from '../components/common/ScrollReveal';
import { CONTACT_INFO } from '../data/contactConfig';
import { useLanguage } from '../i18n/LanguageContext';

// Below-the-fold components lazy-loaded for performance and code splitting
const About = lazy(() => import('./About'));
const StatsStrip = lazy(() => import('../components/common/StatsStrip'));
const Courses = lazy(() => import('./Courses'));
const BatchTimings = lazy(() => import('../components/common/BatchTimings'));
const BatchFinder = lazy(() => import('../components/common/BatchFinder'));
const MentorsSection = lazy(() => import('../components/sections/MentorsSection'));
const Gallery = lazy(() => import('./Gallery'));
const TestimonialCarousel = lazy(() => import('../components/common/TestimonialCarousel'));
const Admissions = lazy(() => import('./Admissions'));
const Contact = lazy(() => import('./Contact'));
const FaqAccordion = lazy(() => import('../components/common/FaqAccordion'));

// Lightweight accessible fallback placeholder for lazy loaded sections
function SectionLoader() {
  return (
    <div className="py-16 flex items-center justify-center opacity-60" aria-hidden="true">
      <div className="w-7 h-7 rounded-full border-2 border-brand-purple border-t-brand-orange animate-spin" />
    </div>
  );
}

export default function OnePage() {
  const { t, tr } = useLanguage();
  return (
    <>
      {/* 1. Hero Section (Deep Purple - Eager) */}
      <div id="home"><Home /></div>

      {/* Seamless Horizontal Ticker Strip directly below Hero */}
      <Marquee />

      {/* Free Demo Class highlight banner directly below Hero Marquee */}
      <div className="bg-brand-deep pb-6 pt-1">
        <FreeDemoBanner />
      </div>

      {/* Transition: Deep Purple Hero Band -> Lavender About */}
      <SectionDivider variant="wave" fillColor="#F5F0FA" className="bg-brand-deep" />

      {/* 2. About Academy Section (Lavender #F5F0FA - Lazy) */}
      <div id="about">
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
      </div>

      {/* Transition: Lavender About -> Deep Purple Stats + Why Ninamore */}
      <SectionDivider variant="curve" fillColor="#3F1F6B" className="bg-[#F5F0FA]" />

      {/* 3. Verified Stats + Compact Why Ninamore Advantages (Deep Purple Band - Lazy) */}
      <div id="why-ninamore">
        <Suspense fallback={<SectionLoader />}>
          <StatsStrip />
        </Suspense>
      </div>

      {/* Transition: Deep Purple Stats -> White Courses */}
      <SectionDivider variant="curve" fillColor="#FFFFFF" className="bg-brand-deep" />

      {/* 4. Courses & Curriculum Section + Official Batch Schedules (White - Lazy) */}
      <div id="courses">
        <Suspense fallback={<SectionLoader />}>
          <Courses />
          <BatchTimings />
        </Suspense>
      </div>

      {/* Transition: White Courses -> Lavender Find My Batch Quiz */}
      <SectionDivider variant="wave" fillColor="#F5F0FA" className="bg-white" />

      {/* 5. "Find My Batch" Interactive Quiz (Lavender #F5F0FA - Lazy) */}
      <div id="batch-finder">
        <Suspense fallback={<SectionLoader />}>
          <BatchFinder />
        </Suspense>
      </div>

      {/* Transition: Lavender Batch Finder -> White Meet the Mentors */}
      <SectionDivider variant="curve" fillColor="#FFFFFF" className="bg-[#F5F0FA]" />

      {/* 6. Meet the Mentors Section with 3D Flip Cards & Focus Areas (White - Lazy) */}
      <div id="mentors">
        <Suspense fallback={<SectionLoader />}>
          <MentorsSection />
        </Suspense>
      </div>

      {/* 7. Campus Gallery with Lightbox (White - Lazy) */}
      <div id="gallery">
        <Suspense fallback={<SectionLoader />}>
          <Gallery />
        </Suspense>
      </div>

      {/* 9. Student Voices / Testimonials (Renders only if SHOW_TESTIMONIALS is true) */}
      <Suspense fallback={null}>
        <TestimonialCarousel />
      </Suspense>

      {/* Transition: White Gallery -> Lavender Admissions */}
      <SectionDivider variant="wave" fillColor="#F5F0FA" className="bg-white" />

      {/* 10. Admissions & Enquiry Portal (Lavender #F5F0FA - Lazy) */}
      <div id="admissions">
        <Suspense fallback={<SectionLoader />}>
          <Admissions />
        </Suspense>
      </div>

      {/* Transition: Lavender Admissions -> White FAQ */}
      <SectionDivider variant="curve" fillColor="#FFFFFF" className="bg-[#F5F0FA]" />

      {/* 11. FAQ Section (White - Lazy) */}
      <div id="faq">
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal variant="up">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
                  {t('faq.badge')}
                </span>
                <div className="relative inline-block">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
                    {t('faq.title')}
                  </h2>
                  <span
                    className="block h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
                  {t('faq.subtitle')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={100}>
              <Suspense fallback={<SectionLoader />}>
                <FaqAccordion />
              </Suspense>
            </ScrollReveal>
          </div>
        </section>
      </div>

      {/* Transition: White FAQ -> Lavender Contact */}
      <SectionDivider variant="wave" fillColor="#F5F0FA" className="bg-white" />

      {/* 12. Contact & Location Section (Lavender #F5F0FA - Lazy) */}
      <div id="contact">
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </div>

      {/* Transition: Lavender Contact -> Deep Purple Pre-Footer CTA */}
      <SectionDivider variant="curve" fillColor="#3F1F6B" className="bg-[#F5F0FA]" />

      {/* 13. Single Final Pre-Footer CTA (Deep Purple Band - Eager) */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-brand-deep via-[#5A2E94] to-brand-purple text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-yellow bg-white/10 px-3 py-1 rounded-full">
            {tr("Start Your Journey")}
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            {tr("Ready to Experience Learning at Ninamore?")}
          </h2>
          <p className="text-purple-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {tr("Reserve a complimentary trial class or visit our centre at Alsi Plot, Akola to meet our mentors.")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/#admissions"
              className="btn-primary btn-primary-lg w-full sm:w-auto"
            >
              <span>{tr("Book a Free Demo")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={CONTACT_INFO.phoneTel}
              className="btn-secondary btn-primary-lg w-full sm:w-auto"
            >
              <span>Call {CONTACT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
