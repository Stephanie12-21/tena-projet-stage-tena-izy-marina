"use client";

import { useEffect, useState, ChangeEvent, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChildWithRelations,
  UpdateChildInput,
} from "@/lib/types/user-interface";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadToCloudinary } from "@/app/actions/upload";
import { updateChild } from "@/app/actions/children";
import { Home, School, Clock, Upload } from "lucide-react";

interface GeoapifyFeature {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
  };
}

interface EditableChild extends ChildWithRelations {
  file?: File;
  arrivalTime: string;
  departureTime: string;
}

export default function EditChildPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [child, setChild] = useState<EditableChild | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [childSuggestions, setChildSuggestions] = useState<
    { formatted: string; lat: number; lon: number }[]
  >([]);
  const [schoolSuggestions, setSchoolSuggestions] = useState<
    { formatted: string; lat: number; lon: number }[]
  >([]);

  const debounceRefChild = useRef<NodeJS.Timeout | null>(null);
  const debounceRefSchool = useRef<NodeJS.Timeout | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

  useEffect(() => {
    if (!id) return;

    async function fetchChild() {
      try {
        const res = await fetch(`/api/children/${id}/info`);
        if (!res.ok) throw new Error("Erreur de chargement des données");

        const data: ChildWithRelations[] = await res.json();
        const childData = data[0] ?? null;
        setChild(childData);

        if (childData?.imageprofile?.url)
          setPreview(childData.imageprofile.url);
      } catch (err) {
        console.error(err);
        toast.error("Erreur lors du chargement de l'enfant.");
      } finally {
        setLoading(false);
      }
    }

    fetchChild();
  }, [id]);

  const handleChange = <K extends keyof ChildWithRelations>(
    field: K,
    value: ChildWithRelations[K]
  ) => {
    setChild((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const fetchSuggestions = async (
    query: string,
    setSuggestions: React.Dispatch<
      React.SetStateAction<{ formatted: string; lat: number; lon: number }[]>
    >
  ) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=5&apiKey=${apiKey}`
      );
      const data: { features: GeoapifyFeature[] } = await res.json();
      if (data.features?.length) {
        setSuggestions(
          data.features.map((f) => ({
            formatted: f.properties.formatted,
            lat: f.properties.lat,
            lon: f.properties.lon,
          }))
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la récupération des suggestions.");
    }
  };

  const handleChildAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleChange("adresse", value);

    if (debounceRefChild.current) clearTimeout(debounceRefChild.current);
    debounceRefChild.current = setTimeout(
      () => fetchSuggestions(value, setChildSuggestions),
      500
    );
  };

  const handleSelectChildSuggestion = (s: {
    formatted: string;
    lat: number;
    lon: number;
  }) => {
    handleChange("adresse", s.formatted);
    handleChange("homeLat", s.lat);
    handleChange("homeLong", s.lon);
    setChildSuggestions([]);
  };

  const handleSchoolAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChild((prev) =>
      prev ? { ...prev, school: { ...prev.school!, adresse: value } } : prev
    );

    if (debounceRefSchool.current) clearTimeout(debounceRefSchool.current);
    debounceRefSchool.current = setTimeout(
      () => fetchSuggestions(value, setSchoolSuggestions),
      500
    );
  };

  const handleSelectSchoolSuggestion = (s: {
    formatted: string;
    lat: number;
    lon: number;
  }) => {
    setChild((prev) =>
      prev
        ? {
            ...prev,
            school: {
              ...prev.school!,
              adresse: s.formatted,
              schoolLat: s.lat,
              schoolLong: s.lon,
            },
          }
        : prev
    );
    setSchoolSuggestions([]);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !child) return;

    setChild((prev) => (prev ? { ...prev, file } : prev));

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!child) {
      toast.error("Aucun enfant chargé !");
      return;
    }

    setSaving(true);

    try {
      let imageUrl = child.imageprofile?.url || "";
      const file = child.file;

      if (!file && !imageUrl) {
        toast.warning("Vous devez fournir une photo de l'enfant !");
        setSaving(false);
        return;
      }

      if (file) {
        toast.info("📤 Upload de la photo en cours...");
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const uploadedUrl = await uploadToCloudinary(uint8Array);

        if (!uploadedUrl) {
          toast.error("❌ Échec de l'upload de la photo.");
          setSaving(false);
          return;
        }

        imageUrl = uploadedUrl;
        toast.success("✅ Photo uploadée avec succès !");
      }

      const updatedData: UpdateChildInput = {
        id: child.id,
        prenom: child.prenom,
        nom: child.nom,
        adresse: child.adresse,
        homeLat: child.homeLat ?? 0,
        homeLong: child.homeLong ?? 0,
        schoolNom: child.school?.nom,
        schoolAdresse: child.school?.adresse,
        schoolLat: child.school?.schoolLat,
        schoolLong: child.school?.schoolLong,
        arrivalTime: child.arrivalTime,
        departureTime: child.departureTime,
        imageUrl,
      };

      toast.info("Mise à jour de l'enfant en cours...");
      await updateChild(updatedData);

      toast.success("✅ Enfant modifié avec succès !");
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (err) {
      console.error("❌ Erreur lors de la mise à jour :", err);
      toast.error("Une erreur est survenue pendant la mise à jour.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-8">Chargement...</p>;
  if (!child) return <p className="text-center py-8">Enfant introuvable.</p>;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Modifier l&apos;enfant
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Modifiez les informations de l&apos;enfant
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colonne gauche - Informations personnelles */}
            <Card className="p-6">
              <div className="space-y-6">
                {/* Photo de profil */}
                <div className="flex justify-center">
                  <div className="text-center">
                    {preview ? (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border mx-auto mb-3">
                        <Image
                          src={preview}
                          alt="Aperçu"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border mx-auto mb-3">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <Label className="cursor-pointer text-sm text-primary hover:underline">
                      {preview ? "Changer la photo" : "Ajouter une photo"}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </Label>
                  </div>
                </div>

                {/* Identité */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Informations personnelles
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Prénom *
                      </Label>
                      <Input
                        value={child.prenom}
                        onChange={(e) => handleChange("prenom", e.target.value)}
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Nom *
                      </Label>
                      <Input
                        value={child.nom}
                        onChange={(e) => handleChange("nom", e.target.value)}
                        className="mt-1.5"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Adresse domicile */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Domicile
                    </h3>
                  </div>
                  <div className="relative">
                    <Label className="text-sm text-muted-foreground">
                      Adresse *
                    </Label>
                    <Input
                      value={child.adresse}
                      onChange={handleChildAddressChange}
                      autoComplete="off"
                      className="mt-1.5"
                      required
                    />
                    {childSuggestions.length > 0 && (
                      <ul className="absolute z-20 w-full bg-card border border-border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                        {childSuggestions.map((s, i) => (
                          <li
                            key={i}
                            className="p-3 cursor-pointer hover:bg-muted transition-colors text-sm"
                            onClick={() => handleSelectChildSuggestion(s)}
                          >
                            {s.formatted}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Colonne droite - École et horaires */}
            <Card className="p-6">
              <div className="space-y-6">
                {/* École */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <School className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">
                      École
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Nom de l&apos;école *
                      </Label>
                      <Input
                        value={child.school?.nom || ""}
                        onChange={(e) =>
                          setChild((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  school: {
                                    ...prev.school!,
                                    nom: e.target.value,
                                  },
                                }
                              : prev
                          )
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div className="relative">
                      <Label className="text-sm text-muted-foreground">
                        Adresse *
                      </Label>
                      <Input
                        value={child.school?.adresse || ""}
                        onChange={handleSchoolAddressChange}
                        autoComplete="off"
                        className="mt-1.5"
                      />
                      {schoolSuggestions.length > 0 && (
                        <ul className="absolute z-20 w-full bg-card border border-border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                          {schoolSuggestions.map((s, i) => (
                            <li
                              key={i}
                              className="p-3 cursor-pointer hover:bg-muted transition-colors text-sm"
                              onClick={() => handleSelectSchoolSuggestion(s)}
                            >
                              {s.formatted}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Horaires */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Horaires
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Arrivée à l&apos;école *
                      </Label>
                      <Input
                        type="time"
                        value={child.arrivalTime || ""}
                        onChange={(e) =>
                          setChild((prev) =>
                            prev
                              ? { ...prev, arrivalTime: e.target.value }
                              : prev
                          )
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Départ de l&apos;école *
                      </Label>
                      <Input
                        type="time"
                        value={child.departureTime || ""}
                        onChange={(e) =>
                          setChild((prev) =>
                            prev
                              ? { ...prev, departureTime: e.target.value }
                              : prev
                          )
                        }
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions en bas */}
          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
              disabled={saving}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}
