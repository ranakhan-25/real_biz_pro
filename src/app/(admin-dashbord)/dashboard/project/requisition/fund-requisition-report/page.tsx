'use client';

import React, { useState } from 'react';
import { 
  Search, 
  ChevronRight, 
  Home, 
  FileText, 
  Calendar,
  Copy,
  FileSpreadsheet,
  FileCode,
  File as FilePdf
} from 'lucide-react';

export interface FundReportItem {
  id: string;
  date: string;
  from: string;
  to: string;
  amount: number;
  approvedAmount: number;
  purpose: string;
  reference: string;
}

const initialReportData: FundReportItem[] = [
  { id: '1', date: '2026-09-03', from: 'Mohin Uddin', to: 'Project Main Account', amount: 8585, approvedAmount: 900, purpose: 'Ch', reference: 'taz00010' },
  { id: '2', date: '2026-09-04', from: 'Tanvir Ahmed', to: 'Supplier Escrow', amount: 45000, approvedAmount: 45000, purpose: 'Steel reinforcement bars purchase', reference: 'taz00011' },
  { id: '3', date: '2026-09-05', from: 'Nusrat Jahan', to: 'Material Reserve', amount: 12500, approvedAmount: 10000, purpose: 'Landscaping soil & fertilizer', reference: 'taz00012' },
  { id: '4', date: '2026-09-06', from: 'Shamim Khan', to: 'Tech Infrastructure Fund', amount: 85000, approvedAmount: 80000, purpose: 'Server rack cooling units supply', reference: 'taz00013' },
  { id: '5', date: '2026-09-07', from: 'Rahim Chowdhury', to: 'Glass & Facade Dept', amount: 32000, approvedAmount: 32000, purpose: 'UPVC glass sliding windows', reference: 'taz00014' },
  { id: '6', date: '2026-09-08', from: 'Mohin Uddin', to: 'Plumbing Vendor Acc', amount: 18500, approvedAmount: 15000, purpose: 'Plumbing PVC pipes & valves', reference: 'taz00015' },
  { id: '7', date: '2026-09-09', from: 'Tanvir Ahmed', to: 'Safety Equipment Fund', amount: 95000, approvedAmount: 95000, purpose: 'Automatic fire suppression system', reference: 'taz00016' },
  { id: '8', date: '2026-09-10', from: 'Shamim Khan', to: 'Electrical Maintenance', amount: 54000, approvedAmount: 50000, purpose: 'Generator fuel tank installation', reference: 'taz00017' },
  { id: '9', date: '2026-09-11', from: 'Nusrat Jahan', to: 'Interior Design Hub', amount: 27500, approvedAmount: 25000, purpose: 'False ceiling gypsum boards', reference: 'taz00018' },
  { id: '10', date: '2026-09-12', from: 'Rahim Chowdhury', to: 'Civil Works Petty Cash', amount: 14200, approvedAmount: 14200, purpose: 'Cement and coarse sand bags', reference: 'taz00019' },
  { id: '11', date: '2026-09-13', from: 'Tanvir Ahmed', to: 'HVAC Solutions Ltd', amount: 64000, approvedAmount: 60000, purpose: 'Central AC duct insulation', reference: 'taz00020' },
  { id: '12', date: '2026-09-14', from: 'Mohin Uddin', to: 'Security & Surveillance', amount: 22000, approvedAmount: 20000, purpose: 'CCTV dome cameras & DVR setup', reference: 'taz00021' },
  { id: '13', date: '2026-09-15', from: 'Shamim Khan', to: 'Painting & Finishing', amount: 19800, approvedAmount: 18000, purpose: 'Weathercoat exterior primer paint', reference: 'taz00022' },
  { id: '14', date: '2026-09-16', from: 'Nusrat Jahan', to: 'Signage & Branding', amount: 11500, approvedAmount: 10000, purpose: 'Project site safety banner boards', reference: 'taz00023' }
];

export default function FundRequisitionReport() {
  const [reportData] = useState<FundReportItem[]>(initialReportData);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [dateRange, setDateRange] = useState('1 September, 2026 - 30 September, 2026');

  const filteredData = reportData.filter(item => 
    item.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.includes(searchQuery)
  );

  const totalAmount = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const totalApprovedAmount = filteredData.reduce((sum, item) => sum + item.approvedAmount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-3 sm:p-5 font-sans">
      <div className="space-y-4 max-w-[1600px] mx-auto w-full">
        
        {/* Breadcrumb & Header */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1 hover:text-emerald-600 cursor-pointer transition-colors">
                <Home className="w-3.5 h-3.5" /> Home
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-600">Requisition</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-emerald-600 font-semibold">Fund Requisition Report</span>
            </div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" /> Fund Requisition Report Summary
            </h1>
          </div>
        </div>

        {/* Date Filter & Export Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Date</label>
            <div className="relative max-w-md">
              <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            {/* Export Buttons (Fresh Emerald/Teal Color Palette) */}
            <div className="flex flex-wrap items-center gap-2">
              <button 
                type="button" 
                onClick={() => alert('Copied report data to clipboard!')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-md shadow-2xs transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
              <button 
                type="button" 
                onClick={() => alert('Exporting as CSV...')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md shadow-2xs transition-all cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5" /> CSV
              </button>
              <button 
                type="button" 
                onClick={() => alert('Exporting as Excel...')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow-2xs transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
              </button>
              <button 
                type="button" 
                onClick={() => alert('Exporting as PDF...')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-md shadow-2xs transition-all cursor-pointer"
              >
                <FilePdf className="w-3.5 h-3.5" /> PDF
              </button>
            </div>

            {/* Entries Selector */}
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-slate-300 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
          </div>
        </div>

        {/* Main Report Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-3">
          
          {/* Search Bar */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs text-slate-600 font-medium">Search:</span>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search report details..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
            <div className="overflow-x-auto min-h-[350px]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  {/* Color Changed from Violet to Professional Deep Teal/Emerald Header */}
                  <tr className="bg-teal-700 text-white font-semibold tracking-wide">
                    <th className="py-3 px-4">SL</th>
                    <th className="py-3 px-4">DATE</th>
                    <th className="py-3 px-4">FROM</th>
                    <th className="py-3 px-4">TO</th>
                    <th className="py-3 px-4 text-right">AMOUNT</th>
                    <th className="py-3 px-4 text-right">APPROVED AMOUNT</th>
                    <th className="py-3 px-4">PURPOSE</th>
                    <th className="py-3 px-4">REFERENCE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.slice(0, entriesPerPage).map((item, index) => (
                      <tr key={item.id} className="hover:bg-teal-50/40 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-500">{index + 1}</td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{item.date}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{item.from}</td>
                        <td className="py-3 px-4 font-medium text-slate-700">{item.to}</td>
                        <td className="py-3 px-4 font-bold text-slate-900 text-right font-mono">{item.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 font-bold text-emerald-700 text-right font-mono">{item.approvedAmount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-slate-600">{item.purpose}</td>
                        <td className="py-3 px-4 font-mono text-slate-700">{item.reference}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-slate-400 font-medium">
                        No report records found matching your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-200">
                    <td colSpan={4} className="py-3 px-4 uppercase text-slate-700">TOTAL</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-900">{totalAmount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-700">{totalApprovedAmount.toLocaleString()}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Table Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium">
              <div>Showing 1 to {Math.min(entriesPerPage, filteredData.length)} of {filteredData.length} entries</div>
              <div className="inline-flex items-center gap-1">
                <button type="button" disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
                <button type="button" className="px-3 py-1 rounded border border-teal-700 bg-teal-700 text-white font-semibold">1</button>
                <button type="button" disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}