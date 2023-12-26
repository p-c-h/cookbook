import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";

import { Recipe } from "../../lib/types";
import { useLanguage } from "../contexts/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";

import { RecipeSchema } from "../../lib/types";
import { TRecipeSchema } from "../../lib/types";

import { categories } from "../../../shared/constants";

type InputField = {
  ingredient: string;
  substitutes: string;
};

function RecipeManager({ action }: { action: string }) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubbmiting },
    setError,
    reset,
    getValues,
  } = useForm<TRecipeSchema>({ resolver: zodResolver(RecipeSchema) });

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch("http://localhost:3000/recipes/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      alert("Submitting form failed");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.name) {
        setError("name", {
          type: "server",
          message: errors.name,
        });
      }
    }
  };

  const { language } = useLanguage() as {
    language: string;
    changeLanguage: (newLanguage: string) => void;
  };

  const [isLoading, setIsLoading] = useState(true);

  // const [categories, setCategories] = useState([]);

  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    category: "",
    ingredients: [{ original: "", substitutes: "" }],
    note: "",
  });

  const [inputFields, setInputFields] = useState([
    { ingredient: "", substitutes: "" },
  ]);

  const [errorA, setErrorA] = useState<string>();

  function handleIngrChange(
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

    if (action === "add") {
      fetch("http://localhost:3000/recipes/1", { signal })
        .then((response) => {
          if (!response.ok) {
            throw new Error(t("statusNotOk"));
          }
          return response.json();
        })
        .then((result) => {
          setRecipe(result);
          setIsLoading(false);
        })
        .catch((err) => {
          let message;
          if (err instanceof Error) {
            if (err.name === "AbortError") {
              console.log(t("abortSuccess"));
              return;
            } else {
              message = err.message;
            }
          } else {
            message = t("unknownError");
          }
          setErrorA(message);
          setIsLoading(false);
        });
    }

    return () => {
      controller.abort();
    };
  }, [action]);

  return (
    <>
      {isLoading ? (
        <span>{t("loading")}</span>
      ) : errorA ? (
        <p>{errorA}</p>
      ) : categories ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>
            {action === "edit"
              ? t("recipeManager.editRecipe")
              : t("recipeManager.newRecipe")}
          </h2>

          <label>
            {t("recipeManager.name")}
            :
            <input
              {...register("name")}
              type="text"
              name="name"
              autoComplete="off"
              className="border-2"
            />
          </label>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <label>
            {t("recipeManager.category")}:
            <input {...register("checkbox")} type="checkbox" value="" />
            <select name="categories">
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
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
                      handleIngrChange(index, event);
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
                      handleIngrChange(index, event);
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
          <button type="submit">Submit</button>
        </form>
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
