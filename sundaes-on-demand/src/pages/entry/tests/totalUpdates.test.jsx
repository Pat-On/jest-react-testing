import { render, screen } from "../../../test-utils/testing-library-utils";

import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update  scoop subtotal when scoops change", async () => {
  // rendering options and not providing context is going to give a lot of errors from our custom hook
  //  wrapper is fixing it.
  render(<Options optionType="scoops" />); // wrapper can be redux, router anything that you want to wrap component whatever it need for a test

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
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
//

test("update toppings subtotal", async () => {
  //rendering components
  render(<Options optionType="toppings" />);

  // starting amount
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  //add cherry plus check total
  // findByRole - again because it is async
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  // fudge + total
  const fudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(fudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  // unclick all
  userEvent.click(fudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("0.00");
});

// "Total"
describe("grand total", () => {
  // test.only("grand total 0.00", () => {
  //   render(<OrderEntry />);
  //   const grandTotal = screen.getByRole("heading", {
  //     name: /grand total: \$/i,
  //   });

  // });

  test("total after adding scroop", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    // check grand total 0
    expect(grandTotal).toHaveTextContent("0.00");

    // vanilla 2
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    //cherries and to check total
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  // TODO:
  test("total after adding topping 1st", async () => {
    render(<OrderEntry />);

    // cherries
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("total after removing topping", async () => {
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
