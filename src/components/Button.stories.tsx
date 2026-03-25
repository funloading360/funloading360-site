import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Book Now",
    variant: "primary",
    size: "md",
    loading: false,
    fullWidth: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary CTA button with gold background. Use for main calls-to-action like "Book Now".
 */
export const Primary: Story = {};

/**
 * Secondary button with border. Use for alternative actions or less prominent CTAs.
 */
export const Secondary: Story = {
  args: { variant: "secondary", children: "Learn More" },
};

/**
 * Ghost button. Use for tertiary or inline actions.
 */
export const Ghost: Story = {
  args: { variant: "ghost", children: "View Details" },
};

/**
 * Danger button for destructive or error states.
 */
export const Danger: Story = {
  args: { variant: "danger", children: "Try Again" },
};

/**
 * Disabled button state. Use when an action is temporarily unavailable.
 */
export const Disabled: Story = {
  args: { disabled: true, children: "Unavailable" },
};

/**
 * Loading state — spinner shown while async work is in progress.
 */
export const Loading: Story = {
  args: { loading: true, children: "Processing..." },
};

/**
 * Small variant for compact layouts.
 */
export const Small: Story = {
  args: { size: "sm", children: "Small Button" },
};

/**
 * Large variant for high-emphasis CTAs.
 */
export const Large: Story = {
  args: { size: "lg", children: "Book Your Photobooth" },
};

/**
 * Full-width button — use inside forms and mobile CTAs.
 */
export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: "padded" },
};

/**
 * Mobile layout — minimum 48px height for touch targets (WCAG AAA).
 */
export const Mobile: Story = {
  args: { size: "lg", fullWidth: true, children: "Mobile CTA" },
  parameters: { viewport: { defaultViewport: "mobile1" }, layout: "padded" },
};
