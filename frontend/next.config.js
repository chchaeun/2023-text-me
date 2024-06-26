/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  openAnalyzer: false,
});

module.exports = withBundleAnalyzer(nextConfig);
// module.exports = nextConfig;
