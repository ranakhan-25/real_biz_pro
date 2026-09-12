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
<<<<<<< HEAD
  ArrowUpDown,
  User,
} from "lucide-react";

// API থেকে আসা ডেটার TypeScript Interface
=======
  User,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

>>>>>>> origin/dev
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

<<<<<<< HEAD
// API যুক্ত করার আগ পর্যন্ত মক ডাটা (Mock Data)
=======
export interface EmployeeFormData {
  unit: string;
  section: string;
  code: string;
  name: string;
  phoneMobile: string;
  secondaryOfficeNumber: string;
  email: string;
  birthDate: string;
  employeeIdCode: string;
  department: string;
  designation: string;
  salaryGrade: string;
  grossSalary: string;
  maritalStatus: string;
  tin: string;
  shift: string;
  nid: string;
  joiningDate: string;
  leaveDate: string;
  cvFile: File | null;
  imageFile: File | null;
  status: string;
  employeeType: string;
  under: string;
  hasNomineeInfo: boolean;
  hasBankInfo: boolean;
  hasOtherInfo: boolean;
  createUser: boolean;
}

>>>>>>> origin/dev
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
<<<<<<< HEAD
    salaryGrade: "",
    grossSalary: 0,
    cv: "",
=======
    salaryGrade: "-",
    grossSalary: 0,
    cv: "-",
>>>>>>> origin/dev
    under: "Employee",
  },
  {
    id: 2,
    sl: 2,
    image: "",
    employeeCode: "03",
    name: "Rifat Hosain",
    department: "Engineering",
<<<<<<< HEAD
    designation: "Software Engineer",
=======
    designation: "Software Eng.",
>>>>>>> origin/dev
    joiningDate: "01 Feb 2026",
    status: "Active",
    salaryGrade: "Grade 1",
    grossSalary: 22000,
<<<<<<< HEAD
    cv: "",
=======
    cv: "-",
>>>>>>> origin/dev
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
<<<<<<< HEAD
    salaryGrade: "",
    grossSalary: 22000,
    cv: "",
=======
    salaryGrade: "-",
    grossSalary: 22000,
    cv: "-",
>>>>>>> origin/dev
    under: "Employee",
  },
];

