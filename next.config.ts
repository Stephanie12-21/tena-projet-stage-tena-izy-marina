// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 👇 très important pour Prisma + Next.js (server components)
  serverExternalPackages: ["@prisma/client", "prisma"],
  optimizeCss: false,

  // Inclure les fichiers générés par Prisma pour le build serveur
  outputFileTracingIncludes: {
    // On couvre aussi "app/**" pour éviter les erreurs dans les Server Components
    "app/**": ["./generated/prisma/**/*"],
    "src/app/**": ["./generated/prisma/**/*"],
    "api/**": ["./generated/prisma/**/*"],
    "src/app/api/**": ["./generated/prisma/**/*"],
  },

  // Configuration des images distantes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // remplace par le domaine exact si tu veux plus de sécurité
      },
    ],
  },
};

export default nextConfig;
