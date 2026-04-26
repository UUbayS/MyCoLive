import { Context, Next } from "hono";

export async function errorMiddleware(c: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    console.error("Error:", err);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    return c.json(
      {
        status: "error",
        message,
      },
      statusCode
    );
  }
}