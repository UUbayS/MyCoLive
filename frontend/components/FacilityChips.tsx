"use client";

import React from "react";
import { FasilitasData } from "../lib/api";

interface FacilityChipsProps {
  selectedIds: string[];
  facilities: FasilitasData[];
  label: string;
  onOpen: () => void;
}

export default function FacilityChips({
  selectedIds,
  facilities,
  label,
  onOpen,
}: FacilityChipsProps) {
  const selectedFacilities = facilities.filter((f) =>
    selectedIds.includes(f.id)
  );

  const hasSelected = selectedFacilities.length > 0;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div
        onClick={onOpen}
        className={`
          cursor-pointer transition-colors
          ${hasSelected
            ? "flex flex-wrap gap-2 items-center"
            : "flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#84CC16] hover:bg-[#84CC16]/5"
          }
        `}
      >
        {hasSelected ? (
          <>
            {selectedFacilities.map((f) => (
              <span
                key={f.id}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#84CC16]/10 text-[#84CC16] border border-[#84CC16]/20"
              >
                {f.nama}
              </span>
            ))}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="ml-1 text-sm text-gray-500 hover:text-[#84CC16] font-medium transition-colors"
            >
              Ubah
            </button>
          </>
        ) : (
          <span className="text-sm text-gray-500 font-medium">
            Pilih Fasilitas
          </span>
        )}
      </div>
    </div>
  );
}
