"use client";

import { useAuth } from "@/app/context/provider";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { updateParentProfile } from "@/app/actions/auth";

// Validation Zod pour les infos personnelles
const profileSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^\+?[0-9\s]{7,15}$/, "Numéro de téléphone invalide"),
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
  const [messageInfo, setMessageInfo] = useState("");

  // Mot de passe
  const [editPass, setEditPass] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);
  const [messagePass, setMessagePass] = useState("");

  // 🔹 Mettre à jour toutes les données personnelles
  const updateProfile = async () => {
    setMessageInfo("");
    setLoadingInfo(true);

    // Validation Zod
    const parsed = profileSchema.safeParse({ nom, prenom, email, phone });
    if (!parsed.success) {
      // Construction d'un message d'erreur concaténé
      const msg = parsed.error.issues.map((issue) => issue.message).join(", ");
      setMessageInfo(msg);
      setLoadingInfo(false);
      return;
    }

    try {
      const res = await updateParentProfile({ nom, prenom, email, phone });

      setLoadingInfo(false);
      setMessageInfo(res.message);
      if (res.success) setEditInfo(false);
    } catch (error: unknown) {
      setLoadingInfo(false);
      if (error instanceof Error) {
        setMessageInfo(error.message);
      } else {
        setMessageInfo("Erreur lors de la mise à jour du profil.");
      }
    }
  };

  const updatePassword = async () => {
    setLoadingPass(true);
    setMessagePass("");

    try {
      const res = await fetch("/api/parent/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, newPassword }),
      });

      const data = await res.json();
      setLoadingPass(false);
      setMessagePass(data.message);
      if (data.success) setEditPass(false);
      setPassword("");
      setNewPassword("");
    } catch (error: unknown) {
      setLoadingPass(false);
      if (error instanceof Error) {
        setMessagePass(error.message);
      } else {
        setMessagePass("Erreur lors du changement de mot de passe.");
      }
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
              value={phone}
              type="tel"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              placeholder="Téléphone"
            />
            {editInfo && (
              <div className="flex gap-2">
                <Button disabled={loadingInfo} onClick={updateProfile}>
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
            {messageInfo && <p className="text-red-500">{messageInfo}</p>}
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
                  <Button disabled={loadingPass} onClick={updatePassword}>
                    {loadingPass ? "Mise à jour..." : "Changer"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setEditPass(false)}
                  >
                    Annuler
                  </Button>
                </div>
                {messagePass && <p className="text-red-500">{messagePass}</p>}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
// "use client";

// import { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ProtectedRoute } from "@/app/context/protectedtoute";
// import { useAuth } from "@/app/context/provider";
// import z from "zod";
// import { updateParentProfile } from "@/app/actions/auth";
// import ParentForm from "@/components/features/authform/ParentForm";

// // Validation Zod
// const parentSchema = z.object({
//   prenom: z.string().min(1, "Le prénom est requis"),
//   nom: z.string().min(1, "Le nom est requis"),
//   email: z.string().email("Email invalide"),
//   phone: z.string().regex(/^\+?[0-9\s]{7,15}$/, "Numéro de téléphone invalide"),
// });

// export default function ProfilParentWrapper() {
//   const { dbUser } = useAuth();
//   const [formData, setFormData] = useState({
//     prenom: dbUser?.prenom || "",
//     nom: dbUser?.nom || "",
//     email: dbUser?.email || "",
//     phone: dbUser?.phone || "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNext = async () => {
//     setLoading(true);
//     setErrors({});

//     // ✅ Validation Zod côté client
//     const result = parentSchema.safeParse(formData);
//     if (!result.success) {
//       const fieldErrors: Record<string, string> = {};
//       result.error.issues.forEach((issue) => {
//         if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
//       });
//       setErrors(fieldErrors);
//       toast.error("Certains champs sont invalides. Vérifie le formulaire.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // ✅ Appel du server action
//       const res = await updateParentProfile({
//         nom: formData.nom,
//         prenom: formData.prenom,
//         email: formData.email,
//         phone: formData.phone,
//       });

//       if (res.success) {
//         toast.success(res.message);
//       } else {
//         toast.error(res.message);
//       }
//     } catch (error: unknown) {
//       const msg = error instanceof Error ? error.message : "Erreur serveur";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="max-w-2xl mx-auto p-6">
//         <h1 className="text-2xl font-semibold mb-4">Mon Profil</h1>
//         <ParentForm
//           formData={formData}
//           errors={errors}
//           handleInputChange={handleInputChange}
//           handleNext={handleNext}
//         />
//       </div>
//     </ProtectedRoute>
//   );
// }
