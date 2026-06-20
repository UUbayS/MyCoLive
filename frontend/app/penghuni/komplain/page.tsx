"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import MainLayout from "../../../components/Layout/MainLayout";
import KomplainCard from "../../../components/KomplainCard";
import KomplainFormModal from "../../../components/KomplainFormModal";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { apiFetch } from "../../../lib/auth";
import { useRealtime } from "../../../lib/useRealtime";
import { Plus, CheckCircle } from "lucide-react";

interface Komplain {
  id: string;
  masalah: string;
  jenis: string;
  deskripsi: string;
  foto?: string | null;
  status: string;
  created_at: string;
  properti: { nama: string };
}

export default function Komplain() {
  const [komplainList, setKomplainList] = useState<Komplain[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editKomplain, setEditKomplain] = useState<Komplain | null>(null);
  const [deleteKomplain, setDeleteKomplain] = useState<Komplain | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [propertiId, setPropertiId] = useState("");
  const [noRoom, setNoRoom] = useState(false);
  const fetchedRef = useRef(false);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchKomplain = useCallback(async () => {
    try {
      const komplainRes = await apiFetch<{ data: Komplain[] }>("/api/komplain/my");
      setKomplainList(komplainRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const init = async () => {
      try {
        const penghuniRes = await apiFetch<{ data: { kamar: { properti: { id: string } } | null } }>("/api/penghuni/me");
        if (penghuniRes.data.kamar) {
          setPropertiId(penghuniRes.data.kamar.properti.id);
        } else {
          setNoRoom(true);
        }
      } catch (err) {
        console.error(err);
        setNoRoom(true);
      }
      await fetchKomplain();
    };

    init();

    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, [fetchKomplain]);

  useRealtime("komplain:baru", () => fetchKomplain());
  useRealtime("komplain:status", () => fetchKomplain());

  const handleSuccess = () => {
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
    setShowSuccess(true);

    fetchKomplain();

    successTimerRef.current = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleDelete = async () => {
    if (!deleteKomplain) return;
    setDeleteLoading(true);
    try {
      await apiFetch(`/api/komplain/${deleteKomplain.id}`, { method: "DELETE" });
      setDeleteKomplain(null);
      fetchKomplain();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const activeKomplain = komplainList.filter((k) => k.status !== "SELESAI");
  const historyKomplain = komplainList.filter((k) => k.status === "SELESAI");

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Komplain</h1>
          {!noRoom && (
            <button
              onClick={() => { setEditKomplain(null); setShowModal(true); }}
              className="hidden md:flex items-center gap-2 bg-[#84CC16] text-white font-semibold px-4 py-2 rounded-xl hover:bg-[#84CC16]/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Tambah Komplain
            </button>
          )}
        </div>

        {showSuccess && (
          <div className="flex items-center gap-3 bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className="text-green-700 font-medium text-sm">
              Komplain telah berhasil dikirim dan akan diproses
            </p>
          </div>
        )}

        {noRoom ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg font-medium mb-2">Belum memiliki kamar</p>
            <p className="text-sm">Silakan pesan kamar terlebih dahulu untuk membuat komplain.</p>
          </div>
        ) : (
          <>
            {activeKomplain.length > 0 && (
              <div className="space-y-3 mb-6">
                {activeKomplain.map((k) => (
                  <KomplainCard
                    key={k.id}
                    komplain={k}
                    onEdit={() => { setEditKomplain(k); setShowModal(true); }}
                    onDelete={() => setDeleteKomplain(k)}
                  />
                ))}
              </div>
            )}

            {historyKomplain.length > 0 && (
              <>
                <h2 className="text-xl font-bold mb-3">Riwayat Komplain</h2>
                <div className="space-y-3">
                  {historyKomplain.map((k) => (
                    <KomplainCard key={k.id} komplain={k} />
                  ))}
                </div>
              </>
            )}

            {komplainList.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-400">
                <p>Belum ada komplain</p>
              </div>
            )}

            <button
              onClick={() => { setEditKomplain(null); setShowModal(true); }}
              className="md:hidden fixed bottom-24 right-4 bg-[#84CC16] text-white p-4 rounded-full shadow-lg z-40 flex items-center justify-center hover:bg-[#84CC16]/90 transition-colors"
              aria-label="Tambah Komplain"
            >
              <Plus className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      <KomplainFormModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditKomplain(null); }}
        onSuccess={handleSuccess}
        propertiId={propertiId}
        komplain={editKomplain}
      />

      <ConfirmDialog
        isOpen={!!deleteKomplain}
        title="Hapus Komplain?"
        message={`Komplain "${deleteKomplain?.masalah ?? ""}" akan dihapus secara permanen.`}
        confirmLabel={deleteLoading ? "Menghapus..." : "Hapus"}
        cancelLabel="Batal"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteKomplain(null)}
      />
    </MainLayout>
  );
}
