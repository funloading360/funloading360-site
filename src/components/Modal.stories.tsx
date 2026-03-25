import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Modal, { ModalFooter } from "./Modal";
import Button from "./Button";
import FormInput, { FormTextarea } from "./FormInput";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "accent", "error"] },
    title: { control: "text" },
    open: { control: "boolean" },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper to allow toggle in Storybook
function ModalDemo({
  title,
  size,
  variant,
  children,
}: {
  title?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "accent" | "error";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="p-8">
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={title} size={size} variant={variant}>
        {children}
      </Modal>
    </>
  );
}

/**
 * Standard confirmation modal with two action buttons.
 */
export const Default: Story = {
  render: () => (
    <ModalDemo title="Confirm Booking">
      <p className="text-gray-400 mb-6">
        Are you sure you want to proceed with your photobooth booking?
      </p>
      <ModalFooter>
        <Button variant="secondary" fullWidth>Cancel</Button>
        <Button fullWidth>Confirm</Button>
      </ModalFooter>
    </ModalDemo>
  ),
};

/**
 * Success modal with a single action.
 */
export const SingleAction: Story = {
  render: () => (
    <ModalDemo title="Booking Confirmed!">
      <p className="text-gray-400 mb-6">
        Your booking has been confirmed. You'll receive a confirmation email shortly.
      </p>
      <Button fullWidth>Got It</Button>
    </ModalDemo>
  ),
};

/**
 * Error modal with red border and danger button.
 */
export const ErrorModal: Story = {
  render: () => (
    <ModalDemo title="Error" variant="error">
      <p className="text-gray-400 mb-6">
        Something went wrong while processing your request. Please try again.
      </p>
      <Button variant="danger" fullWidth>Try Again</Button>
    </ModalDemo>
  ),
};

/**
 * Modal with accent gold border for special promotions.
 */
export const Featured: Story = {
  render: () => (
    <ModalDemo title="Special Offer" variant="accent">
      <p className="text-gray-400 mb-2">Get 20% off your first booking!</p>
      <p className="text-sm text-gray-500 mb-6">Limited time offer</p>
      <Button fullWidth>Claim Offer</Button>
    </ModalDemo>
  ),
};

/**
 * Modal containing a form — uses FormInput components.
 */
export const FormModal: Story = {
  render: () => (
    <ModalDemo title="Quick Contact">
      <form className="space-y-4">
        <FormInput label="Name" placeholder="Your name" />
        <FormInput label="Email" type="email" placeholder="your@email.com" />
        <FormTextarea label="Message" placeholder="Your message" rows={3} />
        <Button type="submit" fullWidth>Send Message</Button>
      </form>
    </ModalDemo>
  ),
};

/**
 * Large modal for longer content with scrolling.
 */
export const Large: Story = {
  render: () => (
    <ModalDemo title="Terms & Conditions" size="lg">
      <div className="space-y-4 text-gray-400 text-sm mb-6">
        {Array.from({ length: 6 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam quis nostrud exercitation ullamco laboris.
          </p>
        ))}
      </div>
      <ModalFooter>
        <Button variant="secondary" fullWidth>Decline</Button>
        <Button fullWidth>Accept</Button>
      </ModalFooter>
    </ModalDemo>
  ),
};
