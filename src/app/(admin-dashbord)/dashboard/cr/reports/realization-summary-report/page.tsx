/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, FileText, FileSpreadsheet, Search } from "lucide-react";

const realizationMenu = [
  "Realization Summary Report",
  "Sale Collection Report",
  "Aging Report",
  "Installment Report",
];

const customerOptions = [
  "Openinig Balance",
  "Flat Sales",
  "Closing Stock",
  "Interest Income",
  "Office Salary",
  "Grn Clearing A/C",
  "Security Deposit",
  "Labor/ Worker Bill Expence",
];

const flatOptions = ["A1", "C-10", "C-9", "E5", "F2", "F 3", "F 4", "56"];

const ALL_ROWS = [
  {
    id: 1,
    customer: "Sagor kumar",
    flatNo: "F2",
    saleValue: "11570000.00",
    amountRealized: "0.00",
    balanceDue: "11570000.00",
    realization: "0.00",
    lastPayment: "",
  },
  {
    id: 2,
    customer: "Sagor kumar",
    flatNo: "F 4",
    saleValue: "11770000.00",
    amountRealized: "200000.00",
    balanceDue: "11570000.00",
    realization: "1.70",
    lastPayment: "",
  },
  {
    id: 3,
    customer: "Mr. Raju raz",
    flatNo: "F2",
    saleValue: "0.00",
    amountRealized: "0.00",
    balanceDue: "0.00",
    realization: "0.00",
    lastPayment: "",
  },
  {
    id: 4,
    customer: "Sagor kumar",
    flatNo: "C-9",
    saleValue: "0.00",
    amountRealized: "0.00",
    balanceDue: "0.00",
    realization: "0.00",
    lastPayment: "",
  },
  {
    id: 5,
    customer: "Sagor kumar",
    flatNo: "F 4",
    saleValue: "73800.00",
    amountRealized: "0.00",
    balanceDue: "73800.00",
    realization: "0.00",
    lastPayment: "",
  },
  {
    id: 6,
    customer: "Mr. Raju raz",
    flatNo: "F 4",
    saleValue: "73800.00",
    amountRealized: "0.00",
    balanceDue: "73800.00",
    realization: "0.00",
    lastPayment: "",
  },
  {
    id: 7,
    customer: "Mr. Raju raz",
    flatNo: "C-9",
    saleValue: "0.00",
    amountRealized: "0.00",
    balanceDue: "0.00",
    realization: "0.00",
    lastPayment: "",
  },
  {
    id: 8,
    customer: "Sagor kumar",
    flatNo: "2",
    saleValue: "0.00",
    amountRealized: "0.00",
    balanceDue: "0.00",
    realization: "0.00",
    lastPayment: "",
  },
  {
    id: 9,
    customer: "Mr. Raju raz",
    flatNo: "F2",
    saleValue: "0.00",
    amountRealized: "0.00",
    balanceDue: "0.00",
    realization: "0.00",
    lastPayment: "",
  },
  {
    id: 10,
    customer: "Sagor kumar",
    flatNo: "F 3",
    saleValue: "10925000.00",
    amountRealized: "122320.00",
    balanceDue: "10802680.00",
    realization: "1.12",
    lastPayment: "",
  },
];

/* ── Reusable Searchable Select ── */
function SearchableSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select value",
}: {
  label: string;
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
    <div ref={ref}>
      <label className="block text-[12px] text-ink-muted mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
            setQuery("");
          }}
          className="w-full flex items-center justify-between border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
        >
          <span className={value ? "text-ink" : "text-ink-faint"}>{value || placeholder}</span>
          <ChevronDown className="w-4 h-4 text-ink-faint shrink-0" />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-lg shadow-black/6 z-50 overflow-hidden">
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

