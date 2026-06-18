"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { requestForgotPassword, verifyOtp } from "@/lib/api";

const RESEND_COOLDOWN = 60;

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginParam = searchParams.get("login") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!loginParam) {
      router.replace("/auth/forgot-password");
    }
  }, [loginParam, router]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleChange = (idx: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    if (value.length > 1) {
      const chars = value.slice(0, 6 - idx).split("");
      for (let i = 0; i < chars.length; i++) {
        next[idx + i] = chars[i];
      }
      const lastIdx = Math.min(idx + chars.length, 5);
      setOtp(next);
      inputRefs.current[lastIdx]?.focus();
      return;
    }
    next[idx] = value;
    setOtp(next);
    if (value && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const next = [...otp];
    for (let i = 0; i < 6; i++) {
      next[i] = text[i] || "";
    }
    setOtp(next);
    const lastIdx = Math.min(text.length, 5);
    inputRefs.current[lastIdx]?.focus();
  };

  const handleSubmit = async () => {
    setError("");
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Masukkan 6 digit kode OTP");
      return;
    }

    setLoading(true);
    try {
      const data = await verifyOtp(loginParam, code);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("resetToken", data.resetToken);
      }
      router.push("/auth/reset-password");
    } catch (err: any) {
      setError(err?.message || "Kode OTP tidak valid");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setError("");
    setResending(true);
    try {
      const res = await requestForgotPassword(loginParam);
      if (res.status === "error") {
        setError(res.message);
      } else {
        setOtp(["", "", "", "", "", ""]);
        setCooldown(RESEND_COOLDOWN);
        inputRefs.current[0]?.focus();
      }
    } catch (err: any) {
      setError(err?.message || "Gagal mengirim ulang OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-white px-5 pt-safe-top pb-safe-bottom text-black">
        <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto gap-6">
          <Link
            href="/auth/forgot-password"
            className="text-gray-500 text-sm flex items-center gap-1 active:opacity-70 transition-opacity w-fit"
          >
            <ArrowLeft size={16} />
            Kembali
          </Link>

          <div className="text-center mb-2">
            <div className="w-16 h-16 rounded-full bg-[#8dc63f]/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={28} className="text-[#8dc63f]" />
            </div>
            <h1 className="text-3xl font-bold text-[#1a1a1a]">Verifikasi OTP</h1>
            <p className="text-sm text-gray-400 mt-2">
              Masukkan 6 digit kode yang dikirim ke WhatsApp Anda
              {loginParam ? ` (${loginParam})` : ""}.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className="w-full h-14 text-center text-2xl font-semibold bg-gray-50 border border-gray-200 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
              />
            ))}
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
                Memverifikasi...
              </span>
            ) : (
              "Verifikasi"
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            Tidak menerima kode?{" "}
            <button
              onClick={handleResend}
              disabled={cooldown > 0 || resending}
              className="text-[#8dc63f] font-semibold active:opacity-70 transition-opacity disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {cooldown > 0 ? `Kirim ulang (${cooldown}s)` : "Kirim ulang"}
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-8 w-8 border-4 border-[#84CC16] border-t-transparent rounded-full"></div>
      </div>
    }>
      <VerifyOtpForm />
    </Suspense>
  );
}
