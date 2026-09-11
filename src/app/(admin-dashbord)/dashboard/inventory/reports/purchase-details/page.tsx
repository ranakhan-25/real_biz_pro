"use client";

import type { PurchaseItem } from "@/components/inventory/PurchaseDetailsTable";
import PurchaseDetailsTable from "@/components/inventory/PurchaseDetailsTable";
import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";

const DEFAULT_PURCHASES: PurchaseItem[] = [
  {
    id: 1,
    date: "2026-09-03",
    invoiceNo: "PURCHASE00004",
    supplierName: "Mohin Business solution",
    category: "Rod",
    itemName: "req",
    quantity: 1,
    price: 100,
    subTotal: 100,
    project: "Hena Heights",
  },
  {
    id: 2,
    date: "2026-09-07",
    invoiceNo: "PURCHASE00005",
    supplierName: "BSRM",
    category: "Rod",
    itemName: "20mm Rod",
    quantity: 100,
    price: 88,
    subTotal: 8800,
    project: "Rifat Eyecon City",
  },
  {
    id: 3,
    date: "2026-09-07",
    invoiceNo: "PURCHASE00005",
    supplierName: "BSRM",
    category: "Rod",
    itemName: "16mm Rod",
    quantity: 130,
    price: 82,
    subTotal: 10660,
    project: "Rifat Eyecon City",
  },
  {
    id: 4,
    date: "2026-09-07",
    invoiceNo: "PURCHASE00007",
    supplierName: "Prime Tiles",
    category: "Bricks",
    itemName: "1st Class Brick",
    quantity: 4000,
    price: 13,
    subTotal: 52000,
    project: "Sheba Eyecon Tower",
  },
  {
    id: 5,
    date: "2026-09-07",
    invoiceNo: "PURCHASE00008",
    supplierName: "Safety First Suppliers",
    category: "Bricks",
    itemName: "1st Class Brick",
    quantity: 500,
    price: 12,
    subTotal: 6000,
    project: "Sheba Eyecon Tower",
  },
  {
    id: 6,
    date: "2026-09-07",
    invoiceNo: "PUR7987198",
    supplierName: "Mohin Business solution",
    category: "Sand",
    itemName: "Sand (FM 2.50)",
    quantity: 30,
    price: 50,
    subTotal: 1500,
    project: "Estern 19",
  },
  {
    id: 7,
    date: "2026-09-08",
    invoiceNo: "PUR7987199",
    supplierName: "Mohin Business solution",
    category: "Rod",
    itemName: "name",
    quantity: 1,
    price: 0,
    subTotal: 0,
    project: "Hena Heights",
  },
  {
    id: 8,
    date: "2026-09-08",
    invoiceNo: "PUR7987200",
    supplierName: "Safety First Suppliers",
    category: "Sand",
    itemName: "cbv",
    quantity: 1,
    price: 0,
    subTotal: 0,
    project: "Estern 19",
  },
];

export default function PurchaseDetailsContainer() {
  const [purchases] = useState<PurchaseItem[]>(DEFAULT_PURCHASES);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [selectedDateRange, setSelectedDateRange] = useState(
    "1 September, 2026 - 30 September, 2026",
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  // Filtering Logic
  const filteredPurchases = useMemo(() => {
    return purchases.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.invoiceNo.toLowerCase().includes(query) ||
        item.supplierName.toLowerCase().includes(query) ||
        item.itemName.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesItem = selectedItem ? item.itemName === selectedItem : true;
      const matchesSupplier = selectedSupplier ? item.supplierName === selectedSupplier : true;
      const matchesProject = selectedProject ? item.project === selectedProject : true;

      return matchesSearch && matchesCategory && matchesItem && matchesSupplier && matchesProject;
    });
  }, [purchases, searchQuery, selectedCategory, selectedItem, selectedSupplier, selectedProject]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPurchases.length / entriesPerPage) || 1;
  const paginatedPurchases = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredPurchases.slice(start, start + entriesPerPage);
  }, [filteredPurchases, currentPage, entriesPerPage]);

  // Totals Calculation
  const totalQuantity = useMemo(() => {
    return filteredPurchases.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [filteredPurchases]);

  const totalSubTotal = useMemo(() => {
    return filteredPurchases.reduce((acc, curr) => acc + curr.subTotal, 0);
  }, [filteredPurchases]);

  return (
    <div className="space-y-4 p-6 bg-background text-foreground min-h-screen">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <span className="hover:underline cursor-pointer">Home</span>
        <span>›</span>
        <span className="hover:underline cursor-pointer">Inventory</span>
        <span>›</span>
        <span className="text-foreground font-medium">Purchase Details</span>
      </div>

      {/* Filter Section */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Select Date */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">Select Date</label>
          <input
            type="text"
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="Rod">Rod</option>
            <option value="Bricks">Bricks</option>
            <option value="Sand">Sand</option>
          </select>
        </div>

        {/* Select Item */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">Select Item</label>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select Item</option>
            <option value="20mm Rod">20mm Rod</option>
            <option value="16mm Rod">16mm Rod</option>
            <option value="1st Class Brick">1st Class Brick</option>
            <option value="Sand (FM 2.50)">Sand (FM 2.50)</option>
          </select>
        </div>

        {/* Supplier */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">Supplier</label>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select an option</option>
            <option value="Mohin Business solution">Mohin Business solution</option>
            <option value="BSRM">BSRM</option>
            <option value="Prime Tiles">Prime Tiles</option>
            <option value="Safety First Suppliers">Safety First Suppliers</option>
          </select>
        </div>

        {/* Select Project */}
        <div className="space-y-1 lg:col-span-4">
          <label className="text-xs text-muted-foreground block">
            Select Project <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select Project</option>
            <option value="Hena Heights">Hena Heights</option>
            <option value="Rifat Eyecon City">Rifat Eyecon City</option>
            <option value="Sheba Eyecon Tower">Sheba Eyecon Tower</option>
            <option value="Estern 19">Estern 19</option>
          </select>
        </div>
      </div>

      {/* Action Controls & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm">
            Excel
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm">
            PDF
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground ml-2">
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
              placeholder=""
              className="w-full bg-background border border-input rounded pl-9 pr-3 py-1.5 text-xs focus:outline-none text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Child Component Rendering */}
      <PurchaseDetailsTable
        purchases={filteredPurchases}
        paginatedPurchases={paginatedPurchases}
        currentPage={currentPage}
        entriesPerPage={entriesPerPage}
        totalQuantity={totalQuantity}
        totalSubTotal={totalSubTotal}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
