"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../lib/ToastContext";
import Link from "next/link";
import { Plus, Building2 } from "lucide-react";
import { getPropertiList, deleteProperti, PropertiData } from "../../../lib/api";
import { getUser } from "../../../lib/auth";
import MainLayout from "../../../components/Layout/MainLayout";
import StatsWidget from "../../../components/StatsWidget";
import PropertyCard from "../../../components/PropertyCard";
import PropertiTabs from "@/components/PropertiTabs";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function AdministratorPropertiPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalProperti: 0, totalKamar: 0, totalTerisi: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<PropertiData | null>(null);
  const fetchedRef = useRef(false);
  const { success, error } = useToast();

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

  const handleDelete = (id: string) => {
    const property = properties.find((p) => p.id === id);
    if (property) {
      setPropertyToDelete(property);
      setShowDeleteModal(true);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/administrator/properti/${id}/edit`);
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
      success("Properti berhasil dihapus");
    } catch {
      error("Gagal menghapus properti");
    } finally {
      setShowDeleteModal(false);
      setPropertyToDelete(null);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Properti Saya</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola semua properti dan kamar Anda</p>
          </div>
          <Link
            href="/administrator/properti/tambah"
            className="hidden md:flex bg-[#84CC16] text-white px-5 py-2.5 rounded-full shadow-sm hover:bg-[#73b814] transition-colors items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Tambah Properti
          </Link>
        </div>
        <div className="md:hidden">
          <PropertiTabs />
        </div>

        <StatsWidget
          totalProperti={stats.totalProperti}
          totalKamar={stats.totalKamar}
          totalTerisi={stats.totalTerisi}
        />

        <div className="mt-6 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Daftar Properti</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={{
                  id: property.id,
                  nama: property.nama,
                  alamat: property.alamat,
                  provinsi: property.provinsi,
                  kota: property.kota,
                  kecamatan: property.kecamatan,
                  kode_pos: property.kode_pos,
                  detail_alamat: property.detail_alamat,
                  total_kamar: property.total_kamar,
                  kamar_kosong: property.kamar_kosong,
                  gambar: property.gambar?.[0],
                }}
                actions={{
                  onEdit: handleEdit,
                  onDelete: handleDelete,
                }}
                detailLink={`/administrator/properti/${property.id}`}
                manageLink={`/administrator/properti/${property.id}/kamar`}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Building2 className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-1">Belum ada properti</p>
            <p className="text-center text-sm max-w-md">
              Klik tombol <strong>Tambah Properti</strong> untuk menambahkan properti baru.
            </p>
          </div>
        )}

        <Link
          href="/administrator/properti/tambah"
          className="md:hidden fixed bottom-24 right-4 p-4 bg-[#84CC16] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#73b814] transition-colors z-40"
          aria-label="Tambah Properti"
        >
          <Plus className="w-6 h-6" />
          <span>Tambah Properti</span>
        </Link>

        <ConfirmDialog
          isOpen={showDeleteModal}
          title="Hapus Properti?"
          message={`Properti "${propertyToDelete?.nama}" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
          confirmLabel="Hapus"
          cancelLabel="Batal"
          danger
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setPropertyToDelete(null);
          }}
        />
      </div>

      
    </MainLayout>
  );
}
