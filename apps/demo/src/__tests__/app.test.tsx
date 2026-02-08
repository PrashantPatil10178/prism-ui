import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("Demo App", () => {
  it("renders and switches themes", async () => {
    render(<App />);

    expect(screen.getByText("Prism UI Demo")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "brand-b" }));
    expect(document.documentElement.dataset.theme).toBe("brand-b");
  });
});
