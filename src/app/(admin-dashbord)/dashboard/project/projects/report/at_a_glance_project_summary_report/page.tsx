'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  FileSpreadsheet, 
  FileText, 
  ArrowLeft, 
  X,
  FolderKanban,
  Building2,
  Users,
  TrendingUp,
  Share2,
  FileCheck2,
  Receipt,
  Home as HomeIcon,
  FolderOpen,
  Search,
  Settings,
  Sun,
  Grid,
  Bell,
  User
} from 'lucide-react';

interface SummaryRow {
  sl: number;
  date: string;
  description: string;
  bricks: number | string;
  rod: number | string;
  sand: number | string;
  directCommonCost: number | string;
  cogs: number | string;
  administrativeExpenses: number | string;
}

export default function AtAGlanceProjectSummaryDashboard() {
  const router = useRouter();

  // Filter States
  const [selectDate, setSelectDate] = useState<string>('September 1, 2026 - September 30, 2026');
  const [company, setCompany] = useState<string>('Select value');
  const [selectProject, setSelectProject] = useState<string>('Select Project');
  const [site, setSite] = useState<string>('Select Site');
  const [task, setTask] = useState<string>('Select Task');
  const [searchModule, setSearchModule] = useState<string>('');

  // Exact Data matching the image
  const rawData: SummaryRow[] = [
    { sl: 1, date: '2028-09-07', description: '1st Class Brick', bricks: 58000, rod: '', sand: '', directCommonCost: '', cogs: '', administrativeExpenses: '' },
    { sl: 2, date: '2028-09-07', description: '16mm Rod', bricks: '', rod: 10880, sand: '', directCommonCost: '', cogs: '', administrativeExpenses: '' },
    { sl: 3, date: '2028-09-07', description: '20mm Rod', bricks: '', rod: 8800, sand: '', directCommonCost: '', cogs: '', administrativeExpenses: '' },
    { sl: 4, date: '2028-09-07', description: 'Sand (FM 2.50)', bricks: '', rod: '', sand: 1500, directCommonCost: '', cogs: '', administrativeExpenses: '' },
    { sl: 5, date: '2026-09-19', description: '1st Class Brick', bricks: 1200, rod: '', sand: '', directCommonCost: '', cogs: '', administrativeExpenses: '' },
    { sl: 6, date: '2028-09-03', description: 'req', bricks: '', rod: 100, sand: '', directCommonCost: '', cogs: '', administrativeExpenses: '' },
    { sl: 7, date: '2028-09-07', description: 'Bricks Consumption', bricks: '', rod: '', sand: '', directCommonCost: '', cogs: 45000, administrativeExpenses: '' },
    { sl: 8, date: '2028-09-07', description: 'Rod Consumption', bricks: '', rod: '', sand: '', directCommonCost: '', cogs: 17760, administrativeExpenses: '' },
    { sl: 9, date: '2028-09-07', description: 'Sand Consumption', bricks: '', rod: '', sand: '', directCommonCost: '', cogs: 1602, administrativeExpenses: '' },
    { sl: 10, date: '2028-09-13', description: 'Rod Consumption', bricks: '', rod: '', sand: '', directCommonCost: '', cogs: 820, administrativeExpenses: '' },
    { sl: 11, date: '2026-09-19', description: 'Tiles Consumption', bricks: '', rod: '', sand: '', directCommonCost: '', cogs: 70, administrativeExpenses: '' },
  ];

  // Sub Totals
  const subBricks = 59200;
  const subRod = 19560;
  const subSand = 1500;
  const subDirectCost = 0;
  const subCogs = 65252;
  const subAdminExp = 0;

  // Totals & Grand Total matching image
  const totalMaterial = 80260; 
  const totalExpenseSum = 85252; 
  const grandTotal = 145512; 

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      
      {/* Top Navbar Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        
        {/* Left: Logo & Nav Menus */}
        <div className="flex items-center space-x-6 overflow-x-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-xs">
              <Building2 className="w-4 h-4" />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex items-center space-x-1.5 text-xs font-medium">
            <button className="bg-[#6b58e8] text-white px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-xs">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <button className="hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Project</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <button className="hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Contact</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <button className="hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition">
              <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
              <span>Investment</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <button className="hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition">
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Share Project</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <button className="hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition">
              <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Requisition</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <button className="hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition">
              <Receipt className="w-3.5 h-3.5 text-slate-500" />
              <span>Billing</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <button className="hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition">
              <HomeIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>Flat/Land</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <button className="hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition">
              <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Document</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
          </nav>
        </div>

        {/* Right: Search Modules, Settings, Icons, User Profile */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="relative hidden lg:block w-56">
            <input 
              type="text" 
              placeholder="Search Modules..." 
              value={searchModule}
              onChange={(e) => setSearchModule(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs focus:outline-none focus:border-purple-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2" />
          </div>

          <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition">
            <Sun className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition">
            <Grid className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
          </button>
          <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 cursor-pointer overflow-hidden border border-slate-300">
            <User className="w-4 h-4" />
          </div>
        </div>

      </header>

      {/* Main Content Area */}
      <main className="p-6 space-y-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center text-xs text-slate-600 space-x-2">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="hover:text-blue-600 cursor-pointer">Project</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">At a Glance Project Summary Report</span>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 space-y-6">
          
          {/* Top Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-sm">
            
            {/* Select Date */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5 text-xs">Select Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={selectDate} 
                  onChange={(e) => setSelectDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500 pr-8"
                />
                <button 
                  onClick={() => setSelectDate('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5 text-xs">Company</label>
              <select 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="Select value">Select value</option>
                <option value="Somikoron IT Ltd">Somikoron IT Ltd</option>
              </select>
            </div>

            {/* Select Project */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5 text-xs">Select Project</label>
              <select 
                value={selectProject} 
                onChange={(e) => setSelectProject(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="Select Project">Select Project</option>
                <option value="Rifat Eyecon City">Rifat Eyecon City</option>
              </select>
            </div>

            {/* Site */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5 text-xs">Site</label>
              <select 
                value={site} 
                onChange={(e) => setSite(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="Select Site">Select Site</option>
                <option value="Abason Site">Abason Site</option>
              </select>
            </div>

            {/* Task */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5 text-xs">Task</label>
              <select 
                value={task} 
                onChange={(e) => setTask(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="Select Task">Select Task</option>
                <option value="General Task">General Task</option>
              </select>
            </div>

          </div>

          {/* Action Export Buttons */}
          <div className="flex items-center space-x-2 pt-1">
            <button 
              onClick={() => alert('Generating PDF...')}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
            <button 
              onClick={() => alert('Exporting to Excel...')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel</span>
            </button>
          </div>

          {/* Data Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto border border-[#7b68ee]/40 rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse text-[11px] sm:text-xs whitespace-nowrap">
              <thead>
                {/* Top Main Group Header */}
                <tr className="text-white font-bold tracking-wide text-center">
                  <th className="bg-[#6b58e8] p-2.5 border-r border-purple-400" rowSpan={2}>SL</th>
                  <th className="bg-[#1e73e8] p-2.5 border-r border-purple-400 text-left" rowSpan={2}>Date</th>
                  <th className="bg-[#5a42db] p-2.5 border-r border-purple-400 text-left" rowSpan={2}>Description</th>
                  <th className="bg-[#c51b1b] p-2 border-r border-red-400" colSpan={3}>Material</th>
                  <th className="bg-[#7b68ee] p-2 border-r border-purple-400" rowSpan={2}>Direct Common Cost</th>
                  <th className="bg-[#179654] p-2 border-purple-400" colSpan={2}>Expense</th>
                </tr>
                {/* Sub Header Row */}
                <tr className="text-white font-bold tracking-wide text-center">
                  <th className="bg-[#c51b1b] p-2 border-r border-red-400 w-24">Bricks</th>
                  <th className="bg-[#c51b1b] p-2 border-r border-red-400 w-24">Rod</th>
                  <th className="bg-[#c51b1b] p-2 border-r border-red-400 w-24">Sand</th>
                  <th className="bg-[#179654] p-2 border-r border-emerald-400 w-44">Cost of Goods Sold (COGS)</th>
                  <th className="bg-[#179654] p-2 w-44">Admistrative Expences</th>
                </tr>
              </thead>
              <tbody className="bg-white text-slate-700">
                {rawData.map((row) => (
                  <tr key={row.sl} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="p-2.5 border-r border-slate-200 text-center">{row.sl}.</td>
                    <td className="p-2.5 border-r border-slate-200">{row.date}</td>
                    <td className="p-2.5 border-r border-slate-200 font-medium text-slate-900">{row.description}</td>
                    <td className="p-2.5 border-r border-slate-200 text-right">{row.bricks}</td>
                    <td className="p-2.5 border-r border-slate-200 text-right">{row.rod}</td>
                    <td className="p-2.5 border-r border-slate-200 text-right">{row.sand}</td>
                    <td className="p-2.5 border-r border-slate-200 text-right">{row.directCommonCost}</td>
                    <td className="p-2.5 border-r border-slate-200 text-right">{row.cogs}</td>
                    <td className="p-2.5 text-right">{row.administrativeExpenses}</td>
                  </tr>
                ))}

                {/* Sub Total Row */}
                <tr className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="p-2.5 border-r border-slate-200 text-right" colSpan={3}>Sub total :</td>
                  <td className="p-2.5 border-r border-slate-200 text-right">{subBricks}</td>
                  <td className="p-2.5 border-r border-slate-200 text-right">{subRod}</td>
                  <td className="p-2.5 border-r border-slate-200 text-right">{subSand}</td>
                  <td className="p-2.5 border-r border-slate-200 text-right">{subDirectCost}</td>
                  <td className="p-2.5 border-r border-slate-200 text-right">{subCogs}</td>
                  <td className="p-2.5 text-right">{subAdminExp}</td>
                </tr>

                {/* Total Row */}
                <tr className="bg-slate-100 font-bold text-slate-900 border-t border-slate-300">
                  <td className="p-2.5 border-r border-slate-200 text-right" colSpan={3}>Total :</td>
                  <td className="p-2.5 border-r border-slate-200 text-right" colSpan={4}>{totalMaterial}</td>
                  <td className="p-2.5 text-right" colSpan={2}>{totalExpenseSum}</td>
                </tr>

                {/* Grand Total Row */}
                <tr className="bg-slate-200 font-bold text-slate-900 border-t border-slate-300">
                  <td className="p-2.5 border-r border-slate-300 text-right" colSpan={3}>Grand Total :</td>
                  <td className="p-2.5 text-right" colSpan={6}>{grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}