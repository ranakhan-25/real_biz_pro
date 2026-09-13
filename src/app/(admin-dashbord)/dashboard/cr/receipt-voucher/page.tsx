/* eslint-disable prettier/prettier */
"use client";

import { useState } from "react";
import {
  ChevronDown,
  Plus,
  FileText,
  FileSpreadsheet,
  Mail,
  MessageCircle,
  Printer,
  Edit,
  Trash2,
  Copy,
  ArrowLeft,
} from "lucide-react";

const menuItems = [
  "Chart of Group",
  "Chart of Accounts",
  "Expense",
  "Bank Reconciliation",
  "Payment Voucher",
  "Journal Voucher",
  "Contra Voucher",
];

const tableRows = [
  {
    sl: 1,
    date: "07 Sept 2026",
    project: "Sheba Eyecon Tower",
    code: "R00014",
    credit: "Sagor kumar",
    debit: "Cash",
    total: "200,000.00",
    ref: "F 4-Booking Money",
    cheque: "",
    comment: "Booking Money-Booking-2902887",
    addedBy: "Admin",
    editedBy: "",
    approve: "All Approvals Completed",
    attachment: "0",
    status: "",
  },
  {
    sl: 2,
    date: "03 Sept 2026",
    project: "Sheba Eyecon Tower",
    code: "R00013",
    credit: "Sagor kumar",
    debit: "Cash",
    total: "122,320.00",
    ref: "F 3-Booking Money",
    cheque: "",
    comment: "Booking Money-Booking-693614",
    addedBy: "Admin",
    editedBy: "",
    approve: "All Approvals Completed",
    attachment: "0",
    status: "",
  },
  {
    sl: 3,
    date: "01 Sept 2026",
    project: "Lake Garden",
    code: "R00012",
    credit: "Mr. Raju raz",
    debit: "Cash",
    total: "28,066,666.66",
    ref: "A1-Installment",
    cheque: "ert454",
    comment: "fgfdg",
    addedBy: "Admin",
    editedBy: "",
    approve: "Admin",
    attachment: "0",
    status: "",
  },
];

