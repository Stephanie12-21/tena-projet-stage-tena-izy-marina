import type { NextConfig } from "next";
import path from "path";

// 🔧 On étend le type de Next.js pour y ajouter la propriété manquante
interface NextExperimentalFix extends NonNullable<NextConfig["experimental"]> {
  outputFileTracingExcludes?: Record<string, string[]>;
}

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    // Inclure les fichiers Prisma nécessaires
    "api/**": ["./generated/prisma/**/*"],
    "src/app/api/**": ["./generated/prisma/**/*"],
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
    // ✅ On applique le typage étendu ici
    serverActions: {
      bodySizeLimit: "30mb",
    },
    outputFileTracingExcludes: {
      "*": [path.join(process.env.USERPROFILE || "", "Application Data")],
    },
  } as NextExperimentalFix,
};

export default nextConfig;
