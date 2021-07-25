import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update  scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // what subtotal is on start
  // subtotal has no role so we have to select it by text
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false }); // getBy.... because it is going to be already there
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update one option
  // this one has to be async because it is not going exist till we are not going to get our options from server
  //   type of button: "spin button"
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput); // we are clearing input because there might be 0 and if we are going to write 1 would be 10
  userEvent.type(vanillaInput, "1"); // type require string
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update one option more - Chocolate to 2
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(chocolateInput).toHaveTextContent("6.00");
});
//We are
