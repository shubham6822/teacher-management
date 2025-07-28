"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginCredentials } from "@/types/auth";
import { authenticateUser, storeUserData } from "@/lib/auth";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from "lucide-react";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "admin@school.com",
    password: "password123",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", credentials.email);
      const user = await authenticateUser(credentials);

      if (user) {
        console.log("Login successful, user:", user);
        storeUserData(user, credentials.rememberMe);
        login(user); // Update auth context
        onSuccess?.();

        // Small delay to ensure state is updated
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 100);
      } else {
        console.log("Login failed - invalid credentials");
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof LoginCredentials,
    value: string | boolean
  ) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
      <CardHeader className="space-y-6 text-center pb-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-300 text-base">
            Sign in to your <span className="text-blue-400 font-medium">TMS</span> account to continue
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert
              variant="destructive"
              className="animate-in fade-in-0 duration-300 bg-red-500/10 border-red-500/20 text-red-400"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email Address
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-400 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="admin@school.com"
                value={credentials.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300 rounded-xl"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-400 transition-colors" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-12 pr-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300 rounded-xl"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3">
              <input
                id="remember"
                type="checkbox"
                checked={credentials.rememberMe}
                onChange={(e) =>
                  handleInputChange("rememberMe", e.target.checked)
                }
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 focus:ring-2"
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                Remember me
              </Label>
            </div>
            <Button
              type="button"
              variant="link"
              className="text-sm text-blue-400 hover:text-blue-300 p-0 h-auto transition-colors"
              disabled={isLoading}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </div>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-3">
              Demo Credentials
            </div>
            <div className="space-y-2 text-xs bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-center text-gray-300">
                <span className="text-gray-400">Email:</span>
                <span className="font-mono text-blue-400">admin@school.com</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="text-gray-400">Password:</span>
                <span className="font-mono text-purple-400">password123</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
