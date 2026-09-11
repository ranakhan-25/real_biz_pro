'use client';

import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  User, 
  Edit, 
  Trash2, 
  ChevronRight, 
  Home, 
  X, 
  Save, 
  FileText,  
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';

// TypeScript Interface matching the exact columns requested:
// ID | SHAREHOLDER NAME | LAST DATE | SHARE AMOUNT | PAY DATE | CODE | PAID AMOUNT | DUE AMOUNT | SHARE PAYMENT POINT
export interface ShareholderReportItem {
  id: string;
  shareholderName: string;
  lastDate: string;
  shareAmount: string;
  payDate: string;
  code: string;
  paidAmount: string;
  dueAmount: string;
  sharePaymentPoint: number;
  projectName: string;
  mobile: string;
  email: string;
  address: string;
  nomineeName: string;
  nomineeRelation: string;
}

// Extensive dummy dataset filling the table completely with zero blank spaces
const initialReportData: ShareholderReportItem[] = [
  { id: '1', shareholderName: 'Tanvir Ahmed', lastDate: '28 Feb 2026', shareAmount: '500,000', payDate: '01 Mar 2026', code: 'SH-AH-101', paidAmount: '400,000', dueAmount: '100,000', sharePaymentPoint: 45, projectName: 'Alpha Heights', mobile: '01711223344', email: 'tanvir@gmail.com', address: 'Dhanmondi, Dhaka', nomineeName: 'Sabina Yasmin', nomineeRelation: 'Wife' },
  { id: '2', shareholderName: 'Farhana Sultana', lastDate: '25 Feb 2026', shareAmount: '1,200,000', payDate: '28 Feb 2026', code: 'SH-BC-102', paidAmount: '1,000,000', dueAmount: '200,000', sharePaymentPoint: 120, projectName: 'Beta Commercial', mobile: '01822334455', email: 'farhana@gmail.com', address: 'Gulshan, Dhaka', nomineeName: 'Rafiqul Islam', nomineeRelation: 'Father' },
  { id: '3', shareholderName: 'Mahbub Alam', lastDate: '20 Feb 2026', shareAmount: '2,000,000', payDate: '24 Feb 2026', code: 'SH-GG-103', paidAmount: '1,500,000', dueAmount: '500,000', sharePaymentPoint: 150, projectName: 'Green Valley', mobile: '01933445566', email: 'mahbub@gmail.com', address: 'Agrabad, Chittagong', nomineeName: 'Nusrat Jahan', nomineeRelation: 'Sister' },
  { id: '4', shareholderName: 'Sharmin Akter', lastDate: '18 Feb 2026', shareAmount: '750,000', payDate: '22 Feb 2026', code: 'SH-DR-104', paidAmount: '650,000', dueAmount: '100,000', sharePaymentPoint: 65, projectName: 'Delta Residency', mobile: '01644556677', email: 'sharmin@gmail.com', address: 'Zindabazar, Sylhet', nomineeName: 'Kamal Hossain', nomineeRelation: 'Husband' },
  { id: '5', shareholderName: 'Golam Mostafa', lastDate: '15 Feb 2026', shareAmount: '1,500,000', payDate: '19 Feb 2026', code: 'SH-OS-105', paidAmount: '1,200,000', dueAmount: '300,000', sharePaymentPoint: 110, projectName: 'Silicon City', mobile: '01555667788', email: 'mostafa@gmail.com', address: 'GEC Circle, Chittagong', nomineeName: 'Fatema Khatun', nomineeRelation: 'Mother' },
  { id: '6', shareholderName: 'Nazmul Hossain', lastDate: '12 Feb 2026', shareAmount: '900,000', payDate: '15 Feb 2026', code: 'SH-ST-106', paidAmount: '800,000', dueAmount: '100,000', sharePaymentPoint: 80, projectName: 'Sigma Tower', mobile: '01766778899', email: 'nazmul@gmail.com', address: 'Rajshahi Sadar', nomineeName: 'Momena Begum', nomineeRelation: 'Mother' },
  { id: '7', shareholderName: 'Rubina Yasmin', lastDate: '10 Feb 2026', shareAmount: '3,000,000', payDate: '14 Feb 2026', code: 'SH-TA-107', paidAmount: '2,400,000', dueAmount: '600,000', sharePaymentPoint: 240, projectName: 'Agro Farm', mobile: '01877889900', email: 'rubina@gmail.com', address: 'Khulna Sadar', nomineeName: 'Anisur Rahman', nomineeRelation: 'Husband' },
  { id: '8', shareholderName: 'Moniruzzaman Khan', lastDate: '08 Feb 2026', shareAmount: '1,100,000', payDate: '11 Feb 2026', code: 'SH-KP-108', paidAmount: '950,000', dueAmount: '150,000', sharePaymentPoint: 95, projectName: 'Kappa Plaza', mobile: '01988990011', email: 'monir@gmail.com', address: 'Uttara, Dhaka', nomineeName: 'Shahnaz Khan', nomineeRelation: 'Wife' },
  { id: '9', shareholderName: 'Jannatul Ferdous', lastDate: '05 Feb 2026', shareAmount: '500,000', payDate: '08 Feb 2026', code: 'SH-AH-109', paidAmount: '500,000', dueAmount: '0', sharePaymentPoint: 50, projectName: 'Alpha Heights', mobile: '01699001122', email: 'jannat@gmail.com', address: 'Mirpur, Dhaka', nomineeName: 'Abdul Mannan', nomineeRelation: 'Father' },
  { id: '10', shareholderName: 'Imran Chowdhury', lastDate: '01 Feb 2026', shareAmount: '1,200,000', payDate: '04 Feb 2026', code: 'SH-BC-110', paidAmount: '1,100,000', dueAmount: '100,000', sharePaymentPoint: 110, projectName: 'Beta Commercial', mobile: '01700112233', email: 'imran@gmail.com', address: 'Nasirabad, Chittagong', nomineeName: 'Ruksana Chowdhury', nomineeRelation: 'Wife' },
  { id: '11', shareholderName: 'Afroza Banu', lastDate: '28 Jan 2026', shareAmount: '800,000', payDate: '31 Jan 2026', code: 'SH-AB-111', paidAmount: '800,000', dueAmount: '0', sharePaymentPoint: 80, projectName: 'Green Valley', mobile: '01811223344', email: 'afroza@gmail.com', address: 'Sylhet Sadar', nomineeName: 'Delwar Hossain', nomineeRelation: 'Husband' },
  { id: '12', shareholderName: 'Kamrul Hasan', lastDate: '25 Jan 2026', shareAmount: '1,600,000', payDate: '29 Jan 2026', code: 'SH-KH-112', paidAmount: '1,300,000', dueAmount: '300,000', sharePaymentPoint: 130, projectName: 'Delta Residency', mobile: '01922334455', email: 'kamrul@gmail.com', address: 'Comilla Sadar', nomineeName: 'Nazma Begum', nomineeRelation: 'Mother' }
];

