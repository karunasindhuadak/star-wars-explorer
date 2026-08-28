import { signAccessToken, signRefreshToken } from "@/lib/auth";
import { MOCK_USER } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username !== MOCK_USER.username || password !== MOCK_USER.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const accessToken = await signAccessToken({username})
  const refreshToken = await signRefreshToken({ username })
  
  const response = NextResponse.json(
    {
      accessToken,
      user: {username}
    },
    {status: 200}
  )

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true, // JavaScript cannot read this cookie (security)
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "lax", // Cookie sent only to same site (prevents CSRF attacks)
    path: "/", // Cookie available on all pages
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds (604800)
  });

  return response
}
