import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUserByEmail, createUser, getUserById } from "./db";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Hash password
export async function hashPassword(password) {
  return hash(password, 12);
}

// Compare password with hash
export async function verifyPassword(password, hashedPassword) {
  return compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(user) {
  return sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
      membershipType: user.membershipType || "free",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Set auth cookie
export async function setAuthCookie(token) {
  const cookieStore = await cookies();
  await cookieStore().set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

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
  const token = getAuthCookie();
  if (!token) {
    console.log("token invalid");
    return null;
  }

  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Get fresh user data from database
  console.log("decoded:", decoded);
  const user = await getUserById(decoded.userId);

  if (!user) {
    console.log("User is invalid", user); // or show an error message
    return null;
  }

  return {
    ...decoded,
    name: user.name,
    profileImage: user.profileImage,
  };
}

// Register a new user
export async function registerUser(userData) {
  // Check if user already exists
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(userData.password);

  // Create user
  const newUser = {
    _id: new ObjectId().toString(),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: "member",
    membershipType: "free",
    profileImage: null,
    bio: "",
    joinedAt: new Date(),
    lastLogin: new Date(),
  };

  await createUser(newUser);

  // Remove password from returned user
  const { password, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
}

// Login user
export async function loginUser(email, password) {
  // Find user
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = generateToken(user);

  // Remove password from returned user
  const { password: _, ...userWithoutPassword } = user;

  return { userWithoutPassword, token };
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
