import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation resources.  Because Vite supports importing JSON
// directly, these imports will statically include the translation
// dictionaries in the final bundle.  If you add more languages just
// create a new folder under locales and import it here.
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';

// Initialise i18n.  We explicitly provide the resources rather than
// relying on the HTTP backend because the translation files are
// bundled with the application.  The language is initially set
// according to the user's browser preferences but falls back to
// Spanish if detection fails.
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: navigator.language.startsWith('es') ? 'es' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;