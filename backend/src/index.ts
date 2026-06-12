import { Hono } from "hono";
import { cors } from "hono/cors";
import { errorMiddleware } from "./middleware/error";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import propertiRoutes from "./routes/properti";
import katalogRoutes from "./routes/katalog";
import kamarRoutes from "./routes/kamar";
import fasilitasRoutes from "./routes/fasilitas";
import tempatpembayaranRoutes from "./routes/tempatpembayaran";
import pemesananRoutes from "./routes/pemesanan";
import penghuniRoutes from "./routes/penghuni";
import danaRoutes from "./routes/dana";
import komplainRoutes from "./routes/komplain";
import laporanRoutes from "./routes/laporan";
import keuanganRoutes from "./routes/keuangan";
import whatsappRoutes from "./routes/whatsapp";
import notifikasiRoutes from "./routes/notifikasi";
import badgesRoutes from "./routes/badges";
import pengumumanRoutes from "./routes/pengumuman";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("*", errorMiddleware);

app.get("/", (c) => {
  return c.json({ message: "API MyCoLive Berjalan Lancar" });
});

app.route("/api/auth", authRoutes);
app.route("/api/users", userRoutes);
app.route("/api/properti", propertiRoutes);
app.route("/api/katalog", katalogRoutes);
app.route("/api", kamarRoutes);
app.route("/api/fasilitas", fasilitasRoutes);
app.route("/api/tempatpembayaran", tempatpembayaranRoutes);
app.route("/api/pemesanan", pemesananRoutes);
app.route("/api/penghuni", penghuniRoutes);
app.route("/api/dana", danaRoutes);
app.route("/api/komplain", komplainRoutes);
app.route("/api/laporan", laporanRoutes);
app.route("/api/keuangan", keuanganRoutes);
app.route("/api/whatsapp", whatsappRoutes);
app.route("/api/notifikasi", notifikasiRoutes);
app.route("/api/badges", badgesRoutes);
app.route("/api/pengumuman", pengumumanRoutes);

export default app;
