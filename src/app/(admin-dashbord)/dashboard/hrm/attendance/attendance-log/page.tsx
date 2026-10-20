/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw, Play, Upload } from "lucide-react";
import toast from "react-hot-toast";

// ---------- Types ----------
export interface AttendanceLog {
  id: string | number;
  uuid: string;
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  time: string;
  date: string;
}

export interface Employee {
  uuid: string;
  name: string;
  code: string;
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

// ১. Attendance Log ফেচ
async function fetchAttendanceLogs(): Promise<any[]> {
  const url = `${API_BASE}/realbizpro/api/v1/attendance?page=1&limit=100&withDeleted=false`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch attendance logs");
  return json?.data?.data || json?.data || [];
}

// ২. Employee List ফেচ
async function fetchEmployees(): Promise<Employee[]> {
  const url = `${API_BASE}/realbizpro/api/v1/employee-list?page=1&limit=100&withDeleted=false`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch employees");

  return (json?.data?.data || json?.data || []).map((e: any) => ({
    uuid: e.uuid,
    name: e.name || "Unknown",
    code: e.employeeCode || e.code || "N/A",
  }));
}

// ডেট ফরম্যাটার
const formatDateForInput = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// ---------- Main Page ----------
export default function AttendancePage() {
  const [dataList, setDataList] = useState<AttendanceLog[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const today = formatDateForInput(new Date());
  const [fromDate, setFromDate] = useState<string>(today);
  const [toDate, setToDate] = useState<string>(today);

  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // প্যারালালি Attendance এবং Employee ডাটা লোড
      const [attRes, empRes] = await Promise.all([
        fetchAttendanceLogs(),
        fetchEmployees()
      ]);

      // এমপ্লয়ি ম্যাপ তৈরি (দ্রুত লুকআপের জন্য)
      const empMap = empRes.reduce((acc: Record<string, Employee>, emp) => {
        acc[emp.uuid] = emp;
        return acc;
      }, {});

      // অ্যাটেনডেন্স ডাটার সাথে এমপ্লয়ি নাম ও কোড মার্জ
      const formattedData: AttendanceLog[] = attRes
        .filter((item: any) => !item.deletedAt)
        .map((item: any) => {
          const emp = empMap[item.employeeId] || { name: "Unknown", code: "N/A" };
          return {
            id: item.id ?? item.uuid,
            uuid: item.uuid,
            employeeId: item.employeeId,
            employeeCode: emp.code,
            employeeName: emp.name,
            time: item.inTime || "-",
            date: item.date || "-",
          };
        });

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

  const handleLogSync = async () => {
    try {
      setIsSyncing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Log Sync completed successfully!");
      await loadData();
    } catch (err: any) {
      toast.error("Failed to sync logs");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleProcessData = async () => {
    try {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Data processed successfully!");
      await loadData();
    } catch (err: any) {
      toast.error("Failed to process data");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogImport = () => {
    toast.success("Log Import clicked");
  };

  const total = dataList.length;
  const totalPages = Math.max(1, Math.ceil(total / entries));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * entries;
  const pageRows = dataList.slice(start, start + entries);
  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(start + entries, total);

  const goPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

  return (
    <div className="min-h-screen bg-canvas text-ink relative transition-colors duration-200">
      
      {/* Breadcrumb & Top Bar */}
      <div className="bg-surface border-b border-border px-5 py-2.5 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-ink-muted hover:text-ink cursor-pointer transition-colors">Home</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink-muted">HRM</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink font-medium">Attendance</span>
        </div>

        <button
          onClick={handleLogImport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 shadow-sm transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          Log Import
        </button>
      </div>

      <div className="p-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 bg-surface p-4 rounded-lg border border-border">
          
          <div className="flex items-end gap-2">
            <div className="w-full md:w-48">
              <label className="block text-[12px] text-ink-muted mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-2 text-ink-muted">-</div>
            <div className="w-full md:w-48">
              <label className="block text-[12px] text-ink-muted mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogSync}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {isSyncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              Log Sync
            </button>
            <button
              onClick={handleProcessData}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              Process Data
            </button>
          </div>
        </div>

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

        {!loading && !error && (
          <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden transition-colors">
            
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 border-b border-border">
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
              <div className="flex items-center gap-1.5 text-[13px] text-ink-muted">
                <span>Search:</span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-border rounded px-2 py-1 text-[13px] w-48 bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    {["SL", "EMPLOYEE CODE", "NAME", "TIME", "DATE"].map((h) => (
                      <th key={h} className="px-3 py-2.5 font-semibold whitespace-nowrap uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 py-10 text-center text-ink-faint">
                        No attendance found for selected date
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((row, index) => (
                      <tr key={row.uuid} className="border-b border-border hover:bg-canvas/70 transition-colors">
                        <td className="px-3 py-2 text-ink-muted">{start + index + 1}</td>
                        <td className="px-3 py-2 text-ink font-medium">{row.employeeCode}</td>
                        <td className="px-3 py-2 text-ink">{row.employeeName}</td>
                        <td className="px-3 py-2 text-ink">{row.time}</td>
                        <td className="px-3 py-2 text-ink">{row.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

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
    </div>
  );
}