"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ImageUploader from "../../../../components/ImageUploader";
import AddressFields from "../../../../components/AddressFields";
import { createProperti } from "../../../../lib/api";
import { getUser, isAuthenticated } from "../../../../lib/auth";
import MainLayout from "../../../../components/Layout/MainLayout";

export default function TambahPropertiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    kodePos: "",
    detailAlamat: "",
    jenis: "",
    deskripsi: "",
    kebijakan: "",
    gambar: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const user = getUser();
    if (user && user.role !== "PEMILIK" && user.role !== "PENGELOLA") {
      router.push("/public/katalog-properti");
    }
  }, [router]);

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nama.trim()) newErrors.nama = "Nama properti wajib diisi";
    if (!formData.detailAlamat.trim()) newErrors.detailAlamat = "Detail alamat wajib diisi";
    if (!formData.provinsi.trim()) newErrors.provinsi = "Provinsi wajib diisi";
    if (!formData.jenis) newErrors.jenis = "Jenis properti wajib dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await createProperti({
        nama: formData.nama,
        provinsi: formData.provinsi,
        kota: formData.kota,
        kecamatan: formData.kecamatan,
        kode_pos: formData.kodePos,
        detail_alamat: formData.detailAlamat,
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

          <AddressFields
            provinsi={formData.provinsi}
            kota={formData.kota}
            kecamatan={formData.kecamatan}
            kodePos={formData.kodePos}
            detailAlamat={formData.detailAlamat}
            onChange={handleAddressChange}
            errors={{ provinsi: errors.provinsi, detailAlamat: errors.detailAlamat }}
          />

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
