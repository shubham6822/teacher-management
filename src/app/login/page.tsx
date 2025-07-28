"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { GraduationCap, Users, Calendar, TrendingUp, BookOpen, Award, Shield } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8 animate-in slide-in-from-left-5 duration-700">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    TMS
                  </h1>
                  <p className="text-blue-400 text-sm font-medium">Teacher Management System</p>
                </div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed max-w-md">
                Transform your educational institution with our cutting-edge
                <span className="text-blue-400 font-medium"> AI-powered</span> management platform.
              </p>
            </div>

            <div className="space-y-4">
              <div className="group flex items-start gap-4 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    Smart Teacher Management
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    AI-powered staff tracking, automated performance insights, and seamless profile management
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    Intelligent Scheduling
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Auto-generated timetables, conflict resolution, and optimized resource allocation
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    Advanced Analytics
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Real-time dashboards, predictive insights, and comprehensive reporting suite
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-400">ISO Certified</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-gray-500">
                <span className="text-blue-400 font-semibold">500+</span> institutions trust TMS worldwide
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="animate-in slide-in-from-right-5 duration-700">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
