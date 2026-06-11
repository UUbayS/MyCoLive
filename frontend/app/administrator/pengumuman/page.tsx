"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Megaphone, Send, Check, AlertCircle } from "lucide-react";
import { getUser, isAuthenticated } from "../../../lib/auth";
import { getPropertiList, kirimPengumuman, PropertiData } from "../../../lib/api";
import MainLayout from "../../../components/Layout/MainLayout";
import PenghuniTabs from "@/components/PenghuniTabs";

const targetOptions = [
  { value: "ALL", label: "Semua User" },
  { value: "PENGHUNI", label: "Semua Penghuni" },
  { value: "PENGELOLA", label: "Semua Pengelola" },
  { value: "PENGHUNI_PROPERTI", label: "Penghuni di Properti Tertentu" },
  { value: "CUSTOM", label: "User Tertentu (Manual)" },
];

export default function PengumumanAdminPage() {
  const router = useRouter();
  const [propertiList, setPropertiList] = useState<PropertiData[]>([]);
  const [target, setTarget] = useState("PENGHUNI_PROPERTI");
  const [propertiId, setPropertiId] = useState("");
  const [judul, setJudul] = useState("");
  const [pesan, setPesan] = useState("");
  const [kirimWhatsapp, setKirimWhatsapp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{
    total_penerima: number;
    wa_berhasil: number;
    wa_gagal: number;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PEMILIK") {
      router.push("/public/katalog-properti");
      return;
    }

    const fetchProperti = async () => {
      try {
        const data = await getPropertiList();
        setPropertiList(data);
        if (data.length > 0) setPropertiId(data[0].id);
      } catch (err) {
        console.error("Failed to fetch properti:", err);
      }
    };

    fetchProperti();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(null);

    if (!judul.trim() || !pesan.trim()) {
      setError("Judul dan pesan wajib diisi");
      return;
    }

    if (target === "PENGHUNI_PROPERTI" && !propertiId) {
      setError("Pilih properti terlebih dahulu");
      return;
    }

    setLoading(true);
    try {
      const result = await kirimPengumuman({
        target: target as any,
        properti_id: target === "PENGHUNI_PROPERTI" ? propertiId : undefined,
        judul: judul.trim(),
        pesan: pesan.trim(),
        kirim_whatsapp: kirimWhatsapp,
      });

      if (result) {
        setSuccess(result);
        setJudul("");
        setPesan("");
      } else {
        setError("Gagal mengirim pengumuman. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim pengumuman.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>  
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <h1 className="md:hidden text-xl md:text-2xl font-bold text-gray-900 mb-2">Penghuni Properti</h1>
        <div className="hidden md:block items-center gap-3 mb-6">
          <Megaphone className="w-6 h-6 text-[#84CC16]" />
          <h1 className="text-xl font-semibold">Pengumuman Massal</h1>
        </div>
        <div className="md:hidden">
          <PenghuniTabs />
        </div>

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-5 h-5" />
              <span className="font-medium">Pengumuman berhasil dikirim!</span>
            </div>
            <p>Total penerima: {success.total_penerima}</p>
            <p>WA terkirim: {success.wa_berhasil}</p>
            <p>WA gagal: {success.wa_gagal}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Penerima
            </label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
            >
              {targetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {target === "PENGHUNI_PROPERTI" && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Properti
              </label>
              <select
                value={propertiId}
                onChange={(e) => setPropertiId(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
              >
                {propertiList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul
            </label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Informasi Penting"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pesan
            </label>
            <textarea
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Tulis pesan pengumuman di sini..."
              rows={5}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84CC16] resize-none"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={kirimWhatsapp}
                onChange={(e) => setKirimWhatsapp(e.target.checked)}
                className="w-5 h-5 accent-[#84CC16]"
              />
              <span className="text-sm text-gray-700">
                Juga kirim melalui WhatsApp
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              "Mengirim..."
            ) : (
              <>
                <Send className="w-5 h-5" />
                Kirim Pengumuman
              </>
            )}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
