import { Children } from "../../../generated/prisma";

export type SignUpFormData = Partial<Children> & {
  // Informations parent
  prenom?: string; // anciennement prenomParent
  nom?: string; // anciennement nomParent
  email?: string;
  phone?: string;

  // Enfant
  prenomEnfant?: string;
  nomEnfant?: string;
  adresse?: string;
  homeLat?: number;
  homeLong?: number;
  photoEnfant?: File | null;

  // École
  schoolName?: string;
  schoolAddress?: string;
  schoolLat?: number;
  schoolLong?: number;

  // Auth
  password?: string;
  confirmPassword?: string;
};
