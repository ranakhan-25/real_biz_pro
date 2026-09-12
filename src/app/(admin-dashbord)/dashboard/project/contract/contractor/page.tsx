'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  User, 
  Trash2, 
  Printer, 
  X 
} from 'lucide-react';

// Type definitions prepared for seamless API integration
export interface LedgerEntry {
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

export interface Worker {
  id: number | string;
  code: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  address: string;
  creditLimit: string;
  dueDate: string;
  under: 'Contractor' | 'Worker';
  ledgerEntries?: LedgerEntry[];
}

// Packed mock data with plenty of entries for every profile so no empty space appears
const initialWorkers: Worker[] = [
  {
    id: 1,
    code: 'CO3203909',
    name: 'Southern Park',
    business: 'Southern Park Corp',
    phone: '01811223344',
    email: 'info@southernpark.com',
    address: '123 Contractor Lane, Dhaka',
    creditLimit: '50000',
    dueDate: '2026-12-31',
    under: 'Contractor',
    ledgerEntries: [
      { id: 1, date: '01-08-2026', project: 'Lake Garden', description: 'Opening Balance', voucherNo: 'OPN001', debit: 0, credit: 50000.00, balance: 50000.00, note: 'Initial deposit' },
      { id: 2, date: '05-08-2026', project: 'Lake Garden', description: 'Material Supply', voucherNo: 'PUR864886', debit: 0, credit: 15000.00, balance: 65000.00, note: 'Steel rods batch 1' },
      { id: 3, date: '10-08-2026', project: 'City Center', description: 'Advance Bill', voucherNo: 'ADV33211', debit: 10000.00, credit: 0, balance: 55000.00, note: 'Partial clearing' },
      { id: 4, date: '15-08-2026', project: 'Lake Garden', description: 'Cement Supply', voucherNo: 'PUR99281', debit: 0, credit: 25000.00, balance: 80000.00, note: 'Bulk cement' },
      { id: 5, date: '20-08-2026', project: 'Metro Station', description: 'Site Equipment', voucherNo: 'EQU11029', debit: 5000.00, credit: 0, balance: 75000.00, note: 'Rental fee' },
      { id: 6, date: '24-08-2026', project: 'Lake Garden', description: 'Closing Stock', voucherNo: 'PUR864886', debit: 0, credit: 250.00, balance: 75250.00, note: 'Final clearance' }
    ]
  },
  {
    id: 2,
    code: 'W09349977',
    name: 'Mizanur Rahman',
    business: 'Mizan Builders',
    phone: '01711556677',
    email: 'mizan@worker.com',
    address: '45 Worker Colony, Gazipur',
    creditLimit: '10000',
    dueDate: '2026-10-15',
    under: 'Worker',
    ledgerEntries: [
      { id: 1, date: '02-08-2026', project: 'City Center', description: 'Opening Stock', voucherNo: 'OPN002', debit: 0, credit: 12000.00, balance: 12000.00, note: 'Month start' },
      { id: 2, date: '08-08-2026', project: 'Lake Garden', description: 'Labor Payment', voucherNo: 'PAY44123', debit: 2000.00, credit: 0, balance: 10000.00, note: 'Weekly wage' },
      { id: 3, date: '14-08-2026', project: 'City Center', description: 'Tools Purchase', voucherNo: 'TLS88392', debit: 0, credit: 3500.00, balance: 13500.00, note: 'Safety gear' },
      { id: 4, date: '18-08-2026', project: 'Metro Station', description: 'Transport Cost', voucherNo: 'TRN55621', debit: 1500.00, credit: 0, balance: 12000.00, note: 'Material van' },
      { id: 5, date: '23-08-2026', project: 'Lake Garden', description: 'Closing Stock', voucherNo: 'TAZ00106', debit: 0, credit: 4000.00, balance: 16000.00, note: 'Extra items' },
      { id: 6, date: '24-08-2026', project: 'Lake Garden', description: 'Closing Stock', voucherNo: 'PUR585531', debit: 0, credit: 950.00, balance: 16950.00, note: 'Final adjustments' }
    ]
  },
  {
    id: 3,
    code: 'CO8849201',
    name: 'Greenfield Engineering',
    business: 'Greenfield Ltd',
    phone: '01922334455',
    email: 'contact@greenfield.org',
    address: '89 Commercial Area, Uttara',
    creditLimit: '120000',
    dueDate: '2027-01-15',
    under: 'Contractor',
    ledgerEntries: [
      { id: 1, date: '01-08-2026', project: 'Uttara Heights', description: 'Project Mobilization', voucherNo: 'MOB100', debit: 0, credit: 45000.00, balance: 45000.00, note: 'Phase 1 start' },
      { id: 2, date: '07-08-2026', project: 'Uttara Heights', description: 'Soil Testing', voucherNo: 'SOL2231', debit: 5000.00, credit: 0, balance: 40000.00, note: 'Lab analysis' },
      { id: 3, date: '12-08-2026', project: 'Uttara Heights', description: 'Foundation Work', voucherNo: 'FND3349', debit: 0, credit: 60000.00, balance: 100000.00, note: 'Piling complete' },
      { id: 4, date: '19-08-2026', project: 'Uttara Heights', description: 'Consultancy Fee', voucherNo: 'CNS8821', debit: 12000.00, credit: 0, balance: 88000.00, note: 'Engineer visit' },
      { id: 5, date: '26-08-2026', project: 'Uttara Heights', description: 'Pillar Casting', voucherNo: 'PLC9920', debit: 0, credit: 30000.00, balance: 118000.00, note: 'Concrete pour' }
    ]
  },
  {
    id: 4,
    code: 'W04481923',
    name: 'Abdul Karim',
    business: 'Karim Steel Works',
    phone: '01655443322',
    email: 'karim.works@gmail.com',
    address: '12 Industrial Zone, Tongi',
    creditLimit: '25000',
    dueDate: '2026-11-20',
    under: 'Worker',
    ledgerEntries: [
      { id: 1, date: '03-08-2026', project: 'Tongi Warehouse', description: 'Initial Advance', voucherNo: 'ADV011', debit: 0, credit: 8000.00, balance: 8000.00, note: 'Advance taken' },
      { id: 2, date: '10-08-2026', project: 'Tongi Warehouse', description: 'Rod Cutting', voucherNo: 'CUT4419', debit: 2000.00, credit: 0, balance: 6000.00, note: 'Partial payment' },
      { id: 3, date: '17-08-2026', project: 'Tongi Warehouse', description: 'Gate Fabrication', voucherNo: 'FAB7738', debit: 0, credit: 15000.00, balance: 21000.00, note: 'Main gate build' },
      { id: 4, date: '25-08-2026', project: 'Tongi Warehouse', description: 'Paint & Polish', voucherNo: 'PNT3329', debit: 1500.00, credit: 0, balance: 19500.00, note: 'Finishing touches' }
    ]
  },
  {
    id: 5,
    code: 'CO7738291',
    name: 'Apex Infrastructure',
    business: 'Apex Group',
    phone: '01533221100',
    email: 'admin@apexinfra.net',
    address: 'Gulshan Avenue, Dhaka',
    creditLimit: '300000',
    dueDate: '2027-03-30',
    under: 'Contractor',
    ledgerEntries: [
      { id: 1, date: '02-08-2026', project: 'Gulshan Tower', description: 'Advance Booking', voucherNo: 'APX001', debit: 0, credit: 150000.00, balance: 150000.00, note: 'Agreement sign' },
      { id: 2, date: '09-08-2026', project: 'Gulshan Tower', description: 'Heavy Machinery', voucherNo: 'MCH4411', debit: 35000.00, credit: 0, balance: 115000.00, note: 'Crane rental' },
      { id: 3, date: '16-08-2026', project: 'Gulshan Tower', description: 'Basement Excavation', voucherNo: 'EXC8829', debit: 0, credit: 90000.00, balance: 205000.00, note: 'Soil removal' },
      { id: 4, date: '22-08-2026', project: 'Gulshan Tower', description: 'Safety Barriers', voucherNo: 'SFT1192', debit: 10000.00, credit: 0, balance: 195000.00, note: 'Perimeter setup' },
      { id: 5, date: '28-08-2026', project: 'Gulshan Tower', description: 'Structural Audit', voucherNo: 'ADT9910', debit: 15000.00, credit: 0, balance: 180000.00, note: 'Inspection fee' }
    ]
  },
  {
    id: 6,
    code: 'W02293847',
    name: 'Selim Ahmed',
    business: 'Selim Electric',
    phone: '01899887766',
    email: 'selim@electric.com',
    address: 'Mirpur-10, Dhaka',
    creditLimit: '15000',
    dueDate: '2026-09-10',
    under: 'Worker',
    ledgerEntries: [
      { id: 1, date: '04-08-2026', project: 'Mirpur Complex', description: 'Wiring Advance', voucherNo: 'ELC012', debit: 0, credit: 5000.00, balance: 5000.00, note: 'Advance paid' },
      { id: 2, date: '11-08-2026', project: 'Mirpur Complex', description: 'Conduit Pipe', voucherNo: 'CND7732', debit: 1200.00, credit: 0, balance: 3800.00, note: 'PVC pipes' },
      { id: 3, date: '18-08-2026', project: 'Mirpur Complex', description: 'Switchboard Fitting', voucherNo: 'SWT4491', debit: 0, credit: 7500.00, balance: 11300.00, note: 'Main boards' },
      { id: 4, date: '26-08-2026', project: 'Mirpur Complex', description: 'Testing & Tagging', voucherNo: 'TST8810', debit: 800.00, credit: 0, balance: 10500.00, note: 'Final check' }
    ]
  },
  {
    id: 7,
    code: 'CO9938210',
    name: 'Metro Concrete Solutions',
    business: 'Metro Mix',
    phone: '01744556688',
    email: 'support@metromix.com',
    address: 'Tejgaon Industrial Area',
    creditLimit: '150000',
    dueDate: '2026-12-15',
    under: 'Contractor',
    ledgerEntries: [
      { id: 1, date: '01-08-2026', project: 'Tejgaon Expressway', description: 'Mixer Supply', voucherNo: 'MIX101', debit: 0, credit: 60000.00, balance: 60000.00, note: 'Batch A' },
      { id: 2, date: '08-08-2026', project: 'Tejgaon Expressway', description: 'Pump Rental', voucherNo: 'PMP5541', debit: 10000.00, credit: 0, balance: 50000.00, note: 'Concrete pump' },
      { id: 3, date: '15-08-2026', project: 'Tejgaon Expressway', description: 'Grade-60 Supply', voucherNo: 'GRD8820', debit: 0, credit: 85000.00, balance: 135000.00, note: 'High strength' },
      { id: 4, date: '24-08-2026', project: 'Tejgaon Expressway', description: 'Additive Chemicals', voucherNo: 'ADD3321', debit: 5000.00, credit: 0, balance: 130000.00, note: 'Set retarder' }
    ]
  },
  {
    id: 8,
    code: 'W05564738',
    name: 'Rafiqul Islam',
    business: 'Rafiq Piping',
    phone: '01311224466',
    email: 'rafiq@piping.net',
    address: 'Mohakhali Wireless Gate',
    creditLimit: '18000',
    dueDate: '2026-10-05',
    under: 'Worker',
    ledgerEntries: [
      { id: 1, date: '03-08-2026', project: 'Mohakhali Plaza', description: 'Pipe Fitting Advance', voucherNo: 'PIP009', debit: 0, credit: 7000.00, balance: 7000.00, note: 'Initial payment' },
      { id: 2, date: '10-08-2026', project: 'Mohakhali Plaza', description: 'Drainage Line', voucherNo: 'DRN4410', debit: 1500.00, credit: 0, balance: 5500.00, note: 'Sewage pipes' },
      { id: 3, date: '19-08-2026', project: 'Mohakhali Plaza', description: 'Water Supply Setup', voucherNo: 'WTR7732', debit: 0, credit: 9500.00, balance: 15000.00, note: 'Overhead tank' }
    ]
  },
  {
    id: 9,
    code: 'CO1122334',
    name: 'Nova Builders & Co',
    business: 'Nova Group',
    phone: '01855443322',
    email: 'contact@novabuilders.com',
    address: 'Banani, Dhaka',
    creditLimit: '200000',
    dueDate: '2027-04-10',
    under: 'Contractor',
    ledgerEntries: [
      { id: 1, date: '01-08-2026', project: 'Banani Suites', description: 'Advance Payment', voucherNo: 'NOV001', debit: 0, credit: 100000.00, balance: 100000.00, note: 'Project start' },
      { id: 2, date: '10-08-2026', project: 'Banani Suites', description: 'Architectural Plan', voucherNo: 'ARC8821', debit: 25000.00, credit: 0, balance: 75000.00, note: 'Design approval' },
      { id: 3, date: '20-08-2026', project: 'Banani Suites', description: 'Brickwork Phase 1', voucherNo: 'BRK3391', debit: 0, credit: 75000.00, balance: 150000.00, note: 'First floor bricks' }
    ]
  },
  {
    id: 10,
    code: 'W08877665',
    name: 'Jahangir Alam',
    business: 'Alam Paint Services',
    phone: '01677889900',
    email: 'jahangir@paint.net',
    address: 'Uttara Sector 7, Dhaka',
    creditLimit: '12000',
    dueDate: '2026-11-30',
    under: 'Worker',
    ledgerEntries: [
      { id: 1, date: '05-08-2026', project: 'Uttara Sector 7', description: 'Putty & Primer', voucherNo: 'PNT102', debit: 0, credit: 4000.00, balance: 4000.00, note: 'Surface prep' },
      { id: 2, date: '14-08-2026', project: 'Uttara Sector 7', description: 'Wall Painting', voucherNo: 'PNT4421', debit: 1000.00, credit: 0, balance: 3000.00, note: 'First coat' },
      { id: 3, date: '25-08-2026', project: 'Uttara Sector 7', description: 'Enamel Polish', voucherNo: 'PNT9982', debit: 0, credit: 6500.00, balance: 9500.00, note: 'Doors & windows' }
    ]
  }
];

export default function WorkerContractorPage() {
  // State management ready for API hooks
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Worker>>({
    code: 'WO' + Math.floor(10000000 + Math.random() * 90000000),
    name: '',
    business: '',
    email: '',
    phone: '',
    address: '',
    creditLimit: '',
    dueDate: '',
    under: 'Worker'
  });

  // Filter Data for search functionality
  const filteredWorkers = workers.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.phone.includes(searchQuery) ||
    (w.business && w.business.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handlers ready for API integration
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWorker: Worker = {
      id: workers.length + 1,
      code: formData.code || 'WO000000',
      name: formData.name || '',
      business: formData.business || '',
      phone: formData.phone || '',
      email: formData.email || '',
      address: formData.address || '',
      creditLimit: formData.creditLimit || '',
      dueDate: formData.dueDate || '',
      under: formData.under as 'Contractor' | 'Worker',
      ledgerEntries: []
    };
    setWorkers([newWorker, ...workers]);
    setIsAddOpen(false);
    resetForm();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorker) return;
    setWorkers(workers.map(w => w.id === selectedWorker.id ? { ...w, ...formData } as Worker : w));
    setIsEditOpen(false);
    setSelectedWorker(null);
  };

