"use client";

import { useEffect, useState, useRef } from "react";
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
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import PenghuniTabs from "@/components/PenghuniTabs";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getPenghuniList, PenghuniData, getPropertiList, PropertiData } from "@/lib/api";

const statusBadge: Record<string, { label: string; color: string }> = {
  "Belum Menyewa": { label: "Belum Menyewa", color: "bg-gray-100 text-gray-600" },
  "Menyewa": { label: "Menyewa", color: "bg-green-100 text-green-700" },
  "Sewa Berakhir": { label: "Sewa Berakhir", color: "bg-red-100 text-red-700" },
  AKTIF: { label: "Aktif", color: "bg-green-100 text-green-700" },
  BERAKHIR: { label: "Berakhir", color: "bg-red-100 text-red-700" },
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
    };

    fetchData();
  }, [router]);

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
    }

    if (propertiFilter) {
      result = result.filter((p) => p.kamar?.properti === propertiFilter);
    }

    setFilteredList(result);
  }, [search, statusFilter, propertiFilter, penghuniList]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Penghuni Properti</h1>
        <PenghuniTabs />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 mt-4">
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
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] bg-white appearance-none cursor-pointer"
              >
                <option value="">Semua Status</option>
                <option value="Menyewa">Menyewa</option>
                <option value="Sewa Berakhir">Sewa Berakhir</option>
                <option value="Belum Menyewa">Belum Menyewa</option>
              </select>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={propertiFilter}
                onChange={(e) => setPropertiFilter(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] bg-white appearance-none cursor-pointer"
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
      </div>
    </MainLayout>
  );
}
