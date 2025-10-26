import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zhTranslations from './locales/zh.json';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      zh: {
        translation: zhTranslations
      },
      en: {
        translation: enTranslations
      },
      ru: {
        translation: ruTranslations
      }
    },
    // 默认语言改为俄语
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      // 移除 navigator，避免根据系统语言默认成非俄语
      order: ['querystring', 'localStorage', 'cookie', 'htmlTag'],
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;
