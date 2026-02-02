import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders landing start button", () => {
  render(<App />);
  const startBtn = screen.getByRole("button", { name: /start/i });
  expect(startBtn).toBeInTheDocument();
});

test("no dodge counter increments once per dodge", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /start/i }));

  const noBtn = screen.getByRole("button", { name: /no \(mischievous button\)/i });

  // Simulate a user moving onto the No button.
  fireEvent.pointerEnter(noBtn);

  expect(screen.getByText(/dodged 1 time/i)).toBeInTheDocument();
});

test("reveal includes a polite aria-live announcement", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /start/i }));
  fireEvent.click(screen.getByRole("button", { name: /^yes, i will be your valentine$/i }));

  // The reveal component renders an aria-live region that announces the headline.
  const announcement = screen.getByText(/yay! you said yes!/i);
  expect(announcement).toBeInTheDocument();
  expect(announcement).toHaveAttribute("aria-live", "polite");
});
