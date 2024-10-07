import { Meta, StoryObj } from "@storybook/react";

import results from "../../../../.jest-test-results.json";

import { withTests } from "@storybook/addon-jest";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      document.documentElement.classList.add("dark");
      return <Story />;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Tests: Story = {
  render: (args) => <Badge {...args}>Badge</Badge>,
};
Tests.decorators = [withTests({ results })];

export const BrandColor: Story = {
  render: () => (
    <>
      <Badge>Default</Badge>
      <Badge variant='neutral'>Neutral</Badge>
      <Badge variant='primary'>Primary</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='accent'>Accent</Badge>
      <Badge variant='ghost'>Ghost</Badge>
    </>
  ),
};

export const StateColors: Story = {
  render: () => (
    <>
      <Badge variant='success'>Success</Badge>
      <Badge variant='info'>Info</Badge>
      <Badge variant='warning'>Warning</Badge>
      <Badge variant='error'>Error</Badge>
    </>
  ),
};

export const BadgeSizes: Story = {
  render: () => (
    <>
      <Badge
        variant='neutral'
        size='tiny'>
        Tiny
      </Badge>
      <Badge
        variant='neutral'
        size='small'>
        Small
      </Badge>
      <Badge
        variant='neutral'
        size='normal'>
        Normal
      </Badge>
      <Badge
        variant='neutral'
        size='large'>
        Large
      </Badge>
    </>
  ),
};