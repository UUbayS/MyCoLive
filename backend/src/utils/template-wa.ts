function rupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export const templateWa = {
  pemesananBaru(namaPenghuni: string, namaKamar: string, namaProperti: string) {
    return `*Pemesanan Baru*\n\nPenghuni: ${namaPenghuni}\nKamar: ${namaKamar}\nProperti: ${namaProperti}\n\nSilakan cek aplikasi untuk memverifikasi.`;
  },

  perpanjangSewa(
    namaPenghuni: string,
    namaKamar: string,
    namaProperti: string,
  ) {
    return `*Perpanjang Sewa*\n\nPenghuni: ${namaPenghuni}\nKamar: ${namaKamar}\nProperti: ${namaProperti}\n\nSilakan cek aplikasi untuk memverifikasi.`;
  },

  buktiBayarDikirim(
    namaPenghuni: string,
    namaKamar: string,
    namaProperti: string,
  ) {
    return `*Bukti Pembayaran Dikirim*\n\nPenghuni: ${namaPenghuni}\nKamar: ${namaKamar}\nProperti: ${namaProperti}\n\nSilakan verifikasi pembayaran di aplikasi.`;
  },

  pemesananDiterima(
    namaPenghuni: string,
    namaKamar: string,
    namaProperti: string,
    nomorKuitansi: string,
    jumlah: number,
    link?: string,
  ) {
    return `*Pemesanan Diterima*\n\nHalo ${namaPenghuni}, pemesanan Anda telah diterima!\n\nKamar: ${namaKamar}\nProperti: ${namaProperti}\nJumlah: ${rupiah(jumlah)}\nNo. Kuitansi: *${nomorKuitansi}*\n\n${link ? `Lihat detail: ${link}\n\n` : ""}Selamat datang!`;
  },

  pemesananDitolak(
    namaPenghuni: string,
    namaKamar: string,
    namaProperti: string,
  ) {
    return `*Pemesanan Ditolak*\n\nHalo ${namaPenghuni}, maaf pemesanan Anda untuk:\n\nKamar: ${namaKamar}\nProperti: ${namaProperti}\n\ntelah ditolak. Silakan hubungi pengelola untuk informasi lebih lanjut.`;
  },

  pemesananDibatalkan(
    namaPenghuni: string,
    namaKamar: string,
    namaProperti: string,
  ) {
    return `*Pemesanan Dibatalkan*\n\nPemesanan oleh:\nPenghuni: ${namaPenghuni}\nKamar: ${namaKamar}\nProperti: ${namaProperti}\n\ntelah dibatalkan oleh penghuni.`;
  },

  komplainBaru(
    namaPenghuni: string,
    jenis: string,
    masalah: string,
    namaProperti: string,
  ) {
    return `*Komplain Baru*\n\nDari: ${namaPenghuni}\nJenis: ${jenis}\nMasalah: ${masalah}\nProperti: ${namaProperti}\n\nSegera tindak lanjuti di aplikasi.`;
  },

  komplainDiproses(masalah: string) {
    return `*Komplain Sedang Diproses*\n\nKomplain Anda: "${masalah}"\n\nsedang dalam proses penanganan. Kami akan segera menyelesaikannya.`;
  },

  komplainSelesai(masalah: string) {
    return `*Komplain Selesai*\n\nKomplain Anda: "${masalah}"\n\ntelah selesai ditangani. Terima kasih atas laporan Anda.`;
  },

  danaBaru(
    namaOperator: string,
    tujuan: string,
    jumlah: number,
    namaProperti: string,
  ) {
    return `*Pengajuan Dana Baru*\n\nDari: ${namaOperator}\nTujuan: ${tujuan}\nJumlah: ${rupiah(jumlah)}\nProperti: ${namaProperti}\n\nSilakan cek aplikasi untuk menyetujui/menolak.`;
  },

  danaDiterima(tujuan: string, jumlah: number) {
    return `*Pengajuan Dana Diterima*\n\nPengajuan Anda untuk *${tujuan}* sebesar ${rupiah(jumlah)} telah disetujui.`;
  },

  danaDitolak(tujuan: string, jumlah: number) {
    return `*Pengajuan Dana Ditolak*\n\nPengajuan Anda untuk *${tujuan}* sebesar ${rupiah(jumlah)} telah ditolak.\n\nSilakan hubungi pemilik untuk informasi lebih lanjut.`;
  },

  checkoutBaru(namaPenghuni: string, namaKamar: string, namaProperti: string) {
    return `*Pengajuan Checkout Baru*\n\nPenghuni: ${namaPenghuni}\nKamar: ${namaKamar}\nProperti: ${namaProperti}\n\nSilakan cek aplikasi untuk memproses.`;
  },

  checkoutDiterima(namaKamar: string, namaProperti: string) {
    return `*Checkout Diterima*\n\nPengajuan checkout Anda dari Kamar ${namaKamar} di ${namaProperti} telah diterima.\n\nTerima kasih telah menggunakan layanan kami.`;
  },

  checkoutDitolak(namaKamar: string, namaProperti: string, keterangan?: string) {
    return `*Checkout Ditolak*\n\nPengajuan checkout Anda dari Kamar ${namaKamar} di ${namaProperti} telah ditolak.${keterangan ? `\n\nAlasan: ${keterangan}` : ""}\n\nSilakan hubungi pengelola untuk informasi lebih lanjut.`;
  },

  operatorBaru(nama: string, properti: string) {
    return `*Selamat Datang!*\n\nHalo ${nama}, Anda telah ditambahkan sebagai Operator/Pengelola di ${properti}.\n\nSilakan login ke aplikasi dengan akun yang telah diberikan.`;
  },

  forgotPasswordOtp(nama: string, otp: string, ttlMinutes: number) {
    return `*Reset Password MyCoLive*\n\nHalo ${nama},\n\nKode OTP Anda: *${otp}*\n\nKode berlaku selama ${ttlMinutes} menit. Jangan berikan kode ini kepada siapa pun.\n\nJika Anda tidak meminta reset password, abaikan pesan ini.`;
  },
};
