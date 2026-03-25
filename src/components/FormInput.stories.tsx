import type { Meta, StoryObj } from "@storybook/react";
import FormInput, { FormTextarea, FormSelect } from "./FormInput";

const meta = {
  title: "Components/FormInput",
  component: FormInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: "select",
      options: ["text", "email", "tel", "date", "password"],
    },
  },
  args: {
    placeholder: "Enter your name",
    className: "w-64",
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default text input in resting state.
 */
export const Default: Story = {};

/**
 * Input with a label above.
 */
export const WithLabel: Story = {
  args: { label: "Full Name", placeholder: "John Smith" },
};

/**
 * Input pre-filled with a value.
 */
export const Filled: Story = {
  args: { label: "Full Name", defaultValue: "John Smith" },
};

/**
 * Input with an error message. ARIA attributes wired automatically.
 */
export const WithError: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your name",
    error: "Name must be at least 2 characters",
  },
};

/**
 * Input with a hint below.
 */
export const WithHint: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    hint: "We'll send your booking confirmation here.",
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: { placeholder: "Disabled input", disabled: true },
};

/**
 * Email input type.
 */
export const Email: Story = {
  args: { type: "email", placeholder: "your.email@example.com", label: "Email" },
};

/**
 * Date input for booking dates.
 */
export const DateInput: Story = {
  args: { type: "date", label: "Event Date" },
};

/**
 * Textarea for longer content.
 */
export const Textarea: Story = {
  render: () => (
    <FormTextarea
      label="Special Requests"
      placeholder="Any special requirements?"
      rows={4}
      className="w-64"
    />
  ),
};

/**
 * Textarea with error state.
 */
export const TextareaWithError: Story = {
  render: () => (
    <FormTextarea
      label="Message"
      placeholder="Enter your message"
      error="Message must be at least 10 characters"
      className="w-64"
    />
  ),
};

/**
 * Select/dropdown input.
 */
export const Select: Story = {
  render: () => (
    <FormSelect label="Event Type" className="w-64">
      <option value="">Select an event type</option>
      <option value="wedding">Wedding</option>
      <option value="birthday">Birthday Party</option>
      <option value="corporate">Corporate Event</option>
      <option value="prom">School Prom</option>
    </FormSelect>
  ),
};

/**
 * Mobile-optimized input — minimum 48px height for touch targets.
 */
export const Mobile: Story = {
  args: { placeholder: "Enter your name", className: "w-full" },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    layout: "padded",
  },
};
