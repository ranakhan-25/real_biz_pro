/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

const employeeOptions = [
  "Admin",
  "Tazmul Reza",
  "Rifat Hosain",
  "Mohin Uddin",
  "Sarna",
  "Rowza",
  "Masud Rana",
  "Rakib Hasan",
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const years = ["2024", "2025", "2026", "2027", "2028"];

const shiftOptions = ["Morning", "Evening", "Night", "Friday OFF", "General"];

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

function getDaysInMonth(monthName: string, year: number) {
  const monthIndex = months.indexOf(monthName);
  const daysCount = new Date(year, monthIndex + 1, 0).getDate();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const rows = [];
  for (let d = 1; d <= daysCount; d++) {
    const date = new Date(year, monthIndex, d);
    rows.push({
      date: `${String(d).padStart(2, "0")}/${String(monthIndex + 1).padStart(2, "0")}/${year}`,
      day: dayNames[date.getDay()],
      shift: "",
      from: "",
      to: "",
      active: true,
    });
  }
  return rows;
}

export default function ShiftRosterPage() {
  const [employee, setEmployee] = useState("");
  const [month, setMonth] = useState("September");
  const [year, setYear] = useState("2026");

  const initialRows = useMemo(
    () => getDaysInMonth(month, Number(year)),
    [month, year]
  );

  const [rows, setRows] = useState(initialRows);

  // regenerate rows when month/year changes
  useEffect(() => {
    setRows(getDaysInMonth(month, Number(year)));
  }, [month, year]);

  const updateRow = (index: number, field: string, value: string | boolean) => {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="p-4 space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <SearchableSelect
            label="Employee"
            value={employee}
            onChange={setEmployee}
            options={employeeOptions}
          />

          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="bg-black text-white">
                  {["DATE", "DAY", "SHIFT", "FROM", "TO", "ACTIVE"].map((h) => (
                    <th key={h} className="px-3 py-2.5 font-semibold whitespace-nowrap">
                      {h === "ACTIVE" ? (
                        <span className="flex items-center gap-1.5">
                          <input type="checkbox" className="accent-white" readOnly checked />
                          ACTIVE
                        </span>
                      ) : (
                        h
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={row.date} className="border-b border-border hover:bg-canvas/70">
                    <td className="px-3 py-2 text-ink-muted whitespace-nowrap">{row.date}</td>
                    <td className="px-3 py-2 text-ink">{row.day}</td>
                    <td className="px-3 py-2">
                      <select
                        value={row.shift}
                        onChange={(e) => updateRow(idx, "shift", e.target.value)}
                        className="border border-border rounded px-2 py-1 text-[12px] bg-surface text-ink w-full min-w-[120px]"
                      >
                        <option value="">Select</option>
                        {shiftOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="time"
                        value={row.from}
                        onChange={(e) => updateRow(idx, "from", e.target.value)}
                        className="border border-border rounded px-2 py-1 text-[12px] bg-surface text-ink w-full min-w-[100px]"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="time"
                        value={row.to}
                        onChange={(e) => updateRow(idx, "to", e.target.value)}
                        className="border border-border rounded px-2 py-1 text-[12px] bg-surface text-ink w-full min-w-[100px]"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={row.active}
                        onChange={(e) => updateRow(idx, "active", e.target.checked)}
                        className="w-4 h-4 accent-black"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            className="px-6 py-2 rounded-md bg-emerald-500 text-white text-[14px] font-medium hover:bg-emerald-600 shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}