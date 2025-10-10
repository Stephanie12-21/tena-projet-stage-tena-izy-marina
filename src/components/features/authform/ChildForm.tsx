"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Children } from "../../../../generated/prisma";

export type SignUpFormData = Partial<Children> & {
  prenomParent?: string;
  nomParent?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  prenomEnfant?: string;
  nomEnfant?: string;
  adresse?: string;
  homeLat?: number;
  homeLong?: number;
};

interface GeoapifyFeature {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
  };
}

interface ChildrenFormProps {
  formData: SignUpFormData;
  errors: Record<string, string>;
  handleNext: () => void;
  handleBack: () => void;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
}

export default function ChildrenForm({
  formData,
  errors,
  handleNext,
  handleBack,
  setFormData,
}: ChildrenFormProps) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [suggestions, setSuggestions] = useState<
    { formatted: string; lat: number; lon: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=5&apiKey=${apiKey}`
      );

      const data: { features: GeoapifyFeature[] } = await res.json();

      if (data.features && data.features.length > 0) {
        const list = data.features.map((f) => ({
          formatted: f.properties.formatted,
          lat: f.properties.lat,
          lon: f.properties.lon,
        }));
        setSuggestions(list);
      }
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des suggestions Geoapify:",
        err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, adresse: value }));

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 500);
  };

  const handleSelectSuggestion = (s: {
    formatted: string;
    lat: number;
    lon: number;
  }) => {
    setFormData((prev) => ({
      ...prev,
      adresse: s.formatted,
      homeLat: s.lat,
      homeLong: s.lon,
    }));
    setSuggestions([]);
    console.log("✅ Adresse sélectionnée :", s.formatted);
    console.log("📍 Coordonnées :", s.lat, s.lon);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4 relative">
      <h2 className="text-xl font-semibold">Informations de l&apos;enfant</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="prenomEnfant">Prénom</Label>
          <Input
            id="prenomEnfant"
            name="prenomEnfant"
            type="text"
            value={formData.prenomEnfant || ""}
            onChange={handleInputChange}
            placeholder="Prénom de l'enfant"
            required
          />
          {errors.prenomEnfant && (
            <p className="text-red-500 text-sm">{errors.prenomEnfant}</p>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="nomEnfant">Nom</Label>
          <Input
            id="nomEnfant"
            name="nomEnfant"
            type="text"
            value={formData.nomEnfant || ""}
            onChange={handleInputChange}
            placeholder="Nom de l'enfant"
            required
          />
          {errors.nomEnfant && (
            <p className="text-red-500 text-sm">{errors.nomEnfant}</p>
          )}
        </div>
      </div>

      <div className="space-y-2 relative">
        <Label htmlFor="adresse">Adresse</Label>
        <Input
          id="adresse"
          name="adresse"
          type="text"
          value={formData.adresse || ""}
          onChange={handleAddressChange}
          placeholder="Commencez à taper une adresse..."
          autoComplete="off"
          required
        />

        {suggestions.length > 0 && (
          <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSelectSuggestion(s)}
                className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {s.formatted}
              </li>
            ))}
          </ul>
        )}

        {isLoading && (
          <p className="text-gray-400 text-sm mt-1">Chargement...</p>
        )}
        {errors.adresse && (
          <p className="text-red-500 text-sm">{errors.adresse}</p>
        )}
      </div>

      {/* --- Affichage des coordonnées dynamiques --- */}
      {formData.homeLat && formData.homeLong && (
        <div className="text-sm text-gray-700">
          <p>Latitude : {formData.homeLat}</p>
          <p>Longitude : {formData.homeLong}</p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button type="button" onClick={handleBack} variant="outline">
          Retour
        </Button>
        <Button type="button" onClick={handleNext}>
          Suivant
        </Button>
      </div>
    </div>
  );
}
