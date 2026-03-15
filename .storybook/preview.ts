import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0a0a0e" },
        { name: "surface", value: "#13131a" },
        { name: "light", value: "#ffffff" },
      ],
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#0a0a0e", padding: "40px" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
