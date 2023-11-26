import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        loading: "Loading...",
        recipeManager: {
          editRecipe: "Edit recipe",
          newRecipe: "New recipe",
          name: "Name",
        },
      },
    },
    pl: {
      translation: {
        loading: "Pobieram dane",
        recipeManager: {
          editRecipe: "Edytuj przepis",
          newRecipe: "Nowy przepis",
          name: "Nazwa",
        },
      },
    },
  },
});

export default i18n;
