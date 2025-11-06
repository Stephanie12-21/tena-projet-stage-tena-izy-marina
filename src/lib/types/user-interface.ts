import {
  BusStatus,
  Children,
  Image,
  School,
  Users,
} from "../../../generated/prisma";

// ------------------- FORMULAIRE D'INSCRIPTION -------------------
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

  // 🕓 Horaires
  arrivalTime?: string; // Heure d'arrivée à l'école (ex: "07:30")
  departureTime?: string; // Heure de sortie (ex: "16:30")

  // École
  schoolName?: string;
  schoolAddress?: string;
  schoolLat?: number;
  schoolLong?: number;

  // Auth
  password?: string;
  confirmPassword?: string;
};

// ------------------- RELATIONS -------------------
export type ChildWithRelations = Children & {
  school: School;
  imageprofile: Image;
  parent: Users;
};

// ------------------- INPUTS -------------------
export interface UpdateChildInput {
  id: string;
  prenom: string;
  nom: string;
  adresse: string;
  homeLat: number;
  homeLong: number;

  // École (optionnelle si mise à jour)
  schoolNom?: string;
  schoolAdresse?: string;
  schoolLat?: number;
  schoolLong?: number;

  imageUrl: string;

  // 🕓 Horaires
  arrivalTime?: string;
  departureTime?: string;
}

export interface ChildInput {
  prenomEnfant: string;
  nomEnfant: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  photoUrl: string;
  parentId: string;

  // 🏫 École
  schoolName: string;
  schoolAddress: string;
  schoolLat: number;
  schoolLong: number;

  // 🕓 Horaires
  arrivalTime: string;
  departureTime: string;
}

// ------------------- AUTRES TYPES -------------------
export interface PricingTier {
  children: string;
  discount: number;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

export type Driver = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  driverProfile?: {
    license?: {
      licenseNumber: string | null;
      licenseType: string | null;
      licenseExpiration: string | Date | null;
    } | null;
  } | null;
};

export interface Bus {
  id: string;
  matricule: string;
  brand: string;
  seats: number;
  status: BusStatus;
  driver: Driver | null;
}
