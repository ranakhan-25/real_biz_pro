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
  Layers
} from 'lucide-react';

// Type definitions matching the Assign Share schema structure
export interface AssignShare {
  id: number;
  project: string;
  projectType: string;
  code: string;
  shareCode: string;
  name: string;
  noOfShare: string;
  flatLand: string;
  site?: string;
  customer?: string;
  note?: string;
  email?: string;
  mobile?: string;
  nid?: string;
  address?: string;
  image?: string;
}

// Comprehensive mock data containing plenty of entries to ensure tables are completely filled without empty spaces
const initialAssignShares: AssignShare[] = [
  {
    id: 1,
    project: 'Alpha Heights',
    projectType: 'Residential',
    code: 'PRJ-101',
    shareCode: 'SHR-173719',
    name: 'Tanvir Ahmed',
    noOfShare: '50',
    flatLand: 'Flat 4B (Tower A)',
    site: 'Site North',
    customer: 'Tanvir Ahmed',
    note: 'First installment cleared',
    email: 'tanvir.ahmed@gmail.com',
    mobile: '01811223344',
    nid: '1992837465012',
    address: 'House 42, Road 11, Banani, Dhaka',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 2,
    project: 'Beta Commercial Complex',
    projectType: 'Commercial',
    code: 'PRJ-102',
    shareCode: 'SHR-173720',
    name: 'Farhana Sultana',
    noOfShare: '120',
    flatLand: 'Shop 12 (Ground Floor)',
    site: 'Downtown Hub',
    customer: 'Farhana Sultana',
    note: 'Commercial allotment verified',
    email: 'farhana.s@yahoo.com',
    mobile: '01711556677',
    nid: '1988554433221',
    address: 'Flat 5A, Uttara Heights, Dhaka',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
  },
  {
    id: 3,
    project: 'Gamma Green Valley',
    projectType: 'Land Project',
    code: 'PRJ-103',
    shareCode: 'SHR-173721',
    name: 'Mahbub Alam',
    noOfShare: '200',
    flatLand: 'Plot 45 (Block C)',
    site: 'East Extension',
    customer: 'Mahbub Alam',
    note: 'Full payment received',
    email: 'mahbub.alam@outlook.com',
    mobile: '01922334455',
    nid: '1975443322119',
    address: 'GEC Circle, Chattogram',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 4,
    project: 'Delta Residency',
    projectType: 'Residential',
    code: 'PRJ-104',
    shareCode: 'SHR-173722',
    name: 'Sharmin Akter',
    noOfShare: '75',
    flatLand: 'Flat 7A (Tower B)',
    site: 'Site South',
    customer: 'Sharmin Akter',
    note: 'Pending documentation',
    email: 'sharmin.akter@gmail.com',
    mobile: '01655443322',
    nid: '1990112233445',
    address: 'Zindabazar, Sylhet',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    id: 5,
    project: 'Omega Silicon City',
    projectType: 'Commercial',
    code: 'PRJ-105',
    shareCode: 'SHR-173723',
    name: 'Golam Mostafa',
    noOfShare: '150',
    flatLand: 'Office 302 (Block D)',
    site: 'Tech Park Zone',
    customer: 'Golam Mostafa',
    note: 'Agreement signed',
    email: 'golam.mostafa@enterprise.com',
    mobile: '01533221100',
    nid: '1982998877665',
    address: 'Station Road, Rajshahi',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  },
  {
    id: 6,
    project: 'Sigma Tower',
    projectType: 'Residential',
    code: 'PRJ-106',
    shareCode: 'SHR-173724',
    name: 'Nazmul Hossain',
    noOfShare: '90',
    flatLand: 'Flat 2C (Tower A)',
    site: 'Site North',
    customer: 'Nazmul Hossain',
    note: 'Advance paid',
    email: 'nazmul.hossain@gmail.com',
    mobile: '01899887766',
    nid: '1993445566778',
    address: 'CDA Avenue, Chattogram',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  },
  {
    id: 7,
    project: 'Theta Agro Farm',
    projectType: 'Land Project',
    code: 'PRJ-107',
    shareCode: 'SHR-173725',
    name: 'Rubina Yasmin',
    noOfShare: '300',
    flatLand: 'Plot 12 (Sector 1)',
    site: 'Agro Zone',
    customer: 'Rubina Yasmin',
    note: 'Installment 2 due next month',
    email: 'rubina.yasmin@gmail.com',
    mobile: '01744556688',
    nid: '1987778899001',
    address: 'Baliapara, Dinajpur',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
  },
  {
    id: 8,
    project: 'Kappa Plaza',
    projectType: 'Commercial',
    code: 'PRJ-108',
    shareCode: 'SHR-173726',
    name: 'Moniruzzaman Khan',
    noOfShare: '110',
    flatLand: 'Shop 04 (Ground Floor)',
    site: 'Downtown Hub',
    customer: 'Moniruzzaman Khan',
    note: 'Fully paid',
    email: 'monir.khan@corporate.net',
    mobile: '01311224466',
    nid: '1979332211445',
    address: 'Taltola, Sylhet',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150'
  },
  {
    id: 9,
    project: 'Lambda Heights',
    projectType: 'Residential',
    code: 'PRJ-109',
    shareCode: 'SHR-173727',
    name: 'Asif Mahmud',
    noOfShare: '60',
    flatLand: 'Flat 5C (Tower B)',
    site: 'Site South',
    customer: 'Asif Mahmud',
    note: 'Verified account',
    email: 'asif.mahmud@tech.io',
    mobile: '01855443322',
    nid: '1996221144556',
    address: 'Dhanmondi 27, Dhaka',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'
  },
  {
    id: 10,
    project: 'Zeta Gardens',
    projectType: 'Land Project',
    code: 'PRJ-110',
    shareCode: 'SHR-173728',
    name: 'Nayeem Islam',
    noOfShare: '250',
    flatLand: 'Plot 88 (Block F)',
    site: 'East Extension',
    customer: 'Nayeem Islam',
    note: 'Processing deed',
    email: 'nayeem.islam@invest.org',
    mobile: '01677889900',
    nid: '1991665544332',
    address: 'Sholashahar, Chattogram',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150'
  }
];

