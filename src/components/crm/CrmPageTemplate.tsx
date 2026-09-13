"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, Download, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface CrmColumn {
  key: string;
  label: string;
}

export interface CrmPageData {
  breadcrumb: string;
  title: string;
  description: string;
  addLabel?: string;
  columns: CrmColumn[];
  rows: Record<string, string | number>[];
}

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
} as const;

const rowVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.2,
      ease: "easeOut" as const,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
} as const;

// Helper component to render clickable breadcrumb links dynamically
function Breadcrumbs({ breadcrumb }: { breadcrumb: string }) {
  const parts = useMemo(() => {
    const rawParts = breadcrumb.split("/").map((p) => p.trim()).filter(Boolean);
    let currentPath = "/dashboard";

    return rawParts.map((part, index) => {
      // Slugify part for URL routing (e.g., "Call Center" -> "call-center")
      const slug = part.toLowerCase().replace(/\s+/g, "-");
      currentPath += `/${slug}`;

      const isLast = index === rawParts.length - 1;

      return {
        label: part,
        href: currentPath,
        isLast,
      };
    });
  }, [breadcrumb]);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[11.5px] text-ink-faint">
      {parts.map((item, index) => (
        <span key={item.href} className="inline-flex items-center gap-1">
          {index > 0 && <ChevronRight size={10} className="text-ink-faint/60" />}
          {item.isLast ? (
            <span className="font-medium text-ink-muted">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="transition-colors hover:text-ink hover:underline"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function CrmPageTemplate({
  breadcrumb,
  title,
  description,
  addLabel,
  columns,
  rows,
}: CrmPageData) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q)),
    );
  }, [query, rows, columns]);

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
      >
        {/* Clickable Breadcrumbs Component */}
        <Breadcrumbs breadcrumb={breadcrumb} />

        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-[19px] font-semibold text-ink">
              {title}
            </h1>
            <p className="text-[13px] text-ink-muted mt-0.5">{description}</p>
          </div>
          {addLabel && (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            >
              <Plus size={15} />
              {addLabel}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Main Table Card */}
      <motion.div 
        initial={{ opacity: 0, y: 12, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
        className="rounded-lg border border-border bg-surface shadow-xs overflow-hidden"
      >
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3.5">
          <div className="relative w-full max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-md border border-border bg-canvas pl-8 pr-3 py-1.5 text-[12.5px] text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft"
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:text-ink hover:bg-canvas"
          >
            <Download size={13} />
            Export
          </motion.button>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-canvas">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="whitespace-nowrap px-4 py-2.5 text-[11.5px] font-semibold text-ink-muted"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.length > 0 ? (
                  filtered.map((row, i) => (
                    <motion.tr
                      key={row.id ?? i}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={rowVariants}
                      className="border-b border-border last:border-0 transition-colors hover:bg-canvas/60"
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="whitespace-nowrap px-4 py-2.5 text-[13px] text-ink"
                        >
                          {row[col.key]}
                        </td>
                      ))}
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td
                      colSpan={columns.length}
                      className="px-4 py-8 text-center text-[12.5px] text-ink-faint"
                    >
                      No results found.
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11.5px] text-ink-faint">
          <span>
            Showing {filtered.length} of {rows.length} entries
          </span>
        </div>
      </motion.div>
    </div>
  );
}