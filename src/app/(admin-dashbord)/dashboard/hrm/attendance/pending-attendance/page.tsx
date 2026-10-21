/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import toast from "react-hot-toast";

// ---------- Types ----------
export interface PendingAttendance {
  id: string | number;
  uuid: string;
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  date: string;
  inTime: string;
  outTime: string;
  hours: string;
  inSelfie?: string;
  outSelfie?: string;
  inLocation?: string;
  outLocation?: string;
  isPresent: boolean;
}

export interface Shift {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
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

// ১. Pending Attendance ফেচ
async function fetchPendingAttendances(date: string, shiftId: string, departmentId: string): Promise<any[]> {
  let url = `${API_BASE}/realbizpro/api/v1/attendance?page=1&limit=100&withDeleted=false`;
  
  // শুধু ভ্যালু থাকলেই প্যারামিটার যোগ হবে
  if (date) url += `&date=${date}`;
  if (shiftId) url += `&shiftId=${shiftId}`;
  if (departmentId) url += `&departmentId=${departmentId}`;

  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch pending attendances");
  return json?.data?.data || json?.data || [];
}

// ২. Shift ফেচ
async function fetchShifts(): Promise<Shift[]> {
  const url = `${API_BASE}/realbizpro/api/v1/shift?page=1&limit=100&withDeleted=false`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch shifts");
  return (json?.data?.data || json?.data || []).map((s: any) => ({ id: s.uuid, name: s.name }));
}

// ৩. Department ফেচ
async function fetchDepartments(): Promise<Department[]> {
  const url = `${API_BASE}/realbizpro/api/v1/department?page=1&limit=100&withDeleted=false`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch departments");
  return (json?.data?.data || json?.data || []).map((d: any) => ({ id: d.uuid, name: d.name }));
}

// ৪. Employee ফেচ
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

// ৫. Attendance আপডেট
async function updateAttendance(uuid: string, payload: any) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/attendance/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await handleRes(res, "update attendance");
}

