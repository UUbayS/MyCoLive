"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ChevronRight, Download, ChevronDown, Wallet, TrendingUp, Calendar, ChevronLeft } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MainLayout from "@/components/Layout/MainLayout";
import Modal from "@/components/ui/Modal";
import { getUser, isAuthenticated } from "@/lib/auth";
import {
  getPropertiList,
  PropertiData,
  getKeuanganTransaksi,
  KeuanganData,
  TransaksiItem,
} from "@/lib/api";
import {
  generateSeluruhTransaksiPDF,
  generateIncomeLossPDF,
} from "@/lib/pdf-export";

const statusBadgeStyle: Record<string, string> = {
  Lunas: "bg-green-100 text-green-700",
  "Belum Bayar": "bg-yellow-100 text-yellow-700",
  Operasional: "bg-red-100 text-red-700",
};

const tipeLabels: Record<string, string> = {
  SEMUA: "Semua",
  PEMASUKAN: "Pemasukan",
  PENGELUARAN: "Pengeluaran",
};

const periodeLabels: Record<string, string> = {
  SEBULAN: "Sebulan Terakhir",
  SETAHUN: "Setahun Terakhir",
  KUSTOM: "Pilih Rentang Tanggal",
};

const aggLabels: Record<string, string> = {
  HARIAN: "Harian",
  BULANAN: "Bulanan",
  KUARTIL: "Kuartil",
};

// ─── DATE UTILITIES ───

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function startOfMonth(date: Date) {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfMonth(date: Date) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
}

