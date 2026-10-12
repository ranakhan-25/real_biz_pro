'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Wallet, 
  XCircle, 
  ShoppingCart, 
  Briefcase, 
  Eye, 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  Users, 
  FileSpreadsheet, 
  Building2, 
  Layers, 
  FileCode 
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
      <div>
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 border border-gray-300 text-xs px-3 py-1.5 rounded flex items-center space-x-2 font-medium">
              <span>NaN Day :</span>
              <span>NaN Hour :</span>
              <span>NaN Minute :</span>
              <span>NaN Second</span>
            </div>
          </div>
          <div className="text-lg font-bold tracking-wide">Estern 19</div>
          <div className="flex items-center space-x-4">
            {/* Eye button to route /dashboard/project-overview */}
            <button 
              onClick={() => router.push('/dashboard/project/estern-details')} 
              className="bg-cyan-100 text-cyan-700 p-2 rounded hover:bg-cyan-200 transition cursor-pointer"
              title="View Overview Report"
            >
              <Eye size={18} />
            </button>
            {/* Overall Report button to route /dashboard/project-overview */}
            <button 
              onClick={() => router.push('/dashboard/project-overview')}
              className="text-indigo-600 font-medium text-sm hover:underline cursor-pointer"
            >
              Overall Report
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white border-b border-gray-200 px-6 flex space-x-8 text-sm">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'BOQ', icon: FileText, active: false },
            { name: 'Task', icon: CheckSquare, active: false },
            { name: 'Users', icon: Users, active: false },
            { name: 'Details', icon: FileSpreadsheet, active: false },
            { name: 'Flat/Land', icon: Building2, active: false },
            { name: 'BOQ Comparison', icon: Layers, active: false },
            { name: 'Quotation', icon: FileCode, active: false },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                className={`flex items-center space-x-2 py-3 border-b-2 font-medium transition ${
                  tab.active
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={16} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Main Content Area */}
        <main className="p-6 space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
                <CreditCard size={22} />
              </div>
              <div>
                <div className="text-xl font-bold">0</div>
                <div className="text-xs text-gray-500">Budget</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                <Wallet size={22} />
              </div>
              <div>
                <div className="text-xl font-bold">82</div>
                <div className="text-xs text-gray-500">Cost</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-rose-100 text-rose-600 p-3 rounded-full">
                <XCircle size={22} />
              </div>
              <div>
                <div className="text-xl font-bold text-rose-600">-82</div>
                <div className="text-xs text-gray-500">Available</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                <ShoppingCart size={22} />
              </div>
              <div>
                <div className="text-xl font-bold">153,310</div>
                <div className="text-xs text-gray-500">Sales/Revenue</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4 col-span-2 md:col-span-1">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
                <Briefcase size={22} />
              </div>
              <div>
                <div className="text-xl font-bold">153,228</div>
                <div className="text-xs text-gray-500">Profit/Loss</div>
              </div>
            </div>
          </div>

          {/* Working Progress & Schedule Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 space-y-6">
              <div className="text-center font-semibold text-gray-700">Working Progress</div>
              <div className="text-center font-semibold text-gray-700 pt-4">Financial Progress</div>
              <div className="relative h-64 border-b border-l border-gray-300 flex flex-col justify-between pt-4">
                {[5, 4, 3, 2, 1, 0].map((val) => (
                  <div key={val} className="flex items-center w-full relative">
                    <span className="absolute -left-6 text-xs text-gray-400">{val}</span>
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="text-center font-semibold text-gray-700 py-3 border-b border-gray-100">
                  Working Schedule
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-rose-400 text-white text-center py-2 font-medium rounded text-sm">
                    Unsold Property
                  </div>
                  <div className="h-48 flex items-end justify-end">
                    <button className="bg-indigo-600 text-white text-xs px-4 py-1.5 rounded hover:bg-indigo-700 transition">
                      More
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 space-y-4">
                <div className="font-semibold text-gray-700">Most Expenses</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-indigo-500 text-white text-xs">
                        <th className="p-2.5 rounded-l">ACCOUNTS DETAILS</th>
                        <th className="p-2.5">SUBTOTAL</th>
                        <th className="p-2.5 rounded-r">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs">
                      <tr>
                        <td className="p-2.5 text-gray-700">Cost of Goods Sold (COGS)</td>
                        <td className="p-2.5 text-gray-700">82.00</td>
                        <td className="p-2.5 text-gray-700">-</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-gray-700">Total Expense (-)</td>
                        <td className="p-2.5 text-gray-700">82.00</td>
                        <td className="p-2.5 text-gray-700">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between text-xs text-gray-500">
        <div>2026 © Somikoron IT LTD</div>
        <div>Design & Developed by Somikoron IT LTD</div>
      </footer>
    </div>
  );
}