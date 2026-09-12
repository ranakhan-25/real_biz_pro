"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Plus,
  ArrowLeft,
  FileSpreadsheet,
  FileText,
  Search,
  Eye,
  Edit,
  Trash2,
  Paperclip,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react";

// TypeScript Interface for Invoice Data
interface Invoice {
  id: string;
  projectType: string;
  projectName: string;
  customerName: string;
  code: string;
  ref: string;
  date: string;
  grandTotal: number;
  addedBy: string;
  approveStatus: "Approved" | "Pending";
  hasAttachment: boolean;
}

// Dummy Content / Data
const initialInvoices: Invoice[] = [
  {
    id: "INV-001",
    projectType: "Web Development",
    projectName: "E-commerce Platform",
    customerName: "Acme Corp",
    code: "WEB-9921",
    ref: "PO-2026-01",
    date: "2026-09-02",
    grandTotal: 1250.0,
    addedBy: "Shamim Khan",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "INV-002",
    projectType: "Mobile App",
    projectName: "Fitness Tracker App",
    customerName: "HealthPlus Ltd",
    code: "MOB-4412",
    ref: "PO-2026-02",
    date: "2026-09-05",
    grandTotal: 3400.5,
    addedBy: "Tanvir Ahmed",
    approveStatus: "Pending",
    hasAttachment: true,
  },
  {
    id: "INV-003",
    projectType: "UI/UX Design",
    projectName: "Dashboard Redesign",
    customerName: "Fintech Solutions",
    code: "DES-1029",
    ref: "PO-2026-03",
    date: "2026-09-08",
    grandTotal: 850.0,
    addedBy: "Shamim Khan",
    approveStatus: "Approved",
    hasAttachment: false,
  },
  {
    id: "INV-004",
    projectType: "DevOps & Cloud",
    projectName: "AWS Migration",
    customerName: "CloudScale Inc",
    code: "DEV-8832",
    ref: "PO-2026-04",
    date: "2026-09-10",
    grandTotal: 2100.0,
    addedBy: "Rahim Uddin",
    approveStatus: "Pending",
    hasAttachment: true,
  },
];

export default function InvoiceBillList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and Search Logic
  const filteredInvoices = useMemo(() => {
    return initialInvoices.filter((inv) => {
      const matchesSearch =
        inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProject =
        selectedProject === "All" || inv.projectName === selectedProject;

      return matchesSearch && matchesProject;
    });
  }, [searchQuery, selectedProject]);

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8 font-sans">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <nav className="flex items-center text-sm text-slate-500 space-x-2 mb-1">
            <Link
              href="/"
              className="flex items-center hover:text-indigo-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="hover:text-indigo-600 cursor-pointer">
              Billing
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-800">
              Invoice/Bill List
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Invoice & Bill Management
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/billing/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" /> New Bill/Invoice
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-sm font-medium py-2.5 px-4 rounded-xl border border-slate-200 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Previous
          </button>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Section */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
            {/* Date Range Filter Box */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue="1 September, 2026 - 30 September, 2026"
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                />
              </div>
            </div>

            {/* Project Filter Box */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Project
              </label>
              <div className="relative">
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer"
                >
                  <option value="All">Select value (All Projects)</option>
                  <option value="E-commerce Platform">
                    E-commerce Platform
                  </option>
                  <option value="Fitness Tracker App">
                    Fitness Tracker App
                  </option>
                  <option value="Dashboard Redesign">Dashboard Redesign</option>
                  <option value="AWS Migration">AWS Migration</option>
                </select>
                <Filter className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-colors">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
            </button>
            <button className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-colors">
              <FileText className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>

        {/* Table Controls (Entries and Search) */}
        <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
            />
          </div>
        </div>

        {/* Responsive Table Component */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 rounded-tl-lg">ID</th>
                <th className="py-3.5 px-4">Project Type</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Ref</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Grand Total</th>
                <th className="py-3.5 px-4">Added By</th>
                <th className="py-3.5 px-4">Approve</th>
                <th className="py-3.5 px-4">Attachment</th>
                <th className="py-3.5 px-4 rounded-tr-lg text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv, index) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-indigo-600">
                      {inv.id}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {inv.projectType}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {inv.projectName}
                    </td>
                    <td className="py-3.5 px-4">{inv.customerName}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                      {inv.code}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                      {inv.ref}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                      {inv.date}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      ${inv.grandTotal.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {inv.addedBy}
                    </td>
                    <td className="py-3.5 px-4">
                      {inv.approveStatus === "Approved" ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {inv.hasAttachment ? (
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 bg-indigo-50 text-indigo-600 rounded-lg"
                          title="View Attachment"
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          className="p-1.5 hover:bg-slate-200/70 text-slate-600 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    No data available in table matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-800">1</span> to{" "}
            <span className="font-medium text-slate-800">
              {filteredInvoices.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-800">
              {filteredInvoices.length}
            </span>{" "}
            entries
          </p>
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 border border-slate-200 bg-white text-slate-400 text-sm font-medium rounded-lg cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button className="px-3.5 py-1.5 border border-indigo-600 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm">
              1
            </button>
            <button
              disabled={true}
              className="px-3.5 py-1.5 border border-slate-200 bg-white text-slate-400 text-sm font-medium rounded-lg cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
