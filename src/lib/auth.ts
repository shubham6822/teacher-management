import type { User, LoginCredentials } from "@/types/auth";

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@school.com",
    avatar: "/placeholder.svg",
    lastLogin: new Date().toISOString(),
  },
];

// Mock authentication function
export async function authenticateUser(
  credentials: LoginCredentials
): Promise<User | null> {
  console.log("Authenticating user:", credentials.email);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find user by email
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
  );
  console.log("Found user:", user);

  // Simple password check (in real app, this would be properly hashed)
  if (user && credentials.password === "password123") {
    const authenticatedUser = {
      ...user,
      lastLogin: new Date().toISOString(),
    };
    console.log("Authentication successful:", authenticatedUser);
    return authenticatedUser;
  }

  console.log("Authentication failed");
  return null;
}

// Mock logout function
export async function logoutUser(): Promise<void> {
  console.log("Logging out user");
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Clear any stored tokens/session data
  clearUserData();
}

// Get current user from storage
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  // First validate the token
  if (!validateAuthToken()) {
    console.log("Token validation failed, clearing user data");
    clearUserData();
    return null;
  }

  try {
    const userData = localStorage.getItem("user-data");

    if (!userData) {
      console.log("No user data found");
      return null;
    }

    const user = JSON.parse(userData);
    console.log("Retrieved user from storage:", user);
    return user;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    clearUserData();
    return null;
  }
}

// Store user data
export function storeUserData(user: User, rememberMe = false): void {
  if (typeof window === "undefined") return;

  console.log("Storing user data:", user, "Remember me:", rememberMe);

  // Always use localStorage for consistency
  localStorage.setItem("user-data", JSON.stringify(user));
  localStorage.setItem("auth-token", "mock-jwt-token");

  // Clear session storage to avoid conflicts
  sessionStorage.removeItem("user-data");
  sessionStorage.removeItem("auth-token");
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  return validateAuthToken();
}

// Clear user data
export function clearUserData(): void {
  if (typeof window === "undefined") return;

  console.log("Clearing user data");
  localStorage.removeItem("user-data");
  localStorage.removeItem("auth-token");
  sessionStorage.removeItem("user-data");
  sessionStorage.removeItem("auth-token");
}

// Validate auth token
export function validateAuthToken(): boolean {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("auth-token");
  const userData = localStorage.getItem("user-data");

  if (!token || !userData) {
    console.log("No token or user data found");
    return false;
  }

  try {
    // Parse user data to ensure it's valid JSON
    JSON.parse(userData);

    // In a real app, you would decode and validate the JWT token here
    // For now, we'll just check if the token exists and is not empty
    if (token === "mock-jwt-token") {
      console.log("Token validation successful");
      return true;
    }

    console.log("Invalid token format");
    return false;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}
