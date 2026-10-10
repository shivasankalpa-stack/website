import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Lockfiles elsewhere on the machine (e.g. home directory) can make Next infer
 * the wrong workspace root and resolve `tailwindcss` from a parent folder.
 * Pin Turbopack to this package directory.
 */
const packageRoot = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /**
   * Next.js blocks dev resources (incl. the HMR websocket) for hosts other
   * than `localhost`. Without this, opening the dev site at 127.0.0.1 leaves
   * the page un-hydrated and every <ScrollReveal> section stays invisible.
   */
  allowedDevOrigins: ['127.0.0.1'],
  turbopack: {
    root: packageRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
