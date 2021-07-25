// Mocking REST API
import { rest } from "msw";

// example:
//     rest.get("http://localhost:3030/scoops", (req, res, ctx) => {})
//          handler.method("url to mock", (req, res, ctx) => {
//
//              req - request object
//              res function to create response
//              ctx: utility to build response
//      }
// } )

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Chocolate",
          imagePath: "/images/chocolate.png",
        },
        {
          name: "Vanilla",
          imagePath: "/images/vanilla.png",
        },
      ])
    );
  }),
];
