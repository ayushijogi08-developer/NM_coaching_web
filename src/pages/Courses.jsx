import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  MessageSquare, 
  BookOpen, 
  Sparkles, 
  Briefcase, 
  Award, 
  Compass, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Eye,
  GraduationCap,
  Layers,
  Target,
  Users
} from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import CourseDetailModal from '../components/courses/CourseDetailModal';
import { COURSES_DATA, COURSE_CATEGORIES } from '../data/coursesData';

// Map icon string names to actual Lucide components
const ICON_MAP = {
  GraduationCap,
  BookOpen,
  Layers,
  Target,
  Users,
  MessageSquare,
  Laptop,
  Sparkles,
  Briefcase,
  Award,
  Compass,
};

// Distinct theme and accent colors per course category
const CATEGORY_THEMES = {
  'School (5–10)': {
    gradient: 'from-[#F28C28] to-[#F6B93B]',
    borderGradient: 'from-brand-orange to-brand-yellow',
    badge: 'bg-amber-50 text-[#B45309] border border-amber-200/80',
    iconColor: 'bg-orange-50 text-brand-orange',
    accentDot: 'bg-brand-orange',
  },
  'Class 12': {
    gradient: 'from-[#6B3FA0] to-[#9B51E0]',
    borderGradient: 'from-brand-purple to-purple-400',
    badge: 'bg-purple-50 text-brand-purple border border-purple-200/80',
    iconColor: 'bg-purple-50 text-brand-purple',
    accentDot: 'bg-brand-purple',
  },
  'Coaching & Exams': {
    gradient: 'from-[#059669] to-[#10B981]',
    borderGradient: 'from-emerald-600 to-teal-400',
    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    iconColor: 'bg-emerald-50 text-emerald-700',
    accentDot: 'bg-emerald-500',
  },
};

const getCategoryTheme = (category) => {
  return CATEGORY_THEMES[category] || {
    gradient: 'from-brand-deep to-brand-purple',
    borderGradient: 'from-brand-deep to-brand-purple',
    badge: 'bg-purple-50 text-brand-deep border border-purple-200',
    iconColor: 'bg-purple-50 text-brand-purple',
    accentDot: 'bg-brand-purple',
  };
};

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter courses based on active category
  const filteredCourses = activeCategory === 'All' 
    ? COURSES_DATA 
    : COURSES_DATA.filter((course) => course.category === activeCategory);

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setIsTransitioning(false);
    }, 150);
  };

  const handleOpenDetail = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Animated Underline */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
              Curriculum & Programs
            </span>
            <div className="relative inline-block">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
                Available Courses in Akola
              </h2>
              {/* Subtle animated underline drawing in on view */}
              <span
                className="block h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow transform transition-all duration-700 origin-center"
                aria-hidden="true"
              />
            </div>
            <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
              Structured academic programs for CBSE and Maharashtra State Board learners.
            </p>

            {/* Category Filter Pills with smooth switching animation */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 pt-4 scrollbar-none">
              {COURSE_CATEGORIES.map((cat) => {
                const count = cat === 'All' 
                  ? COURSES_DATA.length 
                  : COURSES_DATA.filter((c) => c.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${
                      isActive
                        ? 'bg-brand-purple text-white shadow-sm ring-2 ring-brand-purple/20'
                        : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-brand-purple border border-gray-200'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span>{cat}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-xs transition-colors ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Course Cards Grid - Animated fade & scale transition on category switch */}
        <div
          className={`flex flex-wrap justify-center gap-5 sm:gap-6 transition-all duration-300 ease-out ${
            isTransitioning ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          {filteredCourses.map((course, idx) => {
            const IconComponent = ICON_MAP[course.iconName] || BookOpen;
            const theme = getCategoryTheme(course.category);

            return (
              <div 
                key={course.id} 
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex"
              >
                <ScrollReveal variant="scale" delay={idx * 50} className="w-full flex">
                  <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.98] transition-all duration-300 w-full flex flex-col justify-between group relative overflow-hidden select-none">
                    
                    {/* Top Colored Border that grows from the left on hover */}
                    <span
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.borderGradient} rounded-t-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-10`}
                      aria-hidden="true"
                    />

                    {/* Top Card Content */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3.5">
                        {/* Animated Icon with small rotate/bounce on hover */}
                        <div className={`w-10 h-10 rounded-xl ${theme.iconColor} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-0.5 shadow-sm`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        
                        <div className="flex flex-col items-end gap-1">
                          {/* Distinct category pill badge */}
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${theme.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${theme.accentDot}`} />
                            <span>{course.category}</span>
                          </span>
                          <span className="text-xs text-gray-600 font-medium">
                            {course.level}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-brand-deep mb-2 leading-snug group-hover:text-brand-purple transition-colors duration-200">
                        {course.title}
                      </h3>

                      <p className="text-[#5B4B75] text-[15px] leading-[1.6] mb-5 line-clamp-3">
                        {course.shortDescription}
                      </p>

                      {/* Metadata tags */}
                      <div className="space-y-1.5 mb-5 pt-3 border-t border-gray-100 text-xs text-[#5B4B75]">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-brand-orange" />
                            <span>Duration:</span>
                          </span>
                          <span className="font-semibold text-brand-deep">{course.duration}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-brand-purple" />
                            <span>Mode:</span>
                          </span>
                          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs">
                            Offline Classroom
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions: View Details & Enquire */}
                    <div className="pt-3 border-t border-gray-100 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(course)}
                        aria-label={`View details and syllabus for ${course.title}`}
                        className="btn-secondary-light flex-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        to={`/?course=${encodeURIComponent(course.id)}#admissions`}
                        aria-label={`Enquire about ${course.title}`}
                        className="btn-primary flex-1"
                      >
                        <span>Enquire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>

      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
      />
    </section>
  );
}
