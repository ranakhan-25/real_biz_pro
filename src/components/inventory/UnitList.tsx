"use client";

import type { Unit } from "@/app/(admin-dashbord)/dashboard/inventory/products/units/page";
import React, { useState, useEffect, useMemo } from "react";
import { FiEdit, FiSearch } from "react-icons/fi";

// Default unit items based on the reference image
const DEFAULT_UNITS: Unit[] = [
  { id: 73, code: "", name: "Kg", conversionUnit: "", rate: "" },
  { id: 74, code: "", name: "Bag", conversionUnit: "", rate: "" },
  { id: 75, code: "", name: "Cft", conversionUnit: "", rate: "" },
  { id: 76, code: "", name: "Litre", conversionUnit: "", rate: "" },
  { id: 77, code: "", name: "Pcs", conversionUnit: "", rate: "" },
  { id: 78, code: "", name: "Sft", conversionUnit: "", rate: "" },
  { id: 79, code: "", name: "Feet", conversionUnit: "", rate: "" },
  { id: 80, code: "", name: "Lit.", conversionUnit: "", rate: "" },
  { id: 81, code: "", name: "Tk.", conversionUnit: "", rate: "" },
  { id: 82, code: "", name: "Goj.", conversionUnit: "", rate: "" },
  { id: 83, code: "UN101", name: "Ton", conversionUnit: "Kg", rate: "1000" },
  {
    id: 84,
    code: "UN102",
    name: "Meter",
    conversionUnit: "Feet",
    rate: "3.28",
  },
];

interface UnitListProps {
  apiEndpoint?: string;
  onEdit?: (unit: Unit) => void;
  onView?: (unit: Unit) => void;
}

export default function UnitList({
  apiEndpoint = "/api/units",
  onEdit,
  onView,
}: UnitListProps) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetching data with fallback mechanism
  useEffect(() => {
    async function fetchUnits() {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error("API failed");
        const data = await response.json();
        setUnits(Array.isArray(data) ? data : DEFAULT_UNITS);
      } catch (error) {
        console.warn("Using default unit data due to fetch error:", error);
        setUnits(DEFAULT_UNITS);
      } finally {
        setLoading(false);
      }
    }

    fetchUnits();
  }, [apiEndpoint]);

  // Filter units based on Search query
  const filteredUnits = useMemo(() => {
    return units.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.conversionUnit.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [units, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUnits.length / entriesPerPage) || 1;
  const paginatedUnits = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredUnits.slice(start, start + entriesPerPage);
  }, [filteredUnits, currentPage, entriesPerPage]);

  return (
    <div className="space-y-4">
      {/* Filter and Search Bar Section */}
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
                placeholder="Search units..."
                className="w-full bg-background border border-input rounded pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-card border border-border rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[var(--sidebar-foreground)] text-white font-medium select-none">
                <th className="py-3 px-4 w-20">ID</th>
                <th className="py-3 px-4">CODE</th>
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">CONVERSION UNIT</th>
                <th className="py-3 px-4">RATE</th>
                <th className="py-3 px-4 text-center w-24">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Loading units...
                  </td>
                </tr>
              ) : paginatedUnits.length > 0 ? (
                paginatedUnits.map((unit, index) => {
                  return (
                    <tr
                      key={unit.id || index}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">{unit.id}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        {unit.code || "-"}
                      </td>
                      <td className="py-3 px-4 font-medium">{unit.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {unit.conversionUnit || "-"}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {unit.rate || "-"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Edit / Update Button (Opens Modal) */}
                          <button
                            onClick={() => onEdit && onEdit(unit)}
                            title="Edit"
                            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white p-1.5 rounded transition-colors shadow-sm"
                          >
                            <FiEdit size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No matching units found.
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
            {filteredUnits.length > 0
              ? (currentPage - 1) * entriesPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * entriesPerPage, filteredUnits.length)} of{" "}
            {filteredUnits.length} entries
          </div>

          {/* Page Number Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-1 mx-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                          currentPage === page
                            ? "bg-[var(--sidebar-foreground)] text-white"
                            : "border border-border bg-card hover:bg-muted text-foreground"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-1 text-muted-foreground">
                        ...
                      </span>
                    );
                  }
                  return null;
                },
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
