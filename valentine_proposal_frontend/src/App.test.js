import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders landing start button", () => {
  render(<App />);
  const startBtn = screen.getByRole("button", { name: /start/i });
  expect(startBtn).toBeInTheDocument();
});
