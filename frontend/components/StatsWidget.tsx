"use client";
import React from "react";
import { Building2, DoorOpen, CheckCircle } from "lucide-react";

interface StatsWidgetProps {
  totalProperti: number;
  totalKamar: number;
  totalTerisi: number;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({
  totalProperti,
  totalKamar,
  totalTerisi,
}) => {
  const stats = [
    {
      label: "Total Properti",
      value: totalProperti,
      icon: Building2,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      label: "Total Kamar",
      value: totalKamar,
      icon: DoorOpen,
      color: "bg-emerald-50 text-emerald-600",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Kamar Terisi",
      value: totalTerisi,
      icon: CheckCircle,
      color: "bg-orange-50 text-orange-600",
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.color} rounded-xl p-3 text-center`}
          >
            <div className={`${stat.iconBg} w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-75">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsWidget;
