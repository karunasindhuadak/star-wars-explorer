import { signAccessToken, verifyRefreshToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//* POST /api/auth/refresh — Issue a new access token using the refresh cookie 
export async function POST() {
  // Read the refresh token from the httpOnly cookie
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  // Verify signature and expiry
  const payload = await verifyRefreshToken(refreshToken);

  if (!payload) {
    return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 401 });
  }

  // Issue a fresh access token (15 min)
  const accessToken = await signAccessToken({ username: payload.username });

  return NextResponse.json({ accessToken }, { status: 200 });
}
