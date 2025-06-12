import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import ko from './app/translations/ko.json';
import en from './app/translations/en.json';
import zh from './app/translations/zh.json';
import fr from './app/translations/fr.json';
import ja from './app/translations/ja.json';
import es from './app/translations/es.json';
import de from './app/translations/de.json';

const resources = {
  ko: {
    translation: ko
  },
  en: {
    translation: en
  },
  zh: {
    translation: zh
  },
  fr: {
    translation: fr
  },
  ja: {
    translation: ja
  },
  es: {
    translation: es
  },
  de: {
    translation: de
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale.split('-')[0], // 기기의 언어 설정을 가져옴
    fallbackLng: 'en', // 기본 언어는 영어
    interpolation: {
      escapeValue: false
    },
    compatibilityJSON: 'v4'
  });

export default i18n; 