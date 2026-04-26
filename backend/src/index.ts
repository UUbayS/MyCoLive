import { Hono } from "hono";
import { errorMiddleware } from "./middleware/error";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import propertiRoutes from "./routes/properti";
import katalogRoutes from "./routes/katalog";

const app = new Hono();

app.use("*", errorMiddleware);

app.get("/", (c) => {
  return c.json({ message: "API MyCoLive Berjalan Lancar 🚀" });
});

app.route("/api/auth", authRoutes);
app.route("/api/users", userRoutes);
app.route("/api/properti", propertiRoutes);
app.route("/api/katalog", katalogRoutes);

export default app;