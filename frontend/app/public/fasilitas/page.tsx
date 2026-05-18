"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Plus, Trash2 } from "lucide-react";
import MainLayout from "../../../components/Layout/MainLayout";

const defaultFasilitas = [
  "Wifi",
  "Listrik",
  "Kamar Mandi Dalam",
  "Kamar Mandi Luar",
  "Kasur + Bantal",
  "Lemari",
  "Meja Belajar",
  "Kursi",
  "AC",
  "Kipas Angin",
  "Dapur Bersama",
  "Parkir",
  "CCTV",
  "Laundry",
];

export default function DaftarFasilitasPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [facilities, setFacilities] = useState(defaultFasilitas);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFacility, setNewFacility] = useState("");

  const filteredFacilities = facilities.filter((f) =>
    f.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFacilities([]);
    } else {
      setSelectedFacilities([...facilities]);
    }
    setSelectAll(!selectAll);
  };

  const toggleFacility = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  const handleAddFacility = () => {
    if (newFacility.trim() && !facilities.includes(newFacility.trim())) {
      setFacilities([...facilities, newFacility.trim()]);
      setNewFacility("");
      setShowAddForm(false);
    }
  };

  const handleDeleteFacility = (facility: string) => {
    setFacilities(facilities.filter((f) => f !== facility));
    setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Daftar Fasilitas</h1>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari Fasilitas"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
          />
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#84CC16] rounded-xl text-sm font-medium text-[#84CC16] hover:bg-[#84CC16]/5 transition-colors mb-4"
        >
          <Plus className="w-4 h-4" />
          Tambah Fasilitas
        </button>

        {showAddForm && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              placeholder="Nama fasilitas baru"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddFacility();
                }
              }}
            />
            <button
              onClick={handleAddFacility}
              className="px-4 py-2.5 bg-[#84CC16] text-white rounded-xl text-sm font-medium hover:bg-[#73b814] transition-colors"
            >
              Tambah
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="w-4 h-4 rounded border-gray-300 text-[#84CC16] focus:ring-[#84CC16]"
          />
          <label className="text-sm text-gray-700">Pilih Semua</label>
        </div>

        <div className="space-y-2">
          {filteredFacilities.map((facility) => {
            const isSelected = selectedFacilities.includes(facility);
            return (
              <div
                key={facility}
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
                    onChange={() => toggleFacility(facility)}
                    className="w-4 h-4 rounded border-gray-300 text-[#84CC16] focus:ring-[#84CC16]"
                  />
                  <span className="text-sm text-gray-700">{facility}</span>
                </div>
                <button
                  onClick={() => handleDeleteFacility(facility)}
                  className="text-red-500 hover:text-red-600 p-1"
                  aria-label={`Hapus ${facility}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {filteredFacilities.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-4">
              Tidak ada fasilitas ditemukan
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
