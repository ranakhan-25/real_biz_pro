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
  Briefcase,
  X,
  Upload,
  DollarSign,
} from "lucide-react";

// TypeScript Interface for Work Order Data matching exact columns
interface WorkOrder {
  id: string;
  customerName: string;
  wNo: string;
  refInvoiceNo: string;
  date: string;
  subTotal: number;
  vat: number;
  discount: number;
  grandTotal: number;
  addedBy: string;
  approveStatus: "Approved" | "Pending";
  hasAttachment: boolean;
  project: string;
}

// Packed Dummy Content / Data (No empty spaces)
const initialWorkOrders: WorkOrder[] = [
  {
    id: "WO-9001",
    customerName: "Acme Corporation Ltd",
    wNo: "WO-2026-001",
    refInvoiceNo: "INV-8812",
    date: "2026-09-02",
    subTotal: 15000.0,
    vat: 750.0,
    discount: 250.0,
    grandTotal: 15500.0,
    addedBy: "Shamim Khan",
    approveStatus: "Approved",
    hasAttachment: true,
    project: "E-commerce Platform",
  },
  {
    id: "WO-9002",
    customerName: "Global Tech Solutions",
    wNo: "WO-2026-002",
    refInvoiceNo: "INV-8815",
    date: "2026-09-04",
    subTotal: 28000.5,
    vat: 1400.25,
    discount: 500.75,
    grandTotal: 28900.0,
    addedBy: "Tanvir Ahmed",
    approveStatus: "Approved",
    hasAttachment: true,
    project: "Cloud Infrastructure Setup",
  },
  {
    id: "WO-9003",
    customerName: "Nexus Retail Group",
    wNo: "WO-2026-003",
    refInvoiceNo: "INV-8820",
    date: "2026-09-06",
    subTotal: 9500.0,
    vat: 475.0,
    discount: 100.0,
    grandTotal: 9875.0,
    addedBy: "Shamim Khan",
    approveStatus: "Pending",
    hasAttachment: false,
    project: "POS System Integration",
  },
  {
    id: "WO-9004",
    customerName: "Apex Logistics Corp",
    wNo: "WO-2026-004",
    refInvoiceNo: "INV-8834",
    date: "2026-09-08",
    subTotal: 18400.0,
    vat: 920.0,
    discount: 320.0,
    grandTotal: 19000.0,
    addedBy: "Rahim Uddin",
    approveStatus: "Approved",
    hasAttachment: true,
    project: "Fleet Tracking Dashboard",
  },
  {
    id: "WO-9005",
    customerName: "Vanguard Media House",
    wNo: "WO-2026-005",
    refInvoiceNo: "INV-8841",
    date: "2026-09-10",
    subTotal: 12000.0,
    vat: 600.0,
    discount: 200.0,
    grandTotal: 12400.0,
    addedBy: "Shamim Khan",
    approveStatus: "Pending",
    hasAttachment: true,
    project: "Digital Portal Redesign",
  },
];

