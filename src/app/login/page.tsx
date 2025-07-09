"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { GraduationCap, Users, Calendar, TrendingUp } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("LoginPage check:", { isAuthenticated, isLoading });

    if (!isLoading && isAuthenticated) {
      console.log("Already authenticated, redirecting to dashboard");
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // If already authenticated, don't show login form
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8 animate-in slide-in-from-left-5 duration-700">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">TMS</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Streamline your educational institution management with our
              comprehensive admin platform.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/80 hover:scale-105">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Teacher Management
                </h3>
                <p className="text-sm text-gray-600">
                  Manage staff profiles, assignments, and performance tracking
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/80 hover:scale-105">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Schedule Management
                </h3>
                <p className="text-sm text-gray-600">
                  Create and manage timetables, classes, and room assignments
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/80 hover:scale-105">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Analytics & Reports
                </h3>
                <p className="text-sm text-gray-600">
                  Track performance metrics and generate detailed reports
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-gray-500">
              Trusted by over 500+ educational institutions worldwide
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="animate-in slide-in-from-right-5 duration-700">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
