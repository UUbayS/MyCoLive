"use client";
import React from "react";
import Link from "next/link";
import { MapPin, Pencil, Trash2, BedDouble, Settings, Image } from "lucide-react";

export type PropertyData = {
  id: string;
  nama: string;
  alamat: string;
  provinsi?: string;
  kota?: string;
  kecamatan?: string;
  kode_pos?: string;
  detail_alamat?: string;
  total_kamar?: number;
  kamar_kosong?: number;
  gambar?: string;
};

export type PropertyActions = {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onManage?: (id: string) => void;
};

export type PropertyCardProps = {
  property: PropertyData;
  actions?: PropertyActions;
  detailLink?: string;
  manageLink?: string;
};

const getDisplayAlamat = (p: PropertyData) => {
  if (p.kota && p.provinsi) {
    return `${p.kota}, ${p.provinsi}`;
  }
  return p.alamat;
};

const getFullAlamat = (p: PropertyData) => {
  const parts = [
    p.detail_alamat,
    p.kecamatan ? `Kec. ${p.kecamatan}` : null,
    p.kota,
    p.provinsi,
    p.kode_pos
  ].filter(Boolean);
  
  if (parts.length > 0) {
    return parts.join(", ");
  }
  return p.alamat;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property, actions, detailLink, manageLink }) => {
  const isAvailable = (property.kamar_kosong ?? 0) > 0;
  const isAdmin = !!actions;
  const linkTarget = detailLink || `/public/katalog-properti/${property.id}`;
  const manageTarget = manageLink || `/public/katalog-properti/${property.id}/kamar`;
  
  return (
    <div className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={linkTarget}>
        <div className="h-48 w-full bg-gray-200 flex items-center justify-center relative cursor-pointer">
          {property.gambar ? (
            <img src={property.gambar} alt={property.nama} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <Image className="w-8 h-8 mb-2" />
              <span className="text-sm">No Image</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            {isAvailable ? (
              <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Tersedia</span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">Penuh</span>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{property.nama}</h3>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <p className="truncate">{getDisplayAlamat(property)}</p>
          </div>
          
          {isAdmin && (
            <div className="text-xs text-gray-500 mb-3 line-clamp-2">
              {getFullAlamat(property)}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <BedDouble className="w-4 h-4 text-gray-400" />
              <span>{property.total_kamar ?? 0} Kamar</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="text-green-600 font-medium">{property.kamar_kosong ?? 0}</span>
              <span className="text-gray-400"> / </span>
              <span>{property.total_kamar ?? 0} Kosong</span>
            </div>
          </div>  
        </div>
      </Link>
      {isAdmin && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Link
            href={manageTarget}
            className="flex items-center justify-center gap-2 w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            <Settings className="w-4 h-4" />
            Kelola Kamar
          </Link>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
