import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translations/en.json';
import translationDE from './translations/de.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationDE,
    },
  },
  lng: 'de', // Set the default language
  fallbackLng: 'de', // Set the fallback language
  interpolation: {
    escapeValue: false, // React handles the escaping
  },
});

export default i18n;