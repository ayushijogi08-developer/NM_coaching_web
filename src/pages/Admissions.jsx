import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  User, 
  Mail, 
  FileText,
  GraduationCap
} from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import { COURSES_DATA } from '../data/coursesData';
import { CONTACT_INFO } from '../data/contactConfig';
import { useLanguage } from '../i18n/LanguageContext';

// Form submission endpoint placeholder (Formspree / Web3Forms)
// TODO: Replace with your free Formspree Form ID (e.g., https://formspree.io/f/mqkvnzyz) or Web3Forms access key
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID_HERE";

// 4-Step Admission Timeline Data
const ADMISSION_STEPS = [
  {
    step: '01',
    title: 'Submit Enquiry',
    description: 'Fill in your details online or walk into our Alsi Plot academy to discuss your course interest.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Free Demo Class',
    description: 'Attend a complimentary trial class and personalized counseling session with our mentors.',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Batch Selection',
    description: 'Choose your preferred timing (midday, afternoon, or evening) and finalize enrollment.',
    icon: Calendar,
  },
  {
    step: '04',
    title: 'Begin Learning',
    description: 'Receive structured course notes, customized study schedules, and start learning.',
    icon: GraduationCap,
  },
];

// Why Enroll Benefits
const WHY_ENROLL = [
  'Concept-focused coaching with regular chapter test series',
  'Small batch sizes ensuring individual mentor attention',
  'Experienced, patient, and dedicated board mentors',
  'Flexible batch options from 11:00 AM to 8:00 PM',
  'Regular student progress tracking and parent updates',
  'Continuous personalized doubt clearing and exam guidance',
];

// WhatsApp SVG Icon
function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.479 1.332 5.002L2 22l5.176-1.356a9.92 9.92 0 0 0 4.855 1.258h.004c5.508 0 9.984-4.476 9.984-9.984 0-2.668-1.039-5.175-2.926-7.062A9.923 9.923 0 0 0 12.031 2zm0 18.25c-1.503 0-2.973-.404-4.253-1.169l-.305-.181-3.158.828.843-3.078-.198-.316a8.232 8.232 0 0 1-1.265-4.35c0-4.57 3.718-8.288 8.289-8.288 2.214 0 4.296.863 5.862 2.43 1.566 1.567 2.428 3.649 2.428 5.863 0 4.57-3.718 8.288-8.288 8.288zm4.542-6.205c-.249-.125-1.474-.727-1.703-.81-.228-.083-.395-.125-.561.125-.166.249-.644.81-.79 1-.145.187-.291.208-.54.083-.249-.125-1.053-.388-2.006-1.238-.741-.661-1.242-1.478-1.387-1.728-.146-.249-.016-.384.108-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.437-.062-.125-.561-1.352-.769-1.851-.203-.487-.409-.42-.561-.428-.145-.008-.312-.01-.478-.01s-.437.062-.665.312c-.228.249-.873.853-.873 2.08s.894 2.413 1.019 2.58c.125.166 1.758 2.685 4.259 3.765.595.257 1.06.411 1.423.527.599.19 1.144.163 1.575.099.48-.072 1.474-.603 1.682-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.478-.291z" />
    </svg>
  );
}

