import { Hono } from "hono";
import { cors } from "hono/cors";
import { errorMiddleware } from "./middleware/error";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import propertiRoutes from "./routes/properti";
import katalogRoutes from "./routes/katalog";
import kamarRoutes from "./routes/kamar";
import settingsRoutes from "./routes/settings";
import pemesananRoutes from "./routes/pemesanan";
import penghuniRoutes from "./routes/penghuni";
import danaRoutes from "./routes/dana";

const app = new Hono();

app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

app.use("*", errorMiddleware);

app.get("/", (c) => {
  return c.json({ message: "API MyCoLive Berjalan Lancar 🚀" });
});

app.route("/api/auth", authRoutes);
app.route("/api/users", userRoutes);
app.route("/api/properti", propertiRoutes);
app.route("/api/katalog", katalogRoutes);
app.route("/api", kamarRoutes);
app.route("/api/settings", settingsRoutes);
app.route("/api/pemesanan", pemesananRoutes);
app.route("/api/penghuni", penghuniRoutes);
app.route("/api/dana", danaRoutes);

export default app;