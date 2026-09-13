"use client";

import type { PurchaseListItem } from "@/app/(admin-dashbord)/dashboard/inventory/purchase/purchase-list/page";
import React, { useState, useMemo } from "react";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiFileText,
  FiDownload,
  FiSearch,
  FiLayers,
} from "react-icons/fi";

const DEFAULT_PURCHASES: PurchaseListItem[] = [
  {
    id: 1,
    projectType: "Real Estate",
    project: "Sheba Eyecon Tower",
    titleOfWork: "-",
    supplierName: "Safety First Suppliers",
    code: "PUR7987200",
    reference: "taz00010",
    creditLedger: "-",
    date: "08 Sept 2026",
    subTotal: 0,
    discount: 0,
    deliveryCharge: 0,
    grandTotal: 0,
    paid: 0,
    due: 0,
    attachment: "-",
    note: "-",
    addedBy: "Admin",
    approvalStatus: "All Approvals Completed",
    approver: "Admin",
  },
  {
    id: 2,
    projectType: "Office",
    project: "Rifat Eyecon City",
    titleOfWork: "-",
    supplierName: "Mohin Business solution",
    code: "PUR7987199",
    reference: "taz00016",
    creditLedger: "-",
    date: "08 Sept 2026",
    subTotal: 0,
    discount: 0,
    deliveryCharge: 0,
    grandTotal: 0,
    paid: 0,
    due: 0,
    attachment: "-",
    note: "-",
    addedBy: "Admin",
    approvalStatus: "All Approvals Completed",
    approver: "Admin",
  },
];

interface PurchaseListTableProps {
  onEdit?: (item: PurchaseListItem) => void;
  onView?: (item: PurchaseListItem) => void;
}

export default function PurchaseListTable({
  onEdit,
  onView,
}: PurchaseListTableProps) {
  const [purchases, setPurchases] =
    useState<PurchaseListItem[]>(DEFAULT_PURCHASES);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this purchase?")) {
      setPurchases(purchases.filter((item) => item.id !== id));
    }
  };

  const filteredPurchases = useMemo(() => {
    return purchases.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.code.toLowerCase().includes(query) ||
        item.supplierName.toLowerCase().includes(query) ||
        item.project.toLowerCase().includes(query)
      );
    });
  }, [purchases, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="bg-card border border-border rounded p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Exporting to Excel...")}
              className="flex items-center gap-1.5 bg-[#10b981] text-white px-3.5 py-1.5 rounded text-xs font-medium"
            >
              <FiDownload className="text-sm" /> Excel
            </button>
            <button
              onClick={() => alert("Exporting to PDF...")}
              className="flex items-center gap-1.5 bg-[#ef4444] text-white px-3.5 py-1.5 rounded text-xs font-medium"
            >
              <FiFileText className="text-sm" /> PDF
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Search:
            </span>
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <FiSearch size={14} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search purchase..."
                className="w-full bg-background border border-input rounded pl-9 pr-3 py-1.5 text-xs text-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-card border border-border rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[var(--sidebar-foreground)] text-white font-medium select-none whitespace-nowrap">
                <th className="py-3 px-3">ID</th>
                <th className="py-3 px-3">PROJECT TYPE</th>
                <th className="py-3 px-3">PROJECT</th>
                <th className="py-3 px-3">SUPPLIER NAME</th>
                <th className="py-3 px-3">CODE</th>
                <th className="py-3 px-3">GRAND TOTAL</th>
                <th className="py-3 px-3">PAID</th>
                <th className="py-3 px-3">DUE</th>
                <th className="py-3 px-3">APPROVAL LAYER</th>
                <th className="py-3 px-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPurchases.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/50 transition-colors align-top whitespace-nowrap"
                >
                  <td className="py-3 px-3 font-medium">{item.id}</td>
                  <td className="py-3 px-3 text-muted-foreground">
                    {item.projectType}
                  </td>
                  <td className="py-3 px-3 font-medium">{item.project}</td>
                  <td className="py-3 px-3 font-medium">{item.supplierName}</td>
                  <td className="py-3 px-3 font-mono">{item.code}</td>
                  <td className="py-3 px-3 font-medium">{item.grandTotal}</td>
                  <td className="py-3 px-3">{item.paid}</td>
                  <td className="py-3 px-3">{item.due}</td>
                  <td className="py-3 px-3 text-xs text-emerald-600 font-medium">
                    <div>✓ All Approvals Completed</div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() =>
                          alert(`Material Usages for ${item.code}`)
                        }
                        className="flex items-center gap-1 bg-[#00bcd4] text-white px-2 py-1 rounded text-[10px] font-medium w-full justify-center"
                      >
                        <FiLayers size={10} /> Material Usages
                      </button>
                      <div className="flex items-center gap-1 w-full justify-center">
                        {/* Edit Button */}
                        <button
                          onClick={() => onEdit && onEdit(item)}
                          title="Edit"
                          className="bg-[#0ea5e9] text-white p-1 rounded shadow-sm hover:opacity-90"
                        >
                          <FiEdit size={12} />
                        </button>
                        {/* View Button */}
                        <button
                          onClick={() => onView && onView(item)}
                          title="View"
                          className="bg-[#8b5cf6] text-white p-1 rounded shadow-sm hover:opacity-90"
                        >
                          <FiEye size={12} />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                          className="bg-[#ef4444] text-white p-1 rounded shadow-sm hover:opacity-90"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
