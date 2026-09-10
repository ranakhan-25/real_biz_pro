"use client";

import { CalendarDays, Download } from "lucide-react";
import { ProcurementPeriod } from "@/types/procurement";

interface Props {
  period: ProcurementPeriod;
  setPeriod: (period: ProcurementPeriod) => void;
}

const periods: { label: string; value: ProcurementPeriod }[] = [
  { label: "Today", value: "today" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
  { label: "All", value: "all" },
];

export default function ProcurementFilters({ period, setPeriod }: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {periods.map((item) => (
          <button
            key={item.value}
            onClick={() => setPeriod(item.value)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              period === item.value
                ? "bg-blue-600 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
          <CalendarDays size={17} />
          03 Sep 2026 - 03 Oct 2026
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
          <Download size={17} />
          Export
        </button>
      </div>
    </div>
  );
}
