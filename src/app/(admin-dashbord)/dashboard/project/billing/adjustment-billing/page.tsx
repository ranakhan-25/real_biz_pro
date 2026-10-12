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
} from "lucide-react";

// TypeScript Interface matching exact columns for Adjustment List
interface AdjustmentBill {
  id: string;
  projectType: string;
  project: string;
  customerName: string;
  code: string;
  ref: string;
  date: string;
  grandTotal: number;
  addedBy: string;
  hasAttachment: boolean;
}

// Rich Dummy Content / Data (Filled with multiple items so no empty spaces exist)
const initialAdjustmentBills: AdjustmentBill[] = [
  {
    id: "ADJ-501",
    projectType: "Commercial",
    project: "Skyline Commercial Complex",
    customerName: "Acme Corporation Ltd",
    code: "PRJ-COM-01",
    ref: "ADJ-REF-101",
    date: "2026-09-02",
    grandTotal: 12500.0,
    addedBy: "Shamim Khan",
    hasAttachment: true,
  },
  {
    id: "ADJ-502",
    projectType: "Residential",
    project: "Green Valley Heights",
    customerName: "Global Tech Solutions",
    code: "PRJ-RES-02",
    ref: "ADJ-REF-102",
    date: "2026-09-04",
    grandTotal: 8400.5,
    addedBy: "Tanvir Ahmed",
    hasAttachment: true,
  },
  {
    id: "ADJ-503",
    projectType: "Industrial",
    project: "Apex Industrial Warehouse",
    customerName: "Nexus Retail Group",
    code: "PRJ-IND-03",
    ref: "ADJ-REF-103",
    date: "2026-09-06",
    grandTotal: 15200.0,
    addedBy: "Shamim Khan",
    hasAttachment: false,
  },
  {
    id: "ADJ-504",
    projectType: "Infrastructure",
    project: "City Bypass Extension",
    customerName: "Apex Logistics Corp",
    code: "PRJ-INF-04",
    ref: "ADJ-REF-104",
    date: "2026-09-08",
    grandTotal: 22100.0,
    addedBy: "Rahim Uddin",
    hasAttachment: true,
  },
  {
    id: "ADJ-505",
    projectType: "Commercial",
    project: "Vanguard IT Park",
    customerName: "Vanguard Media House",
    code: "PRJ-COM-05",
    ref: "ADJ-REF-105",
    date: "2026-09-10",
    grandTotal: 9600.0,
    addedBy: "Shamim Khan",
    hasAttachment: true,
  },
  {
    id: "ADJ-506",
    projectType: "Residential",
    project: "Lakeview Duplex Villas",
    customerName: "Summit Holdings",
    code: "PRJ-RES-06",
    ref: "ADJ-REF-106",
    date: "2026-09-10",
    grandTotal: 14300.0,
    addedBy: "Tanvir Ahmed",
    hasAttachment: true,
  },
];

export default function AdjustmentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and Search Logic
  const filteredAdjustmentBills = useMemo(() => {
    return initialAdjustmentBills.filter((adj) => {
      return (
        adj.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adj.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adj.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adj.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adj.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adj.addedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adj.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  // Total Calculations for Footer
  const totals = useMemo(() => {
    return filteredAdjustmentBills.reduce(
      (acc, curr) => {
        acc.grandTotal += curr.grandTotal;
        return acc;
      },
      { grandTotal: 0 },
    );
  }, [filteredAdjustmentBills]);

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
            <span className="font-semibold text-slate-800">
              Adjustment List
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Adjustment Bill Management
          </h1>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/billing/adjustment/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" /> +New Adjustment Bill
          </Link>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
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
              placeholder="Search adjustment bills..."
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
                <th className="py-3.5 px-3.5">Project Type</th>
                <th className="py-3.5 px-3.5">Project</th>
                <th className="py-3.5 px-3.5">Customer Name</th>
                <th className="py-3.5 px-3.5">Code</th>
                <th className="py-3.5 px-3.5">Ref</th>
                <th className="py-3.5 px-3.5">Date</th>
                <th className="py-3.5 px-3.5">Grand Total</th>
                <th className="py-3.5 px-3.5">Added By</th>
                <th className="py-3.5 px-3.5">Attachment</th>
                <th className="py-3.5 px-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredAdjustmentBills.length > 0 ? (
                filteredAdjustmentBills.map((adj) => (
                  <tr
                    key={adj.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-3.5 font-medium text-indigo-600">
                      {adj.id}
                    </td>
                    <td className="py-3.5 px-3.5">
                      <span className="inline-flex bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-200">
                        {adj.projectType}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 font-medium text-slate-900">
                      {adj.project}
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-800">
                      {adj.customerName}
                    </td>
                    <td className="py-3.5 px-3.5 font-mono text-xs text-slate-600">
                      {adj.code}
                    </td>
                    <td className="py-3.5 px-3.5 font-mono text-xs text-slate-600">
                      {adj.ref}
                    </td>
                    <td className="py-3.5 px-3.5 whitespace-nowrap text-slate-600">
                      {adj.date}
                    </td>
                    <td className="py-3.5 px-3.5 font-semibold text-indigo-600">
                      ${adj.grandTotal.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-600">
                      {adj.addedBy}
                    </td>
                    <td className="py-3.5 px-3.5 text-center">
                      {adj.hasAttachment ? (
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
                  colSpan={7}
                  className="py-3.5 px-3.5 text-right uppercase tracking-wider text-xs text-slate-600"
                >
                  TOTAL:
                </td>
                <td className="py-3.5 px-3.5 text-indigo-600">
                  ${totals.grandTotal.toFixed(2)}
                </td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/60">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-800">1</span> to{" "}
            <span className="font-medium text-slate-800">
              {filteredAdjustmentBills.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-800">
              {filteredAdjustmentBills.length}
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
