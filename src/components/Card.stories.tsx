import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import Button from "./Button";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "accent", "interactive", "minimal"],
    },
    padding: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    variant: "default",
    padding: "md",
    className: "w-80",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic card with a subtle dark border.
 */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <h3 className="text-white font-bold text-lg mb-2">Card Title</h3>
      <p className="text-gray-400 text-sm">
        Standard card for organizing related information.
      </p>
    </Card>
  ),
};

/**
 * Card with gold accent border for featured content.
 */
export const WithAccent: Story = {
  render: (args) => (
    <Card {...args} variant="accent">
      <h3 className="text-[#f5a623] font-bold text-lg mb-2">Featured Card</h3>
      <p className="text-gray-400 text-sm">
        Gold accent border draws attention to featured content.
      </p>
    </Card>
  ),
};

/**
 * Interactive card with hover effect.
 */
export const Interactive: Story = {
  render: (args) => (
    <Card {...args} variant="interactive">
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#f5a623] transition-colors">
        Interactive Card
      </h3>
      <p className="text-gray-400 text-sm">Hover to see the border and background change.</p>
    </Card>
  ),
};

/**
 * Minimal card without border.
 */
export const Minimal: Story = {
  render: (args) => (
    <Card {...args} variant="minimal">
      <h3 className="text-white font-bold text-lg mb-2">Simple Card</h3>
      <p className="text-gray-400 text-sm">Borderless for a cleaner appearance.</p>
    </Card>
  ),
};

/**
 * Card with a CTA button.
 */
export const WithCTA: Story = {
  render: (args) => (
    <Card {...args}>
      <h3 className="text-white font-bold text-lg mb-2">Book a Photobooth</h3>
      <p className="text-gray-400 text-sm mb-4">
        Create unforgettable memories with our premium service.
      </p>
      <Button size="sm" fullWidth>Learn More</Button>
    </Card>
  ),
};

/**
 * Pricing card layout.
 */
export const PricingCard: Story = {
  render: () => (
    <Card variant="default" padding="lg" className="w-80">
      <div className="mb-4">
        <h3 className="text-white font-bold text-xl mb-1">Premium Package</h3>
        <p className="text-[#f5a623] font-semibold text-lg">£599</p>
      </div>
      <ul className="space-y-2 mb-6 text-gray-400 text-sm">
        {["Professional Camera", "4 Hours Duration", "Unlimited Prints"].map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="text-[#f5a623]">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button fullWidth>Book Now</Button>
    </Card>
  ),
};

/**
 * Card with image placeholder.
 */
export const WithImage: Story = {
  render: () => (
    <div className="w-80 overflow-hidden rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
      <div className="w-full h-40 bg-gradient-to-br from-[#f5a623]/20 to-[#f5a623]/5" />
      <Card variant="minimal" padding="md">
        <h3 className="text-white font-bold text-lg mb-2">Image Card</h3>
        <p className="text-gray-400 text-sm">Cards can include imagery for visual impact.</p>
      </Card>
    </div>
  ),
};

/**
 * Responsive grid of cards.
 */
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <h3 className="text-white font-bold text-lg mb-2">Card {i}</h3>
          <p className="text-gray-400 text-sm">Responsive grid layout.</p>
        </Card>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};
