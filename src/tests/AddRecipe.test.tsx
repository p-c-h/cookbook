/**
 * @jest-environment jsdom
 */
import AddRecipe from "../components/AddRecipe";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

describe("AddRecipe component", () => {
  it.only("adds and removes inputs after button clicks", async () => {
    const { container } = render(<AddRecipe />);
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
