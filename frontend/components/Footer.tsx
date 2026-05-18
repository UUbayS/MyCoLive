import Link from "next/link";
import Image from "next/image";
import logoMyCoLive from "../assets/myCoLive.svg";

export default function Footer() {
  const footerLinks = [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Kontak", href: "/kontak" },
    { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
  ];

  return (
    <footer className="bg-white border-t border-slate-100 pb-safe-bottom">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Link href="/" className="flex items-center mb-2">
              <Image src={logoMyCoLive} alt="MyCoLive" width={130} height={40} />
            </Link>
            <p className="text-sm text-slate-500">
              Solusi manajemen kos-kosan modern
            </p>
          </div>

          <nav className="flex flex-wrap gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-[#84CC16] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center md:text-left">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} MyCoLive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
