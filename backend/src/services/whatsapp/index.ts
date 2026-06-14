export interface WhatsAppResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface WhatsAppProvider {
  sendMessage(nomor: string, pesan: string): Promise<WhatsAppResult>;
}

export interface BroadcastResult {
  total_penerima: number;
  berhasil: number;
  gagal: number;
  detail: Array<{
    nomor: string;
    status: string;
    messageId?: string;
    error?: string;
  }>;
}

export interface PersonalizedRecipient {
  nomor: string;
  pesan: string;
}

function getProvider(): WhatsAppProvider {
  console.log("[WA] Using provider: baileys");
  return require("./providers/baileys").baileysProvider;
}

export async function sendWhatsAppBroadcast(
  nomorList: string[],
  pesan: string
): Promise<BroadcastResult> {
  const provider = getProvider();

  const detail: BroadcastResult["detail"] = [];
  let berhasil = 0;
  let gagal = 0;

  for (const nomor of nomorList) {
    const result = await provider.sendMessage(nomor, pesan);

    if (result.success) {
      berhasil++;
      detail.push({
        nomor,
        status: "terkirim",
        messageId: result.messageId,
      });
    } else {
      gagal++;
      detail.push({
        nomor,
        status: "gagal",
        error: result.error,
      });
    }
  }

  return {
    total_penerima: nomorList.length,
    berhasil,
    gagal,
    detail,
  };
}

export async function sendPersonalizedBroadcast(
  recipients: PersonalizedRecipient[]
): Promise<BroadcastResult> {
  const provider = getProvider();

  const detail: BroadcastResult["detail"] = [];
  let berhasil = 0;
  let gagal = 0;

  for (const { nomor, pesan } of recipients) {
    const result = await provider.sendMessage(nomor, pesan);

    if (result.success) {
      berhasil++;
      detail.push({
        nomor,
        status: "terkirim",
        messageId: result.messageId,
      });
    } else {
      gagal++;
      detail.push({
        nomor,
        status: "gagal",
        error: result.error,
      });
    }
  }

  return {
    total_penerima: recipients.length,
    berhasil,
    gagal,
    detail,
  };
}

export function isValidNomorWA(nomor: string): boolean {
  const cleaned = nomor.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 15;
}