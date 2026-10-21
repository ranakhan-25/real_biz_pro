/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Check, Search } from "lucide-react";

// ---------- Types ----------
export interface ZkTecoDevice {
  id: string | number;
  uuid: string;
  type: string;
  name: string;
  sn: string;
  ip?: string;
  port?: string;
  lastOnline?: string;
  status: string;
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

// ১. Device লিস্ট ফেচ
async function fetchDevices(): Promise<ZkTecoDevice[]> {
  const url = `${API_BASE}/realbizpro/api/v1/zkteco-device?page=1&limit=100&withDeleted=false`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch devices");

  return (json?.data?.data || [])
    .filter((item: any) => !item.deletedAt)
    .map((item: any) => ({
      id: item.id ?? item.uuid,
      uuid: item.uuid,
      type: item.type || "",
      name: item.name || "",
      sn: item.sn || "",
      ip: item.ip || "",
      port: item.port || "",
      lastOnline: item.lastOnline || "",
      status: item.status || "active",
    }));
}

// ২. Device তৈরি
async function createDevice(payload: any) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/zkteco-device`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await handleRes(res, "create device");
}

// ৩. Device আপডেট
async function updateDevice(uuid: string, payload: any) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/zkteco-device/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await handleRes(res, "update device");
}

// ৪. Device ডিলিট
async function softDeleteDevice(uuid: string) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/zkteco-device/${uuid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return await handleRes(res, "delete device");
}

// ডেট ফরম্যাটার
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};

// ---------- Form Modal ----------
function DeviceModal({
  title,
  initialData,
  onClose,
  onSubmit,
}: {
  title: string;
  initialData?: ZkTecoDevice;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    type: initialData?.type || "",
    name: initialData?.name || "",
    sn: initialData?.sn || "",
    ip: initialData?.ip || "",
    port: initialData?.port || "",
    status: initialData?.status || "active",
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const isRealIP = formData.type === "Real IP";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type) return setFormError("Type is required");
    if (!formData.name.trim()) return setFormError("Device Name is required");
    if (!formData.sn.trim()) return setFormError("Device SN is required");
    if (isRealIP) {
      if (!formData.ip.trim()) return setFormError("The ip field is required.");
      if (!formData.port.trim()) return setFormError("The port field is required.");
    }
    if (!formData.status) return setFormError("Status is required");

    setSubmitting(true);
    setFormError(null);
    try {
      const payload = {
        type: formData.type,
        name: formData.name,
        sn: formData.sn,
        status: formData.status,
        ip: isRealIP ? formData.ip : null,
        port: isRealIP ? formData.port : null,
      };
      await onSubmit(payload);
    } catch (err: any) {
      setFormError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-surface rounded-lg shadow-xl w-full max-w-xl mx-4 border border-border flex flex-col max-h-[90vh]">
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
            
            {/* Type */}
            <div>
              <label className="block text-[12px] text-ink-muted mb-1">
                Type<span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Select One Option</option>
                <option value="ADMS">ADMS</option>
                <option value="Real IP">Real IP</option>
              </select>
            </div>

            {/* Device Name */}
            <div>
              <label className="block text-[12px] text-ink-muted mb-1">
                Device Name<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter device name"
                className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Device SN & Status Row / IP & Port Row */}
            <div className="flex gap-4">
              {!isRealIP ? (
                // ADMS: SN & Status
                <>
                  <div className="w-1/2">
                    <label className="block text-[12px] text-ink-muted mb-1">
                      Device SN<span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.sn}
                      onChange={(e) => setFormData({ ...formData, sn: e.target.value })}
                      placeholder="e.g. 4370"
                      className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="w-1/2 relative">
                    <label className="block text-[12px] text-ink-muted mb-1">
                      Status<span className="text-rose-500">*</span>
                    </label>
                    <div 
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                      className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink cursor-pointer flex justify-between items-center"
                    >
                      {formData.status === "active" ? "Active" : formData.status === "inactive" ? "Inactive" : "Select One Option"}
                      <span className="text-ink-faint text-[10px]">▼</span>
                    </div>
                    {showStatusDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-md shadow-lg">
                        {["active", "inactive"].map((s) => (
                          <div 
                            key={s}
                            onClick={() => {
                              setFormData({ ...formData, status: s });
                              setShowStatusDropdown(false);
                            }}
                            className="px-3 py-2 text-[13px] hover:bg-canvas cursor-pointer capitalize"
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Real IP: IP & Port
                <>
                  <div className="w-1/2">
                    <label className="block text-[12px] text-ink-muted mb-1">
                      IP Address<span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ip}
                      onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                      placeholder="e.g. 192.168.1.100"
                      className={`w-full border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500 ${formError === "The ip field is required." ? "border-rose-500" : "border-border"}`}
                    />
                    {formError === "The ip field is required." && (
                      <p className="text-rose-500 text-[11px] mt-1">The ip field is required.</p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label className="block text-[12px] text-ink-muted mb-1">
                      Port<span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.port}
                      onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                      placeholder="e.g. 4370"
                      className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Real IP: SN & Status (Second Row) */}
            {isRealIP && (
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-[12px] text-ink-muted mb-1">
                    Device SN<span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.sn}
                    onChange={(e) => setFormData({ ...formData, sn: e.target.value })}
                    placeholder="e.g. 4370"
                    className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-1/2 relative">
                  <label className="block text-[12px] text-ink-muted mb-1">
                    Status<span className="text-rose-500">*</span>
                  </label>
                  <div 
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink cursor-pointer flex justify-between items-center"
                  >
                    {formData.status === "active" ? "Active" : formData.status === "inactive" ? "Inactive" : "Select One Option"}
                    <span className="text-ink-faint text-[10px]">▼</span>
                  </div>
                  {showStatusDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-md shadow-lg">
                      {["active", "inactive"].map((s) => (
                        <div 
                          key={s}
                          onClick={() => {
                            setFormData({ ...formData, status: s });
                            setShowStatusDropdown(false);
                          }}
                          className="px-3 py-2 text-[13px] hover:bg-canvas cursor-pointer capitalize"
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {formError && formError !== "The ip field is required." && (
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Main Page ----------
export default function ZkTecoDeviceListPage() {
  const [dataList, setDataList] = useState<ZkTecoDevice[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ZkTecoDevice | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetchDevices();
      setDataList(res);
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
      item.name.toLowerCase().includes(q) ||
      item.sn.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
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

  const handleDelete = async (item: ZkTecoDevice) => {
    if (!confirm(`Delete device "${item.name}"?`)) return;

    try {
      setActionLoading(true);
      await softDeleteDevice(item.uuid);
      
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
          <span className="text-ink font-medium">ZkTeco Devices</span>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Device
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
                    {["SL", "TYPE", "NAME", "SN NO", "IP", "PORT", "LAST ONLINE", "STATUS", "ACTION"].map((h) => (
                      <th key={h} className="px-3 py-2.5 font-semibold whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-3 py-10 text-center text-ink-faint">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((row, index) => (
                      <tr key={row.uuid} className="border-b border-border hover:bg-canvas/70 transition-colors">
                        <td className="px-3 py-2.5 text-ink-muted">{start + index + 1}</td>
                        <td className="px-3 py-2.5 text-ink">{row.type}</td>
                        <td className="px-3 py-2.5 text-ink font-medium">{row.name}</td>
                        <td className="px-3 py-2.5 text-ink">{row.sn}</td>
                        <td className="px-3 py-2.5 text-ink">{row.ip || "-"}</td>
                        <td className="px-3 py-2.5 text-ink">{row.port || "-"}</td>
                        <td className="px-3 py-2.5 text-ink">{formatDate(row.lastOnline)}</td>
                        <td className="px-3 py-2.5 text-ink capitalize">
                           <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${row.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
                             {row.status}
                           </span>
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
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
        <DeviceModal
          title="ZkTeco Device"
          onClose={() => setIsAddOpen(false)}
          onSubmit={async (data) => {
            await createDevice(data);
            setIsAddOpen(false);
            await loadData();
          }}
        />
      )}

      {/* Edit Modal */}
      {editingItem && (
        <DeviceModal
          title="ZkTeco Device"
          initialData={editingItem}
          onClose={() => setEditingItem(null)}
          onSubmit={async (data) => {
            await updateDevice(editingItem.uuid, data);
            setEditingItem(null);
            await loadData();
          }}
        />
      )}
    </div>
  );
}