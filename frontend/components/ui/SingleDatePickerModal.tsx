"use client";

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface SingleDatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (date: Date) => void;
  initialDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
  title?: string;
}

// Utils
function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
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

function isDateBefore(a: Date, b: Date) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

function isDateAfter(a: Date, b: Date) {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

function clampDate(date: Date, min?: Date, max?: Date) {
  if (min && isDateBefore(date, min)) return new Date(min);
  if (max && isDateAfter(date, max)) return new Date(max);
  return new Date(date);
}

export default function SingleDatePickerModal({
  isOpen,
  onClose,
  onApply,
  initialDate,
  minDate,
  maxDate,
  title = "Pilih Tanggal",
}: SingleDatePickerModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [pickerMonth, setPickerMonth] = useState(() => {
    const start = initialDate || new Date();
    return new Date(start.getFullYear(), start.getMonth(), 1);
  });
  const [dateInput, setDateInput] = useState(() => formatInputDate(initialDate));

  // Reset state when opened with new initialDate
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialDate);
      setDateInput(formatInputDate(initialDate));
      if (initialDate) {
        setPickerMonth(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
      } else {
        const now = new Date();
        setPickerMonth(new Date(now.getFullYear(), now.getMonth(), 1));
      }
    }
  }, [isOpen, initialDate]);

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
  const nextMonth = () => {
    if (!isNextMonthDisabled()) {
      setPickerMonth(new Date(year, month + 1, 1));
    }
  };

  const isPrevMonthDisabled = () => {
    if (!minDate) return false;
    return year <= minDate.getFullYear() && month <= minDate.getMonth();
  };

  const isNextMonthDisabled = () => {
    if (!maxDate) return false;
    return year >= maxDate.getFullYear() && month >= maxDate.getMonth();
  };

  const handleDateClick = (day: number) => {
    const clicked = new Date(year, month, day);
    const clamped = clampDate(clicked, minDate, maxDate);
    setSelectedDate(clamped);
    setDateInput(formatInputDate(clamped));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);
    const parsed = parseInputDate(e.target.value);
    if (parsed) {
      const clamped = clampDate(parsed, minDate, maxDate);
      setSelectedDate(clamped);
      setDateInput(formatInputDate(clamped));
      setPickerMonth(new Date(clamped.getFullYear(), clamped.getMonth(), 1));
    }
  };

  const handleClear = () => {
    setSelectedDate(null);
    setDateInput("");
  };

  const handleApply = () => {
    if (selectedDate) {
      onApply(selectedDate);
      onClose();
    }
  };

  const isSelected = (day: number) => selectedDate && isSameDate(new Date(year, month, day), selectedDate);
  const isCurrentToday = (day: number) => isSameDate(new Date(year, month, day), today);
  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    return (minDate && isDateBefore(d, minDate)) || (maxDate && isDateAfter(d, maxDate));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-3">
        <label className="text-xs text-gray-500 mb-1 block">Tanggal</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            value={dateInput}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 border-[#84CC16] ring-1 ring-[#84CC16]"
          />
        </div>
      </div>

      <div className="pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={prevMonth}
            disabled={isPrevMonthDisabled()}
            className={`p-1 rounded-lg transition-colors ${
              isPrevMonthDisabled() ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
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
              isNextMonthDisabled() ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
            <div key={d} className="text-center text-[10px] text-gray-400 py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 min-h-[240px]">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8 w-8" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const selected = isSelected(day);
            const todayMatch = isCurrentToday(day);
            const disabled = isDisabled(day);

            return (
              <button
                key={day}
                onClick={() => !disabled && handleDateClick(day)}
                disabled={disabled}
                className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                  disabled
                    ? "text-gray-300 cursor-not-allowed"
                    : selected
                    ? "bg-[#84CC16] text-white"
                    : todayMatch
                    ? "border border-[#84CC16] text-[#84CC16]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          disabled={!selectedDate}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
            selectedDate
              ? "bg-[#84CC16] text-white hover:bg-[#84CC16]/90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Pilih
        </button>
      </div>
    </Modal>
  );
}
