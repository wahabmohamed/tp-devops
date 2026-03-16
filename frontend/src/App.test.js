import { render, screen } from "@testing-library/react";
import App from "./App";

test("affiche le titre de l'application", () => {
  render(<App />);
  const title = screen.getByText(/TP DevOps/i);
  expect(title).toBeInTheDocument();
});
