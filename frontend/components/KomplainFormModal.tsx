import { useState } from "react";
import { apiFetch } from "../lib/auth";

interface KomplainFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  propertiId: string;
}

const jenisOptions = [
  { value: "FASILITAS", label: "Fasilitas" },
  { value: "LINGKUNGAN", label: "Lingkungan" },
  { value: "PENGHUNI_LAIN", label: "Penghuni Lain" },
  { value: "LAINNYA", label: "Lainnya" },
];

export default function KomplainFormModal({ isOpen, onClose, onSuccess, propertiId }: KomplainFormModalProps) {
  const [masalah, setMasalah] = useState("");
  const [jenis, setJenis] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!masalah || !jenis || !deskripsi) {
      setError("Semua field wajib diisi");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/api/komplain", {
        method: "POST",
        body: JSON.stringify({
          masalah,
          jenis,
          deskripsi,
          properti_id: propertiId,
        }),
      });
      onSuccess();
      onClose();
      setMasalah("");
      setJenis("");
      setDeskripsi("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal mengirim komplain";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-t-3xl w-full max-w-md p-6 pb-8 animate-slide-in-bottom">
        <h2 className="text-xl font-bold text-center mb-6">Tambahkan Komplain</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Masalah"
            value={masalah}
            onChange={(e) => setMasalah(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:border-[#84CC16] focus:outline-none placeholder-gray-400"
          />

          <div className="relative">
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm appearance-none focus:border-[#84CC16] focus:outline-none bg-white"
            >
              <option value="">Jenis</option>
              {jenisOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <textarea
            placeholder="Deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm resize-none focus:border-[#84CC16] focus:outline-none placeholder-gray-400"
          />

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#84CC16] text-white font-semibold py-3 rounded-full hover:bg-[#73B814] transition-colors disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim Komplain"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full border-2 border-[#84CC16] text-[#84CC16] font-semibold py-3 rounded-full hover:bg-[#84CC16]/10 transition-colors"
            >
              Batalkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
