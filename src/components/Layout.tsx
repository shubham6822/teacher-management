"use client";

import type React from "react";
import { SidebarNavigation } from "@/components/SidebarNavigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <SidebarNavigation />
      <main className="flex-1 lg:ml-72 overflow-auto">
        <div className="min-h-screen relative">
          {/* Background gradient effects */}
          <div className="fixed inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-pink-50/20 pointer-events-none" />
          <div className="fixed top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="fixed bottom-0 left-72 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
          <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
          
          <div className="relative z-10 p-6 lg:p-8 pt-16 lg:pt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
