import { apiFetch } from "./auth";

export type PropertiData = {
  id: string;
  nama: string;
  alamat: string;
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
  alamat: string;
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
