"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Check, AlertCircle, Eye, Sparkles, Lightbulb, X } from "lucide-react";
import {
  PropertiData,
  kirimPengumuman,
  PengumumanResult,
  PengumumanTarget,
} from "../lib/api";
import {
  PENGUMUMAN_TEMPLATES,
  PENGUMUMAN_VARIABLES,
  PENGUMUMAN_KATEGORI,
  WA_CHAR_LIMIT,
  renderPreview,
  insertAtCursor,
  PengumumanKategori,
  PengumumanTemplate,
} from "../lib/pengumuman-helpers";

type Props = {
  propertiList: PropertiData[];
  availableTargets?: { value: string; label: string }[];
  defaultTarget?: string;
  showTargetSelector?: boolean;
  defaultPropertiId?: string;
  title?: string;
  subtitle?: string;
  onSuccess?: (result: PengumumanResult) => void;
};

const defaultTargets = [
  { value: "ALL", label: "Semua User" },
  { value: "PENGHUNI", label: "Semua Penghuni" },
  { value: "PENGELOLA", label: "Semua Pengelola" },
  { value: "PENGHUNI_PROPERTI", label: "Penghuni di Properti Tertentu" },
  { value: "CUSTOM", label: "User Tertentu (Manual)" },
];

function formatWAInline(text: string, keyPrefix = "k"): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let i = 0;
  while (remaining.length > 0) {
    const boldMatch = /\*([^*\n]+)\*/.exec(remaining);
    const italicMatch = /_([^_\n]+)_/.exec(remaining);
    let earliest: { start: number; end: number; node: React.ReactNode } | null = null;
    if (boldMatch && (!earliest || boldMatch.index < earliest.start)) {
      earliest = {
        start: boldMatch.index,
        end: boldMatch.index + boldMatch[0].length,
        node: <strong key={`${keyPrefix}-b-${i}`}>{boldMatch[1]}</strong>,
      };
    }
    if (italicMatch && (!earliest || italicMatch.index < earliest.start)) {
      earliest = {
        start: italicMatch.index,
        end: italicMatch.index + italicMatch[0].length,
        node: <em key={`${keyPrefix}-i-${i}`}>{italicMatch[1]}</em>,
      };
    }
    if (!earliest) {
      nodes.push(<span key={`${keyPrefix}-t-${i}`}>{remaining}</span>);
      break;
    }
    if (earliest.start > 0) {
      nodes.push(
        <span key={`${keyPrefix}-t-${i++}`}>{remaining.slice(0, earliest.start)}</span>
      );
    }
    nodes.push(earliest.node);
    i++;
    remaining = remaining.slice(earliest.end);
  }
  return nodes;
}

function PreviewBubble({ text, isEmpty }: { text: string; isEmpty: boolean }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, idx) => (
        <div key={idx}>
          {isEmpty && idx === 0 ? (
            <span className="text-gray-400 italic">{line}</span>
          ) : (
            formatWAInline(line, `l${idx}`)
          )}
        </div>
      ))}
    </>
  );
}

