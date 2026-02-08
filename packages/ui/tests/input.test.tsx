import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Input } from "../src/input";

describe("Input", () => {
  it("renders label and helper text", async () => {
    const { container } = render(
      <Input label="Email" helperText="We will not share it." />,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("We will not share it.")).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("shows error and hides helper text when invalid", async () => {
    const { container } = render(
      <Input
        label="Email"
        helperText="We will not share it."
        error="Required"
      />,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
    // Helper text is intentionally hidden when error is present
    expect(screen.queryByText("We will not share it.")).not.toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
