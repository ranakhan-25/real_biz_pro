'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  FileSpreadsheet, 
  ChevronRight, 
  Home, 
  Calendar,
  AlertTriangle,
  User,
  Building2
} from 'lucide-react';

// Type definition for Penalty Report matching the 1st reference image layout
export interface PenaltyReportItem {
  id: string;
  shareholderName: string;
  projectName: string;
  lastDate: string;
  payDate: string;
  code: string;
  shareAmount: string;
  paidAmount: string;
  dueAmount: string;
  penaltyDays: number;
  penalty: string;
}

// Extensive mock data to completely fill the table and avoid any empty white spaces
const initialPenaltyReports: PenaltyReportItem[] = [
  {
    id: '1',
    shareholderName: 'Tanvir Ahmed',
    projectName: 'Alpha Heights',
    lastDate: '10 Aug, 2026',
    payDate: '18 Aug, 2026',
    code: 'SH-AH-101',
    shareAmount: '500,000',
    paidAmount: '400,000',
    dueAmount: '100,000',
    penaltyDays: 8,
    penalty: '2,500'
  },
  {
    id: '2',
    shareholderName: 'Farhana Sultana',
    projectName: 'Beta Commercial Complex',
    lastDate: '05 Aug, 2026',
    payDate: '15 Aug, 2026',
    code: 'SH-BC-102',
    shareAmount: '1,200,000',
    paidAmount: '1,000,000',
    dueAmount: '200,000',
    penaltyDays: 10,
    penalty: '6,000'
  },
  {
    id: '3',
    shareholderName: 'Mahbub Alam',
    projectName: 'Gamma Green Valley',
    lastDate: '01 Aug, 2026',
    payDate: '12 Aug, 2026',
    code: 'SH-GG-103',
    shareAmount: '2,000,000',
    paidAmount: '1,500,000',
    dueAmount: '500,000',
    penaltyDays: 11,
    penalty: '11,000'
  },
  {
    id: '4',
    shareholderName: 'Sharmin Akter',
    projectName: 'Delta Residency',
    lastDate: '15 Jul, 2026',
    payDate: '25 Jul, 2026',
    code: 'SH-DR-104',
    shareAmount: '750,000',
    paidAmount: '650,000',
    dueAmount: '100,000',
    penaltyDays: 10,
    penalty: '3,750'
  },
  {
    id: '5',
    shareholderName: 'Golam Mostafa',
    projectName: 'Omega Silicon City',
    lastDate: '20 Jul, 2026',
    payDate: '02 Aug, 2026',
    code: 'SH-OS-105',
    shareAmount: '1,500,000',
    paidAmount: '1,200,000',
    dueAmount: '300,000',
    penaltyDays: 13,
    penalty: '9,750'
  },
  {
    id: '6',
    shareholderName: 'Nazmul Hossain',
    projectName: 'Sigma Tower',
    lastDate: '10 Jul, 2026',
    payDate: '20 Jul, 2026',
    code: 'SH-ST-106',
    shareAmount: '900,000',
    paidAmount: '800,000',
    dueAmount: '100,000',
    penaltyDays: 10,
    penalty: '4,500'
  },
  {
    id: '7',
    shareholderName: 'Rubina Yasmin',
    projectName: 'Theta Agro Farm',
    lastDate: '01 Jun, 2026',
    payDate: '15 Jun, 2026',
    code: 'SH-TA-107',
    shareAmount: '3,000,000',
    paidAmount: '2,400,000',
    dueAmount: '600,000',
    penaltyDays: 14,
    penalty: '21,000'
  },
  {
    id: '8',
    shareholderName: 'Moniruzzaman Khan',
    projectName: 'Kappa Plaza',
    lastDate: '05 Jun, 2026',
    payDate: '18 Jun, 2026',
    code: 'SH-KP-108',
    shareAmount: '1,100,000',
    paidAmount: '950,000',
    dueAmount: '150,000',
    penaltyDays: 13,
    penalty: '7,150'
  }
];

