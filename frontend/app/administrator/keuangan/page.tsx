"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ChevronRight, Download } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { getUser, isAuthenticated } from "@/lib/auth";
import {
  getPropertiList,
  PropertiData,
  getKeuanganTransaksi,
  KeuanganData,
} from "@/lib/api";

const statusBadgeStyle: Record<string, string> = {
  Lunas: "bg-green-100 text-green-700",
  "Belum Bayar": "bg-yellow-100 text-yellow-700",
  Operasional: "bg-red-100 text-red-700",
};

const tipeLabels: Record<string, string> = {
  SEMUA: "Semua",
  PEMASUKAN: "Pemasukan",
  PENGELUARAN: "Pengeluaran",
};

export default function KeuanganPage() {
  const router = useRouter();
  const [propertiList, setPropertiList] = useState<PropertiData[]>([]);
  const [selectedProperti, setSelectedProperti] = useState("SEMUA");
  const [selectedTipe, setSelectedTipe] = useState("SEMUA");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<KeuanganData | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

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

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const [propertiData] = await Promise.all([
          getPropertiList(),
        ]);
        setPropertiList(propertiData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    const fetchKeuangan = async () => {
      setLoading(true);
      try {
        const result = await getKeuanganTransaksi(
          selectedProperti === "SEMUA" ? undefined : selectedProperti,
          selectedTipe,
          search.trim() || undefined
        );
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKeuangan();
  }, [selectedProperti, selectedTipe, search]);

  const formatRupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Manajemen Keuangan
        </h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari Pembayaran"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent"
          />
        </div>

        {/* Properti Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedProperti("SEMUA")}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              selectedProperti === "SEMUA"
                ? "bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]"
                : "bg-white text-gray-600 border-gray-200"
            }`}
          >
            Semua
          </button>
          {propertiList.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProperti(p.id)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                selectedProperti === p.id
                  ? "bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {p.nama}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        {loading ? (
          <div className="space-y-3 mb-6">
            <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-20 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          </div>
        ) : data ? (
          <>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-3 text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">
                {formatRupiah(data.summary.total_bersih)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total Bersih</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-gray-100">
                <p className="text-lg font-bold text-gray-900">
                  {formatRupiah(data.summary.total_pendapatan)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total Pendapatan</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-gray-100">
                <p className="text-lg font-bold text-gray-900">
                  {formatRupiah(data.summary.total_pengeluaran)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total Pengeluaran</p>
              </div>
            </div>
          </>
        ) : null}

        {/* Tipe Filter + Download PDF */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {["SEMUA", "PEMASUKAN", "PENGELUARAN"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTipe(t)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedTipe === t
                    ? "bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                {tipeLabels[t]}
              </button>
            ))}
          </div>
          <button
            onClick={() => alert("Download PDF (dummy)")}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#84CC16] transition-colors shrink-0 ml-2"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </div>

        {/* Transaction List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : !data || data.transaksi.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-sm">Belum ada transaksi</p>
            <p className="text-xs mt-1">
              Data keuangan akan muncul setelah ada pembayaran atau pengajuan dana.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.transaksi.map((item) => {
              const badgeClass =
                statusBadgeStyle[item.status_badge] ||
                "bg-gray-100 text-gray-600";
              const isPemasukan = item.tipe === "PEMASUKAN";
              const isPengeluaran = item.tipe === "PENGELUARAN";
              const amountPrefix = isPemasukan
                ? "+"
                : isPengeluaran
                ? "-"
                : "";
              const amountColor = isPemasukan
                ? "text-green-600"
                : isPengeluaran
                ? "text-red-600"
                : "text-gray-900";

              const CardContent = (
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      {item.nama} —{" "}
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {item.detail_info}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${badgeClass}`}
                      >
                        {item.status_badge}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <p className={`text-sm font-bold ${amountColor}`}>
                      {amountPrefix}
                      {formatRupiah(item.jumlah)}
                    </p>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              );

              if (isPemasukan && item.kuitansi_id) {
                return (
                  <Link
                    key={item.id}
                    href={`/administrator/keuangan/kuitansi/${item.kuitansi_id}`}
                    className="block hover:shadow-md transition-shadow rounded-xl"
                  >
                    {CardContent}
                  </Link>
                );
              }

              return <div key={item.id}>{CardContent}</div>;
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
