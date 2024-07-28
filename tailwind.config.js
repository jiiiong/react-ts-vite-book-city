/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        "ygm-primary": "#0bafff",
        "ygm-success": "#00b578",
        "ygm-warning": "#ff8f1f",
        "ygm-danger": "#ff3141",

        "ygm-white": "#ffffff",
        "ygm-text": "#333333",
        "ygm-weak": "#999999",
        "ygm-light": "#cccccc",
        "ygm-border": "#eeeeee",
        "ygm-background": "#ffffff",
        "ygm-box": "#f5f5f5",
      },
    },
    spacing: {
      "ygm-xs": "4px",
      "ygm-s": "8px",
      "ygm-m": "12px",
      "ygm-l": "16px",
      "ygm-xl": "20px",
    },

    borderRadius: {
      "ygm-xs": "4px",
      "ygm-s": "6px",
      "ygm-m": "8px",
      "ygm-l": "10px",
      "ygm-xl": "12px",
    },

    fontSize: {
      "ygm-xs": "10px",
      "ygm-s": "12px",
      "ygm-m": "14px",
      "ygm-l": "16px",
      "ygm-xl": "18px",
      "ygm-xxl": "20px",
      "ygm-xxxl": "22px",
    },
  },
  plugins: [],
};

