"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Clock, CheckCircle, XCircle, CreditCard, Eye } from "lucide-react";
import { getUser, isAuthenticated } from "../../../lib/auth";
import { getMyPemesanan, PemesananData } from "../../../lib/api";
import MainLayout from "../../../components/Layout/MainLayout";

const statusPemesananBadge: Record<string, { label: string; color: string }> = {
  MENUNGGU: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700" },
  DITERIMA: { label: "Diterima", color: "bg-green-100 text-green-700" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-700" },
  SELESAI: { label: "Selesai", color: "bg-blue-100 text-blue-700" },
};

const statusPembayaranBadge: Record<string, { label: string; color: string }> = {
  MENUNGGU: { label: "Belum Bayar", color: "bg-gray-100 text-gray-600" },
  DIVERIFIKASI: { label: "Menunggu Verifikasi", color: "bg-yellow-100 text-yellow-700" },
  DITERIMA: { label: "Lunas", color: "bg-green-100 text-green-700" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-700" },
};

export default function TransaksiPage() {
  const router = useRouter();
  const [pemesananList, setPemesananList] = useState<PemesananData[]>([]);
  const [loading, setLoading] = useState(true);

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
        const data = await getMyPemesanan();
        setPemesananList(data);
      } catch (error) {
        console.error("Failed to fetch pemesanan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <h1 className="text-xl font-semibold mb-4">Riwayat Transaksi</h1>

        {pemesananList.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <CreditCard className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Belum ada transaksi</p>
            <p className="text-sm mt-1">
              Pesan kamar untuk melihat riwayat transaksi di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pemesananList.map((p) => {
              const pemesananStatus = statusPemesananBadge[p.status] || { label: p.status, color: "bg-gray-100 text-gray-600" };
              const pembayaranStatus = statusPembayaranBadge[p.pembayaran?.status || "MENUNGGU"] || { label: "-", color: "bg-gray-100 text-gray-600" };

              return (
                <Link
                  key={p.id}
                  href={`/penghuni/transaksi/${p.id}`}
                  className="block bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {p.properti?.nama || "Properti"} — Kamar {p.kamar?.nomor || "-"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {p.durasi_sewa} bulan &bull;{" "}
                        {new Date(p.tgl_masuk).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Eye className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${pemesananStatus.color}`}>
                      {pemesananStatus.label}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${pembayaranStatus.color}`}>
                      {pembayaranStatus.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">
                      Rp {(p.total_bayar || 0).toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(p.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
