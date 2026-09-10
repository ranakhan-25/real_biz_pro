"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, AlertCircle, RefreshCw } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipContentProps,
} from "recharts";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

import {
  fetchPropertyStatusCounts,
  type PropertyStatusCount,
} from "@/lib/api";

type ChartTooltipProps = TooltipContentProps<ValueType, NameType>;

function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="min-w-35 rounded-lg border border-border bg-surface px-3 py-2.5 shadow-lg shadow-black/5"
    >
      <p className="mb-1.5 text-[11px] font-medium text-ink-muted">
        {label}
      </p>

      <div className="flex items-center gap-2 text-[12px]">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
        />

        <span className="text-ink-muted">
          Properties
        </span>

        <span className="ml-auto font-semibold tabular-nums text-ink">
          {entry.value}
        </span>
      </div>
    </motion.div>
  );
}

function ChartSkeleton() {
  return (
    <div
      className="flex h-56 items-end gap-3 px-4 pb-6"
      aria-label="Loading property statistics"
    >
      {[55, 78, 42, 68, 50, 88, 62].map((height, index) => (
        <motion.div
          key={index}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: `${height}%`, opacity: 1 }}
          transition={{
            duration: 0.45,
            delay: index * 0.05,
            ease: "easeOut",
          }}
          className="flex-1 rounded-t bg-border/70"
        />
      ))}
    </div>
  );
}

function ChartError({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div className="flex h-56 flex-col items-center justify-center px-4 text-center">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-danger/10">
        <AlertCircle
          size={17}
          className="text-danger"
          aria-hidden="true"
        />
      </div>

      <p className="text-[12px] font-medium text-ink">
        Unable to load property data
      </p>

      <p className="mt-1 max-w-60 text-[11px] text-ink-faint">
        Something went wrong while fetching the latest property statistics.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-medium text-ink transition-colors hover:bg-canvas focus:outline-none focus:ring-2 focus:ring-accent/30"
      >
        <RefreshCw size={12} aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-56 flex-col items-center justify-center px-4 text-center">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-canvas">
        <Building2
          size={16}
          className="text-ink-faint"
          aria-hidden="true"
        />
      </div>

      <p className="text-[12px] font-medium text-ink">
        No property data yet
      </p>

      <p className="mt-1 text-[11px] text-ink-faint">
        Property status statistics will appear here.
      </p>
    </div>
  );
}

export function PropertyStatusChart() {
  const [data, setData] = useState<PropertyStatusCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const result = await fetchPropertyStatusCounts();

      setData(result ?? []);
    } catch (error) {
      console.error(
        "Failed to fetch property status counts:",
        error
      );

      setHasError(true);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <motion.section
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 10 }
      }
      animate={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0 }
      }
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="rounded-xl border border-border bg-surface p-4 sm:p-5"
      aria-labelledby="property-status-title"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-canvas">
            <Building2
              size={14}
              strokeWidth={1.8}
              className="text-ink-muted"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <h3
              id="property-status-title"
              className="font-display text-[13.5px] font-semibold leading-5 text-ink"
            >
              Properties by Status
            </h3>

            <p className="mt-0.5 text-[11px] text-ink-faint">
              Current property distribution
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4">
        {isLoading ? (
          <ChartSkeleton />
        ) : hasError ? (
          <ChartError onRetry={loadData} />
        ) : data.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.98 }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: 1, scale: 1 }
            }
            transition={{
              duration: 0.35,
              delay: 0.05,
              ease: "easeOut",
            }}
            className="-ml-2 h-56 w-full"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data}
                margin={{
                  top: 8,
                  right: 8,
                  bottom: 0,
                  left: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="status"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--color-ink-faint)",
                    fontSize: 11,
                  }}
                  dy={6}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--color-ink-faint)",
                    fontSize: 10.5,
                  }}
                  width={28}
                  allowDecimals={false}
                />

                <Tooltip
                  cursor={{
                    fill: "var(--color-canvas)",
                  }}
                  content={(props) => (
                    <ChartTooltip {...props} />
                  )}
                />

                <Bar
                  dataKey="count"
                  name="Properties"
                  fill="var(--color-accent)"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={44}
                  animationDuration={
                    shouldReduceMotion ? 0 : 600
                  }
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}