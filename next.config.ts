import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/notes/:path*",
        has: [{ type: "host", value: "felipef.com" }],
        destination: "https://www.felipef.com/blog/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "felipef.com" }],
        destination: "https://www.felipef.com/:path*",
        permanent: true,
      },
      { source: "/notes/:path*", destination: "/blog/:path*", permanent: true },
    ];
  },
  async headers() {
    return process.env.VERCEL_ENV === "preview" ||
      process.env.SITE_NOINDEX === "1"
      ? [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
        ]
      : [];
  },
};
export default nextConfig;
