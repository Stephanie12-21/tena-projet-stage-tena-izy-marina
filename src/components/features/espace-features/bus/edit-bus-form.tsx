"use client";

import { useEffect, useState } from "react";

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

import { toast } from "react-toastify";
import { updateBusAction } from "@/app/actions/bus";
import { Bus, Driver } from "@/lib/types/user-interface";
import { BusStatus } from "../../../../../generated/prisma";

export default function EditBusForm({
  bus,
  onSuccess,
}: {
  bus: Bus;
  onSuccess?: () => void;
}) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driverId, setDriverId] = useState(bus.id || "");
  const [status, setStatus] = useState<BusStatus>(bus.status);
  const [loading, setLoading] = useState(false);

  // Fetch des chauffeurs
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch("/api/users?role=DRIVER");
        const data = await res.json();
        setDrivers(data.drivers ?? []);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors du chargement des chauffeurs");
      }
    };

    fetchDrivers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
    setLoading(false);

    if (res?.success) {
      toast.success("Bus mis à jour avec succès");
      if (onSuccess) onSuccess(); // fermeture du modal + refresh
    } else {
      toast.error(res?.message || "Erreur lors de la mise à jour du bus");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 py-2">
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
        <Input name="brand" type="text" required defaultValue={bus.brand} />
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
        <Select value={status} onValueChange={(v) => setStatus(v as BusStatus)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={BusStatus.ACTIF}>Actif</SelectItem>
            <SelectItem value={BusStatus.MAINTENANCE}>Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Mise à jour..." : "Mettre à jour le bus"}
      </Button>
    </form>
  );
}
