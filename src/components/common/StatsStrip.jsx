import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import Stagger from './Stagger';
import ScrollReveal from './ScrollReveal';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Users, 
  TrendingUp, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Verified statistics directly from Ninamore Knowledge Academy site facts:
 * 1. Classes covered: 5-12 (School to Jr. College)
 * 2. Days open: 7 days a week (Mon-Sun: 11 AM - 8 PM)
 * 3. Boards: 2 (CBSE & Maharashtra State Board)
 * 4. Batch size: Small (personalized attention)
 */
export const STATS_CONFIG = [
  {
    id: 'classes',
    target: 12,
    isRange: true,
    rangePrefix: '5–',
    valueDisplay: '5–12',
    label: 'Classes Covered',
    sublabel: 'Classes 5 to 12 (CBSE & State)',
    icon: BookOpen,
  },
  {
    id: 'days',
    target: 7,
    valueDisplay: '7',
    unitWord: 'Days',
    label: 'Days a Week Open',
    sublabel: 'Mon–Sun: 11 AM – 8 PM',
    icon: Clock,
  },
  {
    id: 'boards',
    target: 2,
    valueDisplay: '2',
    unitWord: 'Boards',
    label: 'Major Boards',
    sublabel: 'CBSE & Maharashtra State Board',
    icon: Award,
  },
  {
    id: 'batches',
    isTextOnly: true,
    valueDisplay: 'Small',
    label: 'Batch Size Focus',
    sublabel: 'Personalized attention & daily doubts',
    icon: Users,
  },
];

// Compact 3x2 Advantages grid (merged from WhyNinamore)
const WHY_ADVANTAGES = [
  {
    title: 'Experienced Subject Mentors',
    description: 'Daily textbook concept clarity and personal doubt resolution.',
    icon: Users,
  },
  {
    title: 'Small Batch Limits',
    description: 'Strict student caps ensuring individual focus and guidance.',
    icon: Award,
  },
  {
    title: 'Practical Problem Solving',
    description: 'Step-by-step formula drills and board answer-writing.',
    icon: TrendingUp,
  },
  {
    title: 'Modern Study Desks',
    description: 'Quiet, well-lit classrooms designed for distraction-free learning.',
    icon: Building2,
  },
  {
    title: 'Flexible 7-Day Timings',
    description: '11 AM – 8 PM batches comfortably suiting school schedules.',
    icon: Clock,
  },
  {
    title: 'Regular Parent Updates',
    description: 'Continuous unit test reviews and transparent progress reports.',
    icon: ShieldCheck,
  },
];

function StatCard({ stat }) {
  const { tr } = useLanguage();
  const [count, ref] = useCountUp(stat.target || 0, 1500);

  let displayedNumber = stat.valueDisplay;
  if (!stat.isTextOnly) {
    if (stat.isRange) {
      displayedNumber = `${stat.rangePrefix}${count >= 5 ? count : 5}`;
    } else {
      displayedNumber = `${count}`;
    }
  }

  const Icon = stat.icon;
  const unit = stat.unitWord || '';

  return (
    <div
      ref={ref}
      className="relative rounded-2xl bg-white/10 backdrop-blur-md p-4 sm:p-6 border border-white/15 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:border-white/30 h-full min-h-[175px] sm:min-h-[195px] flex flex-col justify-between"
    >
      {/* Top Row: Big Number + Unit Word + Icon */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-baseline whitespace-nowrap bg-gradient-to-r from-[#F6B93B] to-[#F28C28] bg-clip-text text-transparent">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
            {tr(displayedNumber)}
          </span>
          {unit && (
            <span className="text-xl sm:text-2xl font-heading font-bold ml-1.5 sm:ml-2">
              {tr(unit)}
            </span>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[#F6B93B]" />
        </div>
      </div>

      {/* Bottom Row Pinned: Title + Sublabel */}
      <div className="mt-auto pt-2">
        <div className="text-sm sm:text-base font-bold text-white mb-0.5 leading-snug">
          {tr(stat.label)}
        </div>
        <div className="text-xs text-purple-100 leading-relaxed font-normal">
          {tr(stat.sublabel)}
        </div>
      </div>
    </div>
  );
}

export default function StatsStrip({ stats = STATS_CONFIG, className = '' }) {
  const { tr } = useLanguage();
  return (
    <section className={`py-12 md:py-16 bg-gradient-to-r from-brand-deep via-[#4E2486] to-brand-deep text-white relative overflow-hidden ${className}`}>
      {/* Background glow highlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-12">
        
        {/* 1. Header: Verified Facts */}
        <div>
          <ScrollReveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-yellow bg-white/10 px-3 py-1 rounded-full mb-2">
                {tr("Our Academic Footprint")}
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                {tr("Academy Highlights at a Glance")}
              </h2>
            </div>
          </ScrollReveal>

          {/* 4 Animated Stat Tiles */}
          <Stagger variant="scale" step={90} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </Stagger>
        </div>

        {/* 2. Compact 3x2 Advantages Grid (Merged Why Ninamore) */}
        <div className="pt-8 border-t border-white/15">
          <ScrollReveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                {tr("The Ninamore Advantage")}
              </h3>
              <p className="text-xs sm:text-sm text-purple-100 mt-1">
                {tr("Core teaching values and learning environment features trusted by Akola families.")}
              </p>
            </div>
          </ScrollReveal>

          <Stagger variant="up" step={60} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {WHY_ADVANTAGES.map((adv) => {
              const Icon = adv.icon;
              return (
                <div
                  key={adv.title}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-white/25 hover:bg-white/15 transition-all duration-200 flex items-start gap-3.5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#F6B93B]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-white mb-0.5">
                      {tr(adv.title)}
                    </h4>
                    <p className="text-xs text-purple-100 leading-relaxed font-normal">
                      {tr(adv.description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </Stagger>
        </div>

      </div>
    </section>
  );
}
