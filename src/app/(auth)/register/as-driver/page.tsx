import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import DriverForm from "@/components/features/authform/DriverForm";

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DriverForm />
    </Suspense>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#C3875D] mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </CardContent>
      </Card>
    </div>
  );
}
