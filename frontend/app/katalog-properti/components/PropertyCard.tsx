"use client";
import React from "react";

export type PropertyData = {
  id: string;
  nama: string;
  alamat: string;
  total_kamar?: number;
  kamar_kosong?: number;
  gambar?: string;
};

const PropertyCard: React.FC<{ property: PropertyData }> = ({ property }) => {
  const isAvailable = (property.kamar_kosong ?? 0) > 0;
  return (
    <div className="rounded-xl bg-white shadow-md overflow-hidden">
      <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
        {property.gambar ? (
          <img src={property.gambar} alt={property.nama} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm text-gray-500">No Image</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold">{property.nama}</h3>
          {isAvailable ? (
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">Tersedia</span>
          ) : (
            <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">Penuh</span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-1">{property.alamat}</p>
        <p className="text-sm text-gray-600">
          {property.total_kamar ?? 0} Kamar | {property.kamar_kosong ?? 0} Kosong
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
