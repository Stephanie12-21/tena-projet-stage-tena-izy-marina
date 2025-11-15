"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { deleteBusAction } from "@/app/actions/bus";
import { Bus } from "@/lib/types/user-interface";

export default function DeleteBusForm({
  bus,
  onSuccess,
}: {
  bus: Bus;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteBusAction(bus.id);
    setLoading(false);

    if (res?.success) {
      toast.success("Bus supprimé avec succès");
      if (onSuccess) onSuccess();
    } else {
      toast.error(res?.message || "Erreur lors de la suppression du bus");
    }
  };

  return (
    <div className="space-y-6 py-2">
      <p className="text-muted-foreground">
        Voulez-vous vraiment supprimer le bus :
        <br />
        <span className="font-semibold text-foreground">
          {bus.matricule} – {bus.brand}
        </span>
        ?
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => onSuccess?.()}>
          Annuler
        </Button>

        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? "Suppression..." : "Supprimer"}
        </Button>
      </div>
    </div>
  );
}
