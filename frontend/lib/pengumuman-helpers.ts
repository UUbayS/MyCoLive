export type PengumumanKategori = "MENDESAK" | "PENTING" | "INFO" | "SAMBUTAN";

export type PengumumanTemplate = {
  id: string;
  label: string;
  icon: string;
  kategori: PengumumanKategori;
  judul: string;
  pesan: string;
};

export type PengumumanVariable = {
  key: string;
  label: string;
  description: string;
};

export const PENGUMUMAN_TEMPLATES: PengumumanTemplate[] = [
  {
    id: "pembayaran",
    label: "Info Pembayaran",
    icon: "💰",
    kategori: "PENTING",
    judul: "Info Pembayaran Kos Bulan {bulan}",
    pesan: `Halo {nama_penghuni},

Kami ingatkan bahwa pembayaran kos untuk kamar {nama_kamar} bulan {bulan} paling lambat tanggal 5 {bulan} {tahun}.

Mohon transfer ke rekening yang tertera di aplikasi MyCoLive. Terima kasih atas kerjasamanya! 🙏

— Pengelola {nama_properti}`,
  },
  {
    id: "maintenance",
    label: "Info Maintenance",
    icon: "🔧",
    kategori: "MENDESAK",
    judul: "Pemberitahuan Maintenance",
    pesan: `Halo {nama_penghuni},

Diberitahukan bahwa akan ada perbaikan/pemeliharaan fasilitas di {nama_properti}.
Mohon maaf atas ketidaknyamanannya. Terima kasih atas pengertiannya! 🙏

— Pengelola {nama_properti}`,
  },
  {
    id: "sambutan",
    label: "Sambutan Penghuni Baru",
    icon: "👋",
    kategori: "SAMBUTAN",
    judul: "Selamat Datang di {nama_properti}!",
    pesan: `Halo {nama_penghuni}! 👋

Selamat datang di {nama_properti}. Kami senang Anda telah memilih tinggal di tempat kami.

Info kamar Anda: {nama_kamar}
Pembayaran: via aplikasi MyCoLive

Semoga betah tinggal di sini! 😊

— Tim {nama_properti}`,
  },
  {
    id: "pengingat",
    label: "Pengingat Umum",
    icon: "📅",
    kategori: "INFO",
    judul: "Pengingat Penting",
    pesan: `Halo {nama_penghuni},

Kami ingin mengingatkan beberapa hal penting terkait {nama_properti}.

Terima kasih atas perhatian dan kerjasamanya! 🙏

— Pengelola {nama_properti}`,
  },
];

export const PENGUMUMAN_VARIABLES: PengumumanVariable[] = [
  { key: "{nama_penghuni}", label: "Nama Penghuni", description: "Nama penerima" },
  { key: "{nama_kamar}", label: "Nomor Kamar", description: "Kamar penerima" },
  { key: "{nama_properti}", label: "Nama Properti", description: "Nama kos" },
  { key: "{bulan}", label: "Bulan", description: "Bulan saat ini" },
  { key: "{tahun}", label: "Tahun", description: "Tahun saat ini" },
];

export const PENGUMUMAN_KATEGORI: { value: PengumumanKategori; label: string; icon: string; color: string }[] = [
  { value: "MENDESAK", label: "Mendesak", icon: "🚨", color: "red" },
  { value: "PENTING", label: "Penting", icon: "⚠️", color: "amber" },
  { value: "INFO", label: "Info Umum", icon: "ℹ️", color: "blue" },
  { value: "SAMBUTAN", label: "Sambutan", icon: "👋", color: "green" },
];

export const WA_CHAR_LIMIT = 1024;

export const SAMPLE_RECIPIENT = {
  nama: "Budi Santoso",
  kamar: "A-12",
  properti: "Kost Melati",
};

const BULAN_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const HARI_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export function formatTanggalID(date: Date): string {
  return `${HARI_ID[date.getDay()]}, ${date.getDate()} ${BULAN_ID[date.getMonth()]} ${date.getFullYear()}`;
}

export function renderPreview(
  judul: string,
  pesan: string,
  recipient: { nama: string; kamar: string; properti: string } = SAMPLE_RECIPIENT
): string {
  const bulan = BULAN_ID[new Date().getMonth()];
  const tahun = String(new Date().getFullYear());
  const tanggal = formatTanggalID(new Date());

  const vars: Record<string, string> = {
    nama_penghuni: recipient.nama,
    nama_kamar: recipient.kamar,
    nama_properti: recipient.properti,
    bulan,
    tahun,
  };

  const finalJudul = judul.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  const finalPesan = pesan.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

  return `📢 *${finalJudul}*\n\n${finalPesan}\n\n———————————————\n🏠 _MyCoLive_\n📅 ${tanggal}`;
}

export function insertAtCursor(
  currentText: string,
  cursorPos: number,
  insertion: string
): { newText: string; newCursorPos: number } {
  const newText = currentText.slice(0, cursorPos) + insertion + currentText.slice(cursorPos);
  return { newText, newCursorPos: cursorPos + insertion.length };
}
