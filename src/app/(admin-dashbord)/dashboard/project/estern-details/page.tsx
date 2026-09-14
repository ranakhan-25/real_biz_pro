import React from 'react';
import { 
  FileText, 
  ChevronRight, 
  Download, 
  DollarSign, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Receipt, 
  ArrowDownLeft, 
  Users 
} from 'lucide-react';

export default function ProjectOverviewReport() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-6 space-y-6">
      
      {/* Breadcrumb & PDF Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="hover:text-indigo-600 cursor-pointer">Home</span>
          <ChevronRight size={14} />
          <span className="hover:text-indigo-600 cursor-pointer">Project</span>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">Project Overview Report</span>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded flex items-center space-x-1 shadow-sm transition">
          <Download size={14} />
          <span>PDF</span>
        </button>
      </div>

      {/* Date Filter & Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Select Date</label>
          <input 
            type="text" 
            readOnly 
            value="September 1, 2026 - September 30, 2026" 
            className="border border-gray-200 bg-white text-xs rounded px-3 py-2 w-64 shadow-sm text-gray-700 outline-none"
          />
        </div>
        <div className="text-xl font-bold tracking-wide text-gray-800">Estern 19</div>
        <div className="w-24"></div> {/* Spacer balance */}
      </div>

      {/* Top Metric Cards (9 Cards Row) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
        <div className="bg-blue-100 p-3 rounded-lg border border-blue-200 flex flex-col justify-between">
          <div className="text-[11px] text-gray-600 font-medium">Sales/Contract Amount:</div>
          <div className="text-sm font-bold text-gray-900 pt-2">358,800.00</div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col justify-between">
          <div className="text-[11px] text-gray-500 font-medium">Budget/Estimated Amount:</div>
          <div className="text-sm font-bold text-gray-900 pt-2">0.00</div>
        </div>

        <div className="bg-emerald-100 p-3 rounded-lg border border-emerald-200 flex flex-col justify-between">
          <div className="text-[11px] text-gray-600 font-medium">Income:</div>
          <div className="text-sm font-bold text-gray-900 pt-2">153,310.00</div>
        </div>

        <div className="bg-pink-100 p-3 rounded-lg border border-pink-200 flex flex-col justify-between">
          <div className="text-[11px] text-gray-600 font-medium">Expense:</div>
          <div className="text-sm font-bold text-gray-900 pt-2">82.00</div>
        </div>

        <div className="bg-rose-100 p-3 rounded-lg border border-rose-200 flex flex-col justify-between">
          <div className="text-[11px] text-gray-600 font-medium">Available Amount:</div>
          <div className="text-sm font-bold text-rose-600 pt-2">-82.00</div>
        </div>

        <div className="bg-indigo-100 p-3 rounded-lg border border-indigo-200 flex flex-col justify-between">
          <div className="text-[11px] text-gray-600 font-medium">Profit Amount:</div>
          <div className="text-sm font-bold text-gray-900 pt-2">153,228.00</div>
        </div>

        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 flex flex-col justify-between">
          <div className="text-[11px] text-gray-600 font-medium">Bill Submission:</div>
          <div className="text-sm font-bold text-gray-900 pt-2">153,800.00</div>
        </div>

        <div className="bg-purple-100 p-3 rounded-lg border border-purple-200 flex flex-col justify-between">
          <div className="text-[11px] text-gray-600 font-medium">Receive Amount:</div>
          <div className="text-sm font-bold text-gray-900 pt-2">0.00</div>
        </div>

        <div className="bg-amber-100 p-3 rounded-lg border border-amber-200 flex flex-col justify-between">
          <div className="text-[11px] text-gray-600 font-medium">Due:</div>
          <div className="text-sm font-bold text-gray-900 pt-2">358,800.00</div>
        </div>
      </div>

      {/* Middle Section: Cash Bank Balance, Expense, Income, Management */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Cash Bank Balance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="font-bold text-center py-2.5 text-gray-800 text-sm">Cash Bank Balance</div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-2">Cash Bank Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-2 flex justify-between items-center text-gray-700">
                  <span>1</span>
                  <span className="font-medium">Cash</span>
                  <span>0</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Expense */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="font-bold text-center py-2.5 text-gray-800 text-sm">Expense</div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-2">ACCOUNTS DETAILS</th>
                <th className="p-2">SUBTOTAL</th>
                <th className="p-2">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="p-2">Cost of Goods Sold (COGS)</td>
                <td className="p-2">82.00</td>
                <td className="p-2">-</td>
              </tr>
              <tr>
                <td className="p-2">Total Expense (-)</td>
                <td className="p-2">82.00</td>
                <td className="p-2">-</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end p-2 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              <button className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-[10px]">Previous</button>
              <button className="px-2.5 py-1 bg-indigo-600 text-white rounded text-[10px]">1</button>
              <button className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-[10px]">Next</button>
            </div>
          </div>
        </div>

        {/* Income */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="font-bold text-center py-2.5 text-gray-800 text-sm">Income</div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-2">ACCOUNTS DETAILS</th>
                <th className="p-2">SUBTOTAL</th>
                <th className="p-2">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="p-2">Sales</td>
                <td className="p-2">153,310.00</td>
                <td className="p-2">-</td>
              </tr>
              <tr>
                <td className="p-2">Total Income (+)</td>
                <td className="p-2">153,310.00</td>
                <td className="p-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="font-bold text-center py-2.5 text-gray-800 text-sm">Management</div>
          <div className="p-3 text-xs text-gray-700 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
            <span>Rifat Hosain</span>
          </div>
        </div>

      </div>

      {/* Bottom Section: Receivable Report & Payable Report */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Receivable Report */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="font-bold text-center py-2.5 text-gray-800 text-sm">Receivable Report</div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-2.5">SL.</th>
                <th className="p-2.5">CUSTOMER NAME</th>
                <th className="p-2.5">OPENING BALANCE</th>
                <th className="p-2.5">DEBIT</th>
                <th className="p-2.5">CREDIT</th>
                <th className="p-2.5">BALANCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="p-2.5">1</td>
                <td className="p-2.5 text-indigo-600 font-medium">Cityscape Holdings</td>
                <td className="p-2.5">118,710.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5 font-semibold">118,710.00</td>
              </tr>
              <tr>
                <td className="p-2.5">2</td>
                <td className="p-2.5 text-indigo-600 font-medium">Rahman</td>
                <td className="p-2.5">34,600.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5 font-semibold">34,600.00</td>
              </tr>
              <tr className="bg-gray-50 font-semibold text-gray-800">
                <td colSpan={2} className="p-2.5 text-right">Total</td>
                <td className="p-2.5">153,310.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5">153,310.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payable Report */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="font-bold text-center py-2.5 text-gray-800 text-sm">Payable Report</div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-2.5">Sl.</th>
                <th className="p-2.5">SUPPLIER NAME</th>
                <th className="p-2.5">OPENING BALANCE</th>
                <th className="p-2.5">DEBIT</th>
                <th className="p-2.5">CREDIT</th>
                <th className="p-2.5">BALANCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="p-2.5">1</td>
                <td className="p-2.5 text-indigo-600 font-medium">Prime Tiles</td>
                <td className="p-2.5">820.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5 font-semibold">820.00</td>
              </tr>
              <tr>
                <td className="p-2.5">2</td>
                <td className="p-2.5 text-indigo-600 font-medium">Safety First Suppliers</td>
                <td className="p-2.5">52,320.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5 font-semibold">52,320.00</td>
              </tr>
              <tr className="bg-gray-50 font-semibold text-gray-800">
                <td colSpan={2} className="p-2.5 text-right">Total :</td>
                <td className="p-2.5">53,140.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5">0.00</td>
                <td className="p-2.5">53,140.00</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}