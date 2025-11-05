"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { signOut } from "@/app/actions/auth";

const MainPageAsdriver = () => {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();

  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n’est pas supportée par votre navigateur.");
      return;
    }

    // 🔹 Suivi en temps réel
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000, // 10 secondes
        timeout: 5000,
      }
    );

    // 🔹 Nettoyage au démontage du composant
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Vous n’êtes pas connecté.</div>;

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
          Bienvenue, {dbUser?.nom || user.user_metadata?.full_name || "driver"}{" "}
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

          {/* 🔹 Affichage de la position en temps réel */}
          {position ? (
            <p>
              <strong>Position actuelle :</strong> {position.lat.toFixed(6)},{" "}
              {position.lon.toFixed(6)}
            </p>
          ) : (
            <p>{error || "Récupération de la position..."}</p>
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
