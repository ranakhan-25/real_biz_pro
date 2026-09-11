"use client";

import type { Supplier } from "@/types/invetory";
import React, { useState, useEffect, useMemo } from "react";
import {
  FiEdit,
  FiUser,
  FiTrash2,
  FiFileText,
  FiCheck,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from "react-icons/fi";

// Default fallback data in case API request fails or returns nothing
const DEFAULT_SUPPLIERS: Supplier[] = [
  { id: 1, code: "SUP2733131", name: "Riva Steel Mils", under: "Sundry Creditors" },
  {
    id: 2,
    code: "SUP8286898",
    name: "Rifat Thai House",
    company: "Rifat Thai House",
    under: "Sundry Creditors",
  },
  { id: 3, code: "SUP8103073", name: "Mohin Business solution", under: "Sundry Creditors" },
  {
    id: 4,
    code: "SUP8191957",
    name: "Safety First Suppliers",
    phone: "01312345695",
    address: "Motijheel",
    under: "Sundry Creditors",
  },
  {
    id: 5,
    code: "SUP6544555",
    name: "Delta Glass & Aluminium",
    phone: "01312345694",
    address: "Mirpur",
    under: "Sundry Creditors",
  },
  {
    id: 6,
    code: "SUP8156944",
    name: "Prime Tiles",
    phone: "01312345693",
    address: "Mohakhali",
    under: "Sundry Creditors",
  },
  {
    id: 7,
    code: "SUP7215205",
    name: "Modern Sanitary",
    phone: "01312345692",
    address: "Paltan",
    under: "Sundry Creditors",
  },
  {
    id: 8,
    code: "SUP2351579",
    name: "Techno Cables Ltd",
    phone: "01312345691",
    address: "Mirpur",
    under: "Sundry Creditors",
  },
  {
    id: 9,
    code: "SUP2504049",
    name: "Fresh Paint House",
    phone: "01312345690",
    address: "Paltan",
    under: "Sundry Creditors",
  },
  {
    id: 10,
    code: "SUP2252190",
    name: "BuildMart Bangladesh",
    phone: "01312345689",
    address: "Gulshan",
    under: "Sundry Creditors",
  },
  {
    id: 11,
    code: "SUP1122334",
    name: "Alpha Traders",
    phone: "01312345688",
    address: "Banani",
    under: "Sundry Creditors",
  },
  {
    id: 12,
    code: "SUP5566778",
    name: "Beta Enterprise",
    phone: "01312345687",
    address: "Uttara",
    under: "Sundry Creditors",
  },
  {
    id: 13,
    code: "SUP9988776",
    name: "Gamma Steel",
    phone: "01312345686",
    address: "Tejgaon",
    under: "Sundry Creditors",
  },
  {
    id: 14,
    code: "SUP4433221",
    name: "Delta Builders",
    phone: "01312345685",
    address: "Dhanmondi",
    under: "Sundry Creditors",
  },
];

interface SupplierListProps {
  apiEndpoint?: string;
  onEdit?: (supplier: Supplier) => void;
  onView?: (supplier: Supplier) => void;
}

export default function SupplierList({
  apiEndpoint = "/api/suppliers",
  onEdit,
  onView,
}: SupplierListProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetching data from API with fallback mechanism
  useEffect(() => {
    async function fetchSuppliers() {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error("API response failed");
        const data = await response.json();
        setSuppliers(Array.isArray(data) ? data : DEFAULT_SUPPLIERS);
      } catch (error) {
        console.warn("API fetch failed, falling back to default data:", error);
        setSuppliers(DEFAULT_SUPPLIERS);
      } finally {
        setLoading(false);
      }
    }

    fetchSuppliers();
  }, [apiEndpoint]);

  // Filtering suppliers based on search query and selected group
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.phone && item.phone.includes(searchQuery)) ||
        (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesGroup = selectedGroup ? item.under === selectedGroup : true;

      return matchesSearch && matchesGroup;
    });
  }, [suppliers, searchQuery, selectedGroup]);

  // Pagination calculation logic
  const totalPages = Math.ceil(filteredSuppliers.length / entriesPerPage) || 1;
  const paginatedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredSuppliers.slice(start, start + entriesPerPage);
  }, [filteredSuppliers, currentPage, entriesPerPage]);

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 font-sans transition-colors duration-200">
      {/* Filter and Action Bar (Excel, PDF, Search) */}
      <div className="bg-card border border-border rounded p-4 shadow-sm mb-6 space-y-4">
        {/* Chart Of Group Dropdown */}
        <div className="max-w-xs">
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Chart Of Group(Under)
          </label>
          <select
            value={selectedGroup}
            onChange={(e) => {
              setSelectedGroup(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
          >
            <option value="">Select value</option>
            <option value="Sundry Creditors">Sundry Creditors</option>
          </select>
        </div>

        {/* Export Buttons and Search Input */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded text-xs font-medium shadow-sm transition-colors">
              <FiCheck className="text-sm" /> Excel
            </button>
            <button className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded text-xs font-medium shadow-sm transition-colors">
              <FiFileText className="text-sm" /> PDF
            </button>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Search:</span>
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
                placeholder="Search suppliers..."
                className="w-full bg-background border border-input rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Entries Per Page Selector */}
      <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
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
      </div>

      {/* Table Section (Responsive & Readable) */}
      <div className="bg-card border border-border rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[var(--sidebar-foreground)] text-white font-medium select-none">
                <th className="py-3 px-4 w-16">ID</th>
                <th className="py-3 px-4">CODE</th>
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4 hidden md:table-cell">COMPANY</th>
                <th className="py-3 px-4 hidden sm:table-cell">PHONE</th>
                <th className="py-3 px-4 hidden lg:table-cell">EMAIL</th>
                <th className="py-3 px-4 hidden md:table-cell">ADDRESS</th>
                <th className="py-3 px-4">UNDER</th>
                <th className="py-3 px-4 text-center w-28">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-muted-foreground">
                    Loading suppliers...
                  </td>
                </tr>
              ) : paginatedSuppliers.length > 0 ? (
                paginatedSuppliers.map((supplier, index) => {
                  const serialNumber = (currentPage - 1) * entriesPerPage + index + 1;
                  return (
                    <tr key={supplier.id || index} className="hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{serialNumber}</td>
                      <td className="py-3 px-4 font-mono text-xs">{supplier.code}</td>
                      <td className="py-3 px-4 font-medium">{supplier.name}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                        {supplier.company || "-"}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">
                        {supplier.phone || "-"}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell">
                        {supplier.email || "-"}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                        {supplier.address || "-"}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{supplier.under}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Edit Button */}
                          <button
                            onClick={() => onEdit && onEdit(supplier)}
                            title="Edit"
                            className=" p-1.5 rounded transition-colors"
                          >
                            <FiEdit size={13} />
                          </button>
                          {/* View Profile Button */}
                          <button
                            onClick={() => onView && onView(supplier)}
                            title="View"
                            className=" p-1.5 rounded transition-colors"
                          >
                            <FiEye size={13} />
                          </button>
                          {/* Delete Button */}
                          <button title="Delete" className=" p-1.5 rounded transition-colors">
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-muted-foreground">
                    No matching suppliers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-border gap-4 text-xs text-muted-foreground">
          <div>
            Showing {filteredSuppliers.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0} to{" "}
            {Math.min(currentPage * entriesPerPage, filteredSuppliers.length)} of{" "}
            {filteredSuppliers.length} entries
          </div>

          {/* Pagination Page Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft size={14} /> Previous
            </button>

            <div className="flex items-center gap-1 mx-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                          ? "bg-[var(--signal)] text-white"
                          : "border border-border bg-card hover:bg-muted text-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-1 text-muted-foreground">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