export default function ReceiptVoucherPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [entries, setEntries] = useState(10);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Top Navbar */}
      <div className="bg-surface border-b border-border px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-ink-muted hover:text-ink cursor-pointer">Home</span>
          <span className="text-ink-faint mx-1">›</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-1 text-ink font-medium hover:text-ink"
            >
              Accounts Module
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {showMenu && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-surface border border-border rounded-md shadow-lg shadow-black/6 z-50 py-1">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="w-full text-left px-4 py-2 text-[13px] text-ink-muted hover:bg-canvas hover:text-ink"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink font-medium">Receipt Voucher</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-500 text-white text-[13px] font-medium hover:bg-rose-600"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to previous
        </button>
      </div>

      {/* Form Section */}
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Card - Voucher Info */}
          <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden">
            <div className="bg-canvas px-4 py-2.5 border-b border-border">
              <h3 className="text-[13px] font-semibold text-ink">Voucher</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">Project</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
                  <option>Select Project</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">Title</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
                  <option>Select Title</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">Date</label>
                <input
                  type="text"
                  defaultValue="10/09/2026"
                  className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">Voucher No</label>
                <input
                  type="text"
                  defaultValue="R00015"
                  className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Middle Card - Payment Information */}
          <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden">
            <div className="bg-canvas px-4 py-2.5 border-b border-border">
              <h3 className="text-[13px] font-semibold text-ink">Payment Information</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">
                  Select Accounts <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select className="flex-1 border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
                    <option>Select Chart Of Account_id</option>
                  </select>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-md bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 shrink-0"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">
                  Payment Method <span className="text-rose-500">*</span>
                </label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
                  <option>Select Payment Method</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">Cheque/Receipt No</label>
                <input
                  type="text"
                  placeholder="Enter Cheque/Receipt No"
                  className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">
                  Amount <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Amount"
                  className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Right Card - Reference & Additional */}
          <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden">
            <div className="bg-canvas px-4 py-2.5 border-b border-border">
              <h3 className="text-[13px] font-semibold text-ink">Reference & Additional</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">Comment</label>
                <input
                  type="text"
                  placeholder="Enter Comment"
                  className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-[12px] text-ink-muted mb-1">Attachment</label>
                <div className="flex items-center gap-2">
                  <label className="px-3 py-2 border border-border rounded-md text-[13px] bg-canvas text-ink cursor-pointer hover:bg-surface">
                    Choose File
                    <input type="file" className="hidden" />
                  </label>
                  <span className="text-[12px] text-ink-faint">No file chosen</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button — black */}
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="px-8 py-2.5 rounded-md bg-black text-white text-[14px] font-medium shadow-sm shadow-black/6 hover:bg-slate-800"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border mx-4" />

      {/* Filter Section */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Select Date</label>
            <input
              type="text"
              defaultValue="1 September, 2026 - 30 September, 2026"
              className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Credit Accounts</label>
            <select className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
              <option>Select Chart Of Account</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Debit Accounts</label>
            <select className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
              <option>Select Chart Of Account</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Select Project</label>
            <select className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
              <option>Select Project</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Title/Name of Work</label>
            <select className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
              <option>Select Title/Name of Work</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Site</label>
            <select className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
              <option>Select Site</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] text-ink-muted mb-1">Task</label>
            <select className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black">
              <option>Select Task</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-rose-500 text-white text-[12px] font-medium hover:bg-rose-600"
            >
              <FileText className="w-3.5 h-3.5" />
              PDF
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-emerald-500 text-white text-[12px] font-medium hover:bg-emerald-600"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-[13px] text-ink-muted">
            <span>Show</span>
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border border-border rounded px-2 py-1 text-[13px] bg-surface text-ink"
            >
              {[5, 10, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="text-ink-muted">Search:</span>
            <input
              type="text"
              className="border border-border rounded px-2 py-1 text-[13px] w-40 bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead>
                {/* Table header — black */}
                <tr className="bg-black text-white">
                  {[
                    "SL",
                    "DATE",
                    "PROJECT",
                    "CODE",
                    "CREDIT",
                    "DEBIT",
                    "TOTAL",
                    "REF",
                    "CHEQUE/RECEIPT",
                    "COMMENT",
                    "ADDED BY",
                    "EDITED BY",
                    "APPROVE",
                    "ATTACHMENT",
                    "STATUS",
                    "ACTION",
                  ].map((h) => (
                    <th key={h} className="px-2.5 py-2.5 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.sl} className="border-b border-border hover:bg-canvas/70">
                    <td className="px-2.5 py-2.5 text-ink-muted">{row.sl}</td>
                    <td className="px-2.5 py-2.5 whitespace-nowrap text-ink">{row.date}</td>
                    <td className="px-2.5 py-2.5 font-medium text-ink whitespace-nowrap">
                      {row.project}
                    </td>
                    <td className="px-2.5 py-2.5 text-ink">{row.code}</td>
                    <td className="px-2.5 py-2.5 text-sky-500">{row.credit}</td>
                    <td className="px-2.5 py-2.5 text-sky-500">{row.debit}</td>
                    <td className="px-2.5 py-2.5 tabular-nums font-medium text-ink">{row.total}</td>
                    <td className="px-2.5 py-2.5 whitespace-nowrap text-ink">{row.ref}</td>
                    <td className="px-2.5 py-2.5 text-ink">{row.cheque}</td>
                    <td className="px-2.5 py-2.5 max-w-[160px] truncate text-ink">{row.comment}</td>
                    <td className="px-2.5 py-2.5 text-ink">{row.addedBy}</td>
                    <td className="px-2.5 py-2.5 text-ink">{row.editedBy}</td>
                    <td className="px-2.5 py-2.5">
                      <span className="text-emerald-500 text-[11px] font-medium flex items-center gap-0.5">
                        ✓ {row.approve}
                      </span>
                    </td>
                    <td className="px-2.5 py-2.5 text-center text-ink">{row.attachment}</td>
                    <td className="px-2.5 py-2.5 text-ink">{row.status}</td>
                    <td className="px-2.5 py-2.5">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="w-7 h-7 rounded bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600"
                          title="Mail"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="px-2 h-7 rounded bg-ink-muted text-white text-[11px] font-medium hover:opacity-90"
                        >
                          Send mail
                        </button>
                        <button
                          type="button"
                          className="w-7 h-7 rounded bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="w-7 h-7 rounded bg-ink-muted text-white flex items-center justify-center hover:opacity-90"
                          title="Print"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="w-7 h-7 rounded bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="w-7 h-7 rounded bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="w-7 h-7 rounded bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600"
                          title="Copy"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 border-t border-border text-[13px] text-ink-muted">
            <span>Showing 1 to 3 of 3 entries</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="px-2.5 py-1 rounded border border-border opacity-40 cursor-not-allowed text-ink"
              >
                Previous
              </button>
              {/* Active page — black */}
              <button
                type="button"
                className="min-w-[32px] px-2 py-1 rounded font-medium bg-black text-white"
              >
                1
              </button>
              <button
                type="button"
                disabled
                className="px-2.5 py-1 rounded border border-border opacity-40 cursor-not-allowed text-ink"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
