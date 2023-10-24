import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import fetchAndSetData from "../utils/fetchAndSetData";

type InputField = {
  ingredient: string;
  substitutes: string;
};

function RecipeManager({ action }: { action: string }) {
  const { language } = useLanguage() as {
    language: string;
    changeLanguage: (newLanguage: string) => void;
  };

  const [categories, setCategories] = useState<string[]>();

  const [recipe, setRecipe] = useState<object>();

  const [inputFields, setInputFields] = useState([
    { ingredient: "", substitutes: "" },
  ]);

  const [errors, setErrors] = useState<string[]>([]);

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
    fetchAndSetData(
      "https://example.com/non-existing-endpoint",
      setCategories,
      setErrors,
      language
    );

    if (action === "edit") {
      fetchAndSetData(
        "https://example.com/non-existing-endpoint",
        setRecipe,
        setErrors,
        language
      );
    }
  }, [action, language]);

  return (
    <>
      {errors ? (
        <span>{errors}</span>
      ) : categories ? (
        <div>
          <h2>{language === "en" ? "New recipe" : "Nowy przepis"}</h2>
          <label>
            {language === "en" ? "Name" : "Nazwa"}
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
        <span>Loading...</span>
      )}
    </>
  );
}

export default RecipeManager;
