"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Home, School, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteChild } from "@/app/actions/children";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ImageProfile {
  id: string;
  url: string;
}

interface Parent {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  role: string;
}

interface Child {
  id: string;
  prenom: string;
  nom: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  school: {
    id: string;
    nom: string;
    adresse: string;
    schoolLat: number;
    schoolLong: number;
  };
  imageprofile: ImageProfile;
  parent: Parent;
}

export default function ChildrenPage() {
  const { dbUser, loading } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(true);
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});
  const router = useRouter();

  //récupérer les données de l'enfant
  useEffect(() => {
    if (!dbUser?.id) return;

    async function fetchChildren() {
      try {
        const res = await fetch(`/api/users/${dbUser?.id}/children`);
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des enfants");
        const data: Child[] = await res.json();
        setChildren(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingChildren(false);
      }
    }

    fetchChildren();
  }, [dbUser?.id]);

  //générer un qr code pour l'enfant
  const handleGenerateQr = async (childId: string) => {
    try {
      const res = await fetch(`/api/children/${childId}/generateQr`);
      if (!res.ok) throw new Error("Erreur génération QR code");

      const data = await res.json();
      setQrCodes((prev) => ({ ...prev, [childId]: data.qrCode }));
    } catch (err) {
      console.error(err);
      alert("Impossible de générer le QR code");
    }
  };

  if (loading || loadingChildren) {
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
  // 🔹 Nouvelle fonction pour supprimer un enfant
  const handleDelete = async (childId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet enfant ?")) return;

    try {
      const res = await deleteChild(childId);
      if (!res.success) throw new Error("Erreur lors de la suppression");
      setChildren((prev) => prev.filter((c) => c.id !== childId));
      toast.success(res.message);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression de l'enfant");
    }
  };
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER + bouton ajouter */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Mes enfants
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez les profils et QR codes de vos enfants
            </p>
          </div>

          <Button
            onClick={() => router.push("./children/addnew")}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter un enfant
          </Button>
        </div>

        {children.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Aucun enfant enregistré
              </h2>
              <p className="text-muted-foreground mb-6">
                Commencez par ajouter le profil de votre premier enfant
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/children/new")}
                className="flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Ajouter un enfant
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {children.map((child) => (
              <Card
                key={child.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  {/* HEADER */}
                  <div className="flex items-start gap-6 mb-6">
                    {child.imageprofile ? (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden ring-4 ring-primary/10">
                        <Image
                          src={child.imageprofile.url || "/placeholder.svg"}
                          alt={`${child.prenom} ${child.nom}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-4 ring-primary/10 text-2xl font-bold text-foreground">
                        {child.prenom[0]}
                        {child.nom[0]}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold text-foreground mb-1">
                        {child.prenom} {child.nom}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Profil de l&apos;enfant
                      </p>
                    </div>
                  </div>

                  {/* ADRESSE */}
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Home className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          Adresse du domicile
                        </h3>
                        <p className="text-sm text-foreground/80 mb-2">
                          {child.adresse}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {child.homeLat.toFixed(6)},{" "}
                          {child.homeLong.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ÉCOLE */}
                  {child.school && (
                    <div className="rounded-lg p-4 mb-4 border border-border/50">
                      <div className="flex items-start gap-3">
                        <School className="w-5 h-5" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{child.school.nom}</h3>
                          <p className="text-sm">{child.school.adresse}</p>
                          <p className="text-xs text-muted-foreground font-mono mt-1">
                            {child.school.schoolLat.toFixed(6)},{" "}
                            {child.school.schoolLong.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* QR CODE */}
                  {!qrCodes[child.id] ? (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => handleGenerateQr(child.id)}
                    >
                      Générer le QR code
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border-2 border-dashed border-primary/20">
                        <div className="flex flex-col items-center gap-4">
                          <Image
                            height={200}
                            width={200}
                            src={qrCodes[child.id]}
                            alt={`QR Code de ${child.prenom} ${child.nom}`}
                            className="rounded-xl shadow-md"
                          />
                          <p className="text-xs text-muted-foreground text-center">
                            Scannez ce code pour accéder au profil
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = qrCodes[child.id];
                            link.download = `qr-${child.prenom}-${child.nom}.png`;
                            link.click();
                          }}
                        >
                          Télécharger
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => handleGenerateQr(child.id)}
                        >
                          Régénérer le QR code
                        </Button>
                      </div>
                    </div>
                  )}
                  {/* Bouton Modifier */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      className="w-full mt-4 hover:underline"
                      onClick={() =>
                        router.push(`./children/edit/${child.id}/`)
                      }
                    >
                      Modifier les informations
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleDelete(child.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer l&apos;enfant
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        toastStyle={{
          width: "500px",
        }}
      />
    </div>
  );
}
