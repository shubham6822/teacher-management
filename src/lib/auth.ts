import type { User, LoginCredentials } from "@/types/auth";

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@school.edu",
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

  try {
    const userData =
      localStorage.getItem("user-data") || sessionStorage.getItem("user-data");
    const user = userData ? JSON.parse(userData) : null;
    console.log("Retrieved user from storage:", user);
    return user;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
}

// Store user data
export function storeUserData(user: User, rememberMe = false): void {
  if (typeof window === "undefined") return;

  console.log("Storing user data:", user, "Remember me:", rememberMe);

  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("user-data", JSON.stringify(user));
  storage.setItem("auth-token", "mock-jwt-token");

  // Clear the other storage to avoid conflicts
  const otherStorage = rememberMe ? sessionStorage : localStorage;
  otherStorage.removeItem("user-data");
  otherStorage.removeItem("auth-token");
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
