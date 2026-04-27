"use client";
import { useState } from "react";
import { User, Phone, Mail, Lock, AtSign } from "lucide-react";
import { FormInput } from "@/components/FormInput";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    nama: "",
    no_telepon: "",
    email: "",
    password: "",
    role: "PEMILIK" // Default role sesuai enum Role 
  });

  const handleRegister = async () => {
    const res = await fetch("http://localhost:3000/api/auth/register-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert(result.message || "Berhasil daftar");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col px-8 py-10">
      <h1 className="text-xl font-bold text-center mb-10">Daftar Tenant</h1>
      
      <FormInput icon={<User size={20} />} type="text" placeholder="Username" value={formData.username} onChange={(v) => setFormData({...formData, username: v})} />
      <FormInput icon={<User size={20} />} type="text" placeholder="Nama Lengkap" value={formData.nama} onChange={(v) => setFormData({...formData, nama: v})} />
      <div className="flex items-center gap-2 border-b border-gray-300 mb-4 py-2">
        <Phone size={20} className="text-gray-400" />
        <span className="text-sm">+62</span>
        <input className="w-full focus:outline-none text-sm" placeholder="812..." onChange={(e) => setFormData({...formData, no_telepon: e.target.value})} />
      </div>
      <FormInput icon={<AtSign size={20} />} type="email" placeholder="Email ID" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} />
      <FormInput icon={<Lock size={20} />} type="password" placeholder="Password" value={formData.password} onChange={(v) => setFormData({...formData, password: v})} />
      
      <div className="flex items-center gap-2 mb-8 mt-2">
        <input type="checkbox" className="rounded" />
        <span className="text-xs text-gray-500">Show Password</span>
      </div>

      <button onClick={handleRegister} className="bg-[#8dc63f] text-white py-3 rounded-full font-semibold shadow-md">
        Daftar
      </button>

      <p className="text-center text-xs text-gray-500 mt-6">
        Sudah punya akun? <span className="text-blue-400 cursor-pointer">Masuk</span>
      </p>
    </div>
  );
}