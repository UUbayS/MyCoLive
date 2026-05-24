import AuthLayout from "@/components/Layout/AuthLayout";

export default function TentangPage() {
  return (
    <AuthLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Tentang Kami</h1>
        <p className="text-gray-600 leading-relaxed">
          MyCoLive adalah solusi manajemen kos-kosan modern yang dirancang untuk
          membantu pemilik, pengelola, dan penghuni mengelola properti kos dengan
          lebih efisien. Platform ini menyediakan fitur katalog properti,
          manajemen kamar, transaksi, komplain, dan keuangan dalam satu aplikasi
          terpadu.
        </p>
      </div>
    </AuthLayout>
  );
}
