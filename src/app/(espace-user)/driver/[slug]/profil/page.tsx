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
import { User, Edit2, Save, X, Lock, FileText, Shield } from "lucide-react";
import Image from "next/image";

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
    image?: {
      url: string;
    };
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
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header simplifié */}
          <div className="flex items-center gap-4 pb-6 border-b">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {dbUser?.prenom?.[0]?.toUpperCase() || "U"}
              </div>
              {dbUser?.role === "DRIVER" &&
                dbUser?.driverProfile?.image?.url && (
                  <Image
                    height={80}
                    width={80}
                    src={dbUser.driverProfile.image.url}
                    alt="Profile"
                    className="absolute inset-0 w-20 h-20 rounded-full object-cover"
                  />
                )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {dbUser?.prenom} {dbUser?.nom}
              </h1>
              <p className="text-muted-foreground">{dbUser?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Infos personnelles */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                        <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <CardTitle>Informations personnelles</CardTitle>
                    </div>
                    {!editInfo && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditInfo(true)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Prénom</label>
                      <Input
                        disabled={!editInfo}
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom</label>
                      <Input
                        disabled={!editInfo}
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      disabled={!editInfo}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Téléphone</label>
                    <Input
                      disabled={!editInfo}
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  {editInfo && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        disabled={loadingInfo}
                        onClick={updateProfileHandler}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {loadingInfo ? "Mise à jour..." : "Sauvegarder"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditInfo(false)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Permis chauffeur */}
              {dbUser?.role === "DRIVER" && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle>Informations du permis</CardTitle>
                      </div>
                      {!editLicense && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditLicense(true)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Numéro de permis
                        </label>
                        <Input
                          disabled={!editLicense}
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Type</label>
                        <select
                          disabled={!editLicense}
                          value={licenseType}
                          onChange={(e) =>
                            setLicenseType(
                              e.target.value as LicenseInfo["licenseType"]
                            )
                          }
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {["A", "B", "C", "D", "E"].map((t) => (
                            <option key={t} value={t}>
                              Permis {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Date d&apos;expiration
                      </label>
                      <Input
                        disabled={!editLicense}
                        type="date"
                        value={licenseExpiration}
                        onChange={(e) => setLicenseExpiration(e.target.value)}
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Photo de profil
                        </label>
                        <Input
                          type="file"
                          disabled={!editLicense}
                          accept="image/*"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            e.target.files && setProfilePhoto(e.target.files[0])
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Permis recto
                        </label>
                        <Input
                          type="file"
                          disabled={!editLicense}
                          accept="image/*"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            e.target.files && setLicenseFront(e.target.files[0])
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Permis verso
                        </label>
                        <Input
                          type="file"
                          disabled={!editLicense}
                          accept="image/*"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            e.target.files && setLicenseBack(e.target.files[0])
                          }
                        />
                      </div>
                    </div>

                    {editLicense && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          disabled={loadingLicense}
                          onClick={updateLicenseHandler}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {loadingLicense ? "Mise à jour..." : "Sauvegarder"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditLicense(false)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Annuler
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Sécurité */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <CardTitle>Sécurité</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!editPass ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setEditPass(true)}
                    >
                      Changer le mot de passe
                    </Button>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Mot de passe actuel
                        </label>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Nouveau mot de passe
                        </label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          disabled={loadingPass}
                          onClick={updatePasswordHandler}
                          className="w-full bg-red-600 hover:bg-red-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {loadingPass ? "Mise à jour..." : "Confirmer"}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setEditPass(false)}
                          className="w-full"
                        >
                          Annuler
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Informations du compte */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <CardTitle>Compte</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Rôle</span>
                    <span className="font-medium">
                      {dbUser?.role === "DRIVER"
                        ? "Chauffeur"
                        : dbUser?.role === "PARENT"
                        ? "Parent"
                        : "Administrateur"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Statut</span>
                    <span className="text-green-600 font-medium">Actif</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </ProtectedRoute>
  );
}
