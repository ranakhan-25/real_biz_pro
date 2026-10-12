/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { CheckCircle2, Phone, Trash2, ChevronDown, Search } from "lucide-react";

const flatLandMenu = ["Flat/Land", "Flat/Land Sale", "Flat/Land Sale Payment"];

const projectOptions = [
  "Head Office",
  "Lake Garden",
  "Estern 19",
  "Sheba Eyecon Tower",
  "Hena Heights",
  "Rifat Eyecon City",
];

const ALL_ROWS = [
  {
    id: 1,
    project: "Sheba Eyecon Tower",
    flatLand: "F 3",
    customer: "Sagor kumar",
    totalValue: "10925000",
    paid: "122320",
    due: "10802680",
    installmentDate: "2026-09-03",
    installmentAmount: "10802680",
    installmentDue: "10802680",
    salesBy: "",
    daysOverdue: "7",
    delayAmount: "0",
    nextDueDate: "",
  },
];

export default function OverdueInstallmentListPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  // Project searchable dropdown
  const [project, setProject] = useState("");
  const [projectOpen, setProjectOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const projectRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    const q = projectSearch.trim().toLowerCase();
    if (!q) return projectOptions;
    return projectOptions.filter((p) => p.toLowerCase().includes(q));
  }, [projectSearch]);

  // Close project dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (projectRef.current && !projectRef.current.contains(e.target as Node)) {
        setProjectOpen(false);
        setProjectSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_ROWS.filter((r) => {
      const matchSearch =
        !q ||
        r.project.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.flatLand.toLowerCase().includes(q) ||
        String(r.id).includes(q);
      const matchProject = !project || r.project === project;
      return matchSearch && matchProject;
    });
  }, [search, project]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / entries));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * entries;
  const pageRows = filtered.slice(start, start + entries);
  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(start + entries, total);

  const goPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border px-5 py-2.5">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-ink-muted hover:text-ink cursor-pointer">Home</span>
          <span className="text-ink-faint mx-1">›</span>

          {/* Flat/Land Dropdown */}
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
          <span className="text-ink font-medium">Overdue Installment list</span>
        </div>
      </div>

      <div className="p-4">
        {/* Project Searchable Dropdown */}
        <div className="mb-4 max-w-md" ref={projectRef}>
          <label className="block text-[12px] text-ink-muted mb-1">Project</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProjectOpen(!projectOpen);
                setProjectSearch("");
              }}
              className="w-full flex items-center justify-between border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
            >
              <span className={project ? "text-ink" : "text-ink-faint"}>
                {project || "Select value"}
              </span>
              <ChevronDown className="w-4 h-4 text-ink-faint shrink-0" />
            </button>

            {projectOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-lg shadow-black/6 z-50 overflow-hidden">
                {/* Search input inside dropdown */}
                <div className="p-2 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-faint" />
                    <input
                      type="text"
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      placeholder="Search..."
                      autoFocus
                      className="w-full pl-8 pr-2.5 py-1.5 border border-border rounded-md text-[13px] bg-canvas text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto py-1">
                  {filteredProjects.length === 0 ? (
                    <p className="px-3 py-2 text-[13px] text-ink-faint">No results</p>
                  ) : (
                    filteredProjects.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setProject(p);
                          setProjectOpen(false);
                          setProjectSearch("");
                          setPage(1);
                        }}
                        className={`w-full text-left px-3 py-2 text-[13px] hover:bg-canvas ${
                          project === p ? "bg-canvas text-ink font-medium" : "text-ink-muted"
                        }`}
                      >
                        {p}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Show + Search */}
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
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="bg-black text-white">
                  {[
                    "ID",
                    "PROJECT",
                    "FLAT/LAND",
                    "CUSTOMER NAME",
                    "TOTAL VALUE",
                    "PAID",
                    "DUE",
                    "INSTALLMENT DATE",
                    "INSTALLMENT AMOUNT",
                    "INSTALLMENT DUE",
                    "SALES BY",
                    "DAYS OVERDUE",
                    "DELAY AMOUNT",
                    "NEXT DUE DATE",
                    "ACTION",
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
                    <td colSpan={15} className="px-2.5 py-10 text-center text-ink-faint">
                      No records found
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row) => (
                    <tr key={row.id} className="border-b border-border hover:bg-canvas/70">
                      <td className="px-2.5 py-2.5 text-ink-muted">{row.id}</td>
                      <td className="px-2.5 py-2.5 font-medium text-ink whitespace-nowrap">
                        {row.project}
                      </td>
                      <td className="px-2.5 py-2.5 text-ink">{row.flatLand}</td>
                      <td className="px-2.5 py-2.5 text-ink">{row.customer}</td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink">{row.totalValue}</td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink">{row.paid}</td>
                      <td className="px-2.5 py-2.5 tabular-nums font-medium text-rose-500">
                        {row.due}
                      </td>
                      <td className="px-2.5 py-2.5 text-ink whitespace-nowrap">
                        {row.installmentDate}
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink">
                        {row.installmentAmount}
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink">{row.installmentDue}</td>
                      <td className="px-2.5 py-2.5 text-ink-faint">{row.salesBy || ""}</td>
                      <td className="px-2.5 py-2.5 text-center text-ink">{row.daysOverdue}</td>
                      <td className="px-2.5 py-2.5 tabular-nums text-ink">{row.delayAmount}</td>
                      <td className="px-2.5 py-2.5 text-ink-faint">{row.nextDueDate || ""}</td>
                      <td className="px-2.5 py-2.5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center hover:bg-slate-800"
                            title="Approve"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center hover:bg-slate-800"
                            title="Call"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            className="w-7 h-7 rounded-md bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600"
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