  const handleDelete = (id: string | number) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setWorkers(workers.filter(w => w.id !== id));
    }
  };

  const openEditModal = (worker: Worker) => {
    setSelectedWorker(worker);
    setFormData(worker);
    setIsEditOpen(true);
  };

  const openProfileModal = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsProfileOpen(true);
  };

  const resetForm = () => {
    setFormData({
      code: 'WO' + Math.floor(10000000 + Math.random() * 90000000),
      name: '',
      business: '',
      email: '',
      phone: '',
      address: '',
      creditLimit: '',
      dueDate: '',
      under: 'Worker'
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 p-4 sm:p-6 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Breadcrumbs & Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
              <span>Home</span> / <span className="text-indigo-600 font-medium">Labour/Worker</span> / <span>Contractor List</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Labour / Worker / Contractor Management</h1>
          </div>
          <button
            onClick={() => { resetForm(); setIsAddOpen(true); }}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Labour/Worker Add
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-200 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                placeholder="Search records..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Modern Clean Data Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-indigo-600 text-white font-medium">
                  <th className="py-3 px-4 uppercase text-xs tracking-wider">ID</th>
                  <th className="py-3 px-4 uppercase text-xs tracking-wider">Code</th>
                  <th className="py-3 px-4 uppercase text-xs tracking-wider">Name</th>
                  <th className="py-3 px-4 uppercase text-xs tracking-wider">Company</th>
                  <th className="py-3 px-4 uppercase text-xs tracking-wider">Phone</th>
                  <th className="py-3 px-4 uppercase text-xs tracking-wider">Email</th>
                  <th className="py-3 px-4 uppercase text-xs tracking-wider">Address</th>
                  <th className="py-3 px-4 uppercase text-xs tracking-wider">Under</th>
                  <th className="py-3 px-4 uppercase text-xs tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkers.length > 0 ? (
                  filteredWorkers.map((worker, index) => (
                    <tr key={worker.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-600">{index + 1}</td>
                      <td className="py-3 px-4 font-mono text-xs text-indigo-600 font-semibold">{worker.code}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{worker.name}</td>
                      <td className="py-3 px-4 text-slate-600">{worker.business || '—'}</td>
                      <td className="py-3 px-4 text-slate-600">{worker.phone}</td>
                      <td className="py-3 px-4 text-slate-600">{worker.email || '—'}</td>
                      <td className="py-3 px-4 text-slate-600">{worker.address || '—'}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          worker.under === 'Contractor' 
                            ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {worker.under}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openEditModal(worker)}
                            title="Edit"
                            className="p-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-md transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openProfileModal(worker)}
                            title="View Profile / Ledger"
                            className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md transition-colors"
                          >
                            <User className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(worker.id)}
                            title="Delete"
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
                    <td colSpan={9} className="text-center py-8 text-slate-400">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-100 bg-white gap-2 text-xs text-slate-500">
            <div>Showing 1 to {filteredWorkers.length} of {filteredWorkers.length} entries</div>
            <div className="inline-flex items-center gap-1">
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 rounded border border-indigo-600 bg-indigo-600 text-white font-medium">1</button>
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT FORM ================= */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800 text-base">Labour/Worker/Contractor</h3>
              <button 
                onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={isAddOpen ? handleAddSubmit : handleEditSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Code</label>
                <input
                  type="text"
                  disabled
                  value={formData.code || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Business/Organization</label>
                <input
                  type="text"
                  placeholder="Enter Business Name"
                  value={formData.business || ''}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter E-mail"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Phone/Mobile</label>
                <input
                  type="text"
                  placeholder="Enter Phone/Mobile"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Credit Limit</label>
                <input
                  type="text"
                  placeholder="Enter Credit Limit"
                  value={formData.creditLimit || ''}
                  onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate || ''}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Under</label>
                <select
                  value={formData.under || 'Worker'}
                  onChange={(e) => setFormData({ ...formData, under: e.target.value as 'Contractor' | 'Worker' })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Worker">Worker</option>
                  <option value="Contractor">Contractor</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
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

      {/* ================= MODAL: PROFILE & LEDGER VIEW ================= */}
      {isProfileOpen && selectedWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
              <span className="font-semibold text-slate-700 text-sm">Account Ledger Profile</span>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button onClick={() => setIsProfileOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Profile Card */}
              <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                <div className="h-28 bg-gradient-to-r from-cyan-400 to-indigo-600 relative flex items-center justify-center">
                  <div className="absolute -bottom-8 w-20 h-20 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center shadow-md overflow-hidden text-slate-500 font-bold text-xl">
                    {selectedWorker.name.charAt(0)}
                  </div>
                </div>
                <div className="pt-10 pb-4 px-6 text-center">
                  <h2 className="text-lg font-bold text-slate-900">{selectedWorker.name}</h2>
                  <div className="mt-3 border-t border-slate-100 divide-y divide-slate-100 text-xs text-left">
                    <div className="py-2 flex justify-between"><span className="text-slate-400">ID / Code</span><span className="font-medium text-slate-800">{selectedWorker.code}</span></div>
                    <div className="py-2 flex justify-between"><span className="text-slate-400">Phone</span><span className="font-medium text-slate-800">{selectedWorker.phone || '—'}</span></div>
                    <div className="py-2 flex justify-between"><span className="text-slate-400">Email</span><span className="font-medium text-slate-800">{selectedWorker.email || '—'}</span></div>
                    <div className="py-2 flex justify-between"><span className="text-slate-400">Address</span><span className="font-medium text-slate-800">{selectedWorker.address || '—'}</span></div>
                  </div>
                </div>
              </div>

              {/* Ledger Table Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Ledger</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-indigo-600 text-white font-medium">
                        <th className="py-2.5 px-3">ID</th>
                        <th className="py-2.5 px-3">DATE</th>
                        <th className="py-2.5 px-3">PROJECT</th>
                        <th className="py-2.5 px-3">DESCRIPTION</th>
                        <th className="py-2.5 px-3">VOUCHER NO</th>
                        <th className="py-2.5 px-3">DEBIT</th>
                        <th className="py-2.5 px-3">CREDIT</th>
                        <th className="py-2.5 px-3">BALANCE</th>
                        <th className="py-2.5 px-3">NOTE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="bg-slate-50/50 font-medium text-slate-600">
                        <td colSpan={7} className="py-2 px-3 text-right">Opening</td>
                        <td className="py-2 px-3 font-semibold text-slate-800">0.00</td>
                        <td></td>
                      </tr>
                      {selectedWorker.ledgerEntries && selectedWorker.ledgerEntries.length > 0 ? (
                        selectedWorker.ledgerEntries.map((entry, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3">{entry.id}</td>
                            <td className="py-2.5 px-3">{entry.date}</td>
                            <td className="py-2.5 px-3">{entry.project}</td>
                            <td className="py-2.5 px-3 text-indigo-600 font-medium">{entry.description}</td>
                            <td className="py-2.5 px-3 text-indigo-600 font-mono">{entry.voucherNo}</td>
                            <td className="py-2.5 px-3">{entry.debit.toFixed(2)}</td>
                            <td className="py-2.5 px-3">{entry.credit.toFixed(2)}</td>
                            <td className="py-2.5 px-3 font-semibold">{entry.balance.toFixed(2)}</td>
                            <td className="py-2.5 px-3">{entry.note || ''}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center py-6 text-slate-400">No ledger transactions recorded.</td>
                        </tr>
                      )}
                      <tr className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
                        <td colSpan={5} className="py-2.5 px-3 text-right">Total</td>
                        <td className="py-2.5 px-3">
                          {selectedWorker.ledgerEntries ? selectedWorker.ledgerEntries.reduce((acc, curr) => acc + curr.debit, 0).toFixed(2) : '0.00'}
                        </td>
                        <td className="py-2.5 px-3">
                          {selectedWorker.ledgerEntries ? selectedWorker.ledgerEntries.reduce((acc, curr) => acc + curr.credit, 0).toFixed(2) : '0.00'}
                        </td>
                        <td className="py-2.5 px-3">
                          {selectedWorker.ledgerEntries && selectedWorker.ledgerEntries.length > 0 ? selectedWorker.ledgerEntries[selectedWorker.ledgerEntries.length - 1].balance.toFixed(2) : '0.00'}
                        </td>
                        <td></td>
                      </tr>
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