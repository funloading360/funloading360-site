import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Components/FormInput",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default text input in resting state.
 */
export const Default: Story = {
  render: () => (
    <input
      type="text"
      placeholder="Enter your name"
      className="w-64 px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder:text-gray-500 focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200"
    />
  ),
};

/**
 * Input with filled value.
 */
export const Filled: Story = {
  render: () => (
    <input
      type="text"
      placeholder="Enter your name"
      defaultValue="John Smith"
      className="w-64 px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder:text-gray-500 focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200"
    />
  ),
};

/**
 * Input with error state. Show alongside error text.
 */
export const WithError: Story = {
  render: () => (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        className="w-64 px-4 py-3 rounded-xl bg-[#13131a] border border-red-500/50 text-white placeholder:text-gray-500 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/20 outline-none transition-all duration-200"
        aria-describedby="name-error"
      />
      <div
        id="name-error"
        className="mt-2 flex items-start gap-2 text-red-400 text-xs"
      >
        <span className="text-lg leading-none">⚠️</span>
        <span>Name must be at least 2 characters</span>
      </div>
    </div>
  ),
};

/**
 * Disabled input state.
 */
export const Disabled: Story = {
  render: () => (
    <input
      type="text"
      placeholder="Disabled input"
      disabled
      className="w-64 px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-gray-400 placeholder:text-gray-600 cursor-not-allowed opacity-50 outline-none"
    />
  ),
};

/**
 * Email input type with validation styling.
 */
export const Email: Story = {
  render: () => (
    <input
      type="email"
      placeholder="your.email@example.com"
      className="w-64 px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder:text-gray-500 focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200"
    />
  ),
};

/**
 * Date input for booking dates.
 */
export const Date: Story = {
  render: () => (
    <input
      type="date"
      className="w-64 px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200"
    />
  ),
};

/**
 * Select/dropdown input.
 */
export const Select: Story = {
  render: () => (
    <select className="w-64 px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200 cursor-pointer">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  ),
};

/**
 * Textarea for longer form content.
 */
export const Textarea: Story = {
  render: () => (
    <textarea
      placeholder="Enter your message here"
      className="w-64 px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder:text-gray-500 focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200 resize-none min-h-[120px]"
    />
  ),
};

/**
 * Mobile-optimized input with proper sizing.
 */
export const Mobile: Story = {
  render: () => (
    <input
      type="text"
      placeholder="Enter your name"
      className="w-full px-4 py-4 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder:text-gray-500 focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 outline-none transition-all duration-200 min-h-[48px]"
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
