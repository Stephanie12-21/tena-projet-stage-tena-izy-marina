"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Home,
  School,
  Plus,
  Trash2,
  Download,
  QrCode,
  MoreVertical,
  Edit,
  AlertTriangle,
  X,
} from "lucide-react";
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    child: Child | null;
  }>({ isOpen: false, child: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

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

  const openDeleteModal = (child: Child) => {
    setDeleteModal({ isOpen: true, child });
    setActiveDropdown(null);
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, child: null });
  };

  const handleDelete = async () => {
    if (!deleteModal.child) return;

    setIsDeleting(true);
    try {
      const res = await deleteChild(deleteModal.child.id);
      if (!res.success) throw new Error("Erreur lors de la suppression");

      setChildren((prev) => prev.filter((c) => c.id !== deleteModal.child!.id));
      toast.success(res.message);
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression de l'enfant");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || loadingChildren) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-border border-t-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-muted-foreground">
          Vous devez être connecté pour voir vos enfants.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header minimaliste */}
        <div className="mb-8 pb-6 border-b border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <Home className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Mes enfants
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {children.length} enfant{children.length > 1 ? "s" : ""}{" "}
                  enregistré{children.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <Button
              onClick={() => router.push("./children/addnew")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un enfant
            </Button>
          </div>
        </div>

        {children.length === 0 ? (
          <Card className="p-12 text-center border-border border-dashed">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Aucun enfant enregistré
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Commencez par ajouter votre premier enfant
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {children.map((child) => (
              <Card
                key={child.id}
                className="p-5 border-border hover:bg-muted/30 transition-colors"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {child.imageprofile ? (
                        <div className="relative w-5 h-5 rounded overflow-hidden">
                          <Image
                            src={child.imageprofile.url || "/placeholder.svg"}
                            alt={`${child.prenom} ${child.nom}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Home className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-foreground">
                        {child.prenom} {child.nom}
                      </h3>
                      <p className="text-sm text-muted-foreground">Enfant</p>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-start gap-2">
                      <Home className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Domicile
                        </p>
                        <p className="text-sm text-foreground">
                          {child.adresse}
                        </p>
                      </div>
                    </div>
                  </div>

                  {child.school && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-start gap-2">
                        <School className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            École
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {child.school.nom}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {child.school.adresse}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* QR Code Section */}
                  {qrCodes[child.id] && (
                    <div className="p-3 rounded-lg bg-muted/30 flex justify-center">
                      <Image
                        height={300}
                        width={300}
                        src={qrCodes[child.id]}
                        alt={`QR Code`}
                        className="rounded"
                      />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  {!qrCodes[child.id] ? (
                    <Button
                      size="sm"
                      onClick={() => handleGenerateQr(child.id)}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    >
                      <QrCode className="w-4 h-4" />
                      Générer QR
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = qrCodes[child.id];
                        link.download = `qr-${child.prenom}-${child.nom}.png`;
                        link.click();
                      }}
                      className="flex-1 gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </Button>
                  )}

                  <div className="relative">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === child.id ? null : child.id
                        )
                      }
                      className="px-3"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>

                    {/* Dropdown Menu */}
                    {activeDropdown === child.id && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                          <button
                            onClick={() => {
                              router.push(`./children/edit/${child.id}/`);
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                            <span>Modifier</span>
                          </button>

                          {qrCodes[child.id] && (
                            <button
                              onClick={() => {
                                handleGenerateQr(child.id);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                            >
                              <QrCode className="w-4 h-4 text-muted-foreground" />
                              <span>Régénérer QR</span>
                            </button>
                          )}

                          <div className="h-px bg-border my-1" />

                          <button
                            onClick={() => openDeleteModal(child)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      {deleteModal.isOpen && deleteModal.child && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
            onClick={closeDeleteModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full animate-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-100 dark:bg-red-950/30">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Confirmer la suppression
                    </h3>
                  </div>
                </div>
                <button
                  onClick={closeDeleteModal}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  disabled={isDeleting}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Êtes-vous sûr de vouloir supprimer{" "}
                  <span className="font-semibold text-foreground">
                    {deleteModal.child.prenom} {deleteModal.child.nom}
                  </span>{" "}
                  ? Cette action est irréversible.
                </p>

                {/* Info de l'enfant */}
                <div className="p-3 rounded-lg bg-muted/50 mb-6">
                  <div className="flex items-center gap-3">
                    {deleteModal.child.imageprofile ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={deleteModal.child.imageprofile.url}
                          alt={`${deleteModal.child.prenom} ${deleteModal.child.nom}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Home className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {deleteModal.child.prenom} {deleteModal.child.nom}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {deleteModal.child.adresse}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={closeDeleteModal}
                    className="flex-1"
                    disabled={isDeleting}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Suppression...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}
