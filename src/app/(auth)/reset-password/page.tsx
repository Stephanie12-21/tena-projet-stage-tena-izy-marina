"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Prêt pour la réinitialisation du mot de passe");
      }
    });
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return setMessage("Veuillez saisir un mot de passe");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(`Erreur: ${error.message}`);
    } else {
      setMessage(
        "Mot de passe mis à jour avec succès ! Vous pouvez maintenant vous connecter."
      );
    }
  };

  return (
    <div>
      <h1>Réinitialisation du mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Changer le mot de passe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
