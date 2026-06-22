"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronRight,
  User,
  BedDouble,
  MapPin,
  Calendar,
  Megaphone,
  SlidersHorizontal,
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import PenghuniTabs from "@/components/PenghuniTabs";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getPenghuniList, PenghuniData, getPropertiList, PropertiData } from "@/lib/api";
import { useRealtime } from "@/lib/useRealtime";

const statusBadge: Record<string, { label: string; color: string }> = {
  "Belum Menyewa": { label: "Belum Menyewa", color: "bg-gray-100 text-gray-600" },
  "Menyewa": { label: "Menyewa", color: "bg-green-100 text-green-700" },
  "Sewa Berakhir": { label: "Sewa Berakhir", color: "bg-red-100 text-red-700" },
  AKTIF: { label: "Aktif", color: "bg-green-100 text-green-700" },
  BERAKHIR: { label: "Berakhir", color: "bg-red-100 text-red-700" },
  PENGAJUAN_CHECKOUT: { label: "Pengajuan Checkout", color: "bg-yellow-100 text-yellow-700" },
};

export default function DaftarPenghuniPage() {
  const router = useRouter();
  const [penghuniList, setPenghuniList] = useState<PenghuniData[]>([]);
  const [filteredList, setFilteredList] = useState<PenghuniData[]>([]);
  const [propertiList, setPropertiList] = useState<PropertiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [propertiFilter, setPropertiFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const fetchedRef = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      const [penghuniData, propertiData] = await Promise.all([
        getPenghuniList(),
        getPropertiList(),
      ]);
      setPenghuniList(penghuniData);
      setFilteredList(penghuniData);
      setPropertiList(propertiData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

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

    fetchData();
  }, [router, fetchData]);

  useRealtime("pemesanan:status", () => fetchData());
  useRealtime("komplain:baru", () => fetchData());
  useRealtime("komplain:status", () => fetchData());

  useEffect(() => {
    let result = [...penghuniList];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.user.nama.toLowerCase().includes(q) ||
          p.user.email.toLowerCase().includes(q) ||
          (p.user.no_telepon || "").includes(q)
      );
    }

    if (statusFilter) {
      result = result.filter((p) => p.status_display === statusFilter || p.status_sewa === statusFilter);
      // Special handling for PENGAJUAN_CHECKOUT
      if (statusFilter === "PENGAJUAN_CHECKOUT") {
        result = result.filter((p) => p.status_sewa === "PENGAJUAN_CHECKOUT");
      }
    }

    if (propertiFilter) {
      result = result.filter((p) => p.kamar?.properti === propertiFilter);
    }

    setFilteredList(result);
  }, [search, statusFilter, propertiFilter, penghuniList]);

  return (
    <>
      {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 mt-4 items-start md:items-center">
          <div className="flex flex-row gap-3 w-full md:flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, email, atau no. telepon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden p-2 border rounded-xl hover:bg-gray-50 flex-shrink-0 flex items-center justify-center ${
                showFilters ? "bg-[#84CC16]/10 border-[#84CC16] text-[#84CC16]" : "border-gray-300 text-gray-600"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className={`${showFilters ? "flex" : "hidden"} md:flex flex-row gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 w-full md:w-auto md:overflow-visible`}>
            <div className="relative shrink-0">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] bg-white appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="">Semua Status</option>
                <option value="Menyewa">Menyewa</option>
                <option value="Sewa Berakhir">Sewa Berakhir</option>
                <option value="Belum Menyewa">Belum Menyewa</option>
                <option value="PENGAJUAN_CHECKOUT">Pengajuan Checkout</option>
              </select>
            </div>
            <div className="relative shrink-0">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={propertiFilter}
                onChange={(e) => setPropertiFilter(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] bg-white appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="">Semua Properti</option>
                {propertiList.map((p) => (
                  <option key={p.id} value={p.nama}>
                    {p.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Belum ada penghuni</p>
            <p className="text-sm mt-1">Data penghuni akan muncul setelah registrasi atau pemesanan.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredList.map((p) => {
              const badge = statusBadge[p.status_display] || statusBadge[p.status_sewa] || { label: p.status_display, color: "bg-gray-100 text-gray-600" };
              return (
                <Link
                  key={p.id}
                  href={`/administrator/penghuni/${p.id}`}
                  className="block bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{p.user.nama}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium shrink-0 ${badge.color}`}>
                          {badge.label}
                        </span>
                        {p.status_sewa === "PENGAJUAN_CHECKOUT" && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium shrink-0 bg-yellow-100 text-yellow-700">
                            ⚠️ Menunggu
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 mb-2 truncate">{p.user.email}</p>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-1 gap-x-4 text-xs text-gray-500">
                        {p.kamar && (
                          <span className="flex items-center gap-1">
                            <BedDouble className="w-3.5 h-3.5 shrink-0" />
                            Kamar {p.kamar.nomor} — {p.kamar.properti}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {new Date(p.tgl_mulai).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                          {p.tgl_berakhir && (
                            <> s/d {new Date(p.tgl_berakhir).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}</>
                          )}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        <Link
          href="/administrator/pengumuman"
          className="md:hidden fixed bottom-24 right-4 p-4 gap-2 bg-[#84CC16] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#73b814] transition-colors z-40"
          aria-label="Tambah Properti"
        >
          <Megaphone className="w-6 h-6" />
          <span>Pengumuman</span>
        </Link>
    </>
  );
}
