"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { setAuth } from "@/lib/auth";
import { realtimeClient } from "@/lib/useRealtime";

type FieldErrors = Partial<Record<"login" | "password", string>>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, [searchParams]);

  const clearFieldError = (field: keyof FieldErrors) =>
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleLogin = async () => {
    setError("");

    const errors: FieldErrors = {};
    if (!login.trim()) errors.login = "Email atau No. HP wajib diisi";
    if (!password.trim()) errors.password = "Password wajib diisi";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, password }),
        },
      );

      const result = await res.json();

      if (result.status !== "success") {
        setError(result.message || "Login gagal");
        return;
      }

      const { user, accessToken, refreshToken } = result.data;

      setAuth({ user, accessToken, refreshToken });
      realtimeClient.reconnect();

      // If redirect URL exists, navigate there
      if (redirectUrl) {
        router.push(redirectUrl);
        return;
      }

      // Otherwise, redirect by role
      if (user.role === "PEMILIK") {
        router.push("/administrator/properti");
      } else if (user.role === "PENGELOLA") {
        router.push("/pengelola/properti");
      } else {
        router.push("/penghuni/kamar-saya");
      }
    } catch {
      setError(
        "Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError: boolean, extra = "") =>
    `w-full pl-12 ${extra} py-4 bg-gray-50 border rounded-2xl text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
      hasError
        ? "border-red-300 focus:ring-red-400"
        : "border-gray-200 focus:ring-[#8dc63f]"
    }`;

  return (
    <AuthLayout>
      <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-white px-5 pt-safe-top pb-safe-bottom text-black">
        <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto gap-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-[#1a1a1a]">Masuk</h1>
            <p className="text-sm text-gray-400 mt-2">
              Selamat datang kembali!
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="login"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Email atau No. HP
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <AtSign size={20} />
                </div>
                <input
                  id="login"
                  type="text"
                  inputMode="email"
                  autoCapitalize="none"
                  autoComplete="username"
                  placeholder="Email atau No. HP"
                  maxLength={254}
                  className={inputClass(!!fieldErrors.login, "pr-4")}
                  value={login}
                  onChange={(e) => {
                    setLogin(e.target.value);
                    if (fieldErrors.login) clearFieldError("login");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              {fieldErrors.login && (
                <p className="text-red-500 text-xs mt-1.5">
                  {fieldErrors.login}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Password"
                  maxLength={72}
                  className={inputClass(!!fieldErrors.password, "pr-12")}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) clearFieldError("password");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1 active:scale-90 transition-transform"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1.5">
                  {fieldErrors.password}
                </p>
              )}
            </div>
          </div>

          <Link
            href="/auth/forgot-password"
            className="text-right text-[#8dc63f] text-sm font-medium select-none active:opacity-70 transition-opacity block"
          >
            Lupa password?
          </Link>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#8dc63f] text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-[#8dc63f]/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Masuk...
              </span>
            ) : (
              "Masuk"
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            Belum punya akun?{" "}
            <Link
              href={
                redirectUrl
                  ? `/auth/register?redirect=${encodeURIComponent(redirectUrl)}`
                  : "/auth/register"
              }
              className="text-[#8dc63f] font-semibold active:opacity-70 transition-opacity"
            >
              Daftar sebagai Penghuni
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin h-8 w-8 border-4 border-[#84CC16] border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
