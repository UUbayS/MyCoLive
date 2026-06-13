"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useToast } from "../../../../lib/ToastContext";
import { ArrowLeft, CreditCard, QrCode, AlertCircle } from "lucide-react";
import TarifSelector from "../../../../components/TarifSelector";
import { getUser, isAuthenticated } from "../../../../lib/auth";
import { getKamarById, createPemesanan, getPembayaranInfoByProperti, KamarData, AdminSettingsData } from "../../../../lib/api";
import MainLayout from "../../../../components/Layout/MainLayout";

export default function PesanKamarPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const kamarId = params.id as string;

  const [kamar, setKamar] = useState<KamarData | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<AdminSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const durasiQuery = searchParams.get("durasi");
  const [selectedDuration, setSelectedDuration] = useState(durasiQuery || "1_bulan");
  const [tglMasuk, setTglMasuk] = useState("");
  const [metodeBayar, setMetodeBayar] = useState<"TRANSFER" | "QRIS">("TRANSFER");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { success, error } = useToast();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PENGHUNI") {
      router.push("/public/katalog-properti");
      return;
    }

    if (!kamarId) return;

    const fetchData = async () => {
      try {
        const kamarData = await getKamarById(kamarId);
        setKamar(kamarData);

        // Fetch payment info dari endpoint terproteksi
        if (kamarData?.properti?.id) {
          const paymentData = await getPembayaranInfoByProperti(kamarData.properti.id);
          setPaymentInfo(paymentData);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kamarId, router]);

  const tarif = (typeof kamar?.tarif === "object" && kamar?.tarif ? kamar.tarif : {}) as Record<string, number>;
  const totalBayar = tarif[selectedDuration] || 0;

  const hasPaymentInfo = paymentInfo && (
    paymentInfo.nama_rekening ||
    paymentInfo.nomor_rekening ||
    paymentInfo.bank ||
    paymentInfo.qris_image
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedDuration) newErrors.durasi = "Pilih durasi sewa";
    if (!tglMasuk) newErrors.tglMasuk = "Pilih tanggal masuk";
    if (!metodeBayar) newErrors.metode = "Pilih metode pembayaran";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const durasi = parseInt(selectedDuration.split("_")[0]);
      const result = await createPemesanan({
        kamar_id: kamarId,
        durasi_sewa: durasi,
        tgl_masuk: tglMasuk,
        metode_bayar: metodeBayar,
      });

      if (result) {
        router.push(`/penghuni/transaksi/${result.id}`);
      } else {
        error("Gagal membuat pesanan. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Create pemesanan error:", err);
      error("Terjadi kesalahan saat membuat pesanan.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-40 bg-gray-200 rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  if (!kamar) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">Kamar tidak ditemukan</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold">Pesan Kamar</h1>
            <p className="text-sm text-gray-500">
              {kamar.properti?.nama} — Kamar {kamar.nomor}
            </p>
          </div>
        </div>

        {!hasPaymentInfo && (
          <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-xl text-yellow-700 text-sm mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Pengurus belum mengatur informasi pembayaran. Anda tidak dapat melanjutkan pemesanan.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Durasi Sewa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durasi Sewa
            </label>
            <TarifSelector
              tarif={tarif}
              selectedDuration={selectedDuration}
              onSelect={setSelectedDuration}
            />
            {errors.durasi && <p className="text-xs text-red-500 mt-1">{errors.durasi}</p>}
          </div>

          {/* Tanggal Masuk */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Masuk
            </label>
            <input
              type="date"
              value={tglMasuk}
              onChange={(e) => setTglMasuk(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] ${
                errors.tglMasuk ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.tglMasuk && <p className="text-xs text-red-500 mt-1">{errors.tglMasuk}</p>}
          </div>

          {/* Metode Pembayaran */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Metode Pembayaran
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMetodeBayar("TRANSFER")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-colors ${
                  metodeBayar === "TRANSFER"
                    ? "border-[#84CC16] bg-[#84CC16]/5 text-[#84CC16]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium">Transfer Bank</span>
              </button>
              <button
                type="button"
                onClick={() => setMetodeBayar("QRIS")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-colors ${
                  metodeBayar === "QRIS"
                    ? "border-[#84CC16] bg-[#84CC16]/5 text-[#84CC16]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span className="text-sm font-medium">QRIS</span>
              </button>
            </div>
            {errors.metode && <p className="text-xs text-red-500 mt-1">{errors.metode}</p>}
          </div>

          {/* Total Bayar */}
          <div className="flex items-center justify-between p-4 bg-[#84CC16]/5 rounded-xl border border-[#84CC16]/20">
            <span className="text-sm font-medium text-gray-700">Total Bayar</span>
            <span className="text-xl font-bold text-[#84CC16]">
              Rp {totalBayar.toLocaleString("id-ID")}
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting || !hasPaymentInfo}
            className="w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Memproses..." : "Buat Pesanan"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
