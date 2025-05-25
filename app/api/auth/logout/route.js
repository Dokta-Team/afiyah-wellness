import { NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/server-auth"

export async function POST() {
  clearAuthCookie()
  return NextResponse.json({ success: true })
}
