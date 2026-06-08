"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ImageUploader from "../../../../../../components/ImageUploader";
import FacilitySelector from "../../../../../../components/FacilitySelector";
import { createKamar } from "../../../../../../lib/api";
import { getUser, isAuthenticated } from "../../../../../../lib/auth";
import MainLayout from "../../../../../../components/Layout/MainLayout";

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

export default function TambahKamarPage() {
  const router = useRouter();
  const params = useParams();
  const propertiId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomor: "",
    lantai: "",
    luas: "",
    fasilitas: [] as string[],
    deskripsi: "",
    tarif1Bulan: "",
    tarif3Bulan: "",
    tarif6Bulan: "",
    tarif12Bulan: "",
    gambar: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableFasilitas, setAvailableFasilitas] = useState(defaultFasilitas);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const user = getUser();
    if (user && user.role !== "PEMILIK") {
      router.push("/public/katalog-properti");
    }
  }, [router]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nomor.trim()) newErrors.nomor = "Nomor kamar wajib diisi";
    if (!formData.lantai.trim()) newErrors.lantai = "Lantai wajib diisi";
    if (!formData.tarif1Bulan.trim()) newErrors.tarif1Bulan = "Tarif bulanan wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const tarif: Record<string, number> = {};
      if (formData.tarif1Bulan) tarif["1_bulan"] = parseInt(formData.tarif1Bulan.replace(/\D/g, ""));
      if (formData.tarif3Bulan) tarif["3_bulan"] = parseInt(formData.tarif3Bulan.replace(/\D/g, ""));
      if (formData.tarif6Bulan) tarif["6_bulan"] = parseInt(formData.tarif6Bulan.replace(/\D/g, ""));
      if (formData.tarif12Bulan) tarif["12_bulan"] = parseInt(formData.tarif12Bulan.replace(/\D/g, ""));

      const luas = formData.luas ? `${formData.lantai} - ${formData.luas}` : formData.lantai;

      const result = await createKamar(propertiId, {
        nomor: formData.nomor,
        tipe: "REGULER",
        luas,
        fasilitas: formData.fasilitas.length > 0 ? formData.fasilitas : undefined,
        deskripsi: formData.deskripsi || undefined,
        tarif: Object.keys(tarif).length > 0 ? tarif : undefined,
        foto: formData.gambar.length > 0 ? formData.gambar : undefined,
      });

      if (result) {
        router.push(`/administrator/properti/${propertiId}/kamar`);
      } else {
        alert("Gagal menambahkan kamar. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Create kamar error:", error);
      alert("Terjadi kesalahan saat menambahkan kamar.");
    } finally {
      setLoading(false);
    }
  };

  const formatRupiahInput = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    return "Rp " + parseInt(numbers).toLocaleString("id-ID");
  };

  const parseRupiahInput = (value: string) => {
    return value.replace(/\D/g, "");
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
          <h1 className="text-xl font-semibold">Tambah Kamar</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              No Kamar:
            </label>
            <input
              type="text"
              value={formData.nomor}
              onChange={(e) => setFormData({ ...formData, nomor: e.target.value })}
              placeholder="8"
              className={`w-20 px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] ${
                errors.nomor ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nomor && <p className="text-xs text-red-500">{errors.nomor}</p>}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Lantai:</label>
            <input
              type="text"
              value={formData.lantai}
              onChange={(e) => setFormData({ ...formData, lantai: e.target.value })}
              placeholder="1"
              className={`w-20 px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] ${
                errors.lantai ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lantai && <p className="text-xs text-red-500">{errors.lantai}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Luas Kamar:</label>
            <input
              type="text"
              value={formData.luas}
              onChange={(e) => setFormData({ ...formData, luas: e.target.value })}
              placeholder="2,5 x 2,5m"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
            />
          </div>

          <FacilitySelector
            facilities={formData.fasilitas}
            availableFacilities={availableFasilitas}
            onChange={(facilities) => setFormData({ ...formData, fasilitas: facilities })}
            showManagement
            onAddFacility={(name) => {
              if (!availableFasilitas.includes(name)) {
                setAvailableFasilitas([...availableFasilitas, name]);
              }
            }}
            onDeleteFacility={(name) => {
              setAvailableFasilitas(availableFasilitas.filter((f) => f !== name));
              setFormData({
                ...formData,
                fasilitas: formData.fasilitas.filter((f) => f !== name),
              });
            }}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keterangan Tambahan:
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
            <h3 className="text-base font-semibold mb-3">Tarif Kamar</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bulanan:</label>
                <input
                  type="text"
                  value={formatRupiahInput(formData.tarif1Bulan)}
                  onChange={(e) =>
                    setFormData({ ...formData, tarif1Bulan: parseRupiahInput(e.target.value) })
                  }
                  placeholder="Rp. 700.000"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#84CC16] ${
                    errors.tarif1Bulan ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.tarif1Bulan && (
                  <p className="text-xs text-red-500 mt-1">{errors.tarif1Bulan}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">3 Bulanan:</label>
                <input
                  type="text"
                  value={formatRupiahInput(formData.tarif3Bulan)}
                  onChange={(e) =>
                    setFormData({ ...formData, tarif3Bulan: parseRupiahInput(e.target.value) })
                  }
                  placeholder="Rp. 2.000.000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">6 Bulanan:</label>
                <input
                  type="text"
                  value={formatRupiahInput(formData.tarif6Bulan)}
                  onChange={(e) =>
                    setFormData({ ...formData, tarif6Bulan: parseRupiahInput(e.target.value) })
                  }
                  placeholder="Rp. 3.750.000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tahunan:</label>
                <input
                  type="text"
                  value={formatRupiahInput(formData.tarif12Bulan)}
                  onChange={(e) =>
                    setFormData({ ...formData, tarif12Bulan: parseRupiahInput(e.target.value) })
                  }
                  placeholder="Rp. 7.000.000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
                />
              </div>
            </div>
          </div>

          <ImageUploader
            label="Upload Foto Kamar"
            images={formData.gambar}
            onChange={(images) => setFormData({ ...formData, gambar: images })}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Tambah Kamar Kos"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
