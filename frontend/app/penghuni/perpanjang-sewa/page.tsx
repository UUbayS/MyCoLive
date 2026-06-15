"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function PerpanjangSewaPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/penghuni/kamar-saya");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
    </div>
  );
}
