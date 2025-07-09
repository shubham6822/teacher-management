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
    email: "",
    password: "",
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
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-gray-600">
          Sign in to your TMS account to continue
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert
              variant="destructive"
              className="animate-in fade-in-0 duration-300"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="admin@school.edu"
                value={credentials.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={credentials.rememberMe}
                onChange={(e) =>
                  handleInputChange("rememberMe", e.target.checked)
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </Label>
            </div>
            <Button
              type="button"
              variant="link"
              className="text-sm text-primary hover:text-primary/80 p-0 h-auto"
              disabled={isLoading}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            Demo Credentials:
          </div>
          <div className="mt-2 space-y-1 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <div>
              <strong>Email:</strong> admin@school.edu
            </div>
            <div>
              <strong>Password:</strong> password123
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
