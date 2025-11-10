"use client";

import React, { useEffect, useState } from "react";

interface Child {
  id: string;
  nom: string;
  prenom: string;
}

interface Driver {
  id: string;
  nom: string;
  prenom: string;
}

interface Bus {
  id: string;
  matricule: string;
}

interface Anomaly {
  id: string;
  description: string;
  adresse: string;
  createdAt: string;
  updatedAt: string;
  child: Child;
  driver: Driver;
  bus: Bus;
}

const AnomaliesPageAdmin = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchAnomalies() {
      try {
        const res = await fetch("/api/getallanomalies");
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des anomalies");
        const data: Anomaly[] = await res.json();
        setAnomalies(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchAnomalies();
  }, []);

  if (loading) return <p>Chargement des anomalies...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Toutes les anomalies</h1>

      {anomalies.length === 0 ? (
        <p>Aucune anomalie trouvée.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Enfant</th>
              <th className="border px-2 py-1">Bus</th>
              <th className="border px-2 py-1">Chauffeur</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Adresse</th>
              <th className="border px-2 py-1">Créé le</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.map((a) => (
              <tr key={a.id} className="text-center">
                <td className="border px-2 py-1">
                  {a.child.nom} {a.child.prenom}
                </td>
                <td className="border px-2 py-1">{a.bus.matricule}</td>
                <td className="border px-2 py-1">
                  {a.driver.nom} {a.driver.prenom}
                </td>
                <td className="border px-2 py-1">{a.description}</td>
                <td className="border px-2 py-1">{a.adresse ? "✅" : "❌"}</td>
                <td className="border px-2 py-1">
                  {new Date(a.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AnomaliesPageAdmin;
