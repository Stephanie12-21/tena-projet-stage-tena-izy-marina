// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/app/context/provider";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";
// import { Home, School } from "lucide-react";

// interface ImageProfile {
//   id: string;
//   url: string;
// }

// interface Child {
//   id: string;
//   prenom: string;
//   nom: string;
//   adresse: string;
//   homeLat: number;
//   homeLong: number;
//   school: {
//     id: string;
//     nom: string;
//     adresse: string;
//     schoolLat: number;
//     schoolLong: number;
//   };
//   imageprofile: ImageProfile;
// }

// const ChildrenPage = () => {
//   const { dbUser, loading } = useAuth();
//   const [children, setChildren] = useState<Child[]>([]);
//   const [loadingChildren, setLoadingChildren] = useState(true);

//   useEffect(() => {
//     if (!dbUser?.id) return;

//     async function fetchChildren() {
//       try {
//         const res = await fetch(`/api/users/${dbUser?.id}/children`);
//         if (res.ok) {
//           const data: Child[] = await res.json();
//           setChildren(data);
//         } else {
//           console.error("Erreur lors de la récupération des enfants");
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoadingChildren(false);
//       }
//     }

//     fetchChildren();
//   }, [dbUser?.id]);

//   if (loading || loadingChildren) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
//           <p className="text-muted-foreground">Chargement...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!dbUser) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-6">
//         <Card className="p-8 text-center max-w-md">
//           <p className="text-lg text-muted-foreground">
//             Vous devez être connecté pour voir vos enfants.
//           </p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
//             Mes enfants
//           </h1>
//           <p className="text-muted-foreground text-lg">
//             Gérez les profils de vos enfants
//           </p>
//         </div>

//         {children.length === 0 ? (
//           <Card className="p-12 text-center">
//             <div className="max-w-md mx-auto">
//               <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Home className="w-8 h-8 text-muted-foreground" />
//               </div>
//               <h2 className="text-xl font-semibold mb-2">
//                 Aucun enfant enregistré
//               </h2>
//               <p className="text-muted-foreground mb-6">
//                 Commencez par ajouter le profil de votre premier enfant
//               </p>
//               <Button size="lg">Ajouter un enfant</Button>
//             </div>
//           </Card>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {children.map((child) => (
//               <Card
//                 key={child.id}
//                 className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="p-6">
//                   {/* Header with image and name */}
//                   <div className="flex items-start gap-6 mb-6">
//                     <div className="relative flex-shrink-0">
//                       {child.imageprofile ? (
//                         <div className="relative w-24 h-24 rounded-xl overflow-hidden ring-4 ring-primary/10">
//                           <Image
//                             src={child.imageprofile.url || "/placeholder.svg"}
//                             alt={`${child.prenom} ${child.nom}`}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                       ) : (
//                         <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-4 ring-primary/10">
//                           <span className="text-3xl font-bold text-primary">
//                             {child.prenom.charAt(0)}
//                             {child.nom.charAt(0)}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <h2 className="text-2xl font-bold text-foreground mb-1 text-balance">
//                         {child.prenom} {child.nom}
//                       </h2>
//                       <p className="text-sm text-muted-foreground">
//                         Profil de l&apos;enfant
//                       </p>
//                     </div>
//                   </div>

//                   {/* Home Address Section */}
//                   <div className="space-y-4 mb-6">
//                     <div className="bg-secondary/50 rounded-lg p-4">
//                       <div className="flex items-start gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
//                           <Home className="w-5 h-5 text-primary" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-foreground mb-1">
//                             Adresse du domicile
//                           </h3>
//                           <p className="text-sm text-foreground/80 mb-2">
//                             {child.adresse}
//                           </p>
//                           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                             <Home className="w-3.5 h-3.5" />
//                             <span className="font-mono">
//                               {child.homeLat.toFixed(6)},{" "}
//                               {child.homeLong.toFixed(6)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* School Section */}
//                     {child.school && (
//                       <div className=" rounded-lg p-4">
//                         <div className="flex items-start gap-3">
//                           <div className="w-10 h-10 rounded-lg  flex items-center justify-center flex-shrink-0">
//                             <School className="w-5 h-5 " />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <h3 className="font-semibold  mb-1">
//                               {child.school.nom}
//                             </h3>
//                             <p className="text-sm  mb-2">
//                               {child.school.adresse}
//                             </p>
//                             <div className="flex items-center gap-2 text-xs ">
//                               <Home className="w-3.5 h-3.5" />
//                               <span className="font-mono">
//                                 {child.school.schoolLat.toFixed(6)},{" "}
//                                 {child.school.schoolLong.toFixed(6)}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Action Button */}
//                   <Button className="w-full" size="lg">
//                     Générer le qr code
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChildrenPage;
//
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ImageProfile {
  id: string;
  url: string;
}

