"use client";

import type React from "react";
import { SidebarNavigation } from "@/components/SidebarNavigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNavigation />
      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
