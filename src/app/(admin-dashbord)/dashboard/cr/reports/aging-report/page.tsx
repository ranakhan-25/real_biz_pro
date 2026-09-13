/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, FileText, FileSpreadsheet, Search } from "lucide-react";

const flatLandMenu = ["Flat/Land", "Flat/Land Sale", "Flat/Land Sale Payment"];

const companyOptions = ["Somikoron IT Ltd"];

const projectOptions = [
  "Head Office",
  "Lake Garden",
  "Estern 19",
  "Sheba Eyecon Tower",
  "Hena Heights",
  "Rifat Eyecon City",
];

const salesByOptions = ["Tazmul Reza", "Rifat Hosain", "Mohin Uddin"];

const teamOptions = ["Gladiators", "Team Warriors", "Go", "Diponkar Team"];

const ALL_ROWS = [
  {
    id: 1,
    customer: "",
    invoiceNo: "",
    invoiceDate: "",
    amount: "",
    d0_30: "964166.66",
    d31_60: "0",
    d61_90: "964166.66",
    d91_120: "964166.66",
    d120: "8677500.02",
    note: "",
  },
  {
    id: 2,
    customer: "Abul",
    invoiceNo: "Booking-1015817",
    invoiceDate: "2026-08-24",
    amount: "9680000",
    d0_30: "0",
    d31_60: "1066666.66",
    d61_90: "1066666.66",
    d91_120: "1066666.66",
    d120: "6400000.02",
    note: "",
  },
  {
    id: 3,
    customer: "Abc",
    invoiceNo: "Sale1750755",
    invoiceDate: "2026-08-24",
    amount: "15340000",
    d0_30: "277916.67",
    d31_60: "277916.67",
    d61_90: "277916.67",
    d91_120: "277916.67",
    d120: "12228333.479999999",
    note: "",
  },
  {
    id: 4,
    customer: "Mr. Raju raz",
    invoiceNo: "Booking-1468040",
    invoiceDate: "2026-08-30",
    amount: "84200000",
    d0_30: "28066666.66",
    d31_60: "28066666.66",
    d61_90: "28066666.68",
    d91_120: "0",
    d120: "0",
    note: "",
  },
  {
    id: 5,
    customer: "Sagor kumar",
    invoiceNo: "Booking-2902887",
    invoiceDate: "2026-09-07",
    amount: "11770000",
    d0_30: "964166.66",
    d31_60: "964166.66",
    d61_90: "964166.66",
    d91_120: "964166.66",
    d120: "771333.36",
    note: "",
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

export default function AgingReportPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [company, setCompany] = useState("");
  const [project, setProject] = useState("");
  const [site, setSite] = useState("");
  const [salesBy, setSalesBy] = useState("");
  const [team, setTeam] = useState("");
  const [date, setDate] = useState("10/09/2026");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_ROWS.filter((r) => {
      const matchSearch =
        !q ||
        r.customer.toLowerCase().includes(q) ||
        r.invoiceNo.toLowerCase().includes(q) ||
        String(r.id).includes(q);
      return matchSearch;
    });
  }, [search]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / entries));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * entries;
  const pageRows = filtered.slice(start, start + entries);
  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(start + entries, total);

  const grandTotal = useMemo(() => {
    let amount = 0,
      d0 = 0,
      d31 = 0,
      d61 = 0,
      d91 = 0,
      d120 = 0;
    filtered.forEach((r) => {
      amount += parseFloat(r.amount) || 0;
      d0 += parseFloat(r.d0_30) || 0;
      d31 += parseFloat(r.d31_60) || 0;
      d61 += parseFloat(r.d61_90) || 0;
      d91 += parseFloat(r.d91_120) || 0;
      d120 += parseFloat(r.d120) || 0;
    });
    const fmt = (n: number) =>
      n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return {
      amount: fmt(amount),
      d0: fmt(d0),
      d31: fmt(d31),
      d61: fmt(d61),
      d91: fmt(d91),
      d120: fmt(d120),
    };
  }, [filtered]);

  const goPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

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
              Flat/Land
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {showMenu && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-surface border border-border rounded-md shadow-lg shadow-black/6 z-50 py-1">
                {flatLandMenu.map((item) => (
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
          <span className="text-ink font-medium">Aging Report</span>
        </div>
      </div>

      <div className="p-4">
        {/* Filters Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Select Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <SearchableSelect
            label="Company"
            value={company}
            onChange={setCompany}
            options={companyOptions}
          />

          <SearchableSelect
            label="Project"
            value={project}
            onChange={setProject}
            options={projectOptions}
          />

          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Site</label>
            <input
              type="text"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="Select Site"
              className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <SearchableSelect
            label="Sales By"
            value={salesBy}
            onChange={setSalesBy}
            options={salesByOptions}
          />
        </div>

        {/* Filters Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          <SearchableSelect label="Team" value={team} onChange={setTeam} options={teamOptions} />
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
                    "CUSTOMER",
                    "INVOICE NO",
                    "INVOICE DATE",
                    "AMOUNT",
                    "0-30 DAYS",
                    "31-60 DAYS",
                    "61-90 DAYS",
                    "91-120 DAYS",
                    "120+ DAYS",
                    "NOTE",
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
                    <td colSpan={11} className="px-2.5 py-10 text-center text-ink-faint">
                      No records found
                    </td>
                  </tr>
                ) : (
                  <>
                    {pageRows.map((row) => (
                      <tr key={row.id} className="border-b border-border hover:bg-canvas/70">
                        <td className="px-2.5 py-2.5 text-ink-muted">{row.id}</td>
                        <td className="px-2.5 py-2.5 text-ink">{row.customer}</td>
                        <td className="px-2.5 py-2.5 text-ink">{row.invoiceNo}</td>
                        <td className="px-2.5 py-2.5 text-ink whitespace-nowrap">
                          {row.invoiceDate}
                        </td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                          {row.amount}
                        </td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                          {row.d0_30}
                        </td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                          {row.d31_60}
                        </td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                          {row.d61_90}
                        </td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                          {row.d91_120}
                        </td>
                        <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                          {row.d120}
                        </td>
                        <td className="px-2.5 py-2.5 text-ink-faint">{row.note}</td>
                      </tr>
                    ))}
                    {/* GRAND TOTAL */}
                    <tr className="border-t border-border bg-canvas/50 font-medium">
                      <td className="px-2.5 py-2.5" colSpan={3}></td>
                      <td className="px-2.5 py-2.5 text-ink text-right whitespace-nowrap">
                        GRAND TOTAL:
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                        {grandTotal.amount}
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                        {grandTotal.d0}
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                        {grandTotal.d31}
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                        {grandTotal.d61}
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                        {grandTotal.d91}
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink text-right">
                        {grandTotal.d120}
                      </td>
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
              <button
                type="button"
                className="min-w-[32px] px-2 py-1 rounded font-medium bg-black text-white"
              >
                {currentPage}
              </button>
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
