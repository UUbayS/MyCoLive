"use client";
import { useState } from "react";
import { AtSign, Lock, EyeOff } from "lucide-react";
import { FormInput } from "@/components/FormInput"; // Jalur tanpa 'src'

export default function LoginPage() { // WAJIB ADA 'export default'
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Sesuai endpoint auth.ts [cite: 17]
    const res = await fetch("http://localhost:3000/login", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col px-8 py-20 text-black">
      <h1 className="text-2xl font-bold text-center mb-16">Login</h1>
      
      <FormInput 
        icon={<AtSign size={20} />} 
        type="text" 
        placeholder="Email ID/No Handphone" 
        value={login} 
        onChange={setLogin} 
      />

      <FormInput 
        icon={<Lock size={20} />} 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={setPassword}
        rightIcon={<EyeOff size={18} />}
      />

      <p className="text-right text-blue-400 text-xs mb-8 cursor-pointer">Lupa password?</p>

      <button 
        onClick={handleLogin}
        className="bg-[#8dc63f] text-white py-3 rounded-full font-semibold mb-4 shadow-md active:scale-95 transition-all"
      >
        Masuk
      </button>

      <button className="border border-gray-400 text-gray-600 py-3 rounded-full font-semibold">
        Daftar Sebagai Tenant
      </button>
    </div>
  );
}