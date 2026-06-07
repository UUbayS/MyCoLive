"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, ChevronDown, Check, Eye, EyeOff } from "lucide-react";
import MainLayout from "../../../../components/Layout/MainLayout";
import { getUser, isAuthenticated } from "../../../../lib/auth";
import { getPropertiList, createOperator, PropertiData } from "../../../../lib/api";

function validatePhone(phone: string): boolean {
  if (!phone) return true; // optional
  const cleaned = phone.replace(/\s/g, "");
  return cleaned.startsWith("08") || cleaned.startsWith("62") || cleaned.startsWith("+62");
}

export default function TambahOperatorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [propertiList, setPropertiList] = useState<PropertiData[]>([]);
  const [propertiLoading, setPropertiLoading] = useState(true);
  const [showPropertiDropdown, setShowPropertiDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    username: "",
    nama: "",
    email: "",
    no_telepon: "",
    password: "",
    konfirmasi_password: "",
    properti_ids: [] as string[],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const user = getUser();
    if (user && user.role !== "PEMILIK") {
      router.push("/public/katalog-properti");
    }

    const fetchProperti = async () => {
      try {
        const data = await getPropertiList();
        setPropertiList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setPropertiLoading(false);
      }
    };

    fetchProperti();
  }, [router]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPropertiDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username.trim()) newErrors.username = "Username wajib diisi";
    if (!formData.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (formData.no_telepon && !validatePhone(formData.no_telepon)) {
      newErrors.no_telepon = "Format nomor telepon tidak valid (gunakan 08... atau 62...)";
    }
    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }
    if (!formData.konfirmasi_password) {
      newErrors.konfirmasi_password = "Konfirmasi password wajib diisi";
    } else if (formData.konfirmasi_password !== formData.password) {
      newErrors.konfirmasi_password = "Konfirmasi password tidak cocok";
    }
    if (formData.properti_ids.length === 0) {
      newErrors.properti_ids = "Pilih minimal 1 properti yang dikelola";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await createOperator({
        username: formData.username.trim(),
        nama: formData.nama.trim(),
        email: formData.email.trim(),
        no_telepon: formData.no_telepon.trim() || null,
        password: formData.password,
        properti_ids: formData.properti_ids,
      });

      if (result) {
        alert("Operator berhasil ditambahkan!");
        router.push("/administrator/operator/daftar");
      } else {
        alert("Gagal menambahkan operator. Silakan coba lagi.");
      }
    } catch (error: any) {
      console.error("Create operator error:", error);
      const msg = error?.message || "";
      if (msg.includes("Email sudah terdaftar")) {
        setErrors((prev) => ({ ...prev, email: "Email sudah terdaftar" }));
      } else if (msg.includes("Username sudah digunakan")) {
        setErrors((prev) => ({ ...prev, username: "Username sudah digunakan" }));
      } else {
        alert("Terjadi kesalahan saat menambahkan operator.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleProperti = (id: string) => {
    setFormData((prev) => {
      const exists = prev.properti_ids.includes(id);
      const next = exists ? prev.properti_ids.filter((p) => p !== id) : [...prev.properti_ids, id];
      return { ...prev, properti_ids: next };
    });
    // clear error when user selects something
    if (errors.properti_ids) {
      setErrors((prev) => {
        const { properti_ids, ...rest } = prev;
        return rest;
      });
    }
  };

  const selectedPropertiLabels = propertiList
    .filter((p) => formData.properti_ids.includes(p.id))
    .map((p) => p.nama);

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
          <h1 className="text-xl font-semibold">Tambah Operator</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="johndoe"
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
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              placeholder="John Doe"
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
            <input
              type="text"
              value={formData.no_telepon}
              onChange={(e) => setFormData({ ...formData, no_telepon: e.target.value })}
              placeholder="08123456789"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                errors.no_telepon ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.no_telepon && <p className="text-xs text-red-500 mt-1">{errors.no_telepon}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Properti yang Dikelola</label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowPropertiDropdown((prev) => !prev)}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                  errors.properti_ids ? "border-red-500" : "border-gray-300"
                }`}
              >
                <span className={selectedPropertiLabels.length > 0 ? "text-gray-900" : "text-gray-400"}>
                  {selectedPropertiLabels.length > 0
                    ? selectedPropertiLabels.join(", ")
                    : propertiLoading
                    ? "Memuat properti..."
                    : "Pilih properti"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
              </button>

              {showPropertiDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {propertiList.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">Belum ada properti</div>
                  ) : (
                    propertiList.map((p) => {
                      const selected = formData.properti_ids.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => toggleProperti(p.id)}
                          className="w-full px-4 py-2.5 flex items-center gap-3 text-sm hover:bg-gray-50 transition-colors text-left"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              selected ? "bg-[#84CC16] border-[#84CC16]" : "border-gray-300"
                            }`}
                          >
                            {selected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-gray-900">{p.nama}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
            {errors.properti_ids && <p className="text-xs text-red-500 mt-1">{errors.properti_ids}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Minimal 8 karakter"
                className={`w-full px-4 pr-10 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.konfirmasi_password}
                onChange={(e) => setFormData({ ...formData, konfirmasi_password: e.target.value })}
                placeholder="Ulangi password"
                className={`w-full px-4 pr-10 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                  errors.konfirmasi_password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.konfirmasi_password && <p className="text-xs text-red-500 mt-1">{errors.konfirmasi_password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              "Menyimpan..."
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Tambah Operator
              </>
            )}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
