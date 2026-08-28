import { jwtVerify, SignJWT } from "jose";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from "./constants";

const accessSecret = new TextEncoder().encode(JWT_ACCESS_SECRET);
const refreshSecret = new TextEncoder().encode(JWT_REFRESH_SECRET);

// ===== SIGN (Create) Tokens =====
export async function signAccessToken(payload: { username: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(accessSecret);
  return token;
}

export async function signRefreshToken(payload: { username: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(refreshSecret);
  return token;
}

// ===== VERIFY Tokens =====

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, accessSecret);
  return payload as { username: string };
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, refreshSecret);
  return payload as { username: string };
}
