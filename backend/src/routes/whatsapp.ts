import { Hono } from "hono";
import { authMiddleware, requireRole } from "../middleware/auth";
import { sendWhatsAppBroadcast, isValidNomorWA } from "../services/whatsapp";
import { baileysProvider } from "../services/whatsapp/providers/baileys";

const app = new Hono();

app.use("*", authMiddleware);

// Broadcast WhatsApp (PEMILIK only)
app.post("/broadcast", requireRole("PEMILIK"), async (c) => {
  try {
    const body = await c.req.json();
    const { nomor, pesan } = body;

    if (!nomor || !Array.isArray(nomor) || nomor.length === 0) {
      return c.json(
        { status: "error", message: "Nomor harus berupa array dan tidak boleh kosong" },
        400
      );
    }

    if (!pesan || typeof pesan !== "string") {
      return c.json(
        { status: "error", message: "Pesan wajib diisi" },
        400
      );
    }

    const invalidNomor = nomor.filter(n => !isValidNomorWA(n));
    if (invalidNomor.length > 0) {
      return c.json(
        { 
          status: "error", 
          message: `Nomor tidak valid: ${invalidNomor.join(", ")}` 
        },
        400
      );
    }

    const result = await sendWhatsAppBroadcast(nomor, pesan);

    return c.json({
      status: "success",
      data: result
    });
  } catch (error) {
    console.error("WhatsApp broadcast error:", error);
    return c.json(
      { status: "error", message: "Gagal mengirim broadcast" },
      500
    );
  }
});

app.get("/status", requireRole("PEMILIK"), async (c) => {
  return c.json({
    status: "success",
    data: {
      connected: baileysProvider.isConnected(),
      qr: baileysProvider.getQRDataUrl() || baileysProvider.getQR(),
    },
  });
});

// Trigger QR / reconnect (PEMILIK only)
app.post("/connect", requireRole("PEMILIK"), async (c) => {
  try {
    baileysProvider.resetRetry();
    baileysProvider.initialize().catch(console.error);

    return c.json({
      status: "success",
      message: "Menghubungkan WhatsApp... Periksa QR di /api/whatsapp/status",
    });
  } catch (error) {
    console.error("WhatsApp connect error:", error);
    return c.json(
      { status: "error", message: "Gagal menghubungkan WhatsApp" },
      500
    );
  }
});

export default app;