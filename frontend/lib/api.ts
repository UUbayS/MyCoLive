import { apiFetch } from "./auth";

export type FasilitasData = {
  id: string;
  nama: string;
  jenis: "RUANGAN" | "UMUM";
  created_at?: string;
};

export type PropertiData = {
  id: string;
  nama: string;
  alamat: string;
  provinsi?: string;
  kota?: string;
  kecamatan?: string;
  kode_pos?: string;
  detail_alamat?: string;
  jenis?: string;
  deskripsi?: string;
  kebijakan?: string;
  gambar?: string[];
  total_kamar?: number;
  kamar_kosong?: number;
  fasilitas_umum?: FasilitasData[];
  admin?: {
    id: string;
    nama: string;
    no_telepon?: string;
  };
  kamar?: KamarData[];
};

export type KamarData = {
  id: string;
  nomor: string;
  tipe: string;
  luas?: string;
  fasilitas_ruangan?: FasilitasData[];
  deskripsi?: string;
  tarif?: Record<string, number>;
  gambar?: string[];
  status: string;
  properti_id: string;
  properti?: {
    id: string;
    nama: string;
    alamat: string;
    admin?: {
      settings?: AdminSettingsData | null;
    };
  };
  penghuni?: {
    id: string;
    user: {
      id: string;
      nama: string;
      email: string;
      no_telepon?: string;
    };
    tgl_mulai: string;
    tgl_berakhir?: string;
  };
};

