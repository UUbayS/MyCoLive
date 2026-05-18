"use client";
import React from "react";

interface TarifSelectorProps {
  tarif: Record<string, number>;
  selectedDuration: string;
  onSelect: (duration: string) => void;
}

const durationLabels: Record<string, string> = {
  "1_bulan": "1 bln",
  "3_bulan": "3 bln",
  "6_bulan": "6 bln",
  "12_bulan": "1 thn",
};

const formatRupiah = (num: number) => {
  return "Rp " + num.toLocaleString("id-ID");
};

const TarifSelector: React.FC<TarifSelectorProps> = ({
  tarif,
  selectedDuration,
  onSelect,
}) => {
  const availableDurations = Object.keys(tarif).filter(
    (key) => tarif[key] && tarif[key] > 0
  );

  if (availableDurations.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Tarif
      </label>
      <div className="flex flex-wrap gap-2 mb-3">
        {availableDurations.map((duration) => (
          <button
            key={duration}
            type="button"
            onClick={() => onSelect(duration)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedDuration === duration
                ? "bg-[#84CC16] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {durationLabels[duration] || duration}
          </button>
        ))}
      </div>
      {selectedDuration && tarif[selectedDuration] && (
        <p className="text-xl font-bold text-gray-900">
          {formatRupiah(tarif[selectedDuration])}
          <span className="text-sm font-normal text-gray-500">
            /{durationLabels[selectedDuration]?.replace(" bln", " bulan").replace(" thn", " tahun")}
          </span>
        </p>
      )}
    </div>
  );
};

export default TarifSelector;
