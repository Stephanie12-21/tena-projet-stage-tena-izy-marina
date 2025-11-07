"use client";

import React from "react";
import { useAuth } from "@/app/context/provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { signOut } from "@/app/actions/auth";
import { useDriverSupabaseRealtime } from "@/hooks/useDriverWebSocket";

const MainPageAsdriver = () => {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();

  const { position, error, isConnected } = useDriverSupabaseRealtime(
    dbUser?.id
  );

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!user) return <div className="p-6">Vous n’êtes pas connecté.</div>;

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
