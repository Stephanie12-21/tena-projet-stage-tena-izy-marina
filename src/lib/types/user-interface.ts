import { Children, Image, School, Users } from "../../../generated/prisma";

export type SignUpFormData = Partial<Children> & {
  // Informations parent
  prenom?: string;
  nom?: string;
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

export type ChildWithRelations = Children & {
  school: School;
  imageprofile: Image;
  parent: Users;
};

export interface UpdateChildInput {
  id: string;
  prenom: string;
  nom: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  schoolNom?: string;
  schoolAdresse?: string;
  schoolLat?: number;
  schoolLong?: number;
  imageUrl: string;
}

export interface ChildInput {
  prenomEnfant: string;
  nomEnfant: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  photoUrl: string;
  parentId: string;
  schoolName: string;
  schoolAddress: string;
  schoolLat: number;
  schoolLong: number;
}

export interface PricingTier {
  children: string;
  discount: number;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
}
