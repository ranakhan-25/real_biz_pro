"use client";

import type { MaterialUsageItem } from "@/app/(admin-dashbord)/dashboard/inventory/adjustment/material-usage/page";
import React, { useState, useEffect, useMemo } from "react";
import { FiEdit, FiTrash2, FiEye, FiSearch } from "react-icons/fi";

// Fallback Default Data matching the reference screenshot
const DEFAULT_MATERIAL_USAGES: MaterialUsageItem[] = [
  {
    id: 1,
    projectType: "Office",
    project: "Rifat Eyecon City",
    titleOfWork: "-",
    task: "-",
    workerStaffName: "Tazmul Reza",
    code: "MU8733021",
    purchaseGrn: "PUR7987198, GRN7501856",
    date: "07 Sept 2026",
    subTotal: 1602,
    grandTotal: 1602,
    addedBy: "Admin",
    attachment: "-",
    approvalStatus: "All Approvals Completed",
    approver: "Admin",
  },
  {
    id: 2,
    projectType: "Office",
    project: "Rifat Eyecon City",
    titleOfWork: "-",
    task: "-",
    workerStaffName: "-",
    code: "MU8733020",
    purchaseGrn: "PURCHASE00008",
    date: "07 Sept 2026",
    subTotal: 6000,
    grandTotal: 6000,
    addedBy: "Admin",
    attachment: "-",
    approvalStatus: "All Approvals Completed",
    approver: "Admin",
  },
  {
    id: 3,
    projectType: "Office",
    project: "Rifat Eyecon City",
    titleOfWork: "-",
    task: "-",
    workerStaffName: "-",
    code: "MU8733019",
    purchaseGrn: "PURCHASE00007",
    date: "07 Sept 2026",
    subTotal: 13000,
    grandTotal: 13000,
    addedBy: "Tazmul Reza",
    attachment: "-",
    approvalStatus: "All Approvals Completed",
    approver: "Rifat Hosain\nAdmin",
  },
  {
    id: 4,
    projectType: "Office",
    project: "Rifat Eyecon City",
    titleOfWork: "-",
    task: "-",
    workerStaffName: "Tazmul Reza",
    code: "MU8733018",
    purchaseGrn: "PURCHASE00007",
    date: "07 Sept 2026",
    subTotal: 13000,
    grandTotal: 13000,
    addedBy: "Admin",
    attachment: "-",
    approvalStatus: "All Approvals Completed",
    approver: "Admin",
  },
  {
    id: 5,
    projectType: "Office",
    project: "Rifat Eyecon City",
    titleOfWork: "-",
    task: "-",
    workerStaffName: "Tazmul Reza",
    code: "MU7997797",
    purchaseGrn: "PURCHASE00007",
    date: "07 Sept 2026",
    subTotal: 13000,
    grandTotal: 13000,
    addedBy: "Admin",
    attachment: "-",
    approvalStatus: "All Approvals Completed",
    approver: "Admin",
  },
  {
    id: 6,
    projectType: "Office",
    project: "Rifat Eyecon City",
    titleOfWork: "-",
    task: "-",
    workerStaffName: "-",
    code: "MU00006",
    purchaseGrn: "PURCHASE00005",
    date: "07 Sept 2026",
    subTotal: 17760,
    grandTotal: 17760,
    addedBy: "Tazmul Reza",
    attachment: "-",
    approvalStatus: "All Approvals Completed",
    approver: "Rifat Hosain\nAdmin",
  },
  {
    id: 7,
    projectType: "Real Estate",
    project: "Estern 19",
    titleOfWork: "-",
    task: "-",
    workerStaffName: "-",
    code: "MU00005",
    purchaseGrn: "PUR0017",
    date: "03 Sept 2026",
    subTotal: 82,
    grandTotal: 82,
    addedBy: "Admin",
    attachment: "-",
    approvalStatus: "All Approvals Completed",
    approver: "Admin",
  },
];

interface MaterialUsageTableProps {
  onEdit?: (item: MaterialUsageItem) => void;
  onView?: (item: MaterialUsageItem) => void;
}

