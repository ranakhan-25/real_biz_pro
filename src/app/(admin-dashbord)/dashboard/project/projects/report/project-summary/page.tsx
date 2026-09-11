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

interface ReportItem {
  id: number;
  category: "Materials" | "Services" | "Expenses";
  description: string;
  quantity: number;
  amount: number;
}

const initialReportData: ReportItem[] = [
  // Materials
  { id: 1, category: "Materials", description: "Portland Composite Cement (50kg bag)", quantity: 250, amount: 125000.00 },
  { id: 2, category: "Materials", description: "Grade 60 Deformed Steel Rods (16mm)", quantity: 120, amount: 96000.00 },
  { id: 3, category: "Materials", description: "Sylhet Fine Sand (Per truck load)", quantity: 15, amount: 45000.00 },
  { id: 4, category: "Materials", description: "Crushed Stone Aggregates (1st class)", quantity: 20, amount: 70000.00 },
  { id: 5, category: "Materials", description: "Red Clay Bricks (First Class quality)", quantity: 5000, amount: 65000.00 },

  // Services
  { id: 6, category: "Services", description: "Deep Piling and Soil Mechanics Testing", quantity: 1, amount: 150000.00 },
  { id: 7, category: "Services", description: "Architectural & Structural 3D Design Consultancy", quantity: 1, amount: 80000.00 },
  { id: 8, category: "Services", description: "Site Surveying and Boundary Demarcation", quantity: 2, amount: 25000.00 },
  { id: 9, category: "Services", description: "Equipment Rental (Concrete Mixer & Vibrator)", quantity: 10, amount: 35000.00 },

  // Expenses
  { id: 10, category: "Expenses", description: "Labor Wages for Foundation Casting", quantity: 45, amount: 67500.00 },
  { id: 11, category: "Expenses", description: "Site Electricity and Generator Fuel Bill", quantity: 1, amount: 18500.00 },
  { id: 12, category: "Expenses", description: "Local Municipal and Regulatory Approvals", quantity: 1, amount: 45000.00 },
  { id: 13, category: "Expenses", description: "Transportation and Material Unloading Cost", quantity: 8, amount: 16000.00 }
];

export default function ProjectSummaryReport() {
  const [data] = useState<ReportItem[]>(initialReportData);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter logic
  const filteredData = data.filter(item => 
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedData = filteredData.slice(0, entriesPerPage);

  // Separate by category for grouped layout structure
  const materials = displayedData.filter(i => i.category === "Materials");
  const services = displayedData.filter(i => i.category === "Services");
  const expenses = displayedData.filter(i => i.category === "Expenses");

  // Calculate totals
  const totalMaterialsQty = materials.reduce((sum, i) => sum + i.quantity, 0);
  const totalMaterialsAmount = materials.reduce((sum, i) => sum + i.amount, 0);

  const totalServicesQty = services.reduce((sum, i) => sum + i.quantity, 0);
  const totalServicesAmount = services.reduce((sum, i) => sum + i.amount, 0);

  const totalExpensesQty = expenses.reduce((sum, i) => sum + i.quantity, 0);
  const totalExpensesAmount = expenses.reduce((sum, i) => sum + i.amount, 0);

  const grandTotalQty = totalMaterialsQty + totalServicesQty + totalExpensesQty;
  const grandTotalAmount = totalMaterialsAmount + totalServicesAmount + totalExpensesAmount;

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
          <span className="text-indigo-600 font-semibold">Project Summary Report</span>
        </nav>
      </div>

      {/* Filter Form Top Section */}
      <div className="mb-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
              <option value="HPDL Builders">HPDL Builders</option>
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
              <option value="Admin HQ">Admin HQ</option>
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

      {/* Export & Search Controls */}
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
              <option value={25}>25</option>
              <option value={50}>50</option>
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

      {/* Modern Grouped Table */}
      <div className="rounded-xl bg-white shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#7c3aed] text-white text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold w-24">SL NO.</th>
                <th className="py-3 px-4 font-semibold">Description</th>
                <th className="py-3 px-4 font-semibold w-36">Quantity</th>
                <th className="py-3 px-4 font-semibold text-right w-40">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              
              {/* MATERIALS SECTION */}
              <tr className="bg-slate-100 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={4} className="py-2.5 px-4 tracking-wide text-indigo-900">Materials</td>
              </tr>
              {materials.length > 0 ? (
                materials.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-slate-600">{globalSlNo++}</td>
                    <td className="py-2.5 px-4 text-slate-800">{item.description}</td>
                    <td className="py-2.5 px-4 text-slate-600 font-medium">{item.quantity}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-800">{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="py-2 px-4 text-slate-400 italic">No materials data</td></tr>
              )}
              {/* Materials Total Row */}
              <tr className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={2} className="py-2.5 px-4 text-right uppercase text-[11px] text-slate-600">Total</td>
                <td className="py-2.5 px-4 text-slate-900 font-semibold">{totalMaterialsQty}</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">{totalMaterialsAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>

              {/* SERVICES SECTION */}
              <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-200">
                <td colSpan={4} className="py-2.5 px-4 tracking-wide text-indigo-900">Services</td>
              </tr>
              {services.length > 0 ? (
                services.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-slate-600">{globalSlNo++}</td>
                    <td className="py-2.5 px-4 text-slate-800">{item.description}</td>
                    <td className="py-2.5 px-4 text-slate-600 font-medium">{item.quantity}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-800">{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="py-2 px-4 text-slate-400 italic">No services data</td></tr>
              )}
              {/* Services Total Row */}
              <tr className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={2} className="py-2.5 px-4 text-right uppercase text-[11px] text-slate-600">Total</td>
                <td className="py-2.5 px-4 text-slate-900 font-semibold">{totalServicesQty}</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">{totalServicesAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>

              {/* EXPENSES SECTION */}
              <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-200">
                <td colSpan={4} className="py-2.5 px-4 tracking-wide text-indigo-900">Expenses</td>
              </tr>
              {expenses.length > 0 ? (
                expenses.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-slate-600">{globalSlNo++}</td>
                    <td className="py-2.5 px-4 text-slate-800">{item.description}</td>
                    <td className="py-2.5 px-4 text-slate-600 font-medium">{item.quantity}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-800">{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="py-2 px-4 text-slate-400 italic">No expenses data</td></tr>
              )}
              {/* Expenses Total Row */}
              <tr className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={2} className="py-2.5 px-4 text-right uppercase text-[11px] text-slate-600">Total</td>
                <td className="py-2.5 px-4 text-slate-900 font-semibold">{totalExpensesQty}</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">{totalExpensesAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>

              {/* GRAND TOTAL ROW */}
              <tr className="bg-indigo-50/60 font-extrabold text-slate-900 border-t-2 border-indigo-200">
                <td colSpan={2} className="py-3 px-4 text-right uppercase text-xs text-indigo-900">Grand Total</td>
                <td className="py-3 px-4 text-indigo-900 text-sm">{grandTotalQty}</td>
                <td className="py-3 px-4 text-right font-mono text-sm text-indigo-900">{grandTotalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
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