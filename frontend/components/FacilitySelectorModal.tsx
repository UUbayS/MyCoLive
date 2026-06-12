"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Trash2, Loader2, Check } from "lucide-react";
import Modal from "./ui/Modal";
import ConfirmDialog from "./ConfirmDialog";
import { getFasilitasList, createFasilitas, deleteFasilitas, FasilitasData } from "../lib/api";
import { getUser } from "../lib/auth";

interface FacilitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  jenis: "RUANGAN" | "UMUM";
  onSave: (ids: string[]) => void;
  showManagement?: boolean;
}

export default function FacilitySelectorModal({
  isOpen,
  onClose,
  selectedIds,
  jenis,
  onSave,
  showManagement = false,
}: FacilitySelectorModalProps) {
  const [facilities, setFacilities] = useState<FasilitasData[]>([]);
  const [localSelectedIds, setLocalSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    const user = getUser();
    setIsAdmin(user?.role === "PEMILIK");
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLocalSelectedIds([...selectedIds]);
      loadFacilities();
    }
  }, [isOpen, selectedIds]);

  const loadFacilities = async () => {
    setLoading(true);
    const data = await getFasilitasList(jenis);
    setFacilities(data);
    setLoading(false);
  };

  const filteredFacilities = facilities.filter((f) =>
    f.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFacility = (id: string) => {
    setLocalSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (localSelectedIds.length === facilities.length) {
      setLocalSelectedIds([]);
    } else {
      setLocalSelectedIds(facilities.map((f) => f.id));
    }
  };

  const handleAddFacility = async () => {
    if (!newFacility.trim()) return;
    const result = await createFasilitas(newFacility.trim(), jenis);
    if (result) {
      setFacilities((prev) =>
        [...prev, result].sort((a, b) => a.nama.localeCompare(b.nama))
      );
      setNewFacility("");
    }
  };

  const handleDeleteFacility = async (id: string) => {
    setItemToDelete(id);
    setShowConfirmDialog(true);
  };

  const actualDelete = async (id: string | null) => {
    if (!id) return;
    const success = await deleteFasilitas(id);
    if (success) {
      setFacilities((prev) => prev.filter((f) => f.id !== id));
      setLocalSelectedIds((prev) => prev.filter((fid) => fid !== id));
    }
  };

  const handleSave = () => {
    onSave(localSelectedIds);
    onClose();
  };

  const allSelected =
    facilities.length > 0 && localSelectedIds.length === facilities.length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Pilih Fasilitas ${jenis === "RUANGAN" ? "Ruangan" : "Umum"}`}
      size="md"
    >
      {showManagement && isAdmin && (
        <div className="mb-4">
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari Fasilitas"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Tambah fasilitas baru..."
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddFacility()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              disabled={!newFacility.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-[#84CC16] text-white rounded-xl text-sm font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
              className="w-4 h-4 shrink-0 rounded border-2 border-gray-300 accent-[#84CC16]  cursor-pointer"
            />
            <label className="text-sm text-gray-700 cursor-pointer select-none">Pilih Semua</label>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
          {filteredFacilities.map((facility) => {
            const isSelected = localSelectedIds.includes(facility.id);
            return (
              <div
                key={facility.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                  isSelected
                    ? "border-[#84CC16] bg-[#84CC16]/5 "
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleFacility(facility.id)}
                    className="w-4 h-4 shrink-0 rounded border-2 border-gray-300 accent-[#84CC16] checked:border-[#84CC16] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 cursor-pointer select-none">{facility.nama}</span>
                </div>
                {showManagement && isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDeleteFacility(facility.id)}
                    className="text-red-500 hover:text-red-600 p-1"
                    aria-label={`Hapus ${facility.nama}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}

          {filteredFacilities.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-4">
              Tidak ada fasilitas ditemukan
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          {localSelectedIds.length} fasilitas dipilih
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#84CC16] text-white rounded-xl text-sm font-medium hover:bg-[#73b814] transition-colors"
          >
            Simpan
          </button>
        </div>
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
    </Modal>
  );
}
