/**
 * @jest-environment jsdom
 */
import RecipeManager from "../components/RecipeManager";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

vi.mock("../contexts/LanguageContext", () => ({
  useLanguage: () => ({ language: "en", changeLanguage: vi.fn() }),
}));

describe("RecipeManager component", () => {
  it.only("adds and removes inputs after button clicks", async () => {
    const { container } = render(<RecipeManager />);
    const addInputBtn = screen.getByRole("button", { name: "+" });
    await userEvent.click(addInputBtn);
    const ingredientInputs = container.querySelectorAll(
      "input[name='ingredient']"
    );
    expect(ingredientInputs.length).toBe(2);
    const removeInputBtn = screen.getAllByRole("button", {
      name: "x",
    });
    await userEvent.click(removeInputBtn[1]);
    const remainingInputs = container.querySelectorAll(
      "input[name='ingredient']"
    );
    expect(remainingInputs.length).toBe(1);
  });
});
