import { WebSocketServer } from "ws";
import { prisma } from "@/lib/prisma";
let wss: WebSocketServer;

export const GET = () => {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on("connection", (socket) => {
      console.log("Client connecté via WebSocket");

      socket.on("message", async (message) => {
        try {
          const data = JSON.parse(message.toString());
          const { driverId, lat, lon } = data;

          if (!driverId || lat == null || lon == null) return;

          // 🔹 Mettre à jour la base avec Prisma
          await prisma.driverProfile.update({
            where: { userId: driverId },
            data: { currentLat: lat, currentLong: lon },
          });

          // 🔹 Re-broadcast de la position à tous les clients connectés (optionnel)
          wss.clients.forEach((client) => {
            if (client.readyState === 1) client.send(JSON.stringify(data));
          });
        } catch (err) {
          console.error("Erreur WebSocket:", err);
        }
      });

      socket.on("close", () => console.log("Client déconnecté"));
    });
  }

  return new Response("WebSocket route initialisée");
};
