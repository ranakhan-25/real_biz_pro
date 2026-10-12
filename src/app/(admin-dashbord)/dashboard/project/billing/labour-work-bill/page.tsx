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
  Filter,
  Briefcase,
  X,
  Upload,
  Calendar,
  DollarSign,
} from "lucide-react";

// TypeScript Interface for Labour/Worker Bill Data
interface LabourBill {
  id: string;
  projectType: string;
  project: string;
  titleOfWork: string;
  workerContractorSupplier: string;
  drLedger: string;
  creditLedger: string;
  code: string;
  date: string;
  grandTotal: number;
  paid: number;
  due: number;
  addedBy: string;
  approveStatus: "Approved" | "Pending";
  hasAttachment: boolean;
}

// Packed Dummy Content / Data matching exact columns (No empty spaces)
const initialLabourBills: LabourBill[] = [
  {
    id: "LWB-501",
    projectType: "Civil Construction",
    project: "Skyline Tower Foundation",
    titleOfWork: "Manual Excavation & Earthwork",
    workerContractorSupplier: "Rahim Mia (Lead Mason)",
    drLedger: "Labor Wages Expense",
    creditLedger: "Cash/Bank Clearing Account",
    code: "LAB-1001",
    date: "2026-09-02",
    grandTotal: 12500.0,
    paid: 10000.0,
    due: 2500.0,
    addedBy: "Shamim Khan",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "LWB-502",
    projectType: "Structural Engineering",
    project: "Green Valley Substation",
    titleOfWork: "Rod Binding & Framework Setup",
    workerContractorSupplier: "Karim Uddin Group",
    drLedger: "Subcontractor Labor Ledger",
    creditLedger: "Accounts Payable",
    code: "LAB-1024",
    date: "2026-09-04",
    grandTotal: 24000.5,
    paid: 24000.5,
    due: 0.0,
    addedBy: "Tanvir Ahmed",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "LWB-503",
    projectType: "Finishing & Painting",
    project: "Corporate Headquarters",
    titleOfWork: "Wall Putty, Sanding & Interior Paint",
    workerContractorSupplier: "Jabbar Painters Crew",
    drLedger: "Finishing Labor Account",
    creditLedger: "Cash-in-Hand",
    code: "LAB-1055",
    date: "2026-09-06",
    grandTotal: 15800.0,
    paid: 8000.0,
    due: 7800.0,
    addedBy: "Shamim Khan",
    approveStatus: "Pending",
    hasAttachment: false,
  },
  {
    id: "LWB-504",
    projectType: "Plumbing & Drainage",
    project: "Metro Commercial Complex",
    titleOfWork: "Underground Sewer Line Fitting",
    workerContractorSupplier: "Belal Plumbing Crew",
    drLedger: "Utility Labor Expense",
    creditLedger: "Bank Operating Account",
    code: "LAB-1089",
    date: "2026-09-08",
    grandTotal: 19200.0,
    paid: 12000.0,
    due: 7200.0,
    addedBy: "Rahim Uddin",
    approveStatus: "Approved",
    hasAttachment: true,
  },
  {
    id: "LWB-505",
    projectType: "Electrical Works",
    project: "Skyline Tower Foundation",
    titleOfWork: "Pipe Laying & Cable Pulling",
    workerContractorSupplier: "Salim Electricians Team",
    drLedger: "Electrical Wages Ledger",
    creditLedger: "Cash Clearing Account",
    code: "LAB-1120",
    date: "2026-09-10",
    grandTotal: 14500.0,
    paid: 5000.0,
    due: 9500.0,
    addedBy: "Shamim Khan",
    approveStatus: "Pending",
    hasAttachment: true,
  },
];

