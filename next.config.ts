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
  turbopack: {
    root: packageRoot,
  },
};

export default withNextIntl(nextConfig);
