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
  private connected = false;
  private initializing = false;

  async initialize() {
    if (this.initializing) return;
    this.initializing = true;
    console.log("[WA] Initializing...");

    try {
      const { state, saveCreds } = await useMultiFileAuthState("whatsapp-session");
      console.log("[WA] Auth state loaded, connecting...");

      this.sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: logger as any,
      });

      this.sock.ev.on("creds.update", saveCreds);

      this.sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
        if (qr) {
          this.qr = qr;
          const qrPath = path.resolve("qr.png");
          QRCode.toFile(qrPath, qr).then(() => {
            console.log(`[WA] QR saved → ${qrPath} — open and scan`);
          }).catch(() => {
            console.log("[WA] QR ready — scan with WhatsApp");
          });
        }
        if (connection === "open") {
          this.connected = true;
          this.qr = null;
          this.initializing = false;
          console.log("[WA] Connected");
        }
        if (connection === "close") {
          this.connected = false;
          this.initializing = false;
          const err = lastDisconnect?.error as any;
          const statusCode = err?.output?.statusCode;
          const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
          console.log("[WA] Disconnected — code:", statusCode, err?.message || "");
          if (shouldReconnect) {
            console.log("[WA] Reconnecting in 5s...");
            setTimeout(() => this.initialize(), 5000);
          } else {
            console.warn("[WA] Logged out — delete whatsapp-session/ and restart");
          }
        }
      });
    } catch (err) {
      this.initializing = false;
      console.error("[WA] Init error:", err);
      setTimeout(() => this.initialize(), 10000);
    }
  }

  async sendMessage(nomor: string, pesan: string): Promise<WhatsAppResult> {
    if (!this.sock || !this.connected) {
      return { success: false, error: "WhatsApp not connected" };
    }
    try {
      const jid = this.formatJid(nomor);
      await this.sock.sendMessage(jid, { text: pesan });
      return { success: true };
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
  isConnected(): boolean { return this.connected; }
}

export const baileysProvider = new BaileysProvider();