export default function RealizationSummaryReportPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [customer, setCustomer] = useState("");
  const [flat, setFlat] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_ROWS.filter((r) => {
      const matchSearch =
        !q ||
        r.customer.toLowerCase().includes(q) ||
        r.flatNo.toLowerCase().includes(q) ||
        String(r.id).includes(q);
      const matchCustomer = !customer || r.customer === customer;
      const matchFlat = !flat || r.flatNo === flat;
      return matchSearch && matchCustomer && matchFlat;
    });
  }, [search, customer, flat]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / entries));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * entries;
  const pageRows = filtered.slice(start, start + entries);
  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(start + entries, total);

  const totals = useMemo(() => {
    let amountRealized = 0;
    let balanceDue = 0;
    let realization = 0;
    filtered.forEach((r) => {
      amountRealized += parseFloat(r.amountRealized.replace(/,/g, "")) || 0;
      balanceDue += parseFloat(r.balanceDue.replace(/,/g, "")) || 0;
      realization += parseFloat(r.realization) || 0;
    });
    return {
      amountRealized: amountRealized.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      balanceDue: balanceDue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      realization: realization.toFixed(2),
    };
  }, [filtered]);

  const goPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border px-5 py-2.5">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-ink-muted hover:text-ink cursor-pointer">Home</span>
          <span className="text-ink-faint mx-1">›</span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-1 text-ink-muted font-medium hover:text-ink"
            >
              Realization
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {showMenu && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-surface border border-border rounded-md shadow-lg shadow-black/6 z-50 py-1">
                {realizationMenu.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-4 py-2 text-[13px] text-ink-muted hover:bg-canvas hover:text-ink"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink font-medium">Realization Summary Report</span>
        </div>
      </div>

      <div className="p-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Select Date</label>
            <input
              type="text"
              defaultValue="1 September, 2026 - 30 September, 2026"
              className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Customer — searchable */}
          <SearchableSelect
            label="Customer"
            value={customer}
            onChange={(v) => {
              setCustomer(v);
              setPage(1);
            }}
            options={customerOptions}
          />

          {/* Flat — searchable */}
          <SearchableSelect
            label="Flat"
            value={flat}
            onChange={(v) => {
              setFlat(v);
              setPage(1);
            }}
            options={flatOptions}
          />
        </div>

        {/* Excel / PDF + Show + Search */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500 text-white text-[12px] font-medium hover:bg-emerald-600"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Excel
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-500 text-white text-[12px] font-medium hover:bg-rose-600"
            >
              <FileText className="w-3.5 h-3.5" />
              PDF
            </button>
            <div className="flex items-center gap-2 text-[13px] text-ink-muted ml-2">
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
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="bg-black text-white">
                  {[
                    "ID",
                    "CUSTOMER NAME",
                    "FLAT NO",
                    "SALE VALUE",
                    "AMOUNT REALIZED",
                    "BALANCE DUE",
                    "REALIZATION %",
                    "LAST PAYMENT DATE",
                  ].map((h) => (
                    <th key={h} className="px-2.5 py-2.5 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-2.5 py-10 text-center text-ink-faint">
                      No records found
                    </td>
                  </tr>
                ) : (
                  <>
                    {pageRows.map((row) => (
                      <tr key={row.id} className="border-b border-border hover:bg-canvas/70">
                        <td className="px-2.5 py-2.5 text-ink-muted">{row.id}</td>
                        <td className="px-2.5 py-2.5 text-ink">{row.customer}</td>
                        <td className="px-2.5 py-2.5 text-ink">{row.flatNo}</td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink">{row.saleValue}</td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink">
                          {row.amountRealized}
                        </td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink">{row.balanceDue}</td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink">{row.realization}</td>
                        <td className="px-2.5 py-2.5 text-ink-faint">{row.lastPayment || ""}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-border bg-canvas/50 font-medium">
                      <td className="px-2.5 py-2.5" colSpan={3}></td>
                      <td className="px-2.5 py-2.5 text-ink text-right">TOTAL:</td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink">
                        {totals.amountRealized}
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink">{totals.balanceDue}</td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink">{totals.realization}</td>
                      <td className="px-2.5 py-2.5"></td>
                    </tr>
                  </>
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
              {pageNumbers.map((p) => (
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
              ))}
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
