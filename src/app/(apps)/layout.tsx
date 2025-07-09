import type React from "react";
import { Layout as ProjectLayout } from "@/components/Layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ProjectLayout>{children}</ProjectLayout>
    </div>
  );
}
