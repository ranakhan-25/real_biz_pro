"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipContentProps,
} from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { fetchActivityTrend, type ActivityPoint } from "@/lib/api";

const RANGE_MAP: Record<string, "today" | "weekly" | "monthly" | "yearly" | "all"> = {
  Today: "today",
  Weekly: "weekly",
  Monthly: "monthly",
  Yearly: "yearly",
  All: "all",
};

function ChartTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="rounded-md border border-border bg-surface px-3 py-2 shadow-sm shadow-black/6 backdrop-blur-xs"
    >
      <p className="text-[11px] font-medium text-ink-muted mb-1">{label}</p>
      {payload.map((entry) => (
        <div
          key={entry.dataKey as string}
          className="flex items-center gap-1.5 text-[12px]"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-ink-muted capitalize">
            {entry.dataKey === "followUps" ? "Follow-ups" : "Leads"}
          </span>
          <span className="font-semibold text-ink ml-auto tabular-nums pl-3">
            {entry.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export function ActivityChart({ range }: { range: string }) {
  const [data, setData] = useState<ActivityPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchActivityTrend(RANGE_MAP[range] ?? "weekly").then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [range]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-lg border border-border bg-surface p-4 shadow-2xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-ink-muted" />
          <h3 className="font-display text-[13.5px] font-semibold text-ink">
            Activity
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-ink-muted">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 cursor-default select-none"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Leads
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 cursor-default select-none"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-info" /> Follow-ups
          </motion.span>
        </div>
      </div>

      {/* Chart Canvas / Loading State with AnimatePresence */}
      <AnimatePresence mode="wait">
        {!loading && data.length > 0 ? (
          <motion.div
            key={`chart-${range}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 -ml-2 h-36"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="followUpsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-info)" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="var(--color-info)" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-ink-faint)", fontSize: 10.5 }}
                  dy={4}
                />
                <YAxis hide domain={[0, "dataMax + 2"]} />
                <Tooltip
                  content={(props) => <ChartTooltip {...props} />}
                  cursor={{ stroke: "var(--color-border-strong)", strokeWidth: 1 }}
                />

                <Area
                  type="monotone"
                  dataKey="followUps"
                  stroke="var(--color-info)"
                  strokeWidth={1.5}
                  fill="url(#followUpsFill)"
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0 }}
                  animationDuration={600}
                  animationEasing="ease-out"
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  fill="url(#leadsFill)"
                  dot={false}
                  activeDot={{ r: 3.5, strokeWidth: 0 }}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="h-36 flex items-center justify-center text-[12px] text-ink-faint"
          >
            <motion.span
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              Loading trend data…
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}