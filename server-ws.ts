import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { prisma } from "./src/lib/prisma";

const PORT = 3001;

const server = createServer();
const wss = new WebSocketServer({ server });

interface LocationData {
  driverId: string;
  lat: number;
  lon: number;
  timestamp?: string;
  accuracy?: number;
}

wss.on("connection", (socket: WebSocket) => {
  console.log("🔌 Nouveau client connecté");

  socket.send(
    JSON.stringify({
      type: "connected",
      message: "Connecté au serveur de suivi",
      timestamp: new Date().toISOString(),
    })
  );

  socket.on("message", async (message: Buffer) => {
    try {
      const data: LocationData = JSON.parse(message.toString());
      const { driverId, lat, lon, timestamp, accuracy } = data;

      console.log(`📍 Position reçue pour ${driverId}:`, { lat, lon });

      if (!driverId || lat == null || lon == null) {
        console.error("❌ Données invalides");
        socket.send(
          JSON.stringify({
            type: "error",
            message: "Données invalides",
          })
        );
        return;
      }

      // Mettre à jour la BDD
      await prisma.driverProfile.update({
        where: { userId: driverId },
        data: {
          currentLat: lat,
          currentLong: lon,
        },
      });

      console.log(`✅ Position mise à jour pour ${driverId}`);

      // Confirmer au client
      socket.send(
        JSON.stringify({
          type: "location_confirmed",
          driverId,
          timestamp: new Date().toISOString(),
        })
      );

      // Broadcaster aux autres clients
      wss.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "location_update",
              driverId,
              lat,
              lon,
              timestamp: timestamp || new Date().toISOString(),
              accuracy,
            })
          );
        }
      });
    } catch (err) {
      console.error("❌ Erreur:", err);
      socket.send(
        JSON.stringify({
          type: "error",
          message: err instanceof Error ? err.message : "Erreur inconnue",
        })
      );
    }
  });

  socket.on("close", () => console.log("🔌 Client déconnecté"));
  socket.on("error", (error) => console.error("❌ Erreur WebSocket:", error));
});

server.listen(PORT, () => {
  console.log(`🚀 Serveur WebSocket démarré sur ws://localhost:${PORT}`);
});

// Gestion propre de l'arrêt
process.on("SIGTERM", async () => {
  console.log("Fermeture du serveur WebSocket...");
  await prisma.$disconnect();
  server.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("\nFermeture du serveur WebSocket...");
  await prisma.$disconnect();
  server.close();
  process.exit(0);
});
