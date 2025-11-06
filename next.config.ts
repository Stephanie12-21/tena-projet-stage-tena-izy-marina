/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "**/*": ["./generated/prisma/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
};

module.exports = nextConfig;
