// "use client";

// import Image from "next/image";
// import { Card } from "@/components/ui/card";
// import { Home, School } from "lucide-react";
// import { useAuth } from "@/app/context/provider";
// import { useEffect, useState } from "react";
// import { useSearchParams, useParams } from "next/navigation";
// import { verifyQrToken } from "@/app/actions/verifyQrToken";
// import { checkChildAccess } from "@/app/actions/checkChildAccess";
// import { ChildWithRelations } from "@/lib/types/user-interface";

// export default function ChildPage() {
//   const { dbUser, loading } = useAuth();
//   const searchParams = useSearchParams();
//   const params = useParams();

//   const [child, setChild] = useState<ChildWithRelations | null>(null);
//   const [hasAccess, setHasAccess] = useState(false);
//   const [loadingChild, setLoadingChild] = useState(true);

//   const token = searchParams.get("token");
//   const childId = params?.id;

//   useEffect(() => {
//     if (loading || !childId) return;

//     const verifyAccessAndSetChild = async () => {
//       let accessGranted = false;
//       let childData: ChildWithRelations | undefined;

//       // ✅ Vérification QR token
//       if (token) {
//         try {
//           const tokenChildId = await verifyQrToken(token);
//           if (tokenChildId === childId) accessGranted = true;
//         } catch (err) {
//           console.error("Error verifying QR token:", err);
//         }
//       }

//       // ✅ Vérification via checkChildAccess si token non valide
//       if (!accessGranted && dbUser) {
//         try {
//           const result = await checkChildAccess(dbUser.id, String(childId));
//           accessGranted = result.allowed;
//           childData = result.child;
//         } catch (err) {
//           console.error("Error in checkChildAccess:", err);
//         }
//       }

//       setHasAccess(accessGranted);

//       if (accessGranted && childData) {
//         setChild(childData);
//       }

//       setLoadingChild(false);
//     };

//     verifyAccessAndSetChild();
//   }, [loading, dbUser, childId, token]);

//   if (loading || loadingChild) return <p>Chargement...</p>;

//   // Non connecté ou pas autorisé
//   if (!dbUser || !hasAccess)
//     return <p>Accès refusé – Vous n’êtes pas autorisé à voir cette page</p>;

//   // Enfant introuvable (après validation)
//   if (!child) return <p>Enfant introuvable</p>;

//   return (
//     <div className="min-h-screen flex items-center justify-center p-8">
//       <Card className="p-8 max-w-xl w-full">
//         <h1 className="text-3xl font-bold mb-4">
//           Profil de {child.prenom} {child.nom}
//         </h1>

//         {child.imageprofile?.url && (
//           <div className="relative w-32 h-32 mb-4 mx-auto">
//             <Image
//               src={child.imageprofile.url}
//               alt={`${child.prenom} ${child.nom}`}
//               fill
//               className="object-cover rounded-full"
//             />
//           </div>
//         )}

//         <div className="space-y-3 text-sm">
//           <p>
//             <strong>Adresse :</strong> {child.adresse}
//           </p>
//           <p>
//             <strong>Coordonnées :</strong> {child.homeLat}, {child.homeLong}
//           </p>

//           <div className="mt-4">
//             <h2 className="font-semibold flex items-center gap-2 mb-1">
//               <School className="w-4 h-4" /> École
//             </h2>
//             <p>{child.school?.nom || "École inconnue"}</p>
//             <p className="text-muted-foreground text-sm">
//               {child.school?.adresse || "Adresse inconnue"}
//             </p>
//           </div>

//           <div className="mt-4">
//             <h2 className="font-semibold flex items-center gap-2 mb-1">
//               <Home className="w-4 h-4" /> Parent
//             </h2>
//             <p>
//               {child.parent?.prenom || ""} {child.parent?.nom || ""}
//             </p>
//             <p>Email : {child.parent?.email || "N/A"}</p>
//             <p>Téléphone : {child.parent?.phone || "N/A"}</p>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Home, School } from "lucide-react";
import { useAuth } from "@/app/context/provider";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { verifyQrToken } from "@/app/actions/verifyQrToken";
import { checkChildAccess } from "@/app/actions/checkChildAccess";
import { ChildWithRelations } from "@/lib/types/user-interface";
import { logChildScan } from "@/app/actions/scan-child";

