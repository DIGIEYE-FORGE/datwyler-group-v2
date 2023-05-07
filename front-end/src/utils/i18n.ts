import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/lang/en.json";
import fr from "../assets/lang/fr.json";
import ar from "../assets/lang/ar.json";
i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: false,
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
    ar: {
      translation: ar,
    },
  },

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
