'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  User, 
  Trash2, 
  X, 
  Upload,
  FileText
} from 'lucide-react';

// Type definitions matching the Investor schema structure
export interface Nominee {
  id?: number;
  nomineeName: string;
  nomineeNid: string;
  relation: string;
  percentage: string;
}

export interface Investor {
  id: number;
  code: string;
  name: string;
  mobile: string;
  email: string;
  nid: string;
  address: string;
  image?: string;
  chartOfGroups: string;
  under: string;
  nominees: Nominee[];
}

// Comprehensive mock data containing plenty of entries so tables are completely filled without empty spaces
const initialInvestors: Investor[] = [
  {
    id: 1,
    code: 'INV8881001',
    name: 'Tanvir Ahmed',
    mobile: '01811223344',
    email: 'tanvir.ahmed@gmail.com',
    nid: '1992837465012',
    address: 'House 42, Road 11, Banani, Dhaka',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    chartOfGroups: 'Tier 1 - Primary Investor',
    under: 'General Group',
    nominees: [
      { id: 1, nomineeName: 'Nusrat Jahan', nomineeNid: '1995837465013', relation: 'Spouse', percentage: '60' },
      { id: 2, nomineeName: 'Rafid Ahmed', nomineeNid: '2015837465014', relation: 'Son', percentage: '40' }
    ]
  },
  {
    id: 2,
    code: 'INV8881002',
    name: 'Farhana Sultana',
    mobile: '01711556677',
    email: 'farhana.s@yahoo.com',
    nid: '1988554433221',
    address: 'Flat 5A, Uttara Heights, Dhaka',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    chartOfGroups: 'Tier 2 - Strategic Partner',
    under: 'Corporate Group',
    nominees: [
      { id: 1, nomineeName: 'Kamal Uddin', nomineeNid: '1982554433222', relation: 'Brother', percentage: '100' }
    ]
  },
  {
    id: 3,
    code: 'INV8881003',
    name: 'Mahbub Alam',
    mobile: '01922334455',
    email: 'mahbub.alam@outlook.com',
    nid: '1975443322119',
    address: 'GEC Circle, Chattogram',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    chartOfGroups: 'Tier 1 - Primary Investor',
    under: 'General Group',
    nominees: [
      { id: 1, nomineeName: 'Salma Begum', nomineeNid: '1978443322118', relation: 'Spouse', percentage: '50' },
      { id: 2, nomineeName: 'Adib Alam', nomineeNid: '2005443322117', relation: 'Son', percentage: '50' }
    ]
  },
  {
    id: 4,
    code: 'INV8881004',
    name: 'Sharmin Akter',
    mobile: '01655443322',
    email: 'sharmin.akter@gmail.com',
    nid: '1990112233445',
    address: 'Zindabazar, Sylhet',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    chartOfGroups: 'Tier 3 - Regional Affiliate',
    under: 'Sylhet Chapter',
    nominees: [
      { id: 1, nomineeName: 'Abul Kashem', nomineeNid: '1965112233446', relation: 'Father', percentage: '100' }
    ]
  },
  {
    id: 5,
    code: 'INV8881005',
    name: 'Golam Mostafa',
    mobile: '01533221100',
    email: 'golam.mostafa@enterprise.com',
    nid: '1982998877665',
    address: 'Station Road, Rajshahi',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    chartOfGroups: 'Tier 2 - Strategic Partner',
    under: 'Northern Hub',
    nominees: [
      { id: 1, nomineeName: 'Jahanara Begum', nomineeNid: '1985998877664', relation: 'Spouse', percentage: '70' },
      { id: 2, nomineeName: 'Fahim Mostafa', nomineeNid: '2010998877663', relation: 'Son', percentage: '30' }
    ]
  },
  {
    id: 6,
    code: 'INV8881006',
    name: 'Nazmul Hossain',
    mobile: '01899887766',
    email: 'nazmul.hossain@gmail.com',
    nid: '1993445566778',
    address: 'CDA Avenue, Chattogram',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    chartOfGroups: 'Tier 1 - Primary Investor',
    under: 'General Group',
    nominees: [
      { id: 1, nomineeName: 'Roksana Akter', nomineeNid: '1995445566779', relation: 'Spouse', percentage: '100' }
    ]
  },
  {
    id: 7,
    code: 'INV8881007',
    name: 'Rubina Yasmin',
    mobile: '01744556688',
    email: 'rubina.yasmin@gmail.com',
    nid: '1987778899001',
    address: 'Baliapara, Dinajpur',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    chartOfGroups: 'Tier 3 - Regional Affiliate',
    under: 'Dinajpur Unit',
    nominees: [
      { id: 1, nomineeName: 'Tariqul Islam', nomineeNid: '1985778899002', relation: 'Spouse', percentage: '50' },
      { id: 2, nomineeName: 'Lamia Islam', nomineeNid: '2012778899003', relation: 'Daughter', percentage: '50' }
    ]
  },
  {
    id: 8,
    code: 'INV8881008',
    name: 'Moniruzzaman Khan',
    mobile: '01311224466',
    email: 'monir.khan@corporate.net',
    nid: '1979332211445',
    address: 'Taltola, Sylhet',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    chartOfGroups: 'Tier 2 - Strategic Partner',
    under: 'Sylhet Chapter',
    nominees: [
      { id: 1, nomineeName: 'Fatema Khan', nomineeNid: '1981332211446', relation: 'Spouse', percentage: '100' }
    ]
  },
  {
    id: 9,
    code: 'INV8881009',
    name: 'Asif Mahmud',
    mobile: '01855443322',
    email: 'asif.mahmud@tech.io',
    nid: '1996221144556',
    address: 'Dhanmondi 27, Dhaka',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    chartOfGroups: 'Tier 1 - Primary Investor',
    under: 'General Group',
    nominees: [
      { id: 1, nomineeName: 'Zohra Mahmud', nomineeNid: '1968221144557', relation: 'Mother', percentage: '100' }
    ]
  },
  {
    id: 10,
    code: 'INV8881010',
    name: 'Nayeem Islam',
    mobile: '01677889900',
    email: 'nayeem.islam@invest.org',
    nid: '1991665544332',
    address: 'Sholashahar, Chattogram',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    chartOfGroups: 'Tier 3 - Regional Affiliate',
    under: 'Chittagong Hub',
    nominees: [
      { id: 1, nomineeName: 'Taslima Jahan', nomineeNid: '1994665544333', relation: 'Spouse', percentage: '100' }
    ]
  }
];

