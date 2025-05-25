// This file is for SERVER COMPONENTS ONLY
import { cookies } from "next/headers";
import { verifyToken } from "./auth-utils";
import dbConnect from "./mongoose";
import User from "../models/User";

// Set auth cookie
// ...existing code...
export async function setAuthCookie(token) {
  cookies().set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
// ...existing code...
// Get auth cookie
export function getAuthCookie() {
  return cookies().get("auth_token")?.value;
}

// Clear auth cookie
export function clearAuthCookie() {
  cookies().delete("auth_token");
}

// Get current user from request
export async function getCurrentUser() {
  const token = await getAuthCookie();
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Get fresh user data from database
  await dbConnect();
  const user = await User.findById(decoded.userId).lean();
  if (!user) return null;

  return {
    ...decoded,
    name: user.name,
    profileImage: user.profileImage,
  };
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

// Check if user is admin
export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

// Check if user is a premium member
export async function isPremiumMember() {
  const user = await getCurrentUser();
  return (
    user?.membershipType === "premium" || user?.membershipType === "founder"
  );
}
