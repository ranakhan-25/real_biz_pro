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
  UserCheck,
  Briefcase,
} from "lucide-react";

// TypeScript Interface for Contractor/Supplier Bill Data
interface ContractorBill {
  id: string;
  projectType: string;
  project: string;
  titleOfWork: string;
  contractorName: string;
  drLedger: string;
  code: string;
  date: string;
  grandTotal: number;
  paid: number;
  due: number;
  addedBy: string;
  approveStatus: "Approved" | "Pending";
  hasAttachment: boolean;
}

// Packed Dummy Content / Data (No empty spaces)
const initialBills: ContractorBill[] = [
  {
    id: "CSB-101",
    projectType: "Civil Construction",
    project: "Skyline Tower Foundation",
    titleOfWork: "Reinforced Steel & Rebar Supply",
    contractorName: "Apex Builders Ltd",
    drLedger: "Materials Expense Account",
    code: "SUP-0012",
    date: "2026-09-02",
    grandTotal: 45000.0,
    paid: 30000.0,
    due: 15000.0,
    addedBy: "Shamim Khan",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "CSB-102",
    projectType: "Electrical Works",
    project: "Green Valley Substation",
    titleOfWork: "High-Voltage Copper Wiring & Conduits",
    contractorName: "PowerTech Solutions",
    drLedger: "Subcontractor Payable",
    code: "SUP-0045",
    date: "2026-09-04",
    grandTotal: 18500.5,
    paid: 18500.5,
    due: 0.0,
    addedBy: "Tanvir Ahmed",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "CSB-103",
    projectType: "Interior Fitout",
    project: "Corporate Headquarters",
    titleOfWork: "Custom Modular Workstations & Partitions",
    contractorName: "Modern Spaces Corp",
    drLedger: "Interior & Fixtures Ledger",
    code: "SUP-0089",
    date: "2026-09-06",
    grandTotal: 27200.0,
    paid: 10000.0,
    due: 17200.0,
    addedBy: "Shamim Khan",
    approveStatus: "Pending",
    hasAttachment: false,
  },
  {
    id: "CSB-104",
    projectType: "HVAC Installation",
    project: "Metro Commercial Complex",
    titleOfWork: "Central Air Ducts & Cooling Units",
    contractorName: "CoolAir Engineering",
    drLedger: "Equipment Installation Account",
    code: "SUP-0112",
    date: "2026-09-08",
    grandTotal: 34000.0,
    paid: 20000.0,
    due: 14000.0,
    addedBy: "Rahim Uddin",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "CSB-105",
    projectType: "Plumbing & Drainage",
    project: "Skyline Tower Foundation",
    titleOfWork: "PVC Piping & Sanitary Systems",
    contractorName: "Global Pipe Works",
    drLedger: "Plumbing Supplies Ledger",
    code: "SUP-0156",
    date: "2026-09-10",
    grandTotal: 12500.0,
    paid: 5000.0,
    due: 7500.0,
    addedBy: "Shamim Khan",
    approveStatus: "Pending",
    hasAttachment: true,
  },
];

