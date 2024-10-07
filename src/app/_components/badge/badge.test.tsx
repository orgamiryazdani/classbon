import { describe } from "node:test";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge Component", () => {
  test("renders a default badge", () => {
    const { getByText } = render(<Badge>badge</Badge>);
    expect(getByText("badge")).toBeInTheDocument();
  });

  test("applies the correct css class for different badge variants", () => {
    const { rerender } = render(<Badge variant='primary'>badge</Badge>);
    expect(screen.getByText("badge")).toHaveClass("badge-primary");

    rerender(<Badge variant='info'>badge</Badge>);
    expect(screen.getByText("badge")).toHaveClass("badge-info");
  });

  test("show rendered badge", () => {
    render(
      <Badge
        size='large'
        variant='accent'>
        badge
      </Badge>,
    );
    screen.debug();
  });
});