export default function AssignSharePage() {
  const [shares, setShares] = useState<AssignShare[]>(initialAssignShares);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedShare, setSelectedShare] = useState<AssignShare | null>(null);

  // Form state for Add / Bulk / Edit
  const [formData, setFormData] = useState<Partial<AssignShare>>({
    projectType: '',
    project: '',
    code: 'PRJ-' + Math.floor(100 + Math.random() * 900),
    shareCode: 'SHR-' + Math.floor(10000 + Math.random() * 90000),
    site: '',
    flatLand: '',
    customer: '',
    noOfShare: '',
    note: ''
  });

  // Filtered data based on project selection & search query
  const filteredShares = shares.filter(item => {
    const matchesProject = selectedProjectFilter ? item.project === selectedProjectFilter : true;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shareCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flatLand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  // Submit Handler for Add
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newShare: AssignShare = {
      id: shares.length + 1,
      project: formData.project || 'Alpha Heights',
      projectType: formData.projectType || 'Residential',
      code: formData.code || 'PRJ-101',
      shareCode: formData.shareCode || 'SHR-' + Math.floor(10000 + Math.random() * 90000),
      name: formData.customer || 'Tanvir Ahmed',
      noOfShare: formData.noOfShare || '10',
      flatLand: formData.flatLand || 'Flat 1A',
      site: formData.site || 'Site North',
      customer: formData.customer || 'Tanvir Ahmed',
      note: formData.note || '',
      email: 'customer@gmail.com',
      mobile: '01800000000',
      nid: '1990000000000',
      address: 'Dhaka, Bangladesh',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    };
    setShares([newShare, ...shares]);
    setIsAddOpen(false);
    resetFormState();
  };

  // Submit Handler for Bulk Add
  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bulkShare: AssignShare = {
      id: shares.length + 1,
      project: formData.project || 'Alpha Heights',
      projectType: 'Bulk Allocation',
      code: 'PRJ-BULK',
      shareCode: 'SHR-' + Math.floor(10000 + Math.random() * 90000),
      name: formData.customer || 'Corporate Client',
      noOfShare: formData.noOfShare || '100',
      flatLand: 'Multiple Units',
      site: 'Main Branch',
      customer: formData.customer || 'Corporate Client',
      note: formData.note || 'Bulk assign',
      email: 'corporate@gmail.com',
      mobile: '01700000000',
      nid: '1980000000000',
      address: 'Gulshan, Dhaka',
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150'
    };
    setShares([bulkShare, ...shares]);
    setIsBulkOpen(false);
    resetFormState();
  };

  // Submit Handler for Edit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShare) return;
    setShares(shares.map(item => item.id === selectedShare.id ? { ...item, ...formData } as AssignShare : item));
    setIsEditOpen(false);
    setSelectedShare(null);
  };

  // Delete Handler
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this assigned share record?')) {
      setShares(shares.filter(item => item.id !== id));
    }
  };

  const openEditModal = (share: AssignShare) => {
    setSelectedShare(share);
    setFormData({
      projectType: share.projectType,
      project: share.project,
      code: share.code,
      shareCode: share.shareCode,
      site: share.site,
      flatLand: share.flatLand,
      customer: share.customer,
      noOfShare: share.noOfShare,
      note: share.note
    });
    setIsEditOpen(true);
  };

  const openProfileModal = (share: AssignShare) => {
    setSelectedShare(share);
    setIsProfileOpen(true);
  };

  const resetFormState = () => {
    setFormData({
      projectType: '',
      project: '',
      code: 'PRJ-' + Math.floor(100 + Math.random() * 900),
      shareCode: 'SHR-' + Math.floor(10000 + Math.random() * 90000),
      site: '',
      flatLand: '',
      customer: '',
      noOfShare: '',
      note: ''
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-6 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Breadcrumb and Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
              <span>Home</span> / <span>Share Project</span> / <span className="text-indigo-600 font-medium">Assign Share List</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Assign Share Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { resetFormState(); setIsAddOpen(true); }}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Assign Share
            </button>
            <button
              onClick={() => { resetFormState(); setIsBulkOpen(true); }}
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              Bulk Assign Share
            </button>
          </div>
        </div>

        {/* Project Selector Filter Bar */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 space-y-2">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Select Project</label>
          <select
            value={selectedProjectFilter}
            onChange={(e) => setSelectedProjectFilter(e.target.value)}
            className="w-full sm:w-80 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">All Projects (Select Project)</option>
            <option value="Alpha Heights">Alpha Heights</option>
            <option value="Beta Commercial Complex">Beta Commercial Complex</option>
            <option value="Gamma Green Valley">Gamma Green Valley</option>
            <option value="Delta Residency">Delta Residency</option>
            <option value="Omega Silicon City">Omega Silicon City</option>
          </select>
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
                placeholder="Search assigned shares..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Modern Data Table (Matching headers from Image 1st: SL, PROJECT, CODE, SHARE CODE, NAME, NO OF SHARE, FLAT/LAND, ACTION) */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-indigo-600 text-white font-medium text-xs tracking-wider uppercase">
                  <th className="py-3 px-4">SL</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Share Code</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">No Of Share</th>
                  <th className="py-3 px-4">Flat/Land</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredShares.length > 0 ? (
                  filteredShares.slice(0, entriesPerPage).map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-600">{index + 1}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{item.project}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-600">{item.code}</td>
                      <td className="py-3 px-4 font-mono text-xs text-indigo-600 font-semibold">{item.shareCode}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{item.name}</td>
                      <td className="py-3 px-4 font-semibold text-slate-700">{item.noOfShare}</td>
                      <td className="py-3 px-4 text-slate-600">{item.flatLand}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center justify-center gap-1.5">
                          {/* Profile Action Button (Human Icon) */}
                          <button
                            onClick={() => openProfileModal(item)}
                            title="View Profile / Details"
                            className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md transition-colors"
                          >
                            <User className="w-4 h-4" />
                          </button>
                          {/* Edit Action Button */}
                          <button
                            onClick={() => openEditModal(item)}
                            title="Edit Assigned Share"
                            className="p-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-md transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {/* Delete Action Button */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete Assigned Share"
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
                    <td colSpan={8} className="text-center py-10 text-slate-400 font-medium">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500">
            <div>Showing 1 to {Math.min(entriesPerPage, filteredShares.length)} of {filteredShares.length} entries</div>
            <div className="inline-flex items-center gap-1">
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 rounded border border-indigo-600 bg-indigo-600 text-white font-medium">1</button>
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL: ADD ASSIGN SHARE (Exact Spec matching Image 2nd) ================= */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" /> Assign Share
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project Type <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={formData.projectType || ''}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Project Type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land Project">Land Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={formData.project || ''}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Project</option>
                    <option value="Alpha Heights">Alpha Heights</option>
                    <option value="Beta Commercial Complex">Beta Commercial Complex</option>
                    <option value="Gamma Green Valley">Gamma Green Valley</option>
                    <option value="Delta Residency">Delta Residency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Share Code <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.shareCode || ''}
                    onChange={(e) => setFormData({ ...formData, shareCode: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Site</label>
                  <select
                    value={formData.site || ''}
                    onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Site</option>
                    <option value="Site North">Site North</option>
                    <option value="Site South">Site South</option>
                    <option value="Downtown Hub">Downtown Hub</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Flat/Land No</label>
                  <input
                    type="text"
                    placeholder="Select Flat/Land No"
                    value={formData.flatLand || ''}
                    onChange={(e) => setFormData({ ...formData, flatLand: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Customer <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={formData.customer || ''}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Customer</option>
                    <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                    <option value="Farhana Sultana">Farhana Sultana</option>
                    <option value="Mahbub Alam">Mahbub Alam</option>
                    <option value="Sharmin Akter">Sharmin Akter</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">No Of Share <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="0"
                    value={formData.noOfShare || ''}
                    onChange={(e) => setFormData({ ...formData, noOfShare: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Note</label>
                  <input
                    type="text"
                    placeholder="Note"
                    value={formData.note || ''}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
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

      {/* ================= MODAL: BULK ASSIGN SHARE (Exact Spec matching Screenshot 3rd) ================= */}
      {isBulkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900 text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" /> Bulk Assign Share
              </h3>
              <button onClick={() => setIsBulkOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBulkSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={formData.project || ''}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Project</option>
                    <option value="Alpha Heights">Alpha Heights</option>
                    <option value="Beta Commercial Complex">Beta Commercial Complex</option>
                    <option value="Gamma Green Valley">Gamma Green Valley</option>
                    <option value="Delta Residency">Delta Residency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Customer <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={formData.customer || ''}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Customer</option>
                    <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                    <option value="Farhana Sultana">Farhana Sultana</option>
                    <option value="Mahbub Alam">Mahbub Alam</option>
                    <option value="Sharmin Akter">Sharmin Akter</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">No Of Share <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="No Of Share"
                    value={formData.noOfShare || ''}
                    onChange={(e) => setFormData({ ...formData, noOfShare: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Note</label>
                  <input
                    type="text"
                    placeholder="Note"
                    value={formData.note || ''}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsBulkOpen(false)}
                  className="px-5 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT ASSIGN SHARE ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900 text-base">Edit Assign Share</h3>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project Type <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={formData.projectType || ''}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Project Type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land Project">Land Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={formData.project || ''}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Project</option>
                    <option value="Alpha Heights">Alpha Heights</option>
                    <option value="Beta Commercial Complex">Beta Commercial Complex</option>
                    <option value="Gamma Green Valley">Gamma Green Valley</option>
                    <option value="Delta Residency">Delta Residency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Share Code <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.shareCode || ''}
                    onChange={(e) => setFormData({ ...formData, shareCode: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Flat/Land No</label>
                  <input
                    type="text"
                    value={formData.flatLand || ''}
                    onChange={(e) => setFormData({ ...formData, flatLand: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">No Of Share <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.noOfShare || ''}
                    onChange={(e) => setFormData({ ...formData, noOfShare: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PROFILE DETAILS (Human Icon Click Modal) ================= */}
      {isProfileOpen && selectedShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" /> Customer & Share Assignment Profile
              </span>
              <button onClick={() => setIsProfileOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 bg-white">
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <img 
                  src={selectedShare.image} 
                  alt={selectedShare.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" 
                />
                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold text-slate-900">{selectedShare.name}</h2>
                  <p className="text-xs font-mono text-indigo-600 font-semibold">Share Code: {selectedShare.shareCode}</p>
                  <p className="text-xs text-slate-500">{selectedShare.address}</p>
                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Project: {selectedShare.project}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Shares: {selectedShare.noOfShare}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
                <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider">
                  Assignment Specification & Contact
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-slate-500">Project Type:</span><span className="font-medium text-slate-800">{selectedShare.projectType}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Project Code:</span><span className="font-mono font-medium text-slate-800">{selectedShare.code}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Flat / Land:</span><span className="font-medium text-slate-800">{selectedShare.flatLand}</span></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-slate-500">Mobile:</span><span className="font-medium text-slate-800">{selectedShare.mobile}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-medium text-slate-800">{selectedShare.email}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">NID:</span><span className="font-mono font-medium text-slate-800">{selectedShare.nid}</span></div>
                  </div>
                </div>
                {selectedShare.note && (
                  <div className="p-4 border-t border-slate-200 bg-slate-50/50">
                    <span className="text-slate-500 font-medium">Note: </span>
                    <span className="text-slate-700">{selectedShare.note}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}