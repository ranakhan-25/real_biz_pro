"use client";

import type { Item } from "@/app/(admin-dashbord)/dashboard/inventory/products/item-entry/page";
import React, { useState, useEffect, useMemo } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";

// Default item list matching the reference design image
const DEFAULT_ITEMS: Item[] = [
  {
    id: 1,
    code: "M0083",
    name: "name",
    category: "Rod",
    unit: "Set",
    brand: "brand",
    purchasePrice: 0,
    salePrice: 0,
  },
  {
    id: 2,
    code: "M0082",
    name: "ggg",
    category: "Sand",
    unit: "Bag",
    brand: "ABC",
    purchasePrice: 0,
    salePrice: 0,
  },
  {
    id: 3,
    code: "M0081",
    name: "req",
    category: "Rod",
    unit: "Rft",
    brand: "Seven Rings",
    purchasePrice: 0,
    salePrice: 0,
  },
  {
    id: 4,
    code: "M0080",
    name: "item",
    category: "Rod",
    unit: "Sft",
    brand: "Seven Rings",
    purchasePrice: 0,
    salePrice: 0,
  },
  {
    id: 5,
    code: "M0079",
    name: "1st Class Brick",
    category: "Bricks",
    unit: "Pcs",
    brand: "",
    purchasePrice: 0,
    salePrice: 0,
  },
  {
    id: 6,
    code: "P078",
    name: "Gi Wire (16 no.)",
    category: "Others",
    unit: "Kg",
    brand: "",
    purchasePrice: 190,
    salePrice: 0,
  },
  {
    id: 7,
    code: "P077",
    name: "Macha",
    category: "Others",
    unit: "Nos",
    brand: "",
    purchasePrice: 200,
    salePrice: 0,
  },
  {
    id: 8,
    code: "P076",
    name: "Bamboo",
    category: "Others",
    unit: "Nos",
    brand: "",
    purchasePrice: 450,
    salePrice: 0,
  },
  {
    id: 9,
    code: "P075",
    name: "Safety Net",
    category: "Others",
    unit: "Job",
    brand: "",
    purchasePrice: 100000,
    salePrice: 0,
  },
  {
    id: 10,
    code: "P074",
    name: "Tarpaulin",
    category: "Others",
    unit: "Sft",
    brand: "",
    purchasePrice: 4.5,
    salePrice: 0,
  },
  {
    id: 11,
    code: "P073",
    name: "Binding Wire",
    category: "Others",
    unit: "Kg",
    brand: "BSRM",
    purchasePrice: 140,
    salePrice: 150,
  },
];

interface ItemListProps {
  apiEndpoint?: string;
  onEdit?: (item: Item) => void;
  onView?: (item: Item) => void;
}

export default function ItemList({
  apiEndpoint = "/api/items",
  onEdit,
  onView,
}: ItemListProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetching data with fallback mechanism
  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error("API failed");
        const data = await response.json();
        setItems(Array.isArray(data) ? data : DEFAULT_ITEMS);
      } catch (error) {
        console.warn("Using default item data due to fetch error:", error);
        setItems(DEFAULT_ITEMS);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [apiEndpoint]);

  // Delete handler
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Filter items based on Search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [items, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / entriesPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredItems.slice(start, start + entriesPerPage);
  }, [filteredItems, currentPage, entriesPerPage]);

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
                placeholder="Search items..."
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
                <th className="py-3 px-4 w-14">ID</th>
                <th className="py-3 px-4">CODE</th>
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">UNIT</th>
                <th className="py-3 px-4">BRAND</th>
                <th className="py-3 px-4">PURCHASE PRICE</th>
                <th className="py-3 px-4">SALE PRICE</th>
                <th className="py-3 px-4 text-center w-28">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Loading items...
                  </td>
                </tr>
              ) : paginatedItems.length > 0 ? (
                paginatedItems.map((item, index) => {
                  return (
                    <tr
                      key={item.id || index}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">{item.id}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        {item.code}
                      </td>
                      <td className="py-3 px-4 font-medium">{item.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.unit}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.brand || "-"}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.purchasePrice}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.salePrice}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Edit Button */}
                          <button
                            onClick={() => onEdit && onEdit(item)}
                            title="Edit"
                            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white p-1.5 rounded transition-colors shadow-sm"
                          >
                            <FiEdit size={14} />
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete"
                            className="bg-[#ef4444] hover:bg-[#dc2626] text-white p-1.5 rounded transition-colors shadow-sm"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No matching items found.
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
            {filteredItems.length > 0
              ? (currentPage - 1) * entriesPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * entriesPerPage, filteredItems.length)} of{" "}
            {filteredItems.length} entries
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
