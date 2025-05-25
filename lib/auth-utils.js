// This file contains auth utilities that can be used on both client and server
import { hash, compare } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Hash password
export async function hashPassword(password) {
  return hash(password, 12)
}

// Compare password with hash
export async function verifyPassword(password, hashedPassword) {
  return compare(password, hashedPassword)
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
    { expiresIn: "7d" },
  )
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