export default function MaterialUsageTable({
  onEdit,
  onView,
}: MaterialUsageTableProps) {
  const [usages, setUsages] = useState<MaterialUsageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetching data from API with default fallback
  useEffect(() => {
    const fetchMaterialUsages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/material-usages");
        if (!response.ok) {
          throw new Error("Failed to fetch API");
        }
        const data = await response.json();
        if (!data || data.length === 0) {
          setUsages(DEFAULT_MATERIAL_USAGES);
        } else {
          setUsages(data);
        }
      } catch (error) {
        console.warn(
          "API unavailable, loading default material usage data...",
          error,
        );
        setUsages(DEFAULT_MATERIAL_USAGES);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialUsages();
  }, []);

  // Delete handler
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this material usage?")) {
      setUsages(usages.filter((item) => item.id !== id));
    }
  };

  // Filter logic
  const filteredUsages = useMemo(() => {
    return usages.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.code.toLowerCase().includes(query) ||
        item.project.toLowerCase().includes(query) ||
        item.purchaseGrn.toLowerCase().includes(query) ||
        item.workerStaffName.toLowerCase().includes(query)
      );
    });
  }, [usages, searchQuery]);

  // Totals calculation
  const totalSubTotal = filteredUsages.reduce(
    (acc, curr) => acc + curr.subTotal,
    0,
  );
  const totalGrandTotal = filteredUsages.reduce(
    (acc, curr) => acc + curr.grandTotal,
    0,
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsages.length / entriesPerPage) || 1;
  const paginatedUsages = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredUsages.slice(start, start + entriesPerPage);
  }, [filteredUsages, currentPage, entriesPerPage]);

  return (
    <div className="space-y-4">
      {/* Control Bar (Entries & Search) */}
      <div className="bg-card border border-border rounded p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-card border border-input rounded px-2 py-1 text-foreground text-xs focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search material usage..."
                className="w-full bg-background border border-input rounded pl-9 pr-3 py-1.5 text-xs focus:outline-none text-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-card border border-border rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[var(--sidebar-foreground)] text-white font-medium select-none whitespace-nowrap">
                <th className="py-3 px-3">ID</th>
                <th className="py-3 px-3">PROJECT TYPE</th>
                <th className="py-3 px-3">PROJECT</th>
                <th className="py-3 px-3">TITLE/NAME OF WORK</th>
                <th className="py-3 px-3">TASK</th>
                <th className="py-3 px-3">WORKER/STAFF NAME</th>
                <th className="py-3 px-3">CODE</th>
                <th className="py-3 px-3">PURCHASE/GRN</th>
                <th className="py-3 px-3">DATE</th>
                <th className="py-3 px-3">SUB TOTAL</th>
                <th className="py-3 px-3">GRAND TOTAL</th>
                <th className="py-3 px-3">ADDED BY</th>
                <th className="py-3 px-3">ATTACHMENT</th>
                <th className="py-3 px-3">APPROVAL</th>
                <th className="py-3 px-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan={15}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Loading data...
                  </td>
                </tr>
              ) : paginatedUsages.length > 0 ? (
                paginatedUsages.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-muted/50 transition-colors align-top whitespace-nowrap"
                  >
                    <td className="py-3 px-3 font-medium">{item.id}</td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.projectType}
                    </td>
                    <td className="py-3 px-3 font-medium">{item.project}</td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.titleOfWork}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.task}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.workerStaffName}
                    </td>
                    <td className="py-3 px-3 font-mono">{item.code}</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">
                      {item.purchaseGrn}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.date}
                    </td>
                    <td className="py-3 px-3">{item.subTotal.toFixed(2)}</td>
                    <td className="py-3 px-3 font-medium">
                      {item.grandTotal.toFixed(2)}
                    </td>
                    <td className="py-3 px-3">{item.addedBy}</td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.attachment}
                    </td>
                    <td className="py-3 px-3 text-xs leading-relaxed text-emerald-600 font-medium">
                      <div>✓ All Approvals Completed</div>
                      <div className="text-muted-foreground">
                        ✓ {item.approver.replace("\n", ", ")}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {/* View Button */}
                        <button
                          onClick={() => onView && onView(item)}
                          title="View"
                          className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white p-1.5 rounded shadow-sm transition-colors"
                        >
                          <FiEye size={12} />
                        </button>
                        {/* Edit Button */}
                        <button
                          onClick={() => onEdit && onEdit(item)}
                          title="Edit"
                          className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white p-1.5 rounded shadow-sm transition-colors"
                        >
                          <FiEdit size={12} />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                          className="bg-[#ef4444] hover:bg-[#dc2626] text-white p-1.5 rounded shadow-sm transition-colors"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={15}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>

            {/* Total Footer Row */}
            <tfoot>
              <tr className="bg-muted/50 font-bold border-t-2 border-border text-foreground">
                <td colSpan={9} className="py-3 px-3 uppercase">
                  Total
                </td>
                <td className="py-3 px-3">{totalSubTotal.toFixed(2)}</td>
                <td className="py-3 px-3">{totalGrandTotal.toFixed(2)}</td>
                <td colSpan={4}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-border gap-4 text-xs text-muted-foreground">
          <div>
            Showing{" "}
            {filteredUsages.length > 0
              ? (currentPage - 1) * entriesPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * entriesPerPage, filteredUsages.length)}{" "}
            of {filteredUsages.length} entries
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded border border-border bg-card hover:bg-muted disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 bg-[var(--sidebar-foreground)] text-white rounded font-medium">
              {currentPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 rounded border border-border bg-card hover:bg-muted disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
