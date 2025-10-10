"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "../../../../generated/prisma";

interface ParentFormProps {
  formData: Partial<User> & { password?: string; confirmPassword?: string };
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
}

export default function ParentForm({
  formData,
  errors,
  handleInputChange,
  handleNext,
}: ParentFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Informations du parent</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="prenom">Prénom</Label>
          <Input
            id="prenom"
            name="prenom"
            type="text"
            value={formData.prenom || ""}
            onChange={handleInputChange}
            placeholder="Votre prénom"
            required
          />
          {errors.prenom && (
            <p className="text-red-500 text-sm">{errors.prenom}</p>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="nom">Nom</Label>
          <Input
            id="nom"
            name="nom"
            type="text"
            value={formData.nom || ""}
            onChange={handleInputChange}
            placeholder="Votre nom"
            required
          />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={handleInputChange}
          placeholder="exemple@smartride.com"
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone || ""}
          onChange={handleInputChange}
          placeholder="+33 6 12 34 56 78"
          required
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <Button type="button" onClick={handleNext} className="w-full">
        Suivant
      </Button>
    </div>
  );
}