export default function ContractorSupplierBillList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContractor, setSelectedContractor] = useState("All");
  const [selectedLedger, setSelectedLedger] = useState("All");
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and Search Logic
  const filteredBills = useMemo(() => {
    return initialBills.filter((bill) => {
      const matchesSearch =
        bill.contractorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.titleOfWork.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesContractor =
        selectedContractor === "All" ||
        bill.contractorName === selectedContractor;
      const matchesLedger =
        selectedLedger === "All" || bill.drLedger === selectedLedger;
      const matchesProject =
        selectedProject === "All" || bill.project === selectedProject;
      const matchesTitle =
        selectedTitle === "All" || bill.titleOfWork === selectedTitle;

      return (
        matchesSearch &&
        matchesContractor &&
        matchesLedger &&
        matchesProject &&
        matchesTitle
      );
    });
  }, [
    searchQuery,
    selectedContractor,
    selectedLedger,
    selectedProject,
    selectedTitle,
  ]);

  // Total Calculations
  const totals = useMemo(() => {
    return filteredBills.reduce(
      (acc, curr) => {
        acc.grandTotal += curr.grandTotal;
        acc.paid += curr.paid;
        acc.due += curr.due;
        return acc;
      },
      { grandTotal: 0, paid: 0, due: 0 },
    );
  }, [filteredBills]);

  return (
    <div className="min-h-screen bg-slate-50/70 p-6 lg:p-8 font-sans">
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
              Contractor/Supplier Bill List
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Contractor & Supplier Bills
          </h1>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/billing/contractor-bill/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" /> New Contractor/Supplier Bill
          </Link>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Section (Strictly matching user form layout layout with zero empty spaces) */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Select Date */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Select Date
            </label>
            <input
              type="text"
              defaultValue="1 September, 2026 - 30 September, 2026"
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
            />
          </div>

          {/* Contractor/Supplier */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Contractor/Supplier
            </label>
            <div className="relative">
              <select
                value={selectedContractor}
                onChange={(e) => setSelectedContractor(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer"
              >
                <option value="All">Select One Option</option>
                <option value="Apex Builders Ltd">Apex Builders Ltd</option>
                <option value="PowerTech Solutions">PowerTech Solutions</option>
                <option value="Modern Spaces Corp">Modern Spaces Corp</option>
                <option value="CoolAir Engineering">CoolAir Engineering</option>
                <option value="Global Pipe Works">Global Pipe Works</option>
              </select>
              <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Ledger */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Ledger
            </label>
            <div className="relative">
              <select
                value={selectedLedger}
                onChange={(e) => setSelectedLedger(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer"
              >
                <option value="All">Select Chart Of Account</option>
                <option value="Materials Expense Account">
                  Materials Expense Account
                </option>
                <option value="Subcontractor Payable">
                  Subcontractor Payable
                </option>
                <option value="Interior & Fixtures Ledger">
                  Interior & Fixtures Ledger
                </option>
                <option value="Equipment Installation Account">
                  Equipment Installation Account
                </option>
                <option value="Plumbing Supplies Ledger">
                  Plumbing Supplies Ledger
                </option>
              </select>
              <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Select Project */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Select Project
            </label>
            <div className="relative">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer"
              >
                <option value="All">Select Project</option>
                <option value="Skyline Tower Foundation">
                  Skyline Tower Foundation
                </option>
                <option value="Green Valley Substation">
                  Green Valley Substation
                </option>
                <option value="Corporate Headquarters">
                  Corporate Headquarters
                </option>
                <option value="Metro Commercial Complex">
                  Metro Commercial Complex
                </option>
              </select>
              <Briefcase className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Title/Name of Work */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Title/Name of Work
            </label>
            <div className="relative">
              <select
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer"
              >
                <option value="All">Select Title/Name of Work</option>
                <option value="Reinforced Steel & Rebar Supply">
                  Reinforced Steel & Rebar Supply
                </option>
                <option value="High-Voltage Copper Wiring & Conduits">
                  High-Voltage Copper Wiring & Conduits
                </option>
                <option value="Custom Modular Workstations & Partitions">
                  Custom Modular Workstations & Partitions
                </option>
                <option value="Central Air Ducts & Cooling Units">
                  Central Air Ducts & Cooling Units
                </option>
                <option value="PVC Piping & Sanitary Systems">
                  PVC Piping & Sanitary Systems
                </option>
              </select>
              <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
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
              placeholder="Search contractor bills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
            />
          </div>
        </div>

        {/* Responsive Table Component with Packed Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-3">ID</th>
                <th className="py-3.5 px-3">Project Type</th>
                <th className="py-3.5 px-3">Project</th>
                <th className="py-3.5 px-3">Title/Name of Work</th>
                <th className="py-3.5 px-3">Contractor Name</th>
                <th className="py-3.5 px-3">Dr Ledger</th>
                <th className="py-3.5 px-3">Code</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Grand Total</th>
                <th className="py-3.5 px-3">Paid</th>
                <th className="py-3.5 px-3">Due</th>
                <th className="py-3.5 px-3">Added By</th>
                <th className="py-3.5 px-3">Approve</th>
                <th className="py-3.5 px-3">Attachment</th>
                <th className="py-3.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredBills.length > 0 ? (
                filteredBills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-3 font-medium text-indigo-600">
                      {bill.id}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {bill.projectType}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-900">
                      {bill.project}
                    </td>
                    <td className="py-3.5 px-3 text-slate-800">
                      {bill.titleOfWork}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-900">
                      {bill.contractorName}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {bill.drLedger}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-xs text-slate-500">
                      {bill.code}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-600">
                      {bill.date}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-900">
                      ${bill.grandTotal.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-emerald-600">
                      ${bill.paid.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-rose-600">
                      ${bill.due.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {bill.addedBy}
                    </td>
                    <td className="py-3.5 px-3">
                      {bill.approveStatus === "Approved" ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
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
                  <td colSpan={15} className="py-12 text-center text-slate-400">
                    No data available in table matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
            {/* Table Footer Totals Bar matching the target structure */}
            <tfoot>
              <tr className="bg-slate-100/80 border-t border-slate-200 font-bold text-slate-900 text-sm">
                <td
                  colSpan={8}
                  className="py-3.5 px-3 text-right uppercase tracking-wider text-xs text-slate-600"
                >
                  TOTAL:
                </td>
                <td className="py-3.5 px-3 text-slate-900">
                  ${totals.grandTotal.toFixed(2)}
                </td>
                <td className="py-3.5 px-3 text-emerald-600">
                  ${totals.paid.toFixed(2)}
                </td>
                <td className="py-3.5 px-3 text-rose-600">
                  ${totals.due.toFixed(2)}
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
              {filteredBills.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-800">
              {filteredBills.length}
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
