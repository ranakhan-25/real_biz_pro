"use client";

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  FileSpreadsheet, 
  FileText, 
  User, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  Calendar,
  Printer
} from "lucide-react";

// Types matching the required data structure for API integration readiness
interface LedgerEntry {
  id: number;
  date: string;
  project: string;
  description: string;
  voucherNo: string;
  debit: number;
  credit: number;
  balance: number;
  note?: string;
}

interface Supplier {
  id: number;
  code: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  under: string;
  creditLimit?: number;
  dueDate?: string;
  image?: string;
  ledger?: LedgerEntry[];
}

// Initial mock data with 14 suppliers total
const initialSuppliers: Supplier[] = [
  {
    id: 1,
    code: "SUP2733131",
    name: "Riva Steel Mils",
    company: "Riva Steel Mils Ltd",
    phone: "01711223344",
    email: "riva@steel.com",
    address: "Tejgaon, Dhaka",
    under: "Sundry Creditors",
    creditLimit: 500000,
    dueDate: "12/31/2026",
    ledger: [
      { id: 1, date: "24-08-2026", project: "Lake Garden", description: "Closing Stock", voucherNo: "PUR864886", debit: 0, credit: 250.00, balance: 250.00 }
    ]
  },
  {
    id: 2,
    code: "SUP8286898",
    name: "Rifat Thai House",
    company: "Rifat Thai House",
    phone: "01822334455",
    email: "rifat@thaihouse.com",
    address: "Gulshan, Dhaka",
    under: "Sundry Creditors",
    creditLimit: 200000,
    dueDate: "11/15/2026",
    ledger: [
      { id: 1, date: "20-08-2026", project: "City Center", description: "Glass Materials", voucherNo: "PUR123456", debit: 0, credit: 5000.00, balance: 5000.00 }
    ]
  },
  {
    id: 3,
    code: "SUP8103073",
    name: "Mohin Business solution",
    company: "Mohin IT",
    phone: "01933445566",
    email: "mohin@business.com",
    address: "Motijheel, Dhaka",
    under: "Sundry Creditors",
    creditLimit: 150000,
    dueDate: "10/30/2026",
    ledger: []
  },
  {
    id: 4,
    code: "SUP8191957",
    name: "Safety First Suppliers",
    company: "Safety First",
    phone: "01312345695",
    email: "safety@suppliers.com",
    address: "Motijheel",
    under: "Sundry Creditors",
    creditLimit: 300000,
    dueDate: "12/01/2026",
    ledger: []
  },
  {
    id: 5,
    code: "SUP6544555",
    name: "Delta Glass & Aluminium",
    company: "Delta Ltd",
    phone: "01312345694",
    email: "delta@glass.com",
    address: "Mirpur",
    under: "Sundry Creditors",
    creditLimit: 400000,
    dueDate: "09/30/2026",
    ledger: []
  },
  {
    id: 6,
    code: "SUP8156944",
    name: "Prime Tiles",
    company: "Prime Ceramics",
    phone: "01312345693",
    email: "prime@tiles.com",
    address: "Mohakhali",
    under: "Sundry Creditors",
    creditLimit: 250000,
    dueDate: "10/10/2026",
    ledger: []
  },
  {
    id: 7,
    code: "SUP7215205",
    name: "Modern Sanitary",
    company: "Modern Group",
    phone: "01312345692",
    email: "modern@sanitary.com",
    address: "Paltan",
    under: "Sundry Creditors",
    creditLimit: 350000,
    dueDate: "11/20/2026",
    ledger: []
  },
  {
    id: 8,
    code: "SUP2351579",
    name: "Techno Cables Ltd",
    company: "Techno Cables",
    phone: "01312345691",
    email: "techno@cables.com",
    address: "Mirpur",
    under: "Sundry Creditors",
    creditLimit: 600000,
    dueDate: "12/15/2026",
    ledger: []
  },
  {
    id: 9,
    code: "SUP2504049",
    name: "Fresh Paint House",
    company: "Fresh Paints",
    phone: "01312345690",
    email: "fresh@paints.com",
    address: "Paltan",
    under: "Sundry Creditors",
    creditLimit: 100000,
    dueDate: "10/05/2026",
    ledger: []
  },
  {
    id: 10,
    code: "SUP2252190",
    name: "BuildMart Bangladesh",
    company: "BuildMart BD",
    phone: "01312345689",
    email: "buildmart@bd.com",
    address: "Gulshan",
    under: "Sundry Creditors",
    creditLimit: 1000000,
    dueDate: "01/10/2027",
    ledger: []
  },
  {
    id: 11,
    code: "SUP9912401",
    name: "Bashundhara Heavy Industries",
    company: "Bashundhara Group",
    phone: "01888990011",
    email: "heavy@bashundharagroup.com",
    address: "Bashundhara R/A, Dhaka",
    under: "Sundry Creditors",
    creditLimit: 5000000,
    dueDate: "03/30/2027",
    ledger: [
      { id: 1, date: "01-09-2026", project: "Mega Mall", description: "Heavy Structural Steel", voucherNo: "PUR99101", debit: 0, credit: 1250000.00, balance: 1250000.00 }
    ]
  },
  {
    id: 12,
    code: "SUP9925842",
    name: "BSRM Steels Flagship",
    company: "Bangladesh Steel Re-Rolling Mills",
    phone: "01777889922",
    email: "corporate@bsrm.com",
    address: "Nasirabad, Chattogram",
    under: "Sundry Creditors",
    creditLimit: 7500000,
    dueDate: "04/15/2027",
    ledger: [
      { id: 1, date: "03-09-2026", project: "Skyline Tower", description: "Xtreme 500W Rebars", voucherNo: "PUR99102", debit: 0, credit: 3200000.00, balance: 3200000.00 }
    ]
  },
  {
    id: 13,
    code: "SUP9937190",
    name: "LafargeHolcim Premium",
    company: "LafargeHolcim Bangladesh",
    phone: "01999223344",
    email: "supply@lafargeholcim.com",
    address: "Niketon, Gulshan-1, Dhaka",
    under: "Sundry Creditors",
    creditLimit: 4000000,
    dueDate: "02/28/2027",
    ledger: [
      { id: 1, date: "05-09-2026", project: "Metro Express", description: "Bulk Ordinary Portland Cement", voucherNo: "PUR99103", debit: 0, credit: 1850000.00, balance: 1850000.00 }
    ]
  },
  {
    id: 14,
    code: "SUP9948235",
    name: "Summit Power Infrastructure",
    company: "Summit Corporation Ltd",
    phone: "01555667788",
    email: "infra@summit-centre.com",
    address: "Kawran Bazar, Dhaka",
    under: "Sundry Creditors",
    creditLimit: 10000000,
    dueDate: "06/30/2027",
    ledger: [
      { id: 1, date: "08-09-2026", project: "Power Grid Substation", description: "High Voltage Transmission Units", voucherNo: "PUR99104", debit: 0, credit: 5500000.00, balance: 5500000.00 }
    ]
  }
];

