"use client"

import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Calendar, 
  FileSpreadsheet, 
  FileText, 
  Search, 
  ArrowUpDown, 
  Home
} from 'lucide-react';

// TypeScript Interfaces for dynamic data structure
export interface BillItem {
  id: string;
  sl: number;
  invoiceNo: string;
  contractor: string;
  labourWorker: string;
  particulars: string;
  qtyDays: string;
  rate: number;
  gross: number;
  securityDeposit: number;
  paid: number;
  due: number;
}

export interface FilterState {
  dateRange: string;
  projectId: string;
  contractorId: string;
  searchTerm: string;
  entriesPerPage: number;
  currentPage: number;
}

interface ContractorBillReportProps {
  initialData?: BillItem[];
  onFetchData?: (filters: FilterState) => Promise<{ data: BillItem[]; total: number }>;
}

const MOCK_DATA: BillItem[] = [
  {
    id: '1',
    sl: 1,
    invoiceNo: 'L/WB00001',
    contractor: 'Riva Steel Mils',
    labourWorker: 'Riva Steel Mils',
    particulars: 'test',
    qtyDays: '0 Set',
    rate: 0.00,
    gross: 0.00,
    securityDeposit: 0.00,
    paid: 0.00,
    due: 0.00,
  },
  {
    id: '2',
    sl: 2,
    invoiceNo: 'L/WB00002',
    contractor: 'Apex Builders Ltd',
    labourWorker: 'Rahim Construction',
    particulars: 'Foundation rod fitting',
    qtyDays: '15 Days',
    rate: 2500.00,
    gross: 37500.00,
    securityDeposit: 1875.00,
    paid: 30000.00,
    due: 5625.00,
  },
  {
    id: '3',
    sl: 3,
    invoiceNo: 'L/WB00003',
    contractor: 'Green Valley Infra',
    labourWorker: 'Karim Labor Group',
    particulars: 'Brick masonry work',
    qtyDays: '8 Days',
    rate: 3200.00,
    gross: 25600.00,
    securityDeposit: 1280.00,
    paid: 20000.00,
    due: 4320.00,
  }
];