export default function PengumumanForm({
  propertiList,
  availableTargets,
  defaultTarget = "PENGHUNI_PROPERTI",
  showTargetSelector = false,
  defaultPropertiId,
  title,
  subtitle,
  onSuccess,
}: Props) {
  const targets = availableTargets ?? defaultTargets;

  const [kategori, setKategori] = useState<PengumumanKategori | "">("");
  const [target, setTarget] = useState(defaultTarget);
  const [propertiId, setPropertiId] = useState(defaultPropertiId || "");
  const [judul, setJudul] = useState("");
  const [pesan, setPesan] = useState("");
  const [kirimWhatsapp, setKirimWhatsapp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<PengumumanResult | null>(null);
  const [showVarMenu, setShowVarMenu] = useState(false);

  const pesanRef = useRef<HTMLTextAreaElement>(null);
  const varMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propertiList.length > 0 && !propertiId) {
      setPropertiId(propertiList[0].id);
    }
  }, [propertiList, propertiId]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (varMenuRef.current && !varMenuRef.current.contains(e.target as Node)) {
        setShowVarMenu(false);
      }
    }
    if (showVarMenu) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [showVarMenu]);

  const applyTemplate = (template: PengumumanTemplate) => {
    setKategori(template.kategori);
    setJudul(template.judul);
    setPesan(template.pesan);
    setError("");
    setSuccess(null);
  };

  const clearAll = () => {
    setKategori("");
    setJudul("");
    setPesan("");
    setError("");
    setSuccess(null);
  };

  const insertVariable = (key: string) => {
    if (!pesanRef.current) return;
    const pos = pesanRef.current.selectionStart ?? pesan.length;
    const { newText, newCursorPos } = insertAtCursor(pesan, pos, key);
    setPesan(newText);
    setShowVarMenu(false);
    setTimeout(() => {
      if (pesanRef.current) {
        pesanRef.current.focus();
        pesanRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(null);

    if (!judul.trim() || !pesan.trim()) {
      setError("Judul dan pesan wajib diisi");
      return;
    }

    const needProperti =
      (showTargetSelector && target === "PENGHUNI_PROPERTI") ||
      (!showTargetSelector && propertiList.length > 0);

    if (needProperti && !propertiId) {
      setError("Pilih properti terlebih dahulu");
      return;
    }

    setLoading(true);
    try {
      const result = await kirimPengumuman({
        target: target as PengumumanTarget,
        properti_id: target === "PENGHUNI_PROPERTI" ? propertiId : undefined,
        judul: judul.trim(),
        pesan: pesan.trim(),
        kirim_whatsapp: kirimWhatsapp,
      });

      if (result) {
        setSuccess(result);
        setJudul("");
        setPesan("");
        setKategori("");
        onSuccess?.(result);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError("Gagal mengirim pengumuman. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim pengumuman.");
    } finally {
      setLoading(false);
    }
  };

  const pesanChars = pesan.length;
  const judulChars = judul.length;
  const overLimit = pesanChars > WA_CHAR_LIMIT;
  const previewText = renderPreview(judul, pesan);
  const isEmpty = !judul.trim() && !pesan.trim();

  return (
    <div className="space-y-4">
      {title && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-5 h-5" />
            <span className="font-medium">Pengumuman berhasil dikirim!</span>
          </div>
          <p>Total penerima: {success.total_penerima}</p>
          <p>WA terkirim: {success.wa_berhasil}</p>
          <p>WA gagal: {success.wa_gagal}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#84CC16]" />
                Kategori Pengumuman
              </span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PENGUMUMAN_KATEGORI.map((k) => (
                <button
                  key={k.value}
                  type="button"
                  onClick={() => setKategori(k.value)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    kategori === k.value
                      ? "border-[#84CC16] bg-lime-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-xl mb-1">{k.icon}</div>
                  <div className="text-xs font-medium text-gray-800">{k.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <span className="flex items-center gap-2">
                ✨ Template Cepat
                <span className="text-xs font-normal text-gray-500">
                  (klik untuk pakai, lalu edit bebas)
                </span>
              </span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PENGUMUMAN_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => applyTemplate(t)}
                  className="p-3 rounded-xl border border-gray-200 hover:border-[#84CC16] hover:bg-lime-50 transition-all text-left"
                >
                  <div className="text-xl mb-1">{t.icon}</div>
                  <div className="text-xs font-medium text-gray-800">{t.label}</div>
                </button>
              ))}
            </div>
          </div>

          {showTargetSelector && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Penerima
              </label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
              >
                {targets.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {((showTargetSelector && target === "PENGHUNI_PROPERTI") ||
            (!showTargetSelector && propertiList.length > 0)) && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Properti
              </label>
              <select
                value={propertiId}
                onChange={(e) => setPropertiId(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
              >
                {propertiList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Judul</label>
              <span className="text-xs text-gray-400">{judulChars} / 100</span>
            </div>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="cth: Info Pembayaran Kos Bulan Juni"
              maxLength={100}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
            <div className="mb-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex gap-2">
              <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Tips:</strong> Gunakan bahasa sopan, sebutkan deadline jelas, dan
                panggil nama penerima agar lebih personal.
              </span>
            </div>
            <textarea
              ref={pesanRef}
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Tulis pesan di sini, atau klik template di atas untuk mulai..."
              rows={6}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84CC16] resize-none"
            />
            <div className="flex items-center justify-between mt-2 gap-2">
              <div className="relative" ref={varMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowVarMenu(!showVarMenu)}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-1.5 font-medium"
                >
                  📋 Sisipkan Variabel
                </button>
                {showVarMenu && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-20 min-w-[240px]">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b">
                      Klik untuk sisipkan di kursor
                    </div>
                    {PENGUMUMAN_VARIABLES.map((v) => (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => insertVariable(v.key)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-xs"
                      >
                        <div className="font-mono font-semibold text-[#84CC16]">
                          {v.key}
                        </div>
                        <div className="text-gray-500 text-[11px]">{v.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                {(judul || pesan) && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Reset
                  </button>
                )}
                <span
                  className={`text-xs ${
                    overLimit ? "text-red-600 font-semibold" : "text-gray-400"
                  }`}
                >
                  {pesanChars} / {WA_CHAR_LIMIT}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={kirimWhatsapp}
                onChange={(e) => setKirimWhatsapp(e.target.checked)}
                className="w-5 h-5 accent-[#84CC16]"
              />
              <span className="text-sm text-gray-700">Juga kirim melalui WhatsApp</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || overLimit}
            className="w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              "Mengirim..."
            ) : (
              <>
                <Send className="w-5 h-5" />
                Kirim Pengumuman
              </>
            )}
          </button>
        </form>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-[#84CC16]" />
              <h3 className="text-sm font-semibold text-gray-800">Preview WhatsApp</h3>
            </div>
            <div className="text-xs text-gray-500 mb-3 px-1">
              Tampilan di HP penerima contoh
            </div>

            <div className="bg-[#ECE5DD] rounded-2xl p-3">
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-full">
                <div className="text-[11px] text-gray-500 mb-1 flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-[#84CC16] text-white text-[10px] flex items-center justify-center font-bold">
                    B
                  </span>
                  <span className="font-medium text-gray-700">Budi Santoso</span>
                  <span className="text-gray-400">·</span>
                  <span>Kamar A-12</span>
                </div>
                <div className="bg-[#DCF8C6] rounded-lg p-2.5 text-[13px] leading-relaxed text-gray-900 whitespace-pre-wrap break-words">
                  <PreviewBubble text={previewText} isEmpty={isEmpty} />
                </div>
                <div className="text-[10px] text-gray-400 text-right mt-1">
                  {new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-gray-500 px-1 space-y-0.5">
              <div>
                📌 *teks* = <strong>tebal</strong>, _teks_ = <em>miring</em>
              </div>
              <div>📌 Variabel auto-isi sesuai data penerima</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
