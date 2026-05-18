"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ImageUploader from "../../../../components/ImageUploader";
import { createProperti } from "../../../../lib/api";
import MainLayout from "../../../../components/Layout/MainLayout";

export default function TambahPropertiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    kota: "",
    kodePos: "",
    jenis: "",
    deskripsi: "",
    kebijakan: "",
    gambar: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nama.trim()) newErrors.nama = "Nama properti wajib diisi";
    if (!formData.alamat.trim()) newErrors.alamat = "Alamat wajib diisi";
    if (!formData.kota.trim()) newErrors.kota = "Kota wajib diisi";
    if (!formData.kodePos.trim()) newErrors.kodePos = "Kode pos wajib diisi";
    if (!formData.jenis) newErrors.jenis = "Jenis properti wajib dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const fullAlamat = `${formData.alamat}, ${formData.kota}, ${formData.kodePos}`;
      const result = await createProperti({
        nama: formData.nama,
        alamat: fullAlamat,
        jenis: formData.jenis,
        deskripsi: formData.deskripsi || undefined,
        kebijakan: formData.kebijakan || undefined,
        gambar: formData.gambar.length > 0 ? formData.gambar : undefined,
      });

      if (result) {
        router.push("/public/katalog-properti");
      } else {
        alert("Gagal menambahkan properti. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Create properti error:", error);
      alert("Terjadi kesalahan saat menambahkan properti.");
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-xl font-semibold">Tambah Properti</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Properti
            </label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              placeholder="Kosan C"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] ${
                errors.nama ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nama && <p className="text-xs text-red-500 mt-1">{errors.nama}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Properti
            </label>
            <textarea
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              placeholder="Jl. Kopo, Bandung"
              rows={2}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] resize-none ${
                errors.alamat ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.alamat && <p className="text-xs text-red-500 mt-1">{errors.alamat}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
              <input
                type="text"
                value={formData.kota}
                onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                placeholder="Bandung"
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] ${
                  errors.kota ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.kota && <p className="text-xs text-red-500 mt-1">{errors.kota}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
              <input
                type="text"
                value={formData.kodePos}
                onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })}
                placeholder="44444"
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] ${
                  errors.kodePos ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.kodePos && <p className="text-xs text-red-500 mt-1">{errors.kodePos}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Properti
            </label>
            <select
              value={formData.jenis}
              onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] ${
                errors.jenis ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Pilih Jenis</option>
              <option value="LAKI_LAKI">Laki-laki</option>
              <option value="PEREMPUAN">Perempuan</option>
              <option value="CAMPUR">Campur</option>
            </select>
            {errors.jenis && <p className="text-xs text-red-500 mt-1">{errors.jenis}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Properti
            </label>
            <textarea
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              placeholder="Deskripsi"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kebijakan Properti
            </label>
            <textarea
              value={formData.kebijakan}
              onChange={(e) => setFormData({ ...formData, kebijakan: e.target.value })}
              placeholder="Kebijakan Properti"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16] resize-none"
            />
          </div>

          <ImageUploader
            label="Upload Foto Properti"
            images={formData.gambar}
            onChange={(images) => setFormData({ ...formData, gambar: images })}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Tambahkan Properti"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
