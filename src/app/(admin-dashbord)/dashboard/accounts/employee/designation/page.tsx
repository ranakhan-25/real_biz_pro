"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react";

// API থেকে আসা ডেটার TypeScript Interface
interface Designation {
  id: number;
  sl: number;
  department: string;
  designation: string;
}

// API যুক্ত করার আগ পর্যন্ত মক ডাটা (Mock Data)
const initialDesignationData: Designation[] = [
  {
    id: 1,
    sl: 1,
    department: "Business Development",
    designation: "Jr Execuitve",
  },
  { id: 2, sl: 2, department: "Business Development", designation: "HOS" },
  {
    id: 3,
    sl: 3,
    department: "Business Development",
    designation: "Executive",
  },
  { id: 4, sl: 4, department: "Business Development", designation: "TL" },
  { id: 5, sl: 5, department: "Business Development", designation: "GL" },
  {
    id: 6,
    sl: 6,
    department: "Business Development",
    designation: "Co-Ordinator",
  },
  { id: 7, sl: 7, department: "Accounts", designation: "Manager" },
  {
    id: 8,
    sl: 8,
    department: "Sales and Marketing",
    designation: "Team Leader",
  },
  { id: 9, sl: 9, department: "Test", designation: "Messanger" },
  { id: 10, sl: 10, department: "Store", designation: "Coveredvan Helper" },
];

export default function DesignationListPage() {
  // API Integrated States
  const [designations, setDesignations] = useState<Designation[]>(
    initialDesignationData,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  /* 
    TODO: API Integration Example
    useEffect(() => {
      const fetchDesignations = async () => {
        try {
          const res = await fetch('/api/designations');
          const data = await res.json();
          setDesignations(data);
        } catch (error) {
          console.error("Failed to fetch designations", error);
        }
      };
      fetchDesignations();
    }, []);
  */

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-100 p-4 md:p-6 transition-colors duration-200">
      {/* Top Header Section: Breadcrumb & Add Button */}
      <div className="flex items-center justify-between mb-4">
        <nav className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
          <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
            Home
          </span>
          <span>&gt;</span>
          <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
            Employee
          </span>
          <span>&gt;</span>
          <span className="text-slate-400 dark:text-slate-500">
            Designation List
          </span>
        </nav>

        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Designation Add
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-[#080d1a] rounded-xl shadow-lg border border-slate-200 dark:border-[#131c31] p-5 mb-6">
        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span>Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-3 py-1.5 text-xs bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-[#131c31] rounded-lg">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-indigo-600 dark:bg-[#030712] text-white dark:text-slate-300 font-semibold border-b border-indigo-700 dark:border-[#131c31] tracking-wider">
                <th className="p-3 w-16">
                  <div className="flex items-center gap-1">
                    SL
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    DEPARTMENT
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    DESIGNATION
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3 text-center w-28">
                  <div className="flex items-center justify-center gap-1">
                    ACTION
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#131c31]/80 bg-white dark:bg-[#080d1a]">
              {designations.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-[#0e1628] transition-colors"
                >
                  <td className="p-3 text-slate-600 dark:text-slate-400 font-medium">
                    {item.sl}
                  </td>
                  <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                    {item.department}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">
                    {item.designation}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        className="p-1.5 rounded bg-cyan-500 hover:bg-cyan-600 text-white transition-colors shadow-sm"
                        title="Edit Designation"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="p-1.5 rounded bg-rose-500 hover:bg-rose-600 text-white transition-colors shadow-sm"
                        title="Delete Designation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 text-xs text-slate-500 dark:text-slate-400">
          <div>Showing 1 to 10 of 54 entries</div>
          <div className="flex items-center gap-1">
            <button
              className="px-3 py-1.5 rounded border border-slate-200 dark:border-[#1e293b] text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1.5 rounded bg-indigo-600 text-white font-medium">
              1
            </button>
            <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900">
              2
            </button>
            <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900">
              3
            </button>
            <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900">
              4
            </button>
            <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900">
              5
            </button>
            <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900">
              6
            </button>
            <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-600 border-t border-slate-200/60 dark:border-[#131c31] pt-4">
        <div>2026 © Somikoron IT LTD</div>
        <div>Design &amp; Developed by Somikoron IT LTD</div>
      </footer>
    </div>
  );
}
