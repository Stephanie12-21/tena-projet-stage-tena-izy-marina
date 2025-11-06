"use client";

import { useEffect, useState } from "react";
import { Bus, ChildWithRelations, Driver } from "@/lib/types/user-interface";
import { useAuth } from "@/app/context/provider";
import Image from "next/image";

export default function Trajets() {
  const { dbUser, loading: authLoading } = useAuth();
  const [bus, setBus] = useState<
    (Bus & { children: ChildWithRelations[] }) | null
  >(null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverBus = async () => {
      if (!dbUser) return;

      try {
        // 🔹 Vérifie que l'utilisateur est bien un chauffeur
        if (dbUser.role !== "DRIVER") {
          console.warn("L'utilisateur connecté n'est pas un chauffeur.");
          return;
        }

        const driverId = dbUser.id;

        // 🔹 Récupérer le bus et les enfants assignés au chauffeur
        const res = await fetch(`/api/users/driver/${driverId}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération du bus");

        const data: {
          bus: Bus & { children: ChildWithRelations[] };
          driver: Driver;
        } = await res.json();

        setDriver(data.driver);
        setBus(data.bus);

        console.log("Chauffeur :", data.driver);
        console.log("Bus :", data.bus);
      } catch (err) {
        console.error("Erreur API Trajets :", err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchDriverBus();
  }, [dbUser, authLoading]);

  if (authLoading || loading) return <p>Chargement des trajets...</p>;
  if (!bus)
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Aucun bus trouvé pour ce chauffeur.
        </h1>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Trajet du chauffeur : {driver?.prenom} {driver?.nom}
      </h1>

      <div className="border p-4 rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">
          🚌 Bus : {bus.matricule} ({bus.brand})
        </h2>
        <p>Status : {bus.status}</p>
        <p>Places : {bus.seats}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">👧 Passagers à récupérer</h2>
        {bus.children.length === 0 ? (
          <p>Aucun enfant assigné à ce bus.</p>
        ) : (
          <ul className="space-y-3">
            {bus.children.map((child) => (
              <li
                key={child.id}
                className="border p-3 rounded flex flex-col bg-white shadow-sm"
              >
                <span className="font-medium">
                  {child.prenom} {child.nom}
                </span>
                <span className="text-sm text-gray-600">
                  🏠 {child.adresse}
                </span>
                <span>
                  Heure d&apos;entrée à l&apos;école : {child.arrivalTime}
                  heure de sortie : {child.departureTime}
                </span>
                {child.school && (
                  <span className="text-sm text-gray-600">
                    🎓 {child.school.nom} - {child.school.adresse}
                  </span>
                )}
                {child.imageprofile && (
                  <Image
                    width={200}
                    height={200}
                    src={child.imageprofile.url}
                    alt={`Photo de ${child.prenom} ${child.nom}`}
                    className="w-16 h-16 rounded-full mt-2"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
