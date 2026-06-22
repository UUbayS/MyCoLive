"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../lib/ToastContext";
import {
  Banknote,
  Plus,
  Loader2,
  Clock,
  Building2,
  Eye,
  ChevronDown,
  Check,
  Copy,
} from "lucide-react";
import MainLayout from "../../../components/Layout/MainLayout";
import ImageUploader from "../../../components/ImageUploader";
import Modal from "../../../components/ui/Modal";
import { getUser, isAuthenticated } from "../../../lib/auth";
import {
  getPropertiList,
  getMyDanaList,
  createPengajuanDana,
  getPengelolaRekening,
  PropertiData,
  PengajuanDanaData,
  PengelolaBankAccountData,
} from "../../../lib/api";
import { useRealtime } from "../../../lib/useRealtime";

const statusBadge: Record<string, { label: string; color: string }> = {
  MENUNGGU: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700" },
  DITERIMA: { label: "Diterima", color: "bg-green-100 text-green-700" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-700" },
};

export default function RequestDanaPengelolaPage() {
  const router = useRouter();
  const [danaList, setDanaList] = useState<PengajuanDanaData[]>([]);
  const [filteredList, setFilteredList] = useState<PengajuanDanaData[]>([]);
  const [propertiList, setPropertiList] = useState<PropertiData[]>([]);
  const [bankAccounts, setBankAccounts] = useState<PengelolaBankAccountData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedFoto, setSelectedFoto] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fetchedRef = useRef(false);

  const [formData, setFormData] = useState({
    properti_id: "",
    tujuan: "",
    jumlah: "",
    no_rekening: "",
    foto: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPropertiDropdown, setShowPropertiDropdown] = useState(false);
  const { success, error } = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    success("No. Rekening berhasil disalin!");
  };

  const fetchData = useCallback(async () => {
    try {
      const [danaData, propertiData, accountsData] = await Promise.all([
        getMyDanaList(),
        getPropertiList(),
        getPengelolaRekening(),
      ]);
      setDanaList(danaData);
      setFilteredList(danaData);
      setPropertiList(propertiData);
      setBankAccounts(accountsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PENGELOLA") {
      router.push("/public/katalog-properti");
      return;
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetchData();
  }, [router, fetchData]);

  useRealtime("dana:baru", () => fetchData());
  useRealtime("dana:status", () => fetchData());

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredList(danaList);
    } else if (activeTab === "pending") {
      setFilteredList(danaList.filter((d) => d.status === "MENUNGGU"));
    } else if (activeTab === "accepted") {
      setFilteredList(danaList.filter((d) => d.status === "DITERIMA"));
    } else if (activeTab === "rejected") {
      setFilteredList(danaList.filter((d) => d.status === "DITOLAK"));
    }
  }, [activeTab, danaList]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPropertiDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.properti_id) newErrors.properti_id = "Pilih properti";
    if (!formData.tujuan.trim()) newErrors.tujuan = "Tujuan wajib diisi";
    if (!formData.jumlah.trim()) {
      newErrors.jumlah = "Jumlah wajib diisi";
    } else {
      const num = parseInt(formData.jumlah.replace(/\D/g, ""));
      if (!num || num <= 0) newErrors.jumlah = "Jumlah harus lebih dari 0";
    }
    if (!formData.no_rekening.trim()) newErrors.no_rekening = "No. rekening wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await createPengajuanDana({
        properti_id: formData.properti_id,
        tujuan: formData.tujuan.trim(),
        jumlah: parseInt(formData.jumlah.replace(/\D/g, "")),
        no_rekening: formData.no_rekening.trim(),
        foto: formData.foto.length > 0 ? formData.foto[0] : null,
      });

      if (result) {
        setShowModal(false);
        setFormData({
          properti_id: "",
          tujuan: "",
          jumlah: "",
          no_rekening: "",
          foto: [],
        });
        const updated = await getMyDanaList();
        setDanaList(updated);
        success("Pengajuan dana berhasil dikirim");
      } else {
        error("Gagal mengajukan dana");
      }
    } catch (err) {
      console.error(err);
      error("Terjadi kesalahan saat mengajukan dana");
    } finally {
      setSubmitting(false);
    }
  };

  const formatRupiah = (value: string) => {
    const num = value.replace(/\D/g, "");
    if (!num) return "";
    return "Rp " + parseInt(num).toLocaleString("id-ID");
  };

  const parseRupiah = (value: string) => value.replace(/\D/g, "");

  const selectedProperti = propertiList.find((p) => p.id === formData.properti_id);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Request Dana</h1>
          <button
            onClick={() => setShowModal(true)}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-[#84CC16] text-white text-sm font-medium rounded-xl hover:bg-[#73b814] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajukan Dana
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { key: "all" as const, label: "Semua", count: danaList.length },
            { key: "pending" as const, label: "Menunggu", count: danaList.filter((d) => d.status === "MENUNGGU").length },
            { key: "accepted" as const, label: "Diterima", count: danaList.filter((d) => d.status === "DITERIMA").length },
            { key: "rejected" as const, label: "Ditolak", count: danaList.filter((d) => d.status === "DITOLAK").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-[#84CC16] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Banknote className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Belum ada pengajuan dana</p>
            <p className="text-sm mt-1">Ajukan dana untuk kebutuhan properti Anda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredList.map((d) => {
              const badge = statusBadge[d.status] || { label: d.status, color: "bg-gray-100 text-gray-600" };
              const hasFoto = !!d.foto;

              return (
                <div key={d.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{d.tujuan}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {d.properti?.nama || "-"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(d.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Jumlah</p>
                      <p className="text-base md:text-lg font-bold text-gray-900">
                        Rp {(d.jumlah || 0).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="text-left sm:text-right border-t border-gray-200 pt-2 sm:border-0 sm:pt-0">
                      <p className="text-xs text-gray-500">No. Rekening</p>
                      <div className="flex items-center gap-2 justify-start sm:justify-end mt-1">
                        <p className="text-sm font-medium text-gray-900 break-all sm:break-normal">{d.no_rekening}</p>
                        <button
                          type="button"
                          onClick={() => handleCopy(d.no_rekening)}
                          className="text-[#84CC16] hover:text-[#73b814] p-1 rounded hover:bg-[#84CC16]/10 transition-colors shrink-0"
                          title="Salin No. Rekening"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {hasFoto && (
                    <button
                      onClick={() => setSelectedFoto(d.foto!)}
                      className="flex items-center gap-2 text-sm text-[#84CC16] hover:underline mb-3"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Foto
                    </button>
                  )}

                  {d.bukti_transfer && (
                    <button
                      onClick={() => setSelectedFoto(d.bukti_transfer!)}
                      className="flex items-center gap-2 text-sm text-[#84CC16] hover:underline mb-3"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Bukti Transfer
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="md:hidden fixed bottom-24 right-4 p-4 bg-[#84CC16] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#73b814] transition-colors z-40"
      >
        <Plus className="w-4 h-4" />
        Ajukan Dana
      </button>

      {/* Modal Ajukan Dana */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Ajukan Dana"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Properti</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowPropertiDropdown((prev) => !prev)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                      errors.properti_id ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <span className={selectedProperti ? "text-gray-900" : "text-gray-400"}>
                      {selectedProperti ? selectedProperti.nama : "Pilih properti"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  </button>
                  {showPropertiDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {propertiList.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Belum ada properti</div>
                      ) : (
                        propertiList.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, properti_id: p.id }));
                              setShowPropertiDropdown(false);
                              if (errors.properti_id) {
                                setErrors((prev) => {
                                  const { properti_id, ...rest } = prev;
                                  return rest;
                                });
                              }
                            }}
                            className="w-full px-4 py-2.5 flex items-center gap-3 text-sm hover:bg-gray-50 transition-colors text-left"
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                formData.properti_id === p.id ? "bg-[#84CC16] border-[#84CC16]" : "border-gray-300"
                              }`}
                            >
                              {formData.properti_id === p.id && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-gray-900">{p.nama}</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {errors.properti_id && <p className="text-xs text-red-500 mt-1">{errors.properti_id}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Pengajuan</label>
                <input
                  type="text"
                  value={formData.tujuan}
                  onChange={(e) => setFormData({ ...formData, tujuan: e.target.value })}
                  placeholder="Contoh: Perbaikan AC"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                    errors.tujuan ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.tujuan && <p className="text-xs text-red-500 mt-1">{errors.tujuan}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Dana</label>
                <input
                  type="text"
                  value={formatRupiah(formData.jumlah)}
                  onChange={(e) => setFormData({ ...formData, jumlah: parseRupiah(e.target.value) })}
                  placeholder="Rp 1.000.000"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                    errors.jumlah ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.jumlah && <p className="text-xs text-red-500 mt-1">{errors.jumlah}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Rekening</label>
                {bankAccounts.length === 0 ? (
                  <div className="text-sm text-red-500 py-2 border border-red-200 bg-red-50 rounded-xl px-4">
                    Belum ada rekening bank. Silakan tambahkan rekening di menu <strong>Profil</strong> terlebih dahulu.
                  </div>
                ) : (
                  <select
                    value={formData.no_rekening}
                    onChange={(e) => setFormData({ ...formData, no_rekening: e.target.value })}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent ${
                      errors.no_rekening ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Pilih rekening tujuan</option>
                    {bankAccounts.map((acc) => (
                      <option key={acc.id} value={`${acc.bank} - ${acc.nomor_rekening} (a.n. ${acc.nama_rekening})`}>
                        {acc.bank} - {acc.nomor_rekening} (a.n. {acc.nama_rekening})
                      </option>
                    ))}
                  </select>
                )}
                {errors.no_rekening && <p className="text-xs text-red-500 mt-1">{errors.no_rekening}</p>}
              </div>

              <ImageUploader
                label="Upload Foto/Bukti (Opsional)"
                images={formData.foto}
                onChange={(images) => setFormData({ ...formData, foto: images })}
              />

              <button
                type="submit"
                disabled={submitting || bankAccounts.length === 0}
                className="w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Ajukan Dana
              </button>
        </form>
      </Modal>

      {/* Modal Foto */}
      <Modal
        isOpen={!!selectedFoto}
        onClose={() => setSelectedFoto(null)}
        title="Foto Pengajuan"
        size="lg"
      >
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedFoto || ""}
            alt="Foto Pengajuan"
            className="w-full h-full object-contain"
          />
        </div>
      </Modal>
    </MainLayout>
  );
}
