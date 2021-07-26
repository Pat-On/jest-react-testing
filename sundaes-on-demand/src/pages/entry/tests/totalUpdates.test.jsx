import { render, screen } from "../../../test-utils/testing-library-utils";

import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

// test("update  scoop subtotal when scoops change", async () => {
//   // rendering options and not providing context is going to give a lot of errors from our custom hook
//   //  wrapper is fixing it.
//   render(<Options optionType="scoops" />); // wrapper can be redux, router anything that you want to wrap component whatever it need for a test

//   // what subtotal is on start
//   // subtotal has no role so we have to select it by text
//   const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false }); // getBy.... because it is going to be already there
//   expect(scoopsSubtotal).toHaveTextContent("0.00");

//   //update one option
//   // this one has to be async because it is not going exist till we are not going to get our options from server
//   //   type of button: "spin button"
//   const vanillaInput = await screen.findByRole("spinbutton", {
//     name: "Vanilla",
//   });
//   userEvent.clear(vanillaInput); // we are clearing input because there might be 0 and if we are going to write 1 would be 10
//   userEvent.type(vanillaInput, "1"); // type require string
//   expect(scoopsSubtotal).toHaveTextContent("2.00");

//   //update one option more - Chocolate to 2
//   const chocolateInput = await screen.findByRole("spinbutton", {
//     name: "Chocolate",
//   });
//   userEvent.clear(chocolateInput);
//   userEvent.type(chocolateInput, "2");
//   expect(chocolateInput).toHaveTextContent("6.00");
// });
//We are

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
