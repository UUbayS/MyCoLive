"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../../lib/ToastContext";
import Link from "next/link";
import {
  Search,
  User,
  Building2,
  Phone,
  ChevronRight,
  Trash2,
  Loader2,
  Wrench,
  Plus,
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import OperatorTabs from "@/components/OperatorTabs";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getUserList, deleteUser, OperatorUserData } from "@/lib/api";

export default function DaftarOperatorPage() {
  const router = useRouter();
  const [operatorList, setOperatorList] = useState<OperatorUserData[]>([]);
  const [filteredList, setFilteredList] = useState<OperatorUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
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
        const data = await getUserList();
        const operators = data.filter((u) => u.role === "PENGELOLA");
        setOperatorList(operators);
        setFilteredList(operators);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    let result = [...operatorList];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (o) =>
          o.nama.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q) ||
          (o.no_telepon || "").includes(q)
      );
    }

    setFilteredList(result);
  }, [search, operatorList]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-20 md:px-6 md:pt-8 md:pb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Operator Properti</h1>
        <h2 className="hidden md:block text-base font-medium text-gray-600 mb-4">Operator Properti — Daftar Operator</h2>
        <div className="md:hidden">
          <OperatorTabs />
        </div>

        {/* Actions + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, email, atau no. telepon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent"
            />
          </div>
          <Link
            href="/administrator/operator/tambah"
            className="hidden md:inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#84CC16] text-white text-sm font-medium rounded-xl hover:bg-[#73b814] transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Operator
          </Link>
        </div>

        {/* FAB for mobile */}
        <Link
          href="/administrator/operator/tambah"
          className="md:hidden fixed bottom-24 right-4 gap-1.5 px-4 py-4 bg-[#84CC16] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#73b814] transition-colors z-40"
          aria-label="Tambah Operator"
        >
          <Plus className="w-6 h-6" />
          <span>Tambah Operator</span>
        </Link>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Wrench className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Belum ada operator</p>
            <p className="text-sm mt-1">Data operator akan muncul setelah ditambahkan.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredList.map((o) => (
              <div
                key={o.id}
                className="block bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/administrator/operator/${o.id}`}
                    className="flex-1 min-w-0"
                  >
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{o.nama}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
                        PENGELOLA
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mb-2 truncate">{o.email}</p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-1 gap-x-4 text-xs text-gray-500">
                      {o.no_telepon && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 shrink-0" />
                          {o.no_telepon}
                        </span>
                      )}
                      {o.properti && o.properti.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          {o.properti.map((p) => p.nama).join(", ")}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/administrator/operator/${o.id}`}>
                      <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
