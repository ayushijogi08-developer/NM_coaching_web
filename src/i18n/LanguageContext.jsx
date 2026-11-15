import React, { createContext, useContext, useState, useEffect } from 'react';
import en from './en.json';
import hi from './hi.json';
import mr from './mr.json';

const DICTIONARIES = { en, hi, mr };

export const LANGUAGES = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'hi', label: 'हिं', fullName: 'हिंदी' },
  { code: 'mr', label: 'मराठी', fullName: 'मराठी' },
];

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (path) => path,
  languages: LANGUAGES,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ninamore_lang');
      if (saved && ['en', 'hi', 'mr'].includes(saved)) {
        return saved;
      }
    }
    return 'en';
  });

  const setLang = (newLang) => {
    if (['en', 'hi', 'mr'].includes(newLang)) {
      setLangState(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ninamore_lang', newLang);
        document.documentElement.lang = newLang;
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Nested translation helper: t('hero.learn') or fallback to English
  const t = (path) => {
    const keys = path.split('.');
    let current = DICTIONARIES[lang];
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English
        let fallback = DICTIONARIES.en;
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
