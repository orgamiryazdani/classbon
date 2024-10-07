import { Meta, StoryObj } from "@storybook/react";

import results from "../../../../.jest-test-results.json";

import { withTests } from "@storybook/addon-jest";
import { CourseCard, fakeData } from "./course-card";

const meta: Meta<typeof CourseCard> = {
  component: CourseCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      document.documentElement.classList.add("dark");
      return <Story />;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof CourseCard>;

export const Tests: Story = {
  render: () => (
    <div
      dir='rtl'
      style={{ fontFamily: "vazir" }}>
      <CourseCard {...fakeData} />,
    </div>
  ),
};
Tests.decorators = [withTests({ results })];

export const Card: Story = {
  render: () => (
    <div
      dir='rtl'
      style={{ fontFamily: "vazir" }}>
      <CourseCard {...fakeData} />,
    </div>
  ),
};
