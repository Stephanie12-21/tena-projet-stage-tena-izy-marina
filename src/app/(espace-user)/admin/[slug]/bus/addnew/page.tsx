"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

import { Driver } from "@/lib/types/user-interface";
import { BusStatus } from "../../../../../../../generated/prisma";
import { createBusAction } from "@/app/actions/bus";
import { toast, ToastContainer } from "react-toastify";

export default function AddBusForm() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driverId, setDriverId] = useState("");
  const [status, setStatus] = useState<BusStatus>(BusStatus.ACTIF);

  // 🔹 Récupérer les chauffeurs depuis l'API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch("/api/users?role=DRIVER");
        if (!res.ok) throw new Error("Erreur API /api/users");
        const data = await res.json();
        setDrivers(data.drivers ?? []);

        if (data.drivers?.length) setDriverId(data.drivers[0].id);
      } catch (error) {
        console.error("Erreur fetch drivers :", error);
      }
    };
    fetchDrivers();
  }, []);

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const busData = {
      matricule: formData.get("matricule") as string,
      brand: formData.get("brand") as string,
      seats: Number(formData.get("seats")),
      driverId,
      status,
    };

    const res = await createBusAction(busData);

    if (res?.success) {
      toast.success("Bus ajouté avec succès ✅");
      router.push("../bus");
    } else {
      alert(res?.message || "Erreur lors de l'ajout du bus");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>Ajouter un Bus Scolaire </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label>Numéro de matricule</Label>
              <Input name="matricule" type="text" required />
            </div>

            <div className="space-y-3">
              <Label>Marque du bus</Label>
              <Input name="brand" type="text" required />
            </div>

            <div className="space-y-3">
              <Label>Nombre de places</Label>
              <Input name="seats" type="number" min={10} required />
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
              Enregistrer le bus
            </Button>
          </form>
        </CardContent>
        <ToastContainer />
      </Card>
    </div>
  );
}
