import { expect, test } from "@jest/globals";
import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //   IMPORTANT NOTICE -> async because of the request -> needed to be handled in different way
  // SO:
  // When You are waitin for something to appear asynchronously on the page, You must use await findBy

  // find images                                        I need to learn regex
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // toBe() numbers and strings

  // toEqual() - array and objects

  //   Confirming alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Displays image for each toppings option from server", async () => {
  // mock service
  render(<Options optionType="toppings" />);

  //finding images - (3) - async that is why findAllByRole()
  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  //alt text for img
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toStrictEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
