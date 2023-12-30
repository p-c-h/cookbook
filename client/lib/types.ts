import { z } from "zod";
import { sharedCategories } from "../../shared/constants";

export type Recipe = {
  name: string;
  category: string;
  ingredients: { original: string; substitutes: string | null }[];
  note: string;
};

export const RecipeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(35, { message: "Must be 35 or fewer characters long" }),
  checkbox: z
    .array(z.string())
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
});

export type TRecipeSchema = z.infer<typeof RecipeSchema>;
