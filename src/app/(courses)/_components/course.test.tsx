import { describe } from "node:test";
import { render, screen } from "@testing-library/react";
import { CourseCard, fakeData } from "./course-card";

describe("Card Component", () => {
  test("renders a card", () => {
    const { getByText } = render(<CourseCard {...fakeData} />);
    expect(
      getByText("معماری پروژه های Large-Scale در ری‌اکت با استفاده از Next.js"),
    ).toBeInTheDocument();
  });

  test("show rendered card", () => {
    render(<CourseCard {...fakeData} />);
    screen.debug();
  });
});