export async function getKatalogProperti(): Promise<PropertiData[]> {
  try {
    const res = await apiFetch<{ status: string; data: PropertiData[] }>("/api/katalog");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function getPropertiById(id: string): Promise<PropertiData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PropertiData }>("/api/katalog/" + id);
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getPropertiList(): Promise<PropertiData[]> {
  try {
    const res = await apiFetch<{ status: string; data: PropertiData[] }>("/api/properti");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function createProperti(data: {
  nama: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  kode_pos: string;
  detail_alamat: string;
  jenis: string;
  deskripsi?: string;
  kebijakan?: string;
  gambar?: string[];
  fasilitas_umum_ids?: string[];
}): Promise<PropertiData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PropertiData }>("/api/properti", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function deleteProperti(id: string): Promise<boolean> {
  try {
    await apiFetch<{ status: string }>("/api/properti/" + id, {
      method: "DELETE",
    });
    return true;
  } catch {
    return false;
  }
}

export async function updateProperti(
  id: string,
  data: {
    nama: string;
    provinsi: string;
    kota: string;
    kecamatan: string;
    kode_pos: string;
    detail_alamat: string;
    jenis: string;
    deskripsi?: string;
    kebijakan?: string;
    gambar?: string[];
    fasilitas_umum_ids?: string[];
  }
): Promise<PropertiData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PropertiData }>(
      "/api/properti/" + id,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getKamarByProperti(propertiId: string): Promise<KamarData[]> {
  try {
    const res = await apiFetch<{ status: string; data: KamarData[] }>(
      "/api/properti/" + propertiId + "/kamar"
    );
    return res.data || [];
  } catch {
    return [];
  }
}

export async function getKamarById(id: string): Promise<KamarData | null> {
  try {
    const res = await apiFetch<{ status: string; data: KamarData }>("/api/kamar/" + id);
    return res.data || null;
  } catch {
    return null;
  }
}

export async function createKamar(
  propertiId: string,
  data: {
    nomor: string;
    tipe?: string;
    luas?: string;
    fasilitas_ids?: string[];
    deskripsi?: string;
    tarif?: Record<string, number>;
    foto?: string[];
  }
): Promise<KamarData | null> {
  try {
    const res = await apiFetch<{ status: string; data: KamarData }>(
      "/api/properti/" + propertiId + "/kamar",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return res.data || null;
  } catch {
    return null;
  }
}

export async function deleteKamar(id: string): Promise<boolean> {
  try {
    await apiFetch<{ status: string }>("/api/kamar/" + id, {
      method: "DELETE",
    });
    return true;
  } catch {
    return false;
  }
}

export async function updateKamarStatus(id: string, status: string): Promise<KamarData | null> {
  try {
    const res = await apiFetch<{ status: string; data: KamarData }>("/api/kamar/" + id, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function updateKamar(
  id: string,
  data: {
    nomor?: string;
    tipe?: string;
    luas?: string;
    fasilitas_ids?: string[];
    deskripsi?: string;
    tarif?: Record<string, number>;
    foto?: string[];
    status?: string;
  }
): Promise<KamarData | null> {
  try {
    const res = await apiFetch<{ status: string; data: KamarData }>("/api/kamar/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getFasilitasList(jenis?: "RUANGAN" | "UMUM"): Promise<FasilitasData[]> {
  try {
    const query = jenis ? `?jenis=${jenis}` : "";
    const res = await apiFetch<{ status: string; data: FasilitasData[] }>("/api/fasilitas" + query);
    return res.data || [];
  } catch {
    return [];
  }
}

export async function createFasilitas(nama: string, jenis: "RUANGAN" | "UMUM"): Promise<FasilitasData | null> {
  try {
    const res = await apiFetch<{ status: string; data: FasilitasData }>("/api/fasilitas", {
      method: "POST",
      body: JSON.stringify({ nama, jenis }),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function deleteFasilitas(id: string): Promise<boolean> {
  try {
    await apiFetch<{ status: string }>("/api/fasilitas/" + id, {
      method: "DELETE",
    });
    return true;
  } catch {
    return false;
  }
}

export type ProfileData = {
  id: string;
  username: string;
  email: string;
  nama: string;
  role: string;
  no_telepon?: string | null;
  created_at?: string;
};

export async function getProfile(): Promise<ProfileData | null> {
  try {
    const res = await apiFetch<{ status: string; data: ProfileData }>("/api/auth/me");
    return res.data || null;
  } catch {
    return null;
  }
}

export async function updateProfile(data: {
  nama: string;
  email: string;
  no_telepon?: string | null;
}): Promise<ProfileData | null> {
  try {
    const res = await apiFetch<{ status: string; data: ProfileData }>("/api/auth/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ status: string; message: string } | null> {
  try {
    const res = await apiFetch<{ status: string; message: string }>("/api/auth/change-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return res;
  } catch (error: any) {
    throw error;
  }
}

export async function resetUserPassword(
  userId: string,
  newPassword: string
): Promise<{ status: string; message: string } | null> {
  try {
    const res = await apiFetch<{ status: string; message: string }>(
      `/api/users/${userId}/reset-password`,
      {
        method: "PUT",
        body: JSON.stringify({ newPassword }),
      }
    );
    return res;
  } catch (error: any) {
    throw error;
  }
}

// ─── PEMESANAN & PEMBAYARAN ───

export type PemesananData = {
  id: string;
  durasi_sewa: number;
  tgl_masuk: string;
  metode_bayar: string;
  total_bayar: number;
  status: string;
  created_at: string;
  kamar_id: string;
  kamar?: {
    id: string;
    nomor: string;
    tarif?: Record<string, number>;
  };
  properti_id: string;
  properti?: {
    id: string;
    nama: string;
    alamat: string;
    admin?: {
      settings?: AdminSettingsData | null;
    };
  };
  penghuni?: {
    id: string;
    user: {
      id: string;
      nama: string;
      email: string;
      no_telepon?: string;
    };
  };
  pembayaran?: PembayaranData;
};

export type BankAccount = {
  id: string;
  nama_rekening: string;
  nomor_rekening: string;
  bank: string;
  created_at?: string;
  updated_at?: string;
};

export type PembayaranData = {
  id: string;
  metode_bayar: string;
  bukti?: string;
  status: string;
  tgl_bayar?: string;
  created_at: string;
  bank_account?: BankAccount | null;
};

export type AdminSettingsData = {
  id: string;
  qris_image?: string | null;
  bank_accounts: BankAccount[];
};

export async function createPemesanan(data: {
  kamar_id: string;
  durasi_sewa: number;
  tgl_masuk: string;
  metode_bayar: string;
  bank_account_id?: string;
}): Promise<PemesananData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PemesananData }>("/api/pemesanan", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getMyPemesanan(): Promise<PemesananData[]> {
  try {
    const res = await apiFetch<{ status: string; data: PemesananData[] }>("/api/pemesanan/my");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function getPemesananById(id: string): Promise<PemesananData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PemesananData }>("/api/pemesanan/" + id);
    return res.data || null;
  } catch {
    return null;
  }
}

export async function uploadBuktiBayar(id: string, bukti: string): Promise<PembayaranData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PembayaranData }>("/api/pemesanan/" + id + "/bayar", {
      method: "POST",
      body: JSON.stringify({ bukti }),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function batalkanPemesanan(id: string): Promise<PemesananData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PemesananData }>("/api/pemesanan/" + id + "/batalkan", {
      method: "POST",
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getTempatPembayaran(): Promise<AdminSettingsData | null> {
  try {
    const res = await apiFetch<{ status: string; data: AdminSettingsData | null }>("/api/tempatpembayaran");
    return res.data || null;
  } catch {
    return null;
  }
}

export async function updateTempatPembayaran(data: {
  qris_image?: string | null;
  bank_accounts: { nama_rekening: string; nomor_rekening: string; bank: string }[];
}): Promise<AdminSettingsData | null> {
  try {
    const res = await apiFetch<{ status: string; data: AdminSettingsData }>("/api/tempatpembayaran", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getPembayaranInfoByProperti(propertiId: string): Promise<AdminSettingsData | null> {
  try {
    const res = await apiFetch<{ status: string; data: AdminSettingsData | null; message?: string }>(
      "/api/tempatpembayaran/" + propertiId
    );
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── PENGHUNI MANAGEMENT ───

export type PenghuniData = {
  id: string;
  tgl_mulai: string;
  tgl_berakhir?: string | null;
  status_sewa: string;
  status_display: string;
  kamar: {
    id: string;
    nomor: string;
    properti: string;
    alamat: string;
  } | null;
  user: {
    id: string;
    username: string;
    nama: string;
    email: string;
    no_telepon?: string | null;
    created_at: string;
  };
};

export async function getPenghuniList(status?: string, properti_id?: string): Promise<PenghuniData[]> {
  try {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (properti_id) params.append("properti_id", properti_id);
    const query = params.toString() ? "?" + params.toString() : "";
    const res = await apiFetch<{ status: string; data: PenghuniData[] }>("/api/penghuni" + query);
    return res.data || [];
  } catch {
    return [];
  }
}

export type MyPenghuniData = {
  id: string;
  tgl_mulai: string;
  tgl_berakhir?: string | null;
  status_sewa: string;
  kamar: {
    id: string;
    nomor: string;
    tipe: string;
    luas?: string | null;
    fasilitas_ruangan?: FasilitasData[];
    deskripsi?: string | null;
    tarif?: Record<string, number>;
    gambar?: string[];
    properti: {
      id: string;
      nama: string;
      alamat: string;
      provinsi?: string | null;
      kota?: string | null;
      kecamatan?: string | null;
      kode_pos?: string | null;
      detail_alamat?: string | null;
    };
  } | null;
  user: {
    id: string;
    username: string;
    nama: string;
    email: string;
    no_telepon?: string | null;
  };
};

export async function getMyPenghuni(): Promise<MyPenghuniData | null> {
  try {
    const res = await apiFetch<{ status: string; data: MyPenghuniData }>("/api/penghuni/me");
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getPenghuniById(id: string): Promise<PenghuniData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PenghuniData }>("/api/penghuni/" + id);
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── PEMESANAN ADMIN ───

export async function getAllPemesanan(): Promise<PemesananData[]> {
  try {
    const res = await apiFetch<{ status: string; data: PemesananData[] }>("/api/pemesanan");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function verifikasiPemesanan(id: string, status: "DITERIMA" | "DITOLAK"): Promise<PemesananData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PemesananData }>("/api/pemesanan/" + id + "/verifikasi", {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function createPerpanjangPemesanan(data: {
  durasi_sewa: number;
  tgl_masuk: string;
  metode_bayar: string;
  bank_account_id?: string;
}): Promise<PemesananData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PemesananData }>("/api/pemesanan/perpanjang", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── KOMPLAIN ───

export type KomplainData = {
  id: string;
  masalah: string;
  jenis: string;
  deskripsi: string;
  foto?: string | null;
  status: string;
  created_at: string;
  updated_at?: string;
  penghuni?: {
    id: string;
    user: {
      nama: string;
      email: string;
      no_telepon?: string | null;
    };
  };
  properti?: {
    id: string;
    nama: string;
    alamat: string;
  };
};

export async function getKomplainList(): Promise<KomplainData[]> {
  try {
    const res = await apiFetch<{ status: string; data: KomplainData[] }>("/api/komplain");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function checkoutPenghuni(id: string, alasan?: string): Promise<PenghuniData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PenghuniData }>("/api/penghuni/" + id + "/checkout", {
      method: "PUT",
      body: JSON.stringify({ alasan }),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getKomplainById(id: string): Promise<KomplainData | null> {
  try {
    const res = await apiFetch<{ status: string; data: KomplainData }>("/api/komplain/" + id);
    return res.data || null;
  } catch {
    return null;
  }
}

export async function updateKomplainStatus(id: string, status: "DIPROSES" | "SELESAI"): Promise<KomplainData | null> {
  try {
    const res = await apiFetch<{ status: string; data: KomplainData }>("/api/komplain/" + id, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── KEUANGAN ───

export type TransaksiItem = {
  id: string;
  tipe: "PEMASUKAN" | "PENGELUARAN" | "PIUTANG";
  nama: string;
  tanggal: string;
  status_badge: string;
  jumlah: number;
  properti_nama: string;
  kamar_nomor?: string | null;
  kuitansi_id?: string | null;
  detail_info?: string;
};

export type KeuanganSummary = {
  total_pendapatan: number;
  total_pengeluaran: number;
  total_bersih: number;
};

export type KeuanganData = {
  summary: KeuanganSummary;
  transaksi: TransaksiItem[];
};

export type KuitansiDetail = {
  id: string;
  nomor_kuitansi: string | null;
  nama: string;
  properti_nama: string;
  alamat: string;
  kamar_nomor: string;
  durasi: number;
  metode_bayar: string;
  jumlah: number;
  tgl_bayar: string;
  status: string;
  bukti?: string | null;
  no_telepon_admin: string | null;
};

export async function getKeuanganTransaksi(
  propertiId?: string,
  tipe?: string,
  search?: string
): Promise<KeuanganData | null> {
  try {
    const params = new URLSearchParams();
    if (propertiId) params.append("properti_id", propertiId);
    if (tipe) params.append("tipe", tipe);
    if (search) params.append("search", search);
    const query = params.toString() ? "?" + params.toString() : "";
    const res = await apiFetch<{ status: string; data: KeuanganData }>("/api/keuangan/transaksi" + query);
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getKuitansiDetail(id: string): Promise<KuitansiDetail | null> {
  try {
    const res = await apiFetch<{ status: string; data: KuitansiDetail }>("/api/keuangan/kuitansi/" + id);
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── USERS ───

export type OperatorUserData = {
  id: string;
  username: string;
  email: string;
  nama: string;
  role: string;
  no_telepon?: string | null;
  created_at: string;
  operator?: {
    id: string;
    properti_id: string;
    properti: {
      id: string;
      nama: string;
    };
  }[];
  properti?: {
    id: string;
    nama: string;
  }[];
};

export async function getUserList(): Promise<OperatorUserData[]> {
  try {
    const res = await apiFetch<{ status: string; data: OperatorUserData[] }>("/api/users");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    await apiFetch<{ status: string }>("/api/users/" + id, {
      method: "DELETE",
    });
    return true;
  } catch {
    return false;
  }
}

export async function createOperator(data: {
  username: string;
  nama: string;
  email: string;
  no_telepon?: string | null;
  password: string;
  properti_ids: string[];
}): Promise<OperatorUserData | null> {
  try {
    const res = await apiFetch<{ status: string; data: OperatorUserData }>("/api/users", {
      method: "POST",
      body: JSON.stringify({ ...data, role: "PENGELOLA" }),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── PENGAJUAN DANA ───

export type PengajuanDanaData = {
  id: string;
  tujuan: string;
  jumlah: number;
  no_rekening: string;
  foto?: string | null;
  status: string;
  created_at: string;
  updated_at?: string;
  operator_id: string;
  operator?: {
    id: string;
    user: {
      nama: string;
      email: string;
      no_telepon?: string | null;
    };
  };
  properti?: {
    id: string;
    nama: string;
    alamat: string;
  };
};

export async function getPengajuanDanaList(): Promise<PengajuanDanaData[]> {
  try {
    const res = await apiFetch<{ status: string; data: PengajuanDanaData[] }>("/api/dana");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function updatePengajuanDanaStatus(id: string, status: "DITERIMA" | "DITOLAK"): Promise<PengajuanDanaData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PengajuanDanaData }>("/api/dana/" + id, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getMyDanaList(): Promise<PengajuanDanaData[]> {
  try {
    const res = await apiFetch<{ status: string; data: PengajuanDanaData[] }>("/api/dana/my");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function createPengajuanDana(data: {
  jumlah: number;
  tujuan: string;
  no_rekening: string;
  foto?: string | null;
  properti_id: string;
}): Promise<PengajuanDanaData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PengajuanDanaData }>("/api/dana", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── PENGAJUAN CHECKOUT ───

export type PengajuanCheckoutData = {
  id: string;
  keterangan?: string | null;
  status: string;
  created_at: string;
  updated_at?: string;
  penghuni_id: string;
  kamar_id: string;
  properti_id: string;
  admin_id?: string | null;
  penghuni?: {
    id: string;
    user: {
      id: string;
      nama: string;
      email: string;
      no_telepon?: string | null;
    };
  };
  kamar?: {
    id: string;
    nomor: string;
  };
  properti?: {
    id: string;
    nama: string;
  };
  admin?: {
    id: string;
    nama: string;
  };
};

export async function createPengajuanCheckout(data: { keterangan?: string }): Promise<PengajuanCheckoutData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PengajuanCheckoutData }>("/api/penghuni/checkout", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function getPengajuanCheckoutList(): Promise<PengajuanCheckoutData[]> {
  try {
    const res = await apiFetch<{ status: string; data: PengajuanCheckoutData[] }>("/api/penghuni/checkout/pengajuan");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function processPengajuanCheckout(
  id: string,
  status: "DITERIMA" | "DITOLAK",
  keterangan?: string
): Promise<any> {
  try {
    const res = await apiFetch<{ status: string; data: any; message: string }>("/api/penghuni/checkout/" + id, {
      method: "PUT",
      body: JSON.stringify({ status, keterangan }),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── NOTIFIKASI ───

export type NotifikasiData = {
  id: string;
  user_id: string;
  judul: string;
  pesan: string;
  is_read: boolean;
  tipe?: string | null;
  related_id?: string | null;
  created_at: string;
  updated_at?: string;
};

export async function getNotifikasiList(): Promise<NotifikasiData[]> {
  try {
    const res = await apiFetch<{ status: string; data: NotifikasiData[] }>("/api/notifikasi");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function markNotifikasiAsRead(id: string): Promise<NotifikasiData | null> {
  try {
    const res = await apiFetch<{ status: string; data: NotifikasiData }>("/api/notifikasi/" + id + "/read", {
      method: "PUT",
    });
    return res.data || null;
  } catch {
    return null;
  }
}

export async function markAllNotifikasiAsRead(): Promise<{ count: number } | null> {
  try {
    const res = await apiFetch<{ status: string; data: { count: number } }>("/api/notifikasi/read-all", {
      method: "PUT",
    });
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── PENGUMUMAN ───

export type PengumumanTarget = "ALL" | "PENGHUNI" | "PENGELOLA" | "PENGHUNI_PROPERTI" | "CUSTOM";

export type PengumumanResult = {
  total_penerima: number;
  wa_berhasil: number;
  wa_gagal: number;
  inapp_berhasil: number;
};

export async function kirimPengumuman(data: {
  target: PengumumanTarget;
  properti_id?: string;
  user_ids?: string[];
  judul: string;
  pesan: string;
  kirim_whatsapp?: boolean;
}): Promise<PengumumanResult | null> {
  try {
    const res = await apiFetch<{ status: string; data: PengumumanResult }>("/api/pengumuman", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data || null;
  } catch {
    return null;
  }
}

// ─── WHATSAPP ───

export type WhatsAppStatus = {
  connected: boolean;
  qr: string | null;
};

export async function getWhatsappStatus(): Promise<WhatsAppStatus | null> {
  try {
    const res = await apiFetch<{ status: string; data: WhatsAppStatus }>("/api/whatsapp/status");
    return res.data || null;
  } catch {
    return null;
  }
}

export async function connectWhatsapp(): Promise<{ message: string } | null> {
  try {
    const res = await apiFetch<{ status: string; message: string }>("/api/whatsapp/connect", {
      method: "POST",
    });
    return res;
  } catch {
    return null;
  }
}

export async function disconnectWhatsapp(): Promise<{ message: string } | null> {
  try {
    const res = await apiFetch<{ status: string; message: string }>("/api/whatsapp/disconnect", {
      method: "POST",
    });
    return res;
  } catch {
    return null;
  }
}
