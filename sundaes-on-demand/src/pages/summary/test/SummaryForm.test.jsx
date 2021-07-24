import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
// it is better to use userEvent because much better simulate the user's actions
import userEvent from "@testing-library/user-event";

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

test("Checkbox (1)disables (2)enables - onclick", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  // popover stat out hidden <- our test's design depends how we implemented the css/html etc
  // getBy - if there is no object return null
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  // expect(nullPopover).toBeNull();
  // she got warning with toBeNull()
  expect(nullPopover).not.toBeInTheDocument();

  // appear upon mouseover
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  // getByText - would throw error
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  // Best practice is to keep it here because it is improving readability
  expect(popover).toBeInTheDocument();

  // hover out - disappears
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );

  // expect(nullPopoverAgain).not.toBeInTheDocument();
});
