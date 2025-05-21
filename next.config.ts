import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ hostname: "cdn.dummyjson.com" }] },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
