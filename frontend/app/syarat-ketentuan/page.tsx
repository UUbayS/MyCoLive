import AuthLayout from "@/components/Layout/AuthLayout";

export default function SyaratKetentuanPage() {
  return (
    <AuthLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Syarat & Ketentuan</h1>
        <p className="text-gray-600 leading-relaxed">
          Dengan menggunakan MyCoLive, Anda setuju untuk mematuhi syarat dan
          ketentuan yang berlaku. Pengguna wajib memberikan informasi yang akurat
          dan tidak menyalahgunakan fitur-fitur yang tersedia dalam platform ini.
        </p>
      </div>
    </AuthLayout>
  );
}
