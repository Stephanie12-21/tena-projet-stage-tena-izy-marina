"use client";

import { useAuth } from "@/app/context/provider";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { useState } from "react";

import * as z from "zod";
import { updateParentProfile, updateParentPassword } from "@/app/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Check, Edit2, Mail, Phone, User, X, Lock } from "lucide-react";

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
      <div className="min-h-screen bg-background">
        {/* Header minimaliste */}
        <div className="border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {prenom} {nom}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">{email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal - Grid 2 colonnes */}
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card Informations personnelles */}
            <div className="bg-card rounded-lg border border-border">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-card-foreground">
                        Informations personnelles
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Gérez vos informations de contact
                      </p>
                    </div>
                  </div>
                  {!editInfo && (
                    <button
                      onClick={() => setEditInfo(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-md transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Modifier
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-5">
                  {/* Prénom */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Prénom
                    </label>
                    <input
                      disabled={!editInfo}
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Entrez votre prénom"
                      className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                  </div>

                  {/* Nom */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Nom
                    </label>
                    <input
                      disabled={!editInfo}
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Entrez votre nom"
                      className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      Email
                    </label>
                    <input
                      disabled={!editInfo}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@email.com"
                      className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                  </div>

                  {/* Téléphone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Phone className="w-3 h-3" />
                      Téléphone
                    </label>
                    <input
                      disabled={!editInfo}
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                </div>

                {editInfo && (
                  <div className="flex gap-2.5 mt-6 pt-5 border-t border-border">
                    <button
                      disabled={loadingInfo}
                      onClick={updateProfileHandler}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" />
                      {loadingInfo ? "Enregistrement..." : "Enregistrer"}
                    </button>
                    <button
                      onClick={() => setEditInfo(false)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border hover:bg-muted text-foreground text-sm font-medium rounded-md transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Annuler
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Card Mot de passe */}
            <div className="bg-card rounded-lg border border-border">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-card-foreground">
                        Sécurité
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Modifiez votre mot de passe
                      </p>
                    </div>
                  </div>
                  {!editPass && (
                    <button
                      onClick={() => setEditPass(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-md transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Modifier
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {!editPass ? (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="text-sm">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Mot de passe
                      </p>
                      <p className="text-foreground">••••••••••••</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Mot de passe actuel */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe actuel"
                        className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Nouveau mot de passe */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Entrez votre nouveau mot de passe"
                        className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum 6 caractères
                      </p>
                    </div>

                    <div className="flex gap-2.5 pt-5 border-t border-border">
                      <button
                        disabled={loadingPass}
                        onClick={updatePasswordHandler}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check className="w-4 h-4" />
                        {loadingPass ? "Mise à jour..." : "Changer"}
                      </button>
                      <button
                        onClick={() => {
                          setEditPass(false);
                          setPassword("");
                          setNewPassword("");
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border hover:bg-muted text-foreground text-sm font-medium rounded-md transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Annuler
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </ProtectedRoute>
  );
}
