import { WhatsAppProvider, WhatsAppResult } from "./index";

export class WhapiProvider implements WhatsAppProvider {
  private apiKey: string;
  private channelId: string;
  private baseUrl = "https://gate.whapi.cloud";

  constructor() {
    this.apiKey = process.env.WHATSAPP_API_KEY || "";
    this.channelId = process.env.WHATSAPP_CHANNEL_ID || "";
  }

  async sendMessage(nomor: string, pesan: string): Promise<WhatsAppResult> {
    if (!this.apiKey || !this.channelId) {
      console.warn("WhatsApp API not configured - skipping send");
      return {
        success: false,
        error: "WhatsApp provider not configured"
      };
    }

    try {
      const formattedNomor = this.formatNomor(nomor);
      
      const response = await fetch(`${this.baseUrl}/messages/text`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: formattedNomor,
          body: pesan
        })
      });

      const data = await response.json();

      if (data.id) {
        return {
          success: true,
          messageId: data.id
        };
      } else {
        return {
          success: false,
          error: data.message || "Failed to send message"
        };
      }
    } catch (error) {
      console.error("Whapi send error:", error);
      return {
        success: false,
        error: "Failed to send message"
      };
    }
  }

  private formatNomor(nomor: string): string {
    let cleaned = nomor.replace(/\D/g, "");
    
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.slice(1);
    }
    
    if (!cleaned.startsWith("62")) {
      cleaned = "62" + cleaned;
    }
    
    return cleaned;
  }
}