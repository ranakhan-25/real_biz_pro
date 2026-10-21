/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Check, Search } from "lucide-react";
import toast from "react-hot-toast";

// ---------- Types ----------
export interface Reconciliation {
  id: string | number;
  uuid: string;
  employeeId: string;
  employeeName: string;
  date: string;
  lateMinutes: number;
  requestType: string;
  reason: string;
  attachment?: string;
  status: string;
  approvedBy?: string;
  isApproved: boolean;
}

export interface Employee {
  uuid: string;
  name: string;
}

// ---------- API helpers ----------
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

async function handleRes(res: Response, action: string) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.message || json?.error || `Failed to ${action} (${res.status})`;
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return json;
}

// ১. Reconciliation লিস্ট ফেচ
async function fetchReconciliations(): Promise<any[]> {
  const url = `${API_BASE}/realbizpro/api/v1/attendance-reconciliation?page=1&limit=100&withDeleted=false`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch reconciliations");
  return json?.data?.data || json?.data || [];
}

// ২. Employee লিস্ট ফেচ
async function fetchEmployees(): Promise<Employee[]> {
  const url = `${API_BASE}/realbizpro/api/v1/employee-list?page=1&limit=100&withDeleted=false`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch employees");

  return (json?.data?.data || json?.data || []).map((e: any) => ({
    uuid: e.uuid,
    name: e.name || "Unknown",
  }));
}

// ৩. Reconciliation তৈরি
async function createReconciliation(payload: any) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/attendance-reconciliation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await handleRes(res, "create reconciliation");
}

// ৪. Reconciliation আপডেট
async function updateReconciliation(uuid: string, payload: any) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/attendance-reconciliation/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await handleRes(res, "update reconciliation");
}

// ৫. Reconciliation ডিলিট
async function softDeleteReconciliation(uuid: string) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/attendance-reconciliation/${uuid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return await handleRes(res, "delete reconciliation");
}

// ডেট ফরম্যাটার (YYYY-MM-DD কে DD MMM YYYY তে)
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

