/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["cdn.discordapp.com", "utfs.io", "lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
};

export default config;