// Reusable Supplier Form Modal
function SupplierFormModal({ 
  title, 
  initialData, 
  onClose, 
  onSubmit 
}: { 
  title: string; 
  initialData?: Supplier; 
  onClose: () => void; 
  onSubmit: (data: Partial<Supplier>) => void; 
}) {
  const [formData, setFormData] = useState({
    code: initialData?.code || `SUP${Math.floor(1000000 + Math.random() * 9000000)}`,
    name: initialData?.name || "",
    company: initialData?.company || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    creditLimit: initialData?.creditLimit || 0,
    dueDate: initialData?.dueDate || "",
    under: initialData?.under || "Sundry Creditors",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden my-8 border border-slate-100 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Code</label>
              <input 
                type="text" 
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter Name"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Business/Organization</label>
              <input 
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Enter Business Name"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter E-mail"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Phone/Mobile</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter Phone/Mobile"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Address</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter Address"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Credit Limit</label>
              <input 
                type="number" 
                value={formData.creditLimit}
                onChange={(e) => setFormData({ ...formData, creditLimit: Number(e.target.value) || 0 })}
                placeholder="Enter Credit Limit"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Due Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Under</label>
              <select 
                value={formData.under}
                onChange={(e) => setFormData({ ...formData, under: e.target.value })}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Sundry Creditors">Sundry Creditors</option>
                <option value="Direct Expenses">Direct Expenses</option>
                <option value="Indirect Expenses">Indirect Expenses</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-md font-medium text-xs transition cursor-pointer shadow-xs"
            >
              Close
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium text-xs transition cursor-pointer shadow-xs"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SupplierListPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(13); // Default set to 13 per page as requested
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [selectedProfile, setSelectedProfile] = useState<Supplier | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  // Filter dynamic data
  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGroup = groupFilter ? s.under === groupFilter : true;
    return matchesSearch && matchesGroup;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredSuppliers.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentTableData = filteredSuppliers.slice(startIndex, startIndex + entriesPerPage);

  const handleDelete = (id: number) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
    if (currentPage > 1 && currentTableData.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 p-4 md:p-6 space-y-4 antialiased">
      
      {/* Breadcrumbs & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-4">
        <div className="flex items-center text-sm text-slate-500 space-x-2">
          <span className="hover:text-indigo-600 cursor-pointer font-medium">Home</span>
          <span>›</span>
          <span className="hover:text-indigo-600 cursor-pointer font-medium">Contact</span>
          <span>›</span>
          <span className="text-slate-800 font-semibold">Supplier List</span>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Supplier Add
        </button>
      </div>

      {/* Filter by Group & Export Toolbar */}
      <div className="space-y-3">
        <div className="text-xs font-medium text-slate-600">Chart Of Group(Under)</div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-72">
            <select 
              value={groupFilter}
              onChange={(e) => { setGroupFilter(e.target.value); setCurrentPage(1); }}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select value</option>
              <option value="Sundry Creditors">Sundry Creditors</option>
              <option value="Direct Expenses">Direct Expenses</option>
              <option value="Indirect Expenses">Indirect Expenses</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded shadow-xs transition">
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1" /> Excel
            </button>
            <button className="inline-flex items-center px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded shadow-xs transition">
              <FileText className="w-3.5 h-3.5 mr-1" /> PDF
            </button>
          </div>
        </div>
      </div>

      {/* Show Entries & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 gap-4">
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <span>Show</span>
          <select 
            value={entriesPerPage}
            onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value={10}>10</option>
            <option value={13}>13</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <span>Search:</span>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="border border-slate-200 rounded px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white w-48 sm:w-60"
          />
        </div>
      </div>

      {/* Modern Supplier Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">ID</th>
                <th className="py-2.5 px-3">Code</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Company</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Address</th>
                <th className="py-2.5 px-3">Under</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {currentTableData.length > 0 ? (
                currentTableData.map((supplier, index) => (
                  <tr key={supplier.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-2.5 px-3 text-slate-500 font-medium">{startIndex + index + 1}</td>
                    <td className="py-2.5 px-3 font-mono text-indigo-600 font-semibold">{supplier.code}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{supplier.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{supplier.company || "-"}</td>
                    <td className="py-2.5 px-3 text-slate-600">{supplier.phone || "-"}</td>
                    <td className="py-2.5 px-3 text-slate-600">{supplier.email || "-"}</td>
                    <td className="py-2.5 px-3 text-slate-600">{supplier.address || "-"}</td>
                    <td className="py-2.5 px-3 text-slate-600">{supplier.under}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-center space-x-1">
                        <button 
                          onClick={() => setEditingSupplier(supplier)}
                          title="Edit Supplier"
                          className="p-1 bg-cyan-400 hover:bg-cyan-500 text-white rounded shadow-xs transition cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setSelectedProfile(supplier)}
                          title="View Profile & Ledger"
                          className="p-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded shadow-xs transition cursor-pointer"
                        >
                          <User className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(supplier.id)}
                          title="Delete Supplier"
                          className="p-1 bg-rose-500 hover:bg-rose-600 text-white rounded shadow-xs transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-slate-400">No supplier records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing {filteredSuppliers.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesPerPage, filteredSuppliers.length)} of {filteredSuppliers.length} entries
          </div>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-slate-200 rounded ${currentPage === 1 ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'hover:bg-slate-50 text-slate-600 cursor-pointer'}`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded font-medium ${currentPage === page ? 'bg-indigo-600 text-white shadow-xs' : 'border border-slate-200 hover:bg-slate-50 text-slate-600'}`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 border border-slate-200 rounded ${currentPage === totalPages || totalPages === 0 ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'hover:bg-slate-50 text-slate-600 cursor-pointer'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* --- SUPPLIER PROFILE & LEDGER VIEW MODAL --- */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden my-6 border border-slate-100 flex flex-col max-h-[92vh]">
            <div className="px-6 py-3 border-b border-slate-100 flex justify-between items-center bg-white">
              <h3 className="text-sm font-semibold text-slate-800">Supplier Profile & Ledger</h3>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded shadow-xs transition">
                  <Printer className="w-3.5 h-3.5 mr-1" /> Print
                </button>
                <button onClick={() => setSelectedProfile(null)} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 bg-white">
              <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                <div className="h-28 bg-gradient-to-r from-cyan-400 to-indigo-600 relative flex items-center justify-center">
                  <div className="absolute -bottom-6 w-16 h-16 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-slate-500 font-semibold shadow-md overflow-hidden">
                    {selectedProfile.image ? (
                      <img src={selectedProfile.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                </div>
                
                <div className="pt-8 pb-4 px-6 text-center">
                  <h4 className="text-base font-bold text-slate-800">{selectedProfile.name}</h4>
                  <p className="text-xs text-slate-500 mb-4">{selectedProfile.company}</p>

                  <div className="border-t border-slate-100 divide-y divide-slate-100 text-xs text-left">
                    <div className="py-2 flex justify-between"><span className="text-slate-400">ID</span> <span className="font-mono font-medium text-slate-700">{selectedProfile.code}</span></div>
                    <div className="py-2 flex justify-between"><span className="text-slate-400">Phone</span> <span className="font-medium text-slate-700">{selectedProfile.phone || "-"}</span></div>
                    <div className="py-2 flex justify-between"><span className="text-slate-400">Email</span> <span className="font-medium text-slate-700">{selectedProfile.email || "-"}</span></div>
                    <div className="py-2 flex justify-between"><span className="text-slate-400">Address</span> <span className="font-medium text-slate-700">{selectedProfile.address || "-"}</span></div>
                    {selectedProfile.creditLimit && (
                      <div className="py-2 flex justify-between"><span className="text-slate-400">Credit Limit</span> <span className="font-semibold text-emerald-600">৳{selectedProfile.creditLimit.toLocaleString()}</span></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800">Ledger</h4>
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-indigo-600 text-white font-semibold uppercase tracking-wider">
                        <th className="py-2.5 px-3">ID</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Project</th>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3">Voucher No</th>
                        <th className="py-2.5 px-3">Debit</th>
                        <th className="py-2.5 px-3">Credit</th>
                        <th className="py-2.5 px-3">Balance</th>
                        <th className="py-2.5 px-3">Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="bg-slate-50/50">
                        <td colSpan={7} className="py-2 px-3 font-medium text-slate-600">Opening</td>
                        <td className="py-2 px-3 font-semibold text-slate-800">0.00</td>
                        <td></td>
                      </tr>
                      {selectedProfile.ledger && selectedProfile.ledger.length > 0 ? (
                        selectedProfile.ledger.map((item, idx) => (
                          <tr key={item.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3">{idx + 1}</td>
                            <td className="py-2.5 px-3">{item.date}</td>
                            <td className="py-2.5 px-3">{item.project}</td>
                            <td className="py-2.5 px-3 text-indigo-600 font-medium">{item.description}</td>
                            <td className="py-2.5 px-3 text-indigo-600 font-mono">{item.voucherNo}</td>
                            <td className="py-2.5 px-3">{item.debit.toFixed(2)}</td>
                            <td className="py-2.5 px-3">{item.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td className="py-2.5 px-3 font-semibold">{item.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td className="py-2.5 px-3">{item.note || ""}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center py-6 text-slate-400">No ledger transactions found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: SUPPLIER ADD --- */}
      {isAddModalOpen && (
        <SupplierFormModal 
          title="Supplier" 
          onClose={() => setIsAddModalOpen(false)} 
          onSubmit={(newSupplierData) => {
            setSuppliers([ { 
              id: Date.now(), 
              code: newSupplierData.code || `SUP${Math.floor(1000000 + Math.random() * 9000000)}`,
              name: newSupplierData.name || "",
              company: newSupplierData.company || "",
              phone: newSupplierData.phone || "",
              email: newSupplierData.email || "",
              address: newSupplierData.address || "",
              under: newSupplierData.under || "Sundry Creditors",
              creditLimit: Number(newSupplierData.creditLimit) || 0,
              dueDate: newSupplierData.dueDate || "",
              ledger: [] 
            }, ...suppliers ]);
            setIsAddModalOpen(false);
          }} 
        />
      )}

      {/* --- MODAL: SUPPLIER EDIT --- */}
      {editingSupplier && (
        <SupplierFormModal 
          title="Edit Supplier Details" 
          initialData={editingSupplier}
          onClose={() => setEditingSupplier(null)} 
          onSubmit={(updatedData) => {
            setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? { ...s, ...updatedData } : s));
            setEditingSupplier(null);
          }} 
        />
      )}

    </div>
  );
}