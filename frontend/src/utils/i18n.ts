import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/lang/en.json";
import fr from "../assets/lang/fr.json";
import ar from "../assets/lang/ar.json";
import { z } from "zod";

export const langSchema = z.enum(["en", "fr", "ar"]);

export const getLang = (de = "en") => {
  try {
    return langSchema.parse(localStorage.getItem("lang") || "en");
  } catch (e) {
    return de;
  }
};

i18n.use(initReactI18next).init({
  fallbackLng: getLang(),
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