// ডেট ফরম্যাটার (YYYY-MM-DD)
const formatDateForInput = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// ---------- Main Page ----------
export default function PendingAttendancePage() {
  const [dataList, setDataList] = useState<PendingAttendance[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ফিল্টার স্টেট (ডিফল্ট: আজকের তারিখ, কোনো শিফট/ডিপার্টমেন্ট সিলেক্ট না করে)
  const today = formatDateForInput(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("");
  
  // এডিট স্টেট
  const [editedPresent, setEditedPresent] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [attRes, shiftRes, deptRes, empRes] = await Promise.all([
        fetchPendingAttendances(selectedDate, selectedShift, selectedDept),
        fetchShifts(),
        fetchDepartments(),
        fetchEmployees()
      ]);
      
      setShifts(shiftRes);
      setDepartments(deptRes);

      const empMap = empRes.reduce((acc: Record<string, Employee>, emp) => {
        acc[emp.uuid] = emp;
        return acc;
      }, {});

      const formattedData: PendingAttendance[] = attRes
        .filter((item: any) => !item.deletedAt)
        .map((item: any) => {
          const emp = empMap[item.employeeId] || { name: "Unknown", code: "N/A" };
          return {
            id: item.id ?? item.uuid,
            uuid: item.uuid,
            employeeId: item.employeeId,
            employeeCode: emp.code,
            employeeName: emp.name,
            date: item.date || "",
            inTime: item.inTime || "",
            outTime: item.outTime || "",
            hours: item.hours || "0.00",
            inSelfie: item.inSelfie,
            outSelfie: item.outSelfie,
            inLocation: item.inLocation || "Not Available",
            outLocation: item.outLocation || "Not Available",
            isPresent: item.isPresent || false,
          };
        });

      setDataList(formattedData);
      
      const initialPresent: Record<string, boolean> = {};
      formattedData.forEach((item: PendingAttendance) => {
        initialPresent[item.uuid] = item.isPresent;
      });
      setEditedPresent(initialPresent);
      
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate, selectedShift, selectedDept]);

  const handlePresentChange = (uuid: string, checked: boolean) => {
    setEditedPresent(prev => ({ ...prev, [uuid]: checked }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const promises = dataList.map(item => {
        if (item.isPresent !== editedPresent[item.uuid]) {
          return updateAttendance(item.uuid, {
            isPresent: editedPresent[item.uuid]
          });
        }
        return Promise.resolve();
      });

      await Promise.all(promises);
      toast.success("Attendance updated successfully!");
      await loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update attendance");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink relative transition-colors duration-200">
      
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border px-5 py-2.5 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-ink-muted hover:text-ink cursor-pointer transition-colors">Home</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink-muted">HRM</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink font-medium">Pending Attendance</span>
        </div>
      </div>

      <div className="p-4">
        
        {/* ফিল্টার সেকশন */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-[12px] text-ink-muted mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-[12px] text-ink-muted mb-1">Shift</label>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select Shift</option>
              {shifts.map((shift) => (
                <option key={shift.id} value={shift.id}>{shift.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-[12px] text-ink-muted mb-1">Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* লোডিং এবং এরর */}
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

        {/* টেবিল */}
        {!loading && !error && (
          <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    {[
                      "SL", "CODE", "EMPLOYEE NAME", "FROM TIME", "TO TIME", 
                      "HOURS", "IN SELFIE", "OUT SELFIE", "IN LOCATION", "OUT LOCATION", "ATTENDANCE"
                    ].map((h) => (
                      <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataList.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-3 py-10 text-center text-ink-faint">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    dataList.map((row, index) => (
                      <tr key={row.uuid} className="border-b border-border hover:bg-canvas/70 transition-colors">
                        <td className="px-3 py-2 text-ink-muted">{index + 1}</td>
                        <td className="px-3 py-2 text-ink font-medium">{row.employeeCode}</td>
                        <td className="px-3 py-2 text-ink">{row.employeeName}</td>
                        
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            defaultValue={row.inTime ? `${row.date} ${row.inTime}` : ""}
                            className="w-full border border-border rounded px-2 py-1 text-[11px] bg-surface text-ink focus:outline-none"
                            readOnly
                          />
                        </td>
                        
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            defaultValue={row.outTime ? `${row.date} ${row.outTime}` : ""}
                            className="w-full border border-border rounded px-2 py-1 text-[11px] bg-surface text-ink focus:outline-none"
                            readOnly
                          />
                        </td>
                        
                        <td className="px-3 py-2">
                           <input
                            type="text"
                            defaultValue={row.hours}
                            className="w-full border border-border rounded px-2 py-1 text-[11px] bg-surface text-ink focus:outline-none"
                            readOnly
                          />
                        </td>
                        
                        <td className="px-3 py-2 text-center">
                          {row.inSelfie ? (
                            <img src={`${API_BASE}/${row.inSelfie}`} alt="In" className="h-6 w-6 rounded object-cover mx-auto" />
                          ) : (
                            <div className="h-6 w-6 bg-gray-200 rounded mx-auto" />
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {row.outSelfie ? (
                            <img src={`${API_BASE}/${row.outSelfie}`} alt="Out" className="h-6 w-6 rounded object-cover mx-auto" />
                          ) : (
                            <div className="h-6 w-6 bg-gray-200 rounded mx-auto" />
                          )}
                        </td>

                        <td className="px-3 py-2 text-ink whitespace-nowrap">
                          {row.inLocation || "Not Available"}
                        </td>
                        <td className="px-3 py-2 text-ink whitespace-nowrap">
                          {row.outLocation || "Not Available"}
                        </td>
                        
                        <td className="px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={editedPresent[row.uuid] || false}
                            onChange={(e) => handlePresentChange(row.uuid, e.target.checked)}
                            className="w-4 h-4 text-indigo-600 bg-surface border-border rounded focus:ring-indigo-500 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border flex justify-start">
              <button
                onClick={handleSubmit}
                disabled={isSaving || dataList.length === 0}
                className="px-6 py-2 rounded-md bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}