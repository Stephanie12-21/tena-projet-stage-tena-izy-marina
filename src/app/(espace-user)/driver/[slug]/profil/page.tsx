"use client";

import { useAuth } from "@/app/context/provider";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
  updateParentProfile,
  updateParentPassword,
  updateDriverProfile,
} from "@/app/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadToCloudinary } from "@/app/actions/upload";

// 🔹 Validation Zod
const profileSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^\+?[0-9\s]{7,15}$/, "Numéro de téléphone invalide"),
});

const licenseSchema = z.object({
  licenseNumber: z.string().min(1, "Le numéro de permis est requis"),
  licenseType: z.enum(["A", "B", "C", "D", "E"]),
  licenseExpiration: z.string().min(1, "La date d'expiration est requise"),
});

// 🔹 Type helper
type DbUserWithDriver = {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  role: "PARENT" | "DRIVER" | "ADMIN";
  driverProfile?: {
    profilePhotoUrl?: string;
    license?: {
      licenseNumber: string;
      licenseType: "A" | "B" | "C" | "D" | "E";
      licenseExpiration: string;
      photoFront?: string;
      photoBack?: string;
    };
  };
};
interface LicenseInfo {
  licenseNumber: string;
  licenseType: "A" | "B" | "C" | "D" | "E";
  licenseExpiration: string;
}

