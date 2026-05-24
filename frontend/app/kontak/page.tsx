import AuthLayout from "@/components/Layout/AuthLayout";

export default function KontakPage() {
  return (
    <AuthLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Kontak Kami</h1>
        <p className="text-gray-600 leading-relaxed">
          Jika Anda memiliki pertanyaan, saran, atau membutuhkan bantuan,
          silakan hubungi tim MyCoLive melalui email di{" "}
          <a href="mailto:support@mycolive.id" className="text-[#84CC16]">
            support@mycolive.id
          </a>
          .
        </p>
      </div>
    </AuthLayout>
  );
}
