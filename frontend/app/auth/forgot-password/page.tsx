"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AtSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { requestForgotPassword } from "@/lib/api";

function ForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, setLogin] = useState(searchParams.get("login") || "");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setInfo("");

    if (!login.trim()) {
      setError("Email atau nomor telepon wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const res = await requestForgotPassword(login.trim());
      if (res.status === "error") {
        setError(res.message || "Gagal mengirim OTP");
        return;
      }
      setInfo(res.message);
      setTimeout(() => {
        router.push(`/auth/verify-otp?login=${encodeURIComponent(login.trim())}`);
      }, 800);
    } catch (err: any) {
      setError(err?.message || "Tidak dapat terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-white px-5 pt-safe-top pb-safe-bottom text-black">
        <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto gap-6">
          <Link
            href="/auth/login"
            className="text-gray-500 text-sm flex items-center gap-1 active:opacity-70 transition-opacity w-fit"
          >
            <ArrowLeft size={16} />
            Kembali ke Masuk
          </Link>

          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-[#1a1a1a]">Lupa Password</h1>
            <p className="text-sm text-gray-400 mt-2">
              Masukkan email atau nomor HP. Kami akan kirim kode OTP ke WhatsApp Anda.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {info && !error && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
              {info}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <AtSign size={20} />
              </div>
              <input
                type="text"
                inputMode="email"
                autoCapitalize="none"
                autoComplete="username"
                placeholder="Email atau No. HP"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#8dc63f] text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-[#8dc63f]/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim...
              </span>
            ) : (
              "Kirim Kode OTP"
            )}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-8 w-8 border-4 border-[#84CC16] border-t-transparent rounded-full"></div>
      </div>
    }>
      <ForgotPasswordForm />
    </Suspense>
  );
}