export default function EmployeeListPage() {
<<<<<<< HEAD
  // API Integrated States
  const [employees, setEmployees] =
    useState<EmployeeItem[]>(initialEmployeeData);
=======
  const [employees, setEmployees] = useState<EmployeeItem[]>(initialEmployeeData);
>>>>>>> origin/dev
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter States
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");

<<<<<<< HEAD
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
=======
  // Action Dropdown State
  const [activeActionId, setActiveActionId] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<EmployeeFormData>({
    unit: "",
    section: "",
    code: "ST5982822",
    name: "",
    phoneMobile: "",
    secondaryOfficeNumber: "",
    email: "",
    birthDate: "",
    employeeIdCode: "",
    department: "",
    designation: "",
    salaryGrade: "",
    grossSalary: "",
    maritalStatus: "",
    tin: "",
    shift: "",
    nid: "",
    joiningDate: "",
    leaveDate: "",
    cvFile: null,
    imageFile: null,
    status: "",
    employeeType: "",
    under: "",
    hasNomineeInfo: false,
    hasBankInfo: false,
    hasOtherInfo: false,
    createUser: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
    setIsModalOpen(false);
  };

  return (
    // Normal document flow — this app's layout (Topbar + sticky Sidebar,
    // main in normal flow) already handles page scrolling, so this page
    // shouldn't fight it by claiming its own 100vh box.
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-3 flex flex-col font-sans select-none">
      
      {/* Navigation Breadcrumb & Action Header */}
      <div className="flex flex-row items-center justify-between gap-2 mb-2">
        <nav className="text-xs md:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
          <span className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            Home
          </span>
          <span>&gt;</span>
          <span className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            Employee
          </span>
          <span>&gt;</span>
          <span className="text-slate-400 dark:text-slate-500 font-normal">
>>>>>>> origin/dev
            Employee List
          </span>
        </nav>

        <div className="flex items-center gap-2">
<<<<<<< HEAD
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Employee Add
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Employee Import
=======
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm active:scale-95 cursor-pointer">
            <Download className="w-4 h-4" />
            Import CSV
>>>>>>> origin/dev
          </button>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-3 flex flex-col">
        
        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mb-2.5">
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value="">Select Section</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value="">Select Department</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">
              Designation
            </label>
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value="">Select Designation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">
              Shift
            </label>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value="">Select Shift</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">
              Employee Type
            </label>
            <select
              value={selectedEmployeeType}
              onChange={(e) => setSelectedEmployeeType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
            >
              <option value="">Select Employee Type</option>
            </select>
>>>>>>> origin/dev
          </div>
        </div>

        {/* Entries & Search Controls */}
<<<<<<< HEAD
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pt-2 border-t border-slate-100 dark:border-[#131c31]">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
=======
        <div className="flex items-center justify-between gap-2 mb-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-400">
>>>>>>> origin/dev
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
<<<<<<< HEAD
              className="bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
=======
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2 py-0.5 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
>>>>>>> origin/dev
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

<<<<<<< HEAD
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span>Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-3 py-1.5 text-xs bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
=======
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
            <span>Search:</span>
            <input
              type="text"
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 sm:w-56 px-2.5 py-1 text-xs md:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
>>>>>>> origin/dev
            />
          </div>
        </div>

<<<<<<< HEAD
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
=======
        {/* Table View — no forced internal height; grows with content and
            scrolls with the page, matching the rest of the app */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px] md:text-xs border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-3 py-2 text-center w-12">SL</th>
                <th className="px-3 py-2 text-center w-14">IMG</th>
                <th className="px-3 py-2">Code</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Department</th>
                <th className="px-3 py-2">Designation</th>
                <th className="px-3 py-2">Joining Date</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Grade</th>
                <th className="px-3 py-2">Gross</th>
                <th className="px-3 py-2">CV</th>
                <th className="px-3 py-2">Under</th>
                <th className="px-3 py-2 text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {employees.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-3 py-2 text-center text-slate-500 dark:text-slate-400 font-medium">
                    {item.sl}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-200">
                    {item.employeeCode}
                  </td>
                  <td className="px-3 py-2 text-indigo-600 dark:text-indigo-400 font-medium hover:underline cursor-pointer">
                    {item.name}
                  </td>
                  <td className="px-3 py-2 text-slate-600 dark:text-slate-300">
                    {item.department}
                  </td>
                  <td className="px-3 py-2 text-slate-600 dark:text-slate-300">
                    {item.designation}
                  </td>
                  <td className="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {item.joiningDate}
                  </td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-600 dark:text-slate-300">
                    {item.salaryGrade}
                  </td>
                  <td className="px-3 py-2 text-slate-600 dark:text-slate-300">
                    ৳{item.grossSalary.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-slate-600 dark:text-slate-300">
                    {item.cv}
                  </td>
                  <td className="px-3 py-2 text-slate-600 dark:text-slate-300">
                    {item.under}
                  </td>
                  
                  {/* Action Dropdown Column */}
                  <td className="px-3 py-2 text-center relative">
                    <button
                      onClick={() =>
                        setActiveActionId(
                          activeActionId === item.id ? null : item.id
                        )
                      }
                      className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      Action <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {activeActionId === item.id && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setActiveActionId(null)}
                        />
                        <div className="absolute right-3 top-9 z-30 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1 text-left text-xs font-medium">
                          <button className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer">
                            <Eye className="w-3.5 h-3.5 text-cyan-500" /> View Profile
                          </button>
                          <button className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer">
                            <FileText className="w-3.5 h-3.5 text-cyan-500" /> Documents
                          </button>
                          <button className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer">
                            <List className="w-3.5 h-3.5 text-cyan-500" /> Details List
                          </button>
                          <button className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer">
                            <Shield className="w-3.5 h-3.5 text-cyan-500" /> Security
                          </button>
                          <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                          <button className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-amber-600 dark:text-amber-400 cursor-pointer">
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-400 cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </>
                    )}
>>>>>>> origin/dev
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

<<<<<<< HEAD
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
=======
        {/* Pagination Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 shrink-0">
          <div>
            Showing <span className="font-semibold text-slate-700 dark:text-slate-200">1</span> to{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">{employees.length}</span> of{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">{employees.length}</span> entries
          </div>
          <div className="flex items-center gap-1.5">
            <button
              className="flex items-center gap-1 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white font-medium">
              1
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Next <ChevronRight className="w-4 h-4" />
>>>>>>> origin/dev
            </button>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Page Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-600 border-t border-slate-200/60 dark:border-[#131c31] pt-4">
        <div>2026 © Somikoron IT LTD</div>
        <div>Design &amp; Developed by Somikoron IT LTD</div>
      </footer>
=======
      {/* Footer */}
      <footer className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-1 mt-1 shrink-0">
        <div>2026 © Somikoron IT LTD</div>
        <div>Design &amp; Developed by Somikoron IT LTD</div>
      </footer>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-hidden">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Add New Employee
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleModalSubmit}
              className="p-5 overflow-y-auto space-y-4 text-xs md:text-sm flex-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                  >
                    <option value="">Select Option</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Section
                  </label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                  >
                    <option value="">Select Option</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Name<span className="text-rose-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone/Mobile<span className="text-rose-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    name="phoneMobile"
                    required
                    placeholder="Enter Phone/Mobile"
                    value={formData.phoneMobile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email<span className="text-rose-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Department<span className="text-rose-500 ml-0.5">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                  >
                    <option value="">Select Option</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Designation<span className="text-rose-500 ml-0.5">*</span>
                  </label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                  >
                    <option value="">Select Option</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs md:text-sm font-medium rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs md:text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
>>>>>>> origin/dev
    </div>
  );
}
