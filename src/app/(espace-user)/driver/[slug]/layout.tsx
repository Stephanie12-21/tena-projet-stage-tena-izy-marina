import type React from "react";
import { ProtectedRoute } from "@/app/context/protectedtoute";
import { AuthProvider } from "@/app/context/provider";
import { DashboardSidebar } from "@/components/driver-features/dashboard-sidebar";

export default function DriverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="flex h-screen bg-background">
          <DashboardSidebar />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
