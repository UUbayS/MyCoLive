"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KatalogPropertiRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin h-8 w-8 border-4 border-[#84CC16] border-t-transparent rounded-full"></div>
    </div>
  );
}
