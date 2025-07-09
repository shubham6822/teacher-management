"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      router.push("/login");
      return;
    } else {
      router.push("teachers");
    }
  }, []);
  return <div>Reload the page</div>;
}
