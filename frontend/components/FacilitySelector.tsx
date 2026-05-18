"use client";
import React, { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";

interface FacilitySelectorProps {
  facilities: string[];
  availableFacilities: string[];
  onChange: (facilities: string[]) => void;
  onAddFacility?: (name: string) => void;
  onDeleteFacility?: (name: string) => void;
  showManagement?: boolean;
}

const FacilitySelector: React.FC<FacilitySelectorProps> = ({
  facilities,
  availableFacilities,
  onChange,
  onAddFacility,
  onDeleteFacility,
  showManagement = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const filteredFacilities = availableFacilities.filter((f) =>
    f.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFacility = (facility: string) => {
    if (facilities.includes(facility)) {
      onChange(facilities.filter((f) => f !== facility));
    } else {
      onChange([...facilities, facility]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      onChange([]);
    } else {
      onChange([...availableFacilities]);
    }
    setSelectAll(!selectAll);
  };

  const handleAddFacility = () => {
    if (newFacility.trim() && onAddFacility) {
      onAddFacility(newFacility.trim());
      setNewFacility("");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Fasilitas
      </label>

      {showManagement && (
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

          <button
            type="button"
            onClick={handleAddFacility}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#84CC16] rounded-xl text-sm font-medium text-[#84CC16] hover:bg-[#84CC16]/5 transition-colors mb-3"
          >
            <Plus className="w-4 h-4" />
            Tambah Fasilitas
          </button>

          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-gray-300 text-[#84CC16] focus:ring-[#84CC16]"
            />
            <label className="text-sm text-gray-700">Pilih Semua</label>
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {filteredFacilities.map((facility) => {
          const isSelected = facilities.includes(facility);
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
              {showManagement && onDeleteFacility && (
                <button
                  type="button"
                  onClick={() => onDeleteFacility(facility)}
                  className="text-red-500 hover:text-red-600 p-1"
                  aria-label={`Hapus ${facility}`}
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
    </div>
  );
};

export default FacilitySelector;
