"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { toast, ToastContainer } from "react-toastify";
import { BusStatus } from "../../../../../../../../generated/prisma";
import { updateBusAction } from "@/app/actions/bus";
import { Bus, Driver } from "@/lib/types/user-interface";

export default function EditBusPage() {
  const router = useRouter();
  const pathname = usePathname();
  const busId = pathname?.split("/").pop(); // récupère l'ID depuis l'URL

  const [bus, setBus] = useState<Bus | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driverId, setDriverId] = useState("");
  const [status, setStatus] = useState<BusStatus>(BusStatus.ACTIF);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!busId) return;

    const fetchBusAndDrivers = async () => {
      try {
        const [busRes, driversRes] = await Promise.all([
          fetch(`/api/bus/${busId}`),
          fetch("/api/users?role=DRIVER"),
        ]);

        if (!busRes.ok) throw new Error("Erreur API bus");
        if (!driversRes.ok) throw new Error("Erreur API chauffeurs");

        const busData = await busRes.json(); // busData est le bus lui-même
        const driversData = await driversRes.json();

        console.log("Bus fetché:", busData);
        console.log("Drivers fetchés:", driversData);

        setBus(busData); // <-- correction ici
        setDrivers(driversData.drivers ?? []);
        setDriverId(busData.driverId || driversData.drivers?.[0]?.id || "");
        setStatus(busData.status || BusStatus.ACTIF);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors du chargement du bus ou des chauffeurs");
      } finally {
        setLoading(false);
      }
    };

    fetchBusAndDrivers();
  }, [busId]);

  if (loading) return <div>Chargement...</div>;
  if (!bus) return <div>Bus introuvable</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const busData = {
      id: bus.id,
      matricule: formData.get("matricule") as string,
      brand: formData.get("brand") as string,
      seats: Number(formData.get("seats")),
      driverId,
      status,
    };

    const res = await updateBusAction(busData);

    if (res?.success) {
      toast.success("Bus mis à jour avec succès");
      router.push("../bus");
    } else {
      toast.error(res?.message || "Erreur lors de la mise à jour du bus");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>Modifier le Bus</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label>Numéro de matricule</Label>
              <Input
                name="matricule"
                type="text"
                required
                defaultValue={bus.matricule}
              />
            </div>

            <div className="space-y-3">
              <Label>Marque du bus</Label>
              <Input
                name="brand"
                type="text"
                required
                defaultValue={bus.brand}
              />
            </div>

            <div className="space-y-3">
              <Label>Nombre de places</Label>
              <Input
                name="seats"
                type="number"
                min={10}
                required
                defaultValue={bus.seats}
              />
            </div>

            <div className="space-y-3">
              <Label>Chauffeur</Label>
              <Select value={driverId} onValueChange={setDriverId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un chauffeur" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.nom} {d.prenom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Statut</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as BusStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BusStatus.ACTIF}>Actif</SelectItem>
                  <SelectItem value={BusStatus.MAINTENANCE}>
                    Maintenance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Mettre à jour le bus
            </Button>
          </form>
        </CardContent>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          toastStyle={{ width: "500px" }}
        />
      </Card>
    </div>
  );
}
