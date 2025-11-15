"use client";

import { useAuth } from "@/app/context/provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Plus,
  X,
  MapPin,
  Users,
  Edit,
  Trash2,
  UserPlus,
  Eye,
  Bus as BusIcon,
  MoreVertical,
  School,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Bus, ChildWithRelations } from "@/lib/types/user-interface";
import { toast, ToastContainer } from "react-toastify";
import EditBusForm from "@/components/features/espace-features/bus/edit-bus-form";
import AddBusForm from "@/components/features/espace-features/bus/add-bus-form";
import DeleteBusForm from "@/components/features/espace-features/bus/delete-bus-form";

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
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editBus, setEditBus] = useState<Bus | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBus, setDeleteBus] = useState<Bus | null>(null);

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
  useEffect(() => {
    fetchBuses();
    const intervalId = setInterval(fetchBuses, 10000);

    return () => clearInterval(intervalId);
  }, []);


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

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIF: "bg-blue-500/20 text-blue-500 border-blue-500/30",
      MAINTENANCE: "bg-orange-400/20 text-orange-400 border-orange-400/30",
    };

    const labels = {
      ACTIF: "En service",
      MAINTENANCE: "Maintenance",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${
          styles[status as keyof typeof styles] ||
          "bg-muted text-muted-foreground"
        }`}
      >
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-muted border-t-primary mx-auto"></div>
          <p className="mt-6 text-muted-foreground font-medium">
            Chargement...
          </p>
        </div>
      </div>
    );

  if (!dbUser)
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="p-8 text-center max-w-md border-border">
          <p className="text-muted-foreground">
            Vous devez être connecté pour voir vos bus.
          </p>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BusIcon className="w-6 h-6 text-primary" />
                </div>
                Gestion des bus
              </h1>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un chauffeur
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-lg bg-card rounded-xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau bus</DialogTitle>
                </DialogHeader>
                <AddBusForm
                  onSuccess={() => {
                    setOpen(false);
                    fetchBuses();
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {buses.map((bus) => (
            <Card
              key={bus.id}
              className="p-6 border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BusIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-card-foreground">
                      {bus.matricule}
                    </h3>
                    <p className="text-sm text-muted-foreground">{bus.brand}</p>
                  </div>
                </div>
                {getStatusBadge(bus.status)}
              </div>

              {/* Info Section */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Places disponibles:
                  </span>
                  <span className="font-semibold text-card-foreground">
                    {bus.seats}
                  </span>
                </div>

                {bus.driver && (
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Chauffeur
                    </p>
                    <p className="font-medium text-card-foreground">
                      {bus.driver.nom} {bus.driver.prenom}
                    </p>
                  </div>
                )}

                {addresses[bus.id] && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Position actuelle
                      </p>
                      <p className="text-sm text-card-foreground">
                        {addresses[bus.id]}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button
                  size="sm"
                  onClick={() => router.push(`./bus/assign/${bus.id}`)}
                  className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                >
                  <UserPlus className="w-4 h-4" />
                  Affecter élèves
                </Button>

                <div className="relative">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === bus.id ? null : bus.id
                      )
                    }
                    className="px-3 hover: bg-transparent"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>

                  {/* Dropdown Menu */}
                  {activeDropdown === bus.id && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setActiveDropdown(null)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <button
                          onClick={() => {
                            setEditBus(bus);
                            setEditOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-card-foreground hover:bg-muted transition-colors"
                        >
                          <Edit className="w-4 h-4 text-muted-foreground" />
                          <span>Modifier le bus</span>
                        </button>

                        <button
                          onClick={() => {
                            handleViewPassengers(bus.id, bus.matricule);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-card-foreground hover:bg-muted transition-colors"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span>Voir les passagers</span>
                        </button>

                        <div className="h-px bg-border my-1" />

                        <button
                          onClick={() => {
                            setDeleteBus(bus); // bus sélectionné
                            setDeleteOpen(true); // ouverture modale
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
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

          {buses.length === 0 && (
            <div className="col-span-full">
              <Card className="p-12 text-center border-border border-dashed">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <BusIcon className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Aucun bus trouvé
                </h3>
                <p className="text-muted-foreground mb-6">
                  Commencez par ajouter votre premier bus
                </p>
              </Card>
            </div>
          )}
        </div>

        {/* Modal pour passagers */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border p-6 rounded-2xl shadow-2xl max-w-2xl w-full relative animate-in fade-in zoom-in duration-200">
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                onClick={() => setModalOpen(false)}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">
                    Passagers du bus
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {modalBusName}
                  </p>
                </div>
              </div>

              {selectedBusChildren.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Aucun passager pour ce bus.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                  {selectedBusChildren.map((child) => (
                    <div
                      key={child.id}
                      className="border border-border p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-card-foreground mb-1">
                            {child.prenom} {child.nom}
                          </p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-2 text-sm">
                              <Home className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                              <span className="text-muted-foreground truncate">
                                Domicile : {child.adresse}
                              </span>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                              <School className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">
                                Ecole : {child.school.nom} -{" "}
                                {child.school.adresse}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------- MODAL EDIT BUS ---------------- */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Modifier le bus</DialogTitle>
            </DialogHeader>

            {editBus && (
              <EditBusForm
                bus={editBus}
                onSuccess={() => {
                  setEditOpen(false);
                  fetchBuses(); // refresh liste
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* ---------------- MODAL DELETE BUS ---------------- */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent className="max-w-md bg-card rounded-xl shadow-2xl">
            <DialogHeader>
              <DialogTitle>Supprimer le bus</DialogTitle>
            </DialogHeader>

            {deleteBus && (
              <DeleteBusForm
                bus={deleteBus}
                onSuccess={() => {
                  setDeleteOpen(false);
                  fetchBuses(); // refresh liste
                }}
              />
            )}
          </DialogContent>
        </Dialog>

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
