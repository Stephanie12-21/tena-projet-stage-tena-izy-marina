"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SignUpFormData } from "@/lib/types/user-interface";

// ✅ Interface pour Geoapify
interface GeoapifyFeature {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
  };
}

// ✅ Props de composant
interface SchoolFormProps {
  formData: SignUpFormData;
  errors: Record<string, string>;
  handleNext: () => void;
  handleBack: () => void;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
}

export default function SchoolForm({
  formData,
  errors,
  handleNext,
  handleBack,
  setFormData,
}: SchoolFormProps) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [suggestions, setSuggestions] = useState<
    { formatted: string; lat: number; lon: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

  // ✅ Autocomplétion de l’adresse
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

      if (data.features?.length) {
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
    setFormData((prev) => ({ ...prev, schoolAddress: value }));

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
      schoolAddress: s.formatted,
      schoolLat: s.lat,
      schoolLong: s.lon,
    }));
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4 relative">
      <h2 className="text-xl font-semibold">Informations de l&apos;école</h2>

      {/* --- Nom de l'école --- */}
      <div className="space-y-2">
        <Label htmlFor="schoolName">Nom de l&apos;école</Label>
        <Input
          id="schoolName"
          name="schoolName"
          type="text"
          value={formData.schoolName || ""}
          onChange={handleInputChange}
          placeholder="Ex: École Saint Exupéry"
          required
        />
        {errors.schoolName && (
          <p className="text-red-500 text-sm">{errors.schoolName}</p>
        )}
      </div>

      {/* --- Adresse de l'école --- */}
      <div className="space-y-2 relative">
        <Label htmlFor="schoolAddress">Adresse de l&apos;école</Label>
        <Input
          id="schoolAddress"
          name="schoolAddress"
          type="text"
          value={formData.schoolAddress || ""}
          onChange={handleAddressChange}
          placeholder="Commencez à taper une adresse..."
          autoComplete="off"
          required
        />

        {/* Suggestions d'adresses */}
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
        {errors.schoolAddress && (
          <p className="text-red-500 text-sm">{errors.schoolAddress}</p>
        )}
      </div>

      {/* --- Coordonnées (lat/long) --- */}
      {formData.schoolLat && formData.schoolLong && (
        <div className="text-sm text-gray-700">
          <p>Latitude : {formData.schoolLat}</p>
          <p>Longitude : {formData.schoolLong}</p>
        </div>
      )}

      {/* --- Boutons navigation --- */}
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
