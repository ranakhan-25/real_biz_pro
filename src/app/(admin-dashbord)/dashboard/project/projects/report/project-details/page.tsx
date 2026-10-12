"use client";

import React, { useState } from "react";
import { 
  Search, 
  FileSpreadsheet, 
  FileText, 
  Home,
  Calendar,
  ChevronDown
} from "lucide-react";

interface DetailReportItem {
  id: number;
  category: "Material" | "Service/Work" | "Expense";
  date: string;
  description: string;
  unit: string;
  qty: number;
  rate: number;
}

const initialDetailData: DetailReportItem[] = [
  // Material Items
  { id: 1, category: "Material", date: "2026-09-02", description: "Portland Composite Cement (50kg bag)", unit: "Bag", qty: 200, rate: 550 },
  { id: 2, category: "Material", date: "2026-09-05", description: "Grade 60 Deformed Steel Rods (16mm)", unit: "Ton", qty: 15, rate: 85000 },
  { id: 3, category: "Material", date: "2026-09-08", description: "Sylhet Fine Sand", unit: "Cft", qty: 1500, rate: 45 },
  { id: 4, category: "Material", date: "2026-09-10", description: "Crushed Stone Aggregates", unit: "Cft", qty: 1200, rate: 110 },

  // Service/Work Items
  { id: 5, category: "Service/Work", date: "2026-09-03", description: "Deep Piling and Boring Work", unit: "Rft", qty: 350, rate: 400 },
  { id: 6, category: "Service/Work", date: "2026-09-06", description: "Structural Shuttering and Centering", unit: "Sqft", qty: 2500, rate: 35 },
  { id: 7, category: "Service/Work", date: "2026-09-09", description: "Architectural Site Supervision", unit: "Month", qty: 1, rate: 45000 },

  // Expense Items
  { id: 8, category: "Expense", date: "2026-09-04", description: "Daily Labor Wages for Foundation Casting", unit: "Person", qty: 40, rate: 700 },
  { id: 9, category: "Expense", date: "2026-09-07", description: "Site Electricity Bill & Generator Fuel", unit: "LS", qty: 1, rate: 12500 },
  { id: 10, category: "Expense", date: "2026-09-09", description: "Material Transport & Truck Unloading Cost", unit: "Trip", qty: 6, rate: 3500 }
];