export default function ChildPage() {
  const { dbUser, loading } = useAuth();
  const searchParams = useSearchParams();
  const params = useParams();

  const [child, setChild] = useState<ChildWithRelations | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loadingChild, setLoadingChild] = useState(true);

  const [scanType, setScanType] = useState<"BOARDING" | "DROPOFF" | null>(null);
  const [isPending, startTransition] = useTransition();

  const token = searchParams.get("token");
  const childId = params?.id;

  useEffect(() => {
    if (loading || !childId) return;

    const verifyAccessAndSetChild = async () => {
      let accessGranted = false;
      let childData: ChildWithRelations | undefined;

      if (token) {
        try {
          const tokenChildId = await verifyQrToken(token);
          if (tokenChildId === childId) accessGranted = true;
        } catch (err) {
          console.error("Error verifying QR token:", err);
        }
      }

      if (!accessGranted && dbUser) {
        try {
          const result = await checkChildAccess(dbUser.id, String(childId));
          accessGranted = result.allowed;
          childData = result.child;
        } catch (err) {
          console.error("Error in checkChildAccess:", err);
        }
      }

      setHasAccess(accessGranted);

      if (accessGranted && childData) {
        setChild(childData);
      }

      setLoadingChild(false);
    };

    verifyAccessAndSetChild();
  }, [loading, dbUser, childId, token]);

  const handleScanLog = () => {
    if (!scanType || !child || !dbUser) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        startTransition(async () => {
          try {
            await logChildScan(
              child.id,
              dbUser.id,
              scanType,
              position.coords.latitude,
              position.coords.longitude
            );
            alert(`Scan ${scanType} enregistré avec succès !`);
            setScanType(null);
          } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) {
              alert("Erreur lors de l'enregistrement : " + err.message);
            } else {
              alert("Erreur inconnue lors de l'enregistrement");
            }
          }
        });
      },
      (err) => {
        console.error(err);
        alert("Impossible de récupérer la position GPS");
      }
    );
  };

  if (loading || loadingChild) return <p>Chargement...</p>;
  if (!dbUser || !hasAccess)
    return <p>Accès refusé – Vous n’êtes pas autorisé à voir cette page</p>;
  if (!child) return <p>Enfant introuvable</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-6">
      <Card className="p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-4">
          Profil de {child.prenom} {child.nom}
        </h1>

        {child.imageprofile?.url && (
          <div className="relative w-32 h-32 mb-4 mx-auto">
            <Image
              src={child.imageprofile.url}
              alt={`${child.prenom} ${child.nom}`}
              fill
              className="object-cover rounded-full"
            />
          </div>
        )}

        <div className="space-y-3 text-sm">
          <p>
            <strong>Adresse :</strong> {child.adresse}
          </p>
          <p>
            <strong>Coordonnées :</strong> {child.homeLat}, {child.homeLong}
          </p>

          <div className="mt-4">
            <h2 className="font-semibold flex items-center gap-2 mb-1">
              <School className="w-4 h-4" /> École
            </h2>
            <p>{child.school?.nom || "École inconnue"}</p>
            <p className="text-muted-foreground text-sm">
              {child.school?.adresse || "Adresse inconnue"}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold flex items-center gap-2 mb-1">
              <Home className="w-4 h-4" /> Parent
            </h2>
            <p>
              {child.parent?.prenom || ""} {child.parent?.nom || ""}
            </p>
            <p>Email : {child.parent?.email || "N/A"}</p>
            <p>Téléphone : {child.parent?.phone || "N/A"}</p>
          </div>
        </div>
      </Card>

      {/* Affichage conditionnel pour DRIVER */}
      {dbUser.role === "DRIVER" && (
        <Card className="p-6 max-w-xl w-full">
          <h2 className="text-xl font-semibold mb-4">
            Enregistrer montée/descente
          </h2>
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                scanType === "BOARDING"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setScanType("BOARDING")}
            >
              Montée
            </button>
            <button
              className={`px-4 py-2 rounded ${
                scanType === "DROPOFF" ? "bg-red-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setScanType("DROPOFF")}
            >
              Descente
            </button>
          </div>
          {scanType && (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded"
              onClick={handleScanLog}
              disabled={isPending}
            >
              {isPending ? "Enregistrement..." : `Confirmer ${scanType}`}
            </button>
          )}
        </Card>
      )}
    </div>
  );
}
