"use client";

import React, { useState } from "react";
import CustomerModalPage from "../model/CustomerModalPage";
import {
  Users,
  FileSpreadsheet,
  FileText,
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  ArrowUpDown,
} from "lucide-react";

interface Customer {
  id: number;
  code: string;
  name: string;
  business: string;
  mobile: string;
  email: string;
  nid: string;
  under: number;
}

const customerData: Customer[] = [
  {
    id: 1,
    code: "CUS7515110",
    name: "Sagor kumar",
    business: "-",
    mobile: "01733195160",
    email: "-",
    nid: "-",
    under: 790,
  },
  {
    id: 2,
    code: "L260829-0016",
    name: "Mr. Raju raz",
    business: "-",
    mobile: "+8801612233445",
    email: "-",
    nid: "-",
    under: 789,
  },
  {
    id: 3,
    code: "CUS5818120",
    name: "Vertex Group",
    business: "-",
    mobile: "01312345685",
    email: "-",
    nid: "-",
    under: 778,
  },
  {
    id: 4,
    code: "CUS5294070",
    name: "Lakeview Developers",
    business: "-",
    mobile: "01312345684",
    email: "-",
    nid: "-",
    under: 777,
  },
  {
    id: 5,
    code: "CUS5987537",
    name: "Cityscape Holdings",
    business: "-",
    mobile: "01312345683",
    email: "-",
    nid: "-",
    under: 776,
  },
  {
    id: 6,
    code: "CUS7701265",
    name: "Meghna Properties",
    business: "-",
    mobile: "01312345682",
    email: "-",
    nid: "-",
    under: 775,
  },
  {
    id: 7,
    code: "CUS4597641",
    name: "Eastern Developers",
    business: "-",
    mobile: "01312345681",
    email: "-",
    nid: "-",
    under: 774,
  },
  {
    id: 8,
    code: "CUS8332481",
    name: "Urban Living Ltd",
    business: "-",
    mobile: "01312345680",
    email: "-",
    nid: "-",
    under: 773,
  },
  {
    id: 9,
    code: "CUS6853202",
    name: "Prime Housing",
    business: "-",
    mobile: "01312345679",
    email: "-",
    nid: "-",
    under: 772,
  },
];

export default function CustomerListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-100 p-4 md:p-6 transition-colors duration-200">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2 font-medium">
        <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
          Home
        </span>
        <span>&gt;</span>
        <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
          Contact
        </span>
        <span>&gt;</span>
        <span className="text-slate-400 dark:text-slate-500">
          Customer List
        </span>
      </nav>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-[#080d1a] rounded-xl shadow-lg border border-slate-200 dark:border-[#131c31] p-5 mb-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Customer List
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage your customers and their information
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-rose-500/30 text-rose-600 dark:text-rose-400 dark:bg-rose-950/20 hover:bg-rose-50 dark:hover:bg-rose-900/40 transition-colors">
              <FileText className="w-4 h-4" />
              PDF
            </button>

            {/* Customer Add Button & Modal */}
            <div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Customer Add
              </button>

              {/* Modal Component (isOpen প্রপ্স সহ) */}
              <CustomerModalPage
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-200"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, code, mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-[#131c31] rounded-lg">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-[#030712] text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-[#131c31] tracking-wider">
                <th className="p-3 w-8 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 dark:border-slate-800 accent-blue-600 dark:bg-black"
                  />
                </th>
                <th className="p-3">ID</th>
                <th className="p-3">CODE</th>
                <th className="p-3">NAME</th>
                <th className="p-3">BUSINESS</th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    <ArrowUpDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    MOBILE
                  </div>
                </th>
                <th className="p-3">EMAIL</th>
                <th className="p-3">NID/BIRTH CERTIFICATE/PASSPORT</th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    <ArrowUpDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    UNDER
                  </div>
                </th>
                <th className="p-3 text-center">IMAGE</th>
                <th className="p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <ArrowUpDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    ACTION
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#131c31]/80 bg-white dark:bg-[#080d1a]">
              {customerData.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-slate-50 dark:hover:bg-[#0e1628] transition-colors"
                >
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 dark:border-slate-800 accent-blue-600 dark:bg-black"
                    />
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {customer.id}
                  </td>
                  <td className="p-3 font-medium text-slate-800 dark:text-slate-200">
                    {customer.code}
                  </td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium">
                    {customer.name}
                  </td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">
                    {customer.business}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {customer.mobile}
                  </td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">
                    {customer.email}
                  </td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">
                    {customer.nid}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {customer.under}
                  </td>
                  <td className="p-3 text-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center border border-blue-500/20">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm">
                        <User className="w-3 h-3" />
                      </button>
                      <button className="p-1.5 rounded bg-amber-500 hover:bg-amber-600 text-white transition-colors shadow-sm">
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button className="p-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-sm">
                        <Trash2 className="w-3 h-3" />
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
          <div>Showing 1 to 9 of 9 entries</div>
          <div className="flex items-center gap-1">
            <button
              className="p-1 rounded border border-slate-200 dark:border-[#1e293b] text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white font-medium">
              1
            </button>
            <button
              className="p-1 rounded border border-slate-200 dark:border-[#1e293b] text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40"
              disabled
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-600 border-t border-slate-200/60 dark:border-[#131c31] pt-4">
        <div>© 2026 Somikoron IT LTD</div>
        <div>Design &amp; Developed by Somikoron IT LTD</div>
      </footer>
    </div>
  );
}