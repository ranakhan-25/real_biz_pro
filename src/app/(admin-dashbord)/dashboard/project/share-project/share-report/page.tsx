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
  FileSpreadsheet
} from 'lucide-react';

// Type definitions matching the Shareholder Summary / Ledger report schema structure
export interface ShareholderLedger {
  id: string;
  shareholderName: string;
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
}

// Comprehensive mock data containing plenty of entries to fill the table seamlessly without any blank whitespace
const initialShareholderLedgers: ShareholderLedger[] = [
  {
    id: '1',
    shareholderName: 'Tanvir Ahmed',
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
    dateRange: '1 September, 2026 - 30 September, 2026'
  },
  {
    id: '2',
    shareholderName: 'Farhana Sultana',
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
    dateRange: '1 September, 2026 - 30 September, 2026'
  },
  {
    id: '3',
    shareholderName: 'Mahbub Alam',
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
    dateRange: '1 September, 2026 - 30 September, 2026'
  },
  {
    id: '4',
    shareholderName: 'Sharmin Akter',
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
    dateRange: '1 September, 2026 - 30 September, 2026'
  },
  {
    id: '5',
    shareholderName: 'Golam Mostafa',
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
    dateRange: '1 September, 2026 - 30 September, 2026'
  },
  {
    id: '6',
    shareholderName: 'Nazmul Hossain',
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
    dateRange: '1 September, 2026 - 30 September, 2026'
  },
  {
    id: '7',
    shareholderName: 'Rubina Yasmin',
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
    dateRange: '1 September, 2026 - 30 September, 2026'
  },
  {
    id: '8',
    shareholderName: 'Moniruzzaman Khan',
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
    dateRange: '1 September, 2026 - 30 September, 2026'
  },
  {
    id: '9',
    shareholderName: 'Asif Mahmud',
    projectName: 'Lambda Heights',
    noOfShare: '60',
    shareAmount: '600,000',
    paidAmount: '600,000',
    totalCost: '620,000',
    balance: '0',
    due: '20,000',
    mobile: '01855443322',
    email: 'asif.mahmud@tech.io',
    nid: '1996221144556',
    address: 'Dhanmondi 27, Dhaka',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026'
  },
  {
    id: '10',
    shareholderName: 'Nayeem Islam',
    projectName: 'Zeta Gardens',
    noOfShare: '250',
    shareAmount: '2,500,000',
    paidAmount: '2,000,000',
    totalCost: '2,550,000',
    balance: '0',
    due: '550,000',
    mobile: '01677889900',
    email: 'nayeem.islam@invest.org',
    nid: '1991665544332',
    address: 'Sholashahar, Chattogram',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    dateRange: '1 September, 2026 - 30 September, 2026'
  }
];

