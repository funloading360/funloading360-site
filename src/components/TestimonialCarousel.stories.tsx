import type { Meta, StoryObj } from "@storybook/react";
import TestimonialCarousel from "./TestimonialCarousel";

const meta = {
  title: "Components/TestimonialCarousel",
  component: TestimonialCarousel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TestimonialCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default testimonial carousel with auto-rotation every 5 seconds.
 * Pauses on hover. Shows navigation dots and arrows.
 */
export const Default: Story = {};

/**
 * The carousel inside a full dark background to show it in context.
 */
export const InContext: Story = {
  decorators: [
    (Story) => (
      <div className="bg-background py-12">
        <Story />
      </div>
    ),
  ],
};
