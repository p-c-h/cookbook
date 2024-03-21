import { z } from "zod";
import { sharedCategories } from "../../shared/constants";

export type Recipe = {
  name: string;
  category: string;
  ingredients: { original: string; substitutes: string | null }[];
  note: string;
};

const stringSchema = z
  .string()
  .trim()
  .min(2, { message: "Must be 2 or more characters long" })
  .max(35, { message: "Must be 35 or fewer characters long" });

export const RecipeSchema = z.object({
  recipeName: stringSchema,
  checkbox: z
    .array(z.string())
    // If you get "Expected array, received boolean" add defaultValues: {checkbox: []} as seen here: https://stackoverflow.com/questions/74967542/zod-validation-for-an-array-of-objects
    .nonempty({ message: "Please pick at least one category" })
    .superRefine((val, ctx) => {
      if (val.length)
        if (!val.every((item) => sharedCategories.includes(item))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid category",
          });
        }
      if (val.length !== new Set(val).size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `No duplicates allowed.`,
        });
      }
    }),
  ingredients: z.array(
    z.object({
      original: z.string(),
    })
  ),
});

export type TRecipeSchema = z.infer<typeof RecipeSchema>;

export const IngredientSchema = z.object({
  ingredient: z.string().min(2),
});

export type TIngredientSchema = z.infer<typeof IngredientSchema>;
