"use client";

import { useState, useEffect, useRef } from "react";
import MainLayout from "../../../components/Layout/MainLayout";
import KomplainCard from "../../../components/KomplainCard";
import KomplainFormModal from "../../../components/KomplainFormModal";
import { apiFetch } from "../../../lib/auth";
import { Plus, CheckCircle } from "lucide-react";

interface Komplain {
  id: string;
  masalah: string;
  jenis: string;
  deskripsi: string;
  status: string;
  created_at: string;
  properti: { nama: string };
}

export default function Komplain() {
  const [komplainList, setKomplainList] = useState<Komplain[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [propertiId, setPropertiId] = useState("");
  const [noRoom, setNoRoom] = useState(false);
  const fetchedRef = useRef(false);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
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

      try {
        const komplainRes = await apiFetch<{ data: Komplain[] }>("/api/komplain/my");
        setKomplainList(komplainRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleSuccess = () => {
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
    setShowSuccess(true);

    apiFetch<{ data: Komplain[] }>("/api/komplain/my")
      .then((res) => setKomplainList(res.data))
      .catch((err) => console.error(err));

    successTimerRef.current = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const activeKomplain = komplainList.filter((k) => k.status !== "SELESAI");
  const historyKomplain = komplainList.filter((k) => k.status === "SELESAI");

  return (
    <MainLayout>
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Komplain</h1>

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
            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center justify-center gap-2 border-2 border-[#84CC16] text-[#84CC16] font-semibold py-3 rounded-xl mb-6 hover:bg-[#84CC16]/10 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Tambah Komplain
            </button>

            {activeKomplain.length > 0 && (
              <div className="space-y-3 mb-6">
                {activeKomplain.map((k) => (
                  <KomplainCard key={k.id} komplain={k} />
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
          </>
        )}
      </div>

      <KomplainFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleSuccess}
        propertiId={propertiId}
      />
    </MainLayout>
  );
}