export default function LabourWorkerBillList() {
  const [bills, setBills] = useState<LabourBill[]>(initialLabourBills);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [selectedEntity, setSelectedEntity] = useState("All");
  const [selectedLedger, setSelectedLedger] = useState("All");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "Civil Construction",
    project: "Skyline Tower Foundation",
    titleOfWork: "",
    workerContractorSupplier: "",
    drLedger: "Labor Wages Expense",
    creditLedger: "Cash/Bank Clearing Account",
    code: `LAB-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split("T")[0],
    grandTotal: "",
    paid: "",
    approveStatus: "Pending" as "Approved" | "Pending",
    hasAttachment: false,
  });

  // Handle Form Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle New Bill Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const grandTotalNum = parseFloat(formData.grandTotal) || 0;
    const paidNum = parseFloat(formData.paid) || 0;
    const dueNum = Math.max(0, grandTotalNum - paidNum);

    const newBill: LabourBill = {
      id: `LWB-${Math.floor(506 + bills.length)}`,
      projectType: formData.projectType,
      project: formData.project,
      titleOfWork: formData.titleOfWork || "General Labor Work",
      workerContractorSupplier:
        formData.workerContractorSupplier || "Independent Contractor",
      drLedger: formData.drLedger,
      creditLedger: formData.creditLedger,
      code: formData.code,
      date: formData.date,
      grandTotal: grandTotalNum,
      paid: paidNum,
      due: dueNum,
      addedBy: "Shamim Khan",
      approveStatus: formData.approveStatus,
      hasAttachment: formData.hasAttachment,
    };

    setBills([newBill, ...bills]);
    setIsModalOpen(false);
    // Reset Form
    setFormData({
      projectType: "Civil Construction",
      project: "Skyline Tower Foundation",
      titleOfWork: "",
      workerContractorSupplier: "",
      drLedger: "Labor Wages Expense",
      creditLedger: "Cash/Bank Clearing Account",
      code: `LAB-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      grandTotal: "",
      paid: "",
      approveStatus: "Pending",
      hasAttachment: false,
    });
  };

  // Filter and Search Logic
  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const matchesSearch =
        bill.workerContractorSupplier
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        bill.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.titleOfWork.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProject =
        selectedProject === "All" || bill.project === selectedProject;
      const matchesTitle =
        selectedTitle === "All" || bill.titleOfWork === selectedTitle;
      const matchesEntity =
        selectedEntity === "All" ||
        bill.workerContractorSupplier === selectedEntity;
      const matchesLedger =
        selectedLedger === "All" || bill.drLedger === selectedLedger;

      return (
        matchesSearch &&
        matchesProject &&
        matchesTitle &&
        matchesEntity &&
        matchesLedger
      );
    });
  }, [
    bills,
    searchQuery,
    selectedProject,
    selectedTitle,
    selectedEntity,
    selectedLedger,
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
    <div className="min-h-screen bg-slate-50/70 p-6 lg:p-8 font-sans relative">
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
              Labour/Worker
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-800">
              Labour/Worker Bill List
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Labour & Worker Bill Management
          </h1>
        </div>

        {/* Action Button to Open Modal */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" /> New Labour/Worker Bill
          </button>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Section */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* Project */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Project
            </label>
            <div className="relative">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer"
              >
                <option value="All">Select value</option>
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
          <div className="flex flex-col">
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
                <option value="Manual Excavation & Earthwork">
                  Manual Excavation & Earthwork
                </option>
                <option value="Rod Binding & Framework Setup">
                  Rod Binding & Framework Setup
                </option>
                <option value="Wall Putty, Sanding & Interior Paint">
                  Wall Putty, Sanding & Interior Paint
                </option>
                <option value="Underground Sewer Line Fitting">
                  Underground Sewer Line Fitting
                </option>
                <option value="Pipe Laying & Cable Pulling">
                  Pipe Laying & Cable Pulling
                </option>
              </select>
              <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Contractor/Supplier/Worker */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Contractor/Supplier/Worker
            </label>
            <div className="relative">
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer"
              >
                <option value="All">Select One Option</option>
                <option value="Rahim Mia (Lead Mason)">
                  Rahim Mia (Lead Mason)
                </option>
                <option value="Karim Uddin Group">Karim Uddin Group</option>
                <option value="Jabbar Painters Crew">
                  Jabbar Painters Crew
                </option>
                <option value="Belal Plumbing Crew">Belal Plumbing Crew</option>
                <option value="Salim Electricians Team">
                  Salim Electricians Team
                </option>
              </select>
              <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Ledger (Full Width Row) */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-4">
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
                <option value="Labor Wages Expense">Labor Wages Expense</option>
                <option value="Subcontractor Labor Ledger">
                  Subcontractor Labor Ledger
                </option>
                <option value="Finishing Labor Account">
                  Finishing Labor Account
                </option>
                <option value="Utility Labor Expense">
                  Utility Labor Expense
                </option>
                <option value="Electrical Wages Ledger">
                  Electrical Wages Ledger
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
              placeholder="Search labour bills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
            />
          </div>
        </div>

        {/* Responsive Table Component with Packed Content matching all columns */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-3">ID</th>
                <th className="py-3.5 px-3">Project Type</th>
                <th className="py-3.5 px-3">Project</th>
                <th className="py-3.5 px-3">Title/Name of Work</th>
                <th className="py-3.5 px-3">Worker/Contractor/Supplier</th>
                <th className="py-3.5 px-3">Dr Ledger</th>
                <th className="py-3.5 px-3">Credit Ledger</th>
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
                      {bill.workerContractorSupplier}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {bill.drLedger}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {bill.creditLedger}
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
                  <td colSpan={16} className="py-12 text-center text-slate-400">
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

      {/* MODERN MODAL FOR NEW LABOUR/WORKER BILL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  +
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add New Labour / Worker Bill
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form
              onSubmit={handleFormSubmit}
              className="p-6 overflow-y-auto space-y-5 flex-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  >
                    <option value="Civil Construction">
                      Civil Construction
                    </option>
                    <option value="Structural Engineering">
                      Structural Engineering
                    </option>
                    <option value="Finishing & Painting">
                      Finishing & Painting
                    </option>
                    <option value="Plumbing & Drainage">
                      Plumbing & Drainage
                    </option>
                    <option value="Electrical Works">Electrical Works</option>
                  </select>
                </div>

                {/* Project */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Project
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  >
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
                </div>

                {/* Title/Name of Work */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Title/Name of Work
                  </label>
                  <input
                    type="text"
                    name="titleOfWork"
                    required
                    placeholder="e.g. Manual Excavation & Earthwork"
                    value={formData.titleOfWork}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  />
                </div>

                {/* Worker / Contractor / Supplier */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Worker/Contractor/Supplier
                  </label>
                  <input
                    type="text"
                    name="workerContractorSupplier"
                    required
                    placeholder="e.g. Rahim Mia (Lead Mason)"
                    value={formData.workerContractorSupplier}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  />
                </div>

                {/* Dr Ledger */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Dr Ledger (Expense)
                  </label>
                  <select
                    name="drLedger"
                    value={formData.drLedger}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  >
                    <option value="Labor Wages Expense">
                      Labor Wages Expense
                    </option>
                    <option value="Subcontractor Labor Ledger">
                      Subcontractor Labor Ledger
                    </option>
                    <option value="Finishing Labor Account">
                      Finishing Labor Account
                    </option>
                    <option value="Utility Labor Expense">
                      Utility Labor Expense
                    </option>
                    <option value="Electrical Wages Ledger">
                      Electrical Wages Ledger
                    </option>
                  </select>
                </div>

                {/* Credit Ledger */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Credit Ledger (Source)
                  </label>
                  <select
                    name="creditLedger"
                    value={formData.creditLedger}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  >
                    <option value="Cash/Bank Clearing Account">
                      Cash/Bank Clearing Account
                    </option>
                    <option value="Accounts Payable">Accounts Payable</option>
                    <option value="Cash-in-Hand">Cash-in-Hand</option>
                    <option value="Bank Operating Account">
                      Bank Operating Account
                    </option>
                  </select>
                </div>

                {/* Code */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Bill Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    required
                    value={formData.code}
                    onChange={handleInputChange}
                    className="bg-slate-50 border border-slate-200 text-slate-600 font-mono text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none shadow-sm"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  />
                </div>

                {/* Grand Total */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Grand Total ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="number"
                      step="0.01"
                      name="grandTotal"
                      required
                      placeholder="0.00"
                      value={formData.grandTotal}
                      onChange={handleInputChange}
                      className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-9 pr-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                    />
                  </div>
                </div>

                {/* Paid Amount */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Paid Amount ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="number"
                      step="0.01"
                      name="paid"
                      required
                      placeholder="0.00"
                      value={formData.paid}
                      onChange={handleInputChange}
                      className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-9 pr-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                    />
                  </div>
                </div>

                {/* Approval Status */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Approval Status
                  </label>
                  <select
                    name="approveStatus"
                    value={formData.approveStatus}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>

                {/* Attachment Toggle */}
                <div className="flex items-center pt-6">
                  <label className="relative flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasAttachment"
                      checked={formData.hasAttachment}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-slate-400" /> Include
                      Supporting Voucher / Attachment
                    </span>
                  </label>
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all"
                >
                  Save Labour Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
