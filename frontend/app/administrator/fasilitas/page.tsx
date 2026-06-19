"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Building2, Wind, Loader2, Check, Edit, X } from "lucide-react";
import MainLayout from "../../../components/Layout/MainLayout";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { getUser, isAuthenticated } from "../../../lib/auth";
import { getFasilitasList, createFasilitas, updateFasilitas, deleteFasilitas, FasilitasData } from "../../../lib/api";
import PropertiTabs from "@/components/PropertiTabs";

export default function AdminFasilitasPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"UMUM" | "RUANGAN">("UMUM");
  const [facilities, setFacilities] = useState<FasilitasData[]>([]);
  const [newFacilityName, setNewFacilityName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

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
    loadFacilities();
  }, [router, activeTab]);

  const loadFacilities = async () => {
    setLoading(true);
    const data = await getFasilitasList(activeTab);
    setFacilities(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacilityName.trim()) return;

    setSubmitting(true);
    const result = await createFasilitas(newFacilityName.trim(), activeTab);
    if (result) {
      setFacilities((prev) => [...prev, result].sort((a, b) => a.nama.localeCompare(b.nama)));
      setNewFacilityName("");
    }
    setSubmitting(false);
  };

  const startEdit = (f: FasilitasData) => {
    setEditingId(f.id);
    setEditValue(f.nama);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleUpdate = async () => {
    if (!editValue.trim() || !editingId) return;
    const result = await updateFasilitas(editingId, editValue.trim());
    if (result) {
      setFacilities((prev) =>
        prev
          .map((f) => (f.id === result.id ? result : f))
          .sort((a, b) => a.nama.localeCompare(b.nama))
      );
      cancelEdit();
    }
  };

  const handleDelete = async (id: string) => {
    setItemToDelete(id);
    setShowConfirmDialog(true);
  };

  const actualDelete = async (id: string | null) => {
    if (!id) return;
    const success = await deleteFasilitas(id);
    if (success) {
      setFacilities((prev) => prev.filter((f) => f.id !== id));
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="md:hidden flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Properti Saya</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola semua properti dan kamar Anda</p>
          </div> 
        </div>
        <div className="hidden md:block items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Kelola Fasilitas</h1>
        </div>
        <div className="md:hidden">
          <PropertiTabs />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["UMUM", "RUANGAN"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "UMUM" | "RUANGAN")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#84CC16] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab === "UMUM" ? (
                <span className="flex items-center justify-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Fasilitas Umum
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Wind className="w-4 h-4" />
                  Fasilitas Kamar
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Add Form */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newFacilityName}
            onChange={(e) => setNewFacilityName(e.target.value)}
            placeholder={`Tambah fasilitas ${activeTab === "UMUM" ? "umum" : "ruangan"}...`}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
          />
          <button
            type="submit"
            disabled={submitting || !newFacilityName.trim()}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#84CC16] text-white rounded-xl text-sm font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Tambah
          </button>
        </form>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : facilities.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">Belum ada fasilitas {activeTab === "UMUM" ? "umum" : "ruangan"}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {facilities.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 bg-[#84CC16]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-[#84CC16]" />
                  </div>
                  {editingId === f.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleUpdate();
                        if (e.key === "Escape") cancelEdit();
                      }}
                      autoFocus
                      className="flex-1 min-w-0 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#84CC16]"
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-900 truncate">{f.nama}</span>
                  )}
                </div>
                {editingId === f.id ? (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={handleUpdate}
                      disabled={!editValue.trim()}
                      className="p-2 text-[#84CC16] hover:bg-[#84CC16]/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Simpan"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Batal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(f)}
                      className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit fasilitas"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus fasilitas"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Hapus Fasilitas?"
        message="Fasilitas ini akan dihapus secara permanen."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        danger={true}
        onConfirm={() => { actualDelete(itemToDelete); setShowConfirmDialog(false); }}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </MainLayout>
  );
}
