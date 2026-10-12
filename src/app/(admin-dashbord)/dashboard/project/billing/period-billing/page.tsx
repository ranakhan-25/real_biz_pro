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

// TypeScript Interface matching exact columns for Period Bill List
interface PeriodBill {
  id: string;
  projectType: string;
  project: string;
  customerName: string;
  code: string;
  ref: string;
  date: string;
  startDate: string;
  endDate: string;
  constructionCost: number;
  serviceCharge: number;
  addedBy: string;
  hasAttachment: boolean;
}

// Rich Dummy Content / Data (Filled with multiple items so no empty spaces exist)
const initialPeriodBills: PeriodBill[] = [
  {
    id: "PB-301",
    projectType: "Commercial",
    project: "Skyline Commercial Complex",
    customerName: "Acme Corporation Ltd",
    code: "PRJ-COM-01",
    ref: "REF-9921",
    date: "2026-09-02",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    constructionCost: 150000.0,
    serviceCharge: 7500.0,
    addedBy: "Shamim Khan",
    hasAttachment: true,
  },
  {
    id: "PB-302",
    projectType: "Residential",
    project: "Green Valley Heights",
    customerName: "Global Tech Solutions",
    code: "PRJ-RES-02",
    ref: "REF-9922",
    date: "2026-09-04",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    constructionCost: 220000.5,
    serviceCharge: 11000.25,
    addedBy: "Tanvir Ahmed",
    hasAttachment: true,
  },
  {
    id: "PB-303",
    projectType: "Industrial",
    project: "Apex Industrial Warehouse",
    customerName: "Nexus Retail Group",
    code: "PRJ-IND-03",
    ref: "REF-9923",
    date: "2026-09-06",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    constructionCost: 95000.0,
    serviceCharge: 4750.0,
    addedBy: "Shamim Khan",
    hasAttachment: false,
  },
  {
    id: "PB-304",
    projectType: "Infrastructure",
    project: "City Bypass Extension",
    customerName: "Apex Logistics Corp",
    code: "PRJ-INF-04",
    ref: "REF-9924",
    date: "2026-09-08",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    constructionCost: 310000.0,
    serviceCharge: 15500.0,
    addedBy: "Rahim Uddin",
    hasAttachment: true,
  },
  {
    id: "PB-305",
    projectType: "Commercial",
    project: "Vanguard IT Park",
    customerName: "Vanguard Media House",
    code: "PRJ-COM-05",
    ref: "REF-9925",
    date: "2026-09-10",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    constructionCost: 180000.0,
    serviceCharge: 9000.0,
    addedBy: "Shamim Khan",
    hasAttachment: true,
  },
  {
    id: "PB-306",
    projectType: "Residential",
    project: "Lakeview Duplex Villas",
    customerName: "Summit Holdings",
    code: "PRJ-RES-06",
    ref: "REF-9926",
    date: "2026-09-10",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    constructionCost: 125000.0,
    serviceCharge: 6250.0,
    addedBy: "Tanvir Ahmed",
    hasAttachment: true,
  },
];

export default function PeriodBillList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and Search Logic
  const filteredPeriodBills = useMemo(() => {
    return initialPeriodBills.filter((bill) => {
      return (
        bill.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.addedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  // Total Calculations for Footer
  const totals = useMemo(() => {
    return filteredPeriodBills.reduce(
      (acc, curr) => {
        acc.constructionCost += curr.constructionCost;
        acc.serviceCharge += curr.serviceCharge;
        return acc;
      },
      { constructionCost: 0, serviceCharge: 0 },
    );
  }, [filteredPeriodBills]);

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
              Period Bill List
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Period Bill Management
          </h1>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/billing/period-bill/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" /> New Period Billing
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
              placeholder="Search period bills..."
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
                <th className="py-3.5 px-3">ID</th>
                <th className="py-3.5 px-3">Project Type</th>
                <th className="py-3.5 px-3">Project</th>
                <th className="py-3.5 px-3">Customer Name</th>
                <th className="py-3.5 px-3">Code</th>
                <th className="py-3.5 px-3">Ref</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Start Date</th>
                <th className="py-3.5 px-3">End Date</th>
                <th className="py-3.5 px-3">Construction Cost</th>
                <th className="py-3.5 px-3">Service Charge</th>
                <th className="py-3.5 px-3">Added By</th>
                <th className="py-3.5 px-3">Attachment</th>
                <th className="py-3.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredPeriodBills.length > 0 ? (
                filteredPeriodBills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-3 font-medium text-indigo-600">
                      {bill.id}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-200">
                        {bill.projectType}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-900">
                      {bill.project}
                    </td>
                    <td className="py-3.5 px-3 text-slate-800">
                      {bill.customerName}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-xs text-slate-600">
                      {bill.code}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-xs text-slate-600">
                      {bill.ref}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-600">
                      {bill.date}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-600">
                      {bill.startDate}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-600">
                      {bill.endDate}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-800">
                      ${bill.constructionCost.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-800">
                      ${bill.serviceCharge.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {bill.addedBy}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {bill.hasAttachment ? (
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
                    <td className="py-3.5 px-3">
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
                  <td colSpan={14} className="py-12 text-center text-slate-400">
                    No data available in table matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
            {/* Table Footer Totals Bar */}
            <tfoot>
              <tr className="bg-slate-100/80 border-t border-slate-200 font-bold text-slate-900 text-sm">
                <td
                  colSpan={9}
                  className="py-3.5 px-3 text-right uppercase tracking-wider text-xs text-slate-600"
                >
                  TOTAL:
                </td>
                <td className="py-3.5 px-3 text-slate-900">
                  ${totals.constructionCost.toFixed(2)}
                </td>
                <td className="py-3.5 px-3 text-indigo-600">
                  ${totals.serviceCharge.toFixed(2)}
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
              {filteredPeriodBills.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-800">
              {filteredPeriodBills.length}
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
