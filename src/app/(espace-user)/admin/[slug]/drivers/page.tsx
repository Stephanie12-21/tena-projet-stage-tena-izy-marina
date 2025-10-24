"use client";

import { useAuth } from "@/app/context/provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChildrenPage() {
  const { dbUser, loading } = useAuth();

  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 text-center max-w-md">
          <p className="text-lg text-muted-foreground">
            Vous devez être connecté pour voir vos enfants.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER + bouton ajouter */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Les chauffeurs{" "}
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez les profils des chauffeurs de votre espace admin.
            </p>
          </div>

          <Button
            onClick={() => router.push("./admin/addnew")}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter un chauffeur
          </Button>
        </div>
      </div>
    </div>
  );
}
