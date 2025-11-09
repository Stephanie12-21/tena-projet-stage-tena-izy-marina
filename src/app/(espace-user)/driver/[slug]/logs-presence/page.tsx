"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/provider";

interface ScanLog {
  id: string;
  type: "BOARDING" | "DROPOFF";
  createdAt: string;
  child: { prenom: string; nom: string };
  bus: { matricule: string };
}

const LogsPresences = () => {
  const { dbUser, loading } = useAuth();
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    if (loading || !dbUser) return;

    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/get-scanlog?driverId=${dbUser.id}`);
        if (!res.ok) throw new Error("Impossible de récupérer les logs");
        const data = await res.json();
        setLogs(data.logs);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoadingLogs(false);
      }
    };

    fetchLogs();
  }, [dbUser, loading]);

  if (loading || loadingLogs) return <p>Chargement des logs...</p>;
  if (!logs.length)
    return <p>Aucun log de présence trouvé pour ce chauffeur.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Logs de présence</h2>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li
            key={log.id}
            className="p-3 border rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Enfant :</strong> {log.child.prenom} {log.child.nom}
              </p>
              <p>
                <strong>Bus :</strong> {log.bus.matricule}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  log.type === "BOARDING" ? "text-green-600" : "text-red-600"
                }`}
              >
                {log.type === "BOARDING" ? "Montée" : "Descente"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsPresences;
