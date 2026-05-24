import AuthLayout from "@/components/Layout/AuthLayout";

export default function KebijakanPrivasiPage() {
  return (
    <AuthLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Kebijakan Privasi</h1>
        <p className="text-gray-600 leading-relaxed">
          MyCoLive menghargai privasi pengguna. Kami berkomitmen untuk
          melindungi data pribadi yang Anda berikan saat menggunakan aplikasi
          ini. Data Anda hanya digunakan untuk keperluan operasional platform dan
          tidak akan dibagikan kepada pihak ketiga tanpa persetujuan Anda.
        </p>
      </div>
    </AuthLayout>
  );
}
