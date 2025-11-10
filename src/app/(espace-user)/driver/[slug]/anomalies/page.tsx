"use client";

import { reportAnomaly } from "@/app/actions/reportAnomaly";
import { useAuth } from "@/app/context/provider";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface Child {
  id: string;
  nom: string;
  prenom: string;
  parent: {
    nom: string;
    prenom: string;
    phone: string;
  };
}

interface Bus {
  id: string;
  matricule: string;
  children: Child[];
}

export default function ReportAnomalyForm() {
  const { dbUser, loading } = useAuth();
  const [bus, setBus] = useState<Bus | null>(null);
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // 🔹 Récupération du bus et de ses enfants via l'API
  useEffect(() => {
    if (!dbUser || dbUser.role !== "DRIVER") return;

    async function fetchBus() {
      const res = await fetch(`/api/users/driver/${dbUser?.id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.bus) setBus(data.bus);
        else setMessage(data.message || "Aucun bus assigné");
      } else {
        setMessage("Erreur lors de la récupération du bus");
      }
    }

    fetchBus();
  }, [dbUser]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dbUser || !bus || bus.children.length === 0) return;

    try {
      await Promise.all(
        bus.children.map((child) =>
          reportAnomaly(dbUser.id, bus.id, child.id, description)
        )
      );
      setMessage("✅ Anomalie signalée pour tous les enfants !");
      setDescription("");
    } catch (err) {
      if (err instanceof Error) setMessage("❌ Erreur : " + err.message);
      else setMessage("❌ Une erreur inconnue est survenue");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!dbUser || dbUser.role !== "DRIVER")
    return <p>Vous nêtes pas autorisé.</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <h2 className="text-xl font-semibold">Reporter une anomalie</h2>

      <textarea
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
        className="border p-2 rounded w-full"
        placeholder="Décrivez l'incident..."
        required
      />

      {/* Input pour l'adresse */}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={!bus || bus.children.length === 0}
      >
        Envoyer
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
