import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "./SummaryForm";

test("Initial conditions", () => {
  // render component
  render(<SummaryForm />);

  // targeting
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  // "test"
  expect(checkbox).not.toBeChecked();

  // targeting
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  // "test"
  expect(confirmButton).toBeDisabled();
});

test("Checkbox 1) disables 2)enables - onclick", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRoleRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
