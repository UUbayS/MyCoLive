"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "../../../../../lib/ToastContext";
import { ArrowLeft } from "lucide-react";
import MainLayout from "../../../../../components/Layout/MainLayout";
import { getUser, isAuthenticated } from "../../../../../lib/auth";
import { getUserList, updateOperator } from "../../../../../lib/api";

const PHONE_RE = /^\d{9,15}$/;

export default function EditOperatorPage() {
  const router = useRouter();
  const params = useParams();
  const operatorId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    nama: "",
    no_telepon: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { success, error } = useToast();

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

  useEffect(() => {
    if (!operatorId) return;

    const fetchOperator = async () => {
      try {
        const users = await getUserList();
        const op = users.find((u) => u.id === operatorId && u.role === "PENGELOLA");
        if (op) {
          setEmail(op.email);
          setFormData({
            username: op.username || "",
            nama: op.nama || "",
            no_telepon: op.no_telepon || "",
          });
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Failed to fetch operator:", err);
        setNotFound(true);
      } finally {
        setFetching(false);
      }
    };

    fetchOperator();
  }, [operatorId]);

  const updateField = (
    field: "username" | "nama" | "no_telepon",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username wajib diisi";
    } else if (!/^[a-zA-Z0-9._]+$/.test(formData.username.trim())) {
      newErrors.username = "Username hanya boleh huruf, angka, titik, dan garis bawah";
    }
    if (!formData.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi";
    if (formData.no_telepon.trim() && !PHONE_RE.test(formData.no_telepon.trim())) {
      newErrors.no_telepon = "Nomor HP harus 9-15 digit angka";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await updateOperator(operatorId, {
        username: formData.username.trim(),
        nama: formData.nama.trim(),
        no_telepon: formData.no_telepon.trim() || null,
      });

      if (result) {
        success("Operator berhasil diperbarui!");
        setTimeout(() => {
          router.push(`/administrator/operator/${operatorId}`);
        }, 1500);
      } else {
        error("Gagal memperbarui operator. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Update operator error:", err);
      error("Terjadi kesalahan saat memperbarui operator.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (notFound) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 text-center text-gray-500">
          <p>Operator tidak ditemukan</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Edit Operator</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => updateField("username", e.target.value)}
              placeholder="johndoe"
              maxLength={50}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => updateField("nama", e.target.value)}
              placeholder="John Doe"
              maxLength={100}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                errors.nama ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nama && <p className="text-xs text-red-500 mt-1">{errors.nama}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email tidak dapat diubah</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
            <input
              type="text"
              value={formData.no_telepon}
              onChange={(e) => updateField("no_telepon", e.target.value)}
              placeholder="08123456789"
              maxLength={15}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                errors.no_telepon ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.no_telepon && <p className="text-xs text-red-500 mt-1">{errors.no_telepon}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
