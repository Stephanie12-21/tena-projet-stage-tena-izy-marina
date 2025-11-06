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

interface GeoapifyFeature {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
  };
}
interface EditableChild extends ChildWithRelations {
  file?: File; // champ temporaire pour l'image locale
  arrivalTime: string; // ⬅️ ajouté
  departureTime: string; // ⬅️ ajouté
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
  const [isLoadingChildSuggestions, setIsLoadingChildSuggestions] =
    useState(false);
  const [isLoadingSchoolSuggestions, setIsLoadingSchoolSuggestions] =
    useState(false);

  const debounceRefChild = useRef<NodeJS.Timeout | null>(null);
  const debounceRefSchool = useRef<NodeJS.Timeout | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

  // 🔹 Charger les données de l’enfant
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

  //  Gérer les changements de champs texte
  const handleChange = <K extends keyof ChildWithRelations>(
    field: K,
    value: ChildWithRelations[K]
  ) => {
    setChild((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  //  Auto-suggestions d’adresses
  const fetchSuggestions = async (
    query: string,
    setSuggestions: React.Dispatch<
      React.SetStateAction<{ formatted: string; lat: number; lon: number }[]>
    >,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  //  Gestion adresse enfant
  const handleChildAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleChange("adresse", value);

    if (debounceRefChild.current) clearTimeout(debounceRefChild.current);
    debounceRefChild.current = setTimeout(
      () =>
        fetchSuggestions(
          value,
          setChildSuggestions,
          setIsLoadingChildSuggestions
        ),
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

  //  Gestion adresse école
  const handleSchoolAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChild((prev) =>
      prev ? { ...prev, school: { ...prev.school!, adresse: value } } : prev
    );

    if (debounceRefSchool.current) clearTimeout(debounceRefSchool.current);
    debounceRefSchool.current = setTimeout(
      () =>
        fetchSuggestions(
          value,
          setSchoolSuggestions,
          setIsLoadingSchoolSuggestions
        ),
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

  // Gestion de l'image
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !child) return;

    // ✅ ajoute le fichier dans le state typé
    setChild((prev) => (prev ? { ...prev, file } : prev));

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Fonction de modification
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("=== handleSubmit déclenché ===");

    if (!child) {
      toast.error("Aucun enfant chargé !");
      return;
    }

    setSaving(true);

    try {
      let imageUrl = child.imageprofile?.url || "";
      const file = child.file; // ✅ plus d'erreur ici

      if (!file && !imageUrl) {
        toast.warning("Vous devez fournir une photo de l'enfant !");
        setSaving(false);
        return;
      }

      // Upload si nouveau fichier
      if (file) {
        toast.info(" Upload de la photo en cours...");
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const uploadedUrl = await uploadToCloudinary(uint8Array);

        if (!uploadedUrl) {
          toast.error(" Échec de l'upload de la photo.");
          setSaving(false);
          return;
        }

        imageUrl = uploadedUrl;
        toast.success(" Photo uploadée avec succès !");
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

      toast.success("Enfant modifié avec succès !");
      setTimeout(() => {
        router.back();
      }, 3000);
    } catch (err) {
      console.error(" Erreur lors de la mise à jour :", err);
      toast.error("Une erreur est survenue pendant la mise à jour.");
    } finally {
      setSaving(false);
      console.log("=== handleSubmit terminé ===");
    }
  };

  // 🔹 Rendu du composant
  if (loading) return <p>Chargement...</p>;
  if (!child) return <p>Enfant introuvable.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6">Modifier l&apos;enfant</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Prénom */}
          <div>
            <Label>Prénom</Label>
            <Input
              value={child.prenom}
              onChange={(e) => handleChange("prenom", e.target.value)}
              required
            />
          </div>

          {/* Nom */}
          <div>
            <Label>Nom</Label>
            <Input
              value={child.nom}
              onChange={(e) => handleChange("nom", e.target.value)}
              required
            />
          </div>

          {/* Photo */}
          <div className="space-y-2">
            <Label>Photo de l&apos;enfant</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
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
          </div>

          {/* Adresse enfant */}
          <div className="relative">
            <Label>Adresse</Label>
            <Input
              value={child.adresse}
              onChange={handleChildAddressChange}
              autoComplete="off"
              required
            />
            {isLoadingChildSuggestions && (
              <div className="absolute top-10 right-2 text-gray-500 text-sm">
                Chargement...
              </div>
            )}
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

          {/* Coordonnées enfant */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Latitude</Label>
              <Input type="number" value={child.homeLat} disabled />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input type="number" value={child.homeLong} disabled />
            </div>
          </div>

          {/* École */}
          <div>
            <Label>Nom École</Label>
            <Input
              value={child.school?.nom || ""}
              onChange={(e) =>
                setChild((prev) =>
                  prev
                    ? {
                        ...prev,
                        school: { ...prev.school!, nom: e.target.value },
                      }
                    : prev
                )
              }
            />
            {isLoadingSchoolSuggestions && (
              <div className="absolute top-10 right-2 text-gray-500 text-sm">
                Chargement...
              </div>
            )}
          </div>

          {/* Adresse École */}
          <div className="relative">
            <Label>Adresse École</Label>
            <Input
              value={child.school?.adresse || ""}
              onChange={handleSchoolAddressChange}
              autoComplete="off"
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
          {/* Heure d'arrivée à l'école */}
          <div>
            <Label>Heure darrivée à lécole</Label>
            <Input
              type="time"
              value={child.arrivalTime || ""}
              onChange={(e) =>
                setChild((prev) =>
                  prev ? { ...prev, arrivalTime: e.target.value } : prev
                )
              }
            />
          </div>

          {/* Heure de départ de l'école */}
          <div>
            <Label>Heure de départ de lécole</Label>
            <Input
              type="time"
              value={child.departureTime || ""}
              onChange={(e) =>
                setChild((prev) =>
                  prev ? { ...prev, departureTime: e.target.value } : prev
                )
              }
            />
          </div>

          {/* Coordonnées école */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Latitude École</Label>
              <Input type="number" value={child.school?.schoolLat} disabled />
            </div>
            <div>
              <Label>Longitude École</Label>
              <Input type="number" value={child.school?.schoolLong} disabled />
            </div>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? "Enregistrement..." : "💾 Enregistrer"}
          </Button>
        </form>
      </Card>
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
      />{" "}
    </div>
  );
}
