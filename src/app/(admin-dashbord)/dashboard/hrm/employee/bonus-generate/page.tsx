/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Plus, Pencil, Trash2, FileText, ChevronDown, Search } from "lucide-react";

const bonusOptions = [
  "Bangla Noboborsho",
  "Eid Ul azha",
  "Eid Ul Fitor",
];

const ALL_ROWS = [
  { id: 1, bonus: "Bangla Noboborsho", employee: "Tazmul Reza", amount: "500" },
  { id: 2, bonus: "Bangla Noboborsho", employee: "Rifat Hosain", amount: "2000" },
  { id: 3, bonus: "Eid Ul azha", employee: "Mohin Uddin", amount: "47500" },
  { id: 4, bonus: "Eid Ul Fitor", employee: "Sarna", amount: "7500" },
  { id: 5, bonus: "Eid Ul azha", employee: "Admin", amount: "50000" },
  { id: 6, bonus: "Eid Ul azha", employee: "Tazmul Reza", amount: "20000" },
  { id: 7, bonus: "Eid Ul azha", employee: "Rifat Hosain", amount: "6500" },
  { id: 8, bonus: "Eid Ul azha", employee: "Mohin Uddin", amount: "50000" },
  { id: 9, bonus: "Eid Ul azha", employee: "Rowza", amount: "50000" },
  { id: 10, bonus: "Eid Ul azha", employee: "Masud Rana", amount: "50000" },
  { id: 11, bonus: "Eid Ul Fitor", employee: "Rakib Hasan", amount: "15000" },
  { id: 12, bonus: "Bangla Noboborsho", employee: "Admin", amount: "1000" },
  { id: 13, bonus: "Eid Ul azha", employee: "Sarna", amount: "30000" },
  { id: 14, bonus: "Eid Ul Fitor", employee: "Tazmul Reza", amount: "25000" },
  { id: 15, bonus: "Eid Ul azha", employee: "Rifat Hosain", amount: "40000" },
];

function SearchableSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select Bonus",
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [query, options]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="w-full max-w-xs">
      {label && (
        <label className="block text-[12px] text-ink-muted mb-1">
          {label}
          <span className="text-rose-500">*</span>
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
            setQuery("");
          }}
          className="w-full flex items-center justify-between border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
        >
          <span className={value ? "text-ink" : "text-ink-faint"}>
            {value || placeholder}
          </span>
          <ChevronDown className="w-4 h-4 text-ink-faint shrink-0" />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-lg shadow-black/6 z-50 overflow-hidden">
            <div className="px-3 py-1.5 bg-ink-muted/20 border-b border-border text-[12px] font-medium text-ink-muted">
              Select Bonus
            </div>
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-faint" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  autoFocus
                  className="w-full pl-8 pr-2.5 py-1.5 border border-border rounded-md text-[13px] bg-canvas text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="px-3 py-2 text-[13px] text-ink-faint">No results</p>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-canvas ${
                      value === opt ? "bg-canvas text-ink font-medium" : "text-ink-muted"
                    }`}
                  >
                    {opt}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BonusGenerateListPage() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [bonus, setBonus] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_ROWS.filter((r) => {
      const matchBonus = !bonus || r.bonus === bonus;
      const matchSearch =
        !q ||
        r.bonus.toLowerCase().includes(q) ||
        r.employee.toLowerCase().includes(q) ||
        r.amount.includes(q) ||
        String(r.id).includes(q);
      return matchBonus && matchSearch;
    });
  }, [search, bonus]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / entries));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * entries;
  const pageRows = filtered.slice(start, start + entries);
  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(start + entries, total);

  const goPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [1];
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Breadcrumb + Add button */}
      <div className="bg-surface border-b border-border px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-ink-muted hover:text-ink cursor-pointer">Home</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink-muted">Employee</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink font-medium">Bonus Generate List</span>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-black text-white text-[13px] font-medium hover:bg-slate-800 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Bonus Generate
        </button>
      </div>

      <div className="p-4">
        {/* Bonus filter + PDF */}
        <div className="flex flex-wrap items-end gap-3 mb-4">
          <SearchableSelect
            label="Bonus"
            value={bonus}
            onChange={(v) => {
              setBonus(v);
              setPage(1);
            }}
            options={bonusOptions}
          />
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-sky-500 text-white text-[12px] font-medium hover:bg-sky-600"
          >
            <FileText className="w-3.5 h-3.5" />
            Pdf
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-[13px] text-ink-muted">
            <span>Show</span>
            <select
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
                setPage(1);
              }}
              className="border border-border rounded px-2 py-1 text-[13px] bg-surface text-ink"
            >
              {[5, 10, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="text-ink-muted">Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="border border-border rounded px-2 py-1 text-[13px] w-40 bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="bg-black text-white">
                  {["SL", "BONUS", "EMPLOYEE", "AMOUNT", "ACTION"].map((h) => (
                    <th key={h} className="px-3 py-2.5 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-10 text-center text-ink-faint">
                      No records found
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row) => (
                    <tr key={row.id} className="border-b border-border hover:bg-canvas/70">
                      <td className="px-3 py-2.5 text-ink-muted">{row.id}</td>
                      <td className="px-3 py-2.5 text-ink">{row.bonus}</td>
                      <td className="px-3 py-2.5 text-ink font-medium">{row.employee}</td>
                      <td className="px-3 py-2.5 text-ink tabular-nums">{row.amount}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            className="w-7 h-7 rounded bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            className="w-7 h-7 rounded bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 border-t border-border text-[13px] text-ink-muted">
            <span>
              Showing {from} to {to} of {total} entries
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => goPage(currentPage - 1)}
                className="px-2.5 py-1 rounded border border-border hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed text-ink"
              >
                Previous
              </button>
              {pageNumbers.map((p, i) =>
                typeof p === "string" ? (
                  <span key={`e-${i}`} className="px-1 text-ink-faint">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goPage(p)}
                    className={`min-w-[32px] px-2 py-1 rounded font-medium ${
                      currentPage === p
                        ? "bg-black text-white"
                        : "border border-border hover:bg-canvas text-ink"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => goPage(currentPage + 1)}
                className="px-2.5 py-1 rounded border border-border hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed text-ink"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}