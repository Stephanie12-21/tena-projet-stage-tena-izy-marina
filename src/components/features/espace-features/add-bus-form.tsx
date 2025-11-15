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

import { Driver } from "@/lib/types/user-interface";
import { createBusAction } from "@/app/actions/bus";
import { toast } from "react-toastify";
import { BusStatus } from "../../../../generated/prisma";

export default function AddBusForm({ onSuccess }: { onSuccess?: () => void }) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driverId, setDriverId] = useState("");
  const [status, setStatus] = useState<BusStatus>(BusStatus.ACTIF);

  const [loadingDrivers, setLoadingDrivers] = useState(true); // 👈 loading fetch chauffeurs
  const [submitting, setSubmitting] = useState(false); // 👈 loading soumission

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoadingDrivers(true);
        const res = await fetch("/api/users?role=DRIVER");
        if (!res.ok) throw new Error("Erreur API /api/users");
        const data = await res.json();

        setDrivers(data.drivers ?? []);
        if (data.drivers?.length) setDriverId(data.drivers[0].id);
      } catch (error) {
        console.error("Erreur fetch drivers :", error);
        toast.error("Impossible de charger les chauffeurs ❌");
      } finally {
        setLoadingDrivers(false);
      }
    };
    fetchDrivers();
  }, []);

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const busData = {
      matricule: formData.get("matricule") as string,
      brand: formData.get("brand") as string,
      seats: Number(formData.get("seats")),
      driverId,
      status,
    };

    const res = await createBusAction(busData);

    setSubmitting(false);

    if (res?.success) {
      toast.success("Bus ajouté avec succès ✅", {
        position: "top-right",
        autoClose: 3000,
      });
      onSuccess?.();
    } else {
      toast.error(res?.message || "Erreur lors de l'ajout du bus", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative">
      <div className="w-full max-w-lg mt-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <Label>Numéro de matricule</Label>
            <Input
              name="matricule"
              type="text"
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-3">
            <Label>Marque du bus</Label>
            <Input name="brand" type="text" required disabled={submitting} />
          </div>

          <div className="space-y-3">
            <Label>Nombre de places</Label>
            <Input
              name="seats"
              type="number"
              min={10}
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-3">
            <Label>Chauffeur</Label>

            {loadingDrivers ? (
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            ) : (
              <Select
                value={driverId}
                onValueChange={setDriverId}
                disabled={submitting || loadingDrivers}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un chauffeur" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.length > 0 ? (
                    drivers.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.nom} {d.prenom}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      Aucun chauffeur disponible
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-3">
            <Label>Statut</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as BusStatus)}
              disabled={submitting}
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

          <Button
            type="submit"
            className="w-full"
            disabled={submitting || loadingDrivers}
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                Enregistrement...
              </div>
            ) : (
              "Enregistrer le bus"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
