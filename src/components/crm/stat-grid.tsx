"use client";

import Link from "next/link";
import { Circle } from "lucide-react";
import clsx from "clsx";
import type { StatCardData } from "@/lib/api";

const TONE_DOT: Record<StatCardData["tone"], string> = {
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-ink-faint",
};

export function StatGrid({ stats }: { stats: StatCardData[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
      {stats.map((stat) => (
        <Link
          key={stat.id}
          href={
            stat.leadStageId == null
              ? "/crm-module/add-lead-account"
              : `/crm-module/add-lead-account?lead_stages=${stat.leadStageId}`
          }
          className={clsx(
            "min-w-35 flex-1 rounded-lg border border-border bg-surface px-4 py-3.5 shrink-0",
            "transition-all duration-150 ease-out",
            "hover:-translate-y-0.5 hover:shadow-sm hover:shadow-black/4",
            "active:translate-y-0 active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:border-accent",
          )}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Circle
              size={7}
              strokeWidth={0}
              fill="currentColor"
              className={TONE_DOT[stat.tone]}
            />
            <span className="text-[12px] text-ink-muted truncate">
              {stat.label}
            </span>
          </div>
          <p className="font-display text-2xl font-semibold text-ink tabular-nums">
            {stat.value}
          </p>
        </Link>
      ))}
    </div>
  );
}
