import { Context, Next } from "hono";
import { verifyToken, TokenPayload } from "../utils/jwt";

export interface AuthVariables {
  user: TokenPayload;
}

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json(
      { status: "error", message: "Unauthorized: No token provided" },
      401
    );
  }
  
  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);
  
  if (!payload) {
    return c.json(
      { status: "error", message: "Unauthorized: Invalid token" },
      401
    );
  }
  
  c.set("user", payload);
  await next();
}

export function requireRole(...roles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get("user") as TokenPayload;
    
    if (!user || !roles.includes(user.role)) {
      return c.json(
        { status: "error", message: "Forbidden: Insufficient permissions" },
        403
      );
    }
    
    await next();
  };
}