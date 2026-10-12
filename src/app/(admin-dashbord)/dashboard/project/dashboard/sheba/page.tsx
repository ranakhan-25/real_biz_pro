"use client";

import React from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CreditCard,
  Wallet,
  CheckCircle2,
  ShoppingCart,
  TrendingDown,
  Eye,
} from "lucide-react";

// =====================================================
// Types
// =====================================================

interface ProjectDashboardData {
  projectName: string;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  overallReportHref: string;

  // Top Metrics
  budget: number;
  cost: number;
  available: number;
  salesRevenue: number;
  profitLoss: number;

  // Tabs
  tabs: {
    name: string;
    href: string;
    isActive: boolean;
  }[];

  // Working & Financial Progress Chart Data
  workingProgressData: {
    x: number;
    financialProgress: number;
  }[];

  // Most Expenses Table Data
  expenses: {
    id: number;
    accountsDetails: string;
    subtotal: string;
    total: string;
  }[];
}

// =====================================================
// Mock Data (Based on image_7d89e6.png)
// =====================================================

const projectData: ProjectDashboardData = {
  projectName: "Sheba Eyecon Tower",
  daysRemaining: NaN,
  hoursRemaining: NaN,
  minutesRemaining: NaN,
  overallReportHref: "/dashboard/project/overall-report/sheba-eyecon-tower",

  budget: 2000000,
  cost: 45820,
  available: 1954180,
  salesRevenue: 0,
  profitLoss: -45820,

  tabs: [
    { name: "Dashboard", href: "#", isActive: true },
    { name: "BOQ", href: "#", isActive: false },
    { name: "Task", href: "#", isActive: false },
    { name: "Users", href: "#", isActive: false },
    { name: "Details", href: "#", isActive: false },
    { name: "Flat/Land", href: "#", isActive: false },
    { name: "BOQ Comparison", href: "#", isActive: false },
    { name: "Quotation", href: "#", isActive: false },
  ],

  workingProgressData: [
    { x: 0, financialProgress: 0 },
    { x: 1, financialProgress: 0 },
    { x: 2, financialProgress: 0 },
    { x: 3, financialProgress: 0 },
    { x: 4, financialProgress: 0 },
    { x: 5, financialProgress: 0 },
  ],

  expenses: [
    {
      id: 1,
      accountsDetails: "Fenching Wall",
      subtotal: "30,000.00",
      total: "-",
    },
    {
      id: 2,
      accountsDetails: "Materials Carring",
      subtotal: "15,000.00",
      total: "-",
    },
    {
      id: 3,
      accountsDetails: "Rod Consumption",
      subtotal: "820.00",
      total: "-",
    },
    {
      id: 4,
      accountsDetails: "Total Expense (-)",
      subtotal: "45,820.00",
      total: "-",
    },
  ],
};

// =====================================================
// Component
// =====================================================

const ProjectDashboardPage = () => {
  const data = projectData;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-12">
      {/* =================================================
          Top Navbar / Header Bar
      ================================================= */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        {/* Countdown Pill */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/60 px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 shadow-sm">
          <span className="text-red-500 font-black">NaN</span> Day :{" "}
          <span className="text-slate-900 font-black">NaN</span> Hour :{" "}
          <span className="text-slate-900 font-black">NaN</span> Second
        </div>

        {/* Project Title */}
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          {data.projectName}
        </h1>

        {/* Action Buttons (Eye Icon with Route + Overall Report) */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/project/shebadetails"
            className="flex items-center justify-center h-9 w-9 rounded-lg bg-cyan-400 text-slate-900 hover:bg-cyan-500 transition-colors shadow-sm"
            title="View Details Route"
          >
            <Eye className="h-5 w-5" />
          </Link>

          <Link
            href={data.overallReportHref}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Overall Report
          </Link>
        </div>
      </div>

      {/* =================================================
          Navigation Sub-Tabs
      ================================================= */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {data.tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                tab.isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* =================================================
          Main Content Container
      ================================================= */}
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* =================================================
            Top Metric Summary Cards
        ================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Budget */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">
                {data.budget.toLocaleString()}
              </p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Budget
              </p>
            </div>
          </div>

          {/* Cost */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">
                {data.cost.toLocaleString()}
              </p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Cost
              </p>
            </div>
          </div>

          {/* Available */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black text-emerald-600">
                {data.available.toLocaleString()}
              </p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Available
              </p>
            </div>
          </div>

          {/* Sales/Revenue */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-sky-500 flex items-center justify-center text-white shrink-0">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">
                {data.salesRevenue}
              </p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Sales/Revenue
              </p>
            </div>
          </div>

          {/* Profit/Loss */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black text-red-500">
                {data.profitLoss.toLocaleString()}
              </p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Profit/Loss
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            Middle Section: Charts & Tables Layout
        ================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Working Progress & Financial Progress Chart */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div className="text-center mb-4">
              <h3 className="text-sm font-bold text-slate-700">Working Progress</h3>
            </div>

            <div className="my-2 text-center">
              <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">
                Financial Progress
              </span>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.workingProgressData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="x"
                    ticks={[0, 1, 2, 3, 4, 5]}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={{ stroke: "#cbd5e1" }}
                    tickLine={false}
                  />
                  <YAxis
                    ticks={[0, 1, 2, 3, 4, 5]}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="financialProgress"
                    stroke="#cbd5e1"
                    strokeWidth={2}
                    fill="#f8fafc"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Working Schedule / Unsold Property & Expenses */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Unsold Property Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between h-[280px]">
              <div className="bg-red-500 py-2.5 px-4 text-center">
                <span className="text-xs font-bold text-white tracking-wider uppercase">
                  Unsold Property
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center p-6">
                {/* Empty state space as seen in reference */}
              </div>
              <div className="p-3 bg-white flex justify-end border-t border-slate-100">
                <Link
                  href="/dashboard/project/unsold-property"
                  className="px-5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  More
                </Link>
              </div>
            </div>

            {/* Most Expenses Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-white border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Most Expenses</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-4">Accounts Details</th>
                      <th className="py-2.5 px-4">Subtotal</th>
                      <th className="py-2.5 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {data.expenses.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4">{row.accountsDetails}</td>
                        <td className="py-3 px-4">{row.subtotal}</td>
                        <td className="py-3 px-4">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination & Slider Control */}
              <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-end gap-1">
                  <button className="px-3 py-1 rounded bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded bg-indigo-600 text-white text-xs font-semibold shadow-sm">
                    1
                  </button>
                  <button className="px-3 py-1 rounded bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200">
                    Next
                  </button>
                </div>

                {/* Orange Slider Indicator Bar */}
                <div className="relative flex items-center pt-2">
                  <div className="w-full h-1.5 bg-orange-500 rounded-full relative">
                    <div className="absolute -top-1.5 left-0 h-4 w-2 bg-orange-600 rounded-sm cursor-pointer shadow" />
                    <div className="absolute -top-1.5 right-0 h-4 w-2 bg-orange-600 rounded-sm cursor-pointer shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboardPage;