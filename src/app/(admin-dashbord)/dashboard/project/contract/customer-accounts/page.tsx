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
  Check 
} from "lucide-react";
import { Customer } from "@/types/customer";

// Mock initial data expanded with 4-5 additional comprehensive customer records to fill out the table
const initialCustomers: Customer[] = [
  {
    id: 1,
    code: "CUS7515110",
    name: "Sagor kumar",
    business: "Sagor Traders",
    mobile: "01733195160",
    email: "sagor@gmail.com",
    nidPassport: "1998765432109",
    under: "790",
    address: "Dhaka, Bangladesh",
    buyerReference: "Ref-01",
    creditLimit: 50000,
    chartOfGroups: "Sundry Debtors",
    landInfo: [
      {
        project: "Eastern 19",
        block: "B",
        plotLocation: "0",
        roadSize: "0",
        plotNo: "2",
        totalValue: 4000000,
        plotSize: "5",
        totalReceived: 300000,
        due: 3700000,
      }
    ],
    flatInfo: [
      {
        project: "Sheba Eyecon Tower",
        utilityValue: 0,
        flatNo: "F 4",
        totalValue: 11770000,
        flatSize: "1230",
        totalReceived: 300000,
        flatValue: 73800,
        due: 11470000,
        parkingValue: 0,
      }
    ],
    paymentSchedule: [
      { sl: 1, date: "07-10-2026", amount: 964166.66, remarks: "Installment", paymentDate: "0", paidAmount: 0 },
      { sl: 2, date: "07-11-2026", amount: 964166.66, remarks: "Installment", paymentDate: "0", paidAmount: 0 },
    ],
    paymentDetails: [
      { sl: 1, date: "31-08-2026", particular: "Receipt", cashBankParticular: "-", voucherNo: "R00009", debit: 0, credit: 100000, balance: -100000 },
      { sl: 2, date: "07-09-2026", particular: "Receipt", cashBankParticular: "Cash", voucherNo: "R00014", debit: 0, credit: 200000, balance: -300000 },
    ]
  },
  {
    id: 2,
    code: "L260829-0016",
    name: "Mr. Raju raz",
    business: "Raz Enterprise",
    mobile: "+8801612233445",
    email: "raju@gmail.com",
    nidPassport: "1988234567890",
    under: "789",
    address: "Chittagong, Bangladesh",
  },
  {
    id: 3,
    code: "CUS5818120",
    name: "Vertex Group",
    business: "Tech & Real Estate",
    mobile: "01312345685",
    email: "info@vertex.com",
    nidPassport: "2001234567891",
    under: "778",
    address: "Gulshan, Dhaka",
  },
  {
    id: 4,
    code: "CUS5818121",
    name: "Anika Tabassum",
    business: "Anika Fashion",
    mobile: "01811223344",
    email: "anika@fashion.com",
    nidPassport: "1995123456789",
    under: "779",
    address: "Banani, Dhaka",
  },
  {
    id: 5,
    code: "CUS5818122",
    name: "Tanvir Ahmed",
    business: "Tanvir Builders",
    mobile: "01922334455",
    email: "tanvir@builders.com",
    nidPassport: "1992345678901",
    under: "780",
    address: "Uttara, Dhaka",
  },
  {
    id: 6,
    code: "CUS5818123",
    name: "Sharmin Sultana",
    business: "Sultana Agro",
    mobile: "01533445566",
    email: "sharmin@agro.com",
    nidPassport: "1997456789012",
    under: "781",
    address: "Sylhet, Bangladesh",
  },
  {
    id: 7,
    code: "CUS5818124",
    name: "Kamal Hossain",
    business: "Kamal Electronics",
    mobile: "01644556677",
    email: "kamal@electronics.com",
    nidPassport: "1985567890123",
    under: "782",
    address: "Rajshahi, Bangladesh",
  },
  {
    id: 8,
    code: "CUS5818125",
    name: "Nusrat Jahan",
    business: "Jahan Boutique",
    mobile: "01755667788",
    email: "nusrat@boutique.com",
    nidPassport: "1999678901234",
    under: "783",
    address: "Khulna, Bangladesh",
  },
  {
    id: 9,
    code: "CUS5818126",
    name: "Farhan Tanvir",
    business: "Tanvir IT Solutions",
    mobile: "01866778899",
    email: "farhan@itsolutions.com",
    nidPassport: "2000789012345",
    under: "784",
    address: "Dhanmondi, Dhaka",
  },
  {
    id: 10,
    code: "CUS5818127",
    name: "Mehnaz Chowdhury",
    business: "Chowdhury Enterprise",
    mobile: "01977889900",
    email: "mehnaz@chowdhury.com",
    nidPassport: "1994890123456",
    under: "785",
    address: "Chittagong, Bangladesh",
  },
  // Additional 5 rich/valuable customer records added below
  {
    id: 11,
    code: "CUS5818128",
    name: "Dr. Zafar Iqbal",
    business: "Iqbal Medical Hall",
    mobile: "01711223399",
    email: "zafar.iqbal@gmail.com",
    nidPassport: "1975896342150",
    under: "786",
    address: "Mirpur, Dhaka",
    buyerReference: "Ref-VIP1",
    creditLimit: 250000,
    chartOfGroups: "Sundry Debtors",
    landInfo: [
      {
        project: "Green Valley Heights",
        block: "A",
        plotLocation: "Corner Plot",
        roadSize: "30ft",
        plotNo: "12",
        totalValue: 8500000,
        plotSize: "7.5",
        totalReceived: 2500000,
        due: 6000000,
      }
    ],
    flatInfo: [
      {
        project: "Skyline Oasis",
        utilityValue: 150000,
        flatNo: "A-502",
        totalValue: 18500000,
        flatSize: "2100",
        totalReceived: 5000000,
        flatValue: 18350000,
        due: 13500000,
        parkingValue: 300000,
      }
    ]
  },
  {
    id: 12,
    code: "CUS5818129",
    name: "Engr. Moniruzzaman",
    business: "Monir Engineering Ltd",
    mobile: "01822334411",
    email: "monir@monirengineering.com",
    nidPassport: "1982345612789",
    under: "787",
    address: "Agrabad, Chittagong",
    buyerReference: "Ref-VIP2",
    creditLimit: 500000,
    chartOfGroups: "Sundry Debtors",
    landInfo: [
      {
        project: "Padma Mega City",
        block: "C",
        plotLocation: "Main Road",
        roadSize: "40ft",
        plotNo: "45",
        totalValue: 12000000,
        plotSize: "10",
        totalReceived: 4000000,
        due: 8000000,
      }
    ]
  },
  {
    id: 13,
    code: "CUS5818130",
    name: "Barrister Rashida Khan",
    business: "Khan & Associates",
    mobile: "01933445522",
    email: "rashida@khanlaw.org",
    nidPassport: "1989654123078",
    under: "788",
    address: "Gulshan-2, Dhaka",
    buyerReference: "Ref-CORP",
    creditLimit: 1000000,
    chartOfGroups: "Corporate Clients",
    flatInfo: [
      {
        project: "Imperial Crown",
        utilityValue: 200000,
        flatNo: "PH-01",
        totalValue: 35000000,
        flatSize: "3800",
        totalReceived: 15000000,
        flatValue: 34800000,
        due: 20000000,
        parkingValue: 500000,
      }
    ]
  },
  {
    id: 14,
    code: "CUS5818131",
    name: "Shahidul Islam Patoari",
    business: "Patoari Steel Mills",
    mobile: "01655443322",
    email: "shahidul@patoaristeel.com",
    nidPassport: "1979321456987",
    under: "789",
    address: "Tejgaon Industrial Area, Dhaka",
    buyerReference: "Ref-IND",
    creditLimit: 800000,
    chartOfGroups: "Industrial Accounts",
    landInfo: [
      {
        project: "Bhanga Industrial Zone",
        block: "Industrial-1",
        plotLocation: "Warehouse Zone",
        roadSize: "60ft",
        plotNo: "88",
        totalValue: 25000000,
        plotSize: "25",
        totalReceived: 10000000,
        due: 15000000,
      }
    ]
  },
  {
    id: 15,
    code: "CUS5818132",
    name: "Fariha Sultana Mimi",
    business: "Mimi Designer Studio",
    mobile: "01588990011",
    email: "mimi@designerstudio.net",
    nidPassport: "2002147852369",
    under: "790",
    address: "Banani, Dhaka",
    buyerReference: "Ref-RET",
    creditLimit: 150000,
    chartOfGroups: "Retail Accounts",
    flatInfo: [
      {
        project: "Lake View Residency",
        utilityValue: 100000,
        flatNo: "3B",
        totalValue: 9500000,
        flatSize: "1450",
        totalReceived: 3500000,
        flatValue: 9400000,
        due: 6000000,
        parkingValue: 200000,
      }
    ]
  }
];

// Reusable Customer Form Modal Component for Add & Edit
function CustomerFormModal({ 
  title, 
  initialData, 
  onClose, 
  onSubmit 
}: { 
  title: string; 
  initialData?: Customer; 
  onClose: () => void; 
  onSubmit: (data: Partial<Customer>) => void; 
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    business: initialData?.business || "",
    mobile: initialData?.mobile || "",
    email: initialData?.email || "",
    nidPassport: initialData?.nidPassport || "",
    under: initialData?.under || "",
    address: initialData?.address || "",
    code: initialData?.code || `CUS${Math.floor(1000000 + Math.random() * 9000000)}`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-100 flex flex-col">
        <div className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-indigo-700 rounded-full transition text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Customer Name *</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Customer Code</label>
              <input 
                type="text" 
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50 font-mono text-indigo-600 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Mobile Number *</label>
              <input 
                type="text" 
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="017xxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="example@gmail.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Business Name</label>
              <input 
                type="text" 
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Business or shop name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">NID / Passport</label>
              <input 
                type="text" 
                value={formData.nidPassport}
                onChange={(e) => setFormData({ ...formData, nidPassport: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="NID or passport number"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Under Group</label>
              <input 
                type="text" 
                value={formData.under}
                onChange={(e) => setFormData({ ...formData, under: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Group code"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Address</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Full address"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium text-xs transition cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-xs shadow-sm transition cursor-pointer flex items-center"
            >
              <Check className="w-4 h-4 mr-1.5" /> Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(20);

  // Modals state
  const [selectedProfile, setSelectedProfile] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Filter dynamic data
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobile.includes(searchTerm)
  );

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 p-4 md:p-6 space-y-4 antialiased">
      
      {/* Breadcrumbs & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center text-sm text-slate-500 space-x-2">
          <span className="hover:text-indigo-600 cursor-pointer font-medium">Home</span>
          <span>›</span>
          <span className="hover:text-indigo-600 cursor-pointer font-medium">Contact</span>
          <span>›</span>
          <span className="text-slate-800 font-semibold">Customer List</span>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Customer Add
        </button>
      </div>

      {/* Export & Control Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded shadow-sm transition">
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" /> Excel
          </button>
          <button className="inline-flex items-center px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded shadow-sm transition">
            <FileText className="w-3.5 h-3.5 mr-1.5" /> PDF
          </button>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span>Show</span>
            <select 
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Modern Table Layout */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-xs font-semibold tracking-wider uppercase">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Business</th>
                <th className="py-3 px-4">Mobile</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">NID/Passport</th>
                <th className="py-3 px-4">Under</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <tr key={customer.id} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 text-slate-500 font-medium">{index + 1}</td>
                    <td className="py-3 px-4 font-mono text-xs text-indigo-600 font-semibold">{customer.code}</td>
                    <td className="py-3 px-4 text-slate-900 font-medium">{customer.name}</td>
                    <td className="py-3 px-4 text-slate-600">{customer.business || "-"}</td>
                    <td className="py-3 px-4 text-slate-600">{customer.mobile}</td>
                    <td className="py-3 px-4 text-slate-600">{customer.email || "-"}</td>
                    <td className="py-3 px-4 text-slate-600">{customer.nidPassport || "-"}</td>
                    <td className="py-3 px-4 text-slate-600">{customer.under || "-"}</td>
                    <td className="py-3 px-4 text-slate-400">
                      {customer.image ? <img src={customer.image} alt="" className="w-8 h-8 rounded-full object-cover" /> : "-"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button 
                          onClick={() => setSelectedProfile(customer)}
                          title="View Profile Details"
                          className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow-xs transition cursor-pointer"
                        >
                          <User className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setEditingCustomer(customer)}
                          title="Edit Customer"
                          className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded shadow-xs transition cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(customer.id)}
                          title="Delete Customer"
                          className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded shadow-xs transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400">No customer records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL 1: CUSTOMER PROFILE / DETAILS VIEW --- */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-100 flex flex-col max-h-[90vh]">
            
            <div className="bg-slate-50 border-b border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-indigo-500 flex items-center justify-center text-slate-500 text-xs font-semibold overflow-hidden shadow-inner">
                  {selectedProfile.image ? (
                    <img src={selectedProfile.image} alt={selectedProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    "No Image"
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedProfile.name}</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-1">
                    <span className="flex items-center"><span className="text-indigo-600 font-semibold mr-1">📱 Mobile:</span> {selectedProfile.mobile}</span>
                    <span className="flex items-center"><span className="text-indigo-600 font-semibold mr-1">✉️ Email:</span> {selectedProfile.email || "N/A"}</span>
                    <span className="flex items-center"><span className="text-indigo-600 font-semibold mr-1">🆔 NID:</span> {selectedProfile.nidPassport || "N/A"}</span>
                    <span className="flex items-center"><span className="text-indigo-600 font-semibold mr-1">📍 Address:</span> {selectedProfile.address || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-auto">
                <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded shadow-xs hover:bg-emerald-700">Excel</button>
                <button className="px-3 py-1.5 bg-rose-600 text-white text-xs font-medium rounded shadow-xs hover:bg-rose-700">PDF</button>
                <button 
                  onClick={() => setSelectedProfile(null)}
                  className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 bg-slate-50/50">
              {selectedProfile.landInfo && selectedProfile.landInfo.map((land, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="bg-indigo-600 text-white px-4 py-2 text-xs font-bold tracking-wide uppercase flex items-center justify-between">
                    <span>Land Information</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 text-xs">
                    <div className="space-y-2">
                      <p><strong className="text-slate-500">Project:</strong> {land.project}</p>
                      <p><strong className="text-slate-500">Plot Location:</strong> {land.plotLocation}</p>
                      <p><strong className="text-slate-500">Plot No:</strong> {land.plotNo}</p>
                      <p><strong className="text-slate-500">Plot Size:</strong> {land.plotSize}</p>
                      <p><strong className="text-slate-500">Road No:</strong> 3/A</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong className="text-slate-500">Block Name:</strong> {land.block}</p>
                      <p><strong className="text-slate-500">Road Size:</strong> {land.roadSize}</p>
                      <p><strong className="text-slate-500">Total Value:</strong> {land.totalValue.toLocaleString()}</p>
                      <p><strong className="text-slate-500">Total Received:</strong> {land.totalReceived.toLocaleString()}</p>
                      <p><strong className="text-slate-500">Due:</strong> {land.due.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}

              {selectedProfile.flatInfo && selectedProfile.flatInfo.map((flat, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="bg-indigo-600 text-white px-4 py-2 text-xs font-bold tracking-wide uppercase">
                    Flat Information
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 text-xs">
                    <div className="space-y-2">
                      <p><strong className="text-slate-500">Project:</strong> {flat.project}</p>
                      <p><strong className="text-slate-500">Flat No:</strong> {flat.flatNo}</p>
                      <p><strong className="text-slate-500">Flat Size:</strong> {flat.flatSize}</p>
                      <p><strong className="text-slate-500">Flat Value:</strong> {flat.flatValue.toLocaleString()}</p>
                      <p><strong className="text-slate-500">Parking Value:</strong> {flat.parkingValue}</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong className="text-slate-500">Utility Value:</strong> {flat.utilityValue}</p>
                      <p><strong className="text-slate-500">Total Value:</strong> {flat.totalValue.toLocaleString()}</p>
                      <p><strong className="text-slate-500">Total Received:</strong> {flat.totalReceived.toLocaleString()}</p>
                      <p><strong className="text-slate-500">Due:</strong> {flat.due.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: CUSTOMER ADD FORM --- */}
      {isAddModalOpen && (
        <CustomerFormModal 
          title="Customer Add" 
          onClose={() => setIsAddModalOpen(false)} 
          onSubmit={(newCustomerData) => {
            setCustomers([ { 
              id: Date.now(), 
              ...newCustomerData,
              code: newCustomerData.code || `CUS${Math.floor(1000000 + Math.random() * 9000000)}`,
              name: newCustomerData.name || "",
              business: newCustomerData.business || "",
              mobile: newCustomerData.mobile || "",
              email: newCustomerData.email || "",
              nidPassport: newCustomerData.nidPassport || "",
              under: newCustomerData.under || "",
              address: newCustomerData.address || "",
            }, ...customers ]);
            setIsAddModalOpen(false);
          }} 
        />
      )}

      {/* --- MODAL 3: CUSTOMER EDIT FORM --- */}
      {editingCustomer && (
        <CustomerFormModal 
          title="Edit Customer Details" 
          initialData={editingCustomer}
          onClose={() => setEditingCustomer(null)} 
          onSubmit={(updatedData) => {
            setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...updatedData } : c));
            setEditingCustomer(null);
          }} 
        />
      )}

    </div>
  );
}