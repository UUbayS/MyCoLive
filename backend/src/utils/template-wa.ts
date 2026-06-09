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
  ) {
    return `*Pemesanan Diterima*\n\nHalo ${namaPenghuni}, pemesanan Anda telah diterima!\n\nKamar: ${namaKamar}\nProperti: ${namaProperti}\nJumlah: ${rupiah(jumlah)}\nNo. Kuitansi: *${nomorKuitansi}*\n\nSelamat datang!`;
  },

  pemesananDitolak(
    namaPenghuni: string,
    namaKamar: string,
    namaProperti: string,
  ) {
    return `*Pemesanan Ditolak*\n\nHalo ${namaPenghuni}, maaf pemesanan Anda untuk:\n\nKamar: ${namaKamar}\nProperti: ${namaProperti}\n\ntelah ditolak. Silakan hubungi pengelola untuk informasi lebih lanjut.`;
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
};
