import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
} from "@whiskeysockets/baileys";
import pino from "pino";
import QRCode from "qrcode";
import path from "path";
import type { WASocket } from "@whiskeysockets/baileys";
import { WhatsAppProvider, WhatsAppResult } from "../index";

const logger = pino({ level: "silent" });

class BaileysProvider implements WhatsAppProvider {
  private sock: WASocket | null = null;
  private qr: string | null = null;
  private qrDataUrl: string | null = null;
  private connected = false;
  private initializing = false;
  private retryCount = 0;
  private maxRetry = 3;

  async initialize() {
    if (this.initializing) return;
    if (this.retryCount >= this.maxRetry) {
      console.warn("[WA] Max retry reached — call POST /api/whatsapp/connect to retry");
      return;
    }
    this.initializing = true;
    this.retryCount++;
    console.log(`[WA] Initializing... (attempt ${this.retryCount}/${this.maxRetry})`);

    try {
      const { state, saveCreds } = await useMultiFileAuthState("whatsapp-session");
      console.log("[WA] Auth state loaded, connecting...");

      this.sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: logger as any,
        browser: ["MyCoLive", "Desktop", "1.0.0"],
      });

      this.sock.ev.on("creds.update", saveCreds);

      this.sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
        if (qr) {
          this.qr = qr;
          const qrPath = path.resolve("qr.png");
          QRCode.toFile(qrPath, qr)
            .then(() => console.log(`[WA] QR saved → ${qrPath} — open and scan`))
            .catch(() => console.log("[WA] QR ready — scan with WhatsApp"));
          QRCode.toDataURL(qr).then((url: string) => {
            this.qrDataUrl = url;
          }).catch(() => {
            this.qrDataUrl = null;
          });
        }
        if (connection === "open") {
          this.connected = true;
          this.qr = null;
          this.qrDataUrl = null;
          this.initializing = false;
          this.retryCount = 0;
          console.log("[WA] Connected");
        }
        if (connection === "close") {
          this.connected = false;
          this.initializing = false;
          const err = lastDisconnect?.error as any;
          const statusCode = err?.output?.statusCode;
          console.log("[WA] Disconnected — code:", statusCode, err?.message || "");
          if (statusCode !== DisconnectReason.loggedOut && this.retryCount < this.maxRetry) {
            const delay = Math.min(5000 * this.retryCount, 30000);
            console.log(`[WA] Auto-reconnect in ${delay / 1000}s...`);
            setTimeout(() => this.initialize(), delay);
          } else if (statusCode === DisconnectReason.loggedOut) {
            this.retryCount = this.maxRetry;
            console.warn("[WA] Logged out — delete whatsapp-session/ and call /connect");
          } else {
            console.warn("[WA] Max retry reached — call POST /api/whatsapp/connect to retry");
          }
        }
      });
    } catch (err) {
      this.initializing = false;
      console.error("[WA] Init error:", err);
      if (this.retryCount < this.maxRetry) {
        setTimeout(() => this.initialize(), 10000);
      }
    }
  }

  resetRetry() {
    this.retryCount = 0;
    console.log("[WA] Retry counter reset — ready to connect");
  }

  async sendMessage(nomor: string, pesan: string): Promise<WhatsAppResult> {
    if (!this.sock || !this.connected) {
      return { success: false, error: "WhatsApp not connected" };
    }
    try {
      const jid = this.formatJid(nomor);
      const result = await this.sock.sendMessage(jid, { text: pesan });
      const messageId = result?.key?.id || undefined;
      return { success: true, messageId };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  private formatJid(nomor: string): string {
    let cleaned = nomor.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
    if (!cleaned.startsWith("62")) cleaned = "62" + cleaned;
    return cleaned + "@s.whatsapp.net";
  }

  getQR(): string | null { return this.qr; }
  getQRDataUrl(): string | null { return this.qrDataUrl; }
  isConnected(): boolean { return this.connected; }
}

export const baileysProvider = new BaileysProvider();
