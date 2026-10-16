/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  Check,
  Loader2,
  ChevronDown,
} from "lucide-react";

// ============================================================
// API
// ============================================================
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5002";

async function handleRes(res: Response, action: string) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      json?.message || json?.error || `Failed to ${action} (${res.status})`;
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return json;
}

// ============================================================
// Small helper components
// ============================================================

// Searchable employee dropdown (used in all modals except Loan)
function EmployeeSelect({
  employees,
  value,
  onChange,
  placeholder = "",
}: {
  employees: { uuid: string; name: string; code?: string }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  const selected = employees.find((e) => e.uuid === value);
  const display = selected
    ? selected.code
      ? `${selected.code} - ${selected.name}`
      : selected.name
    : "";

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        (e.code || "").toLowerCase().includes(q),
    );
  }, [employees, query]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-left text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none flex items-center justify-between"
      >
        <span className={display ? "text-slate-800" : "text-slate-400"}>
          {display || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-2.5 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <button
                  key={opt.uuid}
                  type="button"
                  onClick={() => {
                    onChange(opt.uuid);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    value === opt.uuid
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {opt.code ? `${opt.code} - ${opt.name}` : opt.name}
                </button>
              ))
            ) : (
              <div className="px-3 py-3 text-xs text-slate-400 text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Native select with proper styling
function NativeSelect({
  options,
  value,
  onChange,
  placeholder = "Select One Option",
  required,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <select
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ============================================================
// GENERIC SECTION COMPONENT — every salary section uses this
// ============================================================
interface SectionColumn {
  key: string;
  label: string;
  format?: "date" | "currency";
  lookup?: "employeeCode";
}

interface SectionModalField {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "employee";
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  fullWidth?: boolean;
}

interface SalarySectionConfig {
  id: string;
  title: string;
  apiPath: string;
  addLabel: string;
  modalTitle: string;
  columns: SectionColumn[];
  fields: SectionModalField[];
  hasEmployee: boolean; // whether section needs employeeId
}

function SalarySection({
  config,
  employees,
  isLastLeft, // just to help styling if needed
}: {
  config: SalarySectionConfig;
  employees: { uuid: string; name: string; code?: string }[];
  isLastLeft?: boolean;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_BASE}/realbizpro/api/v1/${config.apiPath}?page=1&limit=100&skip=0&sortBy=createdAt&sortOrder=DESC&withDeleted=false`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      const json = await handleRes(res, `fetch ${config.apiPath}`);
      const list = json?.data?.data || [];
      setItems(list);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Enrich each row with resolved employeeCode
  const enriched = useMemo(() => {
    return items.map((it) => {
      const emp = employees.find((e) => e.uuid === it.employeeId);
      return {
        ...it,
        employeeCode: it.employeeCode || emp?.code || "",
        employeeName: it.employeeName || emp?.name || "",
      };
    });
  }, [items, employees]);

  const filtered = enriched.filter((it) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return config.columns.some((c) =>
      String(it[c.key] ?? "")
        .toLowerCase()
        .includes(q),
    );
  });

  const totalPages = Math.ceil(filtered.length / entriesPerPage) || 1;
  const startIndex = (page - 1) * entriesPerPage;
  const pageData = filtered.slice(startIndex, startIndex + entriesPerPage);

  const handleDelete = async (item: any) => {
    if (!confirm(`Delete this ${config.title} record?`)) return;
    const uuid = item.uuid || String(item.id);
    if (!uuid) return;
    try {
      setActionLoading(true);
      const res = await fetch(
        `${API_BASE}/realbizpro/api/v1/${config.apiPath}/${uuid}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );
      await handleRes(res, "delete");
      setItems((prev) =>
        prev.filter((i) => (i.uuid || String(i.id)) !== uuid),
      );
      if (pageData.length === 1 && page > 1) setPage((p) => p - 1);
    } catch (err: any) {
      alert(err?.message || "Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ---------- Form Modal ----------
  function FormModal({
    initialData,
    onClose,
    onSubmit,
  }: {
    initialData?: any;
    onClose: () => void;
    onSubmit: (vals: Record<string, any>) => Promise<void>;
  }) {
    const [values, setValues] = useState<Record<string, any>>(() => {
      const init: Record<string, any> = {};
      config.fields.forEach((f) => {
        init[f.key] = initialData?.[f.key] ?? "";
      });
      return init;
    });
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
      e.preventDefault();
      for (const f of config.fields) {
        if (f.required && !values[f.key]) {
          setFormError(`${f.label} is required`);
          return;
        }
      }
      setSubmitting(true);
      setFormError(null);
      try {
        await onSubmit(values);
      } catch (err: any) {
        setFormError(err?.message || "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
        <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">
              {config.modalTitle}
            </h3>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-800 border border-slate-300 hover:bg-slate-100 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={submit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {config.fields.map((f) => {
                const v = values[f.key] ?? "";
                const span = f.fullWidth ? "sm:col-span-2" : "";

                return (
                  <div key={f.key} className={span}>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {f.label}{" "}
                      {f.required && (
                        <span className="text-rose-500">*</span>
                      )}
                    </label>

                    {f.type === "text" && (
                      <input
                        type="text"
                        value={v}
                        placeholder={f.placeholder}
                        onChange={(e) =>
                          setValues({ ...values, [f.key]: e.target.value })
                        }
                        className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    )}

                    {f.type === "number" && (
                      <input
                        type="number"
                        step="0.01"
                        value={v}
                        placeholder={f.placeholder}
                        onChange={(e) =>
                          setValues({ ...values, [f.key]: e.target.value })
                        }
                        className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    )}

                    {f.type === "date" && (
                      <input
                        type="date"
                        value={v}
                        onChange={(e) =>
                          setValues({ ...values, [f.key]: e.target.value })
                        }
                        className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    )}

                    {f.type === "select" && (
                      <NativeSelect
                        options={f.options || []}
                        value={v}
                        onChange={(nv) =>
                          setValues({ ...values, [f.key]: nv })
                        }
                        placeholder="Select One Option"
                        required={f.required}
                      />
                    )}

                    {f.type === "employee" && (
                      <EmployeeSelect
                        employees={employees}
                        value={v}
                        onChange={(nv) =>
                          setValues({ ...values, [f.key]: nv })
                        }
                        placeholder=""
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {formError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-lg text-xs">
                {formError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="px-5 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-1.5"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ---------- Save ----------
  const handleSave = async (
    values: Record<string, any>,
    uuid?: string,
  ) => {
    const payload: Record<string, any> = {};
    config.fields.forEach((f) => {
      const val = values[f.key];
      if (val === "" || val === undefined || val === null) return;
      payload[f.key] = f.type === "number" ? Number(val) || 0 : val;
    });

    const url = uuid
      ? `${API_BASE}/realbizpro/api/v1/${config.apiPath}/${uuid}`
      : `${API_BASE}/realbizpro/api/v1/${config.apiPath}`;
    const method = uuid ? "PATCH" : "POST";

    console.log(`${method} → ${url}`, payload);
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await handleRes(res, uuid ? "update" : "create");
    console.log(`${method} response →`, json);
  };

  return (
    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">
          {config.title}
        </h3>
        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          {config.addLabel}
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 px-4 pb-2">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border border-slate-300 rounded px-1.5 py-0.5 text-xs bg-white focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600">Search:</span>
          <div className="relative">
            <Search className="absolute left-2 top-1.5 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-7 pr-2 py-1 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 w-40"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-10 text-slate-500 text-xs">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Loading...
        </div>
      ) : error ? (
        <div className="bg-rose-50 text-rose-700 px-4 py-3 text-xs m-4 rounded">
          {error}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto border-t border-slate-100">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-indigo-500 text-white font-medium text-[10px] tracking-wider uppercase">
                  <th className="py-2 px-3 w-10">SL</th>
                  {config.columns.map((c) => (
                    <th key={c.key} className="py-2 px-3 whitespace-nowrap">
                      {c.label}
                    </th>
                  ))}
                  <th className="py-2 px-3 text-center w-20">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pageData.length > 0 ? (
                  pageData.map((item, idx) => (
                    <tr
                      key={item.uuid || item.id}
                      className="hover:bg-slate-50/80"
                    >
                      <td className="py-2 px-3 text-slate-600 font-medium">
                        {startIndex + idx + 1}
                      </td>
                      {config.columns.map((c) => {
                        let v = item[c.key];
                        if (c.format === "date" && v) {
                          const d = new Date(
                            String(v) + (String(v).length === 10 ? "T00:00:00" : ""),
                          );
                          if (!isNaN(d.getTime())) {
                            v = `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString(
                              "en-US",
                              { month: "short" },
                            )} ${d.getFullYear()}`;
                          }
                        } else if (c.format === "currency" && v !== undefined) {
                          const n = Number(v);
                          v = isNaN(n) ? v : n.toLocaleString();
                        }
                        return (
                          <td
                            key={c.key}
                            className="py-2 px-3 text-slate-700 whitespace-nowrap"
                          >
                            {v ?? ""}
                          </td>
                        );
                      })}
                      <td className="py-2 px-3 text-center">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => setEditing(item)}
                            className="p-1 bg-cyan-400 hover:bg-cyan-500 text-white rounded"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            disabled={actionLoading}
                            className="p-1 bg-rose-500 hover:bg-rose-600 text-white rounded disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={config.columns.length + 2}
                      className="text-center py-8 text-slate-400"
                    >
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex items-center justify-between gap-2 px-4 py-2 border-t border-slate-100 text-[11px] text-slate-500">
            <div>
              Showing {filtered.length > 0 ? startIndex + 1 : 0} to{" "}
              {Math.min(startIndex + entriesPerPage, filtered.length)} of{" "}
              {filtered.length} entries
            </div>
            <div className="inline-flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={`px-2 py-0.5 rounded border border-slate-200 ${
                  page === 1
                    ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                    : "hover:bg-slate-50"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(0, 5)
                .map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`px-2 py-0.5 rounded ${
                      page === pg
                        ? "bg-indigo-600 text-white"
                        : "border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {pg}
                  </button>
                ))}
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages || totalPages === 0}
                className={`px-2 py-0.5 rounded border border-slate-200 ${
                  page === totalPages || totalPages === 0
                    ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                    : "hover:bg-slate-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <FormModal
          onClose={() => setIsAddOpen(false)}
          onSubmit={async (vals) => {
            await handleSave(vals);
            setIsAddOpen(false);
            await loadData();
          }}
        />
      )}

      {/* Edit Modal */}
      {editing && (
        <FormModal
          initialData={editing}
          onClose={() => setEditing(null)}
          onSubmit={async (vals) => {
            if (!editing.uuid) throw new Error("UUID is missing");
            await handleSave(vals, editing.uuid);
            setEditing(null);
            await loadData();
          }}
        />
      )}
    </div>
  );
}

// ============================================================
// 6 SECTION CONFIGS — exact from screenshots
// ============================================================
const SECTIONS: SalarySectionConfig[] = [
  // ---------- 1. Set Salary ----------
  {
    id: "employee-salary",
    title: "Set Salary",
    apiPath: "employee-salary",
    addLabel: "Add",
    modalTitle: "Set Salary Add",
    hasEmployee: true,
    columns: [
      { key: "employeeCode", label: "Employee ID" },
      { key: "basicSalary", label: "Basic Salary" },
    ],
    fields: [
      { key: "employeeId", label: "Employee", type: "employee", required: true, fullWidth: true },
      { key: "basicSalary", label: "Basic salary", type: "number", required: true, placeholder: "0", fullWidth: true },
    ],
  },

  // ---------- 2. Allowance ----------
  {
    id: "allowance",
    title: "Allowance",
    apiPath: "allowance",
    addLabel: "Add",
    modalTitle: "Allowance Add",
    hasEmployee: true,
    columns: [
      { key: "employeeCode", label: "Employee ID" },
      { key: "purpose", label: "Purpose" },
      { key: "type", label: "Type" },
      { key: "paymentType", label: "Payment Type" },
      { key: "percentage", label: "Percentage %" },
      { key: "amount", label: "Amount" },
    ],
    fields: [
      { key: "employeeId", label: "Employee", type: "employee", required: true, fullWidth: true },
      { key: "purpose", label: "Purpose", type: "text", placeholder: "Enter Purpose", required: true },
      {
        key: "type", label: "Type", type: "select", required: true,
        options: [
          { label: "Fixed", value: "fixed" },
          { label: "Percentage", value: "percentage" },
        ],
      },
      {
        key: "paymentType", label: "Payment Type", type: "select", required: true,
        options: [
          { label: "Monthly", value: "monthly" },
          { label: "Daily", value: "daily" },
          { label: "Hourly", value: "hourly" },
        ],
      },
      { key: "percentage", label: "Percentage %", type: "number", placeholder: "Enter Percentage" },
      { key: "amount", label: "Amount", type: "number", placeholder: "Enter Amount", fullWidth: true },
    ],
  },

  // ---------- 3. Commission ----------
  {
    id: "commission",
    title: "Commission",
    apiPath: "commission",
    addLabel: "Add",
    modalTitle: "Commission Add",
    hasEmployee: true,
    columns: [
      { key: "employeeCode", label: "Employee ID" },
      { key: "title", label: "Title" },
      { key: "type", label: "Type" },
      { key: "commissionType", label: "Commission Type" },
      { key: "value", label: "Value" },
      { key: "amount", label: "Amount" },
    ],
    fields: [
      { key: "employeeId", label: "Employee", type: "employee", required: true, fullWidth: true },
      { key: "type", label: "Type", type: "text", placeholder: "Type", required: true },
      { key: "commissionType", label: "Commission Type", type: "text", placeholder: "Type", required: true },
      { key: "title", label: "Title", type: "text", placeholder: "Enter Title" },
      { key: "value", label: "Value", type: "number", placeholder: "Enter Value" },
      { key: "amount", label: "Amount", type: "number", placeholder: "Enter Amount", fullWidth: true },
    ],
  },

  // ---------- 4. Loan ----------
  {
    id: "loan",
    title: "Loan",
    apiPath: "loan",
    addLabel: "Add",
    modalTitle: "Loan Add",
    hasEmployee: true,
    columns: [
      { key: "type", label: "Type" },
      { key: "amount", label: "Amount" },
      { key: "startDate", label: "Start", format: "date" },
      { key: "endDate", label: "End", format: "date" },
    ],
    fields: [
      { key: "employeeId", label: "Employee", type: "employee", required: true, fullWidth: true },
      { key: "type", label: "Type", type: "text", placeholder: "Type", required: true },
      { key: "amount", label: "Amount", type: "number", placeholder: "Enter Amount", required: true },
      { key: "startDate", label: "Start Date", type: "date", required: true },
      { key: "endDate", label: "End Date", type: "date", required: true },
    ],
  },

  // ---------- 5. Saturation Deduction ----------
  {
    id: "saturation-deduction",
    title: "Saturation Deduction",
    apiPath: "saturation-deduction",
    addLabel: "Add",
    modalTitle: "Saturation Deduction Add",
    hasEmployee: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "amount", label: "Amount" },
    ],
    fields: [
      { key: "employeeId", label: "Employee", type: "employee", required: true, fullWidth: true },
      { key: "title", label: "Title", type: "text", placeholder: "Enter Title", required: true },
      { key: "amount", label: "Amount", type: "number", placeholder: "Enter Amount", required: true },
      {
        key: "paymentType", label: "Payment Type", type: "select", required: true,
        options: [
          { label: "Monthly", value: "monthly" },
          { label: "Daily", value: "daily" },
          { label: "Hourly", value: "hourly" },
        ],
        fullWidth: true,
      },
    ],
  },

  // ---------- 6. Overtime ----------
  {
    id: "overtime",
    title: "Overtime",
    apiPath: "overtime",
    addLabel: "Overtime Add",
    modalTitle: "Overtime Add",
    hasEmployee: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "type", label: "Type" },
      { key: "amount", label: "Amount" },
    ],
    fields: [
      { key: "employeeId", label: "Employee", type: "employee", required: true, fullWidth: true },
      { key: "title", label: "Title", type: "text", placeholder: "Title", required: true },
      { key: "type", label: "Type", type: "text", placeholder: "Type", required: true },
      { key: "amount", label: "Amount", type: "number", placeholder: "Enter Amount", required: true, fullWidth: true },
    ],
  },
];

// ============================================================
// MAIN PAGE — 2-column grid of 6 sections
// ============================================================
export default function SalaryStructurePage() {
  const [employees, setEmployees] = useState<
    { uuid: string; name: string; code?: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const url = `${API_BASE}/realbizpro/api/v1/employee-list?page=1&limit=100&status=active&sortBy=createdAt&sortOrder=DESC&withDeleted=false`;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) return;
        const list = json?.data?.data || [];
        setEmployees(
          list.map((e: any) => ({
            uuid: e.uuid,
            name: e.name || e.employeeCode || "Unnamed",
            code: e.employeeCode || e.code,
          })),
        );
      } catch (err) {
        console.error("employees load error", err);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Breadcrumb */}
        <div>
          <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
            <span>Home</span> / <span>Employee</span> /{" "}
            <span className="text-indigo-600 font-medium">
              Salary Structure
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Salary Structure
          </h1>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {SECTIONS.map((s) => (
            <SalarySection
              key={s.id}
              config={s}
              employees={employees}
            />
          ))}
        </div>
      </div>
    </div>
  );
}