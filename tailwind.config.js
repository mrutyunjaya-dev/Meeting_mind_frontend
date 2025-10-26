/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "media", // or "class" if you want manual toggle
  theme: {
    extend: {
      colors: {
        // Your existing brand colors
        brand: {
          50: "#eef6ff",
          100: "#d7eaff",
          200: "#b7d7ff",
          300: "#90c0ff",
          400: "#63a0ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a"
        }
      },
      backgroundColor: {
        primary: "var(--color-bg)",
        secondary: "var(--color-accent)"
      },
      textColor: {
        primary: "var(--color-text)",
        secondary: "var(--color-secondary)"
      },
      borderColor: {
        primary: "var(--color-border)"
      }
    }
  },
  plugins: []
}
