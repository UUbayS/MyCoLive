import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { errorMiddleware } from "./middleware/error";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";

const app = new Hono();

app.use("*", errorMiddleware);

app.get("/", (c) => {
  return c.json({ message: "API MyCoLive Berjalan Lancar 🚀" });
});

app.route("/api/auth", authRoutes);
app.route("/api/users", userRoutes);

export default app;