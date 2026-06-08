import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#3370FF",
          hover: "#2860E0",
          light: "#EBF1FF",
        },
        success: "#00B578",
        warning: "#FF7D00",
        danger: "#F53F3F",
        app: "#F5F7FA",
        card: "#FFFFFF",
        border: "#E5E6EB",
        "text-primary": "#1F2329",
        "text-secondary": "#8F959E",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "8px",
        xl: "12px",
        button: "6px",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.08)",
        popover: "0 8px 24px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
