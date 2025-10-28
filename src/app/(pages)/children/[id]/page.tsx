import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Home, School } from "lucide-react";
import { use } from "react";

interface ChildPageProps {
  params: Promise<{ id: string }>;
}

export default function ChildPage({ params }: ChildPageProps) {
  const { id } = use(params);

  const child = use(
    prisma.children.findUnique({
      where: { id },
      include: {
        parent: true,
        school: true,
        imageprofile: true,
      },
    })
  );

  if (!child) return notFound();

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
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
            <p>{child.school.nom}</p>
            <p className="text-muted-foreground text-sm">
              {child.school.adresse}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold flex items-center gap-2 mb-1">
              <Home className="w-4 h-4" /> Parent
            </h2>
            <p>
              {child.parent.prenom} {child.parent.nom}
            </p>
            <p>Email : {child.parent.email}</p>
            <p>Téléphone : {child.parent.phone}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
