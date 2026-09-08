"use client";

import {
  ClipboardList,
  FileText,
  ShoppingCart,
  Package,
  Truck,
  Receipt,
} from "lucide-react";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

import { procurementStats } from "@/data/procurement/procurement.mock";

const iconMap = {
  clipboard: ClipboardList,
  file: FileText,
  "shopping-cart": ShoppingCart,
  package: Package,
  truck: Truck,
  receipt: Receipt,
};

const cardStyles = {
  red: {
    background: "bg-[#fff8f8]",
    border: "border-[#f3dddd]",
    icon: "bg-[#ffe2e2] text-[#ef4444]",
    line: "#ef4444",
    fill: "#ef4444",
  },

  blue: {
    background: "bg-[#f6f9ff]",
    border: "border-[#dce7f8]",
    icon: "bg-[#dceaff] text-[#1677ff]",
    line: "#1677ff",
    fill: "#1677ff",
  },

  green: {
    background: "bg-[#f5fcf8]",
    border: "border-[#d9eee3]",
    icon: "bg-[#d8f5e5] text-[#10b981]",
    line: "#10b981",
    fill: "#10b981",
  },

  purple: {
    background: "bg-[#faf8ff]",
    border: "border-[#e7def7]",
    icon: "bg-[#e9ddff] text-[#7c3aed]",
    line: "#7c3aed",
    fill: "#7c3aed",
  },

  orange: {
    background: "bg-[#fffaf5]",
    border: "border-[#f3e1cf]",
    icon: "bg-[#ffe2c6] text-[#f97316]",
    line: "#f97316",
    fill: "#f97316",
  },

  cyan: {
    background: "bg-[#f4fcfd]",
    border: "border-[#d6edf1]",
    icon: "bg-[#d7f3f5] text-[#0891b2]",
    line: "#0891b2",
    fill: "#0891b2",
  },
};

export default function ProcurementStats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      {procurementStats.map((item, index) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];

        const colors = cardStyles[item.color as keyof typeof cardStyles];

        /*
         * Mock chart data তৈরি করা হচ্ছে existing
         * item.chart থেকে।
         */
        const chart = item.chart ?? [20, 24, 18, 27, 22, 31, 26, 35];
        const chartData = chart.map((value, chartIndex) => ({
          index: chartIndex,
          value,
        }));

        return (
          <div
            key={item.id}
            className={[
              "relative",
              "h-[210px]",
              "overflow-hidden",
              "rounded-[10px]",
              "border",
              "px-[18px]",
              "pt-[16px]",
              "pb-[8px]",
              "shadow-[0_2px_8px_rgba(15,23,42,0.04)]",
              "transition-all",
              "duration-200",
              "hover:-translate-y-[1px]",
              "hover:shadow-[0_6px_18px_rgba(15,23,42,0.08)]",
              colors.background,
              colors.border,
            ].join(" ")}
          >
            {/* Icon */}
            <div
              className={[
                "flex",
                "h-[42px]",
                "w-[42px]",
                "items-center",
                "justify-center",
                "rounded-[11px]",
                colors.icon,
              ].join(" ")}
            >
              <Icon size={21} strokeWidth={2.2} />
            </div>

            {/* Title */}
            <h3 className="mt-[12px] text-[13px] font-semibold leading-[18px] text-[#172554]">
              {item.title}
            </h3>

            {/* Value */}
            <p className="mt-1.75 text-[26px] font-bold leading-8 tracking-[-0.5px] text-[#10234f]">
              {item.value.toLocaleString()}
            </p>

            {/* Change */}
            <div className="mt-1.75 flex items-center gap-[5px]">
              <span className="text-[12px] font-semibold text-[#16a34a]">
                ↑ {item.change}%
              </span>

              <span className="text-[11px] text-[#71809c]">
                {item.changeLabel}
              </span>
            </div>

            {/* Bottom chart */}
            <div className="absolute bottom-1.5 left-4 right-4 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id={`procurement-gradient-${item.id}-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={colors.fill}
                        stopOpacity={0.16}
                      />

                      <stop
                        offset="100%"
                        stopColor={colors.fill}
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={colors.line}
                    strokeWidth={1.5}
                    fill={`url(#procurement-gradient-${item.id}-${index})`}
                    dot={false}
                    activeDot={false}
                    isAnimationActive={true}
                    animationDuration={800}
                    animationBegin={index * 100}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
