/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  FileText,
  List,
  Phone,
  Upload,
  ChevronDown,
  Search,
} from "lucide-react";

const sectionOptions = [
  "Software Development",
  "Software Support",
  "Software Testing",
  "Store",
  "Customs",
  "Dop",
  "Chemical",
  "Mechanical",
  "Electrical",
  "Factory",
];

const departmentOptions = [
  "Business Development",
  "Sales & Marketing",
  "Store",
  "Customs",
  "Accounts",
  "Engineering",
  "HR",
  "IT",
];

const designationOptions = [
  "Jr Executive",
  "HOS",
  "Executive",
  "TL",
  "GL",
  "Co-Ordinator",
  "Manager",
  "Team Leader",
  "Tea Boy",
  "Software Engineer",
];

const shiftOptions = ["Masud Rana", "Rakib Hasan", "Friday OFF", "Morning", "Evening"];

const employeeTypeOptions = ["Employee", "Contract", "Intern", "Consultant"];

const ALL_ROWS = [
  {
    id: 1,
    image: null,
    code: "12",
    name: "Mohin Uddin",
    department: "Customs",
    designation: "Tea Boy",
    joiningDate: "30 Jul 2026",
    status: "Active",
    salaryGrade: "",
    grossSalary: "0",
    cv: "",
    under: "Employee",
  },
  {
    id: 2,
    image: null,
    code: "03",
    name: "Rifat Hosain",
    department: "Engineering",
    designation: "Software Engineer",
    joiningDate: "01 Feb 2026",
    status: "Active",
    salaryGrade: "Grade 1",
    grossSalary: "22000",
    cv: "",
    under: "Employee",
  },
  {
    id: 3,
    image: "/placeholder-avatar.png",
    code: "02",
    name: "Tazmul Reza",
    department: "Engineering",
    designation: "Executive",
    joiningDate: "01 Jul 2024",
    status: "Active",
    salaryGrade: "",
    grossSalary: "22000",
    cv: "",
    under: "Employee",
  },
];

/* ── Searchable Select ── */
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
          <span className={value ? "text-ink" : "text-ink-faint"}>
            {value || placeholder}
          </span>
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

export default function EmployeeListPage() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [shift, setShift] = useState("");
  const [employeeType, setEmployeeType] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_ROWS.filter((r) => {
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.code.includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.designation.toLowerCase().includes(q);
      const matchDept = !department || r.department === department;
      const matchDesig = !designation || r.designation === designation;
      return matchSearch && matchDept && matchDesig;
    });
  }, [search, department, designation]);

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
      {/* Breadcrumb + buttons */}
      <div className="bg-surface border-b border-border px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-ink-muted hover:text-ink cursor-pointer">Home</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink-muted">Employee</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink font-medium">Employee List</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-black text-white text-[13px] font-medium hover:bg-slate-800 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Employee Add
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-emerald-500 text-white text-[13px] font-medium hover:bg-emerald-600 shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            Employee Import
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          <SearchableSelect
            label="Section"
            value={section}
            onChange={setSection}
            options={sectionOptions}
            placeholder="Select Section"
          />
          <SearchableSelect
            label="Department"
            value={department}
            onChange={(v) => {
              setDepartment(v);
              setPage(1);
            }}
            options={departmentOptions}
            placeholder="Select Department"
          />
          <SearchableSelect
            label="Designation"
            value={designation}
            onChange={(v) => {
              setDesignation(v);
              setPage(1);
            }}
            options={designationOptions}
            placeholder="Select Designation"
          />
          <SearchableSelect
            label="Shift"
            value={shift}
            onChange={setShift}
            options={shiftOptions}
            placeholder="Select Shift"
          />
          <SearchableSelect
            label="Employee Type"
            value={employeeType}
            onChange={setEmployeeType}
            options={employeeTypeOptions}
            placeholder="Select Employee Type"
          />
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
                    "SL",
                    "IMAGE",
                    "EMPLOYEE CODE",
                    "NAME",
                    "DEPARTMENT",
                    "DESIGNATION",
                    "JOINING DATE",
                    "STATUS",
                    "SALARY GRADE",
                    "GROSS SALARY",
                    "CV",
                    "UNDER",
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
                    <td colSpan={13} className="px-2.5 py-10 text-center text-ink-faint">
                      No records found
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row) => (
                    <tr key={row.id} className="border-b border-border hover:bg-canvas/70">
                      <td className="px-2.5 py-2 text-ink-muted">{row.id}</td>
                      <td className="px-2.5 py-2">
                        {row.image ? (
                          <div className="w-9 h-9 rounded bg-canvas border border-border overflow-hidden">
                            <div className="w-full h-full bg-ink-faint/20 flex items-center justify-center text-[10px] text-ink-faint">
                              IMG
                            </div>
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded bg-canvas border border-border" />
                        )}
                      </td>
                      <td className="px-2.5 py-2 text-ink tabular-nums">{row.code}</td>
                      <td className="px-2.5 py-2 text-ink font-medium whitespace-nowrap">{row.name}</td>
                      <td className="px-2.5 py-2 text-ink whitespace-nowrap">{row.department}</td>
                      <td className="px-2.5 py-2 text-ink whitespace-nowrap">{row.designation}</td>
                      <td className="px-2.5 py-2 text-ink whitespace-nowrap">{row.joiningDate}</td>
                      <td className="px-2.5 py-2">
                        <span className="text-emerald-600 font-medium">{row.status}</span>
                      </td>
                      <td className="px-2.5 py-2 text-ink">{row.salaryGrade}</td>
                      <td className="px-2.5 py-2 text-ink tabular-nums">{row.grossSalary}</td>
                      <td className="px-2.5 py-2 text-ink-faint">{row.cv}</td>
                      <td className="px-2.5 py-2 text-ink">{row.under}</td>
                      <td className="px-2.5 py-2">
                        <div className="flex items-center gap-1">
                          <button type="button" className="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600" title="View">
                            <Eye className="w-3 h-3" />
                          </button>
                          <button type="button" className="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600" title="Documents">
                            <FileText className="w-3 h-3" />
                          </button>
                          <button type="button" className="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600" title="Details">
                            <List className="w-3 h-3" />
                          </button>
                          <button type="button" className="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600" title="Call">
                            <Phone className="w-3 h-3" />
                          </button>
                          <button type="button" className="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600" title="Edit">
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button type="button" className="w-6 h-6 rounded bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600" title="Delete">
                            <Trash2 className="w-3 h-3" />
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