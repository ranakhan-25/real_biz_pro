"use client";

import type { StockTransferItem } from "@/app/(admin-dashbord)/dashboard/inventory/adjustment/stock-transfer/page";
import React, { useState, useEffect, useMemo } from "react";
import { FiEdit, FiTrash2, FiEye, FiSearch } from "react-icons/fi";

// Fallback Default Data in case API is empty or fails
const DEFAULT_STOCK_TRANSFERS: StockTransferItem[] = [
  {
    id: 1,
    code: "ST458921",
    date: "08 Sept 2026",
    fromProject: "Rifat Eyecon City",
    fromSite: "Main Site",
    fromTask: "Foundation",
    toProject: "Estern 19",
    toSite: "Site B",
    toTask: "Finishing",
    contact: "01700000000",
  },
  {
    id: 2,
    code: "ST458922",
    date: "09 Sept 2026",
    fromProject: "Estern 19",
    fromSite: "Site B",
    fromTask: "Wiring",
    toProject: "Rifat Eyecon City",
    toSite: "Main Site",
    toTask: "Installation",
    contact: "01800000000",
  },
];

interface StockTransferTableProps {
  onEdit?: (item: StockTransferItem) => void;
  onView?: (item: StockTransferItem) => void;
}

export default function StockTransferTable({
  onEdit,
  onView,
}: StockTransferTableProps) {
  const [transfers, setTransfers] = useState<StockTransferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetching data from API with fallback mechanism
  useEffect(() => {
    const fetchStockTransfers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/stock-transfers");
        if (!response.ok) {
          throw new Error("API request failed");
        }
        const data = await response.json();
        if (!data || data.length === 0) {
          setTransfers(DEFAULT_STOCK_TRANSFERS);
        } else {
          setTransfers(data);
        }
      } catch (error) {
        console.warn(
          "API unavailable, loading default stock transfer data...",
          error,
        );
        setTransfers(DEFAULT_STOCK_TRANSFERS);
      } finally {
        setLoading(false);
      }
    };

    fetchStockTransfers();
  }, []);

  // Delete handler
  const handleDelete = (id: number) => {
    if (
      confirm("Are you sure you want to delete this stock transfer record?")
    ) {
      setTransfers(transfers.filter((item) => item.id !== id));
    }
  };

  // Search filter logic
  const filteredTransfers = useMemo(() => {
    return transfers.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.code.toLowerCase().includes(query) ||
        item.fromProject.toLowerCase().includes(query) ||
        item.toProject.toLowerCase().includes(query) ||
        item.contact.toLowerCase().includes(query)
      );
    });
  }, [transfers, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTransfers.length / entriesPerPage) || 1;
  const paginatedTransfers = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredTransfers.slice(start, start + entriesPerPage);
  }, [filteredTransfers, currentPage, entriesPerPage]);

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
                placeholder="Search stock transfers..."
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
                <th className="py-3 px-3">CODE</th>
                <th className="py-3 px-3">DATE</th>
                <th className="py-3 px-3">FROM PROJECT</th>
                <th className="py-3 px-3">FROM SITE</th>
                <th className="py-3 px-3">FROM TASK</th>
                <th className="py-3 px-3">TO PROJECT</th>
                <th className="py-3 px-3">TO SITE</th>
                <th className="py-3 px-3">TO TASK</th>
                <th className="py-3 px-3">CONTACT</th>
                <th className="py-3 px-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan={11}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Loading data...
                  </td>
                </tr>
              ) : paginatedTransfers.length > 0 ? (
                paginatedTransfers.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-muted/50 transition-colors align-top whitespace-nowrap"
                  >
                    <td className="py-3 px-3 font-medium">{item.id}</td>
                    <td className="py-3 px-3 font-mono">{item.code}</td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.date}
                    </td>
                    <td className="py-3 px-3 font-medium">
                      {item.fromProject}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.fromSite}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.fromTask}
                    </td>
                    <td className="py-3 px-3 font-medium">{item.toProject}</td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.toSite}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.toTask}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {item.contact}
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
                    colSpan={11}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-border gap-4 text-xs text-muted-foreground">
          <div>
            Showing{" "}
            {filteredTransfers.length > 0
              ? (currentPage - 1) * entriesPerPage + 1
              : 0}{" "}
            to{" "}
            {Math.min(currentPage * entriesPerPage, filteredTransfers.length)}{" "}
            of {filteredTransfers.length} entries
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
