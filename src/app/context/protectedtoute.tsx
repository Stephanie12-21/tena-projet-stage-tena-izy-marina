import { ReactNode } from "react";
import { useAuth } from "./provider";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Vous devez vous connecter pour accéder à cette page.</p>;

  return <>{children}</>;
}
