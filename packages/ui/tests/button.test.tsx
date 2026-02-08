import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Button } from "../src/button";

describe("Button", () => {
  it("renders and forwards state", async () => {
    const { container } = render(<Button loading>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("data-loading", "true");
    expect(button).toHaveAttribute("aria-busy", "true");

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("prevents click when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
