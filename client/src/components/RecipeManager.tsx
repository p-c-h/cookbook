import { useEffect, useState } from "react";
import { Recipe } from "../types/types";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";

type InputField = {
  ingredient: string;
  substitutes: string;
};

function RecipeManager({ action }: { action: string }) {
  const { language } = useLanguage() as {
    language: string;
    changeLanguage: (newLanguage: string) => void;
  };

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState<string[]>();

  const [recipe, setRecipe] = useState<Recipe>();

  const [inputFields, setInputFields] = useState([
    { ingredient: "", substitutes: "" },
  ]);

  const [error, setError] = useState<string>();

  function handleChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const data = [...inputFields];
    data[index][event.target.name as keyof InputField] = event.target.value;
    setInputFields(data);
  }

  function addFields() {
    setInputFields([...inputFields, { ingredient: "", substitutes: "" }]);
  }

  function removeFields(index: number) {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  }

  useEffect(() => {
    /*
    I'm using one AbortController for multiple fetches: https://typeofnan.dev/how-to-abort-multiple-fetch-requests-in-javascript-using-abortcontroller/ 
    
    Instead of the AbortController I could've used a less elegant solution: return () => {ignore = true} which will not prevent the double-fetch but it will ignore the current request: https://stackoverflow.com/questions/75892530/react-18-useeffect-hook-pulling-data-twice and https://github.com/facebook/react/issues/24502

    .then().catch().then() - last then runs before catch - https://jsfiddle.net/gek0n/0fnh1yc2/14/
    */

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCategories = fetch("http://localhost:3000/categories", {
      signal,
    });

    const fetchRecipe = fetch("http://localhost:3000/recipes/1", { signal });

    const promises = [fetchCategories];

    if (action === "add") promises.push(fetchRecipe);

    Promise.all(promises)
      .then((responses) => {
        return Promise.all(
          responses.map((response) => {
            if (!response.ok) {
              // Only one error gets to the catch block: https://jsfiddle.net/gek0n/2sf1ow3x/30/
              throw new Error(
                language === "en"
                  ? "Network response was not ok"
                  : "Odpowiedź nie powiodła się"
              );
            }
            return response.json();
          })
        );
      })
      .then((results) => {
        setCategories(results[0]);
        if (action === "add") setRecipe(results[1]);
        setIsLoading(false);
      })
      .catch((err) => {
        // https://stackoverflow.com/questions/64452484/how-can-i-safely-access-caught-error-properties-in-typescript
        let message;
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log(
              language === "en"
                ? "Successfully aborted"
                : "Przerwano prawidłowo"
            );
            return;
          } else {
            message = err.message;
          }
        } else {
          message = language === "en" ? "Unknown error" : "Nieznany błąd";
        }
        setError(message);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [action, language]);

  return (
    <>
      {isLoading ? (
        <span>{t("loading")}</span>
      ) : error ? (
        <p>{error}</p>
      ) : categories ? (
        <div>
          <h2>
            {action === "edit"
              ? t("recipeManager.editRecipe")
              : t("recipeManager.newRecipe")}
          </h2>
          <label>
            {t("recipeManager.name")}
            :
            <input type="text" name="name" autoComplete="off" />
          </label>
          <label>
            {language === "en" ? "Category" : "Kategoria"}:
            <select name="categories">
              {categories?.map((category) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
          </label>
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <label>
                  {language === "en" ? "Ingredient" : "Składnik"}
                  :
                  <input
                    type="text"
                    name="ingredient"
                    value={input.ingredient}
                    placeholder={language === "en" ? "cream" : "śmietana"}
                    autoComplete="off"
                    onChange={(event) => {
                      handleChange(index, event);
                    }}
                  />
                </label>
                <label>
                  {language === "en"
                    ? "Substitutes (comma-separated)"
                    : "Zamienniki (po przecinkach)"}
                  :
                  <input
                    type="text"
                    name="substitutes"
                    value={input.substitutes}
                    placeholder={
                      language === "en"
                        ? "natural yogurt, skyr"
                        : "jogurt naturalny, skyr"
                    }
                    autoComplete="off"
                    onChange={(event) => {
                      handleChange(index, event);
                    }}
                  />
                </label>
                {inputFields.length > 1 ? (
                  <button onClick={() => removeFields(index)}>x</button>
                ) : null}
              </div>
            );
          })}
          <button onClick={addFields}>+</button>
          <label>
            <textarea
              name="note"
              cols={30}
              rows={10}
              maxLength={1000}
            ></textarea>
          </label>
        </div>
      ) : (
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </span>
      )}
    </>
  );
}

export default RecipeManager;
