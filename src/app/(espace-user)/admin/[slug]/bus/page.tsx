"use client";

import { useAuth } from "@/app/context/provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Bus, ChildWithRelations } from "@/lib/types/user-interface";
import { deleteBusAction } from "@/app/actions/bus";
import { toast, ToastContainer } from "react-toastify";

export default function BusesPage() {
  const { dbUser, loading } = useAuth();
  const router = useRouter();

  const [buses, setBuses] = useState<Bus[]>([]);
  const [addresses, setAddresses] = useState<Record<string, string>>({});
  const [selectedBusChildren, setSelectedBusChildren] = useState<
    ChildWithRelations[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBusName, setModalBusName] = useState("");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch("/api/bus");
        if (!res.ok) throw new Error("Erreur API /api/bus");
        const data = await res.json();
        const busArray = Array.isArray(data.buses) ? data.buses : data;
        setBuses(busArray);

        for (const bus of busArray) {
          if (
            bus.driver?.driverProfile?.currentLat != null &&
            bus.driver?.driverProfile?.currentLong != null
          ) {
            const lat = bus.driver.driverProfile.currentLat;
            const lon = bus.driver.driverProfile.currentLong;

            try {
              const geoRes = await fetch(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`
              );

              const geoData = await geoRes.json();

              // Affiche la réponse complète de Geoapify dans la console
              console.log("Geoapify response for bus", bus.id, geoData);

              const address =
                geoData.results?.[0]?.formatted || "Adresse inconnue";
              setAddresses((prev) => ({ ...prev, [bus.id]: address }));
            } catch (err) {
              console.error("Erreur Geoapify:", err);
            }
          }
        }
      } catch (error) {
        console.error("Erreur fetch buses :", error);
      }
    };

    fetchBuses();
    const intervalId = setInterval(fetchBuses, 10000); // refresh toutes les 10s

    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (busId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce bus ?")) return;
    try {
      const res = await deleteBusAction(busId);
      if (!res.success) throw new Error(res.message);
      setBuses(buses.filter((b) => b.id !== busId));
      toast.success("Bus supprimé avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Impossible de supprimer le bus.");
    }
  };

  const handleViewPassengers = async (id: string, busName: string) => {
    try {
      const res = await fetch(`/api/bus/${id}/passengers`);
      if (!res.ok) throw new Error("Erreur fetch enfants");
      const data: ChildWithRelations[] = await res.json();
      setSelectedBusChildren(data);
      setModalBusName(busName);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Impossible de récupérer les passagers.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );

  if (!dbUser)
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 text-center max-w-md">
          <p>Vous devez être connecté pour voir vos bus.</p>
        </Card>
      </div>
    );

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
                <th className="p-3">Places disponibles</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Chauffeur</th>
                <th className="p-3">Adresse actuelle</th>
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
                  <td className="p-3">
                    {addresses[bus.id] || "Chargement..."}
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
                      onClick={() => handleDelete(bus.id)}
                    >
                      Supprimer
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => router.push(`./bus/assign/${bus.id}`)}
                    >
                      Affecter élèves
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        handleViewPassengers(bus.id, bus.matricule)
                      }
                    >
                      Voir les passagers
                    </Button>
                  </td>
                </tr>
              ))}
              {buses.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-500">
                    Aucun bus trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal pour passagers */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2"
                onClick={() => setModalOpen(false)}
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4">
                Passagers du bus {modalBusName}
              </h2>
              {selectedBusChildren.length === 0 ? (
                <p>Aucun passager pour ce bus.</p>
              ) : (
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedBusChildren.map((child) => (
                    <li
                      key={child.id}
                      className="border p-2 rounded flex flex-col"
                    >
                      <span className="font-semibold">
                        {child.prenom} {child.nom}
                      </span>
                      <span>Adresse : {child.adresse}</span>
                      <span>
                        École : {child.school.nom} - {child.school.adresse}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          toastStyle={{ width: "500px" }}
        />
      </div>
    </div>
  );
}
