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
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

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
