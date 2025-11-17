"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignUpFormData } from "@/lib/types/user-interface";

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
  const [preview, setPreview] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

  // ----------- Suggestion d'adresse (Geoapify) -----------
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
      console.error("Erreur lors de la récupération des suggestions :", err);
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
  };

  // ----------- Input générique -----------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ----------- Photo enfant -----------
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photoEnfant: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 relative">
      <h2 className="text-xl font-semibold">Informations de l&apos;enfant</h2>

      {/* Photo */}
      <div className="space-y-2">
        <Label htmlFor="photoEnfant">Photo de l&apos;enfant</Label>
        <div className="flex items-center gap-4">
          <Input
            id="photoEnfant"
            name="photoEnfant"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="flex-1"
          />
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
        {errors.photoEnfant && (
          <p className="text-red-500 text-sm">{errors.photoEnfant}</p>
        )}
      </div>

      {/* Nom & prénom */}
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

      {/* Adresse */}
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

      {/* Coordonnées géo */}
      {/* {formData.homeLat && formData.homeLong && (
        <div className="text-sm text-gray-700">
          <p>Latitude : {formData.homeLat}</p>
          <p>Longitude : {formData.homeLong}</p>
        </div>
      )} */}

      {/* 🕓 Horaires */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="arrivalTime">
            Heure d&apos;arrivée à l&apos;école
          </Label>
          <Input
            id="arrivalTime"
            name="arrivalTime"
            type="time"
            value={formData.arrivalTime || ""}
            onChange={handleInputChange}
            required
          />
          {errors.arrivalTime && (
            <p className="text-red-500 text-sm">{errors.arrivalTime}</p>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="departureTime">Heure de sortie</Label>
          <Input
            id="departureTime"
            name="departureTime"
            type="time"
            value={formData.departureTime || ""}
            onChange={handleInputChange}
            required
          />
          {errors.departureTime && (
            <p className="text-red-500 text-sm">{errors.departureTime}</p>
          )}
        </div>
      </div>

      {/* Boutons navigation */}
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