export default function Admissions() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const preselectedCourseId = searchParams.get('course') || '';

  // Connected Timeline In-View State
  const [timelineActive, setTimelineActive] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setTimelineActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimelineActive(true);
          if (timelineRef.current) observer.unobserve(timelineRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    ageOrClass: '',
    courseInterested: '',
    preferredBatchTime: 'Midday Batch (11:30 AM – 02:00 PM)',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Pre-select course from URL params if present
  useEffect(() => {
    if (preselectedCourseId) {
      const matched = COURSES_DATA.find((c) => c.id === preselectedCourseId);
      if (matched) {
        setFormData((prev) => ({
          ...prev,
          courseInterested: matched.title,
        }));
      }
    }
  }, [preselectedCourseId]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your phone number';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (at least 10 digits)';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.courseInterested) {
      errs.courseInterested = 'Please select a course or program of interest';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (FORM_ENDPOINT.includes("YOUR_FORM_ID_HERE")) {
        // Fallback simulation for local dev
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsSuccess(true);
      } else {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            class_or_grade: formData.ageOrClass,
            course: formData.courseInterested,
            preferred_timing: formData.preferredBatchTime,
            notes: formData.message,
            submitted_at: new Date().toISOString(),
          }),
        });

        if (res.ok) {
          setIsSuccess(true);
        } else {
          setServerError('Could not submit enquiry. Please call or WhatsApp us directly.');
        }
      }
    } catch (err) {
      setServerError('A network error occurred. Please call or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      ageOrClass: '',
      courseInterested: '',
      preferredBatchTime: 'Midday Batch (11:30 AM – 02:00 PM)',
      message: '',
    });
    setErrors({});
    setIsSuccess(false);
    setServerError('');
  };

  return (
    <section className="py-12 md:py-16 bg-[#F5F0FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
              Admissions 2026
            </span>
            <div className="relative inline-block">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
                Join Ninamore Knowledge Academy
              </h2>
              <span
                className="block h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow"
                aria-hidden="true"
              />
            </div>
            <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
              Follow our simple 4-step process and reserve your complimentary demo class.
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Step Connected Timeline */}
        <div ref={timelineRef} className="relative mb-10 sm:mb-12">
          {/* Desktop Horizontal Connecting Track */}
          <div
            className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-1 bg-purple-200/60 rounded-full z-0 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className={`h-full bg-gradient-to-r from-brand-orange via-amber-400 to-brand-yellow rounded-full transition-all duration-1000 ease-out ${
                timelineActive ? 'w-full' : 'w-0'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {ADMISSION_STEPS.map((stepItem, idx) => {
              const StepIcon = stepItem.icon;
              const delayMs = idx * 220 + 80;
              const isLit = timelineActive;

              return (
                <div key={stepItem.step} className="relative z-10 flex flex-col">
                  <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        {/* Step Number Circle that lights up in orange as line arrives */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-extrabold text-sm border-2 transition-all duration-500 ease-out ${
                            isLit
                              ? 'bg-gradient-to-tr from-brand-orange to-brand-yellow text-white border-white shadow-glow-orange ring-4 ring-brand-orange/20 scale-105 animate-pop'
                              : 'bg-white text-brand-deep border-purple-200'
                          }`}
                          style={{ transitionDelay: `${delayMs}ms` }}
                        >
                          {stepItem.step}
                        </div>

                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-brand-purple flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <StepIcon className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="font-heading font-bold text-base text-brand-deep mb-1 group-hover:text-brand-purple transition-colors">
                        {stepItem.title}
                      </h3>

                      <p className="text-[#5B4B75] text-xs leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-brand-purple font-semibold">
                      <span>Step {idx + 1} of 4</span>
                      <span
                        className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                          isLit ? 'bg-brand-orange' : 'bg-gray-300'
                        }`}
                        style={{ transitionDelay: `${delayMs}ms` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form & Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-6 sm:p-8 shadow-sm">
              
              <div className="mb-6">
                <h3 className="font-heading font-bold text-xl text-brand-deep">
                  {t('form.title')}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B4B75] mt-1">
                  {t('form.subtitle')}
                </p>
              </div>

              {isSuccess ? (
                /* Animated checkmark and confirmation on submit */
                <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-fade-in shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-pop">
                    <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                  </div>
                  <h4 className="font-heading font-bold text-2xl text-emerald-800">
                    {t('form.successTitle')}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold">{formData.fullName}</span>. We have received your request for{' '}
                    <span className="font-bold text-brand-deep underline">{formData.courseInterested}</span>. 
                    We will get in touch at <span className="font-bold">{formData.phone}</span> shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleReset}
                      className="btn-primary"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {serverError && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[#B45309] text-xs flex items-center gap-2 animate-shake">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="group">
                    <label htmlFor="fullName" className="block text-xs font-semibold text-brand-deep uppercase tracking-wider mb-1 group-focus-within:text-brand-purple transition-colors">
                      {t('form.fullName')} <span className="text-[#B45309] font-bold">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-purple transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm text-brand-dark transition-all duration-200 focus:outline-none focus:ring-4 ${
                          errors.fullName 
                            ? 'border-amber-400 focus:ring-amber-400/20 bg-amber-50/40 animate-shake' 
                            : 'border-gray-200 focus:border-brand-purple focus:ring-brand-purple/15 hover:border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-[#B45309] mt-1.5 flex items-center gap-1 animate-shake font-medium">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone & Email (2 Cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="group">
                      <label htmlFor="phone" className="block text-xs font-semibold text-brand-deep uppercase tracking-wider mb-1 group-focus-within:text-brand-purple transition-colors">
                        {t('form.phone')} <span className="text-[#B45309] font-bold">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-purple transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm text-brand-dark transition-all duration-200 focus:outline-none focus:ring-4 ${
                            errors.phone 
                              ? 'border-amber-400 focus:ring-amber-400/20 bg-amber-50/40 animate-shake' 
                              : 'border-gray-200 focus:border-brand-purple focus:ring-brand-purple/15 hover:border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-[#B45309] mt-1.5 flex items-center gap-1 animate-shake font-medium">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label htmlFor="email" className="block text-xs font-semibold text-brand-deep uppercase tracking-wider mb-1 group-focus-within:text-brand-purple transition-colors">
                        {t('form.email')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-purple transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="student@example.com"
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm text-brand-dark transition-all duration-200 focus:outline-none focus:ring-4 ${
                            errors.email 
                              ? 'border-amber-400 focus:ring-amber-400/20 bg-amber-50/40 animate-shake' 
                              : 'border-gray-200 focus:border-brand-purple focus:ring-brand-purple/15 hover:border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-[#B45309] mt-1.5 flex items-center gap-1 animate-shake font-medium">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Course & Grade/Class (2 Cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="group">
                      <label htmlFor="courseInterested" className="block text-xs font-semibold text-brand-deep uppercase tracking-wider mb-1 group-focus-within:text-brand-purple transition-colors">
                        {t('form.board')} / Course <span className="text-[#B45309] font-bold">*</span>
                      </label>
                      <select
                        id="courseInterested"
                        name="courseInterested"
                        value={formData.courseInterested}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-brand-dark transition-all duration-200 focus:outline-none focus:ring-4 ${
                          errors.courseInterested 
                            ? 'border-amber-400 focus:ring-amber-400/20 bg-amber-50/40 animate-shake' 
                            : 'border-gray-200 focus:border-brand-purple focus:ring-brand-purple/15 hover:border-gray-300'
                        }`}
                      >
                        <option value="">Select a Course...</option>
                        {COURSES_DATA.map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                      {errors.courseInterested && (
                        <p className="text-xs text-[#B45309] mt-1.5 flex items-center gap-1 animate-shake font-medium">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.courseInterested}</span>
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label htmlFor="ageOrClass" className="block text-xs font-semibold text-brand-deep uppercase tracking-wider mb-1 group-focus-within:text-brand-purple transition-colors">
                        {t('form.grade')}
                      </label>
                      <input
                        type="text"
                        id="ageOrClass"
                        name="ageOrClass"
                        value={formData.ageOrClass}
                        onChange={handleChange}
                        placeholder="e.g., Class 10 CBSE, Class 12 State"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-brand-dark transition-all duration-200 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/15 hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Preferred Batch Timing */}
                  <div className="group">
                    <label htmlFor="preferredBatchTime" className="block text-xs font-semibold text-brand-deep uppercase tracking-wider mb-1 group-focus-within:text-brand-purple transition-colors">
                      {t('form.batchTime')}
                    </label>
                    <select
                      id="preferredBatchTime"
                      name="preferredBatchTime"
                      value={formData.preferredBatchTime}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-brand-dark transition-all duration-200 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/15 hover:border-gray-300"
                    >
                      <option value="Midday Batch (11:30 AM – 02:00 PM)">Midday Batch (11:30 AM – 02:00 PM)</option>
                      <option value="Afternoon Batch (02:30 PM – 05:00 PM)">Afternoon Batch (02:30 PM – 05:00 PM)</option>
                      <option value="Evening Batch (05:30 PM – 08:00 PM)">Evening Batch (05:30 PM – 08:00 PM)</option>
                      <option value="Weekend Special Doubt Session">Weekend Special Doubt Session</option>
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div className="group">
                    <label htmlFor="message" className="block text-xs font-semibold text-brand-deep uppercase tracking-wider mb-1 group-focus-within:text-brand-purple transition-colors">
                      {t('form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any specific questions about syllabus, demo class, or timing..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-brand-dark transition-all duration-200 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/15 hover:border-gray-300"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary btn-primary-lg w-full"
                    >
                      {isSubmitting ? (
                        <span>{t('form.submitting')}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{t('form.submitBtn')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Why Enroll & Direct Assistance (Phone + WhatsApp) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Why Enroll Benefit Card */}
            <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-brand-purple flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-brand-deep">
                    Why Enroll at Ninamore?
                  </h3>
                  <span className="text-xs text-[#5B4B75]">Alsi Plot, Akola Centre</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#5B4B75]">
                {WHY_ENROLL.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-brand-deep font-semibold">
                <span>CBSE & Maharashtra State Board</span>
                <span>Classes 5–12</span>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Actions in Enquiry Section */}
            <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="font-heading font-bold text-sm text-brand-deep">
                Prefer to speak directly?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={CONTACT_INFO.phoneTel}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:border-brand-purple hover:bg-purple-50/50 active:scale-95 transition-all text-brand-deep"
                >
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-[#5B4B75] block leading-tight">Call Academy</span>
                    <span className="text-xs font-bold">{CONTACT_INFO.phoneDisplay}</span>
                  </div>
                </a>

                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/50 active:scale-95 transition-all text-emerald-700"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-emerald-700 block leading-tight">WhatsApp</span>
                    <span className="text-xs font-bold">Chat with us</span>
                  </div>
                </a>
              </div>
              <div className="pt-2 text-xs text-[#5B4B75] flex items-center justify-between border-t border-gray-100">
                <span>Manorama Bhavan, Alsi Plot</span>
                <span>Open 11 AM – 8 PM</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
