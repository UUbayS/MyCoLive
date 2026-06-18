"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { resetPassword } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = sessionStorage.getItem("resetToken");
    if (!t) {
      router.replace("/auth/forgot-password");
      return;
    }
    setToken(t);
    setReady(true);
  }, [router]);

  const handleSubmit = async () => {
    setError("");

    if (!newPassword) {
      setError("Password baru wajib diisi");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password baru minimal 8 karakter");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password dan konfirmasi tidak cocok");
      return;
    }
    if (!token) {
      setError("Token reset tidak ditemukan. Minta kode OTP baru.");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(token, newPassword);
      if (res.status === "error") {
        setError(res.message || "Gagal mereset password");
        return;
      }
      sessionStorage.removeItem("resetToken");
      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 1800);
    } catch (err: any) {
      setError(err?.message || "Tidak dapat terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <AuthLayout>
        <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-white px-5 pt-safe-top pb-safe-bottom text-black items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#84CC16] border-t-transparent rounded-full"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-white px-5 pt-safe-top pb-safe-bottom text-black">
        <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto gap-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-[#1a1a1a]">Password Baru</h1>
            <p className="text-sm text-gray-400 mt-2">
              Masukkan password baru untuk akun Anda
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={18} />
              Password berhasil direset. Mengarahkan ke halaman login...
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Password baru (min. 8 karakter)"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={success}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Konfirmasi password baru"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={success}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1 active:scale-90 transition-transform"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || success}
            className="w-full bg-[#8dc63f] text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-[#8dc63f]/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            Ingat password Anda?{" "}
            <Link href="/auth/login" className="text-[#8dc63f] font-semibold active:opacity-70 transition-opacity">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-8 w-8 border-4 border-[#84CC16] border-t-transparent rounded-full"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
