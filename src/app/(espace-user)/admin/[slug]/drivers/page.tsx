"use client";

import { useAuth } from "@/app/context/provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  X,
} from "lucide-react";
import { Driver } from "@/lib/types/user-interface";
import InviteDriverForm from "@/components/features/espace-features/invite-driver-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function DriversPage() {
  const { dbUser, loading } = useAuth();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [open, setOpen] = useState(false);

  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [licenseTypeFilter, setLicenseTypeFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Erreur API /api/users");
      const data = await res.json();
      setDrivers(data.drivers ?? []);
      setFilteredDrivers(data.drivers ?? []);
    } catch (error) {
      console.error("Erreur fetch drivers :", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Appliquer les filtres
  useEffect(() => {
    let filtered = [...drivers];

    // Filtre de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.phone?.includes(searchTerm)
      );
    }

    // Filtre par type de permis
    if (licenseTypeFilter !== "all") {
      filtered = filtered.filter(
        (d) => d.driverProfile?.license?.licenseType === licenseTypeFilter
      );
    }

    setFilteredDrivers(filtered);
    setCurrentPage(1); // Reset à la page 1 lors du filtrage
  }, [searchTerm, licenseTypeFilter, drivers]);

  // Calculs de pagination
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDrivers = filteredDrivers.slice(startIndex, endIndex);

  // Types de permis uniques
  const licenseTypes = Array.from(
    new Set(
      drivers.map((d) => d.driverProfile?.license?.licenseType).filter(Boolean)
    )
  );

  const clearFilters = () => {
    setSearchTerm("");
    setLicenseTypeFilter("all");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground font-medium">
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="p-8 text-center max-w-md shadow-xl">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-card-foreground">
            Vous devez être connecté pour voir vos chauffeurs.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Liste des chauffeurs
              </h1>
            </div>

            {/* Bouton Ajouter */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un chauffeur
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-lg bg-card rounded-xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau chauffeur</DialogTitle>
                </DialogHeader>
                <InviteDriverForm
                  onSuccess={() => {
                    setOpen(false);
                    fetchDrivers();
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Barre de filtres */}
          <Card className="p-6 shadow-md border">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Recherche */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, email ou téléphone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 py-3 bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Bouton toggle filtres */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="hover:bg-muted rounded-lg"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres
                {licenseTypeFilter !== "all" && (
                  <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                    1
                  </span>
                )}
              </Button>

              {/* Items par page */}
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(val) => {
                  setItemsPerPage(Number(val));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-32 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 / page</SelectItem>
                  <SelectItem value="25">25 / page</SelectItem>
                  <SelectItem value="50">50 / page</SelectItem>
                  <SelectItem value="100">100 / page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtres avancés */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Type de permis
                  </label>
                  <Select
                    value={licenseTypeFilter}
                    onValueChange={setLicenseTypeFilter}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      {licenseTypes.map((type) => (
                        <SelectItem key={type} value={type as string}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(searchTerm || licenseTypeFilter !== "all") && (
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Réinitialiser
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Tableau moderne */}
        <Card className="overflow-hidden shadow-xl">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full">
              <thead className="bg-muted/40 text-left text-sm ">
                <tr>
                  <th className="p-4 font-semibold">Photo</th>
                  <th className="p-4 font-semibold">Nom</th>
                  <th className="p-4 font-semibold">Prénom</th>
                  <th className="p-4 font-semibold">Email / Téléphone</th>
                  <th className="p-4 font-semibold">N° Permis / Type</th>
                  <th className="p-4 font-semibold">Expiration</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {currentDrivers.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-muted/30 transition-colors duration-150"
                  >
                    {/* Photo */}
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-primary flex items-center justify-center text-primary-foreground font-semibold shadow-md">
                        {d.driverProfile?.image?.url ? (
                          <Image
                            height={40}
                            width={40}
                            src={d.driverProfile.image.url}
                            alt={`${d.prenom} ${d.nom}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          d.nom?.charAt(0).toUpperCase()
                        )}
                      </div>
                    </td>

                    {/* Nom */}
                    <td className="p-4 font-medium text-foreground">{d.nom}</td>

                    {/* Prénom */}
                    <td className="p-4 text-muted-foreground">{d.prenom}</td>

                    {/* Email + Téléphone */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">
                          {d.email}
                        </span>
                        {d.phone && (
                          <span className="text-muted-foreground text-sm mt-1">
                            {d.phone}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* N° Permis + Type */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="px-3 py-1  text-card-foreground rounded-lg text-sm font-mono">
                          {d.driverProfile?.license?.licenseNumber || "—"} /{" "}
                          {d.driverProfile?.license?.licenseType && (
                            <span className="text-card-foreground text-sm mt-1">
                              {d.driverProfile.license.licenseType}
                            </span>
                          )}
                        </span>
                      </div>
                    </td>

                    {/* Date d’expiration */}
                    <td className="p-4">
                      {d.driverProfile?.license?.licenseExpiration ? (
                        <span className="text-muted-foreground text-sm">
                          {new Date(
                            d.driverProfile.license.licenseExpiration
                          ).toLocaleDateString("fr-FR")}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Message si vide */}
            {currentDrivers.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">
                  {searchTerm || licenseTypeFilter !== "all"
                    ? "Aucun chauffeur ne correspond aux critères de recherche"
                    : "Aucun chauffeur trouvé"}
                </p>
                {(searchTerm || licenseTypeFilter !== "all") && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-4"
                  >
                    Réinitialiser les filtres
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredDrivers.length > 0 && (
            <div className="px-6 py-4 border-t bg-muted/20">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Affichage de {startIndex + 1} à{" "}
                  {Math.min(endIndex, filteredDrivers.length)} sur{" "}
                  {filteredDrivers.length} chauffeur
                  {filteredDrivers.length > 1 ? "s" : ""}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        return (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        );
                      })
                      .map((page, idx, arr) => (
                        <div key={page} className="flex items-center">
                          {idx > 0 && arr[idx - 1] !== page - 1 && (
                            <span className="px-2 text-muted-foreground">
                              ...
                            </span>
                          )}
                          <Button
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-10 rounded-lg ${
                              currentPage === page
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : ""
                            }`}
                          >
                            {page}
                          </Button>
                        </div>
                      ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-lg"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        className="mt-16"
      />
    </div>
  );
}
