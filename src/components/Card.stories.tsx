import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic card component with border and content.
 */
export const Default: Story = {
  render: () => (
    <div className="w-80 p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
      <h3 className="text-white font-bold text-lg mb-2">Card Title</h3>
      <p className="text-gray-400 text-sm">
        This is a standard card component with content. Cards are useful for
        organizing related information.
      </p>
    </div>
  ),
};

/**
 * Card with gold accent border for featured content.
 */
export const WithAccent: Story = {
  render: () => (
    <div className="w-80 p-6 rounded-2xl bg-[#13131a] border border-[#f5a623]/50">
      <h3 className="text-[#f5a623] font-bold text-lg mb-2">Featured Card</h3>
      <p className="text-gray-400 text-sm">
        This card has an accent border to draw attention to featured or
        promotional content.
      </p>
    </div>
  ),
};

/**
 * Card with hover effect for interactive content.
 */
export const Interactive: Story = {
  render: () => (
    <div className="w-80 p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a] hover:border-[#f5a623]/50 hover:bg-[#13131a] transition-all duration-200 cursor-pointer group">
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#f5a623] transition-colors">
        Interactive Card
      </h3>
      <p className="text-gray-400 text-sm">Hover over this card to see the effect.</p>
    </div>
  ),
};

/**
 * Card with CTA button.
 */
export const WithCTA: Story = {
  render: () => (
    <div className="w-80 p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
      <h3 className="text-white font-bold text-lg mb-2">Book a Photobooth</h3>
      <p className="text-gray-400 text-sm mb-4">
        Create unforgettable memories with our premium photo booth service.
      </p>
      <button className="w-full px-4 py-2 rounded-full bg-[#f5a623] text-[#0a0a0e] font-semibold text-sm hover:bg-[#fbbf4a] transition-all duration-200">
        Learn More
      </button>
    </div>
  ),
};

/**
 * Price/feature card layout.
 */
export const PricingCard: Story = {
  render: () => (
    <div className="w-80 p-8 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
      <div className="mb-4">
        <h3 className="text-white font-bold text-xl mb-1">Premium Package</h3>
        <p className="text-[#f5a623] font-semibold">£599</p>
      </div>
      <ul className="space-y-2 mb-6 text-gray-400 text-sm">
        <li className="flex items-start gap-2">
          <span className="text-[#f5a623]">✓</span>
          <span>Professional Camera</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#f5a623]">✓</span>
          <span>4 Hours Duration</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#f5a623]">✓</span>
          <span>Unlimited Prints</span>
        </li>
      </ul>
      <button className="w-full px-4 py-2 rounded-full bg-[#f5a623] text-[#0a0a0e] font-semibold text-sm hover:bg-[#fbbf4a] transition-all duration-200">
        Book Now
      </button>
    </div>
  ),
};

/**
 * Minimal card without border.
 */
export const Minimal: Story = {
  render: () => (
    <div className="w-80 p-6 rounded-2xl bg-[#13131a]">
      <h3 className="text-white font-bold text-lg mb-2">Simple Card</h3>
      <p className="text-gray-400 text-sm">
        This is a minimal card with no border for a cleaner appearance.
      </p>
    </div>
  ),
};

/**
 * Card with image, title, and description.
 */
export const WithImage: Story = {
  render: () => (
    <div className="w-80 overflow-hidden rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
      <div className="w-full h-40 bg-gradient-to-br from-[#f5a623]/20 to-[#f5a623]/5"></div>
      <div className="p-6">
        <h3 className="text-white font-bold text-lg mb-2">Image Card</h3>
        <p className="text-gray-400 text-sm">
          Cards can include imagery for more visual impact.
        </p>
      </div>
    </div>
  ),
};

/**
 * Grid of multiple cards.
 */
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]"
        >
          <h3 className="text-white font-bold text-lg mb-2">Card {i}</h3>
          <p className="text-gray-400 text-sm">
            Multiple cards arranged in a responsive grid layout.
          </p>
        </div>
      ))}
    </div>
  ),
};
