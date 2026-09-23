"use client";

// Path: app/report/project-wise-income-report/page.tsx
// Dependencies: next, react, tailwindcss, lucide-react

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, ChevronUp, ChevronsUpDown, X } from "lucide-react";

/* ----------------------------- Types & data ----------------------------- */

interface IncomeRow {
  id: number;
  company: string;
  project: string;
  salesContract: number;
  budget: number;
  totalIncome: number;
  totalExpense: number;
  available: number;
  profit: number;
  billSubmission: number;
  receiveAmount: number;
  due: number;
}

type ColumnKey = Exclude<keyof IncomeRow, "company">;

interface Column {
  key: ColumnKey;
  label: string;
  align: "left" | "center" | "right";
  format?: (n: number) => string;
  showTotal?: boolean;
}

const raw = (n: number) => String(n);
const fixed2 = (n: number) => n.toFixed(2);
const commaFixed2 = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const commaTotal = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });

const COLUMNS: Column[] = [
  { key: "id", label: "ID", align: "left" },
  { key: "project", label: "Project", align: "left" },
  { key: "salesContract", label: "Sales/Contract", align: "center", format: raw, showTotal: true },
  { key: "budget", label: "Budget", align: "center", format: raw }, // no total in the original design
  { key: "totalIncome", label: "Total Income", align: "center", format: fixed2, showTotal: true },
  { key: "totalExpense", label: "Total Expense", align: "center", format: fixed2, showTotal: true },
  { key: "available", label: "Available", align: "center", format: raw, showTotal: true },
  { key: "profit", label: "Profit", align: "center", format: commaFixed2, showTotal: true },
  { key: "billSubmission", label: "Bill Submission", align: "center", format: raw, showTotal: true },
  { key: "receiveAmount", label: "Receive Amount", align: "center", format: raw, showTotal: true },
  { key: "due", label: "Due", align: "center", format: raw, showTotal: true },
];

// TODO: replace with your API / server action
const COMPANY = "Somikoron IT Ltd";
const DATA: IncomeRow[] = [
  { id: 1, company: COMPANY, project: "Rifat Eyecon City", salesContract: 0, budget: 15000000, totalIncome: 0, totalExpense: 1176, available: 14998824, profit: -1176, billSubmission: 0, receiveAmount: 0, due: 0 },
  { id: 2, company: COMPANY, project: "Hena Heights", salesContract: 0, budget: 0, totalIncome: 0, totalExpense: 211, available: -211, profit: -211, billSubmission: 0, receiveAmount: 0, due: 0 },
  { id: 3, company: COMPANY, project: "Sheba Eyecon Tower", salesContract: 0, budget: 2000000, totalIncome: 0, totalExpense: 45000, available: 1955000, profit: -45000, billSubmission: 0, receiveAmount: 300000, due: -300000 },
  { id: 4, company: COMPANY, project: "Estern 19", salesContract: 358800, budget: 0, totalIncome: 153310, totalExpense: 82, available: -82, profit: 153228, billSubmission: 153310, receiveAmount: 0, due: 153310 },
  { id: 5, company: COMPANY, project: "Lake Garden", salesContract: 0, budget: 0, totalIncome: 136163000, totalExpense: 13850, available: -13850, profit: 136149150, billSubmission: 0, receiveAmount: 33217166.66, due: -33217166.66 },
  { id: 6, company: COMPANY, project: "Head Office", salesContract: 0, budget: 0, totalIncome: 0, totalExpense: 21340, available: -21340, profit: -21340, billSubmission: 0, receiveAmount: 0, due: 0 },
];

const PAGE_SIZES = [10, 25, 50, 100];

/* -------------------------------- Helpers ------------------------------- */