export default function ProjectDetailsReport() {
  const [data] = useState<DetailReportItem[]>(initialDetailData);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(100);

  // Filter logic
  const filteredData = data.filter(item => 
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedData = filteredData.slice(0, entriesPerPage);

  // Separate by category
  const materials = displayedData.filter(i => i.category === "Material");
  const services = displayedData.filter(i => i.category === "Service/Work");
  const expenses = displayedData.filter(i => i.category === "Expense");

  // Calculations
  const materialTotalQty = materials.reduce((sum, i) => sum + i.qty, 0);
  const materialTotalAmount = materials.reduce((sum, i) => sum + (i.qty * i.rate), 0);

  const serviceTotalQty = services.reduce((sum, i) => sum + i.qty, 0);
  const serviceTotalAmount = services.reduce((sum, i) => sum + (i.qty * i.rate), 0);

  const expenseTotalQty = expenses.reduce((sum, i) => sum + i.qty, 0);
  const expenseTotalAmount = expenses.reduce((sum, i) => sum + (i.qty * i.rate), 0);

  const grandTotalQty = materialTotalQty + serviceTotalQty + expenseTotalQty;
  const grandTotalAmount = materialTotalAmount + serviceTotalAmount + expenseTotalAmount;

  let globalSlNo = 1;

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 font-sans text-slate-800">
      
      {/* Breadcrumb Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white px-5 py-3.5 rounded-xl shadow-sm border border-slate-200/60">
        <nav className="flex items-center text-xs font-medium text-slate-500">
          <a href="#" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
            <Home className="h-3.5 w-3.5" /> Home
          </a>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-500">Project</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-indigo-600 font-semibold">Project Details Report</span>
        </nav>
      </div>

      {/* Top Filter Form */}
      <div className="mb-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Select Date</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="September 1, 2026 - September 30, 2026"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
              <Calendar className="absolute right-2.5 top-2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company</label>
            <div className="relative">
              <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 appearance-none focus:border-indigo-500 focus:outline-none">
                <option value="">Select value</option>
                <option value="Abason Group">Abason Group</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Select Project</label>
            <div className="relative">
              <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 appearance-none focus:border-indigo-500 focus:outline-none">
                <option value="">Select Project</option>
                <option value="Abason Project">Abason Project</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Site</label>
            <div className="relative">
              <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 appearance-none focus:border-indigo-500 focus:outline-none">
                <option value="">Select Site</option>
                <option value="Site Alpha">Site Alpha</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Task</label>
            <div className="relative">
              <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 appearance-none focus:border-indigo-500 focus:outline-none">
                <option value="">Select Task</option>
                <option value="Foundation">Foundation</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Second Row Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category</label>
            <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none">
              <option value="">Search Category</option>
              <option value="Material">Material</option>
              <option value="Service/Work">Service/Work</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Service/Work</label>
            <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none">
              <option value="">Search Service/Work</option>
            </select>
          </div>
        </div>
      </div>

      {/* Export & Entries & Search Control Bar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200/60">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 transition-all">
            <FileText className="h-3.5 w-3.5" /> PDF
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-600 ml-2">
            <span>Show</span>
            <select 
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600">Search:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none w-48 sm:w-64"
            placeholder=""
          />
        </div>
      </div>

      {/* Modern Grouped Detailed Table */}
      <div className="rounded-xl bg-white shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#7c3aed] text-white text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 font-semibold w-16">SL.</th>
                <th className="py-3 px-3 font-semibold w-28">Date ↕</th>
                <th className="py-3 px-3 font-semibold w-32">Category ↕</th>
                <th className="py-3 px-3 font-semibold">Description ↕</th>
                <th className="py-3 px-3 font-semibold w-24">Unit ↕</th>
                <th className="py-3 px-3 font-semibold w-24">QTY ↕</th>
                <th className="py-3 px-3 font-semibold text-right w-28">Rate ↕</th>
                <th className="py-3 px-3 font-semibold text-right w-32">Amount ↕</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              
              {/* 1. MATERIAL SECTION */}
              <tr className="bg-slate-100 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={8} className="py-2.5 px-4 tracking-wide text-indigo-900">Material</td>
              </tr>
              {materials.length > 0 ? (
                materials.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-600">{globalSlNo++}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.date}</td>
                    <td className="py-2.5 px-3 text-indigo-600 font-medium">{item.category}</td>
                    <td className="py-2.5 px-3 text-slate-800">{item.description}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.unit}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.qty}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">{item.rate.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">{(item.qty * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="py-2 px-4 text-slate-400 italic">No material entries</td></tr>
              )}
              {/* Material Total Row */}
              <tr className="bg-slate-50/90 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={5} className="py-2.5 px-4 text-right uppercase text-[11px] text-slate-600">Material Total :</td>
                <td className="py-2.5 px-3 text-slate-900">{materialTotalQty}</td>
                <td></td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{materialTotalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>

              {/* 2. SERVICE / WORK SECTION */}
              <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-200">
                <td colSpan={8} className="py-2.5 px-4 tracking-wide text-indigo-900">Service/Work</td>
              </tr>
              {services.length > 0 ? (
                services.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-600">{globalSlNo++}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.date}</td>
                    <td className="py-2.5 px-3 text-indigo-600 font-medium">{item.category}</td>
                    <td className="py-2.5 px-3 text-slate-800">{item.description}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.unit}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.qty}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">{item.rate.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">{(item.qty * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="py-2 px-4 text-slate-400 italic">No service entries</td></tr>
              )}
              {/* Service Total Row */}
              <tr className="bg-slate-50/90 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={5} className="py-2.5 px-4 text-right uppercase text-[11px] text-slate-600">Service Total :</td>
                <td className="py-2.5 px-3 text-slate-900">{serviceTotalQty}</td>
                <td></td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{serviceTotalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>

              {/* 3. EXPENSE SECTION */}
              <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-200">
                <td colSpan={8} className="py-2.5 px-4 tracking-wide text-indigo-900">Expense</td>
              </tr>
              {expenses.length > 0 ? (
                expenses.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-600">{globalSlNo++}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.date}</td>
                    <td className="py-2.5 px-3 text-indigo-600 font-medium">{item.category}</td>
                    <td className="py-2.5 px-3 text-slate-800">{item.description}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.unit}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.qty}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">{item.rate.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">{(item.qty * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="py-2 px-4 text-slate-400 italic">No expense entries</td></tr>
              )}
              {/* Expense Total Row */}
              <tr className="bg-slate-50/90 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={5} className="py-2.5 px-4 text-right uppercase text-[11px] text-slate-600">Expense Total :</td>
                <td className="py-2.5 px-3 text-slate-900">{expenseTotalQty}</td>
                <td></td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{expenseTotalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>

              {/* GRAND TOTAL ROW */}
              <tr className="bg-indigo-50/70 font-extrabold text-slate-900 border-t-2 border-indigo-200">
                <td colSpan={5} className="py-3 px-4 text-right uppercase text-xs text-indigo-900">Grand Total :</td>
                <td className="py-3 px-3 text-indigo-900 text-sm">{grandTotalQty}</td>
                <td></td>
                <td className="py-3 px-3 text-right font-mono text-sm text-indigo-900">{grandTotalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/60 px-4 py-3 bg-slate-50/50 gap-2">
          <p className="text-xs text-slate-500">
            Showing <span className="font-medium text-slate-700">1</span> to{" "}
            <span className="font-medium text-slate-700">{displayedData.length}</span> of{" "}
            <span className="font-medium text-slate-700">{data.length}</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-0.5 rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
              Previous
            </button>
            <button className="rounded-md bg-indigo-600 px-3.5 py-1 text-xs font-medium text-white shadow-sm">
              1
            </button>
            <button className="flex items-center gap-0.5 rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}