"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { Users } from "../../../generated/prisma";

interface AuthContextType {
  user: User | null;
  dbUser: Users | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const supabase = createClient();

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Récupération Supabase + Prisma
  useEffect(() => {
    async function fetchUserData() {
      const { data } = await supabase.auth.getUser();
      const supaUser = data?.user || null;
      setUser(supaUser);

      if (supaUser?.id) {
        try {
          const res = await fetch(`/api/users/${supaUser.id}`);
          if (res.ok) {
            const prismaData = await res.json();
            setDbUser(prismaData);
          }
        } catch (err) {
          console.error("Erreur lors de la récupération Prisma :", err);
        }
      }

      setLoading(false);
    }

    fetchUserData();

    // 🔸 Écoute les changements de session
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetch(`/api/users/${session.user.id}`)
            .then((res) => res.json())
            .then((data) => setDbUser(data))
            .catch(console.error);
        } else {
          setDbUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fonctions login / logout
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(data.user);

    // 🔹 Charge les données Prisma après login
    if (data.user?.id) {
      const res = await fetch(`/api/users/${data.user.id}`);
      if (res.ok) setDbUser(await res.json());
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDbUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
