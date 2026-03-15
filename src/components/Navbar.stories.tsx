import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "./Navbar";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#0a0a0e" }}>
        <Story />
        <div style={{ paddingTop: "100px", padding: "40px" }}>
          <p style={{ color: "#999" }}>
            Content below navbar to demonstrate overlap and scrolling behavior
          </p>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Desktop navbar in resting state (no scroll).
 */
export const Default: Story = {
  render: () => <Navbar />,
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

/**
 * Mobile navbar (hamburger menu).
 */
export const Mobile: Story = {
  render: () => <Navbar />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Tablet view navbar.
 */
export const Tablet: Story = {
  render: () => <Navbar />,
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

/**
 * Navbar demonstrates sticky positioning and scroll styling.
 * This story shows the navbar at the top of content.
 */
export const WithContent: Story = {
  render: () => (
    <div>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: "40px",
              borderBottom: "1px solid #2a2a3a",
              color: "#f0ede8",
            }}
          >
            <h2 style={{ marginBottom: "16px" }}>Section {i + 1}</h2>
            <p style={{ color: "#999" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scroll
              to see the navbar styling change.
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
