import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withMaterialColors } from "tailwind-material-colors";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#F5B61F",
        secondary: "#5482BB",
        surface: "rgba(255, 165, 62, 0.47)",
        'surface-variant': "#333333", // Gris foncé pour un meilleur contraste
        'block-bg': "#4f4f4f", // Gris clair pour les blocs
        'button-bg': "#1E5552",
        'button-bg-hover': "#174B45",
      },
    },
  },
  plugins: [],
} satisfies Config;

module.exports = withMaterialColors(
  config,
  {
    primary: "#F5B61F",
    secondary: "#5482BB",
  },
  {
    extend: false,
  },
);
