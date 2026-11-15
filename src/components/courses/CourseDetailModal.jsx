import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Clock, 
  MapPin, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/contactConfig';
import { useLanguage } from '../../i18n/LanguageContext';

export default function CourseDetailModal({ course, isOpen, onClose }) {
  const { tr } = useLanguage();
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-deep/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-purple-100 z-10 max-h-[90vh] flex flex-col my-auto animate-fade-in-up">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-brand-deep via-[#542B85] to-brand-purple text-white p-5 sm:p-8 flex-shrink-0">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-yellow text-brand-dark">
              {tr(course.category)}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm">
              {tr(course.level)}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/15 text-purple-100 backdrop-blur-sm flex items-center gap-1">
              <MapPin className="w-3 h-3 text-brand-orange" />
              <span>{tr(course.mode)}</span>
            </span>
          </div>

          <h2 id="course-modal-title" className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
            {tr(course.title)}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-purple-100 max-w-2xl font-light">
            {tr(course.shortDescription)}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 flex-1">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-brand-lavender/60 border border-purple-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-600 block">{tr("Duration")}</span>
                <span className="text-sm font-semibold text-brand-deep">{tr(course.duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-600 block">{tr("Course Fee")}</span>
                <span className="text-sm font-semibold text-brand-deep">{tr(course.fee)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-600 block">{tr("Assessment")}</span>
                <span className="text-xs font-semibold text-brand-deep leading-tight block">
                  {course.certification === 'Not applicable' ? 'Continuous Evaluation' : course.certification}
                </span>
              </div>
            </div>
          </div>

          {/* Syllabus Modules */}
          <div>
            <h3 className="font-heading font-bold text-lg text-brand-deep mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-orange" />
              <span>{tr("Course Curriculum & Topics Covered")}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.syllabus.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-start gap-3 hover:border-brand-purple/20 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-brand-dark leading-snug">{tr(item)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Batch Timings */}
          <div>
            <h3 className="font-heading font-bold text-lg text-brand-deep mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-purple" />
              <span>{tr("Available Batch Timings in Akola")}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {course.batchTimings.map((time, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs font-medium text-brand-deep flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  <span>{tr(time)}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {tr("* Custom timings and weekend batches can be scheduled for working professionals upon request.")}
            </p>
          </div>

          {/* Assessment & Academic Tracking */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-purple flex-shrink-0">
                <Award className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-brand-deep">
                  {course.certification === 'Not applicable' ? 'Continuous Academic Progress & Test Series' : course.certification}
                </h4>
                <p className="text-xs text-gray-600">
                  {course.certification === 'Not applicable' 
                    ? 'Includes weekly unit tests, board model papers, and personalized feedback.'
                    : 'Includes comprehensive practical assessment & recognized certificate.'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div className="text-xs text-gray-600 text-center sm:text-left">
            <span>{tr("Questions about this course? Call")} </span>
            <a href={CONTACT_INFO.phoneTel} className="font-semibold text-brand-deep hover:text-brand-orange transition-colors">
              {CONTACT_INFO.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="btn-secondary-light flex-1 sm:flex-initial sm:w-auto"
            >
              {tr("Close")}
            </button>
            <Link
              to={`/?course=${encodeURIComponent(course.id)}#admissions`}
              onClick={onClose}
              className="btn-primary flex-1 sm:flex-initial sm:w-auto"
            >
              <span>{tr("Enquire for This Course")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
