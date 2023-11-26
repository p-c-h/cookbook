import { useState } from "react";

function AddIngredient() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryList = ["śniadanie, obiad, kolacja"];

  return (
    <>
      {selectedCategory ? (
        <p>
          {selectedCategory}
          <a href="#">Usuń</a>
        </p>
      ) : (
        <input type="text" />
      )}
    </>
  );
}

export default AddIngredient;
