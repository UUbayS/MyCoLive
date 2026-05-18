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
};

const formatRupiah = (num?: number) => {
  if (!num) return "-";
  return "Rp " + num.toLocaleString("id-ID");
};

const RoomCard: React.FC<{ room: RoomCardData }> = ({ room }) => {
  const isKosong = room.status === "KOSONG";
  return (
    <Link href={`/public/katalog-properti/${room.propertiId}/ruangan/${room.id}`}>
      <div className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-40 w-full bg-gray-200 flex items-center justify-center relative">
          {room.gambar ? (
            <img src={room.gambar} alt={room.nomor} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-gray-500">No Image</span>
          )}
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
              isKosong ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isKosong ? "Kosong" : "Terisi"}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold">{room.nomor}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            Lantai {room.lantai || "1"} {room.luas ? `- ${room.luas}` : ""}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">
              {formatRupiah(room.harga)}/bln
            </p>
            {room.showEdit && (
              <button
                className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md text-xs text-gray-600 hover:bg-gray-50"
                onClick={(e) => e.preventDefault()}
              >
                <Edit className="w-3 h-3" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