function formatDateID(date: Date) {
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function formatInputDate(date: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function parseInputDate(str: string): Date | null {
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  const d = new Date(year, month - 1, day);
  if (d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  return d;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function isDateInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const d = startOfDay(date);
  const s = startOfDay(start);
  const e = endOfDay(end);
  return d >= s && d <= e;
}

function isDateBefore(a: Date, b: Date) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

function isDateAfter(a: Date, b: Date) {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

function clampDate(date: Date, min: Date, max: Date) {
  if (isDateBefore(date, min)) return new Date(min);
  if (isDateAfter(date, max)) return new Date(max);
  return new Date(date);
}

// ─── FILTER & AGGREGATION ───

function getPeriodBounds(periode: string, customRange: { start: Date | null; end: Date | null }) {
  const now = new Date();
  if (periode === "SEBULAN") {
    const start = addDays(now, -29);
    return { start: startOfDay(start), end: endOfDay(now) };
  }
  if (periode === "SETAHUN") {
    const start = addMonths(now, -11);
    return { start: startOfDay(start), end: endOfDay(now) };
  }
  if (periode === "KUSTOM" && customRange.start && customRange.end) {
    return { start: startOfDay(customRange.start), end: endOfDay(customRange.end) };
  }
  return { start: null, end: null };
}

function filterTransaksiByPeriod(
  transaksi: TransaksiItem[],
  periode: string,
  customRange: { start: Date | null; end: Date | null }
) {
  const bounds = getPeriodBounds(periode, customRange);
  if (!bounds.start || !bounds.end) return transaksi;
  return transaksi.filter((t) => {
    const d = new Date(t.tanggal);
    return d >= bounds.start! && d <= bounds.end!;
  });
}

function getDaysDiff(start: Date, end: Date) {
  const s = startOfDay(start);
  const e = startOfDay(end);
  return Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

function getMonthsDiff(start: Date, end: Date) {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

function getQuarterLabel(year: number, quarter: number) {
  return `Q${quarter} ${year}`;
}

function getDefaultAggMode(start: Date, end: Date): "daily" | "monthly" | "quarterly" {
  const monthsDiff = getMonthsDiff(start, end);
  if (monthsDiff > 12) return "quarterly";
  if (monthsDiff > 0) return "monthly";
  return "daily";
}

function aggregateChartData(
  transaksi: TransaksiItem[],
  mode: "daily" | "monthly" | "quarterly",
  start: Date,
  end: Date,
  tipeFilter: string
) {
  const map = new Map<string, { label: string; pemasukan: number; pengeluaran: number; bersih: number }>();
  const daysDiff = getDaysDiff(start, end);

  if (mode === "daily") {
    for (let i = 0; i <= daysDiff; i++) {
      const d = addDays(start, i);
      const key = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      map.set(key, { label, pemasukan: 0, pengeluaran: 0, bersih: 0 });
    }
    transaksi.forEach((t) => {
      const d = new Date(t.tanggal);
      const key = d.toISOString().split("T")[0];
      if (map.has(key)) {
        const entry = map.get(key)!;
        if (t.tipe === "PEMASUKAN") entry.pemasukan += t.jumlah;
        else if (t.tipe === "PENGELUARAN") entry.pengeluaran += t.jumlah;
        entry.bersih = entry.pemasukan - entry.pengeluaran;
      }
    });
  } else if (mode === "monthly") {
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    for (let y = startYear; y <= endYear; y++) {
      const mStart = y === startYear ? startMonth : 0;
      const mEnd = y === endYear ? endMonth : 11;
      for (let m = mStart; m <= mEnd; m++) {
        const key = `${y}-${String(m + 1).padStart(2, "0")}`;
        const label = new Date(y, m, 1).toLocaleDateString("id-ID", { month: "short", year: "numeric" });
        map.set(key, { label, pemasukan: 0, pengeluaran: 0, bersih: 0 });
      }
    }
    transaksi.forEach((t) => {
      const d = new Date(t.tanggal);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (map.has(key)) {
        const entry = map.get(key)!;
        if (t.tipe === "PEMASUKAN") entry.pemasukan += t.jumlah;
        else if (t.tipe === "PENGELUARAN") entry.pengeluaran += t.jumlah;
        entry.bersih = entry.pemasukan - entry.pengeluaran;
      }
    });
  } else if (mode === "quarterly") {
    const startYear = start.getFullYear();
    const startQuarter = Math.floor(start.getMonth() / 3) + 1;
    const endYear = end.getFullYear();
    const endQuarter = Math.floor(end.getMonth() / 3) + 1;
    for (let y = startYear; y <= endYear; y++) {
      const qStart = y === startYear ? startQuarter : 1;
      const qEnd = y === endYear ? endQuarter : 4;
      for (let q = qStart; q <= qEnd; q++) {
        const key = `${y}-Q${q}`;
        const label = getQuarterLabel(y, q);
        map.set(key, { label, pemasukan: 0, pengeluaran: 0, bersih: 0 });
      }
    }
    transaksi.forEach((t) => {
      const d = new Date(t.tanggal);
      const q = Math.floor(d.getMonth() / 3) + 1;
      const key = `${d.getFullYear()}-Q${q}`;
      if (map.has(key)) {
        const entry = map.get(key)!;
        if (t.tipe === "PEMASUKAN") entry.pemasukan += t.jumlah;
        else if (t.tipe === "PENGELUARAN") entry.pengeluaran += t.jumlah;
        entry.bersih = entry.pemasukan - entry.pengeluaran;
      }
    });
  }

  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, v]) => v);
}

function getChartValueKey(tipeFilter: string) {
  if (tipeFilter === "PEMASUKAN") return "pemasukan";
  if (tipeFilter === "PENGELUARAN") return "pengeluaran";
  return "bersih";
}

function getChartTitle(tipeFilter: string, periode: string, mode: string, customRange: { start: Date | null; end: Date | null }) {
  if (periode === "KUSTOM" && customRange.start && customRange.end) {
    if (mode === "quarterly") {
      if (tipeFilter === "PEMASUKAN") return "Pendapatan Kuartilan";
      if (tipeFilter === "PENGELUARAN") return "Pengeluaran Kuartilan";
      return "Tren Keuangan Kuartilan";
    } else if (mode === "monthly") {
      if (tipeFilter === "PEMASUKAN") return "Pendapatan Bulanan";
      if (tipeFilter === "PENGELUARAN") return "Pengeluaran Bulanan";
      return "Tren Keuangan Bulanan";
    } else {
      if (tipeFilter === "PEMASUKAN") return "Pendapatan Harian";
      if (tipeFilter === "PENGELUARAN") return "Pengeluaran Harian";
      return "Tren Keuangan Harian";
    }
  }
  if (tipeFilter === "PEMASUKAN") {
    if (periode === "SEBULAN") return "Pendapatan Harian";
    if (periode === "SETAHUN") return "Pendapatan Bulanan";
    return "Pendapatan";
  }
  if (tipeFilter === "PENGELUARAN") {
    if (periode === "SEBULAN") return "Pengeluaran Harian";
    if (periode === "SETAHUN") return "Pengeluaran Bulanan";
    return "Pengeluaran";
  }
  if (periode === "SEBULAN") return "Tren Keuangan Harian";
  if (periode === "SETAHUN") return "Tren Keuangan Bulanan";
  return "Tren Keuangan";
}

function formatRupiahCompact(n: number) {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`;
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function calculateSummary(transaksi: TransaksiItem[]) {
  const totalPendapatan = transaksi
    .filter((t) => t.tipe === "PEMASUKAN")
    .reduce((sum, t) => sum + t.jumlah, 0);
  const totalPengeluaran = transaksi
    .filter((t) => t.tipe === "PENGELUARAN")
    .reduce((sum, t) => sum + t.jumlah, 0);
  return {
    total_pendapatan: totalPendapatan,
    total_pengeluaran: totalPengeluaran,
    total_bersih: totalPendapatan - totalPengeluaran,
  };
}

function getEarliestTransaksiDate(transaksi: TransaksiItem[]): Date | null {
  if (transaksi.length === 0) return null;
  const dates = transaksi.map((t) => new Date(t.tanggal).getTime());
  return new Date(Math.min(...dates));
}

// ─── CUSTOM DATE PICKER COMPONENT ───

function DatePickerModal({
  isOpen,
  onClose,
  onApply,
  initialRange,
  earliestDate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (range: { start: Date; end: Date }, agg: string) => void;
  initialRange: { start: Date | null; end: Date | null };
  earliestDate: Date | null;
}) {
  const minDate = new Date(2020, 0, 1);
  const maxDate = endOfDay(new Date());

  const [startDate, setStartDate] = useState<Date | null>(initialRange.start);
  const [endDate, setEndDate] = useState<Date | null>(initialRange.end);
  const [pickerMonth, setPickerMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectingMode, setSelectingMode] = useState<"start" | "end">("start");
  const [startInput, setStartInput] = useState(() => formatInputDate(initialRange.start));
  const [endInput, setEndInput] = useState(() => formatInputDate(initialRange.end));
  const [aggMode, setAggMode] = useState<string>(() => {
    if (initialRange.start && initialRange.end) {
      const m = getDefaultAggMode(initialRange.start, initialRange.end);
      return m === "daily" ? "HARIAN" : m === "monthly" ? "BULANAN" : "KUARTIL";
    }
    return "HARIAN";
  });

  const today = new Date();

  const year = pickerMonth.getFullYear();
  const month = pickerMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (!isPrevMonthDisabled()) {
      setPickerMonth(new Date(year, month - 1, 1));
    }
  };
  const nextMonth = () => setPickerMonth(new Date(year, month + 1, 1));

  const isPrevMonthDisabled = () => {
    return year <= 2020 && month <= 0;
  };

  const isNextMonthDisabled = () => {
    const now = new Date();
    return year >= now.getFullYear() && month >= now.getMonth();
  };

  // Generate 12 months quick select
  const quickMonths = useMemo(() => {
    const now = new Date();
    const months = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        label: d.toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
        date: d,
      });
    }
    return months;
  }, []);

  const handleDateClick = (day: number) => {
    const clicked = new Date(year, month, day);
    const clamped = clampDate(clicked, minDate, maxDate);

    if (selectingMode === "start") {
      setStartDate(clamped);
      setStartInput(formatInputDate(clamped));
      if (endDate && isDateBefore(clamped, endDate)) {
        // Keep end date
      } else if (endDate && isDateAfter(clamped, endDate)) {
        setEndDate(null);
        setEndInput("");
      }
      setSelectingMode("end");
    } else {
      if (startDate && isDateBefore(clamped, startDate)) {
        // Swap: clicked becomes start, old start becomes end
        setEndDate(startDate);
        setEndInput(formatInputDate(startDate));
        setStartDate(clamped);
        setStartInput(formatInputDate(clamped));
      } else {
        setEndDate(clamped);
        setEndInput(formatInputDate(clamped));
      }
    }
  };

  const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartInput(e.target.value);
    const parsed = parseInputDate(e.target.value);
    if (parsed) {
      const clamped = clampDate(parsed, minDate, maxDate);
      setStartDate(clamped);
      setStartInput(formatInputDate(clamped));
      setSelectingMode("end");
    }
  };

  const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndInput(e.target.value);
    const parsed = parseInputDate(e.target.value);
    if (parsed) {
      const clamped = clampDate(parsed, minDate, maxDate);
      setEndDate(clamped);
      setEndInput(formatInputDate(clamped));
    }
  };

  const handleQuickMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const clampedStart = clampDate(start, minDate, maxDate);
    const clampedEnd = clampDate(end, minDate, maxDate);
    setStartDate(clampedStart);
    setEndDate(clampedEnd);
    setStartInput(formatInputDate(clampedStart));
    setEndInput(formatInputDate(clampedEnd));
    // Update pickerMonth to show this month
    setPickerMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    // Update default agg
    const m = getDefaultAggMode(clampedStart, clampedEnd);
    setAggMode(m === "daily" ? "HARIAN" : m === "monthly" ? "BULANAN" : "KUARTIL");
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setStartInput("");
    setEndInput("");
    setSelectingMode("start");
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onApply({ start: startDate, end: endDate }, aggMode);
      onClose();
    }
  };

  const isStart = (day: number) => startDate && isSameDate(new Date(year, month, day), startDate);
  const isEnd = (day: number) => endDate && isSameDate(new Date(year, month, day), endDate);
  const isInRange = (day: number) => {
    const d = new Date(year, month, day);
    return isDateInRange(d, startDate, endDate);
  };
  const isToday = (day: number) => isSameDate(new Date(year, month, day), today);
  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    return isDateBefore(d, minDate) || isDateAfter(d, maxDate);
  };

  // Update agg when range changes
  useEffect(() => {
    if (startDate && endDate) {
      const m = getDefaultAggMode(startDate, endDate);
      const newAgg = m === "daily" ? "HARIAN" : m === "monthly" ? "BULANAN" : "KUARTIL";
      setAggMode(newAgg);
    }
  }, [startDate, endDate]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pilih Rentang Tanggal"
      size="sm"
    >
      {/* Inputs */}
      <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Tanggal Mulai</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={startInput}
                  onChange={handleStartInputChange}
                  onFocus={() => setSelectingMode("start")}
                  className={`w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${
                    selectingMode === "start" ? "border-[#84CC16] ring-1 ring-[#84CC16]" : "border-gray-200"
                  }`}
                />
              </div>
            </div>
            <span className="text-gray-400 mt-5">-</span>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Tanggal Selesai</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={endInput}
                  onChange={handleEndInputChange}
                  onFocus={() => setSelectingMode("end")}
                  className={`w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${
                    selectingMode === "end" ? "border-[#84CC16] ring-1 ring-[#84CC16]" : "border-gray-200"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Month Select */}
        <div className="pt-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Pilih Bulan</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {quickMonths.map((m) => (
              <button
                key={m.label}
                onClick={() => handleQuickMonth(m.date)}
                className="px-3 py-1.5 text-xs bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-[#84CC16]/10 hover:border-[#84CC16] hover:text-[#84CC16] transition-colors whitespace-nowrap shrink-0"
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="pt-2 pb-2">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              disabled={isPrevMonthDisabled()}
              className={`p-1 rounded-lg transition-colors ${
                isPrevMonthDisabled()
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">
                {pickerMonth.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
              </span>
            </div>
            <button
              onClick={nextMonth}
              disabled={isNextMonthDisabled()}
              className={`p-1 rounded-lg transition-colors ${
                isNextMonthDisabled()
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 mb-1">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
              <div key={d} className="text-center text-[10px] text-gray-400 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days - Fixed height grid */}
          <div className="grid grid-cols-7 gap-1 min-h-[240px]">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8 w-8" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const start = isStart(day);
              const end = isEnd(day);
              const inRange = isInRange(day);
              const today = isToday(day);
              const disabled = isDisabled(day);

              return (
                <button
                  key={day}
                  onClick={() => !disabled && handleDateClick(day)}
                  disabled={disabled}
                  className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                    disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : start || end
                      ? "bg-[#84CC16] text-white"
                      : inRange
                      ? "bg-[#84CC16]/10 text-[#84CC16]"
                      : today
                      ? "border border-[#84CC16] text-[#84CC16]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
            {/* Fill remaining cells to maintain grid height */}
            {Array.from({ length: Math.max(0, 42 - firstDay - daysInMonth) }).map((_, i) => (
              <div key={`fill-${i}`} className="h-8 w-8" />
            ))}
          </div>
        </div>

        {/* Aggregation Type */}
        <div className="py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Tipe Agregasi</p>
          <div className="flex gap-2">
            {["HARIAN", "BULANAN", "KUARTIL"].map((a) => (
              <button
                key={a}
                onClick={() => setAggMode(a)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                  aggMode === a
                    ? "bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                {aggLabels[a]}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            disabled={!startDate || !endDate}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              startDate && endDate
                ? "bg-[#84CC16] text-white hover:bg-[#84CC16]/90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Terapkan
          </button>
        </div>
    </Modal>
  );
}

// ─── MAIN COMPONENT ───

export default function KeuanganPage() {
  const router = useRouter();
  const [propertiList, setPropertiList] = useState<PropertiData[]>([]);
  const [selectedProperti, setSelectedProperti] = useState("SEMUA");
  const [selectedTipe, setSelectedTipe] = useState("SEMUA");
  const [selectedPeriode, setSelectedPeriode] = useState("SEBULAN");
  const [customRange, setCustomRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [customAgg, setCustomAgg] = useState<string>("HARIAN");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<KeuanganData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPeriodeDropdown, setShowPeriodeDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const fetchedRef = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PEMILIK") {
      router.push("/public/katalog-properti");
      return;
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const propertiData = await getPropertiList();
        setPropertiList(propertiData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    const fetchKeuangan = async () => {
      setLoading(true);
      try {
        const result = await getKeuanganTransaksi(
          selectedProperti === "SEMUA" ? undefined : selectedProperti,
          selectedTipe,
          search.trim() || undefined
        );
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKeuangan();
  }, [selectedProperti, selectedTipe, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPeriodeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const earliestDate = useMemo(() => {
    if (!data || !data.transaksi) return null;
    return getEarliestTransaksiDate(data.transaksi);
  }, [data]);

  const filteredTransaksi = useMemo(() => {
    if (!data || !data.transaksi) return [];
    let result = data.transaksi;
    result = filterTransaksiByPeriod(result, selectedPeriode, customRange);
    return result;
  }, [data, selectedPeriode, customRange]);

  const summary = useMemo(() => {
    return calculateSummary(filteredTransaksi);
  }, [filteredTransaksi]);

  const chartData = useMemo(() => {
    if (!filteredTransaksi.length) return [];
    const bounds = getPeriodBounds(selectedPeriode, customRange);
    if (!bounds.start || !bounds.end) return [];

    let mode: "daily" | "monthly" | "quarterly";
    if (selectedPeriode === "KUSTOM") {
      mode = customAgg === "HARIAN" ? "daily" : customAgg === "BULANAN" ? "monthly" : "quarterly";
    } else if (selectedPeriode === "SEBULAN") {
      mode = "daily";
    } else {
      mode = "monthly";
    }

    return aggregateChartData(filteredTransaksi, mode, bounds.start, bounds.end, selectedTipe);
  }, [filteredTransaksi, selectedPeriode, customRange, customAgg, selectedTipe]);

  const chartValueKey = getChartValueKey(selectedTipe);
  const chartTitle = getChartTitle(selectedTipe, selectedPeriode, customAgg, customRange);

  const getDropdownLabel = () => {
    if (selectedPeriode === "KUSTOM" && customRange.start && customRange.end) {
      return `${formatInputDate(customRange.start)} - ${formatInputDate(customRange.end)}`;
    }
    return periodeLabels[selectedPeriode];
  };

  const formatRupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Manajemen Keuangan
        </h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari Pembayaran"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent"
          />
        </div>

        {/* Properti Filter Chips + Periode Dropdown */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedProperti("SEMUA")}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                selectedProperti === "SEMUA"
                  ? "bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              Semua
            </button>
            {propertiList.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProperti(p.id)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedProperti === p.id
                    ? "bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                {p.nama}
              </button>
            ))}
          </div>

          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setShowPeriodeDropdown(!showPeriodeDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 hover:border-gray-300 transition-colors"
            >
              <span className="truncate max-w-[140px]">{getDropdownLabel()}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            </button>
            {showPeriodeDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                {["SEBULAN", "SETAHUN", "KUSTOM"].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      if (p === "KUSTOM") {
                        setShowDatePicker(true);
                        setShowPeriodeDropdown(false);
                      } else {
                        setSelectedPeriode(p);
                        setCustomRange({ start: null, end: null });
                        setShowPeriodeDropdown(false);
                      }
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      selectedPeriode === p && p !== "KUSTOM"
                        ? "bg-[#84CC16]/10 text-[#84CC16] font-medium"
                        : selectedPeriode === "KUSTOM" && p === "KUSTOM"
                        ? "bg-[#84CC16]/10 text-[#84CC16] font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {periodeLabels[p]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date Picker Modal */}
        <DatePickerModal
          isOpen={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onApply={(range, agg) => {
            setCustomRange(range);
            setCustomAgg(agg);
            setSelectedPeriode("KUSTOM");
          }}
          initialRange={customRange}
          earliestDate={earliestDate}
        />

        {/* Summary + Chart Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="h-36 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-36 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {/* Card Kiri: Total Bersih */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#84CC16]/10 rounded-xl flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6 text-[#84CC16]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">Total Bersih</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatRupiah(summary.total_bersih)}
                </p>
              </div>
            </div>

            {/* Card Kanan: Line Chart */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#84CC16]" />
                  <p className="text-sm font-semibold text-gray-900">{chartTitle}</p>
                </div>
              </div>
              <div className="h-28">
                {chartData.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">
                    Tidak ada data untuk periode ini
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => formatRupiahCompact(v)}
                        width={60}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const val = payload[0].value as number;
                            return (
                              <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs">
                                <p className="text-gray-500 mb-1">{label}</p>
                                <p className="font-semibold text-gray-900">
                                  {formatRupiah(val)}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey={chartValueKey}
                        stroke="#84CC16"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: "#84CC16", stroke: "#fff", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tipe Filter + Download PDF */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {["SEMUA", "PEMASUKAN", "PENGELUARAN"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTipe(t)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedTipe === t
                    ? "bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                {tipeLabels[t]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowPdfModal(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#84CC16] transition-colors shrink-0 ml-2"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </div>

        {/* Transaction List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredTransaksi.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-sm">Belum ada transaksi untuk periode ini</p>
            <p className="text-xs mt-1">
              Data keuangan akan muncul setelah ada pembayaran atau pengajuan dana.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransaksi.map((item) => {
              const badgeClass =
                statusBadgeStyle[item.status_badge] ||
                "bg-gray-100 text-gray-600";
              const isPemasukan = item.tipe === "PEMASUKAN";
              const isPengeluaran = item.tipe === "PENGELUARAN";
              const amountPrefix = isPemasukan
                ? "+"
                : isPengeluaran
                ? "-"
                : "";
              const amountColor = isPemasukan
                ? "text-green-600"
                : isPengeluaran
                ? "text-red-600"
                : "text-gray-900";

              const CardContent = (
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      {item.nama} —{" "}
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {item.detail_info}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${badgeClass}`}
                      >
                        {item.status_badge}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <p className={`text-sm font-bold ${amountColor}`}>
                      {amountPrefix}
                      {formatRupiah(item.jumlah)}
                    </p>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              );

              if (isPemasukan && item.kuitansi_id) {
                return (
                  <Link
                    key={item.id}
                    href={`/administrator/keuangan/kuitansi/${item.kuitansi_id}`}
                    className="block hover:shadow-md transition-shadow rounded-xl"
                  >
                    {CardContent}
                  </Link>
                );
              }

              return <div key={item.id}>{CardContent}</div>;
            })}
          </div>
        )}
      </div>

      {/* PDF Export Modal */}
      <Modal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        title="Export PDF"
        size="sm"
      >
        <div className="space-y-3">
              <p className="text-xs text-gray-500 mb-3">
                Periode: {getDropdownLabel()}
              </p>

              <button
                onClick={() => {
                  generateSeluruhTransaksiPDF(filteredTransaksi, summary, selectedPeriode, customRange);
                  setShowPdfModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-[#84CC16]/10 hover:border-[#84CC16] hover:text-[#84CC16] transition-colors"
              >
                <Download className="w-4 h-4" />
                <div className="text-left">
                  <p className="font-medium">Seluruh Transaksi</p>
                  <p className="text-xs text-gray-500">Tabel lengkap semua transaksi terfilter</p>
                </div>
              </button>

              <button
                onClick={() => {
                  generateIncomeLossPDF(filteredTransaksi, "HARIAN", selectedPeriode, customRange);
                  setShowPdfModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-[#84CC16]/10 hover:border-[#84CC16] hover:text-[#84CC16] transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                <div className="text-left">
                  <p className="font-medium">Income/Loss Harian</p>
                  <p className="text-xs text-gray-500">Agregasi pendapatan & pengeluaran per hari</p>
                </div>
              </button>

              <button
                onClick={() => {
                  generateIncomeLossPDF(filteredTransaksi, "BULANAN", selectedPeriode, customRange);
                  setShowPdfModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-[#84CC16]/10 hover:border-[#84CC16] hover:text-[#84CC16] transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                <div className="text-left">
                  <p className="font-medium">Income/Loss Bulanan</p>
                  <p className="text-xs text-gray-500">Agregasi pendapatan & pengeluaran per bulan</p>
                </div>
              </button>

              <button
                onClick={() => {
                  generateIncomeLossPDF(filteredTransaksi, "TAHUNAN", selectedPeriode, customRange);
                  setShowPdfModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-[#84CC16]/10 hover:border-[#84CC16] hover:text-[#84CC16] transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                <div className="text-left">
                  <p className="font-medium">Income/Loss Tahunan</p>
                  <p className="text-xs text-gray-500">Agregasi pendapatan & pengeluaran per tahun</p>
                </div>
              </button>
        </div>
      </Modal>
    </MainLayout>
  );
}
