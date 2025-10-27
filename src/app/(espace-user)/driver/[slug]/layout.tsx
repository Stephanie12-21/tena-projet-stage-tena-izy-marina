import { ProtectedRoute } from "@/app/context/protectedtoute";
import { AuthProvider } from "@/app/context/provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>
        <ProtectedRoute>{children}</ProtectedRoute>
      </AuthProvider>
    </div>
  );
}
