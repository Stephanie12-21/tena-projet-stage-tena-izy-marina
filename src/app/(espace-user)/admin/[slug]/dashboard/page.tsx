"use client";

import React from "react";
import { useAuth } from "@/app/context/provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { signOut } from "@/app/actions/auth";

const MainPageAsParent = () => {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Vous n’êtes pas connecté.</div>;

  const slug = `${dbUser?.prenom}-${dbUser?.nom}`
    .toLowerCase()
    .replace(/\s+/g, "-");

  // 🔹 Fonction de navigation dynamique vers les pages enfants
  const goTo = (path: string) => {
    if (!slug) {
      console.warn("Impossible de naviguer : slug non défini");
      return;
    }
    router.push(`/admin/${slug}/${path}`);
  };

  // 🔹 Déconnexion via server action
  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Bienvenue, {dbUser?.prenom} {dbUser?.nom}
        </h1>

        <div className="bg-white shadow rounded-xl p-4 mb-6">
          <h2 className="text-lg font-medium mb-2">Mes informations</h2>
          <p>
            <strong>Nom :</strong> {dbUser?.nom}
          </p>
          <p>
            <strong>Prénom :</strong> {dbUser?.prenom}
          </p>
          <p>
            <strong>Phone :</strong> {dbUser?.phone}
          </p>
          <p>
            <strong>Email :</strong> {dbUser?.email}
          </p>
          <p>
            <strong>Rôle :</strong> {dbUser?.role}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button onClick={() => goTo("users")} className="w-full py-6 text-lg">
            Les utilisateurs
          </Button>

          <Button
            onClick={() => goTo("chauffeurs")}
            className="w-full py-6 text-lg"
          >
            Les chauffeurs
          </Button>

          <Button onClick={() => goTo("bus")} className="w-full py-6 text-lg">
            Les bus
          </Button>

          <Button
            onClick={() => goTo("abonnements")}
            className="w-full py-6 text-lg"
          >
            Les abonnements
          </Button>

          <Button
            onClick={() => goTo("trajets")}
            className="w-full py-6 text-lg"
          >
            Suivi du trajet
          </Button>

          <Button
            onClick={() => goTo("notifications")}
            className="w-full py-6 text-lg"
          >
            Notifications
          </Button>

          <Button
            onClick={() => goTo("profil")}
            className="w-full py-6 text-lg"
          >
            Profil utilisateur
          </Button>

          {/* 🔹 Bouton de déconnexion */}
          <Button
            onClick={handleSignOut}
            className="w-full py-6 text-lg bg-red-100 hover:bg-red-200 text-red-700"
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MainPageAsParent;
