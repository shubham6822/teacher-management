import type React from "react";
import { Layout as ProjectLayout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ProjectLayout>{children}</ProjectLayout>
    </ProtectedRoute>
  );
}
