import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withMaterialColors } from "tailwind-material-colors";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;

module.exports = withMaterialColors(
  config,
  {
    // Your base colors as HEX values. 'primary' is required.
    primary: "#E19947",
    // secondary: "#5482BB"
  },
  {
    /* one of 'content', 'expressive', 'fidelity', 'monochrome', 'neutral', 'tonalSpot' or 'vibrant' */
    //scheme: "content",
    // contrast is optional and ranges from -1 (less contrast) to 1 (more contrast).
    //contrast: 0,
    extend: false,
  },
);
