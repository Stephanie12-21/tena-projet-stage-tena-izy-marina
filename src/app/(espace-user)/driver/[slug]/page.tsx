"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/app/context/provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { signOut } from "@/app/actions/auth";

// -------------------- Hook WebSocket --------------------
function useDriverWebSocket(driverId: string | undefined) {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!driverId) {
      setError("ID du chauffeur non disponible");
      return;
    }

    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    let watchId: number | null = null;
    let isMounted = true;

    const connectWebSocket = () => {
      try {
        // ✅ Connexion au serveur WebSocket séparé sur le port 3001
        const ws = new WebSocket("ws://localhost:3001");
        wsRef.current = ws;

        ws.onopen = () => {
          console.log("✅ Connecté au WebSocket");
          setIsConnected(true);
          setError(null);

          // Démarrer le suivi de la géolocalisation
          watchId = navigator.geolocation.watchPosition(
            (pos) => {
              const coords = {
                driverId,
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
                timestamp: new Date().toISOString(),
                accuracy: pos.coords.accuracy,
              };

              setPosition({ lat: coords.lat, lon: coords.lon });

              // Envoyer la position au serveur
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(coords));
                console.log("📍 Position envoyée:", coords);
              }
            },
            (err) => {
              console.error("❌ Erreur géolocalisation:", err);
              setError(`Erreur géolocalisation : ${err.message}`);
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 10000,
            }
          );
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("📨 Message reçu du serveur:", data);

            if (data.type === "error") {
              setError(data.message);
            } else if (data.type === "location_confirmed") {
              console.log("✅ Position confirmée par le serveur");
            }
          } catch (err) {
            console.error("Erreur parsing message:", err);
          }
        };

        ws.onclose = (event) => {
          console.log(
            `🔌 Déconnecté du WebSocket (code: ${event.code}, reason: ${event.reason})`
          );
          setIsConnected(false);
          if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
          }
          if (isMounted) {
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log("🔄 Tentative de reconnexion...");
              connectWebSocket();
            }, 5000);
          }
        };
      } catch (err) {
        console.error("❌ Erreur lors de la création du WebSocket:", err);
        setError("Impossible de se connecter au serveur");
      }
    };

    // Démarrer la connexion
    connectWebSocket();

    // Nettoyage
    return () => {
      isMounted = false;

      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [driverId]);

  return { position, error, isConnected };
}

// -------------------- Composant conducteur --------------------
const MainPageAsdriver = () => {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();

  const { position, error, isConnected } = useDriverWebSocket(dbUser?.id);

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!user) return <div className="p-6">Vous nêtes pas connecté.</div>;

  const slug = `${dbUser?.prenom}-${dbUser?.nom}`
    .toLowerCase()
    .replace(/\s+/g, "-");

  const goTo = (path: string) => {
    if (!slug) return;
    router.push(`/driver/${slug}/${path}`);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ProtectedRoute>
        <h1 className="text-2xl font-semibold mb-4">
          Bienvenue, {dbUser?.nom || user.user_metadata?.full_name || "driver"}
        </h1>

        <div className="bg-white shadow rounded-xl p-4 mb-6">
          <h2 className="text-lg font-medium mb-2">Mes informations</h2>
          <p>
            <strong>Nom :</strong> {dbUser?.nom}
          </p>
          <p>
            <strong>Email :</strong> {dbUser?.email}
          </p>
          <p>
            <strong>Rôle :</strong> {dbUser?.role}
          </p>

          {/* Statut de connexion */}
          <div className="mt-3 p-2 rounded bg-gray-50">
            <p className="flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              ></span>
              <strong>État:</strong>{" "}
              {isConnected ? "Connecté au suivi" : "Déconnecté"}
            </p>
          </div>

          {/* Affichage position */}
          {position ? (
            <div className="mt-3 p-2 rounded bg-blue-50">
              <p>
                <strong>Position actuelle :</strong>
              </p>
              <p className="font-mono text-sm">
                Lat: {position.lat.toFixed(6)}
                <br />
                Lon: {position.lon.toFixed(6)}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-gray-600">
              {error || "Récupération de la position..."}
            </p>
          )}

          {error && (
            <div className="mt-3 p-2 rounded bg-red-50 text-red-700">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={() => goTo("anomalies")}
            className="w-full py-6 text-lg"
          >
            Les anomalies
          </Button>

          <Button
            onClick={() => goTo("trajets")}
            className="w-full py-6 text-lg"
          >
            Mes trajets
          </Button>

          <Button
            onClick={() => goTo("logs-presence")}
            className="w-full py-6 text-lg"
          >
            Les logs de présence
          </Button>

          <Button
            onClick={() => goTo("profil")}
            className="w-full py-6 text-lg"
          >
            Profil utilisateur
          </Button>

          <Button
            onClick={handleSignOut}
            className="w-full py-6 text-lg bg-red-100 hover:bg-red-200 text-red-700"
          >
            Déconnexion
          </Button>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default MainPageAsdriver;