// ---------- Form Modal ----------
function ReconciliationModal({
  title,
  initialData,
  employees,
  onClose,
  onSubmit,
}: {
  title: string;
  initialData?: Reconciliation;
  employees: Employee[];
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    employeeId: initialData?.employeeId || "",
    date: initialData?.date || "",
    lateMinutes: initialData?.lateMinutes ? String(initialData.lateMinutes) : "0",
    requestType: initialData?.requestType || "",
    reason: initialData?.reason || "",
  });

  // ফাইল আপলোডের জন্য স্টেট (বেসিক ফাংশনালিটি)
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const requestTypes = [
    "Ignore Late",
    "Adjust With Leave",
    "Half Day to Full Day",
    "Manual Attendance Request",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeId) return setFormError("Employee is required");
    if (!formData.date) return setFormError("Date is required");
    if (!formData.requestType) return setFormError("Request Type is required");

    setSubmitting(true);
    setFormError(null);
    try {
      await onSubmit({
        employeeId: formData.employeeId,
        date: formData.date,
        lateMinutes: Number(formData.lateMinutes) || 0,
        requestType: formData.requestType,
        reason: formData.reason,
        attachment: file ? file.name : undefined, // মক আপলোড
      });
    } catch (err: any) {
      setFormError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-surface rounded-lg shadow-xl w-full max-w-2xl mx-4 border border-border flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded flex items-center justify-center text-ink-muted hover:bg-canvas hover:text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 flex flex-col">
          <div className="px-5 py-4 space-y-4 flex-1">
            
            {/* Employee & Date Row */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-[12px] text-ink-muted mb-1">
                  Employee<span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Select One Option</option>
                  {employees.map((emp) => (
                    <option key={emp.uuid} value={emp.uuid}>{emp.name}</option>
                  ))}
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-[12px] text-ink-muted mb-1">
                  Date<span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Late Minutes */}
            <div className="w-1/2">
              <label className="block text-[12px] text-ink-muted mb-1">Late Minutes</label>
              <input
                type="number"
                value={formData.lateMinutes}
                onChange={(e) => setFormData({ ...formData, lateMinutes: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Request Type */}
            <div>
              <label className="block text-[12px] text-ink-muted mb-1">
                Request Type<span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.requestType}
                onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Select value</option>
                {requestTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-[12px] text-ink-muted mb-1">Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Write valid reason..."
                rows={3}
                className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
              ></textarea>
            </div>

            {/* Attachment (Optional) */}
            <div>
              <label className="block text-[12px] text-ink-muted mb-1">Attachment (Optional)</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full border border-border rounded-md text-[13px] bg-surface text-ink focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="text-[11px] text-ink-faint mt-1">Upload PDF / Image</p>
            </div>

            {formError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-md text-[13px]">
                {formError}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-border bg-surface rounded-b-lg mt-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-1.5 rounded-md border border-border text-[13px] text-ink-muted hover:bg-canvas disabled:opacity-50 transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-1.5 rounded-md bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Main Page ----------
export default function AttendanceReconciliationPage() {
  const [dataList, setDataList] = useState<Reconciliation[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Reconciliation | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [recRes, empRes] = await Promise.all([
        fetchReconciliations(),
        fetchEmployees()
      ]);
      
      setEmployees(empRes);

      // এমপ্লয়ি ম্যাপ তৈরি
      const empMap = empRes.reduce((acc: Record<string, Employee>, emp) => {
        acc[emp.uuid] = emp;
        return acc;
      }, {});

      const formattedData: Reconciliation[] = recRes
        .filter((item: any) => !item.deletedAt)
        .map((item: any) => ({
          id: item.id ?? item.uuid,
          uuid: item.uuid,
          employeeId: item.employeeId,
          employeeName: empMap[item.employeeId]?.name || "Unknown",
          date: item.date || "",
          lateMinutes: item.lateMinutes || 0,
          requestType: item.requestType || "",
          reason: item.reason || "",
          attachment: item.attachment,
          status: item.status || "Pending",
          approvedBy: item.approvedBy || "",
          isApproved: item.isApproved || false,
        }));

      setDataList(formattedData);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = dataList.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      item.employeeName.toLowerCase().includes(q) ||
      item.requestType.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q)
    );
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / entries));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * entries;
  const pageRows = filtered.slice(start, start + entries);
  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(start + entries, total);

  const goPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

  const handleDelete = async (item: Reconciliation) => {
    if (!confirm(`Delete reconciliation for "${item.employeeName}"?`)) return;

    try {
      setActionLoading(true);
      await softDeleteReconciliation(item.uuid);
      
      setDataList((prev) => prev.filter((row) => row.uuid !== item.uuid));
      
      if (pageRows.length === 1 && currentPage > 1) {
        setPage((p) => p - 1);
      }
    } catch (err: any) {
      alert(err?.message || "Failed to delete");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink relative transition-colors duration-200">
      
      {/* Breadcrumb + Add button */}
      <div className="bg-surface border-b border-border px-5 py-2.5 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-ink-muted hover:text-ink cursor-pointer transition-colors">Home</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink-muted">HRM</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink font-medium">Attendance Reconciliations List</span>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Attendance Reconciliations Add
        </button>
      </div>

      <div className="p-4">
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
              className="border border-border rounded px-2 py-1 text-[13px] bg-surface text-ink focus:outline-none"
            >
              {[5, 10, 25, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span>entries</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="text-ink-muted">Search:</span>
            <div className="relative">
              <Search className="absolute left-2 top-1.5 w-3.5 h-3.5 text-ink-faint" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="border border-border rounded pl-7 pr-2 py-1 text-[13px] w-48 bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Loading & Error states */}
        {loading && (
          <div className="flex items-center justify-center py-10 text-ink-muted">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading...
          </div>
        )}
        {error && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-md text-sm mb-4">
            {error} <button onClick={loadData} className="underline ml-2">Retry</button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    {["SL", "EMPLOYEE", "DATE", "LATE MINUTES", "REQUEST TYPE", "REASON", "STATUS", "APPROVE", "ACTION"].map((h) => (
                      <th key={h} className="px-3 py-2.5 font-semibold whitespace-nowrap uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-3 py-10 text-center text-ink-faint">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((row, index) => (
                      <tr key={row.uuid} className="border-b border-border hover:bg-canvas/70 transition-colors">
                        <td className="px-3 py-2.5 text-ink-muted">{start + index + 1}</td>
                        <td className="px-3 py-2.5 text-ink font-medium">{row.employeeName}</td>
                        <td className="px-3 py-2.5 text-ink">{formatDate(row.date)}</td>
                        <td className="px-3 py-2.5 text-ink tabular-nums">{row.lateMinutes}</td>
                        <td className="px-3 py-2.5 text-ink">{row.requestType}</td>
                        <td className="px-3 py-2.5 text-ink truncate max-w-[150px]" title={row.reason}>{row.reason || "-"}</td>
                        <td className="px-3 py-2.5 text-ink">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${row.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-ink">
                           {/* Approve Checkbox (Mock) */}
                           <div className="flex flex-col">
                             <input type="checkbox" disabled checked={row.isApproved} className="w-4 h-4 rounded text-indigo-600" />
                             <span className="text-[10px] text-ink-muted mt-1">{row.isApproved ? "All Approvals Completed." : "Admin\nRasel Hossain"}</span>
                           </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingItem(row)}
                              type="button"
                              className="w-7 h-7 rounded bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-600 transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(row)}
                              disabled={actionLoading}
                              type="button"
                              className="w-7 h-7 rounded bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 disabled:opacity-50 transition-colors"
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
                  className="px-2.5 py-1 rounded border border-border hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed text-ink transition-colors"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goPage(p)}
                    className={`min-w-[32px] px-2 py-1 rounded font-medium transition-colors ${
                      currentPage === p 
                        ? "bg-indigo-600 text-white" 
                        : "text-ink hover:bg-canvas"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => goPage(currentPage + 1)}
                  className="px-2.5 py-1 rounded border border-border hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed text-ink transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <ReconciliationModal
          title="Attendance Reconciliation"
          employees={employees}
          onClose={() => setIsAddOpen(false)}
          onSubmit={async (data) => {
            await createReconciliation(data);
            setIsAddOpen(false);
            await loadData();
          }}
        />
      )}

      {/* Edit Modal */}
      {editingItem && (
        <ReconciliationModal
          title="Attendance Reconciliation"
          initialData={editingItem}
          employees={employees}
          onClose={() => setEditingItem(null)}
          onSubmit={async (data) => {
            await updateReconciliation(editingItem.uuid, data);
            setEditingItem(null);
            await loadData();
          }}
        />
      )}
    </div>
  );
}