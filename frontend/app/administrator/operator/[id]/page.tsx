"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "../../../../lib/ToastContext";
import Link from "next/link";
import {
  User,
  Building2,
  Phone,
  ChevronLeft,
  Trash2,
  Shield,
  Banknote,
  Calendar,
  AlertCircle,
  Lock,
  Edit,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import OperatorTabs from "@/components/OperatorTabs";
import ConfirmDialog from "@/components/ConfirmDialog";
import { getUser, isAuthenticated } from "@/lib/auth";
import Modal from "@/components/ui/Modal";
import { getUserList, deleteUser, resetUserPassword, getPengajuanDanaList, OperatorUserData, PengajuanDanaData } from "@/lib/api";

export default function DetailOperatorPage() {
  const router = useRouter();
  const params = useParams();
  const operatorId = params.id as string;
  const [operator, setOperator] = useState<OperatorUserData | null>(null);
  const [pengajuanList, setPengajuanList] = useState<PengajuanDanaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const fetchedRef = useRef(false);
  const { success, error } = useToast();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PEMILIK") {
      router.push("/public/katalog-properti");
      return;
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const [users, danaList] = await Promise.all([
          getUserList(),
          getPengajuanDanaList(),
        ]);
        const op = users.find((u) => u.id === operatorId && u.role === "PENGELOLA");
        setOperator(op || null);
        setPengajuanList(danaList.filter((d) => d.operator_id === operatorId));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, operatorId]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const result = await deleteUser(operatorId);
      if (result) {
        success("Operator berhasil dihapus");
        setTimeout(() => {
          router.push("/administrator/operator/daftar");
        }, 1500);
      } else {
        error("Gagal menghapus operator");
      }
    } catch {
      error("Terjadi kesalahan saat menghapus operator");
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-40 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </>
    );
  }

  if (!operator) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 text-center text-gray-500">
          <Shield className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Operator tidak ditemukan</p>
          <Link
            href="/administrator/operator/daftar"
            className="inline-flex items-center gap-1 text-[#84CC16] hover:underline mt-2 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Daftar Operator
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Detail Operator</h1>
          </div>
          <Link
            href={`/administrator/operator/${operatorId}/edit`}
            className="flex items-center gap-2 md:px-4 md:py-4 px-2 py-2 bg-[#84CC16] text-white rounded-lg hover:bg-[#65a30d] transition-colors text-sm font-medium shadow-sm shrink-0"
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Operator</span>
            <span className="md:hidden">Edit</span>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 mb-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#84CC16]/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 md:w-6 md:h-6 text-[#84CC16]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base md:text-lg font-semibold text-gray-900 truncate">{operator.nama}</h1>
                <p className="text-xs md:text-sm text-gray-500 truncate">{operator.email}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
              PENGELOLA
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-400 shrink-0">Username:</span>
              <span className="font-medium">{operator.username}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-400 shrink-0">No. Telepon:</span>
              <span className="font-medium">{operator.no_telepon || "-"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-400 shrink-0">Bergabung:</span>
              <span className="font-medium">
                {new Date(operator.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Properti Info */}
        {operator.properti && operator.properti.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Properti yang Dikelola
            </h2>
            <div className="space-y-2">
              {operator.properti.map((p) => (
                <div key={p.id} className="flex items-center gap-2 text-xs md:text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
                  <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="font-medium">{p.nama}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Riwayat Pengajuan Dana */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Banknote className="w-4 h-4" />
            Riwayat Pengajuan Dana
          </h2>

          {pengajuanList.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              <Banknote className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>Belum ada pengajuan dana</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pengajuanList.map((d) => {
                const statusColor =
                  d.status === "MENUNGGU"
                    ? "bg-yellow-100 text-yellow-700"
                    : d.status === "DITERIMA"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700";
                const statusLabel =
                  d.status === "MENUNGGU"
                    ? "Menunggu"
                    : d.status === "DITERIMA"
                    ? "Diterima"
                    : "Ditolak";

                return (
                  <div key={d.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">{d.tujuan}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${statusColor}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {d.properti?.nama || "-"} • {new Date(d.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 shrink-0">
                      Rp {(d.jumlah || 0).toLocaleString("id-ID")}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-4 py-8 hover:bg-gray-50 active:scale-[0.98] transition-all mb-4"
        >
          <div className="flex items-center gap-3">
            <Lock size={20} className="text-gray-600" />
            <span className="text-base font-medium text-black">Reset Password</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400">
            <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

{showPasswordModal && (
  <ResetPasswordModal
    userId={operatorId}
    onClose={() => setShowPasswordModal(false)}
  />
)}

        {/* Zona Berbahaya */}
        <div className="bg-red-50 rounded-xl p-5 border border-red-100 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Zona Berbahaya
              </h2>
              <p className="text-sm text-red-600 mt-1">
                Menghapus akun Operator ini akan menghilangkan seluruh datanya secara permanen.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus Operator</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus operator ${operator.nama}? Tindakan ini tidak bisa dibatalkan.`}
        confirmLabel={deleteLoading ? "Menghapus..." : "Hapus"}
        cancelLabel="Batal"
        danger
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
}

function ResetPasswordModal({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Semua field wajib diisi");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password baru minimal 8 karakter");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi tidak cocok");
      return;
    }

    setLoading(true);

    try {
      const result = await resetUserPassword(userId, newPassword);

      if (result && result.status === "success") {
        onClose();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal mengubah password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Reset Password" position="bottom" size="md">
      <div className="p-4 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Baru
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Lock size={20} />
              </div>
              <input
                type={showNew ? "text" : "password"}
                placeholder="Password baru"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1 active:scale-90 transition-transform"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Lock size={20} />
              </div>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Konfirmasi password baru"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
        </div>

        <div className="pt-2">
          <button
            onClick={handleReset}
            disabled={loading}
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
              "Simpan"
            )}
          </button>
        </div>
      </Modal>
  );
}