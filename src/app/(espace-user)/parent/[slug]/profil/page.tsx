"use client";

import { useAuth } from "@/app/context/provider";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { updateParentProfile, updateParentPassword } from "@/app/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation Zod pour infos personnelles
const profileSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^\+?[0-9\s]{7,15}$/, "Numéro de téléphone invalide"),
});

// Validation Zod pour mot de passe
const passwordSchema = z.object({
  password: z.string().min(6, "Le mot de passe actuel est requis"),
  newPassword: z
    .string()
    .min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères"),
});

export default function ProfilParent() {
  const { dbUser } = useAuth();

  // Infos personnelles
  const [nom, setNom] = useState(dbUser?.nom || "");
  const [prenom, setPrenom] = useState(dbUser?.prenom || "");
  const [email, setEmail] = useState(dbUser?.email || "");
  const [phone, setPhone] = useState(dbUser?.phone || "");
  const [editInfo, setEditInfo] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);

  // Mot de passe
  const [editPass, setEditPass] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  // 🔹 Mettre à jour le profil
  const updateProfileHandler = async () => {
    setLoadingInfo(true);

    const parsed = profileSchema.safeParse({ nom, prenom, email, phone });
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(", ");
      toast.error(msg);
      setLoadingInfo(false);
      return;
    }

    try {
      const res = await updateParentProfile({ nom, prenom, email, phone });
      if (res.success) {
        toast.success(res.message);
        setEditInfo(false);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Erreur serveur";
      toast.error(msg);
    } finally {
      setLoadingInfo(false);
    }
  };

  // 🔹 Mettre à jour le mot de passe
  const updatePasswordHandler = async () => {
    setLoadingPass(true);

    const parsed = passwordSchema.safeParse({ password, newPassword });
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(", ");
      toast.error(msg);
      setLoadingPass(false);
      return;
    }

    try {
      const res = await updateParentPassword({
        email: dbUser?.email || "",
        password,
        newPassword,
      });
      if (res.success) {
        toast.success(res.message);
        setEditPass(false);
        setPassword("");
        setNewPassword("");
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Erreur serveur";
      toast.error(msg);
    } finally {
      setLoadingPass(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold mb-4">Mon Profil</h1>

        {/* ---- Infos personnelles ---- */}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNom(e.target.value)
              }
              placeholder="Nom"
            />
            <Input
              disabled={!editInfo}
              value={prenom}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPrenom(e.target.value)
              }
              placeholder="Prénom"
            />
            <Input
              disabled={!editInfo}
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Email"
            />
            <Input
              disabled={!editInfo}
              type="tel"
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
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

        {/* ---- Mot de passe ---- */}
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Mot de passe actuel"
                />
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewPassword(e.target.value)
                  }
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
