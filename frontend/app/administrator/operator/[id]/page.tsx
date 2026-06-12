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
  Clock,
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import OperatorTabs from "@/components/OperatorTabs";
import ConfirmDialog from "@/components/ConfirmDialog";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getUserList, deleteUser, getPengajuanDanaList, OperatorUserData, PengajuanDanaData } from "@/lib/api";

export default function DetailOperatorPage() {
  const router = useRouter();
  const params = useParams();
  const operatorId = params.id as string;
  const [operator, setOperator] = useState<OperatorUserData | null>(null);
  const [pengajuanList, setPengajuanList] = useState<PengajuanDanaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-40 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  if (!operator) {
    return (
      <MainLayout>
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
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Operator Properti</h1>
        <h2 className="hidden md:block text-base font-medium text-gray-600 mb-4">Operator Properti — Detail Operator</h2>
        <div className="md:hidden">
          <OperatorTabs />
        </div>

        {/* Back Button */}
        <Link
          href="/administrator/operator/daftar"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Kembali
        </Link>

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

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleteLoading}
              className="flex items-center justify-center gap-2 flex-1 py-2.5 border-2 border-red-500 text-red-500 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Operator
            </button>
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
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
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
    </MainLayout>
  );
}
