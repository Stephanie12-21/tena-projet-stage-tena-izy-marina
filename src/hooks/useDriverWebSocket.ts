"use client";

import { useAuth } from "@/app/context/provider";
import { createClient as createClientAnon } from "@/utils/supabase/client"; // clé anon pour Realtime
import { useEffect, useState } from "react";

interface Position {
  lat: number;
  lon: number;
}

// Typage pour les données Realtime
interface DriverProfileRealtime {
  new: {
    currentLat: number;
    currentLong: number;
  };
}

export function useDriverSupabaseRealtime(driverId?: string) {
  const { dbUser } = useAuth();
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!driverId) {
      setError("ID du chauffeur non disponible");
      return;
    }
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    const supabase = createClientAnon();
    let watchId: number | null = null;
    let subscription: ReturnType<typeof supabase.channel> | null = null;

    // 1️⃣ Suivi géolocalisation + envoi via API serveur
    watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setPosition(coords);
        console.log(driverId, dbUser?.id);
        // Dans useDriverSupabaseRealtime
        try {
          const res = await fetch("/api/updatePosition", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              driverId,
              lat: coords.lat,
              lon: coords.lon,
            }),
          });

          const data = await res.json();
          if (!data.success) {
            console.error("❌ Erreur API:", data.error);
            setError(`Erreur mise à jour: ${data.error}`);
          } else {
            setError(null); // Clear error on success
          }
        } catch (err) {
          const errorMsg =
            err instanceof Error ? err.message : "Erreur inconnue";
          console.error("❌ Erreur fetch:", errorMsg);
          setError(`Erreur connexion: ${errorMsg}`);
        }
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );

    // 2️⃣ Abonnement Realtime lecture seule
    subscription = supabase
      .channel(`driver-${driverId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "DriverProfile",
          filter: `userId=eq.${driverId}`,
        },
        (payload: DriverProfileRealtime) => {
          const { currentLat, currentLong } = payload.new;
          setPosition({ lat: currentLat, lon: currentLong });
        }
      )
      .subscribe();

    setIsConnected(true);

    // Nettoyage
    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
      if (subscription) supabase.removeChannel(subscription);
      setIsConnected(false);
    };
  }, [dbUser?.id, driverId]);

  return { position, error, isConnected };
}
