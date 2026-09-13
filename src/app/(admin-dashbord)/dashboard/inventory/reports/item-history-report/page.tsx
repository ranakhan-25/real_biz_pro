"use client";

import type { ItemHistory } from "@/components/inventory/ItemHistoryTable";
import ItemHistoryTable from "@/components/inventory/ItemHistoryTable";
import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";

const DEFAULT_ITEMS: ItemHistory[] = [
  {
    id: 1,
    date: "2026-09-01",
    invoiceNo: "INV-2026-001",
    project: "Hena Heights",
    task: "Foundation",
    in: 500,
    out: 0,
    balance: 500,
    unitCost: 85.5,
    subTotal: 42750,
    category: "Rod",
    itemName: "16mm Rod",
    site: "Site A",
  },
  {
    id: 2,
    date: "2026-09-05",
    invoiceNo: "INV-2026-002",
    project: "Hena Heights",
    task: "Casting",
    in: 0,
    out: 150,
    balance: 350,
    unitCost: 85.5,
    subTotal: 12825,
    category: "Rod",
    itemName: "16mm Rod",
    site: "Site A",
  },
];

export default function ItemHistoryContainer() {
  const [items] = useState<ItemHistory[]>(DEFAULT_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [selectedDateRange, setSelectedDateRange] = useState("15 August, 2026 - 13 September, 2026");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedSite, setSelectedSite] = useState("");

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.invoiceNo.toLowerCase().includes(query) ||
        item.project.toLowerCase().includes(query) ||
        item.task.toLowerCase().includes(query);

      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesItem = selectedItem ? item.itemName === selectedItem : true;
      const matchesProject = selectedProject ? item.project === selectedProject : true;

      return matchesSearch && matchesCategory && matchesItem && matchesProject;
    });
  }, [items, searchQuery, selectedCategory, selectedItem, selectedProject]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / entriesPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredItems.slice(start, start + entriesPerPage);
  }, [filteredItems, currentPage, entriesPerPage]);

  return (
    <div className="space-y-4 p-6 bg-background text-foreground min-h-screen">
      
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <span className="hover:underline cursor-pointer">Home</span>
        <span>›</span>
        <span className="hover:underline cursor-pointer">Inventory</span>
        <span>›</span>
        <span className="text-foreground font-medium">Item History Report</span>
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
            <option value="Cement">Cement</option>
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
            <option value="16mm Rod">16mm Rod</option>
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
          </select>
        </div>

        {/* If Task */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">If Task</label>
          <input
            type="text"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            placeholder="Select Task"
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          />
        </div>

        {/* Site */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground block">Site</label>
          <input
            type="text"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            placeholder="Select Site"
            className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Action Controls & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <button className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm">
            Copy
          </button>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm">
            CSV
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm">
            Excel
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm">
            PDF
          </button>
          <button className="bg-slate-500 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm">
            Print
          </button>
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
      <ItemHistoryTable
        items={filteredItems}
        paginatedItems={paginatedItems}
        currentPage={currentPage}
        entriesPerPage={entriesPerPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

    </div>
  );
}