export default function ProfilParent() {
  const { dbUser: rawDbUser } = useAuth();
  const dbUser = rawDbUser as DbUserWithDriver | null;

  // 🔹 Infos personnelles
  const [nom, setNom] = useState(dbUser?.nom || "");
  const [prenom, setPrenom] = useState(dbUser?.prenom || "");
  const [email, setEmail] = useState(dbUser?.email || "");
  const [phone, setPhone] = useState(dbUser?.phone || "");
  const [editInfo, setEditInfo] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);

  // 🔹 Chauffeur : Permis et photos
  const [licenseNumber, setLicenseNumber] = useState(
    dbUser?.driverProfile?.license?.licenseNumber || ""
  );
  const [licenseType, setLicenseType] = useState<"A" | "B" | "C" | "D" | "E">(
    dbUser?.driverProfile?.license?.licenseType || "B"
  );
  const [licenseExpiration, setLicenseExpiration] = useState(
    dbUser?.driverProfile?.license?.licenseExpiration
      ? new Date(dbUser.driverProfile.license.licenseExpiration)
          .toISOString()
          .split("T")[0]
      : ""
  );
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [licenseFront, setLicenseFront] = useState<File | null>(null);
  const [licenseBack, setLicenseBack] = useState<File | null>(null);
  const [editLicense, setEditLicense] = useState(false);
  const [loadingLicense, setLoadingLicense] = useState(false);

  // 🔹 Mot de passe
  const [editPass, setEditPass] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  // 🔹 Handlers
  const updateProfileHandler = async () => {
    setLoadingInfo(true);
    const parsed = profileSchema.safeParse({ nom, prenom, email, phone });
    if (!parsed.success) {
      toast.error(parsed.error.issues.map((i) => i.message).join(", "));
      setLoadingInfo(false);
      return;
    }
    try {
      const res = await updateParentProfile({ nom, prenom, email, phone });
      toast[res.success ? "success" : "error"](res.message);
      setEditInfo(res.success ? false : editInfo);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setLoadingInfo(false);
    }
  };

  const updateLicenseHandler = async () => {
    if (!dbUser?.id) return;
    setLoadingLicense(true);

    const parsed = licenseSchema.safeParse({
      licenseNumber,
      licenseType,
      licenseExpiration,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues.map((i) => i.message).join(", "));
      setLoadingLicense(false);
      return;
    }

    try {
      // 🔹 Upload images si présentes
      const uploadedProfilePhoto = profilePhoto
        ? await uploadToCloudinary(
            new Uint8Array(await profilePhoto.arrayBuffer()),
            "smart-ride/drivers"
          )
        : undefined;
      const uploadedFront = licenseFront
        ? await uploadToCloudinary(
            new Uint8Array(await licenseFront.arrayBuffer()),
            "smart-ride/drivers"
          )
        : undefined;
      const uploadedBack = licenseBack
        ? await uploadToCloudinary(
            new Uint8Array(await licenseBack.arrayBuffer()),
            "smart-ride/drivers"
          )
        : undefined;

      const res = await updateDriverProfile({
        userId: dbUser.id,
        licenseNumber,
        licenseType,
        licenseExpiration,
        profilePhotoUrl: uploadedProfilePhoto,
        licenseFrontUrl: uploadedFront,
        licenseBackUrl: uploadedBack,
      });

      toast[res.success ? "success" : "error"](res.message);
      setEditLicense(res.success ? false : editLicense);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setLoadingLicense(false);
    }
  };

  const updatePasswordHandler = async () => {
    if (!dbUser?.email) return;
    setLoadingPass(true);
    try {
      const res = await updateParentPassword({
        email: dbUser.email,
        password,
        newPassword,
      });
      toast[res.success ? "success" : "error"](res.message);
      if (res.success) {
        setEditPass(false);
        setPassword("");
        setNewPassword("");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setLoadingPass(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold mb-4">Mon Profil</h1>

        {/* Infos personnelles */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Informations personnelles</CardTitle>
            {!editInfo && (
              <Button variant="outline" onClick={() => setEditInfo(true)}>
                Modifier
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              disabled={!editInfo}
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom"
            />
            <Input
              disabled={!editInfo}
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Prénom"
            />
            <Input
              disabled={!editInfo}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              disabled={!editInfo}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Téléphone"
            />
            {editInfo && (
              <div className="flex gap-2">
                <Button disabled={loadingInfo} onClick={updateProfileHandler}>
                  {loadingInfo ? "Mise à jour..." : "Sauvegarder"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setEditInfo(false)}
                >
                  Annuler
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Permis et photos chauffeur */}
        {dbUser?.role === "DRIVER" && (
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Permis et Photos</CardTitle>
              {!editLicense && (
                <Button variant="outline" onClick={() => setEditLicense(true)}>
                  Modifier
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                disabled={!editLicense}
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="Numéro de permis"
              />
              <select
                disabled={!editLicense}
                value={licenseType}
                onChange={(e) =>
                  setLicenseType(e.target.value as LicenseInfo["licenseType"])
                }
                className="border rounded p-2 w-full"
              >
                {["A", "B", "C", "D", "E"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <Input
                disabled={!editLicense}
                type="date"
                value={licenseExpiration}
                onChange={(e) => setLicenseExpiration(e.target.value)}
              />

              <div className="flex flex-col gap-2">
                <label>Photo de profil :</label>
                <Input
                  type="file"
                  disabled={!editLicense}
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    e.target.files && setProfilePhoto(e.target.files[0])
                  }
                />
                <label>Permis recto :</label>
                <Input
                  type="file"
                  disabled={!editLicense}
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    e.target.files && setLicenseFront(e.target.files[0])
                  }
                />
                <label>Permis verso :</label>
                <Input
                  type="file"
                  disabled={!editLicense}
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    e.target.files && setLicenseBack(e.target.files[0])
                  }
                />
              </div>

              {editLicense && (
                <div className="flex gap-2">
                  <Button
                    disabled={loadingLicense}
                    onClick={updateLicenseHandler}
                  >
                    {loadingLicense ? "Mise à jour..." : "Sauvegarder"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setEditLicense(false)}
                  >
                    Annuler
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Mot de passe */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Mot de passe</CardTitle>
            {!editPass && (
              <Button variant="outline" onClick={() => setEditPass(true)}>
                Modifier
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {editPass && (
              <>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe actuel"
                />
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                />
                <div className="flex gap-2">
                  <Button
                    disabled={loadingPass}
                    onClick={updatePasswordHandler}
                  >
                    {loadingPass ? "Mise à jour..." : "Changer"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setEditPass(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </ProtectedRoute>
  );
}
