"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Lock, LogOut, Eye, EyeOff, User, Mail, Phone, Wallet, Building, CreditCard, QrCode as QrCodeIcon, Wifi, WifiOff, RefreshCw, Unplug, Plus, Trash2 } from "lucide-react";
import MainLayout from "../../../components/Layout/MainLayout";
import Modal from "../../../components/ui/Modal";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { getProfile, updateProfile, changePassword, getPengelolaRekening, updatePengelolaRekening, getWhatsappStatus, connectWhatsapp, disconnectWhatsapp, ProfileData, PengelolaBankAccountData, WhatsAppStatus } from "../../../lib/api";
import { clearAuth } from "../../../lib/auth";

export default function ProfileAdminPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PengelolaBankAccountData[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsAppStatus | null>(null);
  const [whatsappConnecting, setWhatsappConnecting] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(false);
  const [whatsappDisconnecting, setWhatsappDisconnecting] = useState(false);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      const profileData = await getProfile();
      const paymentData = await getPengelolaRekening();
      const waData = await getWhatsappStatus();
      if (mounted) {
        setProfile(profileData);
        setPaymentInfo(paymentData);
        setWhatsappStatus(waData);
        setLoadingProfile(false);
        setLoadingPayment(false);
      }
    }

    loadData();
    const waInterval = setInterval(async () => {
      const waData = await getWhatsappStatus();
      if (mounted) setWhatsappStatus(waData);
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(waInterval);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();
    router.push("/auth/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const refreshProfile = async () => {
    setLoadingProfile(true);
    const data = await getProfile();
    setProfile(data);
    setLoadingProfile(false);
  };

  const refreshPayment = async () => {
    setLoadingPayment(true);
    const data = await getPengelolaRekening();
    setPaymentInfo(data);
    setLoadingPayment(false);
  };

  {/*}
  const handleConnectWhatsapp = async () => {
    setWhatsappConnecting(true);
    try {
      await connectWhatsapp();
      setTimeout(async () => {
        const data = await getWhatsappStatus();
        setWhatsappStatus(data);
      }, 2000);
    } catch {
      console.error("Failed to connect WhatsApp");
    } finally {
      setWhatsappConnecting(false);
    }
  };

  const handleDisconnectWhatsapp = async () => {
    setWhatsappDisconnecting(true);
    try {
      const result = await disconnectWhatsapp();
      if (result) {
        const data = await getWhatsappStatus();
        setWhatsappStatus(data);
      }
    } catch (err) {
      console.error("Failed to disconnect WhatsApp", err);
    } finally {
      setWhatsappDisconnecting(false);
      setShowDisconnectDialog(false);
    }
  };

  const refreshWhatsapp = async () => {
    setWhatsappLoading(true);
    const data = await getWhatsappStatus();
    setWhatsappStatus(data);
    setWhatsappLoading(false);
  };*/}

  const isLoading = loadingProfile || loadingPayment;

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-[#8dc63f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : profile ? (
          <>
            {/* Header Profil */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold shrink-0">
                {getInitials(profile.nama)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-semibold text-black truncate">{profile.nama}</h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#8dc63f]/10 text-[#8dc63f] border border-[#8dc63f]/20">
                    PENGELOLA
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">{profile.email}</p>
                {profile.no_telepon && (
                  <p className="text-sm text-gray-500">{profile.no_telepon}</p>
                )}
              </div>
            </div>

            {/* Aksi Profil */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => setShowEditModal(true)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3">
                  <Pencil size={20} className="text-gray-600" />
                  <span className="text-base font-medium text-black">Edit Profil</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400">
                  <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3">
                  <Lock size={20} className="text-gray-600" />
                  <span className="text-base font-medium text-black">Reset Password</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400">
                  <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Informasi Pembayaran */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wallet size={20} className="text-[#8dc63f]" />
                  <h2 className="text-base font-semibold text-black">Informasi Pembayaran</h2>
                </div>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="text-sm font-medium text-[#8dc63f] hover:text-[#7ab332] transition-colors"
                >
                  Edit
                </button>
              </div>

              {loadingPayment ? (
                <div className="flex items-center justify-center py-4">
                  <svg className="animate-spin h-5 w-5 text-[#8dc63f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : paymentInfo && paymentInfo.length > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">Rekening Bank</p>
                    {paymentInfo.map((account) => (
                      <div key={account.id} className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Building size={16} className="text-[#8dc63f]" />
                          <span className="text-sm font-semibold text-black">{account.bank}</span>
                        </div>
                        <p className="text-sm font-medium text-black">{account.nomor_rekening}</p>
                        <p className="text-xs text-gray-500">a.n. {account.nama_rekening}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Informasi pembayaran belum diatur</p>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="mt-2 text-sm text-[#8dc63f] font-medium hover:underline"
                  >
                    Atur sekarang
                  </button>
                </div>
              )}
            </div>

            {/* WhatsApp Connect
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {whatsappStatus?.connected ? (
                    <Wifi size={20} className="text-green-500" />
                  ) : (
                    <WifiOff size={20} className="text-gray-400" />
                  )}
                  <h2 className="text-base font-semibold text-black">WhatsApp</h2>
                </div>
                <button
                  onClick={refreshWhatsapp}
                  disabled={whatsappLoading}
                  className="text-sm font-medium text-[#8dc63f] hover:text-[#7ab332] transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={16} className={`inline mr-1 ${whatsappLoading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${whatsappStatus?.connected ? "bg-green-500" : "bg-gray-300"}`} />
                <span className="text-sm text-gray-600">
                  {whatsappStatus?.connected ? "Terhubung" : "Tidak terhubung"}
                </span>
              </div>

              {whatsappStatus?.qr && !whatsappStatus?.connected && (
                <div className="flex flex-col items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200 mb-4">
                  <QrCodeIcon size={20} className="text-green-600" />
                  <p className="text-sm text-center text-gray-700">
                    Scan QR code dengan WhatsApp
                  </p>
                  <img
                    src={whatsappStatus.qr}
                    alt="WhatsApp QR Code"
                    className="w-48 h-48 border-2 border-green-300 rounded-lg bg-white p-2"
                  />
                  <p className="text-xs text-gray-500 text-center">
                    Buka WhatsApp → Pengaturan → Perangkat Tertaut → Scan QR
                  </p>
                </div>
              )}

              {!whatsappStatus?.connected && (
                <button
                  onClick={handleConnectWhatsapp}
                  disabled={whatsappConnecting}
                  className="w-full bg-[#8dc63f] text-white py-3 rounded-xl font-medium text-sm shadow-lg shadow-[#8dc63f]/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <RefreshCw size={16} className={`${whatsappConnecting ? "animate-spin" : ""}`} />
                  {whatsappConnecting ? "Menghubungkan..." : "Hubungkan WhatsApp"}
                </button>
              )}

              {whatsappStatus?.connected && (
                <button
                  onClick={() => setShowDisconnectDialog(true)}
                  disabled={whatsappDisconnecting}
                  className="w-full bg-white border border-red-200 text-red-500 py-3 rounded-xl font-medium text-sm hover:bg-red-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Unplug size={16} />
                  Putuskan WhatsApp
                </button>
              )}
            </div>*/}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <LogOut size={20} className="text-red-500" />
                <span className="text-base font-semibold text-red-500">Log Out</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400">
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <p className="text-sm">Gagal memuat data profil</p>
            <button
              onClick={refreshProfile}
              className="mt-4 text-[#8dc63f] font-medium"
            >
              Coba lagi
            </button>
          </div>
        )}
      </div>

      {showEditModal && profile && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSuccess={refreshProfile}
        />
      )}

      {showPasswordModal && (
        <ResetPasswordModal
          onClose={() => setShowPasswordModal(false)}
        />
      )}

      {showPaymentModal && (
        <EditPaymentModal
          paymentInfo={paymentInfo}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={refreshPayment}
        />
      )}

      {/*}
      <ConfirmDialog
        isOpen={showDisconnectDialog}
        title="Putuskan WhatsApp?"
        message="Sesi WhatsApp akan diputuskan dan file sesi lokal akan dihapus. Anda harus scan QR ulang untuk menghubungkan kembali (berguna jika ingin ganti nomor atau HP reset)."
        confirmLabel={whatsappDisconnecting ? "Memutuskan..." : "Ya, Putuskan"}
        cancelLabel="Batal"
        danger
        onConfirm={handleDisconnectWhatsapp}
        onCancel={() => {
          if (!whatsappDisconnecting) setShowDisconnectDialog(false);
        }}
      />*/}
    </MainLayout>
  );
}

function EditProfileModal({
  profile,
  onClose,
  onSuccess,
}: {
  profile: ProfileData;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [nama, setNama] = useState(profile.nama);
  const [email, setEmail] = useState(profile.email);
  const [noTelepon, setNoTelepon] = useState(profile.no_telepon || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");

    if (!nama.trim() || !email.trim()) {
      setError("Nama dan email wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const result = await updateProfile({
        nama: nama.trim(),
        email: email.trim().toLowerCase(),
        no_telepon: noTelepon.trim() || null,
      });

      if (result) {
        onSuccess();
        onClose();
      } else {
        setError("Gagal memperbarui profil");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Profil" position="bottom" size="md">
      <div className="p-4 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="Nama lengkap"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor Telepon
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Phone size={20} />
              </div>
              <input
                type="tel"
                placeholder="Nomor telepon"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSave}
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

function ResetPasswordModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
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
      const result = await changePassword(currentPassword, newPassword);

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
              Password Lama
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Lock size={20} />
              </div>
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Password lama"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1 active:scale-90 transition-transform"
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

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

function EditPaymentModal({
  paymentInfo,
  onClose,
  onSuccess,
}: {
  paymentInfo: PengelolaBankAccountData[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [accounts, setAccounts] = useState(
    paymentInfo?.length
      ? paymentInfo.map((acc) => ({
          id: acc.id,
          nama_rekening: acc.nama_rekening,
          nomor_rekening: acc.nomor_rekening,
          bank: acc.bank,
        }))
      : [{ id: "", nama_rekening: "", nomor_rekening: "", bank: "" }]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateAccount = (index: number, field: string, value: string) => {
    const updated = [...accounts];
    updated[index] = { ...updated[index], [field]: value };
    setAccounts(updated);
  };

  const addAccount = () => {
    setAccounts([...accounts, { id: "", nama_rekening: "", nomor_rekening: "", bank: "" }]);
  };

  const removeAccount = (index: number) => {
    const updated = accounts.filter((_, i) => i !== index);
    setAccounts(updated.length ? updated : [{ id: "", nama_rekening: "", nomor_rekening: "", bank: "" }]);
  };

  const handleSave = async () => {
    setError("");

    const validAccounts = accounts.filter(
      (acc) => acc.bank.trim() && acc.nomor_rekening.trim() && acc.nama_rekening.trim()
    );

    if (validAccounts.length === 0) {
      setError("Isi minimal satu rekening");
      return;
    }

    setLoading(true);

    try {
      const result = await updatePengelolaRekening({
        bank_accounts: validAccounts.map((acc) => ({
          nama_rekening: acc.nama_rekening.trim(),
          nomor_rekening: acc.nomor_rekening.trim(),
          bank: acc.bank.trim(),
        })),
      });

      if (result) {
        onSuccess();
        onClose();
      } else {
        setError("Gagal memperbarui informasi pembayaran");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal memperbarui informasi pembayaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Informasi Pembayaran" position="bottom" size="md">
      <div className="p-4 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Daftar Rekening Bank</label>
            <button
              type="button"
              onClick={addAccount}
              className="flex items-center gap-1 text-sm font-medium text-[#8dc63f] hover:text-[#7ab332] transition-colors"
            >
              <Plus size={16} />
              Tambah
            </button>
          </div>

          {accounts.map((account, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Rekening {index + 1}</span>
                {accounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAccount(index)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Bank</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Building size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Contoh: BCA, Mandiri, BNI"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                    value={account.bank}
                    onChange={(e) => updateAccount(index, "bank", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Nomor Rekening</label>
                  <input
                    type="text"
                    placeholder="Nomor rekening"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                    value={account.nomor_rekening}
                    onChange={(e) => updateAccount(index, "nomor_rekening", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Atas Nama</label>
                  <input
                    type="text"
                    placeholder="Nama pemilik"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all"
                    value={account.nama_rekening}
                    onChange={(e) => updateAccount(index, "nama_rekening", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 p-4">
        <button
          onClick={handleSave}
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
