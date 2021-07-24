import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// test("renders learn react link", () => {
//   // render(<App />);
//   // //  by role - always try to use selector accessible by screen readers etc.
//   // const linkElement = screen.getByRole('link',{name: /learn react/i});
//   // expect(linkElement).toBeInTheDocument();
// });
test("button has correct initial color", () => {
  // element which we are going to render
  render(<App />);
  // global access to rendered dom
  // We will find it by rol
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // expecting results - color in that case
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  //click button - fireEvent - allowing us to interact with the dom
  fireEvent.click(colorButton);
  // what do we expect after?
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  // expectation: button text = "Changed to red"
  expect(colorButton.textContent).toBe("Change to red");
});

//  no needed because we are finding it by initial color - by text
// test("button has correct initial text", () => {

// });

// test("button turns blue when clicked", () => {
//   render(<App />);
//   const colorButton = screen.getByRole("button", { name: "Change to blue" });
// });

test("Initial conditions", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  // check starting condition - button enabled
  expect(colorButton).toBeEnabled();

  // check box is not checked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Disabling button", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // enabled button
  expect(colorButton).toBeEnabled();

  // event click on checkbox
  fireEvent.click(checkbox);

  //check test if button is disabled
  expect(colorButton).not.toBeEnabled();
  expect(colorButton).toBeDisabled();


  // event click on checkbox
  fireEvent.click(checkbox);

  // to check button again
  // enabled button
  expect(colorButton).toBeEnabled();

  // event click on checkbox
  fireEvent.click(checkbox);
  fireEvent.click(colorButton);

  // checking if button changed
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  expect(colorButton.textContent).toBe("Change to blue");
});

test("Disabled button has gray color", () => {
  render(<App />)
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  expect(colorButton).toHaveStyle({backgroundColor: "red"})

  fireEvent.click(checkbox)

  expect(colorButton).toHaveStyle({backgroundColor: "gray"})

})