import { useState } from "react";

type InputField = {
  ingredient: string;
  substitutes: string;
};

function AddRecipe() {
  const [inputFields, setInputFields] = useState([
    { ingredient: "", substitutes: "" },
  ]);

  function handleChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const data = [...inputFields];
    data[index][event.target.name as keyof InputField] = event.target.value;
    setInputFields(data);
  }
  return (
    <>
      <h2>Nowy przepis</h2>
      <form action="">
        <label htmlFor="name">Nazwa:</label>
        <input type="text" name="name" id="name" />
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <label htmlFor="ingredient">Składnik:</label>
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                value={input.ingredient}
                placeholder="śmietana"
                onChange={(event) => {
                  handleChange(index, event);
                }}
              />
              <label htmlFor="substitutes">Zamienniki (po przecinkach):</label>
              <input
                type="text"
                name="substitutes"
                id="substitutes"
                value={input.substitutes}
                placeholder="jogurt naturalny, skyr"
                onChange={(event) => {
                  handleChange(index, event);
                }}
              />
            </div>
          );
        })}
      </form>
    </>
  );
}

export default AddRecipe;
