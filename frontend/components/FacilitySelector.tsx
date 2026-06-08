"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, Trash2, Loader2 } from "lucide-react";
import { getFasilitasList, createFasilitas, deleteFasilitas, FasilitasData } from "../lib/api";
import { getUser } from "../lib/auth";

interface FacilitySelectorProps {
  selectedIds: string[];
  jenis: "RUANGAN" | "UMUM";
  onChange: (selectedIds: string[]) => void;
  showManagement?: boolean;
}

const FacilitySelector: React.FC<FacilitySelectorProps> = ({
  selectedIds,
  jenis,
  onChange,
  showManagement = false,
}) => {
  const [facilities, setFacilities] = useState<FasilitasData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = getUser();
    setIsAdmin(user?.role === "PEMILIK");
    loadFacilities();
  }, [jenis]);

  const loadFacilities = async () => {
    setLoading(true);
    const data = await getFasilitasList(jenis);
    setFacilities(data);
    setLoading(false);
  };

  const filteredFacilities = facilities.filter((f) =>
    f.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFacility = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((fid) => fid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === facilities.length) {
      onChange([]);
    } else {
      onChange(facilities.map((f) => f.id));
    }
  };

  const handleAddFacility = async () => {
    if (!newFacility.trim()) return;
    const result = await createFasilitas(newFacility.trim(), jenis);
    if (result) {
      setFacilities((prev) => [...prev, result].sort((a, b) => a.nama.localeCompare(b.nama)));
      setNewFacility("");
    }
  };

  const handleDeleteFacility = async (id: string) => {
    if (!confirm("Hapus fasilitas ini?")) return;
    const success = await deleteFasilitas(id);
    if (success) {
      setFacilities((prev) => prev.filter((f) => f.id !== id));
      onChange(selectedIds.filter((fid) => fid !== id));
    }
  };

  const allSelected = facilities.length > 0 && selectedIds.length === facilities.length;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Fasilitas {jenis === "RUANGAN" ? "Ruangan" : "Umum"}
      </label>

      {showManagement && isAdmin && (
        <div className="mb-3">
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari Fasilitas"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Tambah fasilitas baru..."
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddFacility()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              disabled={!newFacility.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-[#84CC16] text-white rounded-xl text-sm font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
              className="w-4 h-4 shrink-0 rounded border-2 border-gray-300 accent-[#84CC16] checked:border-[#84CC16] cursor-pointer"
            />
            <label className="text-sm text-gray-700 cursor-pointer select-none">Pilih Semua</label>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredFacilities.map((facility) => {
            const isSelected = selectedIds.includes(facility.id);
            return (
              <div
                key={facility.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                  isSelected
                    ? "border-[#84CC16] bg-[#84CC16]/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleFacility(facility.id)}
                    className="w-4 h-4 shrink-0 rounded border-2 border-gray-300 accent-[#84CC16] checked:border-[#84CC16] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 cursor-pointer select-none">{facility.nama}</span>
                </div>
                {showManagement && isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDeleteFacility(facility.id)}
                    className="text-red-500 hover:text-red-600 p-1"
                    aria-label={`Hapus ${facility.nama}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}

          {filteredFacilities.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-4">
              Tidak ada fasilitas ditemukan
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FacilitySelector;