export default function ShareholderLedgerPage() {
  const [ledgers, setLedgers] = useState<ShareholderLedger[]>(initialShareholderLedgers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('1 September, 2026 - 30 September, 2026');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modals state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState<ShareholderLedger | null>(null);

  // Edit Form state matching schema fields
  const [formData, setFormData] = useState<Partial<ShareholderLedger>>({
    shareholderName: '',
    projectName: '',
    noOfShare: '',
    shareAmount: '',
    paidAmount: '',
    totalCost: '',
    balance: '',
    due: ''
  });

  // Filtered data based on project selection, date range, and search query
  const filteredLedgers = ledgers.filter(item => {
    const matchesProject = selectedProjectFilter ? item.projectName === selectedProjectFilter : true;
    const matchesSearch = 
      item.shareholderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  // Submit Handler for Edit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLedger) return;
    setLedgers(ledgers.map(item => item.id === selectedLedger.id ? { ...item, ...formData } as ShareholderLedger : item));
    setIsEditOpen(false);
    setSelectedLedger(null);
  };

  // Delete Handler
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this shareholder ledger entry?')) {
      setLedgers(ledgers.filter(item => item.id !== id));
    }
  };

  const openEditModal = (ledger: ShareholderLedger) => {
    setSelectedLedger(ledger);
    setFormData({
      shareholderName: ledger.shareholderName,
      projectName: ledger.projectName,
      noOfShare: ledger.noOfShare,
      shareAmount: ledger.shareAmount,
      paidAmount: ledger.paidAmount,
      totalCost: ledger.totalCost,
      balance: ledger.balance,
      due: ledger.due
    });
    setIsEditOpen(true);
  };

  const openProfileModal = (ledger: ShareholderLedger) => {
    setSelectedLedger(ledger);
    setIsProfileOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-6 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Top Control Bar with Datepicker, Project Selector, PDF & Excel export buttons matching Screenshot Image */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            {/* Select Date Input Box */}
            <div className="flex flex-col gap-1 w-full sm:w-80">
              <label className="text-xs font-medium text-slate-600">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Select Project Dropdown */}
            <div className="flex flex-col gap-1 w-full sm:w-80">
              <label className="text-xs font-medium text-slate-600">Select Project</label>
              <select
                value={selectedProjectFilter}
                onChange={(e) => setSelectedProjectFilter(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="">Select a project</option>
                <option value="Alpha Heights">Alpha Heights</option>
                <option value="Beta Commercial Complex">Beta Commercial Complex</option>
                <option value="Gamma Green Valley">Gamma Green Valley</option>
                <option value="Delta Residency">Delta Residency</option>
                <option value="Omega Silicon City">Omega Silicon City</option>
              </select>
            </div>
          </div>

          {/* PDF & Excel Action Buttons */}
          <div className="flex items-center gap-2 self-end lg:self-center">
            <button
              onClick={() => alert('Exporting PDF Report...')}
              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
            <button
              onClick={() => alert('Exporting Excel Spreadsheet...')}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
            </button>
          </div>
        </div>

        {/* Table Controls: Show Entries & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-slate-600">Search:</span>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shareholders..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Modern Data Table matching exact headers: ID, SHAREHOLDER NAME, NO OF SHARE, SHARE AMOUNT, PAID AMOUNT, TOTAL COST, BALANCE, DUE, ACTION */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-teal-600 text-white font-medium text-xs tracking-wider uppercase">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Shareholder Name</th>
                  <th className="py-3 px-4">No Of Share</th>
                  <th className="py-3 px-4">Share Amount</th>
                  <th className="py-3 px-4">Paid Amount</th>
                  <th className="py-3 px-4">Total Cost</th>
                  <th className="py-3 px-4">Balance</th>
                  <th className="py-3 px-4">Due</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLedgers.length > 0 ? (
                  filteredLedgers.slice(0, entriesPerPage).map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-600">{index + 1}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        <div>{item.shareholderName}</div>
                        <div className="text-xs text-slate-400 font-normal">{item.projectName}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">{item.noOfShare}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-700">৳ {item.shareAmount}</td>
                      <td className="py-3 px-4 font-mono text-xs text-emerald-600 font-medium">৳ {item.paidAmount}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-800">৳ {item.totalCost}</td>
                      <td className="py-3 px-4 font-mono text-xs text-blue-600">৳ {item.balance}</td>
                      <td className="py-3 px-4 font-mono text-xs text-rose-600 font-semibold">৳ {item.due}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center justify-center gap-1.5">
                          {/* Profile Action Button (Human Icon) */}
                          <button
                            onClick={() => openProfileModal(item)}
                            title="View Shareholder Profile"
                            className="p-1.5 bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-md transition-colors"
                          >
                            <User className="w-4 h-4" />
                          </button>
                          {/* Edit Action Button */}
                          <button
                            onClick={() => openEditModal(item)}
                            title="Edit Shareholder Record"
                            className="p-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-md transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {/* Delete Action Button */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete Shareholder Record"
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-slate-400 font-medium">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500">
            <div>Showing 1 to {Math.min(entriesPerPage, filteredLedgers.length)} of {filteredLedgers.length} entries</div>
            <div className="inline-flex items-center gap-1">
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 rounded border border-teal-600 bg-teal-600 text-white font-medium">1</button>
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL: EDIT SHAREHOLDER RECORD ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" /> Edit Shareholder Ledger Entry
              </h3>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Shareholder Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.shareholderName || ''}
                    onChange={(e) => setFormData({ ...formData, shareholderName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.projectName || ''}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">No Of Share <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.noOfShare || ''}
                    onChange={(e) => setFormData({ ...formData, noOfShare: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Share Amount <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.shareAmount || ''}
                    onChange={(e) => setFormData({ ...formData, shareAmount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Paid Amount <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.paidAmount || ''}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Total Cost <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.totalCost || ''}
                    onChange={(e) => setFormData({ ...formData, totalCost: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Balance</label>
                  <input
                    type="text"
                    value={formData.balance || ''}
                    onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Due</label>
                  <input
                    type="text"
                    value={formData.due || ''}
                    onChange={(e) => setFormData({ ...formData, due: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-5 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PROFILE DETAILS (Human Icon Click Modal) ================= */}
      {isProfileOpen && selectedLedger && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" /> Shareholder Financial Profile & Ledger
              </span>
              <button onClick={() => setIsProfileOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 bg-white">
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <img 
                  src={selectedLedger.image} 
                  alt={selectedLedger.shareholderName} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" 
                />
                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold text-slate-900">{selectedLedger.shareholderName}</h2>
                  <p className="text-xs font-semibold text-teal-600">Project: {selectedLedger.projectName}</p>
                  <p className="text-xs text-slate-500">{selectedLedger.address}</p>
                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                      Total Shares: {selectedLedger.noOfShare}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Paid: ৳ {selectedLedger.paidAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Breakdown Table Grid */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
                <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider">
                  Financial Summary & Contact Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-slate-500">Share Amount:</span><span className="font-mono font-medium text-slate-800">৳ {selectedLedger.shareAmount}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Paid Amount:</span><span className="font-mono font-medium text-emerald-600">৳ {selectedLedger.paidAmount}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Total Cost:</span><span className="font-mono font-medium text-slate-800">৳ {selectedLedger.totalCost}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Balance:</span><span className="font-mono font-medium text-blue-600">৳ {selectedLedger.balance}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Due Amount:</span><span className="font-mono font-semibold text-rose-600">৳ {selectedLedger.due}</span></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-slate-500">Mobile:</span><span className="font-medium text-slate-800">{selectedLedger.mobile}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-medium text-slate-800">{selectedLedger.email}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">NID:</span><span className="font-mono font-medium text-slate-800">{selectedLedger.nid}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Statement Period:</span><span className="font-medium text-slate-800">{selectedLedger.dateRange}</span></div>
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