export default function ShareholderPointReportPage() {
  const [reportData, setReportData] = useState<ShareholderReportItem[]>(initialReportData);
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modal controls
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<ShareholderReportItem | null>(null);

  // Form state for add / edit
  const [formData, setFormData] = useState({
    shareholderName: '',
    projectName: 'Alpha Heights',
    mobile: '01700000000',
    email: 'customer@gmail.com',
    address: 'Dhaka, Bangladesh',
    nomineeName: 'Nominee Name',
    nomineeRelation: 'Wife',
    lastDate: '28 Feb 2026',
    shareAmount: '500,000',
    payDate: '01 Mar 2026',
    code: 'SH-AH-999',
    paidAmount: '400,000',
    dueAmount: '100,000',
    sharePaymentPoint: 40
  });

  // Filtering logic
  const filteredData = reportData.filter(item => {
    const matchesProject = selectedProject === 'All' || item.projectName === selectedProject;
    const matchesCustomer = selectedCustomer === 'All' || item.shareholderName === selectedCustomer;
    const matchesSearch = 
      item.shareholderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesCustomer && matchesSearch;
  });

  // Total calculation for the footer row
  const totalPoints = filteredData.reduce((acc, curr) => acc + curr.sharePaymentPoint, 0);

  // Handlers
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ShareholderReportItem = {
      id: Date.now().toString(),
      ...formData
    };
    setReportData([newItem, ...reportData]);
    setIsAddOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;
    setReportData(reportData.map(item => item.id === activeItem.id ? { ...item, ...formData } : item));
    setIsEditOpen(false);
    setActiveItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setReportData(reportData.filter(item => item.id !== id));
    }
  };

  const openEditModal = (item: ShareholderReportItem) => {
    setActiveItem(item);
    setFormData({
      shareholderName: item.shareholderName,
      projectName: item.projectName,
      mobile: item.mobile,
      email: item.email,
      address: item.address,
      nomineeName: item.nomineeName,
      nomineeRelation: item.nomineeRelation,
      lastDate: item.lastDate,
      shareAmount: item.shareAmount,
      payDate: item.payDate,
      code: item.code,
      paidAmount: item.paidAmount,
      dueAmount: item.dueAmount,
      sharePaymentPoint: item.sharePaymentPoint
    });
    setIsEditOpen(true);
  };

  const openProfileModal = (item: ShareholderReportItem) => {
    setActiveItem(item);
    setIsProfileOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between p-4 sm:p-6 font-sans">
      <div className="space-y-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pb-1">
          <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="hover:text-indigo-600 cursor-pointer">Share Project</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-indigo-600 font-semibold">ShareHolder Point Report</span>
        </div>

        {/* Top Control Filter & Action Bar */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto flex-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Project</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="All">Select a project</option>
                <option value="Alpha Heights">Alpha Heights</option>
                <option value="Beta Commercial">Beta Commercial</option>
                <option value="Green Valley">Green Valley</option>
                <option value="Delta Residency">Delta Residency</option>
                <option value="Silicon City">Silicon City</option>
                <option value="Sigma Tower">Sigma Tower</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Customer</label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="All">Select value</option>
                {reportData.map((c) => (
                  <option key={c.id} value={c.shareholderName}>{c.shareholderName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto justify-end pt-2 lg:pt-5">
            <button
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" /> Add Customer
            </button>
            <button className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <FileText className="w-3.5 h-3.5" /> PDF
            </button>
            <button className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Excel
            </button>
          </div>
        </div>

        {/* Entries & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-300 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                placeholder="Search name, code..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Dense Full-Content Table (Fixed column widths & alignment) */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                  <th className="py-3 px-3 w-12">ID</th>
                  <th className="py-3 px-3">SHAREHOLDER NAME</th>
                  <th className="py-3 px-3">LAST DATE</th>
                  <th className="py-3 px-3">SHARE AMOUNT</th>
                  <th className="py-3 px-3">PAY DATE</th>
                  <th className="py-3 px-3">CODE</th>
                  <th className="py-3 px-3">PAID AMOUNT</th>
                  <th className="py-3 px-3">DUE AMOUNT</th>
                  <th className="py-3 px-3 text-center">SHARE PAYMENT POINT</th>
                  <th className="py-3 px-3 text-center w-28">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.slice(0, entriesPerPage).map((item, index) => (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-600">{index + 1}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {item.shareholderName}
                        <div className="text-[10px] text-indigo-600 font-normal">{item.projectName}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">{item.lastDate}</td>
                      <td className="py-3 px-3 font-mono text-slate-700 font-semibold whitespace-nowrap">৳ {item.shareAmount}</td>
                      <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">{item.payDate}</td>
                      <td className="py-3 px-3 font-mono text-indigo-700 font-bold whitespace-nowrap">{item.code}</td>
                      <td className="py-3 px-3 font-mono text-emerald-600 font-bold whitespace-nowrap">৳ {item.paidAmount}</td>
                      <td className="py-3 px-3 font-mono text-rose-600 font-bold whitespace-nowrap">৳ {item.dueAmount}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-indigo-600 bg-indigo-50/40">{item.sharePaymentPoint}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Profile Action Button (Human Icon) */}
                          <button
                            type="button"
                            onClick={() => openProfileModal(item)}
                            title="View Profile"
                            className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
                          >
                            <User className="w-3.5 h-3.5" />
                          </button>
                          {/* Edit Action Button */}
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            title="Edit Record"
                            className="p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-md transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          {/* Delete Action Button */}
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            title="Delete Record"
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-slate-400 font-medium">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
              {/* Total Row */}
              <tfoot>
                <tr className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-200">
                  <td colSpan={8} className="py-3 px-3 text-right uppercase tracking-wider text-xs">TOTAL</td>
                  <td className="py-3 px-3 text-center font-mono text-indigo-700 text-sm">{totalPoints}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium">
            <div>Showing 1 to {Math.min(entriesPerPage, filteredData.length)} of {filteredData.length} entries</div>
            <div className="inline-flex items-center gap-1">
              <button type="button" disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
              <button type="button" className="px-3 py-1 rounded border border-[#5949d6] bg-[#5949d6] text-white font-semibold">1</button>
              <button type="button" disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MODAL 1: ADD CUSTOMER FORM ================= */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Add Shareholder & Payment Data
              </h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Shareholder Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.shareholderName}
                    onChange={(e) => setFormData({ ...formData, shareholderName: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                  <select
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Alpha Heights">Alpha Heights</option>
                    <option value="Beta Commercial">Beta Commercial</option>
                    <option value="Green Valley">Green Valley</option>
                    <option value="Delta Residency">Delta Residency</option>
                    <option value="Silicon City">Silicon City</option>
                    <option value="Sigma Tower">Sigma Tower</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="017xxxxxxxx"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="customer@email.com"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House, Area, City"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="SH-AH-111"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastDate}
                    onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                    placeholder="28 Feb 2026"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pay Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.payDate}
                    onChange={(e) => setFormData({ ...formData, payDate: e.target.value })}
                    placeholder="01 Mar 2026"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Amount (৳) *</label>
                  <input
                    type="text"
                    required
                    value={formData.shareAmount}
                    onChange={(e) => setFormData({ ...formData, shareAmount: e.target.value })}
                    placeholder="500,000"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Paid Amount (৳) *</label>
                  <input
                    type="text"
                    required
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    placeholder="400,000"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Due Amount (৳) *</label>
                  <input
                    type="text"
                    required
                    value={formData.dueAmount}
                    onChange={(e) => setFormData({ ...formData, dueAmount: e.target.value })}
                    placeholder="100,000"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Payment Point *</label>
                  <input
                    type="number"
                    required
                    value={formData.sharePaymentPoint}
                    onChange={(e) => setFormData({ ...formData, sharePaymentPoint: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-lg shadow-sm cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: PROFILE VIEW (Human Icon Click) ================= */}
      {isProfileOpen && activeItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" /> Shareholder Profile & Report Summary
              </h3>
              <button type="button" onClick={() => setIsProfileOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center gap-4 bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
                <div className="w-14 h-14 rounded-full bg-[#5949d6] text-white flex items-center justify-center font-bold text-xl shadow-md">
                  {activeItem.shareholderName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeItem.shareholderName}</h4>
                  <p className="text-indigo-600 font-semibold">{activeItem.projectName}</p>
                  <span className="inline-block mt-1 bg-white border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded font-mono text-[11px] font-bold">
                    Code: {activeItem.code}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Mobile</div>
                    <div className="font-mono font-bold text-slate-800">{activeItem.mobile}</div>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Email</div>
                    <div className="font-mono font-bold text-slate-800">{activeItem.email || 'N/A'}</div>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Address</div>
                    <div className="font-bold text-slate-800">{activeItem.address || 'N/A'}</div>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Payment Point</div>
                    <div className="font-mono font-bold text-indigo-600">{activeItem.sharePaymentPoint} Points</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-800 border-b border-slate-200 pb-1.5">Nominee Information</h5>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 font-medium">Nominee Name:</span>
                    <div className="font-bold text-slate-800">{activeItem.nomineeName || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Relation:</span>
                    <div className="font-bold text-slate-800">{activeItem.nomineeRelation || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-800 border-b border-slate-200 pb-1.5">Financial & Share Summary</h5>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Share Amount</div>
                    <div className="font-mono font-bold text-slate-800 text-xs">৳ {activeItem.shareAmount}</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Paid Amount</div>
                    <div className="font-mono font-bold text-emerald-600 text-xs">৳ {activeItem.paidAmount}</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Due Amount</div>
                    <div className="font-mono font-bold text-rose-600 text-xs">৳ {activeItem.dueAmount}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: EDIT FORM ================= */}
      {isEditOpen && activeItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-200">
            <div className="bg-amber-600 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Edit className="w-4 h-4" /> Edit Shareholder Report Data
              </h3>
              <button type="button" onClick={() => setIsEditOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Shareholder Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.shareholderName}
                    onChange={(e) => setFormData({ ...formData, shareholderName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                  <select
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Alpha Heights">Alpha Heights</option>
                    <option value="Beta Commercial">Beta Commercial</option>
                    <option value="Green Valley">Green Valley</option>
                    <option value="Delta Residency">Delta Residency</option>
                    <option value="Silicon City">Silicon City</option>
                    <option value="Sigma Tower">Sigma Tower</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastDate}
                    onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pay Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.payDate}
                    onChange={(e) => setFormData({ ...formData, payDate: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Amount (৳) *</label>
                  <input
                    type="text"
                    required
                    value={formData.shareAmount}
                    onChange={(e) => setFormData({ ...formData, shareAmount: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Paid Amount (৳) *</label>
                  <input
                    type="text"
                    required
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Due Amount (৳) *</label>
                  <input
                    type="text"
                    required
                    value={formData.dueAmount}
                    onChange={(e) => setFormData({ ...formData, dueAmount: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Payment Point *</label>
                  <input
                    type="number"
                    required
                    value={formData.sharePaymentPoint}
                    onChange={(e) => setFormData({ ...formData, sharePaymentPoint: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Update Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}