"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Building2, MapPin, AlertTriangle } from "lucide-react";
import { getPropertiList, deleteProperti, PropertiData } from "../../../lib/api";
import { getUser } from "../../../lib/auth";
import MainLayout from "../../../components/Layout/MainLayout";
import StatsWidget from "../../../components/StatsWidget";

export default function AdministratorPropertiPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalProperti: 0, totalKamar: 0, totalTerisi: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<PropertiData | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const user = getUser();
    if (!user || user.role !== "PEMILIK") {
      router.push("/auth/login");
      return;
    }

    const fetchProperties = async () => {
      try {
        const result = await getPropertiList();
        setProperties(result);

        const totalKamar = result.reduce((sum, p) => sum + (p.total_kamar || 0), 0);
        const totalTerisi = result.reduce((sum, p) => {
          const kosong = p.kamar_kosong || 0;
          const total = p.total_kamar || 0;
          return sum + (total - kosong);
        }, 0);

        setStats({
          totalProperti: result.length,
          totalKamar,
          totalTerisi,
        });
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [router]);

  const handleDeleteClick = (property: PropertiData) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;
    
    try {
      await deleteProperti(propertyToDelete.id);
      setProperties((prev) => prev.filter((p) => p.id !== propertyToDelete.id));
      setStats((prev) => ({
        ...prev,
        totalProperti: prev.totalProperti - 1,
      }));
    } catch {
      alert("Gagal menghapus properti");
    } finally {
      setShowDeleteModal(false);
      setPropertyToDelete(null);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Properti Saya</h1>
        <Link
          href="/administrator/properti/tambah"
          className="hidden md:flex bg-[#84CC16] text-white px-5 py-2 rounded-full shadow-sm hover:bg-[#73b814] transition-colors items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Properti
        </Link>
      </div>

      <StatsWidget
        totalProperti={stats.totalProperti}
        totalKamar={stats.totalKamar}
        totalTerisi={stats.totalTerisi}
      />

      <div className="mb-4 text-sm text-gray-600">Daftar Properti</div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/public/katalog-properti/${property.id}`}>
                <div className="h-40 w-full bg-gray-200 flex items-center justify-center relative group">
                  {property.gambar && property.gambar.length > 0 ? (
                    <img
                      src={property.gambar[0]}
                      alt={property.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No Image</span>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold">{property.nama}</h3>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/administrator/properti/${property.id}/edit`}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(property)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                  <MapPin className="w-3 h-3" />
                  <p className="truncate">{property.alamat}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {property.total_kamar ?? 0} Kamar | {property.kamar_kosong ?? 0} Kosong
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <Building2 className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-1">Belum ada properti</p>
          <p className="text-center text-sm">
            Klik tombol <strong>Tambah Properti</strong> untuk menambahkan properti baru.
          </p>
        </div>
      )}

      <Link
        href="/administrator/properti/tambah"
        className="md:hidden fixed bottom-24 right-4 w-14 h-14 bg-[#84CC16] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#73b814] transition-colors z-40"
        aria-label="Tambah Properti"
      >
        <Plus className="w-6 h-6" />
      </Link>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold">Hapus Properti?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Properti <strong>&ldquo;{propertyToDelete?.nama}&rdquo;</strong> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPropertyToDelete(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
