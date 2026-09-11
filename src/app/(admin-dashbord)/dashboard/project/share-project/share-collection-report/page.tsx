'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  User, 
  Trash2, 
  X, 
  FileText,
  Calendar,
  Download,
  FileSpreadsheet,
  ChevronRight,
  Home,
  Users,
  Phone,
  Mail,
  CreditCard,
  MapPin,
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Type definitions matching full data structure for seamless API integration
export interface CustomerShareReport {
  id: string;
  customerName: string;
  projectName: string;
  noOfShare: string;
  shareAmount: string;
  paidAmount: string;
  totalCost: string;
  balance: string;
  due: string;
  mobile: string;
  email: string;
  nid: string;
  address: string;
  image: string;
  dateRange: string;
  fatherName: string;
  occupation: string;
  nomineeName: string;
  nomineeRelation: string;
  bankName: string;
  accountNo: string;
}

// Extensive mock data covering all rows to ensure zero blank white spaces on the page layout
const initialCustomers: CustomerShareReport[] = [
  {
    id: '1',
    customerName: 'Tanvir Ahmed',
    projectName: 'Alpha Heights',
    noOfShare: '50',
    shareAmount: '500,000',
    paidAmount: '450,000',
    totalCost: '520,000',
    balance: '0',
    due: '70,000',
    mobile: '01811223344',
    email: 'tanvir.ahmed@gmail.com',
    nid: '1992837465012',
    address: 'House 42, Road 11, Banani, Dhaka',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026',
    fatherName: 'Abdul Karim',
    occupation: 'Business',
    nomineeName: 'Nasrin Akhter',
    nomineeRelation: 'Wife',
    bankName: 'Dutch Bangla Bank',
    accountNo: '1271010234567'
  },
  {
    id: '2',
    customerName: 'Farhana Sultana',
    projectName: 'Beta Commercial Complex',
    noOfShare: '120',
    shareAmount: '1,200,000',
    paidAmount: '1,200,000',
    totalCost: '1,250,000',
    balance: '50,000',
    due: '0',
    mobile: '01711556677',
    email: 'farhana.s@yahoo.com',
    nid: '1988554433221',
    address: 'Flat 5A, Uttara Heights, Dhaka',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026',
    fatherName: 'Rafiqul Islam',
    occupation: 'Service',
    nomineeName: 'Tanvir Sultana',
    nomineeRelation: 'Brother',
    bankName: 'BRAC Bank',
    accountNo: '1501029384756'
  },
  {
    id: '3',
    customerName: 'Mahbub Alam',
    projectName: 'Gamma Green Valley',
    noOfShare: '200',
    shareAmount: '2,000,000',
    paidAmount: '1,500,000',
    totalCost: '2,100,000',
    balance: '0',
    due: '600,000',
    mobile: '01922334455',
    email: 'mahbub.alam@outlook.com',
    nid: '1975443322119',
    address: 'GEC Circle, Chattogram',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026',
    fatherName: 'Nurul Alam',
    occupation: 'Engineer',
    nomineeName: 'Fatema Begum',
    nomineeRelation: 'Mother',
    bankName: 'Eastern Bank',
    accountNo: '1012039485768'
  },
  {
    id: '4',
    customerName: 'Sharmin Akter',
    projectName: 'Delta Residency',
    noOfShare: '75',
    shareAmount: '750,000',
    paidAmount: '700,000',
    totalCost: '780,000',
    balance: '0',
    due: '80,000',
    mobile: '01655443322',
    email: 'sharmin.akter@gmail.com',
    nid: '1990112233445',
    address: 'Zindabazar, Sylhet',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026',
    fatherName: 'Abul Kashem',
    occupation: 'Doctor',
    nomineeName: 'Kamal Hossain',
    nomineeRelation: 'Husband',
    bankName: 'City Bank',
    accountNo: '1402938475612'
  },
  {
    id: '5',
    customerName: 'Golam Mostafa',
    projectName: 'Omega Silicon City',
    noOfShare: '150',
    shareAmount: '1,500,000',
    paidAmount: '1,500,000',
    totalCost: '1,500,000',
    balance: '0',
    due: '0',
    mobile: '01533221100',
    email: 'golam.mostafa@enterprise.com',
    nid: '1982998877665',
    address: 'Station Road, Rajshahi',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026',
    fatherName: 'Mofizur Rahman',
    occupation: 'Businessman',
    nomineeName: 'Sabina Yasmin',
    nomineeRelation: 'Wife',
    bankName: 'Mutual Trust Bank',
    accountNo: '1122334455667'
  },
  {
    id: '6',
    customerName: 'Nazmul Hossain',
    projectName: 'Sigma Tower',
    noOfShare: '90',
    shareAmount: '900,000',
    paidAmount: '800,000',
    totalCost: '920,000',
    balance: '0',
    due: '120,000',
    mobile: '01899887766',
    email: 'nazmul.hossain@gmail.com',
    nid: '1993445566778',
    address: 'CDA Avenue, Chattogram',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026',
    fatherName: 'Sirajul Islam',
    occupation: 'Banker',
    nomineeName: 'Jannatul Ferdous',
    nomineeRelation: 'Sister',
    bankName: 'Prime Bank',
    accountNo: '1982736450192'
  },
  {
    id: '7',
    customerName: 'Rubina Yasmin',
    projectName: 'Theta Agro Farm',
    noOfShare: '300',
    shareAmount: '3,000,000',
    paidAmount: '2,500,000',
    totalCost: '3,100,000',
    balance: '0',
    due: '600,000',
    mobile: '01744556688',
    email: 'rubina.yasmin@gmail.com',
    nid: '1987778899001',
    address: 'Baliapara, Dinajpur',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026',
    fatherName: 'Abdul Jabbar',
    occupation: 'Teacher',
    nomineeName: 'Anwar Hossain',
    nomineeRelation: 'Husband',
    bankName: 'Agrani Bank',
    accountNo: '0200019283746'
  },
  {
    id: '8',
    customerName: 'Moniruzzaman Khan',
    projectName: 'Kappa Plaza',
    noOfShare: '110',
    shareAmount: '1,100,000',
    paidAmount: '1,100,000',
    totalCost: '1,100,000',
    balance: '25,000',
    due: '0',
    mobile: '01311224466',
    email: 'monir.khan@corporate.net',
    nid: '1979332211445',
    address: 'Taltola, Sylhet',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026',
    fatherName: 'Lutfor Rahman',
    occupation: 'Architect',
    nomineeName: 'Shahnaz Khan',
    nomineeRelation: 'Wife',
    bankName: 'Southeast Bank',
    accountNo: '1324567890123'
  }
];

