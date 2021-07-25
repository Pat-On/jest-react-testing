import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";

test("handles errors for scoops and toppings", async () => {
  // we are reseting handlers and prepering new for a sake of test
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status500)
    ),
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      res(ctx.status500);
    })
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert", {
    name: "An unexpected error ocurred. Please try again later.",
  });

  expect(alerts).toHaveLength(2);
});
