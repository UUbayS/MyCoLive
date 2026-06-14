"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import RoomList from "../../../../../components/RoomList";
import { RoomCardData } from "../../../../../components/RoomCard";
import { getKamarByProperti, getPropertiById, KamarData } from "../../../../../lib/api";
import { useRealtime } from "../../../../../lib/useRealtime";
import MainLayout from "../../../../../components/Layout/MainLayout";

export default function DaftarKamarPage() {
  const router = useRouter();
  const params = useParams();
  const propertiId = params.id as string;

  const [rooms, setRooms] = useState<RoomCardData[]>([]);
  const [propertiNama, setPropertiNama] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [properti, kamarList] = await Promise.all([
        getPropertiById(propertiId),
        getKamarByProperti(propertiId),
      ]);

      if (properti) {
        setPropertiNama(properti.nama);
      }

      const roomData: RoomCardData[] = kamarList
        .filter((k: KamarData) => k.status !== "MAINTENANCE")
        .map((k: KamarData) => {
          const tarifObj = typeof k.tarif === "object" && k.tarif ? k.tarif as Record<string, number> : {};
          const hargaBulanan = tarifObj["1_bulan"] || Object.values(tarifObj)[0];
          return {
            id: k.id,
            nomor: k.nomor,
            lantai: k.luas?.split(" - ")[0] || "1",
            luas: k.luas?.split(" - ")[1] || k.luas,
            harga: typeof hargaBulanan === "number" ? hargaBulanan : undefined,
            status: k.status,
            gambar: k.gambar?.[0],
            propertiId,
          };
        });

      setRooms(roomData);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setLoading(false);
    }
  }, [propertiId]);

  useEffect(() => {
    if (!propertiId) return;
    fetchData();
  }, [propertiId, fetchData]);

  useRealtime("kamar:update", () => fetchData());
  useRealtime("pemesanan:status", () => fetchData());
  useRealtime("pemesanan:update", () => fetchData());

  const filteredRooms = useMemo(() => {
    let result = rooms;

    if (searchQuery) {
      result = result.filter((r) =>
        r.nomor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      result = result.filter((r) => r.status === filterStatus);
    }

    return result;
  }, [searchQuery, filterStatus, rooms]);

  const totalKamar = rooms.length;
  const totalKosong = rooms.filter((r) => r.status === "KOSONG").length;
  const totalTerisi = rooms.filter((r) => r.status === "TERISI").length;

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-56 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Daftar Kamar</h1>
              <p className="text-sm text-gray-500">{propertiNama}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-gray-50 rounded-xl text-sm">
          <span>
            Total: <strong>{totalKamar}</strong>
          </span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-green-600">
            Kosong: <strong>{totalKosong}/{totalKamar}</strong>
          </span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-red-600">
            Terisi: <strong>{totalTerisi}/{totalKamar}</strong>
          </span>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari Kamar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 ${
              showFilters ? "bg-[#84CC16]/10 border-[#84CC16]" : ""
            }`}
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <RoomList rooms={filteredRooms} />
      </div>
    </MainLayout>
  );
}
