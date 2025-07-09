"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      router.push("/login");
      return;
    }
  }, [isAuthenticated, user, isLoading, router]);
  return <div>Dashboard</div>;
}
