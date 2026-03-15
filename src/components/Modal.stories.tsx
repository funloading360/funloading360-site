import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Modal",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Standard modal dialog with title, content, and action buttons.
 */
export const Default: Story = {
  render: () => (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-3xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Confirm Booking</h2>
        <p className="text-gray-400 mb-6">
          Are you sure you want to proceed with your photobooth booking?
        </p>
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-3 rounded-full border border-[#2a2a3a] text-white font-semibold hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200">
            Cancel
          </button>
          <button className="flex-1 px-4 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-all duration-200">
            Confirm
          </button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Modal with single action button.
 */
export const SingleAction: Story = {
  render: () => (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-3xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Success!</h2>
        <p className="text-gray-400 mb-6">
          Your booking has been confirmed. You'll receive a confirmation email
          shortly.
        </p>
        <button className="w-full px-4 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-all duration-200">
          Got It
        </button>
      </div>
    </div>
  ),
};

/**
 * Error modal with warning styling.
 */
export const Error: Story = {
  render: () => (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-[#13131a] border border-red-500/50 rounded-3xl w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-2xl font-bold text-red-400">Error</h2>
        </div>
        <p className="text-gray-400 mb-6">
          Something went wrong while processing your request. Please try again.
        </p>
        <button className="w-full px-4 py-3 rounded-full bg-red-500/20 text-red-400 font-semibold border border-red-500/50 hover:bg-red-500/30 transition-all duration-200">
          Try Again
        </button>
      </div>
    </div>
  ),
};

/**
 * Modal with form content.
 */
export const FormModal: Story = {
  render: () => (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-3xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Contact</h2>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder:text-gray-500 focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder:text-gray-500 focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <textarea
              placeholder="Your message"
              className="w-full px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder:text-gray-500 focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200 resize-none min-h-[100px]"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  ),
};

/**
 * Large modal for more content.
 */
export const Large: Story = {
  render: () => (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Terms & Conditions</h2>
        <div className="space-y-4 text-gray-400 text-sm mb-6">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-3 rounded-full border border-[#2a2a3a] text-white font-semibold hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200">
            Decline
          </button>
          <button className="flex-1 px-4 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-all duration-200">
            Accept
          </button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Modal with accent border for featured content.
 */
export const Featured: Story = {
  render: () => (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-[#13131a] border border-[#f5a623]/50 rounded-3xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-[#f5a623] mb-4">Special Offer</h2>
        <p className="text-gray-400 mb-2">Get 20% off your first booking!</p>
        <p className="text-sm text-gray-500 mb-6">Limited time offer - ends March 31st</p>
        <button className="w-full px-4 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-all duration-200">
          Claim Offer
        </button>
      </div>
    </div>
  ),
};
