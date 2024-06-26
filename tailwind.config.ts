import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withMaterialColors } from "tailwind-material-colors";
import { withUt } from "uploadthing/tw";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
      aspectRatio: {
        card: "63/88",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translate(-100%)" },
          "100%": { transform: "translate(0px)" },
        },
        slideinRight: {
          "0%": { transform: "translate(100%)" },
          "100%": { transform: "translate(0px)" },
        },
        slideinBotton: {
          "0%": { transform: "translate(0%, 100%)" },
          "100%": { transform: "translate(0%, 0%)" },
        },
      },
      animation: {
        slidein: "slide 0.2s ease-out",
        slideinRight: "slideinRight 0.2s ease-out",
        slideinBotton: "slideinBotton 0.2s ease-out",
      },
      colors: {
        positif: "#a2d69c",
        negatif: "#d77070",
        winner: "#f5b61f",
      },
    },
  },
  plugins: [
  ],
} satisfies Config;

const materialColor = withMaterialColors(
  config,
  {
    // Your base colors as HEX values. 'primary' is required.
    // primary: "#F5B61F",
    primary: "#679c69",
    // secondary: "#5482BB",
  },
  {
    /* one of 'content', 'expressive', 'fidelity', 'monochrome', 'neutral', 'tonalSpot' or 'vibrant' */
    //scheme: "content",
    // contrast is optional and ranges from -1 (less contrast) to 1 (more contrast).
    //contrast: 0,
    extend: false,
  },
);

export default withUt(materialColor);

// tailwind.config.js
