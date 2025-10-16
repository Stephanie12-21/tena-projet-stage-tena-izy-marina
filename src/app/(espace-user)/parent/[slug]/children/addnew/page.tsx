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
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [childSuggestions, setChildSuggestions] = useState<Suggestion[]>([]);
  const [schoolSuggestions, setSchoolSuggestions] = useState<Suggestion[]>([]);
  const [saving, setSaving] = useState(false);

  const debounceRefChild = useRef<NodeJS.Timeout | null>(null);
  const debounceRefSchool = useRef<NodeJS.Timeout | null>(null);

  // 🔹 Fonction générique pour modifier le state
  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🔹 Suggestions Geoapify
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
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6">Créer un nouvel enfant</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Prénom</Label>
            <Input
              value={formData.prenomEnfant}
              onChange={(e) => handleChange("prenomEnfant", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Nom</Label>
            <Input
              value={formData.nomEnfant}
              onChange={(e) => handleChange("nomEnfant", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Photo</Label>
            <Input type="file" accept="image/*" onChange={handlePhotoChange} />
            {preview && (
              <Image
                width={50}
                height={50}
                src={preview}
                alt="Aperçu"
                className="w-16 h-16 object-cover rounded-lg border shadow-sm"
              />
            )}
          </div>
          <div className="relative">
            <Label>Adresse enfant</Label>
            <Input
              value={formData.adresse}
              onChange={handleChildAddressChange}
              autoComplete="off"
              required
            />
            {childSuggestions.length > 0 && (
              <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto">
                {childSuggestions.map((s, i) => (
                  <li
                    key={i}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectChildSuggestion(s)}
                  >
                    {s.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <Label>Nom École</Label>
            <Input
              value={formData.schoolName}
              onChange={(e) => handleChange("schoolName", e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Label>Adresse École</Label>
            <Input
              value={formData.schoolAddress}
              onChange={handleSchoolAddressChange}
              autoComplete="off"
              required
            />
            {schoolSuggestions.length > 0 && (
              <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto">
                {schoolSuggestions.map((s, i) => (
                  <li
                    key={i}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectSchoolSuggestion(s)}
                  >
                    {s.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Création en cours..." : "Créer l'enfant"}
          </Button>
        </form>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
