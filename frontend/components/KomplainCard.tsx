import { Trash2 } from "lucide-react";

interface KomplainCardProps {
  komplain: {
    id: string;
    masalah: string;
    jenis: string;
    created_at: string;
    status: string;
  };
}

const statusConfig: Record<string, { label: string; class: string }> = {
  BARU: { label: "Baru", class: "bg-blue-500 text-white" },
  DIPROSES: { label: "Diproses", class: "bg-yellow-400 text-white" },
  SELESAI: { label: "Selesai", class: "bg-green-500 text-white" },
};

const jenisLabel: Record<string, string> = {
  FASILITAS: "Fasilitas",
  LINGKUNGAN: "Lingkungan",
  PENGHUNI_LAIN: "Penghuni Lain",
  LAINNYA: "Lainnya",
};

export default function KomplainCard({ komplain }: KomplainCardProps) {
  const status = statusConfig[komplain.status] || statusConfig.BARU;
  const tanggal = new Date(komplain.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{komplain.masalah}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Jenis: {jenisLabel[komplain.jenis] || komplain.jenis}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Dilaporkan pd: {tanggal}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.class}`}>
            {status.label}
          </span>
          {komplain.status !== "SELESAI" && (
            <button className="text-red-500 hover:text-red-600 p-1">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
