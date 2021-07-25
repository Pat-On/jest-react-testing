import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import Options from "../Options";

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