export default function PenaltyReportPage() {
  const [reports, setReports] = useState<PenaltyReportItem[]>(initialPenaltyReports);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter logic based on project, customer, and search query
  const filteredReports = reports.filter(item => {
    const matchesProject = selectedProject ? item.projectName === selectedProject : true;
    const matchesCustomer = selectedCustomer ? item.shareholderName === selectedCustomer : true;
    const matchesSearch = 
      item.shareholderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesCustomer && matchesSearch;
  });

  // Calculate total penalty sum dynamically
  const totalPenaltySum = filteredReports.reduce((sum, item) => {
    const numericVal = parseFloat(item.penalty.replace(/,/g, '')) || 0;
    return sum + numericVal;
  }, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Main Section */}
      <div className="space-y-4">
        
        {/* Breadcrumb Navigation matching Reference Image 1st layout */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pb-1">
          <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="hover:text-indigo-600 cursor-pointer">Share Project</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-indigo-600 font-semibold">Penalty Report</span>
        </div>

        {/* Filter Toolbar matching Reference Image layout top section */}
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/70 shadow-2xs flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            
            {/* Select Project Filter Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-500" /> Select Project
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-2xs"
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

            {/* Customer Filter Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-500" /> Customer
              </label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-2xs"
              >
                <option value="">Select value</option>
                {reports.map((r) => (
                  <option key={r.id} value={r.shareholderName}>{r.shareholderName}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Export Action Buttons (PDF & Excel) matching 1st Image */}
          <div className="flex items-center gap-2 self-end lg:self-end">
            <button
              onClick={() => alert('Downloading Penalty Report PDF...')}
              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
            <button
              onClick={() => alert('Exporting Penalty Report Spreadsheet...')}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
            </button>
          </div>
        </div>

        {/* Entries & Search Controls Bar */}
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
                placeholder="Search shareholder..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Dense Modern Data Table Matching Image 1 Header Configuration */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                  <th className="py-3 px-3">ID</th>
                  <th className="py-3 px-3">SHAREHOLDER NAME</th>
                  <th className="py-3 px-3">LAST DATE</th>
                  <th className="py-3 px-3">SHARE AMOUNT</th>
                  <th className="py-3 px-3">PAY DATE</th>
                  <th className="py-3 px-3">CODE</th>
                  <th className="py-3 px-3">PAID AMOUNT</th>
                  <th className="py-3 px-3">DUE AMOUNT</th>
                  <th className="py-3 px-3">PENALTY DAYS</th>
                  <th className="py-3 px-3">PENALTY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.length > 0 ? (
                  filteredReports.slice(0, entriesPerPage).map((item, index) => (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-600">{index + 1}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{item.shareholderName}</div>
                        <div className="text-[11px] text-indigo-600 font-medium">{item.projectName}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">{item.lastDate}</td>
                      <td className="py-3 px-3 font-mono text-slate-700">৳ {item.shareAmount}</td>
                      <td className="py-3 px-3 text-slate-600 font-medium">{item.payDate}</td>
                      <td className="py-3 px-3 font-mono text-indigo-600 font-bold">{item.code}</td>
                      <td className="py-3 px-3 font-mono text-emerald-600 font-semibold">৳ {item.paidAmount}</td>
                      <td className="py-3 px-3 font-mono text-rose-600 font-bold">৳ {item.dueAmount}</td>
                      <td className="py-3 px-3 text-center font-bold text-amber-700">
                        <span className="bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[11px]">
                          {item.penaltyDays} Days
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-rose-600 font-extrabold">৳ {item.penalty}</td>
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

              {/* Total Summary Row matching 1st Image Layout */}
              <tfoot>
                <tr className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-900">
                  <td colSpan={9} className="py-3 px-3 uppercase tracking-wider text-right">TOTAL</td>
                  <td className="py-3 px-3 font-mono text-rose-600 text-sm">
                    ৳ {totalPenaltySum.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium">
            <div>Showing 1 to {Math.min(entriesPerPage, filteredReports.length)} of {filteredReports.length} entries</div>
            <div className="inline-flex items-center gap-1">
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 rounded border border-[#5949d6] bg-[#5949d6] text-white font-semibold">1</button>
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}