"use client";

import type { StockItem } from "@/components/inventory/StockReportTable";
import StockReportTable from "@/components/inventory/StockReportTable";
import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";

const DEFAULT_STOCKS: StockItem[] = [
  {
    id: 1,
    name: "name",
    opening: 0,
    in: 1.0,
    out: 0,
    unit: "Set",
    closing: 1.0,
    closingAmount: 0.0,
    category: "Rod",
    brand: "BSRM",
  },
  {
    id: 2,
    name: "cbv",
    opening: 0,
    in: 1.0,
    out: 0,
    unit: "Set",
    closing: 1.0,
    closingAmount: 0.0,
    category: "Cement",
    brand: "Holcim",
  },
  {
    id: 3,
    name: "req",
    opening: 0,
    in: 1.0,
    out: 0,
    unit: "Rft",
    closing: 1.0,
    closingAmount: 170.0,
    category: "Rod",
    brand: "BSRM",
  },
  {
    id: 4,
    name: "1st Class Brick",
    opening: 28.0,
    in: 4500.0,
    out: 3500.0,
    unit: "Pcs",
    closing: 1028.0,
    closingAmount: 17300.0,
    category: "Bricks",
    brand: "Local",
  },
  {
    id: 5,
    name: "Plastic Paint (Inside Floor)(Service)",
    opening: 0,
    in: 0,
    out: 0,
    unit: "Job",
    closing: 0.0,
    closingAmount: 0.0,
    category: "Paint",
    brand: "Berger",
  },
  {
    id: 6,
    name: "Bamboo",
    opening: 0,
    in: 1000.0,
    out: 0,
    unit: "Nos",
    closing: 1000.0,
    closingAmount: 450000.0,
    category: "Wood",
    brand: "Local",
  },
  {
    id: 7,
    name: "Main Door Frame",
    opening: 0,
    in: 20.0,
    out: 0,
    unit: "Pcs",
    closing: 20.0,
    closingAmount: 70000.0,
    category: "Door",
    brand: "Hatil",
  },
  {
    id: 8,
    name: "Cement (PCC/ CEM-II)",
    opening: 109.0,
    in: 1500.0,
    out: 0,
    unit: "Bag",
    closing: 1609.0,
    closingAmount: 782320.0,
    category: "Cement",
    brand: "Seven Circle",
  },
  {
    id: 9,
    name: "20mm Rod",
    opening: 0,
    in: 100.0,
    out: 90.0,
    unit: "Kg",
    closing: 10.0,
    closingAmount: 880.0,
    category: "Rod",
    brand: "BSRM",
  },
  {
    id: 10,
    name: "Sand (FM 2.50)",
    opening: 100.0,
    in: 535.0,
    out: 32.0,
    unit: "Cft",
    closing: 603.0,
    closingAmount: 55653.0,
    category: "Sand",
    brand: "Local",
  },
  {
    id: 11,
    name: "16mm Rod",
    opening: 50.0,
    in: 200.0,
    out: 100.0,
    unit: "Kg",
    closing: 150.0,
    closingAmount: 12500.0,
    category: "Rod",
    brand: "Abul Khair",
  },
  {
    id: 12,
    name: "Tiles 2x2",
    opening: 200.0,
    in: 500.0,
    out: 300.0,
    unit: "Pcs",
    closing: 400.0,
    closingAmount: 65000.0,
    category: "Tiles",
    brand: "RAK",
  },
  {
    id: 13,
    name: "IC Conductor",
    opening: 10.0,
    in: 50.0,
    out: 20.0,
    unit: "Pcs",
    closing: 40.0,
    closingAmount: 12000.0,
    category: "Electrical",
    brand: "BRB",
  },
];

export default function StockReportContainer() {
  const [stocks] = useState<StockItem[]>(DEFAULT_STOCKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [selectedDateRange, setSelectedDateRange] = useState(
    "1 September, 2026 - 30 September, 2026",
  );
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Filtering Logic
  const filteredStocks = useMemo(() => {
    return stocks.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.unit.toLowerCase().includes(query);

      const matchesCategory = selectedCategory
        ? item.category === selectedCategory
        : true;
      const matchesBrand = selectedBrand ? item.brand === selectedBrand : true;

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [stocks, searchQuery, selectedCategory, selectedBrand]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredStocks.length / entriesPerPage) || 1;
  const paginatedStocks = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredStocks.slice(start, start + entriesPerPage);
  }, [filteredStocks, currentPage, entriesPerPage]);

  // Totals Calculation
  const totalOpening = useMemo(
    () => filteredStocks.reduce((acc, curr) => acc + curr.opening, 0),
    [filteredStocks],
  );
  const totalIn = useMemo(
    () => filteredStocks.reduce((acc, curr) => acc + curr.in, 0),
    [filteredStocks],
  );
  const totalOut = useMemo(
    () => filteredStocks.reduce((acc, curr) => acc + curr.out, 0),
    [filteredStocks],
  );
  const totalClosing = useMemo(
    () => filteredStocks.reduce((acc, curr) => acc + curr.closing, 0),
    [filteredStocks],
  );
  const totalClosingAmount = useMemo(
    () => filteredStocks.reduce((acc, curr) => acc + curr.closingAmount, 0),
    [filteredStocks],
  );

  return (
    <div className="space-y-4 p-6 bg-background text-foreground min-h-screen">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <span className="hover:underline cursor-pointer">Home</span>
        <span>›</span>
        <span className="hover:underline cursor-pointer">Inventory</span>
        <span>›</span>
        <span className="text-foreground font-medium">Stock Report</span>
      </div>

      {/* Filter Section */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Select Date */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">
            Select Date
          </label>
          <input
            type="text"
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          />
        </div>

        {/* Company */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">Company</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select value</option>
            <option value="RealBiz Ltd">RealBiz Ltd</option>
          </select>
        </div>

        {/* Project */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">Project</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select value</option>
            <option value="Hena Heights">Hena Heights</option>
            <option value="Rifat Eyecon City">Rifat Eyecon City</option>
          </select>
        </div>

        {/* If Task */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">If Task</label>
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select value</option>
            <option value="Task 1">Task 1</option>
          </select>
        </div>

        {/* Site */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">Site</label>
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select value</option>
            <option value="Site A">Site A</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="Rod">Rod</option>
            <option value="Cement">Cement</option>
            <option value="Bricks">Bricks</option>
            <option value="Sand">Sand</option>
            <option value="Door">Door</option>
          </select>
        </div>

        {/* Brand */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">Brand</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="">Select Brand</option>
            <option value="BSRM">BSRM</option>
            <option value="Holcim">Holcim</option>
            <option value="Berger">Berger</option>
            <option value="RAK">RAK</option>
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
              placeholder=""
              className="w-full bg-background border border-input rounded pl-9 pr-3 py-1.5 text-xs focus:outline-none text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Child Component Rendering */}
      <StockReportTable
        stocks={filteredStocks}
        paginatedStocks={paginatedStocks}
        currentPage={currentPage}
        entriesPerPage={entriesPerPage}
        totalOpening={totalOpening}
        totalIn={totalIn}
        totalOut={totalOut}
        totalClosing={totalClosing}
        totalClosingAmount={totalClosingAmount}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
