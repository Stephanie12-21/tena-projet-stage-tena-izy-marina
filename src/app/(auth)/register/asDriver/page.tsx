"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

export default function InvitationPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [inviteData, setInviteData] = useState<{
    email: string;
    companyId: string;
  } | null>(null);
  const [error, setError] = useState("");

  const [step, setStep] = useState(1);

  const [personalInfo, setPersonalInfo] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
  });
  const [licenseInfo, setLicenseInfo] = useState({
    licenseNumber: "",
    licenseType: "",
    licenseExpiration: "",
  });
  const [photos, setPhotos] = useState({
    profilePhoto: null as File | null,
    licenseFront: null as File | null,
    licenseBack: null as File | null,
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      const res = await fetch("/api/invite/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res.ok) setInviteData(data);
      else setError(data.error);
    };
    verifyToken();
  }, [token]);

  const handlePersonalChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  const handleLicenseChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLicenseInfo({ ...licenseInfo, [e.target.name]: e.target.value });
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      setPhotos({ ...photos, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(personalInfo).forEach(([k, v]) => formData.append(k, v));
    Object.entries(licenseInfo).forEach(([k, v]) => formData.append(k, v));
    if (photos.profilePhoto)
      formData.append("profilePhoto", photos.profilePhoto);
    if (photos.licenseFront)
      formData.append("licenseFront", photos.licenseFront);
    if (photos.licenseBack) formData.append("licenseBack", photos.licenseBack);

    const res = await fetch("/api/driver/create", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) alert("Profil chauffeur créé avec succès !");
    else alert(data.error || "Erreur lors de la création du profil");
  };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              Une erreur s&apos;est produite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
            </div>
          </CardContent>
        </Card>
      </div>
    );

  if (!inviteData)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 text-center">
            <p>Vérification de l&apos;invitation...</p>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Créer votre compte chauffeur
          </h1>
          <p>
            Invitation vérifiée pour : <strong>{inviteData.email}</strong>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold">
                Informations personnelles
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    name="nom"
                    value={personalInfo.nom}
                    onChange={handlePersonalChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    name="prenom"
                    value={personalInfo.prenom}
                    onChange={handlePersonalChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalChange}
                    required
                  />
                </div>
              </div>
              <Button type="button" onClick={() => setStep(2)}>
                Suivant
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold">Informations du permis</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="licenseNumber">Numéro de permis</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={licenseInfo.licenseNumber}
                    onChange={handleLicenseChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="licenseType">Type de permis</Label>
                  <Input
                    id="licenseType"
                    name="licenseType"
                    value={licenseInfo.licenseType}
                    onChange={handleLicenseChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="licenseExpiration">
                    Date d&apos;expiration
                  </Label>
                  <Input
                    id="licenseExpiration"
                    name="licenseExpiration"
                    type="date"
                    value={licenseInfo.licenseExpiration}
                    onChange={handleLicenseChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setStep(1)}
                >
                  Précédent
                </Button>
                <Button type="button" onClick={() => setStep(3)}>
                  Suivant
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold">Photos</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="profilePhoto">Photo personnelle</Label>
                  <Input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="licenseFront">Photo du permis (recto)</Label>
                  <Input
                    id="licenseFront"
                    name="licenseFront"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="licenseBack">Photo du permis (verso)</Label>
                  <Input
                    id="licenseBack"
                    name="licenseBack"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setStep(2)}
                >
                  Précédent
                </Button>
                <Button type="submit">Créer le compte</Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
