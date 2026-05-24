import React from "react";

interface AddressFieldsProps {
  provinsi: string;
  kota: string;
  kecamatan: string;
  kodePos: string;
  detailAlamat: string;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  provinsi,
  kota,
  kecamatan,
  kodePos,
  detailAlamat,
  onChange,
  errors = {},
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Provinsi
        </label>
        <input
          type="text"
          value={provinsi}
          onChange={(e) => onChange("provinsi", e.target.value)}
          placeholder="Jawa Barat"
          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] ${
            errors.provinsi ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.provinsi && <p className="text-xs text-red-500 mt-1">{errors.provinsi}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kota/Kabupaten
          </label>
          <input
            type="text"
            value={kota}
            onChange={(e) => onChange("kota", e.target.value)}
            placeholder="Bandung"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kecamatan
          </label>
          <input
            type="text"
            value={kecamatan}
            onChange={(e) => onChange("kecamatan", e.target.value)}
            placeholder="Batununggal"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kode Pos
        </label>
        <input
          type="text"
          value={kodePos}
          onChange={(e) => onChange("kodePos", e.target.value)}
          placeholder="40266"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Detail Alamat
        </label>
        <textarea
          value={detailAlamat}
          onChange={(e) => onChange("detailAlamat", e.target.value)}
          placeholder="Jalan, RT/RW, Kelurahan"
          rows={2}
          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] resize-none ${
            errors.detailAlamat ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.detailAlamat && <p className="text-xs text-red-500 mt-1">{errors.detailAlamat}</p>}
      </div>
    </div>
  );
};

export default AddressFields;
