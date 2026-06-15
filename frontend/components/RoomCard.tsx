"use client";
import React from "react";
import Link from "next/link";
import { Edit } from "lucide-react";

export type RoomCardData = {
  id: string;
  nomor: string;
  lantai?: string;
  luas?: string;
  harga?: number;
  status: string;
  gambar?: string;
  propertiId: string;
  showEdit?: boolean;
  basePath?: string;
};

const formatRupiah = (num?: number) => {
  if (!num) return "-";
  return "Rp " + num.toLocaleString("id-ID");
};

const RoomCard: React.FC<{ room: RoomCardData }> = ({ room }) => {
  const isKosong = room.status === "KOSONG";
  const isTerisi = room.status === "TERISI";
  const isMaintenance = room.status === "MAINTENANCE";
  return (
    <Link href={`${room.basePath || "/public/katalog-properti"}/${room.propertiId}/kamar/${room.id}`}>
      <div className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-40 w-full bg-gray-200 flex items-center justify-center relative">
          {room.gambar ? (
            <img src={room.gambar} alt={room.nomor} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-gray-500">No Image</span>
          )}
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
              isKosong
                ? "bg-green-500 text-white"
                : isTerisi
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {isKosong ? "Kosong" : isTerisi ? "Terisi" : "Non-Aktif"}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold">Kamar {room.nomor}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            Lantai {room.lantai || "1"} {room.luas ? `- ${room.luas}` : ""}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">
              {formatRupiah(room.harga)}/bln
            </p>
          </div>
          {room.showEdit && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                className="flex items-center justify-center gap-2 w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <Edit className="w-3 h-3" />
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
