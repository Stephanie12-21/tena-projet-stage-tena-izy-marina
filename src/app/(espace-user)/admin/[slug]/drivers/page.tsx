"use client";

import { useAuth } from "@/app/context/provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Driver } from "@/lib/types/user-interface";

export default function DriversPage() {
  const { dbUser, loading } = useAuth();
  const router = useRouter();

  // ✅ On remplace any[] par Driver[]
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Erreur API /api/users");
        const data = await res.json();
        setDrivers(data.drivers ?? []);
      } catch (error) {
        console.error("Erreur fetch drivers :", error);
      }
    };
    fetchDrivers();
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
          <p>Vous devez être connecté pour voir vos chauffeurs.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between">
          <h1 className="text-4xl font-bold">Liste des chauffeurs</h1>
          <Button onClick={() => router.push("./drivers/addnew")}>
            <Plus className="w-4 h-4" /> Ajouter un chauffeur
          </Button>
        </div>

        <div className="overflow-x-auto border rounded-md">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3">Nom</th>
                <th className="p-3">Prénom</th>
                <th className="p-3">Email</th>
                <th className="p-3">Téléphone</th>
                <th className="p-3">Permis</th>
                <th className="p-3">Type</th>
                <th className="p-3">Expiration</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{d.nom}</td>
                  <td className="p-3">{d.prenom}</td>
                  <td className="p-3">{d.email}</td>
                  <td className="p-3">{d.phone}</td>
                  <td className="p-3">
                    {d.driverProfile?.license?.licenseNumber || "—"}
                  </td>
                  <td className="p-3">
                    {d.driverProfile?.license?.licenseType || "—"}
                  </td>
                  <td className="p-3">
                    {d.driverProfile?.license?.licenseExpiration
                      ? new Date(
                          d.driverProfile.license.licenseExpiration
                        ).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
              {drivers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-500">
                    Aucun chauffeur trouvé.
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
