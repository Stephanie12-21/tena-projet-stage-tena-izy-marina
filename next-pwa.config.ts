// next-pwa.config.ts

const pwaConfig = {
  dest: "public", // dossier où sera généré le SW
  register: true, // auto-enregistrer le SW
  skipWaiting: true, // activer immédiatement le nouveau SW
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "https-calls",
        networkTimeoutSeconds: 15,
        expiration: {
          maxEntries: 150,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 24 * 60 * 60, // 60 jours
        },
      },
    },
  ],
} as const;

export default pwaConfig;