export default function ContractorBillReport({ 
  initialData = MOCK_DATA, 
  onFetchData 
}: ContractorBillReportProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '1 September, 2026 - 30 September, 2026',
    projectId: 'Select value',
    contractorId: 'Select One Option',
    searchTerm: '',
    entriesPerPage: 10,
    currentPage: 1
  });

  const [data, setData] = useState<BillItem[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.invoiceNo.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.contractor.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.labourWorker.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.particulars.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesProject = filters.projectId === 'Select value' || !filters.projectId;
      const matchesContractor = filters.contractorId === 'Select One Option' || item.contractor === filters.contractorId;

      return matchesSearch && matchesProject && matchesContractor;
    });
  }, [data, filters.searchTerm, filters.projectId, filters.contractorId]);

  // Calculations for Grand Totals
  const totals = useMemo(() => {
    return filteredData.reduce((acc, curr) => {
      acc.gross += curr.gross;
      acc.securityDeposit += curr.securityDeposit;
      acc.paid += curr.paid;
      acc.due += curr.due;
      return acc;
    }, { gross: 0, securityDeposit: 0, paid: 0, due: 0 });
  }, [filteredData]);

  // Pagination calculation
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / filters.entriesPerPage) || 1;
  const startIndex = (filters.currentPage - 1) * filters.entriesPerPage;
  const currentEntries = filteredData.slice(startIndex, startIndex + filters.entriesPerPage);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      currentPage: 1 // Reset to page 1 on filter change
    }));

    // If API fetcher is provided, you can trigger API call here:
    if (onFetchData) {
      setLoading(true);
      onFetchData({ ...filters, [key]: value, currentPage: 1 })
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 sm:p-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-600 mb-6 space-x-2">
        <button className="flex items-center hover:text-indigo-600 transition-colors">
          <Home className="w-4 h-4 mr-1 text-gray-500" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <div className="relative group flex items-center cursor-pointer text-indigo-600 font-medium">
          <span>Billing</span>
          <ChevronDown className="w-3.5 h-3.5 ml-1" />
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-700 font-medium">Contractor Bill Report</span>
      </nav>

      {/* Main Card Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        
        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Select Date Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Select Date
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Project Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Project
            </label>
            <div className="relative">
              <select 
                value={filters.projectId}
                onChange={(e) => handleFilterChange('projectId', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2.5 px-3 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Select value">Select value</option>
                <option value="Project Alpha">Project Alpha</option>
                <option value="Project Beta">Project Beta</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Contractor Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Contractor
            </label>
            <div className="relative">
              <select 
                value={filters.contractorId}
                onChange={(e) => handleFilterChange('contractorId', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2.5 px-3 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Select One Option">Select One Option</option>
                <option value="Riva Steel Mils">Riva Steel Mils</option>
                <option value="Apex Builders Ltd">Apex Builders Ltd</option>
                <option value="Green Valley Infra">Green Valley Infra</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => alert('Exporting to Excel...')}
              className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded text-xs font-medium shadow-sm transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" />
              Excel
            </button>
            <button 
              onClick={() => alert('Exporting to PDF...')}
              className="flex items-center bg-rose-500 hover:bg-rose-600 text-white px-3.5 py-1.5 rounded text-xs font-medium shadow-sm transition-colors"
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              PDF
            </button>
            <div className="flex items-center text-xs text-gray-700 ml-2">
              <span>Show</span>
              <select 
                value={filters.entriesPerPage}
                onChange={(e) => handleFilterChange('entriesPerPage', Number(e.target.value))}
                className="mx-2 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center w-full sm:w-auto">
            <span className="text-xs text-gray-600 mr-2">Search:</span>
            <div className="relative w-full sm:w-64">
              <input 
                type="text"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 pr-8"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="overflow-x-auto border border-gray-200 rounded-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-500 text-white text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3 border-r border-indigo-400/40 w-12">
                  <div className="flex items-center justify-between">
                    <span>SL</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-indigo-400/40">
                  <div className="flex items-center justify-between">
                    <span>Invoice No.</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-indigo-400/40">
                  <div className="flex items-center justify-between">
                    <span>Contractor</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-indigo-400/40">
                  <div className="flex items-center justify-between">
                    <span>Labour/Worker</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-indigo-400/40">
                  <div className="flex items-center justify-between">
                    <span>Particulars</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-indigo-400/40">
                  <div className="flex items-center justify-between">
                    <span>Qty/Days</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-indigo-400/40 text-right">
                  <div className="flex items-center justify-between">
                    <span>Rate</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-indigo-400/40 text-right">
                  <div className="flex items-center justify-between">
                    <span>Gross</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-indigo-400/40 text-right">
                  <div className="flex items-center justify-between">
                    <span>Security Deposit</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 border-r border-indigo-400/40 text-right">
                  <div className="flex items-center justify-between">
                    <span>Paid</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
                <th className="py-2.5 px-3 text-right">
                  <div className="flex items-center justify-between">
                    <span>Due</span>
                    <ArrowUpDown className="w-3 h-3 opacity-75" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs bg-white">
              {loading ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-gray-500">
                    Loading records...
                  </td>
                </tr>
              ) : currentEntries.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              ) : (
                currentEntries.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3 text-gray-700">{startIndex + index + 1}</td>
                    <td className="py-3 px-3 text-indigo-600 font-medium">{row.invoiceNo}</td>
                    <td className="py-3 px-3 text-gray-800">{row.contractor}</td>
                    <td className="py-3 px-3 text-gray-800">{row.labourWorker}</td>
                    <td className="py-3 px-3 text-gray-800">{row.particulars}</td>
                    <td className="py-3 px-3 text-gray-800">{row.qtyDays}</td>
                    <td className="py-3 px-3 text-right text-gray-800">{row.rate.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right text-gray-800">{row.gross.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right text-gray-800">{row.securityDeposit.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right text-gray-800">{row.paid.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right text-gray-800">{row.due.toFixed(2)}</td>
                  </tr>
                ))
              )}

              {}
              <tr className="bg-gray-50/80 font-semibold text-gray-900 border-t-2 border-gray-200">
                <td colSpan={7} className="py-3 px-3 text-right uppercase tracking-wider text-[11px]">
                  Grand Total
                </td>
                <td className="py-3 px-3 text-right">{totals.gross.toFixed(2)}</td>
                <td className="py-3 px-3 text-right">{totals.securityDeposit.toFixed(2)}</td>
                <td className="py-3 px-3 text-right">{totals.paid.toFixed(2)}</td>
                <td className="py-3 px-3 text-right">{totals.due.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-3 border-t border-gray-100 gap-3">
          <div className="text-xs text-gray-500">
            Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + filters.entriesPerPage, totalEntries)} of {totalEntries} entries
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleFilterChange('currentPage', Math.max(filters.currentPage - 1, 1))}
              disabled={filters.currentPage === 1}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              const isActive = filters.currentPage === pageNumber;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handleFilterChange('currentPage', pageNumber)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handleFilterChange('currentPage', Math.min(filters.currentPage + 1, totalPages))}
              disabled={filters.currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}