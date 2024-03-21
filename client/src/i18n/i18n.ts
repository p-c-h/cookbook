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
        statusNotOk: "Network response was not ok",
        abortSuccess: "Successfully aborted",
        unknownError: "Unknown error",
        recipeManager: {
          editRecipe: "Edit recipe",
          newRecipe: "New recipe",
          name: "Name",
          category: "Category",
          categories: {
            breakfast: "breakfast",
            dinner: "dinner",
            supper: "supper",
          },
          errors: {
            missingName: "Name is required",
            nameTooShort: "Name must be at least 2 characters",
          },
        },
      },
    },
    pl: {
      translation: {
        loading: "Pobieram dane",
        statusNotOk: "Odpowiedź nie powiodła się",
        abortSuccess: "Przerwano prawidłowo",
        unknownError: "Nieznany błąd",
        recipeManager: {
          editRecipe: "Edytuj przepis",
          newRecipe: "Nowy przepis",
          name: "Nazwa",
          category: "Kategoria",
          categories: {
            breakfast: "śniadanie",
            dinner: "obiad",
            supper: "kolacja",
          },
          errors: {
            missingName: "Nazwa jest wymagana",
            nameTooShort: "Nazwa musi składać się przynajmniej z 2 liter",
          },
        },
      },
    },
  },
});

export default i18n;
