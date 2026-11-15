import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, Instagram, Facebook, Youtube } from 'lucide-react';
import PixelDisperseMotif from '../common/PixelDisperseMotif';
import { CONTACT_INFO } from '../../data/contactConfig';

// WhatsApp SVG Icon
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.479 1.332 5.002L2 22l5.176-1.356a9.92 9.92 0 0 0 4.855 1.258h.004c5.508 0 9.984-4.476 9.984-9.984 0-2.668-1.039-5.175-2.926-7.062A9.923 9.923 0 0 0 12.031 2zm0 18.25c-1.503 0-2.973-.404-4.253-1.169l-.305-.181-3.158.828.843-3.078-.198-.316a8.232 8.232 0 0 1-1.265-4.35c0-4.57 3.718-8.288 8.289-8.288 2.214 0 4.296.863 5.862 2.43 1.566 1.567 2.428 3.649 2.428 5.863 0 4.57-3.718 8.288-8.288 8.288zm4.542-6.205c-.249-.125-1.474-.727-1.703-.81-.228-.083-.395-.125-.561.125-.166.249-.644.81-.79 1-.145.187-.291.208-.54.083-.249-.125-1.053-.388-2.006-1.238-.741-.661-1.242-1.478-1.387-1.728-.146-.249-.016-.384.108-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.437-.062-.125-.561-1.352-.769-1.851-.203-.487-.409-.42-.561-.428-.145-.008-.312-.01-.478-.01s-.437.062-.665.312c-.228.249-.873.853-.873 2.08s.894 2.413 1.019 2.58c.125.166 1.758 2.685 4.259 3.765.595.257 1.06.411 1.423.527.599.19 1.144.163 1.575.099.48-.072 1.474-.603 1.682-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.478-.291z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-brand-deep text-white overflow-hidden pt-16 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-12 border-t-4 border-brand-orange">
      {/* Signature Design Motif: Small pixel squares fading out from top-right corner */}
      <PixelDisperseMotif position="top-right" variant="dark" size="lg" className="opacity-90" />
      {/* Secondary subtle pixel accent in bottom-left */}
      <PixelDisperseMotif position="bottom-left" variant="dark" size="sm" className="opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Column 1: Logo + Short Tagline & Social Links */}
          <div className="space-y-5">
            <Link to="/#home" className="inline-flex items-center gap-3.5 group">
              <img
                src="/logo.png"
                alt="Ninamore Knowledge Academy Logo"
                width="56"
                height="56"
                loading="lazy"
                decoding="async"
                className="w-14 h-14 rounded-full object-contain bg-white/5 p-1 ring-2 ring-white/15 transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <span className="font-heading font-bold text-xl text-white tracking-tight block">
                  NINAMORE
                </span>
                <span className="font-heading font-semibold text-xs tracking-wide text-brand-yellow block">
                  Knowledge Academy
                </span>
              </div>
            </Link>

            <p className="text-sm text-purple-100 leading-relaxed">
              Empowering students and professionals in Akola through practical, skill-based training,
              modern tutorials, and career-advancing education.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-brand-yellow font-semibold block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-brand-orange flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-brand-purple flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-brand-orange hover:text-brand-deep flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-emerald-600 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-base text-white tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-brand-orange" />
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/#home" className="text-purple-100 hover:text-brand-yellow transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow/80" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-purple-100 hover:text-brand-yellow transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow/80" />
                  <span>About Academy</span>
                </Link>
              </li>
              <li>
                <Link to="/#courses" className="text-purple-100 hover:text-brand-yellow transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow/80" />
                  <span>Courses & Programs</span>
                </Link>
              </li>
              <li>
                <Link to="/#mentors" className="text-purple-100 hover:text-brand-yellow transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow/80" />
                  <span>Meet the Mentors</span>
                </Link>
              </li>
              <li>
                <Link to="/#gallery" className="text-purple-100 hover:text-brand-yellow transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow/80" />
                  <span>Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-purple-100 hover:text-brand-yellow transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow/80" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/#admissions" className="text-brand-yellow hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium pt-1">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Admissions & Enquiry</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Courses */}
          <div>
            <h3 className="font-heading font-semibold text-base text-white tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-brand-yellow" />
              Featured Courses
            </h3>
            <ul className="space-y-2.5 text-sm text-purple-100">
              <li>
                <Link to="/#courses" className="hover:text-white transition-colors">
                  CBSE and State Board, Classes 5 to 10
                </Link>
              </li>
              <li>
                <Link to="/#courses" className="hover:text-white transition-colors">
                  English, Class 12
                </Link>
              </li>
              <li>
                <Link to="/#courses" className="hover:text-white transition-colors">
                  Subject-Wise Coaching
                </Link>
              </li>
              <li>
                <Link to="/#courses" className="hover:text-white transition-colors">
                  Exam Preparation
                </Link>
              </li>
              <li>
                <Link to="/#courses" className="hover:text-white transition-colors">
                  Personalized Learning Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-base text-white tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-white" />
              Contact Info
            </h3>
            <ul className="space-y-3.5 text-sm text-purple-100">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-1" />
                <a
                  href={CONTACT_INFO.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-snug hover:text-brand-yellow transition-colors"
                  aria-label="Open academy location on Google Maps"
                >
                  Manorama Bhavan, Alsi Plot 393, Alsi Plot, Akola – 444001, Maharashtra.
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Monday–Sunday</span>
                  <span className="text-xs text-purple-100">11:00 am – 8:00 pm</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <a href={CONTACT_INFO.phoneTel} className="hover:text-brand-yellow transition-colors font-medium">
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <a href={CONTACT_INFO.emailMailto} className="hover:text-brand-yellow transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 sm:pr-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-100">
          <p>© 2026 Ninamore Knowledge Academy. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Skill Development & Tutorials</span>
            <span>•</span>
            <span>Akola, Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
