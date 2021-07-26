import { render } from "@testing-library/react";

import { OrderDetailsProvider } from "../contexts/OrderDetails";

// ui = react component
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-eport everything
export * from "@testing-library/react";

//override render Method
export { renderWithContext as render };
//NICE