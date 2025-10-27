"use client";

import { useAuth } from "@/app/context/provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Bus } from "@/lib/types/user-interface";

export default function BusesPage() {
  const { dbUser, loading } = useAuth();
  const router = useRouter();

  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch("/api/bus");
        if (!res.ok) throw new Error("Erreur API /api/bus");
        const data = await res.json();
        console.log("Réponse /api/bus :", data);

        const busesData = Array.isArray(data.buses) ? data.buses : data;
        setBuses(busesData ?? []);
      } catch (error) {
        console.error("Erreur fetch buses :", error);
      }
    };
    fetchBuses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 text-center max-w-md">
          <p>Vous devez être connecté pour voir vos bus.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Liste des bus</h1>
          <Button onClick={() => router.push("./bus/addnew")}>
            <Plus className="w-4 h-4 mr-1" /> Ajouter un bus
          </Button>
        </div>

        <div className="overflow-x-auto border rounded-md">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3">Matricule</th>
                <th className="p-3">Marque</th>
                <th className="p-3">Places</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Chauffeur</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{bus.matricule}</td>
                  <td className="p-3">{bus.brand}</td>
                  <td className="p-3">{bus.seats}</td>
                  <td className="p-3">{bus.status}</td>
                  <td className="p-3">
                    {bus.driver
                      ? `${bus.driver.nom} ${bus.driver.prenom}`
                      : "—"}
                  </td>
                  <td className="p-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`./bus/edit/${bus.id}`)}
                    >
                      Modifier
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        if (!confirm("Voulez-vous vraiment supprimer ce bus ?"))
                          return;
                        try {
                          const res = await fetch(`/api/bus/${bus.id}`, {
                            method: "DELETE",
                          });
                          if (!res.ok)
                            throw new Error("Erreur lors de la suppression");
                          setBuses(buses.filter((b) => b.id !== bus.id));
                        } catch (error) {
                          console.error(error);
                          alert("Impossible de supprimer le bus.");
                        }
                      }}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
              {buses.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    Aucun bus trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