export default function ShareReportPage() {
  const [customers, setCustomers] = useState<CustomerShareReport[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('1 September, 2026 - 30 September, 2026');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modal Controllers
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerShareReport | null>(null);

  // Form State for Add Customer (matching 2nd Image structured layout format)
  const [newCustomerData, setNewCustomerData] = useState({
    customerName: '',
    projectName: '',
    fatherName: '',
    occupation: '',
    mobile: '',
    email: '',
    nid: '',
    address: '',
    noOfShare: '',
    shareAmount: '',
    paidAmount: '',
    totalCost: '',
    nomineeName: '',
    nomineeRelation: '',
    bankName: '',
    accountNo: ''
  });

  // Form State for Edit (matching 5th Image form styling)
  const [editFormData, setEditFormData] = useState<Partial<CustomerShareReport>>({
    customerName: '',
    projectName: '',
    noOfShare: '',
    shareAmount: '',
    paidAmount: '',
    totalCost: '',
    balance: '',
    due: '',
    mobile: '',
    email: ''
  });

  // Filter logic
  const filteredCustomers = customers.filter(item => {
    const matchesProject = selectedProjectFilter ? item.projectName === selectedProjectFilter : true;
    const matchesSearch = 
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.includes(searchQuery);
    return matchesProject && matchesSearch;
  });

  // Add Customer Submit
  const handleAddCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdCustomer: CustomerShareReport = {
      id: String(customers.length + 1),
      customerName: newCustomerData.customerName,
      projectName: newCustomerData.projectName || 'Alpha Heights',
      noOfShare: newCustomerData.noOfShare || '50',
      shareAmount: newCustomerData.shareAmount || '500,000',
      paidAmount: newCustomerData.paidAmount || '500,000',
      totalCost: newCustomerData.totalCost || '520,000',
      balance: '0',
      due: '0',
      mobile: newCustomerData.mobile || '01800000000',
      email: newCustomerData.email || 'customer@gmail.com',
      nid: newCustomerData.nid || '1990000000000',
      address: newCustomerData.address || 'Dhaka, Bangladesh',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      dateRange: selectedDateRange,
      fatherName: newCustomerData.fatherName || 'N/A',
      occupation: newCustomerData.occupation || 'Service',
      nomineeName: newCustomerData.nomineeName || 'N/A',
      nomineeRelation: newCustomerData.nomineeRelation || 'N/A',
      bankName: newCustomerData.bankName || 'Dutch Bangla Bank',
      accountNo: newCustomerData.accountNo || '1234567890'
    };
    setCustomers([createdCustomer, ...customers]);
    setIsAddCustomerOpen(false);
    setNewCustomerData({
      customerName: '', projectName: '', fatherName: '', occupation: '',
      mobile: '', email: '', nid: '', address: '', noOfShare: '',
      shareAmount: '', paidAmount: '', totalCost: '', nomineeName: '',
      nomineeRelation: '', bankName: '', accountNo: ''
    });
  };

  // Edit Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    setCustomers(customers.map(item => item.id === selectedCustomer.id ? { ...item, ...editFormData } as CustomerShareReport : item));
    setIsEditOpen(false);
    setSelectedCustomer(null);
  };

  // Delete Handler
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this customer record?')) {
      setCustomers(customers.filter(item => item.id !== id));
    }
  };

  const openEditModal = (customer: CustomerShareReport) => {
    setSelectedCustomer(customer);
    setEditFormData({
      customerName: customer.customerName,
      projectName: customer.projectName,
      noOfShare: customer.noOfShare,
      shareAmount: customer.shareAmount,
      paidAmount: customer.paidAmount,
      totalCost: customer.totalCost,
      balance: customer.balance,
      due: customer.due,
      mobile: customer.mobile,
      email: customer.email
    });
    setIsEditOpen(true);
  };

  const openProfileModal = (customer: CustomerShareReport) => {
    setSelectedCustomer(customer);
    setIsProfileOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Section */}
      <div className="space-y-4">
        {/* Breadcrumb Navigation matching 1st & 2nd Reference image */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pb-2">
          <div className="flex items-center gap-1 hover:text-teal-600 cursor-pointer">
            <Home className="w-3.5 h-3.5" /> Home
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="hover:text-teal-600 cursor-pointer">Share Project</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-teal-600 font-semibold">Share Report</span>
        </div>

        {/* Top Filter & Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            {/* Select Date Input */}
            <div className="flex flex-col gap-1 w-full sm:w-72">
              <label className="text-xs font-semibold text-slate-600">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-xs"
                />
              </div>
            </div>

            {/* Select Project Dropdown */}
            <div className="flex flex-col gap-1 w-full sm:w-72">
              <label className="text-xs font-semibold text-slate-600">Select Project</label>
              <select
                value={selectedProjectFilter}
                onChange={(e) => setSelectedProjectFilter(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-xs"
              >
                <option value="">Select a project</option>
                <option value="Alpha Heights">Alpha Heights</option>
                <option value="Beta Commercial Complex">Beta Commercial Complex</option>
                <option value="Gamma Green Valley">Gamma Green Valley</option>
                <option value="Delta Residency">Delta Residency</option>
                <option value="Omega Silicon City">Omega Silicon City</option>
                <option value="Sigma Tower">Sigma Tower</option>
              </select>
            </div>
          </div>

          {/* Action Buttons: Add Customer Form Trigger, PDF & Excel */}
          <div className="flex items-center gap-2 self-end lg:self-center">
            <button
              onClick={() => setIsAddCustomerOpen(true)}
              className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Add Customer
            </button>
            <button
              onClick={() => alert('Downloading PDF Share Collection Report...')}
              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Share Collection PDF
            </button>
            <button
              onClick={() => alert('Exporting Excel Spreadsheet...')}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
            </button>
          </div>
        </div>

        {/* Table Search & Entries Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-300 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-600 font-medium">Search:</span>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Modern Dense Data Table (Filled with data so no empty space is visible anywhere) */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3.5">ID</th>
                  <th className="py-3 px-3.5">Customer Name</th>
                  <th className="py-3 px-3.5">No Of Share</th>
                  <th className="py-3 px-3.5">Share Amount</th>
                  <th className="py-3 px-3.5">Paid Amount</th>
                  <th className="py-3 px-3.5">Total Cost</th>
                  <th className="py-3 px-3.5">Balance</th>
                  <th className="py-3 px-3.5">Due</th>
                  <th className="py-3 px-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.slice(0, entriesPerPage).map((item, index) => (
                    <tr key={item.id} className="hover:bg-teal-50/30 transition-colors">
                      <td className="py-3 px-3.5 font-mono font-bold text-slate-600">{index + 1}</td>
                      <td className="py-3 px-3.5">
                        <div className="font-bold text-slate-900">{item.customerName}</div>
                        <div className="text-[11px] text-teal-600 font-medium">{item.projectName}</div>
                      </td>
                      <td className="py-3 px-3.5 font-bold text-slate-700">{item.noOfShare}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-700">৳ {item.shareAmount}</td>
                      <td className="py-3 px-3.5 font-mono text-emerald-600 font-semibold">৳ {item.paidAmount}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-800">৳ {item.totalCost}</td>
                      <td className="py-3 px-3.5 font-mono text-blue-600 font-medium">৳ {item.balance}</td>
                      <td className="py-3 px-3.5 font-mono text-rose-600 font-bold">৳ {item.due}</td>
                      <td className="py-3 px-3.5 text-center">
                        <div className="inline-flex items-center justify-center gap-1.5">
                          {/* Profile Button (Human Icon) */}
                          <button
                            onClick={() => openProfileModal(item)}
                            title="View Customer Profile Details"
                            className="p-1.5 bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-md transition-colors shadow-xs"
                          >
                            <User className="w-3.5 h-3.5" />
                          </button>
                          {/* Edit Button */}
                          <button
                            onClick={() => openEditModal(item)}
                            title="Edit Customer Record"
                            className="p-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-md transition-colors shadow-xs"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete Record"
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md transition-colors shadow-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-slate-400 font-medium">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium">
            <div>Showing 1 to {Math.min(entriesPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries</div>
            <div className="inline-flex items-center gap-1">
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 rounded border border-teal-600 bg-teal-600 text-white font-semibold">1</button>
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL: ADD CUSTOMER FORM (Structured like 2nd image form design) ================= */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-6">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" /> Add New Customer Share Account
              </h3>
              <button onClick={() => setIsAddCustomerOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomerSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Enter customer full name"
                    value={newCustomerData.customerName}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, customerName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={newCustomerData.projectName}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, projectName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="">Select project</option>
                    <option value="Alpha Heights">Alpha Heights</option>
                    <option value="Beta Commercial Complex">Beta Commercial Complex</option>
                    <option value="Gamma Green Valley">Gamma Green Valley</option>
                    <option value="Delta Residency">Delta Residency</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    placeholder="Father's name"
                    value={newCustomerData.fatherName}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, fatherName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Occupation</label>
                  <input
                    type="text"
                    placeholder="Occupation"
                    value={newCustomerData.occupation}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, occupation: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Number <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="01XXXXXXXXX"
                    value={newCustomerData.mobile}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, mobile: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="customer@email.com"
                    value={newCustomerData.email}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">National ID (NID)</label>
                  <input
                    type="text"
                    placeholder="NID Number"
                    value={newCustomerData.nid}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, nid: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Number of Shares <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50"
                    value={newCustomerData.noOfShare}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, noOfShare: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Amount <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="500,000"
                    value={newCustomerData.shareAmount}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, shareAmount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Paid Amount <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="450,000"
                    value={newCustomerData.paidAmount}
                    onChange={(e) => setNewCustomerData({ ...newCustomerData, paidAmount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors shadow-sm"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT CUSTOMER (Matching 5th image form layout style) ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-6">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-sky-400" /> Edit Customer Financial Record
              </h3>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={editFormData.customerName || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, customerName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={editFormData.projectName || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, projectName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">No Of Share <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={editFormData.noOfShare || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, noOfShare: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Amount <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={editFormData.shareAmount || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, shareAmount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Paid Amount <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={editFormData.paidAmount || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, paidAmount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Cost <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={editFormData.totalCost || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, totalCost: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Balance</label>
                  <input
                    type="text"
                    value={editFormData.balance || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, balance: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Due</label>
                  <input
                    type="text"
                    value={editFormData.due || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, due: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors shadow-sm"
                >
                  Update Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CUSTOMER PROFILE (Matching 3rd & 4th images detailed profile view) ================= */}
      {isProfileOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <span className="font-bold text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-teal-400" /> Customer Complete Profile & Share Portfolio
              </span>
              <button onClick={() => setIsProfileOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 bg-white text-xs">
              {/* Profile Card Top Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <img 
                  src={selectedCustomer.image} 
                  alt={selectedCustomer.customerName} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" 
                />
                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-lg font-bold text-slate-900">{selectedCustomer.customerName}</h2>
                  <p className="font-semibold text-teal-600">Project: {selectedCustomer.projectName}</p>
                  <p className="text-slate-500">{selectedCustomer.address}</p>
                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="px-2.5 py-0.5 rounded-full font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                      Total Shares: {selectedCustomer.noOfShare}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Paid: ৳ {selectedCustomer.paidAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Personal & Financial Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 font-bold text-slate-700">
                    Personal & Nominee Information
                  </div>
                  <div className="p-4 space-y-2.5 text-slate-700">
                    <div className="flex justify-between"><span className="text-slate-500">Father's Name:</span><span className="font-semibold">{selectedCustomer.fatherName}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Occupation:</span><span className="font-semibold">{selectedCustomer.occupation}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">NID Number:</span><span className="font-mono font-semibold">{selectedCustomer.nid}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Nominee Name:</span><span className="font-semibold">{selectedCustomer.nomineeName}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Nominee Relation:</span><span className="font-semibold">{selectedCustomer.nomineeRelation}</span></div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 font-bold text-slate-700">
                    Financial Summary & Banking
                  </div>
                  <div className="p-4 space-y-2.5 text-slate-700">
                    <div className="flex justify-between"><span className="text-slate-500">Share Amount:</span><span className="font-mono font-semibold">৳ {selectedCustomer.shareAmount}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Paid Amount:</span><span className="font-mono font-semibold text-emerald-600">৳ {selectedCustomer.paidAmount}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Due Amount:</span><span className="font-mono font-semibold text-rose-600">৳ {selectedCustomer.due}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Bank Name:</span><span className="font-semibold">{selectedCustomer.bankName}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Account No:</span><span className="font-mono font-semibold">{selectedCustomer.accountNo}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}