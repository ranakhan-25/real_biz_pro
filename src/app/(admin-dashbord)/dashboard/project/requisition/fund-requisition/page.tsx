'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  Home, 
  Layers, 
  Edit, 
  Trash2, 
  Calendar,
  DollarSign,
  X,
  CreditCard
} from 'lucide-react';

export interface FundRequisitionItem {
  id: string;
  date: string;
  project: string;
  from: string;
  amount: string;
  approvedAmount: string;
  paidAmount: string;
  purpose: string;
  reference: string;
  approvalLayers: string[];
  paymentStatus: 'Payment Left' | 'Partially Paid' | 'Fully Paid';
  addedBy: string;
  projectType: string;
  task: string;
  site: string;
}

const initialFundData: FundRequisitionItem[] = [
  { 
    id: '1', 
    date: '03 Sept 2026', 
    project: 'Sheba Eyecon Tower', 
    from: 'Mohin Uddin', 
    amount: '8585', 
    approvedAmount: '900', 
    paidAmount: '0', 
    purpose: 'Ch', 
    reference: 'taz00010', 
    approvalLayers: ['All Approval Done.', '✓ Rifat Hosain', '✓ Admin'], 
    paymentStatus: 'Payment Left', 
    addedBy: 'Admin',
    projectType: 'Real Estate',
    task: 'Foundation Piling',
    site: 'Site A - North Wing'
  },
  { 
    id: '2', 
    date: '04 Sept 2026', 
    project: 'Grand Meridian Hotel', 
    from: 'Tanvir Ahmed', 
    amount: '45000', 
    approvedAmount: '45000', 
    paidAmount: '45000', 
    purpose: 'Steel reinforcement bars purchase', 
    reference: 'taz00011', 
    approvalLayers: ['All Approval Done.', '✓ Rifat Hosain', '✓ Admin'], 
    paymentStatus: 'Fully Paid', 
    addedBy: 'Admin',
    projectType: 'Commercial',
    task: 'Structural Framework',
    site: 'Block B - Basement'
  },
  { 
    id: '3', 
    date: '05 Sept 2026', 
    project: 'Greenwich Eco Park', 
    from: 'Nusrat Jahan', 
    amount: '12500', 
    approvedAmount: '10000', 
    paidAmount: '5000', 
    purpose: 'Landscaping soil & fertilizer', 
    reference: 'taz00012', 
    approvalLayers: ['✓ Rifat Hosain', '⏳ Pending Admin'], 
    paymentStatus: 'Partially Paid', 
    addedBy: 'Nusrat Jahan',
    projectType: 'Civil Infrastructure',
    task: 'Garden Terracing',
    site: 'Zone 4 - East Gate'
  },
  { 
    id: '4', 
    date: '06 Sept 2026', 
    project: 'Silicon Tech Hub', 
    from: 'Shamim Khan', 
    amount: '85000', 
    approvedAmount: '80000', 
    paidAmount: '0', 
    purpose: 'Server rack cooling units supply', 
    reference: 'taz00013', 
    approvalLayers: ['All Approval Done.', '✓ Rifat Hosain', '✓ Admin'], 
    paymentStatus: 'Payment Left', 
    addedBy: 'Admin',
    projectType: 'Commercial',
    task: 'IT Infrastructure',
    site: 'Floor 12 - Server Room'
  },
  { 
    id: '5', 
    date: '07 Sept 2026', 
    project: 'Dhanmondi Lake View', 
    from: 'Rahim Chowdhury', 
    amount: '32000', 
    approvedAmount: '32000', 
    paidAmount: '32000', 
    purpose: 'UPVC glass sliding windows', 
    reference: 'taz00014', 
    approvalLayers: ['All Approval Done.', '✓ Rifat Hosain', '✓ Admin'], 
    paymentStatus: 'Fully Paid', 
    addedBy: 'Rahim Chowdhury',
    projectType: 'Residential',
    task: 'Exterior Glazing',
    site: 'Building 2 - Level 5'
  },
  { 
    id: '6', 
    date: '08 Sept 2026', 
    project: 'Uttara Heights', 
    from: 'Mohin Uddin', 
    amount: '18500', 
    approvedAmount: '15000', 
    paidAmount: '7500', 
    purpose: 'Plumbing PVC pipes & valves', 
    reference: 'taz00015', 
    approvalLayers: ['✓ Rifat Hosain', '✓ Admin'], 
    paymentStatus: 'Partially Paid', 
    addedBy: 'Admin',
    projectType: 'Real Estate',
    task: 'Sanitary Piping',
    site: 'Tower 1 - Ground Floor'
  },
  { 
    id: '7', 
    date: '09 Sept 2026', 
    project: 'Gulshan Plaza', 
    from: 'Tanvir Ahmed', 
    amount: '95000', 
    approvedAmount: '95000', 
    paidAmount: '0', 
    purpose: 'Automatic fire suppression system', 
    reference: 'taz00016', 
    approvalLayers: ['All Approval Done.', '✓ Rifat Hosain', '✓ Admin'], 
    paymentStatus: 'Payment Left', 
    addedBy: 'Admin',
    projectType: 'Commercial',
    task: 'Fire Safety Installation',
    site: 'Basement Parking'
  },
  { 
    id: '8', 
    date: '10 Sept 2026', 
    project: 'Bashundhara Executive', 
    from: 'Shamim Khan', 
    amount: '54000', 
    approvedAmount: '50000', 
    paidAmount: '50000', 
    purpose: 'Generator fuel tank installation', 
    reference: 'taz00017', 
    approvalLayers: ['All Approval Done.', '✓ Rifat Hosain', '✓ Admin'], 
    paymentStatus: 'Fully Paid', 
    addedBy: 'Shamim Khan',
    projectType: 'Real Estate',
    task: 'Power Backup Unit',
    site: 'Utility Yard'
  }
];

