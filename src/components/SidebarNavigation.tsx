"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";
import { logoutUser } from "@/lib/auth";
import {
  Users,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Calendar,
  FileText,
  ClipboardCheck,
  TrendingUp,
  Settings,
  GraduationCap,
  ChevronRight,
  Bell,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, color: "from-blue-500 to-blue-600" },
  { name: "Teachers", href: "/teachers", icon: Users, color: "from-purple-500 to-purple-600" },
  { name: "Timetable", href: "/timetable", icon: Calendar, color: "from-green-500 to-green-600" },
  { name: "Leave Requests", href: "/leave-requests", icon: FileText, color: "from-orange-500 to-orange-600" },
  { name: "Attendance", href: "/attendance", icon: ClipboardCheck, color: "from-pink-500 to-pink-600" },
  { name: "Performance", href: "/performance", icon: TrendingUp, color: "from-indigo-500 to-indigo-600" },
  { name: "Settings", href: "/settings", icon: Settings, color: "from-gray-500 to-gray-600" },
];

export function SidebarNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-slate-900/90 backdrop-blur-xl border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 shadow-2xl"
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-black backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-out lg:translate-x-0 border-r border-slate-800",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full relative">
          {/* Ambient light effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10 pointer-events-none" />

          {/* Logo/Header */}
          <div className="relative flex items-center justify-between h-20 px-6 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  TMS
                </h1>
                <p className="text-xs text-slate-400">Teacher Management</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-slate-800/50 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r text-white shadow-lg shadow-black/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  {/* Active background gradient */}
                  {isActive && (
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r opacity-90",
                      item.color
                    )} />
                  )}

                  {/* Hover effect */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                    item.color
                  )} />

                  <div className="relative flex items-center w-full">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                      isActive
                        ? "bg-white/20 shadow-lg group-hover:scale-110"
                        : "bg-slate-800/50 group-hover:bg-slate-700/50 group-hover:scale-110"
                    )}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="ml-3 flex-1">{item.name}</span>
                    {isActive && (
                      <ChevronRight className="h-4 w-4 animate-pulse" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="relative p-4 border-t border-slate-800/50">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                  <Avatar className="relative border-2 border-slate-700 group-hover:border-slate-600 transition-colors">
                    <AvatarImage
                      src={user?.avatar || "/placeholder.svg"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.email || ""}
                  </p>
                  {user?.department && (
                    <p className="text-xs text-blue-400 mt-1">{user.department}</p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
