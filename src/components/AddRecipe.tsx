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

  function addFields() {
    setInputFields([...inputFields, { ingredient: "", substitutes: "" }]);
  }

  function removeFields(index: number) {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  }

  return (
    <>
      <h2>Nowy przepis</h2>
      <label>
        Nazwa:
        <input type="text" name="name" autoComplete="off" />
      </label>
      {inputFields.map((input, index) => {
        return (
          <div key={index}>
            <label>
              Składnik:
              <input
                type="text"
                name="ingredient"
                value={input.ingredient}
                placeholder="śmietana"
                autoComplete="off"
                onChange={(event) => {
                  handleChange(index, event);
                }}
              />
            </label>
            <label>
              Zamienniki (po przecinkach):
              <input
                type="text"
                name="substitutes"
                value={input.substitutes}
                placeholder="jogurt naturalny, skyr"
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
    </>
  );
}

export default AddRecipe;