function cellText(row: IncomeRow, col: Column): string {
  const v = row[col.key];
  return typeof v === "number" && col.format ? col.format(v) : String(v);
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

const alignClass = { left: "text-left", center: "text-center", right: "text-right" } as const;

/* ------------------------------ Small parts ----------------------------- */

const inputBase =
  "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none transition focus:border-[#7367f0] focus:ring-2 focus:ring-[#7367f0]/20";

function SelectField({
  value,
  onChange,
  options,
  placeholder,
  clearable = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  clearable?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} appearance-none pr-14 ${value ? "" : "text-slate-500"}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
      {clearable && value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear"
          className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}

/* --------------------------------- Page --------------------------------- */

export default function ProjectWiseIncomeReportPage() {
  const [company, setCompany] = useState(COMPANY);
  const [project, setProject] = useState("");

  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: ColumnKey; dir: "asc" | "desc" } | null>({ key: "id", dir: "asc" });

  const companyOptions = useMemo(() => Array.from(new Set(DATA.map((r) => r.company))), []);
  const projectOptions = useMemo(
    () => DATA.filter((r) => !company || r.company === company).map((r) => r.project),
    [company]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = DATA.filter((r) => {
      if (company && r.company !== company) return false;
      if (project && r.project !== project) return false;
      if (q && !COLUMNS.some((c) => cellText(r, c).toLowerCase().includes(q))) return false;
      return true;
    });

    if (sort) {
      const { key, dir } = sort;
      rows.sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        const res =
          typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv), undefined, { numeric: true });
        return dir === "asc" ? res : -res;
      });
    }
    return rows;
  }, [company, project, search, sort]);

  // Totals are calculated over every filtered row, not just the visible page
  const totals = useMemo(() => {
    const sums: Partial<Record<ColumnKey, number>> = {};
    for (const c of COLUMNS) {
      if (c.showTotal) sums[c.key] = filtered.reduce((acc, r) => acc + (r[c.key] as number), 0);
    }
    return sums;
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  const toggleSort = (key: ColumnKey) =>
    setSort((s) => (s?.key === key ? (s.dir === "asc" ? { key, dir: "desc" } : null) : { key, dir: "asc" }));

  // Excel: CSV download (swap with a real .xlsx export, e.g. SheetJS, if needed)
  const exportExcel = () => {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const header = COLUMNS.map((c) => esc(c.label)).join(",");
    const body = filtered.map((r) => COLUMNS.map((c) => esc(cellText(r, c))).join(","));
    const totalRow = COLUMNS.map((c, i) =>
      i === 0 ? esc("TOTAL") : c.showTotal ? esc(commaTotal(totals[c.key] ?? 0)) : '""'
    ).join(",");
    const blob = new Blob([[header, ...body, totalRow].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-wise-income-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => window.print();

  return (
    <main className="min-h-screen bg-[#f7f7f9]">
      <section className="bg-white px-4 pb-8 pt-4 shadow-sm">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[13px]">
          <Link href="/" className="text-[#7367f0] hover:underline">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-500" />
          <button type="button" className="flex items-center gap-1 text-[#7367f0] hover:underline">
            Report <ChevronDown size={13} />
          </button>
          <ChevronRight size={14} className="text-slate-500" />
          <span className="text-slate-700">Project wise Income Report</span>
        </nav>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-slate-700">Company</label>
            <SelectField
              value={company}
              onChange={(v) => {
                setCompany(v);
                setProject("");
                setPage(1);
              }}
              options={companyOptions}
              placeholder="Select Company"
              clearable
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-slate-700">
              Project<span className="text-red-500">*</span>
            </label>
            <SelectField
              value={project}
              onChange={(v) => {
                setProject(v);
                setPage(1);
              }}
              options={projectOptions}
              placeholder="Select Project"
            />
          </div>
        </div>

        {/* Table controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13px] text-slate-700">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportExcel}
              className="h-7 rounded-md bg-green-700 px-4 text-xs font-bold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700/50"
            >
              Excel
            </button>
            <button
              type="button"
              onClick={exportPdf}
              className="h-7 rounded-md bg-red-500 px-4 text-xs font-bold text-white transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
            >
              PDF
            </button>

            <label className="ml-2 flex items-center gap-2">
              Show
              <span className="relative">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="h-7 w-[54px] appearance-none rounded-md border border-slate-200 bg-white pl-2.5 pr-6 text-xs outline-none focus:border-[#7367f0]"
                >
                  {PAGE_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
              </span>
              entries
            </label>
          </div>

          <label className="flex items-center gap-2">
            Search:
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-7 w-44 rounded-md border border-slate-200 bg-white px-2.5 text-[13px] outline-none focus:border-[#7367f0] focus:ring-2 focus:ring-[#7367f0]/20 sm:w-52"
            />
          </label>
        </div>

        {/* Table */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-[13px] text-slate-800">
            <thead>
              <tr className="bg-[#7367f0] text-white">
                {COLUMNS.map((c) => {
                  const active = sort?.key === c.key;
                  return (
                    <th
                      key={c.key}
                      scope="col"
                      aria-sort={active ? (sort!.dir === "asc" ? "ascending" : "descending") : "none"}
                      className="border border-slate-200/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wide"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort(c.key)}
                        className={`relative flex w-full items-center uppercase ${
                          c.align === "center" ? "justify-center px-4" : "justify-start pr-4"
                        }`}
                      >
                        {c.label}
                        <span className="absolute right-0">
                          {active ? (
                            sort!.dir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                          ) : (
                            <ChevronsUpDown size={12} className="opacity-50" />
                          )}
                        </span>
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="border border-slate-200 px-2 py-8 text-center text-slate-500">
                    No matching records found
                  </td>
                </tr>
              ) : (
                pageRows.map((r) => (
                  <tr key={r.id} className="transition hover:bg-slate-50">
                    {COLUMNS.map((c) => {
                      if (c.key === "id") {
                        return (
                          <td key={c.key} className="border border-slate-200 px-2 py-1 text-center">
                            {r.id}
                          </td>
                        );
                      }
                      if (c.key === "project") {
                        return (
                          <td key={c.key} className="border border-slate-200 px-2 py-1 text-center">
                            <Link href={`/projects/${r.id}`} className="text-[#7367f0] hover:underline">
                              {r.project}
                            </Link>
                          </td>
                        );
                      }
                      return (
                        <td key={c.key} className="whitespace-nowrap border border-slate-200 px-2 py-1 text-right tabular-nums">
                          {cellText(r, c)}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}

              {/* Total row */}
              <tr className="text-[11px] tracking-wider">
                <td colSpan={2} className="border border-slate-200 px-2 py-4 font-medium">
                  TOTAL
                </td>
                {COLUMNS.slice(2).map((c) => (
                  <td key={c.key} className="whitespace-nowrap border border-slate-200 px-2 py-4 text-center tabular-nums">
                    {c.showTotal ? commaTotal(totals[c.key] ?? 0) : ""}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400">
            {filtered.length === 0
              ? "Showing 0 to 0 of 0 entries"
              : `Showing ${start + 1} to ${start + pageRows.length} of ${filtered.length} entries`}
          </p>

          <div className="flex items-center gap-1.5 text-[13px]">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              className="h-8 rounded-md bg-slate-100 px-3 text-slate-500 transition enabled:hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Previous
            </button>
            {getPageNumbers(currentPage, totalPages).map((p, i) =>
              p === "…" ? (
                <span key={`gap-${i}`} className="px-1 text-slate-400">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  aria-current={p === currentPage ? "page" : undefined}
                  className={`h-8 min-w-8 rounded-md px-2.5 font-medium transition ${
                    p === currentPage ? "bg-[#7367f0] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
              className="h-8 rounded-md bg-slate-100 px-3 text-slate-500 transition enabled:hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}