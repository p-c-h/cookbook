export type Recipe = {
  name: string;
  category: string;
  ingredients: { original: string; substitutes: string[] | null }[];
  note: string;
};
