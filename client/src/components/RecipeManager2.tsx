import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { IngredientSchema } from "../../lib/types";
import { TIngredientSchema } from "../../lib/types";
import { useNavigate } from "react-router-dom";

export default function RecipeManager2() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TIngredientSchema>({ resolver: zodResolver(IngredientSchema) });

  const onSubmit = async (data: TIngredientSchema) => {
    const response = await fetch("http://localhost:3000/rm2", {
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

      if (errors.ingredient) {
        setError("ingredient", {
          type: "server",
          message: errors.ingredient,
        });
      }
    } else navigate("/foo");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("ingredient")} />
      {errors.ingredient && <span>{errors.ingredient.message}</span>}
      <input type="submit" />
    </form>
  );
}
