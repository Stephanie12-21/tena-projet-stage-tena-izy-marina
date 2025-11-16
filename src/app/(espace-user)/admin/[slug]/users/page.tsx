"use client";

import React, { useEffect, useState } from "react";
import { Users, Mail, Phone, Search, UserCircle, Filter } from "lucide-react";
import { User } from "@/lib/types/user-interface";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        const mergedUsers = [
          ...(data.admins || []),
          ...(data.parents || []),
          ...(data.drivers || []),
        ];

        setUsers(mergedUsers);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleLabel = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "Administrateur";
      case "parent":
        return "Parent";
      case "driver":
        return "Chauffeur";
      default:
        return role;
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "all" ||
      user.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Chargement des utilisateurs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête minimaliste */}
        <div className="mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-muted">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Gestion des utilisateurs
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Vue d&apos;ensemble de tous les utilisateurs de la plateforme
              </p>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-card rounded-lg border border-border p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground " />
              <Input
                type="text"
                placeholder="Rechercher par nom, prénom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg"
              />
            </div>

            {/* Filtre par rôle */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground " />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="pl-10 pr-8 py-2.5">
                  <SelectValue placeholder="Tous les rôles" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Administrateurs</SelectItem>
                  <SelectItem value="parent">Parents</SelectItem>
                  <SelectItem value="driver">Chauffeurs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredUsers.length !== users.length && (
            <div className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {filteredUsers.length}
              </span>{" "}
              résultat(s) trouvé(s)
            </div>
          )}
        </div>

        {/* Tableau minimaliste */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                    Date d&apos;inscription
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-muted p-2.5 rounded-full mr-3">
                          <UserCircle className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {user.prenom} {user.nom}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {user.id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-foreground">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center text-sm text-foreground">
                            <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium border bg-blue-500/20 text-blue-500 border-blue-500/30">
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-medium">
                Aucun utilisateur trouvé
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
