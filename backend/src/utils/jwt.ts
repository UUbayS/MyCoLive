import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_TOKEN_EXPIRE = "15m";
const REFRESH_TOKEN_EXPIRE = "7d";
const RESET_TOKEN_EXPIRE = "5m";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export interface ResetTokenPayload {
  userId: string;
  scope: "password-reset";
  rid: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });
}

export function generateResetToken(payload: ResetTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: RESET_TOKEN_EXPIRE });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function verifyResetToken(token: string): ResetTokenPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as ResetTokenPayload;
    if (payload.scope !== "password-reset") return null;
    return payload;
  } catch {
    return null;
  }
}