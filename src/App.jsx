import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Layout from './components/layout/Layout';
import OnePage from './pages/OnePage';

const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OnePage />} />
          <Route 
            path="*" 
            element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}