export default function WorkOrderList() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(initialWorkOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State for New Work Order Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    wNo: `WO-2026-00${initialWorkOrders.length + 1}`,
    refInvoiceNo: `INV-${Math.floor(8850 + Math.random() * 100)}`,
    date: new Date().toISOString().split("T")[0],
    subTotal: "",
    vat: "",
    discount: "",
    project: "E-commerce Platform",
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

  // Handle Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subTotalNum = parseFloat(formData.subTotal) || 0;
    const vatNum = parseFloat(formData.vat) || 0;
    const discountNum = parseFloat(formData.discount) || 0;
    const grandTotalNum = subTotalNum + vatNum - discountNum;

    const newWorkOrder: WorkOrder = {
      id: `WO-900${workOrders.length + 1}`,
      customerName: formData.customerName || "New Client Ltd",
      wNo: formData.wNo,
      refInvoiceNo: formData.refInvoiceNo,
      date: formData.date,
      subTotal: subTotalNum,
      vat: vatNum,
      discount: discountNum,
      grandTotal: grandTotalNum,
      addedBy: "Shamim Khan",
      approveStatus: formData.approveStatus,
      hasAttachment: formData.hasAttachment,
      project: formData.project,
    };

    setWorkOrders([newWorkOrder, ...workOrders]);
    setIsModalOpen(false);
    // Reset Form
    setFormData({
      customerName: "",
      wNo: `WO-2026-00${workOrders.length + 2}`,
      refInvoiceNo: `INV-${Math.floor(8850 + Math.random() * 100)}`,
      date: new Date().toISOString().split("T")[0],
      subTotal: "",
      vat: "",
      discount: "",
      project: "E-commerce Platform",
      approveStatus: "Pending",
      hasAttachment: false,
    });
  };

  // Filter and Search Logic
  const filteredWorkOrders = useMemo(() => {
    return workOrders.filter((wo) => {
      const matchesSearch =
        wo.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.wNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.refInvoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProject =
        selectedProject === "All" || wo.project === selectedProject;

      return matchesSearch && matchesProject;
    });
  }, [workOrders, searchQuery, selectedProject]);

  // Total Calculations
  const totals = useMemo(() => {
    return filteredWorkOrders.reduce(
      (acc, curr) => {
        acc.subTotal += curr.subTotal;
        acc.vat += curr.vat;
        acc.discount += curr.discount;
        acc.grandTotal += curr.grandTotal;
        return acc;
      },
      { subTotal: 0, vat: 0, discount: 0, grandTotal: 0 },
    );
  }, [filteredWorkOrders]);

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
              Billing
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-800">
              Work Order List
            </span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Work Order Management
          </h1>
        </div>

        {/* Action Button to Open Modal */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" /> New Work Order
          </button>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Section */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Select Date */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Select Date
            </label>
            <input
              type="text"
              defaultValue="1 September, 2026 - 30 September, 2026"
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
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
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer"
              >
                <option value="All">Select value</option>
                <option value="E-commerce Platform">E-commerce Platform</option>
                <option value="Cloud Infrastructure Setup">
                  Cloud Infrastructure Setup
                </option>
                <option value="POS System Integration">
                  POS System Integration
                </option>
                <option value="Fleet Tracking Dashboard">
                  Fleet Tracking Dashboard
                </option>
                <option value="Digital Portal Redesign">
                  Digital Portal Redesign
                </option>
              </select>
              <Briefcase className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
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
              placeholder="Search work orders..."
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
                <th className="py-3.5 px-3.5">Customer Name</th>
                <th className="py-3.5 px-3.5">W/O No</th>
                <th className="py-3.5 px-3.5">Ref Invoice No</th>
                <th className="py-3.5 px-3.5">Date</th>
                <th className="py-3.5 px-3.5">Sub Total</th>
                <th className="py-3.5 px-3.5">VAT</th>
                <th className="py-3.5 px-3.5">Discount</th>
                <th className="py-3.5 px-3.5">Grand Total</th>
                <th className="py-3.5 px-3.5">Added By</th>
                <th className="py-3.5 px-3.5">Approve</th>
                <th className="py-3.5 px-3.5">Attachment</th>
                <th className="py-3.5 px-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredWorkOrders.length > 0 ? (
                filteredWorkOrders.map((wo) => (
                  <tr
                    key={wo.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-3.5 font-medium text-indigo-600">
                      {wo.id}
                    </td>
                    <td className="py-3.5 px-3.5 font-medium text-slate-900">
                      {wo.customerName}
                    </td>
                    <td className="py-3.5 px-3.5 font-mono text-xs text-slate-600">
                      {wo.wNo}
                    </td>
                    <td className="py-3.5 px-3.5 font-mono text-xs text-slate-600">
                      {wo.refInvoiceNo}
                    </td>
                    <td className="py-3.5 px-3.5 whitespace-nowrap text-slate-600">
                      {wo.date}
                    </td>
                    <td className="py-3.5 px-3.5 font-semibold text-slate-800">
                      ${wo.subTotal.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-600">
                      ${wo.vat.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3.5 text-rose-600">
                      -${wo.discount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3.5 font-semibold text-slate-900">
                      ${wo.grandTotal.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-600">
                      {wo.addedBy}
                    </td>
                    <td className="py-3.5 px-3.5">
                      {wo.approveStatus === "Approved" ? (
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
                      {wo.hasAttachment ? (
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
                  <td colSpan={13} className="py-12 text-center text-slate-400">
                    No data available in table matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
            {/* Table Footer Totals Bar */}
            <tfoot>
              <tr className="bg-slate-100/80 border-t border-slate-200 font-bold text-slate-900 text-sm">
                <td
                  colSpan={5}
                  className="py-3.5 px-3.5 text-right uppercase tracking-wider text-xs text-slate-600"
                >
                  TOTAL:
                </td>
                <td className="py-3.5 px-3.5 text-slate-900">
                  ${totals.subTotal.toFixed(2)}
                </td>
                <td className="py-3.5 px-3.5 text-slate-900">
                  ${totals.vat.toFixed(2)}
                </td>
                <td className="py-3.5 px-3.5 text-rose-600">
                  -${totals.discount.toFixed(2)}
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
              {filteredWorkOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-800">
              {filteredWorkOrders.length}
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

      {/* MODERN MODAL FOR NEW WORK ORDER */}
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
                  Add New Work Order
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
                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    placeholder="e.g. Acme Corporation Ltd"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  />
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
                    <option value="E-commerce Platform">
                      E-commerce Platform
                    </option>
                    <option value="Cloud Infrastructure Setup">
                      Cloud Infrastructure Setup
                    </option>
                    <option value="POS System Integration">
                      POS System Integration
                    </option>
                    <option value="Fleet Tracking Dashboard">
                      Fleet Tracking Dashboard
                    </option>
                    <option value="Digital Portal Redesign">
                      Digital Portal Redesign
                    </option>
                  </select>
                </div>

                {/* W/O No */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    W/O No
                  </label>
                  <input
                    type="text"
                    name="wNo"
                    required
                    value={formData.wNo}
                    onChange={handleInputChange}
                    className="bg-slate-50 border border-slate-200 text-slate-600 font-mono text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none shadow-sm"
                  />
                </div>

                {/* Ref Invoice No */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Ref Invoice No
                  </label>
                  <input
                    type="text"
                    name="refInvoiceNo"
                    required
                    value={formData.refInvoiceNo}
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

                {/* Sub Total */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Sub Total ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="number"
                      step="0.01"
                      name="subTotal"
                      required
                      placeholder="0.00"
                      value={formData.subTotal}
                      onChange={handleInputChange}
                      className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-9 pr-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                    />
                  </div>
                </div>

                {/* VAT */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    VAT ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="number"
                      step="0.01"
                      name="vat"
                      required
                      placeholder="0.00"
                      value={formData.vat}
                      onChange={handleInputChange}
                      className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-9 pr-3.5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                    />
                  </div>
                </div>

                {/* Discount */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
                    Discount ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="number"
                      step="0.01"
                      name="discount"
                      required
                      placeholder="0.00"
                      value={formData.discount}
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
                      Supporting Attachment / Document
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
                  Save Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