interface Parent {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  role: string;
}

interface Child {
  id: string;
  prenom: string;
  nom: string;
  adresse: string;
  homeLat: number;
  homeLong: number;
  school: {
    id: string;
    nom: string;
    adresse: string;
    schoolLat: number;
    schoolLong: number;
  };
  imageprofile: ImageProfile;
  parent: Parent;
}

const ChildrenPage = () => {
  const { dbUser, loading } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(true);
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({}); // id => base64

  useEffect(() => {
    if (!dbUser?.id) return;

    async function fetchChildren() {
      try {
        const res = await fetch(`/api/users/${dbUser?.id}/children`);
        if (res.ok) {
          const data: Child[] = await res.json();
          setChildren(data);
        } else {
          console.error("Erreur lors de la récupération des enfants");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingChildren(false);
      }
    }

    fetchChildren();
  }, [dbUser?.id]);

  // Fonction pour générer le QR code via Server Action
  const handleGenerateQr = async (childId: string) => {
    try {
      const res = await fetch(`/api/children/${childId}/generateQr`);
      if (!res.ok) throw new Error("Erreur génération QR code");

      const data = await res.json();
      setQrCodes((prev) => ({ ...prev, [childId]: data.qrCode }));
    } catch (err) {
      console.error(err);
      alert("Impossible de générer le QR code");
    }
  };

  if (loading || loadingChildren) return <p>Chargement...</p>;
  if (!dbUser) return <p>Vous devez être connecté pour voir vos enfants.</p>;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Mes enfants</h1>

        {children.length === 0 ? (
          <Card className="p-12 text-center">
            <p>Aucun enfant enregistré</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {children.map((child) => (
              <Card
                key={child.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-6">
                    {child.imageprofile ? (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden ring-4 ring-primary/10">
                        <Image
                          src={child.imageprofile.url || "/placeholder.svg"}
                          alt={`${child.prenom} ${child.nom}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-4 ring-primary/10 text-2xl font-bold text-foreground">
                        {child.prenom[0]}
                        {child.nom[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold mb-1">
                        {child.prenom} {child.nom}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Profil de l&apos;enfant
                      </p>
                    </div>
                  </div>

                  {!qrCodes[child.id] ? (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => handleGenerateQr(child.id)}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                      Générer le QR code
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      {/* QR Code Display Card */}
                      <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-2xl p-8 border-2 border-dashed border-primary/20">
                        <div className="absolute top-3 right-3">
                          <div className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                            QR Code
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                          <div className="bg-white p-4 rounded-xl shadow-lg ring-1 ring-black/5">
                            <Image
                              height={200}
                              width={200}
                              src={qrCodes[child.id] || "/placeholder.svg"}
                              alt={`QR Code pour ${child.prenom} ${child.nom}`}
                              className="w-48 h-48"
                            />
                          </div>

                          <div className="text-center space-y-1">
                            <p className="text-sm font-medium text-foreground">
                              Code d&apos;identification
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Scannez ce code pour accéder aux informations
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = qrCodes[child.id];
                            link.download = `qr-code-${child.prenom}-${child.nom}.png`;
                            link.click();
                          }}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Télécharger
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => {
                            window.print();
                          }}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                            />
                          </svg>
                          Imprimer
                        </Button>
                      </div>

                      {/* Regenerate Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={() => handleGenerateQr(child.id)}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Régénérer le QR code
                      </Button>
                    </div>
                  )}
                  {/* </CHANGE> */}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildrenPage;