export default function FundRequisitionModule() {
  const [requisitions, setRequisitions] = useState<FundRequisitionItem[]>(initialFundData);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FundRequisitionItem | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    date: '10/09/2026',
    projectType: 'Real Estate',
    project: 'Sheba Eyecon Tower',
    task: 'Select Task',
    site: 'Select Site',
    from: 'Mohin Uddin',
    amount: '',
    purpose: '',
    reference: 'taz00018-PurchaseRequisition-0'
  });

  // Payment Form State
  const [paymentData, setPaymentData] = useState({
    date: '10/09/2026',
    voucherNo: 'P00005',
    account: 'ST112118-Mohin Uddin-0',
    isCheque: false,
    paymentMethod: '',
    amount: '',
    comment: ''
  });

  const filteredData = requisitions.filter(item => {
    const matchesSearch = 
      item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.addedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUser = userFilter === 'All' || item.addedBy === userFilter || item.from === userFilter;
    const matchesStatus = statusFilter === 'All' || item.paymentStatus === statusFilter;

    return matchesSearch && matchesUser && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: FundRequisitionItem = {
      id: Date.now().toString(),
      date: formData.date,
      project: formData.project,
      from: formData.from,
      amount: formData.amount || '0',
      approvedAmount: '0',
      paidAmount: '0',
      purpose: formData.purpose,
      reference: formData.reference,
      approvalLayers: ['⏳ Pending Admin Approval'],
      paymentStatus: 'Payment Left',
      addedBy: 'Shamim Khan',
      projectType: formData.projectType,
      task: formData.task,
      site: formData.site
    };
    setRequisitions([newItem, ...requisitions]);
    setIsAddModalOpen(false);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setRequisitions(requisitions.map(item => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            paidAmount: paymentData.amount || item.approvedAmount,
            paymentStatus: 'Fully Paid'
          };
        }
        return item;
      }));
    }
    setIsPaymentModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this fund requisition?')) {
      setRequisitions(requisitions.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between p-3 sm:p-5 font-sans">
      <div className="space-y-3 max-w-[1600px] mx-auto w-full">
        
        {/* Breadcrumb & Top Action Header */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
                <Home className="w-3.5 h-3.5" /> Home
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-600">Requisition</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-semibold">Fund Requisition List</span>
            </div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#5949d6]" /> Fund Requisition Management
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Fund Requisition Add
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Users</label>
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">Select an option</option>
              <option value="Admin">Admin</option>
              <option value="Mohin Uddin">Mohin Uddin</option>
              <option value="Tanvir Ahmed">Tanvir Ahmed</option>
              <option value="Shamim Khan">Shamim Khan</option>
              <option value="Nusrat Jahan">Nusrat Jahan</option>
              <option value="Rahim Chowdhury">Rahim Chowdhury</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Approve Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">Select an option</option>
              <option value="Payment Left">Payment Left</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Fully Paid">Fully Paid</option>
            </select>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-3">
          
          {/* Entries & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
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
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project, reference, user..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
            <div className="overflow-x-auto min-h-[350px]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                    <th className="py-3 px-3">SL</th>
                    <th className="py-3 px-3">DATE</th>
                    <th className="py-3 px-3">PROJECT</th>
                    <th className="py-3 px-3">FROM</th>
                    <th className="py-3 px-3">AMOUNT</th>
                    <th className="py-3 px-3">APPROVED AMOUNT</th>
                    <th className="py-3 px-3">PAID AMOUNT</th>
                    <th className="py-3 px-3">PURPOSE</th>
                    <th className="py-3 px-3">REFERENCE</th>
                    <th className="py-3 px-3">APPROVAL LAYERS</th>
                    <th className="py-3 px-3">PAYMENT STATUS</th>
                    <th className="py-3 px-3">ADDED BY</th>
                    <th className="py-3 px-3 text-center w-32">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.slice(0, entriesPerPage).map((item, index) => (
                      <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-500">{index + 1}</td>
                        <td className="py-3 px-3 text-slate-600">{item.date}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{item.project}</td>
                        <td className="py-3 px-3 font-medium text-slate-700">{item.from}</td>
                        <td className="py-3 px-3 font-bold text-slate-800">{item.amount}</td>
                        <td className="py-3 px-3 font-bold text-indigo-700">{item.approvedAmount}</td>
                        <td className="py-3 px-3 font-bold text-emerald-600">{item.paidAmount}</td>
                        <td className="py-3 px-3 text-slate-600">{item.purpose}</td>
                        <td className="py-3 px-3 font-mono text-slate-700">{item.reference}</td>
                        <td className="py-3 px-3">
                          <div className="space-y-0.5 text-[11px]">
                            {item.approvalLayers.map((layer, i) => (
                              <div key={i} className={`font-semibold ${layer.includes('Done') || layer.includes('✓') ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {layer}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-bold ${
                            item.paymentStatus === 'Fully Paid' ? 'bg-emerald-100 text-emerald-700' :
                            item.paymentStatus === 'Partially Paid' ? 'bg-blue-100 text-blue-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            {item.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-700">{item.addedBy}</td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Make Payment Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedItem(item);
                                setPaymentData({ ...paymentData, amount: item.approvedAmount || item.amount });
                                setIsPaymentModalOpen(true);
                              }}
                              className="bg-[#5949d6] hover:bg-[#4d3ec2] text-white p-1.5 rounded shadow-2xs transition-colors cursor-pointer"
                              title="Make Payment"
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                            </button>
                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedItem(item);
                                setIsEditModalOpen(true);
                              }}
                              className="bg-cyan-500 hover:bg-cyan-600 text-white p-1.5 rounded shadow-2xs transition-colors cursor-pointer"
                              title="Edit Record"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="bg-rose-500 hover:bg-rose-600 text-white p-1.5 rounded shadow-2xs transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={13} className="text-center py-12 text-slate-400 font-medium">
                        No fund requisition records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
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

      </div>

      {/* ================= MODAL 1: FUND REQUISITION ADD ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="bg-[#5949d6] text-white px-6 py-3.5 flex items-center justify-between">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <Plus className="w-4 h-4" /> Fund Requisition
              </h2>
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="mm/dd/yyyy"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Real Estate">Real Estate</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project</label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Sheba Eyecon Tower">Sheba Eyecon Tower</option>
                    <option value="Grand Meridian Hotel">Grand Meridian Hotel</option>
                    <option value="Silicon Tech Hub">Silicon Tech Hub</option>
                    <option value="Gulshan Plaza">Gulshan Plaza</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">If Task</label>
                  <select
                    value={formData.task}
                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Select Task">Select Task</option>
                    <option value="Foundation Piling">Foundation Piling</option>
                    <option value="Structural Framework">Structural Framework</option>
                    <option value="Fire Safety Installation">Fire Safety Installation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Site</label>
                  <select
                    value={formData.site}
                    onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Select Site">Select Site</option>
                    <option value="Site A - North Wing">Site A - North Wing</option>
                    <option value="Block B - Basement">Block B - Basement</option>
                    <option value="Basement Parking">Basement Parking</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">From</label>
                  <select
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Mohin Uddin">ST112118 (Mohin Uddin)</option>
                    <option value="Shamim Khan">ST112119 (Shamim Khan)</option>
                    <option value="Tanvir Ahmed">ST112120 (Tanvir Ahmed)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="Amount"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Purpose <span className="text-rose-500">*</span></label>
                  <textarea
                    rows={2}
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="Purpose of requisition..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">If Reference</label>
                  <select
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="taz00018-PurchaseRequisition-0">taz00018-PurchaseRequisition-0</option>
                    <option value="taz00019-PurchaseRequisition-1">taz00019-PurchaseRequisition-1</option>
                  </select>
                </div>

              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg font-semibold cursor-pointer shadow-sm transition-all"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-lg font-semibold cursor-pointer shadow-sm transition-all"
                >
                  Submit
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL 2: MAKE PAYMENT ================= */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="bg-[#5949d6] text-white px-6 py-3.5 flex items-center justify-between">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Make Payment
              </h2>
              <button 
                type="button" 
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={paymentData.date}
                      onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Voucher No</label>
                  <input
                    type="text"
                    value={paymentData.voucherNo}
                    onChange={(e) => setPaymentData({ ...paymentData, voucherNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Accounts <span className="text-rose-500">*</span></label>
                  <select
                    value={paymentData.account}
                    onChange={(e) => setPaymentData({ ...paymentData, account: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ST112118-Mohin Uddin-0">ST112118-Mohin Uddin-0</option>
                    <option value="ST112119-Shamim Khan-1">ST112119-Shamim Khan-1</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="block font-semibold text-slate-700 mb-1">Payment Method <span className="text-rose-500">*</span></label>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg">
                    <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={paymentData.isCheque}
                        onChange={(e) => setPaymentData({ ...paymentData, isCheque: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      If cheque
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Payment Method</label>
                  <select
                    value={paymentData.paymentMethod}
                    onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Mobile Banking">Mobile Banking (bKash/Nagad)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Comment</label>
                  <input
                    type="text"
                    value={paymentData.comment}
                    onChange={(e) => setPaymentData({ ...paymentData, comment: e.target.value })}
                    placeholder="Enter Comment"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Attachment</label>
                  <input
                    type="file"
                    className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>

              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg font-semibold cursor-pointer shadow-sm transition-all"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-lg font-semibold cursor-pointer shadow-sm transition-all"
                >
                  Submit
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}