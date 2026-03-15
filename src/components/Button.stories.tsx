import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary CTA button with gold background. Use for main calls-to-action like "Book Now".
 */
export const Primary: Story = {
  render: () => (
    <button className="px-8 py-4 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/20 hover:shadow-[#f5a623]/40 hover:-translate-y-0.5 min-h-[44px]">
      Book Now
    </button>
  ),
};

/**
 * Secondary button with border. Use for alternative actions or less prominent CTAs.
 */
export const Secondary: Story = {
  render: () => (
    <button className="px-8 py-4 rounded-full border border-[#2a2a3a] text-white font-semibold hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200 min-h-[44px]">
      Learn More
    </button>
  ),
};

/**
 * Disabled button state. Use when an action is temporarily unavailable.
 */
export const Disabled: Story = {
  render: () => (
    <button
      disabled
      className="px-8 py-4 rounded-full bg-[#13131a] text-gray-400 cursor-not-allowed opacity-50 min-h-[44px]"
    >
      Disabled
    </button>
  ),
};

/**
 * Small button variant. Use for less prominent actions or compact layouts.
 */
export const Small: Story = {
  render: () => (
    <button className="px-6 py-2 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold text-sm hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/20 min-h-[44px]">
      Small Button
    </button>
  ),
};

/**
 * Mobile-optimized button. Minimum 48px height for touch targets (WCAG AAA).
 */
export const Mobile: Story = {
  render: () => (
    <button className="w-full px-6 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/20 min-h-[48px]">
      Mobile CTA
    </button>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Button with loading state. Disable interaction while loading.
 */
export const Loading: Story = {
  render: () => (
    <button
      disabled
      className="px-8 py-4 rounded-full bg-[#f5a623]/70 text-[#0a0a0e] font-bold cursor-wait opacity-80 min-h-[44px]"
    >
      Loading...
    </button>
  ),
};
