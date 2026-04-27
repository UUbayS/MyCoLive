"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!login.trim() || !password.trim()) {
      setError("Email/No. HP dan password wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const result = await res.json();

      if (result.status !== "success") {
        setError(result.message || "Login gagal");
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
      <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto gap-6">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-[#1a1a1a]">Masuk</h1>
          <p className="text-sm text-gray-400 mt-2">Selamat datang kembali!</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
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
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <p className="text-right text-[#8dc63f] text-sm font-medium select-none cursor-pointer active:opacity-70 transition-opacity">
          Lupa password?
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#8dc63f] text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-[#8dc63f]/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Masuk...
            </span>
          ) : (
            "Masuk"
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="text-[#8dc63f] font-semibold active:opacity-70 transition-opacity">
            Daftar sebagai Penghuni
          </Link>
        </p>
      </div>
    </div>
  );
}