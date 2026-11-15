import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActions from '../common/FloatingActions';
import PageLoader from '../common/PageLoader';
import ScrollProgress from '../common/ScrollProgress';

/**
 * Main Layout wrapper providing persistent Navbar, dynamic Outlet, Footer,
 * Floating WhatsApp trigger, sticky mobile bar, and back-to-top button.
 */
export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = 'Ninamore Knowledge Academy | CBSE & State Board Coaching in Akola';
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-lavender text-brand-dark selection:bg-brand-orange selection:text-white relative overflow-x-hidden">
      {/* Scroll Progress Bar at the very top of the page */}
      <ScrollProgress />

      {/* Page Loading Animation using the pixel-book logo motif (max ~600ms) */}
      <PageLoader />

      {/* Accessible skip link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:btn-primary"
      >
        Skip to main content
      </a>

      {/* Global Reusable Header & Navigation */}
      <Navbar />

      {/* Main Page Content Outlet:
          - animate-fade-in adds a smooth page-load entrance
          - pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] on mobile ensures sticky bottom bar never obscures content */}
      <main id="main-content" className="flex-grow focus:outline-none pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-0 animate-fade-in">
        <Outlet />
      </main>

      {/* Global Reusable Footer */}
      <Footer />

      {/* Floating Actions: WhatsApp Trigger + Sticky Mobile Bottom Bar + Back to Top */}
      <FloatingActions />
    </div>
  );
}
