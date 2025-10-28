"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { z } from "zod";
import { uploadToCloudinary } from "@/app/actions/upload";
import { signUpAsDriver } from "@/app/actions/auth";

const schema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  phone: z.string().min(8),
  licenseNumber: z.string().regex(/^[0-9]{12}$/),
  licenseType: z.enum(["A", "B", "C", "D", "E"]),
  licenseExpiration: z.string().min(1),
});

interface InviteData {
  email: string;
  companyId: string;
}

interface PersonalInfo {
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  password: string;
}

interface LicenseInfo {
  licenseNumber: string;
  licenseType: "A" | "B" | "C" | "D" | "E";
  licenseExpiration: string;
}

interface Photos {
  profilePhoto: File | null;
  licenseFront: File | null;
  licenseBack: File | null;
}

export default function DriverForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    password: "",
  });

  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo>({
    licenseNumber: "",
    licenseType: "A",
    licenseExpiration: "",
  });

  const [photos, setPhotos] = useState<Photos>({
    profilePhoto: null,
    licenseFront: null,
    licenseBack: null,
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        const res = await fetch("/api/invite/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data: InviteData & { error?: string } = await res.json();

        if (res.ok && data.email) {
          setInviteData(data);
          setPersonalInfo((prev) => ({ ...prev, email: data.email }));
        } else {
          setError(data.error ?? "Erreur lors de la vérification du token");
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Erreur inconnue lors de la vérification du token");
      }
    };

    verifyToken();
  }, [token]);

  const handlePersonalChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });

  const handleLicenseChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLicenseInfo({ ...licenseInfo, [e.target.name]: e.target.value });

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotos({ ...photos, [e.target.name]: e.target.files[0] });
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = schema.safeParse({ ...personalInfo, ...licenseInfo });
    if (!validation.success) {
      alert("Veuillez vérifier tous les champs avant de soumettre.");
      return;
    }

    try {
      // 1️⃣ Créer le FormData pour envoyer au serveur
      const formData = new FormData();
      formData.append("nom", personalInfo.nom);
      formData.append("prenom", personalInfo.prenom);
      formData.append("email", personalInfo.email);
      formData.append("phone", personalInfo.phone);
      formData.append("password", personalInfo.password);
      formData.append("licenseNumber", licenseInfo.licenseNumber);
      formData.append("licenseType", licenseInfo.licenseType);
      formData.append("licenseExpiration", licenseInfo.licenseExpiration);

      if (photos.profilePhoto) {
        const profileUrl = await uploadToCloudinary(
          new Uint8Array(await photos.profilePhoto.arrayBuffer()),
          "smart-ride/drivers"
        );
        formData.append("profilePhotoUrl", profileUrl);
      }

      if (photos.licenseFront) {
        const frontUrl = await uploadToCloudinary(
          new Uint8Array(await photos.licenseFront.arrayBuffer()),
          "smart-ride/drivers"
        );
        formData.append("licenseFrontUrl", frontUrl);
      }

      if (photos.licenseBack) {
        const backUrl = await uploadToCloudinary(
          new Uint8Array(await photos.licenseBack.arrayBuffer()),
          "smart-ride/drivers"
        );
        formData.append("licenseBackUrl", backUrl);
      }

      // 2️⃣ Appel de la server action
      const result = await signUpAsDriver(formData);

      if (result.status === "success") {
        alert("✅ Chauffeur créé avec succès !");
        router.push("/login");
        console.log("Utilisateur créé :", result.user);
      } else {
        alert("❌ " + result.status);
      }
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error)
        alert("❌ Erreur lors de la création du chauffeur : " + err.message);
      else alert("❌ Erreur inconnue lors de la création du chauffeur");
    }
  };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Erreur</CardTitle>
          </CardHeader>
          <CardContent>{error}</CardContent>
        </Card>
      </div>
    );

  if (!inviteData)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Vérification de linvitation...
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center py-8 bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Création du compte chauffeur</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <Label>Nom</Label>
                <Input
                  name="nom"
                  value={personalInfo.nom}
                  onChange={handlePersonalChange}
                  required
                />
                <Label>Prénom</Label>
                <Input
                  name="prenom"
                  value={personalInfo.prenom}
                  onChange={handlePersonalChange}
                  required
                />
                <Label>Email</Label>
                <Input value={personalInfo.email} readOnly />
                <Label>Téléphone</Label>
                <Input
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalChange}
                  required
                />
                <Label>Mot de passe</Label>
                <Input
                  name="password"
                  type="password"
                  value={personalInfo.password}
                  onChange={handlePersonalChange}
                  placeholder="Minimum 6 caractères"
                  required
                />
                <Button type="button" onClick={handleNext}>
                  Suivant
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Label>Numéro du permis</Label>
                <Input
                  name="licenseNumber"
                  value={licenseInfo.licenseNumber}
                  maxLength={12}
                  onChange={handleLicenseChange}
                  required
                />
                <Label>Type de permis</Label>
                <Select
                  value={licenseInfo.licenseType}
                  onValueChange={(v) =>
                    setLicenseInfo({
                      ...licenseInfo,
                      licenseType: v as LicenseInfo["licenseType"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="E">E</SelectItem>
                  </SelectContent>
                </Select>
                <Label>Date dexpiration</Label>
                <Input
                  name="licenseExpiration"
                  type="date"
                  value={licenseInfo.licenseExpiration}
                  onChange={handleLicenseChange}
                  required
                />
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                  >
                    Retour
                  </Button>
                  <Button type="button" onClick={handleNext}>
                    Suivant
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <Label>Photo personnelle</Label>
                <Input
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  required
                />
                <Label>Permis recto</Label>
                <Input
                  name="licenseFront"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  required
                />
                <Label>Permis verso</Label>
                <Input
                  name="licenseBack"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  required
                />
                <div className="flex justify-between">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleBack}
                  >
                    Retour
                  </Button>
                  <Button type="submit">Créer le compte</Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
