"use client";

import type { MaterialItem } from "@/components/inventory/MaterialComparisonTable";
import MaterialComparisonTable from "@/components/inventory/MaterialComparisonTable";
import React, { useState, useMemo } from "react";

const INITIAL_DATA: MaterialItem[] = [
  {
    id: 1,
    description: "10mm Rod",
    budgetQty: 86363.33,
    budgetAmount: 7563973.04,
    purchaseQty: 10000.0,
    purchaseAmount: 820000.0,
    issueQty: 100.0,
    issueAmount: 8200.0,
    stockQty: 9900.0,
    stockAmount: 811800.0,
    availableQty: 86263.33,
    availableAmount: 7555773.04,
    status: "Under",
  },
  {
    id: 2,
    description: "16mm Rod",
    budgetQty: 33122.57,
    budgetAmount: 2830786.16,
    purchaseQty: 0.0,
    purchaseAmount: 0.0,
    issueQty: 0.0,
    issueAmount: 0.0,
    stockQty: 0.0,
    stockAmount: 0.0,
    availableQty: 33122.57,
    availableAmount: 2830786.16,
    status: "Under",
  },
  {
    id: 3,
    description: "Cement (OPC/ CEM-I)",
    budgetQty: 14650.8,
    budgetAmount: 7156392.0,
    purchaseQty: 0.0,
    purchaseAmount: 0.0,
    issueQty: 0.0,
    issueAmount: 0.0,
    stockQty: 0.0,
    stockAmount: 0.0,
    availableQty: 14650.8,
    availableAmount: 7156392.0,
    status: "Under",
  },
  {
    id: 4,
    description: "Sand (FM 2.50)",
    budgetQty: 35138.42,
    budgetAmount: 3617034.1,
    purchaseQty: 100.0,
    purchaseAmount: 9250.0,
    issueQty: 0.0,
    issueAmount: 0.0,
    stockQty: 100.0,
    stockAmount: 9250.0,
    availableQty: 35138.42,
    availableAmount: 3617034.1,
    status: "Under",
  },
  {
    id: 5,
    description: "Viti Sand",
    budgetQty: 16881.94,
    budgetAmount: 290124.92,
    purchaseQty: 0.0,
    purchaseAmount: 0.0,
    issueQty: 0.0,
    issueAmount: 0.0,
    stockQty: 0.0,
    stockAmount: 0.0,
    availableQty: 16881.94,
    availableAmount: 290124.92,
    status: "Under",
  },
];

export default function MaterialComparisonContainer() {
  const [data] = useState<MaterialItem[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter States
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  // Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = item.description.toLowerCase().includes(query);

      const matchesProject = selectedProject ? true : true; // Project filter logic placeholder
      const matchesTask = selectedTask ? true : true; // Task filter logic placeholder

      return matchesSearch && matchesProject && matchesTask;
    });
  }, [data, searchQuery, selectedProject, selectedTask]);

  // Totals Calculation
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        acc.budgetQty += item.budgetQty;
        acc.budgetAmount += item.budgetAmount;
        acc.purchaseQty += item.purchaseQty;
        acc.purchaseAmount += item.purchaseAmount;
        acc.issueQty += item.issueQty;
        acc.issueAmount += item.issueAmount;
        acc.stockQty += item.stockQty;
        acc.stockAmount += item.stockAmount;
        acc.availableQty += item.availableQty;
        acc.availableAmount += item.availableAmount;
        return acc;
      },
      {
        budgetQty: 0,
        budgetAmount: 0,
        purchaseQty: 0,
        purchaseAmount: 0,
        issueQty: 0,
        issueAmount: 0,
        stockQty: 0,
        stockAmount: 0,
        availableQty: 0,
        availableAmount: 0,
      },
    );
  }, [filteredData]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredData.slice(start, start + entriesPerPage);
  }, [filteredData, currentPage, entriesPerPage]);

  return (
    <div className="w-full max-w-4xl 2xl:max-w-6xl mx-auto space-y-4 p-4 md:p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen transition-colors">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-1.5 text-xs text-indigo-500 dark:text-indigo-400 font-medium mb-1">
        <span className="hover:underline cursor-pointer">Home</span>
        <span className="text-gray-400 dark:text-gray-600">›</span>
        <div className="flex items-center gap-1 hover:underline cursor-pointer">
          <span>Inventory</span>
          <span className="text-[10px]">˅</span>
        </div>
        <span className="text-gray-400 dark:text-gray-600">›</span>
        <span className="text-gray-600 dark:text-gray-300 font-normal">
          Material Comparison Report
        </span>
      </div>

      {/* Filter Card Container */}
      <div className="bg-[#f8f9fa] dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg p-3.5 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Project */}
          <div className="space-y-1">
            <label className="text-xs text-gray-600 dark:text-gray-300 block">
              Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500 text-gray-600 dark:text-gray-300 shadow-sm"
            >
              <option value="">Select value</option>
              <option value="Hena Heights">Hena Heights</option>
              <option value="Rifat Eyecon City">Rifat Eyecon City</option>
            </select>
          </div>

          {/* Task */}
          <div className="space-y-1">
            <label className="text-xs text-gray-600 dark:text-gray-300 block">
              Task
            </label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500 text-gray-600 dark:text-gray-300 shadow-sm"
            >
              <option value="">Select Task</option>
              <option value="Task 1">Task 1</option>
              <option value="Task 2">Task 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Bar (Excel, PDF, Entries & Search) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <button className="bg-[#0f9f59] hover:bg-[#0b8247] text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors shadow-sm">
            Excel
          </button>
          <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors shadow-sm">
            PDF
          </button>

          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 ml-0 sm:ml-2">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 dark:text-gray-300">
            Search:
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-3 py-1 text-xs focus:outline-none focus:border-indigo-500 w-full sm:w-48 text-gray-800 dark:text-gray-100 shadow-sm"
          />
        </div>
      </div>

      {/* Child Component (Table, Totals & Pagination) */}
      <MaterialComparisonTable
        data={filteredData}
        paginatedData={paginatedData}
        currentPage={currentPage}
        entriesPerPage={entriesPerPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        totals={totals}
      />
    </div>
  );
}
