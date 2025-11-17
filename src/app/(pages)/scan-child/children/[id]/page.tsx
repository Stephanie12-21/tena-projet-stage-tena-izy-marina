"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MapPin, School, User, Phone, Mail } from "lucide-react";
import { useAuth } from "@/app/context/provider";
import { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { checkChildAccess } from "@/app/actions/checkChildAccess";
import { ChildWithRelations } from "@/lib/types/user-interface";
import { logChildScan } from "@/app/actions/scan-child";
import { toast, ToastContainer } from "react-toastify";

export default function ChildPage() {
  const { dbUser, loading } = useAuth();
  const params = useParams();

  const [child, setChild] = useState<ChildWithRelations | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loadingChild, setLoadingChild] = useState(true);

  const [scanType, setScanType] = useState<"BOARDING" | "DROPOFF" | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (loading || !dbUser) return;

    const childIdStr = Array.isArray(params?.id) ? params.id[0] : params?.id;
    if (!childIdStr) return;

    const fetchChildAccess = async () => {
      try {
        const result = await checkChildAccess(dbUser.id, childIdStr);
        setHasAccess(result.allowed);
        if (result.allowed && result.child) {
          setChild(result.child);
        }
      } catch (err) {
        toast.error("Erreur lors de la vérification de l'accès");
        console.error("Erreur lors de la vérification de l'accès :", err);
        setHasAccess(false);
      } finally {
        setLoadingChild(false);
      }
    };

    fetchChildAccess();
  }, [loading, dbUser, params?.id]);

  const handleScanLog = () => {
    if (!scanType || !child || !dbUser) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        startTransition(async () => {
          try {
            await logChildScan(
              child.id,
              dbUser.id,
              scanType,
              position.coords.latitude,
              position.coords.longitude
            );
            toast.success("Scan enregistré avec succès");
            setScanType(null);
          } catch (err: unknown) {
            console.error("Error logging scan:", err);
            if (err instanceof Error) {
              toast.error("Erreur lors de l'enregistrement");
              console.error("Erreur lors de l'enregistrement : " + err.message);
            } else {
              toast.error("Erreur inconnue lors de l'enregistrement");
            }
          }
        });
      },
      (err) => {
        console.error("Impossible de récupérer la position GPS", err);
        toast.error("Impossible de récupérer la position GPS");
      }
    );
  };

  if (loading || loadingChild) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  if (!dbUser || !hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <p className="text-muted-foreground">Accès refusé</p>
        </Card>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <p className="text-muted-foreground">Enfant introuvable</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-lg mx-auto space-y-3">
        {/* Profile Card */}
        <Card>
          <div className="p-6">
            {/* Avatar and Name */}
            <div className="flex items-center gap-4 mb-6">
              {child.imageprofile?.url ? (
                <div className="relative w-16 h-16 shrink-0 ">
                  <Image
                    src={child.imageprofile.url}
                    alt={`${child.prenom} ${child.nom}`}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 shrink-0  rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary-foreground">
                    {child.prenom[0]}
                    {child.nom[0]}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {child.prenom} {child.nom}
                </h1>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              {/* Address */}
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0  mt-0.5" />
                <p className="text-muted-foreground">{child.adresse}</p>
              </div>

              {/* School */}
              {child.school && (
                <div className="flex gap-2">
                  <School className="w-4 h-4 text-muted-foreground shrink-0  mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium">
                      {child.school.nom}
                    </p>
                    <p className="text-muted-foreground">
                      {child.school.adresse}
                    </p>
                    {(child.arrivalTime || child.departureTime) && (
                      <div className="flex items-center gap-3 mt-1 text-muted-foreground">
                        {child.arrivalTime && (
                          <span>↓ {child.arrivalTime}</span>
                        )}
                        {child.departureTime && (
                          <span>↑ {child.departureTime}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Parent Info */}
              {child.parent && (
                <div className="flex gap-2">
                  <User className="w-4 h-4 text-muted-foreground shrink-0  mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">
                      {child.parent.prenom} {child.parent.nom}
                    </p>
                    {child.parent.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {child.parent.email}
                        </span>
                      </div>
                    )}
                    {child.parent.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {child.parent.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Scan Actions - Driver Only */}
        {dbUser.role === "DRIVER" && (
          <Card>
            <div className="p-6 space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setScanType("BOARDING")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    scanType === "BOARDING"
                      ? "bg-green-600 text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Montée
                </button>
                <button
                  onClick={() => setScanType("DROPOFF")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    scanType === "DROPOFF"
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Descente
                </button>
              </div>

              {scanType && (
                <button
                  onClick={handleScanLog}
                  disabled={isPending}
                  className="w-full py-2.5 px-6 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground text-sm font-medium rounded-lg transition-colors"
                >
                  {isPending ? "Enregistrement..." : "Confirmer"}
                </button>
              )}
            </div>
          </Card>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}