export default function InvestorManagementPage() {
  const [investors, setInvestors] = useState<Investor[]>(initialInvestors);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState<Partial<Investor>>({
    code: 'INV888' + Math.floor(1000 + Math.random() * 9000),
    name: '',
    mobile: '',
    email: '',
    nid: '',
    address: '',
    chartOfGroups: '',
    under: 'General Group',
    nominees: [{ nomineeName: '', nomineeNid: '', relation: '', percentage: '' }]
  });

  // Filtered data based on search input
  const filteredInvestors = investors.filter(inv =>
    inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.mobile.includes(searchQuery) ||
    inv.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.nid.includes(searchQuery)
  );

  // Handlers for Add/Edit Form nominee rows
  const handleNomineeChange = (index: number, field: keyof Nominee, value: string) => {
    const updatedNominees = [...(formData.nominees || [])];
    updatedNominees[index] = { ...updatedNominees[index], [field]: value };
    setFormData({ ...formData, nominees: updatedNominees });
  };

  const addNomineeRow = () => {
    setFormData({
      ...formData,
      nominees: [...(formData.nominees || []), { nomineeName: '', nomineeNid: '', relation: '', percentage: '' }]
    });
  };

  const removeNomineeRow = (index: number) => {
    const updatedNominees = (formData.nominees || []).filter((_, i) => i !== index);
    setFormData({ ...formData, nominees: updatedNominees });
  };

  // Submit Handler for Add
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvestor: Investor = {
      id: investors.length + 1,
      code: formData.code || 'INV8881000',
      name: formData.name || '',
      mobile: formData.mobile || '',
      email: formData.email || '',
      nid: formData.nid || '',
      address: formData.address || '',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      chartOfGroups: formData.chartOfGroups || 'Tier 1 - Primary Investor',
      under: formData.under || 'General Group',
      nominees: formData.nominees || []
    };
    setInvestors([newInvestor, ...investors]);
    setIsAddOpen(false);
    resetFormState();
  };

  // Submit Handler for Edit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvestor) return;
    setInvestors(investors.map(inv => inv.id === selectedInvestor.id ? { ...inv, ...formData } as Investor : inv));
    setIsEditOpen(false);
    setSelectedInvestor(null);
  };

  // Delete Handler
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this investor record?')) {
      setInvestors(investors.filter(inv => inv.id !== id));
    }
  };

  const openEditModal = (investor: Investor) => {
    setSelectedInvestor(investor);
    setFormData({
      code: investor.code,
      name: investor.name,
      mobile: investor.mobile,
      email: investor.email,
      nid: investor.nid,
      address: investor.address,
      chartOfGroups: investor.chartOfGroups,
      under: investor.under,
      nominees: investor.nominees.length > 0 ? [...investor.nominees] : [{ nomineeName: '', nomineeNid: '', relation: '', percentage: '' }]
    });
    setIsEditOpen(true);
  };

  const openProfileModal = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsProfileOpen(true);
  };

  const resetFormState = () => {
    setFormData({
      code: 'INV888' + Math.floor(1000 + Math.random() * 9000),
      name: '',
      mobile: '',
      email: '',
      nid: '',
      address: '',
      chartOfGroups: '',
      under: 'General Group',
      nominees: [{ nomineeName: '', nomineeNid: '', relation: '', percentage: '' }]
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-6 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Breadcrumb and Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
              <span>Home</span> / <span className="text-indigo-600 font-medium">Investor</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Investor Management</h1>
          </div>
          <button
            onClick={() => { resetFormState(); setIsAddOpen(true); }}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Investor
          </button>
        </div>

        {/* Controls: Show Entries & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                placeholder="Search investor records..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Modern Data Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-indigo-600 text-white font-medium text-xs tracking-wider uppercase">
                  <th className="py-3 px-4">SL</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">NID</th>
                  <th className="py-3 px-4">Under</th>
                  <th className="py-3 px-4 text-center">Image</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvestors.length > 0 ? (
                  filteredInvestors.map((investor, index) => (
                    <tr key={investor.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-600">{index + 1}</td>
                      <td className="py-3 px-4 font-mono text-xs text-indigo-600 font-semibold">{investor.code}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{investor.name}</td>
                      <td className="py-3 px-4 text-slate-600">{investor.mobile}</td>
                      <td className="py-3 px-4 text-slate-600">{investor.email}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-600">{investor.nid}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {investor.under}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <img 
                          src={investor.image} 
                          alt={investor.name} 
                          className="w-9 h-9 rounded-full object-cover mx-auto border border-slate-200 shadow-xs" 
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center justify-center gap-1.5">
                          {/* Profile Action Button */}
                          <button
                            onClick={() => openProfileModal(investor)}
                            title="View Profile / Details"
                            className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md transition-colors"
                          >
                            <User className="w-4 h-4" />
                          </button>
                          {/* Edit Action Button */}
                          <button
                            onClick={() => openEditModal(investor)}
                            title="Edit Investor"
                            className="p-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-md transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {/* Delete Action Button */}
                          <button
                            onClick={() => handleDelete(investor.id)}
                            title="Delete Investor"
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
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500">
            <div>Showing 1 to {filteredInvestors.length} of {filteredInvestors.length} entries</div>
            <div className="inline-flex items-center gap-1">
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 rounded border border-indigo-600 bg-indigo-600 text-white font-medium">1</button>
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT INVESTOR FORM (Exact Spec 2nd & 5th Image Layout) ================= */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900 text-base">
                {isAddOpen ? 'Add New Investor' : 'Edit Investor'}
              </h3>
              <button 
                onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={isAddOpen ? handleAddSubmit : handleEditSubmit} className="p-6 space-y-6">
              {/* Main Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Code <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mobile <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Mobile"
                    value={formData.mobile || ''}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">NID <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="NID"
                    value={formData.nid || ''}
                    onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Image</label>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                    <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-3 py-2 cursor-pointer border-r border-slate-300 transition-colors flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-slate-500" /> Choose File
                      <input type="file" className="hidden" />
                    </label>
                    <span className="px-3 text-xs text-slate-400">No file chosen</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Chart Of Groups <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={formData.chartOfGroups || ''}
                    onChange={(e) => setFormData({ ...formData, chartOfGroups: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select One Option</option>
                    <option value="Tier 1 - Primary Investor">Tier 1 - Primary Investor</option>
                    <option value="Tier 2 - Strategic Partner">Tier 2 - Strategic Partner</option>
                    <option value="Tier 3 - Regional Affiliate">Tier 3 - Regional Affiliate</option>
                  </select>
                </div>
              </div>

              {/* Nominee Details Section (Exact matching 2nd Image Layout) */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                <div className="bg-indigo-600 text-white font-medium px-4 py-2 text-sm flex items-center justify-between">
                  <span>Nominee Details</span>
                </div>
                <div className="p-4 space-y-3">
                  {formData.nominees?.map((nominee, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-2 first:pt-0">
                      <div className="sm:col-span-3">
                        <label className="block text-xs text-slate-500 mb-1">Nominee Name</label>
                        <input
                          type="text"
                          placeholder="Nominee Name"
                          value={nominee.nomineeName}
                          onChange={(e) => handleNomineeChange(idx, 'nomineeName', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs text-slate-500 mb-1">Nominee NID</label>
                        <input
                          type="text"
                          placeholder="Nominee NID"
                          value={nominee.nomineeNid}
                          onChange={(e) => handleNomineeChange(idx, 'nomineeNid', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs text-slate-500 mb-1">Relation</label>
                        <input
                          type="text"
                          placeholder="Relation"
                          value={nominee.relation}
                          onChange={(e) => handleNomineeChange(idx, 'relation', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-slate-500 mb-1">Percentage (%)</label>
                        <input
                          type="text"
                          placeholder="Percentage"
                          value={nominee.percentage}
                          onChange={(e) => handleNomineeChange(idx, 'percentage', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-1 flex items-end justify-center pt-5">
                        {idx === 0 ? (
                          <button
                            type="button"
                            onClick={addNomineeRow}
                            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-xs"
                            title="Add Nominee"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeNomineeRow(idx)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                            title="Remove Nominee"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                  className="px-5 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PROFILE DETAILS & NOMINEE INFO (Exact Spec 3rd & 4th Image Layout) ================= */}
      {isProfileOpen && selectedInvestor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" /> Investor Full Profile Details
              </span>
              <button onClick={() => setIsProfileOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 bg-white">
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <img 
                  src={selectedInvestor.image} 
                  alt={selectedInvestor.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" 
                />
                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold text-slate-900">{selectedInvestor.name}</h2>
                  <p className="text-xs font-mono text-indigo-600 font-semibold">{selectedInvestor.code}</p>
                  <p className="text-xs text-slate-500">{selectedInvestor.address}</p>
                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Group: {selectedInvestor.chartOfGroups}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Under: {selectedInvestor.under}
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Information Summary Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 font-bold text-xs text-slate-700 uppercase tracking-wider">
                  Contact & Identification Info
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-xs">
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-slate-500">Mobile:</span><span className="font-medium text-slate-800">{selectedInvestor.mobile}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-medium text-slate-800">{selectedInvestor.email}</span></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-slate-500">NID Number:</span><span className="font-mono font-medium text-slate-800">{selectedInvestor.nid}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Address:</span><span className="font-medium text-slate-800">{selectedInvestor.address}</span></div>
                  </div>
                </div>
              </div>

              {/* Nominee Details Table Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Nominee Information</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-indigo-600 text-white font-medium uppercase tracking-wider">
                        <th className="py-2.5 px-3">SL</th>
                        <th className="py-2.5 px-3">Nominee Name</th>
                        <th className="py-2.5 px-3">Nominee NID</th>
                        <th className="py-2.5 px-3">Relation</th>
                        <th className="py-2.5 px-3">Percentage (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedInvestor.nominees && selectedInvestor.nominees.length > 0 ? (
                        selectedInvestor.nominees.map((nom, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3 font-medium text-slate-600">{idx + 1}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-900">{nom.nomineeName}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-600">{nom.nomineeNid}</td>
                            <td className="py-2.5 px-3 text-slate-600">{nom.relation}</td>
                            <td className="py-2.5 px-3 font-semibold text-indigo-600">{nom.percentage}%</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-slate-400">No nominee records registered.</td>
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
    </div>
  );
}