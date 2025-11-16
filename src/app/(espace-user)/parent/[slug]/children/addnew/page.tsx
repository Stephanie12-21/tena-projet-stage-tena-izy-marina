"use client";

import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadToCloudinary } from "@/app/actions/upload";
import { createChild } from "@/app/actions/children";
import { useAuth } from "@/app/context/provider";
import { Home, School, Clock, Upload } from "lucide-react";

interface GeoapifyFeature {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
  };
}

type Suggestion = { formatted: string; lat: number; lon: number };

interface FormData {
  prenomEnfant: string;
  nomEnfant: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  schoolName: string;
  schoolAddress: string;
  schoolLat: number;
  schoolLong: number;
  file: File | null;
  arrivalTime: string;
  departureTime: string;
}

export default function CreateChildPage() {
  const router = useRouter();
  const { user } = useAuth();
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY ?? "";

  const [formData, setFormData] = useState<FormData>({
    prenomEnfant: "",
    nomEnfant: "",
    adresse: "",
    homeLat: 0,
    homeLong: 0,
    schoolName: "",
    schoolAddress: "",
    schoolLat: 0,
    schoolLong: 0,
    file: null,
    arrivalTime: "",
    departureTime: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [childSuggestions, setChildSuggestions] = useState<Suggestion[]>([]);
  const [schoolSuggestions, setSchoolSuggestions] = useState<Suggestion[]>([]);
  const [saving, setSaving] = useState(false);

  const debounceRefChild = useRef<NodeJS.Timeout | null>(null);
  const debounceRefSchool = useRef<NodeJS.Timeout | null>(null);

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fetchSuggestions = async (
    query: string,
    setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>
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

  const handleSelectChildSuggestion = (s: Suggestion) => {
    handleChange("adresse", s.formatted);
    handleChange("homeLat", s.lat);
    handleChange("homeLong", s.lon);
    setChildSuggestions([]);
  };

  const handleSchoolAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleChange("schoolAddress", value);
    if (debounceRefSchool.current) clearTimeout(debounceRefSchool.current);
    debounceRefSchool.current = setTimeout(
      () => fetchSuggestions(value, setSchoolSuggestions),
      500
    );
  };

  const handleSelectSchoolSuggestion = (s: Suggestion) => {
    handleChange("schoolAddress", s.formatted);
    handleChange("schoolLat", s.lat);
    handleChange("schoolLong", s.lon);
    setSchoolSuggestions([]);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleChange("file", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("Parent non connecté !");
      return;
    }

    const requiredFields: (keyof FormData)[] = [
      "prenomEnfant",
      "nomEnfant",
      "adresse",
      "schoolName",
      "schoolAddress",
      "file",
    ];

    for (const f of requiredFields) {
      if (!formData[f]) {
        toast.warning("Remplis tous les champs requis !");
        return;
      }
    }

    setSaving(true);
    try {
      const arrayBuffer = await formData.file!.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const uploadedUrl = await uploadToCloudinary(uint8Array);
      if (!uploadedUrl) throw new Error("Échec de l'upload");

      await createChild({
        prenomEnfant: formData.prenomEnfant,
        nomEnfant: formData.nomEnfant,
        adresse: formData.adresse,
        homeLat: formData.homeLat,
        homeLong: formData.homeLong,
        photoUrl: uploadedUrl,
        parentId: user.id,
        schoolName: formData.schoolName,
        schoolAddress: formData.schoolAddress,
        schoolLat: formData.schoolLat,
        schoolLong: formData.schoolLong,
        arrivalTime: formData.arrivalTime,
        departureTime: formData.departureTime,
      });

      toast.success("Enfant créé avec succès !");
      setTimeout(() => router.back(), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création de l'enfant.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Ajouter un enfant
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Remplissez les informations de l&apos;enfant
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
                        value={formData.prenomEnfant}
                        onChange={(e) =>
                          handleChange("prenomEnfant", e.target.value)
                        }
                        className="mt-1.5"
                        placeholder="Jean"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Nom *
                      </Label>
                      <Input
                        value={formData.nomEnfant}
                        onChange={(e) =>
                          handleChange("nomEnfant", e.target.value)
                        }
                        className="mt-1.5"
                        placeholder="Dupont"
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
                      value={formData.adresse}
                      onChange={handleChildAddressChange}
                      autoComplete="off"
                      className="mt-1.5"
                      placeholder="12 rue de la Paix, Paris"
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
                        value={formData.schoolName}
                        onChange={(e) =>
                          handleChange("schoolName", e.target.value)
                        }
                        className="mt-1.5"
                        placeholder="École primaire Jean Moulin"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Label className="text-sm text-muted-foreground">
                        Adresse *
                      </Label>
                      <Input
                        value={formData.schoolAddress}
                        onChange={handleSchoolAddressChange}
                        autoComplete="off"
                        className="mt-1.5"
                        placeholder="45 avenue des Écoles, Paris"
                        required
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
                        value={formData.arrivalTime}
                        onChange={(e) =>
                          handleChange("arrivalTime", e.target.value)
                        }
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Départ de l&apos;école *
                      </Label>
                      <Input
                        type="time"
                        value={formData.departureTime}
                        onChange={(e) =>
                          handleChange("departureTime", e.target.value)
                        }
                        className="mt-1.5"
                        required
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
              {saving ? "Création en cours..." : "Créer l'enfant"}
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
