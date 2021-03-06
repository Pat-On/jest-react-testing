// Functional test

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  //render app
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  //she said that she did not need to await because if vanilla showed up then chocolate as well the same req - but she said few videos that it is not good prctise
  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  // <<<<<<< IMPORTANT NOTE >>>>>>>>>
  // so we can perceive awaiting as a await of process. that is why she await scoops only once
  //  what about good practices?
  // <<<<<<< IMPORTANT NOTE >>>>>>>>>

  // because this is different operation and she again is await it. toppings
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  // find and click order  button

  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  // check if summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items - added in final
  //   so here from test we have singular item fund by text
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // alternative solution with the list of items
  const optionItems = screen.getAllByRole("listitem");
  const optionItemsText = optionItems.map((item) => item.textContent);
  //   so here we are going to compare if array from page is the same with our "template"
  expect(optionItemsText).toEqual(["1 Vanilla", "2 Chocolate", "Cherries"]);

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);
  // confirm order number on confirmation page - async post method!
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00"); //WHY? async? It should be there?
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();
  // do we need to await anything to avoid test errors?
  // yes we have to because if not testing library will go angry if element would change after test is over
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
