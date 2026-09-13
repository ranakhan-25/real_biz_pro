"use client";

import React, { useState } from "react";
import {
  Plus,
  Download,
  Pencil,
  Trash2,
  Eye,
  FileText,
  List,
  Shield,
  ArrowUpDown,
  User,
} from "lucide-react";

// API থেকে আসা ডেটার TypeScript Interface
interface EmployeeItem {
  id: number;
  sl: number;
  image?: string;
  employeeCode: string;
  name: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: string;
  salaryGrade?: string;
  grossSalary: number;
  cv?: string;
  under: string;
}

// API যুক্ত করার আগ পর্যন্ত মক ডাটা (Mock Data)
const initialEmployeeData: EmployeeItem[] = [
  {
    id: 1,
    sl: 1,
    image: "",
    employeeCode: "12",
    name: "Mohin Uddin",
    department: "Customs",
    designation: "Tea Boy",
    joiningDate: "30 Jul 2026",
    status: "Active",
    salaryGrade: "",
    grossSalary: 0,
    cv: "",
    under: "Employee",
  },
  {
    id: 2,
    sl: 2,
    image: "",
    employeeCode: "03",
    name: "Rifat Hosain",
    department: "Engineering",
    designation: "Software Engineer",
    joiningDate: "01 Feb 2026",
    status: "Active",
    salaryGrade: "Grade 1",
    grossSalary: 22000,
    cv: "",
    under: "Employee",
  },
  {
    id: 3,
    sl: 3,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    employeeCode: "02",
    name: "Tazmul Reza",
    department: "Engineering",
    designation: "Executive",
    joiningDate: "01 Jul 2024",
    status: "Active",
    salaryGrade: "",
    grossSalary: 22000,
    cv: "",
    under: "Employee",
  },
];

export default function EmployeeListPage() {
  // API Integrated States
  const [employees, setEmployees] =
    useState<EmployeeItem[]>(initialEmployeeData);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter States
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");

  /* 
    TODO: API Integration Example
    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const res = await fetch('/api/employees');
          const data = await res.json();
          setEmployees(data);
        } catch (error) {
          console.error("Failed to fetch employees", error);
        }
      };
      fetchEmployees();
    }, []);
  */

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-100 p-4 md:p-6 transition-colors duration-200">
      {/* Top Header Section: Breadcrumb & Top Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
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
            Employee List
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Employee Add
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Employee Import
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-[#080d1a] rounded-xl shadow-lg border border-slate-200 dark:border-[#131c31] p-5 mb-6">
        {/* Upper Dropdown Filters */}
        <div className="space-y-4 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">
                Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
              >
                <option value="">Select Section</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">
                Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
              >
                <option value="">Select Department</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">
                Designation
              </label>
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
              >
                <option value="">Select Designation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">
                Shift
              </label>
              <select
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
              >
                <option value="">Select Shift</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">
                Employee Type
              </label>
              <select
                value={selectedEmployeeType}
                onChange={(e) => setSelectedEmployeeType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
              >
                <option value="">Select Employee Type</option>
              </select>
            </div>
          </div>
        </div>

        {/* Entries & Search Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pt-2 border-t border-slate-100 dark:border-[#131c31]">
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
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-indigo-600 dark:bg-[#030712] text-white dark:text-slate-300 font-semibold border-b border-indigo-700 dark:border-[#131c31] tracking-wider">
                <th className="p-3 w-12">
                  <div className="flex items-center gap-1">
                    SL{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    IMAGE{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    EMPLOYEE CODE{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    NAME{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    DEPARTMENT{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    DESIGNATION{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    JOINING DATE{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    STATUS{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    SALARY GRADE{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    GROSS SALARY{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    CV{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    UNDER{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
                <th className="p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    ACTION{" "}
                    <ArrowUpDown className="w-3 h-3 text-indigo-200 dark:text-slate-500" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#131c31]/80 bg-white dark:bg-[#080d1a]">
              {employees.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-[#0e1628] transition-colors"
                >
                  <td className="p-3 text-slate-600 dark:text-slate-400 font-medium">
                    {item.sl}
                  </td>
                  <td className="p-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                    {item.employeeCode}
                  </td>
                  <td className="p-3 text-blue-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
                    {item.name}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {item.department}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {item.designation}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {item.joiningDate}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {item.status}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {item.salaryGrade || ""}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {item.grossSalary}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {item.cv || ""}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {item.under}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      {/* Grid Action Buttons */}
                      <div className="grid grid-cols-4 gap-1">
                        <button
                          className="p-1.5 rounded bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
                          title="Documents"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
                          title="List"
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
                          title="Security"
                        >
                          <Shield className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded bg-cyan-500 hover:bg-cyan-600 text-white transition-colors col-span-2"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5 mx-auto" />
                        </button>
                        <button
                          className="p-1.5 rounded bg-rose-500 hover:bg-rose-600 text-white transition-colors col-span-2"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Showing 1 to {employees.length} of {employees.length} entries
          </div>
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
            <button
              className="px-3 py-1.5 rounded border border-slate-200 dark:border-[#1e293b] text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40"
              disabled
            >
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
