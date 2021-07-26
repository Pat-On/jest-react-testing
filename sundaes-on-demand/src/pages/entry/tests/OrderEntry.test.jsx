import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";

// to run only one test to do: test.only()
// to run all and skip something test.skip()

test("handles errors for scoops and toppings", async () => {
  // we are resetting handlers and preparing new for a sake of test
  server.resetHandlers(
    //       'http://localhost:3030/scoops'

    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    // rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
    //   res(ctx.status(500))
    // ),
    //       'http://localhost:3030/toppings'

    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      // the same like in express You have to return (exit) from middleware OMG! :>
      return res(ctx.status(500));
    })

    // rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
    //   res(ctx.status(500))
    // )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  //   in this configuration it is not going to await all just is going to await till first
  // error is going to be back!
  //   const alerts = await screen.findAllByRole("alert", {
  //     name: "An unexpected error ocurred. Please try again later.",
  //   });

  //waiting for all of two errors! tricky thing :)
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
