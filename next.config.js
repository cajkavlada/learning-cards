/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: "/:locale/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/:locale/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/:locale/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default withNextIntl(config);
