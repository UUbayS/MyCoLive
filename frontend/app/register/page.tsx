"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Lock, AtSign, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    nama_lengkap: "",
    no_telepon: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    const { username, nama_lengkap, no_telepon, email, password, confirmPassword } = formData;

    if (!username.trim()) {
      setError("Username wajib diisi");
      return;
    }
    if (!nama_lengkap.trim()) {
      setError("Nama lengkap wajib diisi");
      return;
    }
    if (!email.trim()) {
      setError("Email wajib diisi");
      return;
    }
    if (!password) {
      setError("Password wajib diisi");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-penghuni`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.trim(),
            nama_lengkap: nama_lengkap.trim(),
            no_telepon: no_telepon.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const result = await res.json();

      if (result.status !== "success") {
        setError(result.message || "Registrasi gagal");
        return;
      }

      const { user, accessToken, refreshToken } = result.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/");
    } catch {
      setError("Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-safe-top pb-safe-bottom text-black">
      <div className="flex-1 flex flex-col w-full max-w-sm mx-auto gap-5 py-6">
        <div className="text-center mb-1">
          <h1 className="text-3xl font-bold text-[#1a1a1a]">Daftar</h1>
          <p className="text-sm text-gray-400 mt-1">Buat akun penghuni baru</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="space-y-3 flex-1 overflow-y-auto">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <User size={20} />
            </div>
            <input
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              placeholder="Username"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <User size={20} />
            </div>
            <input
              type="text"
              autoComplete="name"
              placeholder="Nama Lengkap"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
              value={formData.nama_lengkap}
              onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Phone size={20} />
            </div>
            <div className="absolute left-12 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
              +62
            </div>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="812..."
              className="w-full pl-20 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
              value={formData.no_telepon}
              onChange={(e) => setFormData({ ...formData, no_telepon: e.target.value })}
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <AtSign size={20} />
            </div>
            <input
              type="email"
              inputMode="email"
              autoCapitalize="none"
              autoComplete="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Password (min. 8 karakter)"
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1 active:scale-90 transition-transform"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Lock size={20} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Konfirmasi Password"
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1 active:scale-90 transition-transform"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-[#8dc63f] text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-[#8dc63f]/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mendaftar...
            </span>
          ) : (
            "Daftar"
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#8dc63f] font-semibold active:opacity-70 transition-opacity">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}