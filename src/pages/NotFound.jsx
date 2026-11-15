import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto theme-card p-8 sm:p-12 border-t-4 border-brand-orange">
        <span className="font-heading font-bold text-7xl text-brand-purple">404</span>
        <h2 className="font-heading font-bold text-2xl text-brand-deep mt-4 mb-2">Page Not Found</h2>
        <p className="text-sm text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/#home" className="btn-primary w-full">
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
