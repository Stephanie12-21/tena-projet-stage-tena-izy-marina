import {
  BusStatus,
  Children,
  Image,
  ScanLog,
  School,
  Users,
} from "../../../generated/prisma";

// ------------------- FORMULAIRE D'INSCRIPTION -------------------
export type SignUpFormData = Partial<Children> & {
  prenom?: string;
  nom?: string;
  email?: string;
  phone?: string;
  prenomEnfant?: string;
  nomEnfant?: string;
  adresse?: string;
  homeLat?: number;
  homeLong?: number;
  photoEnfant?: File | null;
  arrivalTime?: string;
  departureTime?: string;
  schoolName?: string;
  schoolAddress?: string;
  schoolLat?: number;
  schoolLong?: number;
  password?: string;
  confirmPassword?: string;
};

// ------------------- RELATIONS -------------------
export type ChildWithRelations = Children & {
  school: School;
  imageprofile: Image;
  parent: Users;
  bus?: Bus;
  scanLogs?: ScanLog[];
};

// ------------------- INPUTS -------------------
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
  schoolName: string;
  schoolAddress: string;
  schoolLat: number;
  schoolLong: number;
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

export interface DriverProfile {
  id: string;
  userId: string;
  currentLat: number;
  currentLong: number;
  //imageId: string;
  image: {
    id: string;
    url: string;
  };
  license: {
    licenseNumber: string;
    licenseType: string;
    licenseExpiration: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  driverProfile?: DriverProfile | null;
}

export interface Bus {
  id: string;
  matricule: string;
  brand: string;
  seats: number;
  status: BusStatus;
  driver?: Driver | null;
}
