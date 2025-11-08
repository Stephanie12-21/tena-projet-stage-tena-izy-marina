// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Inclure les fichiers générés par Prisma pour le build serveur
  outputFileTracingIncludes: {
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

  // ⚠ Ne rien mettre ici pour PWA, sinon GenerateSW plante
};

export default nextConfig;
