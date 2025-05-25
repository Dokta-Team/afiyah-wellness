import { NextResponse } from "next/server";
import { loginUser } from "@/lib/server-auth-actions";
import { setAuthCookie } from "@/lib/server-auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Login user
    const { user, token } = await loginUser(email, password);

    // Set cookie
    setAuthCookie(token);
    console.log("users may come", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
