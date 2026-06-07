"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BedDouble,
  MapPin,
  Calendar,
  MessageCircle,
  LogOut,
  CreditCard,
  ChevronLeft,
  Loader2,
  AlertTriangle,
  Home,
  Wifi,
  ShowerHead,
  Wind,
  Tv,
  Flame,
  Check,
  HelpCircle,
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import ImageCarousel from "@/components/ImageCarousel";
import { getUser, isAuthenticated } from "@/lib/auth";
import {
  getMyPenghuni,
  MyPenghuniData,
  getMyPemesanan,
  PemesananData,
  createPerpanjangPemesanan,
} from "@/lib/api";

const fasilitasIcon: Record<string, typeof Home> = {
  AC: Wind,
  "WiFi": Wifi,
  "Kamar Mandi": ShowerHead,
  "TV": Tv,
  "Dapur": Flame,
  "Laundry": Home,
};

function getFasilitasIcon(name: string) {
  return fasilitasIcon[name] || HelpCircle;
}

function formatWAPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) return "62" + cleaned.slice(1);
  if (cleaned.startsWith("62")) return cleaned;
  if (cleaned.startsWith("+")) return cleaned.slice(1);
  return "62" + cleaned;
}

function daysUntil(dateStr: string | null | undefined): number | null {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function KamarSayaPage() {
  const router = useRouter();
  const [penghuni, setPenghuni] = useState<MyPenghuniData | null>(null);
  const [pemesananList, setPemesananList] = useState<PemesananData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showPerpanjangModal, setShowPerpanjangModal] = useState(false);
  const [perpanjangLoading, setPerpanjangLoading] = useState(false);
  const [selectedDurasi, setSelectedDurasi] = useState("");
  const [selectedMetode, setSelectedMetode] = useState("TRANSFER");

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

    const fetchData = async () => {
      try {
        const [penghuniData, pemesananData] = await Promise.all([
          getMyPenghuni(),
          getMyPemesanan(),
        ]);
        setPenghuni(penghuniData);
        setPemesananList(pemesananData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleCheckout = () => {
    alert("Pengajuan check-out telah dikirim. Admin akan menghubungi Anda.");
    setShowCheckoutModal(false);
  };

  const handlePerpanjang = async () => {
    if (!selectedDurasi || !penghuni?.tgl_berakhir) return;

    setPerpanjangLoading(true);
    try {
      const tglMasuk = new Date(penghuni.tgl_berakhir);
      const today = new Date();
      if (tglMasuk < today) {
        tglMasuk.setTime(today.getTime());
      }

      const newPemesanan = await createPerpanjangPemesanan({
        durasi_sewa: parseInt(selectedDurasi),
        tgl_masuk: tglMasuk.toISOString(),
        metode_bayar: selectedMetode,
      });

      if (newPemesanan) {
        router.push(`/penghuni/transaksi/${newPemesanan.id}`);
      } else {
        alert("Gagal membuat pemesanan perpanjang");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    } finally {
      setPerpanjangLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-6 animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-24 bg-gray-200 rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  if (!penghuni?.kamar) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-gray-500">
          <Home className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <h1 className="text-xl font-semibold mb-1">Belum Memiliki Kamar</h1>
          <p className="text-sm mb-4">Anda belum memiliki kamar. Silakan pesan kamar dari katalog properti.</p>
          <Link
            href="/public/katalog-properti"
            className="inline-flex items-center gap-2 bg-[#84CC16] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#73b814] transition-colors"
          >
            <BedDouble className="w-4 h-4" />
            Lihat Katalog Properti
          </Link>
        </div>
      </MainLayout>
    );
  }

  const kamar = penghuni.kamar;
  const properti = kamar.properti;
  const waNumber = formatWAPhone(penghuni.user.no_telepon);
  const remainingDays = daysUntil(penghuni.tgl_berakhir);
  const isActive = penghuni.status_sewa === "AKTIF";
  const hasPending = pemesananList.some((p) => p.status === "MENUNGGU" || (p.pembayaran?.status || "").startsWith("DIVERIFIKASI"));
  const showWarning = remainingDays !== null && remainingDays <= 30;
  const showPayButton = isActive && !hasPending && showWarning;

  const tarifOptions = kamar.tarif
    ? Object.entries(kamar.tarif)
        .filter(([key]) => key.endsWith("_bulan"))
        .map(([key, value]) => ({
          durasi: parseInt(key.replace("_bulan", "")),
          harga: value as number,
        }))
        .sort((a, b) => a.durasi - b.durasi)
    : [];

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Kamar Saya</h1>

        {/* Card Kamar */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <ImageCarousel images={kamar.gambar || []} alt={properti.nama} height="h-56" />

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{properti.nama}</h2>
            <div className="flex items-start gap-1 text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                {[properti.detail_alamat, properti.kecamatan ? `Kec. ${properti.kecamatan}` : null, properti.kota, properti.provinsi]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-[#84CC16]/10 text-[#84CC16] text-xs font-medium rounded-full">
                {kamar.tipe}
              </span>
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Kamar {kamar.nomor}
              </span>
              {kamar.luas && (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  {kamar.luas} m²
                </span>
              )}
            </div>

            {kamar.fasilitas && kamar.fasilitas.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {kamar.fasilitas.map((f) => {
                  const Icon = getFasilitasIcon(f);
                  return (
                    <span key={f} className="flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg">
                      <Icon className="w-3.5 h-3.5" />
                      {f}
                    </span>
                  );
                })}
              </div>
            )}

            {kamar.deskripsi && <p className="text-sm text-gray-500 mb-3">{kamar.deskripsi}</p>}
          </div>
        </div>

        {/* Info Sewa */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Informasi Sewa
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-400 shrink-0">Mulai Sewa:</span>
              <span className="font-medium">
                {new Date(penghuni.tgl_mulai).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            {penghuni.tgl_berakhir && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-400 shrink-0">Berakhir:</span>
                <span className="font-medium">
                  {new Date(penghuni.tgl_berakhir).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            )}
            {remainingDays !== null && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-400 shrink-0">Sisa:</span>
                <span className={`font-medium ${remainingDays <= 14 ? "text-red-600" : remainingDays <= 30 ? "text-yellow-600" : "text-gray-900"}`}>
                  {remainingDays} hari
                </span>
              </div>
            )}
          </div>

          {/* Warning */}
          {showWarning && (
            <div className={`mt-3 p-3 rounded-lg flex items-start gap-2 text-sm ${remainingDays <= 14 ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-700"}`}>
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                {remainingDays <= 14
                  ? "Segera perpanjang! Sewa berakhir dalam " + remainingDays + " hari."
                  : "Sewa berakhir dalam " + remainingDays + " hari. Jangan lupa perpanjang."}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {waNumber && (
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 flex-1 py-3 bg-[#25D366] text-white text-sm font-medium rounded-xl hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat WhatsApp
            </a>
          )}
          {isActive && (
            <button
              onClick={() => setShowCheckoutModal(true)}
              className="flex items-center justify-center gap-2 flex-1 py-3 border-2 border-red-500 text-red-500 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Ajukan Check-out
            </button>
          )}
        </div>

        {showPayButton && (
          <button
            onClick={() => setShowPerpanjangModal(true)}
            className="w-full mt-3 flex items-center justify-center gap-2 py-3 bg-[#84CC16] text-white text-sm font-medium rounded-xl hover:bg-[#73b814] transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Bayar Sewa Sekarang
          </button>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowCheckoutModal(false)}>
          <div className="bg-white rounded-xl w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-2">Konfirmasi Check-out</h3>
            <p className="text-sm text-gray-500 mb-5">
              Ajukan check-out dari kamar ini? Admin akan memproses pengajuan Anda dalam 1x24 jam.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setShowCheckoutModal(false)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button onClick={handleCheckout} className="flex-1 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                Ya, Ajukan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Perpanjang Modal */}
      {showPerpanjangModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowPerpanjangModal(false)}>
          <div className="bg-white rounded-xl w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">Perpanjang Sewa</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Durasi Sewa</label>
              <select
                value={selectedDurasi}
                onChange={(e) => setSelectedDurasi(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] bg-white appearance-none cursor-pointer"
              >
                <option value="">Pilih durasi</option>
                {tarifOptions.map((t) => (
                  <option key={t.durasi} value={t.durasi}>
                    {t.durasi} bulan — Rp {t.harga.toLocaleString("id-ID")}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
              <div className="flex gap-2">
                {["TRANSFER", "QRIS"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMetode(m)}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-xl border transition-colors ${
                      selectedMetode === m
                        ? "bg-[#84CC16] text-white border-[#84CC16]"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowPerpanjangModal(false)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button
                onClick={handlePerpanjang}
                disabled={!selectedDurasi || perpanjangLoading}
                className="flex-1 py-2.5 bg-[#84CC16] text-white text-sm font-medium rounded-lg hover:bg-[#73b814] transition-colors disabled:opacity-50"
              >
                {perpanjangLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Bayar Sekarang"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
