"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Plus,
  FileSpreadsheet,
  FileText,
  Search,
  Eye,
  Edit,
  Trash2,
  Paperclip,
  CheckCircle2,
  Clock,
  Calendar,
} from "lucide-react";

// TypeScript Interface matching exact columns for Quote List from the screenshot
interface QuoteItem {
  id: string;
  orderCode: string;
  date: string;
  projectType: string;
  project: string;
  customerName: string;
  grandTotal: number;
  addedBy: string;
  approveStatus: "Approved" | "Pending";
  hasAttachment: boolean;
}

// Rich Dummy Content / Data (Filled with multiple items so no empty spaces exist)
const initialQuotes: QuoteItem[] = [
  {
    id: "QT-901",
    orderCode: "ORD-2026-501",
    date: "2026-09-02",
    projectType: "Commercial",
    project: "Skyline Commercial Complex",
    customerName: "Acme Corporation Ltd",
    grandTotal: 145000.0,
    addedBy: "Shamim Khan",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "QT-902",
    orderCode: "ORD-2026-502",
    date: "2026-09-04",
    projectType: "Residential",
    project: "Green Valley Heights",
    customerName: "Global Tech Solutions",
    grandTotal: 210000.5,
    addedBy: "Tanvir Ahmed",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "QT-903",
    orderCode: "ORD-2026-503",
    date: "2026-09-06",
    projectType: "Industrial",
    project: "Apex Industrial Warehouse",
    customerName: "Nexus Retail Group",
    grandTotal: 88500.0,
    addedBy: "Shamim Khan",
    approveStatus: "Pending",
    hasAttachment: false,
  },
  {
    id: "QT-904",
    orderCode: "ORD-2026-504",
    date: "2026-09-08",
    projectType: "Infrastructure",
    project: "City Bypass Extension",
    customerName: "Apex Logistics Corp",
    grandTotal: 305000.0,
    addedBy: "Rahim Uddin",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "QT-905",
    orderCode: "ORD-2026-505",
    date: "2026-09-09",
    projectType: "Commercial",
    project: "Vanguard IT Park",
    customerName: "Vanguard Media House",
    grandTotal: 175000.0,
    addedBy: "Shamim Khan",
    approveStatus: "Pending",
    hasAttachment: true,
  },
  {
    id: "QT-906",
    orderCode: "ORD-2026-506",
    date: "2026-09-10",
    projectType: "Residential",
    project: "Lakeview Duplex Villas",
    customerName: "Summit Holdings",
    grandTotal: 115000.0,
    addedBy: "Tanvir Ahmed",
    approveStatus: "Approved",
    hasAttachment: true,
  },
];

export default function QuoteList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedProjectType, setSelectedProjectType] =
    useState("All Project Types");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and Search Logic
  const filteredQuotes = useMemo(() => {
    return initialQuotes.filter((quote) => {
      const matchesSearch =
        quote.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.addedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProject =
        selectedProject === "All Projects" || quote.project === selectedProject;
      const matchesProjectType =
        selectedProjectType === "All Project Types" ||
        quote.projectType === selectedProjectType;

      return matchesSearch && matchesProject && matchesProjectType;
    });
  }, [searchQuery, selectedProject, selectedProjectType]);

  // Total Calculations for Footer
  const totals = useMemo(() => {
    return filteredQuotes.reduce(
      (acc, curr) => {
        acc.grandTotal += curr.grandTotal;
        return acc;
      },
      { grandTotal: 0 },
    );
  }, [filteredQuotes]);

  return (
    <div className="min-h-screen bg-slate-50/70 p-6 lg:p-8 font-sans">
      {/* Top Header & Breadcrumbs matching screenshot layout */}
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
            <span className="font-semibold text-slate-800">Quote List</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Quote Management
          </h1>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/billing/quote/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" /> +New Quote
          </Link>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Top Bar matching screenshot elements */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
              Select Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                readOnly
                value="1 September, 2026 - 30 September, 2026"
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-9 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
              Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            >
              <option value="All Projects">All Projects</option>
              <option value="Skyline Commercial Complex">
                Skyline Commercial Complex
              </option>
              <option value="Green Valley Heights">Green Valley Heights</option>
              <option value="Apex Industrial Warehouse">
                Apex Industrial Warehouse
              </option>
              <option value="City Bypass Extension">
                City Bypass Extension
              </option>
              <option value="Vanguard IT Park">Vanguard IT Park</option>
              <option value="Lakeview Duplex Villas">
                Lakeview Duplex Villas
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
              Project Type
            </label>
            <select
              value={selectedProjectType}
              onChange={(e) => setSelectedProjectType(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            >
              <option value="All Project Types">All Project Types</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Industrial">Industrial</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>
        </div>

        {/* Action Controls & Export Bar */}
        <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-colors">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
              </button>
              <button className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-colors">
                <FileText className="w-3.5 h-3.5" /> PDF
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 ml-4">
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
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search quotes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
            />
          </div>
        </div>

        {/* Responsive Table Component with Packed Content matching exact columns */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-3.5">ID</th>
                <th className="py-3.5 px-3.5">Order Code</th>
                <th className="py-3.5 px-3.5">Date</th>
                <th className="py-3.5 px-3.5">Project Type</th>
                <th className="py-3.5 px-3.5">Project</th>
                <th className="py-3.5 px-3.5">Customer Name</th>
                <th className="py-3.5 px-3.5">Grand Total</th>
                <th className="py-3.5 px-3.5">Added By</th>
                <th className="py-3.5 px-3.5">Approve</th>
                <th className="py-3.5 px-3.5">Attachment</th>
                <th className="py-3.5 px-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-3.5 font-medium text-indigo-600">
                      {quote.id}
                    </td>
                    <td className="py-3.5 px-3.5 font-mono text-xs text-slate-600">
                      {quote.orderCode}
                    </td>
                    <td className="py-3.5 px-3.5 whitespace-nowrap text-slate-600">
                      {quote.date}
                    </td>
                    <td className="py-3.5 px-3.5">
                      <span className="inline-flex bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-200">
                        {quote.projectType}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 font-medium text-slate-900">
                      {quote.project}
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-800">
                      {quote.customerName}
                    </td>
                    <td className="py-3.5 px-3.5 font-semibold text-slate-900">
                      ${quote.grandTotal.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-600">
                      {quote.addedBy}
                    </td>
                    <td className="py-3.5 px-3.5">
                      {quote.approveStatus === "Approved" ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3.5 text-center">
                      {quote.hasAttachment ? (
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 bg-indigo-50 text-indigo-600 rounded-lg shadow-sm"
                          title="View Attachment"
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3.5">
                      <div className="flex items-center justify-center gap-1">
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
                  <td colSpan={11} className="py-12 text-center text-slate-400">
                    No data available in table matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
            {/* Table Footer Totals Bar */}
            <tfoot>
              <tr className="bg-slate-100/80 border-t border-slate-200 font-bold text-slate-900 text-sm">
                <td
                  colSpan={6}
                  className="py-3.5 px-3.5 text-right uppercase tracking-wider text-xs text-slate-600"
                >
                  TOTAL:
                </td>
                <td className="py-3.5 px-3.5 text-indigo-600">
                  ${totals.grandTotal.toFixed(2)}
                </td>
                <td colSpan={4}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/60">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-800">1</span> to{" "}
            <span className="font-medium text-slate-800">
              {filteredQuotes.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-800">
              {filteredQuotes.length}
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
