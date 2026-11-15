import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const FAQS = [
  {
    id: 'demo-class',
    question: 'How does the Free Demo Class work and how do I register?',
    answer: 'The trial class is completely free with no commitment. Students can attend a live session, experience our interactive teaching approach, and discuss their syllabus goals with our subject faculty. Parents are welcome to join for personalized counseling.'
  },
  {
    id: 'curriculum',
    question: 'Which educational boards and classes are covered?',
    answer: 'We offer structured coaching for CBSE and Maharashtra State Board students from Classes 5 to 10 across core subjects, as well as dedicated board exam batches for Class 12 English.'
  },
  {
    id: 'campus-location',
    question: 'Where is the academy located and what are the center timings?',
    answer: 'We are conveniently located at Manorama Bhavan, Alsi Plot 393, Akola – 444001, Maharashtra. The academy is open Monday through Sunday from 11:00 AM to 8:00 PM for classroom batches, doubt resolution, and parent counseling.'
  }
];

export default function FaqAccordion() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState('demo-class'); // First item open by default

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3.5">
      {FAQS.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={`rounded-2xl transition-all duration-200 border bg-white overflow-hidden ${
              isOpen 
                ? 'border-brand-purple/40 shadow-sm ring-1 ring-brand-purple/20' 
                : 'border-[#6B3FA0]/10 hover:border-brand-purple/30'
            }`}
          >
            <button
              type="button"
              id={`faq-question-${faq.id}`}
              onClick={() => toggle(faq.id)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple min-h-[44px]"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
            >
              <span className="font-heading font-bold text-base sm:text-lg text-brand-deep flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-none transition-colors ${isOpen ? 'bg-brand-orange' : 'bg-brand-purple/40'}`} />
                <span>{t('faq.' + faq.id + '.q')}</span>
              </span>

              <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                isOpen ? 'bg-brand-purple text-white rotate-180' : 'bg-purple-50 text-brand-purple'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Answer Content */}
            <div
              id={`faq-answer-${faq.id}`}
              role="region"
              aria-labelledby={`faq-question-${faq.id}`}
              className={`transition-all duration-200 ease-in-out px-4 sm:px-5 overflow-hidden ${
                isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
              }`}
            >
              <p className="text-xs sm:text-sm text-[#5B4B75] leading-relaxed pt-2 border-t border-gray-100">
                {t('faq.' + faq.id + '.a')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
