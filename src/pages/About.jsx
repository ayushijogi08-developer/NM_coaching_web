import React from 'react';
import { Target, Eye, MapPin, BookOpen, Layers, FileCheck } from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import Stagger from '../components/common/Stagger';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * About Section
 * 
 * Contains:
 * - Academy founding story & philosophy
 * - Signature "Knowledge Beyond Books" logo card with floating badge
 * - "How We Teach" 3-step learning methodology (Learn, Practice, Test)
 * - Concise Mission and Vision cards
 */
export default function About() {
  const { t, tr } = useLanguage();

  const teachingSteps = [
    {
      step: t('howWeTeach.step1Title'),
      desc: t('howWeTeach.step1Desc'),
      icon: BookOpen,
      color: 'text-brand-purple bg-purple-50 border-purple-200',
      iconAnim: 'animate-float',
    },
    {
      step: t('howWeTeach.step2Title'),
      desc: t('howWeTeach.step2Desc'),
      icon: Layers,
      color: 'text-[#B45309] bg-amber-50 border-amber-200',
      iconAnim: 'animate-float-slow',
    },
    {
      step: t('howWeTeach.step3Title'),
      desc: t('howWeTeach.step3Desc'),
      icon: FileCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      iconAnim: 'animate-float',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#F5F0FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-14">

        {/* 1. Section Heading */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
              {t('nav.about')}
            </span>
            <div className="relative inline-block">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
                {tr("Empowering Aspirations in Alsi Plot, Akola")}
              </h2>
              <span
                className="block h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow"
                aria-hidden="true"
              />
            </div>
            <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
              {tr("Dedicated to helping school and junior college learners build genuine conceptual strength and board confidence.")}
            </p>
          </div>
        </ScrollReveal>

        {/* 2. Our Story / Overview (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left: Academy Story */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="left">
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-deep">
                  {tr("Building Strong Fundamentals Since Day One")}
                </h3>
                <p className="text-[#5B4B75] text-[15px] sm:text-base leading-relaxed">
                  {tr("At")} <strong className="text-brand-deep font-bold">Ninamore Knowledge Academy</strong>{tr(", we observed that many bright learners possessed high potential but lacked structured conceptual coaching, board exam answer-writing guidance, and personal mentorship.")}
                </p>
                <p className="text-[#5B4B75] text-[15px] sm:text-base leading-relaxed">
                  {tr("Our centre in Alsi Plot, Akola was founded to bridge this gap—providing dedicated school and board tutorials where textbook fundamentals meet rigorous application in an encouraging, disciplined atmosphere.")}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: "Knowledge Beyond Books" Card with Wobble Badge */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal variant="right" delay={120}>
              <div className="relative rounded-2xl bg-gradient-to-br from-brand-deep to-brand-purple p-6 sm:p-7 text-white shadow-xl border border-purple-300/20 space-y-4">

                {/* Floating Badge Sticker: "Admissions Open 2026" */}
                <div className="absolute -top-4 -right-3 sm:-top-5 sm:-right-4 z-20 pointer-events-auto select-none">
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 rounded-full bg-brand-orange/40 blur-md group-hover:blur-lg transition-all" />
                    <div
                      className="relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow text-white font-heading font-extrabold text-[10px] sm:text-xs tracking-wider uppercase shadow-xl border-2 border-white flex items-center gap-1.5 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 animate-float"
                      style={{ animationDuration: '4s' }}
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>{tr("Admissions Open 2026")}</span>
                    </div>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center p-1 border border-white/20">
                  <img
                    src="/logo.png"
                    alt="Ninamore Knowledge Academy Logo"
                    className="w-full h-full object-contain rounded-full"
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3 className="font-heading font-bold text-xl text-white">
                  {tr("Knowledge Beyond Books")}
                </h3>

                <p className="text-sm text-purple-100 leading-relaxed font-normal">
                  {tr("Our logo depicts an open book dissolving into progressive pixel squares. It reflects our core educational philosophy: timeless foundational knowledge transforming seamlessly into practical, real-world skills.")}
                </p>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-brand-yellow font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{tr("Manorama Bhavan, Alsi Plot 393")}</span>
                  </span>
                  <span>{tr("Akola 444001")}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* 3. "How We Teach" 3-Step Methodology Row with Animated Icons */}
        <div className="pt-2">
          <ScrollReveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-1.5">
                {t('howWeTeach.badge')}
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-deep">
                {t('howWeTeach.title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5B4B75] mt-1">
                {t('howWeTeach.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <Stagger variant="scale" step={90} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {teachingSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4"
                >
                  <div className={`w-12 h-12 rounded-2xl ${step.color} border flex items-center justify-center shrink-0 shadow-xs`}>
                    <Icon className={`w-6 h-6 ${step.iconAnim}`} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-brand-deep mb-1">
                      {step.step}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#5B4B75] leading-relaxed">
                      {tr(step.desc)}
                    </p>
                  </div>
                </div>
              );
            })}
          </Stagger>
        </div>

        {/* 4. Mission & Vision (2 Compact Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2">

          {/* Mission */}
          <ScrollReveal variant="left" delay={50}>
            <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-purple flex items-center justify-center mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-deep mb-2">
                {tr("Our Mission")}
              </h3>
              <p className="text-[#5B4B75] text-sm leading-relaxed">
                {tr("To provide accessible, high-quality academic learning in Akola through structured, concept-focused programs that cultivate intellectual confidence, strong fundamentals, and board examination success.")}
              </p>
            </div>
          </ScrollReveal>

          {/* Vision */}
          <ScrollReveal variant="right" delay={100}>
            <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-deep mb-2">
                {tr("Our Vision")}
              </h3>
              <p className="text-[#5B4B75] text-sm leading-relaxed">
                {tr("To be Akola’s trusted benchmark in tutorial guidance, recognized for transforming motivated learners into capable, confident, and ethically grounded achievers.")}
              </p>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
