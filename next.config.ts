import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Redirect all paths from gitface.dilip.live to gitface.dilip.website except /migrate.html
        source: "/:path((?!migrate\\.html$).*)",
        has: [
          {
            type: "host",
            value: "gitface.dilip.live",
          },
        ],
        destination: "https://gitface.dilip.website/:path*",
        permanent: true,
      },
      {
        source: "/:path((?!migrate\\.html$).*)",
        has: [
          {
            type: "host",
            value: "dilip.live",
          },
        ],
        destination: "https://gitface.dilip.website/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
