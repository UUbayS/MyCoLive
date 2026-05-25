import { apiFetch } from "./auth";

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
  fasilitas?: string[];
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

export type FasilitasData = {
  id: string;
  nama: string;
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
    fasilitas?: string[];
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
    fasilitas?: string[];
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

export async function getFasilitasList(): Promise<FasilitasData[]> {
  try {
    const res = await apiFetch<{ status: string; data: FasilitasData[] }>("/api/fasilitas");
    return res.data || [];
  } catch {
    return [];
  }
}

export async function createFasilitas(nama: string): Promise<FasilitasData | null> {
  try {
    const res = await apiFetch<{ status: string; data: FasilitasData }>("/api/fasilitas", {
      method: "POST",
      body: JSON.stringify({ nama }),
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

export async function updateProfile(
  userId: string,
  data: {
    nama: string;
    email: string;
    no_telepon?: string | null;
  }
): Promise<ProfileData | null> {
  try {
    const res = await apiFetch<{ status: string; data: ProfileData }>("/api/users/" + userId, {
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

export type PembayaranData = {
  id: string;
  metode_bayar: string;
  bukti?: string;
  status: string;
  tgl_bayar?: string;
  created_at: string;
};

export type AdminSettingsData = {
  id: string;
  nama_rekening?: string | null;
  nomor_rekening?: string | null;
  bank?: string | null;
  qris_image?: string | null;
};

export async function createPemesanan(data: {
  kamar_id: string;
  durasi_sewa: number;
  tgl_masuk: string;
  metode_bayar: string;
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

export async function getTempatPembayaran(): Promise<AdminSettingsData | null> {
  try {
    const res = await apiFetch<{ status: string; data: AdminSettingsData | null }>("/api/tempatpembayaran");
    return res.data || null;
  } catch {
    return null;
  }
}

export async function updateTempatPembayaran(data: {
  nama_rekening?: string | null;
  nomor_rekening?: string | null;
  bank?: string | null;
  qris_image?: string | null;
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

export async function checkoutPenghuni(id: string): Promise<PenghuniData | null> {
  try {
    const res = await apiFetch<{ status: string; data: PenghuniData }>("/api/penghuni/" + id + "/checkout", {
      method: "PUT",
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
