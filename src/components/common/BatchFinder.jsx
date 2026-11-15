import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Compass, 
  MessageCircle,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { COURSES_DATA } from '../../data/coursesData';
import { CONTACT_INFO } from '../../data/contactConfig';
import { useLanguage } from '../../i18n/LanguageContext';

const CLASSES = ['5', '6', '7', '8', '9', '10', '12'];
const BOARDS = [
  { id: 'CBSE', label: 'CBSE Board', subtitle: 'NCERT Curriculum' },
  { id: 'State Board', label: 'Maharashtra State Board', subtitle: 'HSC / SSC Syllabus' },
];

const GOALS = [
  { id: 'Concept clarity', title: 'Concept Clarity', desc: 'Strengthen fundamental math & science principles' },
  { id: 'Exam preparation', title: 'Exam Preparation', desc: 'Board answer formatting, mock tests & past papers' },
  { id: 'Doubt solving', title: 'Doubt Solving', desc: 'Targeted remedial coaching and 1-on-1 problem fixing' },
  { id: 'English', title: 'English Language & Scoring', desc: 'Grammar mastery, literature analysis & scoring' },
];

export default function BatchFinder() {
  const { t, tr } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const goToStep = (nextStep) => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsAnimating(false);
    }, 150);
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    goToStep(2);
  };

  const handleSelectBoard = (board) => {
    setSelectedBoard(board);
    goToStep(3);
  };

  const handleSelectGoal = (goal) => {
    setSelectedGoal(goal);
    goToStep(4); // Result step
  };

  const handleReset = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedClass('');
      setSelectedBoard('');
      setSelectedGoal('');
      setStep(1);
      setIsAnimating(false);
    }, 150);
  };

  // Match recommended course based on user selections
  const getRecommendation = () => {
    if (selectedClass === '12' && selectedGoal === 'English') {
      return COURSES_DATA.find((c) => c.id === 'english-class-12') || COURSES_DATA[1];
    }
    if (selectedGoal === 'Exam preparation') {
      return COURSES_DATA.find((c) => c.id === 'exam-preparation') || COURSES_DATA[3];
    }
    if (selectedGoal === 'Doubt solving') {
      return COURSES_DATA.find((c) => c.id === 'personalized-learning-support') || COURSES_DATA[4];
    }
    if (['5', '6', '7', '8', '9', '10'].includes(selectedClass)) {
      return COURSES_DATA.find((c) => c.id === 'cbse-state-board-5-10') || COURSES_DATA[0];
    }
    return COURSES_DATA.find((c) => c.id === 'subject-wise-coaching') || COURSES_DATA[2];
  };

  const recommendedCourse = getRecommendation();

  // WhatsApp pre-filled text
  const whatsappMessage = `Hello Ninamore Knowledge Academy! I used the "Find My Batch" quiz on your website. My selections:\n- Class: ${selectedClass}th\n- Board: ${selectedBoard}\n- Learning Focus: ${selectedGoal}\n- Recommended Program: ${recommendedCourse?.title}\n\nCould you please share the batch timings and arrange a free trial class?`;
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <section className="py-12 md:py-16 bg-[#F5F0FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
              {t('quiz.badge')}
            </span>
            <div className="relative inline-block">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
                {t('quiz.title')}
              </h2>
              <span
                className="block h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow"
                aria-hidden="true"
              />
            </div>
            <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
              {t('quiz.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Main Quiz Card */}
        <div className="relative bg-white border border-[#6B3FA0]/15 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden">
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-brand-deep mb-2">
              <span className="flex items-center gap-1.5 text-brand-purple">
                <Compass className="w-3.5 h-3.5 text-brand-orange" />
                <span>{step <= 3 ? `${tr('Step')} ${step} ${tr('of')} 3` : tr('Your Recommended Batch')}</span>
              </span>
              <span className="text-[#5B4B75] font-medium">{progressPercent}% {tr('Completed')}</span>
            </div>
            <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-orange via-amber-400 to-brand-yellow transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quiz Body with smooth step switching */}
          <div
            className={`transition-all duration-200 ease-out ${
              isAnimating ? 'opacity-0 scale-95 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            {/* STEP 1: Select Class */}
            {step === 1 && (
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-brand-deep mb-2 text-center">
                  {t('quiz.step1Title')}
                </h3>
                <p className="text-xs text-[#5B4B75] text-center mb-6">
                  {tr("Select your academic level below.")}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
                  {CLASSES.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => handleSelectClass(cls)}
                      className="py-4 px-3 rounded-2xl border-2 border-purple-100 hover:border-brand-purple hover:bg-purple-50/50 hover:shadow-md active:scale-95 transition-all text-center group focus:outline-none"
                    >
                      <span className="block font-heading font-extrabold text-2xl text-brand-deep group-hover:text-brand-purple transition-colors">
                        {tr('Class')} {cls}
                      </span>
                      <span className="text-[11px] text-[#5B4B75]">
                        {cls === '12' ? tr('Higher Secondary') : tr('School Level')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Select Board */}
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => goToStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:text-brand-orange transition-colors min-h-[44px] py-2 px-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{tr("Back to Class")}</span>
                  </button>
                  <span className="text-xs font-bold text-[#B45309] px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80">
                    Selected: Class {selectedClass}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-brand-deep mb-2 text-center">
                  {t('quiz.step2Title')}
                </h3>
                <p className="text-xs text-[#5B4B75] text-center mb-6">
                  {tr("We specialize in both major curriculum tracks in Akola.")}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {BOARDS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleSelectBoard(b.id)}
                      className="p-5 rounded-2xl border-2 border-purple-100 hover:border-brand-purple hover:bg-purple-50/50 hover:shadow-md active:scale-95 transition-all text-left group focus:outline-none flex items-start gap-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-brand-purple flex items-center justify-center shrink-0 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-heading font-bold text-base text-brand-deep group-hover:text-brand-purple transition-colors">
                          {tr(b.label)}
                        </span>
                        <span className="text-xs text-[#5B4B75]">{tr(b.subtitle)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Select Goal */}
            {step === 3 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => goToStep(2)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:text-brand-orange transition-colors min-h-[44px] py-2 px-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{tr("Back to Board")}</span>
                  </button>
                  <span className="text-xs font-bold text-[#B45309] px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80">
                    Class {selectedClass} • {selectedBoard}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-brand-deep mb-2 text-center">
                  {t('quiz.step3Title')}
                </h3>
                <p className="text-xs text-[#5B4B75] text-center mb-6">
                  {tr("Select the area where you want the highest improvement.")}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleSelectGoal(g.id)}
                      className="p-4 rounded-2xl border-2 border-purple-100 hover:border-brand-purple hover:bg-purple-50/50 hover:shadow-md active:scale-95 transition-all text-left group focus:outline-none"
                    >
                      <span className="block font-heading font-bold text-sm sm:text-base text-brand-deep group-hover:text-brand-purple transition-colors mb-0.5">
                        {tr(g.title)}
                      </span>
                      <span className="text-xs text-[#5B4B75] leading-relaxed">
                        {tr(g.desc)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Results Display */}
            {step === 4 && recommendedCourse && (
              <div className="animate-fade-in text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('quiz.recommended')}</span>
                </div>

                <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-deep mb-1">
                  {tr(recommendedCourse.title)}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B4B75] max-w-lg mx-auto mb-6">
                  {tr("Tailored specifically for")} <strong className="text-brand-deep">Class {selectedClass} ({selectedBoard})</strong> {tr("focusing on")} <strong className="text-brand-purple">{selectedGoal}</strong>.
                </p>

                {/* Recommended Course Card Box */}
                <div className="bg-[#F5F0FA] border border-[#6B3FA0]/15 rounded-2xl p-5 sm:p-6 text-left max-w-xl mx-auto mb-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-brand-purple font-semibold">
                    <span>{tr(recommendedCourse.category)}</span>
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {tr("Offline at Alsi Plot")}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-deep leading-relaxed">
                    {tr(recommendedCourse.shortDescription)}
                  </p>

                  <div className="pt-2 border-t border-purple-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-[#5B4B75]">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{tr(recommendedCourse.duration)}</span>
                    </span>
                    <span className="font-bold text-brand-deep">
                      {tr("Morning, Midday & Evening slots")}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t('quiz.whatsappCta')}</span>
                  </a>

                  <a
                    href="#admissions"
                    className="btn-secondary-light w-full sm:w-auto"
                  >
                    <span>{t('demoBanner.button')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-brand-deep min-h-[44px] py-2.5 px-4 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t('quiz.startOver')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
