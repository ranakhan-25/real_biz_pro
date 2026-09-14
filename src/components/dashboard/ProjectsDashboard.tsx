"use client";

import React from "react";
import Link from "next/link";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FolderKanban,
  ListChecks,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  ArrowUpRight,
  Sparkles,
  Layers,
  Activity,
} from "lucide-react";

// =====================================================
// Types
// =====================================================

interface Project {
  id: number;
  name: string;
  status: "On Track" | "At Risk" | "In Trouble";
  progress: number;
  duration: string;
  membersCount: number;
  totalTasks: number;
  completedTasks: number;
  budgetProgress: number;
  href: string;
}

interface DashboardData {
  totalProjects: number;
  totalTasks: number;
  completedProjects: number;
  pendingProjects: number;
  runningProjects: number;
  materialRequisitions: number;
  serviceRequisitions: number;
  unsoldFlatLand: number;

  projectStats: {
    month: string;
    projects: number;
  }[];

  projectStatus: {
    name: string;
    value: number;
  }[];

  recentProjects: Project[];
}

// =====================================================
// Dashboard Data
// =====================================================

const dashboardData: DashboardData = {
  totalProjects: 6,

  totalTasks: 52,

  completedProjects: 6,

  pendingProjects: 0,

  runningProjects: 6,

  materialRequisitions: 0,

  serviceRequisitions: 0,

  unsoldFlatLand: 0,

  projectStats: [
    {
      month: "Rifat Eyecon City",
      projects: 0,
    },
    {
      month: "Hena Heights",
      projects: 0,
    },
    {
      month: "Sheba Eyecon Tower",
      projects: 2,
    },
    {
      month: "Estern 19",
      projects: 0,
    },
    {
      month: "Lake Garden",
      projects: 0,
    },
    {
      month: "Head Office",
      projects: 0,
    },
  ],

  projectStatus: [
    {
      name: "On Track",
      value: 6,
    },
    {
      name: "At Risk",
      value: 0,
    },
    {
      name: "In Trouble",
      value: 0,
    },
  ],

  // ===================================================
  // Recent Projects
  // ===================================================

  recentProjects: [
    {
      id: 1,
      name: "Rifat Eyecon City",
      status: "On Track",
      progress: 0,
      duration: "51 Months",
      membersCount: 3,
      totalTasks: 1,
      completedTasks: 0,
      budgetProgress: 0,
      href: "/dashboard/project/dashboard/rifat",
    },

    {
      id: 2,
      name: "Hena Heights",
      status: "On Track",
      progress: 0,
      duration: "15 Months",
      membersCount: 1,
      totalTasks: 1,
      completedTasks: 0,
      budgetProgress: 0,
      href: "/dashboard/project/dashboard/hena-heights",
    },

    {
      id: 3,
      name: "Sheba Eyecon Tower",
      status: "On Track",
      progress: 0,
      duration: "0 Months",
      membersCount: 0,
      totalTasks: 1,
      completedTasks: 0,
      budgetProgress: 0,
      href: "/dashboard/project/dashboard/sheba",
    },

    {
      id: 4,
      name: "Estern 19",
      status: "On Track",
      progress: 0,
      duration: "0 Months",
      membersCount: 1,
      totalTasks: 1,
      completedTasks: 0,
      budgetProgress: 0,
      href: "/dashboard/project/dashboard/estern",
    },

    {
      id: 5,
      name: "Lake Garden",
      status: "On Track",
      progress: 0,
      duration: "0 Months",
      membersCount: 1,
      totalTasks: 1,
      completedTasks: 0,
      budgetProgress: 0.01,
      href: "/dashboard/project/dashboard/lake-garden",
    },

    {
      id: 6,
      name: "Head Office",
      status: "On Track",
      progress: 0,
      duration: "0 Months",
      membersCount: 1,
      totalTasks: 1,
      completedTasks: 0,
      budgetProgress: 0,
      href: "/dashboard/project/dashboard/head-office",
    },
  ],
};

// =====================================================
// Chart Colors
// =====================================================

const statusColors = [
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
];

// =====================================================
// Custom Tooltip
// =====================================================

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;

  payload?: {
    value: number;
    name: string;
    color: string;
  }[];

  label?: string;
}) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 text-slate-900 shadow-2xl backdrop-blur-md">
      {label && (
        <p className="text-xs font-semibold text-slate-400">
          {label}
        </p>
      )}

      {payload.map((item, index) => (
        <p
          key={index}
          className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-900"
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{
              backgroundColor: item.color,
            }}
          />

          {item.value}
        </p>
      ))}
    </div>
  );
}

// =====================================================
// Dashboard Page
// =====================================================

const DashboardPage = () => {
  const data = dashboardData;

  // ===================================================
  // Top Statistics
  // ===================================================

  const stats = [
    {
      id: 1,

      title: "Total Projects",

      value: data.totalProjects,

      description: "Running currently",

      href: "/dashboard/project/dashboard/totalprojects",

      trend: "+12%",

      isPositive: true,

      icon: FolderKanban,

      miniChartType: "area" as const,

      gradient:
        "from-blue-600 via-indigo-600 to-violet-700",

      bgGlow: "bg-blue-500/15",

      chartData: [
        { v: 2 },
        { v: 4 },
        { v: 3 },
        { v: 5 },
        { v: 4 },
      ],
    },

    {
      id: 2,

      title: "Running Project",

      value: data.runningProjects,

      description: "Currently in progress",

      href: "/dashboard/project/dashboard/running",

      trend: "+0%",

      isPositive: true,

      icon: Activity,

      miniChartType: "area" as const,

      gradient:
        "from-teal-600 via-cyan-600 to-sky-700",

      bgGlow: "bg-teal-500/15",

      chartData: [
        { v: 3 },
        { v: 4 },
        { v: 5 },
        { v: 4 },
        { v: 6 },
      ],
    },

    {
      id: 3,

      title: "Material Req.",

      value: data.materialRequisitions,

      description: "Pending requisitions",

      href: "/dashboard/project/dashboard/material-requisition",

      trend: "0.0%",

      isPositive: false,

      icon: ListChecks,

      miniChartType: "bar" as const,

      gradient:
        "from-emerald-600 via-green-600 to-teal-700",

      bgGlow: "bg-emerald-500/15",

      chartData: [
        { v: 0 },
        { v: 0 },
        { v: 0 },
        { v: 0 },
        { v: 0 },
      ],
    },

    {
      id: 4,

      title: "Service Req.",

      value: data.serviceRequisitions,

      description: "Pending service requests",

      href: "/dashboard/project/dashboard/service-work-requisition",

      trend: "0.0%",

      isPositive: false,

      icon: ShieldCheck,

      miniChartType: "bar" as const,

      gradient:
        "from-fuchsia-600 via-pink-600 to-rose-700",

      bgGlow: "bg-fuchsia-500/15",

      chartData: [
        { v: 0 },
        { v: 0 },
        { v: 0 },
        { v: 0 },
        { v: 0 },
      ],
    },

    {
      id: 5,

      title: "Task",

      value: data.totalTasks,

      description: "Across all projects",

      href: "/dashboard/project/dashboard/",

      trend: "+8.4%",

      isPositive: true,

      icon: ListChecks,

      miniChartType: "bar" as const,

      gradient:
        "from-orange-600 via-red-600 to-rose-700",

      bgGlow: "bg-orange-500/15",

      chartData: [
        { v: 10 },
        { v: 25 },
        { v: 18 },
        { v: 35 },
        { v: 52 },
      ],
    },

    {
      id: 6,

      title: "Unsold Flat/Land",

      value: data.unsoldFlatLand,

      description: "Available inventory",

      href: "/dashboard/project/dashboard/flat-land",

      trend: "0.0%",

      isPositive: false,

      icon: AlertTriangle,

      miniChartType: "bar" as const,

      gradient:
        "from-blue-500 via-sky-600 to-indigo-700",

      bgGlow: "bg-blue-500/15",

      chartData: [
        { v: 0 },
        { v: 0 },
        { v: 0 },
        { v: 0 },
        { v: 0 },
      ],
    },
  ];

  // ===================================================
  // Render
  // ===================================================

  return (
    <div className="min-h-screen bg-slate-50/80 p-6 font-sans text-slate-900 selection:bg-blue-600 selection:text-white md:p-8">

      {/* =================================================
          Header
      ================================================= */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          {/* Workspace Badge */}

          <div className="mb-1 flex items-center gap-2">

            <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">

              <Sparkles className="h-3 w-3" />

              Enterprise Workspace

            </span>

          </div>

          {/* Title */}

          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-4xl">
            Project Dashboard
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Real-time analytics, portfolio status, and workflow metrics.
          </p>

        </div>

        {/* System Status */}

        <div className="flex items-center gap-3">

          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-emerald-600 shadow-md">

            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />

            All Systems Optimized

          </div>

        </div>

      </div>

      {/* =================================================
          Top Statistics Cards
      ================================================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <Link
              key={item.id}
              href={item.href}
              className="group relative block overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-blue-500/10"
            >

              {/* Background Glow */}

              <div
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${item.bgGlow} blur-2xl transition-all duration-500 group-hover:scale-150`}
              />

              {/* Main Content */}

              <div className="relative z-10 flex items-start justify-between gap-3">

                <div className="min-w-0">

                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {item.title}
                  </p>

                  <div className="mt-2 flex items-baseline gap-3">

                    <h3 className="text-4xl font-black tracking-tight text-slate-900">
                      {item.value}
                    </h3>

                    <span
                      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold ${
                        item.isPositive
                          ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >

                      {item.isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}

                      {item.trend}

                    </span>

                  </div>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {item.description}
                  </p>

                </div>

                {/* Updated Icon */}

                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg transition-all duration-500 group-hover:rotate-3 group-hover:scale-110`}
                >

                  <Icon className="h-9 w-9 stroke-[2.2]" />

                </div>

              </div>

              {/* Mini Chart */}

              <div className="mt-5 h-[45px] w-full pt-2">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  {item.miniChartType === "area" ? (

                    <AreaChart data={item.chartData}>

                      <defs>

                        <linearGradient
                          id={`grad-${item.id}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="0%"
                            stopColor="#38BDF8"
                            stopOpacity={0.45}
                          />

                          <stop
                            offset="100%"
                            stopColor="#38BDF8"
                            stopOpacity={0.05}
                          />

                        </linearGradient>

                      </defs>

                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="#38BDF8"
                        strokeWidth={2}
                        fill={`url(#grad-${item.id})`}
                      />

                    </AreaChart>

                  ) : (

                    <BarChart data={item.chartData}>

                      <Bar
                        dataKey="v"
                        fill="#38BDF8"
                        radius={[3, 3, 0, 0]}
                      />

                    </BarChart>

                  )}

                </ResponsiveContainer>

              </div>

            </Link>

          );

        })}

      </div>

      {/* =================================================
          Main Charts
      ================================================= */}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* =================================================
            Project Portfolio Overview
        ================================================= */}

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl backdrop-blur-xl lg:col-span-2">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">

                <Activity className="h-4 w-4 text-blue-500" />

                Project Portfolio Overview

              </h2>

              <p className="text-xs text-slate-400">
                Active workflow velocity and distribution timeline
              </p>

            </div>

          </div>

          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart data={data.projectStats}>

                <defs>

                  <linearGradient
                    id="colorProjects"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#38BDF8"
                      stopOpacity={0.45}
                    />

                    <stop
                      offset="95%"
                      stopColor="#38BDF8"
                      stopOpacity={0.05}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  angle={-15}
                  textAnchor="end"
                  height={50}
                  interval={0}
                  axisLine={{
                    stroke: "#e2e8f0",
                  }}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  content={<CustomTooltip />}
                />

                <Area
                  type="monotone"
                  dataKey="projects"
                  stroke="#38BDF8"
                  strokeWidth={3}
                  fill="url(#colorProjects)"
                  dot={{
                    r: 4,
                    fill: "#38BDF8",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#0EA5E9",
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* =================================================
            Portfolio Health
        ================================================= */}

        <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-xl backdrop-blur-xl">

          <div>

            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">

              <Layers className="h-4 w-4 text-blue-500" />

              Portfolio Health

            </h2>

            <p className="text-xs text-slate-400">
              Current status distribution matrix
            </p>

          </div>

          {/* Pie Chart */}

          <div className="relative my-auto h-[200px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={data.projectStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  cornerRadius={6}
                  stroke="none"
                >

                  {data.projectStatus.map((_, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={statusColors[index]}
                    />

                  ))}

                </Pie>

                <Tooltip
                  content={<CustomTooltip />}
                />

              </PieChart>

            </ResponsiveContainer>

            {/* Center */}

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

              <span className="text-3xl font-black text-slate-900">
                {data.totalProjects}
              </span>

              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Active
              </span>

            </div>

          </div>

          {/* Legend */}

          <div className="space-y-2 pt-2">

            {data.projectStatus.map((status, index) => (

              <div
                key={status.name}
                className="flex items-center justify-between text-xs font-semibold"
              >

                <span className="flex items-center gap-2 text-slate-400">

                  <span
                    className="h-2.5 w-2.5 rounded-full shadow-md"
                    style={{
                      backgroundColor:
                        statusColors[index],
                    }}
                  />

                  {status.name}

                </span>

                <span className="font-mono font-bold text-slate-900">
                  {status.value}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* =================================================
          Working & Financial Progress
      ================================================= */}

      <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl backdrop-blur-xl">

        <div className="mb-6">

          <h2 className="text-base font-bold text-slate-900">
            Working &amp; Financial Progress
          </h2>

          <p className="text-xs text-slate-400">
            Financial distribution across active projects
          </p>

        </div>

        <div className="h-[280px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={data.projectStats}
              barSize={28}
            >

              <defs>

                <linearGradient
                  id="colorBar"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#38BDF8"
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563EB"
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                  fontWeight: 500,
                }}
                angle={-15}
                textAnchor="end"
                height={50}
                interval={0}
                axisLine={{
                  stroke: "#e2e8f0",
                }}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "#F0F9FF",
                }}
              />

              <Bar
                dataKey="projects"
                fill="url(#colorBar)"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* =================================================
          Recent Projects
      ================================================= */}

      <div className="mt-8">

        {/* Section Header */}

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Recent Projects Portfolio
            </h2>

            <p className="text-xs text-slate-400">
              Interactive project cards with elite blue styling
            </p>

          </div>

        </div>

        {/* Project Cards */}

        <div className="grid grid-cols-1 gap-4">

          {data.recentProjects.map((project) => (

            <Link
              key={project.id}
              href={project.href}
              className="group relative flex flex-col items-stretch overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/20 lg:flex-row"
            >

              {/* =================================================
                  Left Green/Blue Ribbon based on status or style requested
              ================================================= */}

              <div className="absolute bottom-0 left-0 top-0 flex w-12 items-center justify-center bg-gradient-to-b from-emerald-500 to-lime-600 shadow-inner">

                <span className="rotate-180 text-[11px] font-bold uppercase tracking-widest text-white [writing-mode:vertical-lr]">
                  {project.status}
                </span>

              </div>

              {/* =================================================
                  Card Content
              ================================================= */}

              <div className="grid w-full grid-cols-1 items-center gap-6 pl-8 lg:grid-cols-12">

                {/* =================================================
                    Project Title & Progress
                ================================================= */}

                <div className="space-y-4 lg:col-span-5">

                  <div className="flex items-center justify-between">

                    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">

                      {project.name}

                      <ArrowUpRight className="h-4 w-4 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />

                    </h3>

                  </div>

                  {/* Progress Cards */}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* % Complete */}

                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">

                      <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-slate-400">

                        <span>
                          % Complete
                        </span>

                        <span className="font-bold text-slate-800">
                          {project.progress.toFixed(2)}%
                        </span>

                      </div>

                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* Project Budget */}

                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">

                      <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-slate-400">

                        <span>
                          Project Budget
                        </span>

                        <span className="font-bold text-slate-800">
                          {project.budgetProgress}%
                        </span>

                      </div>

                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                          style={{
                            width: `${project.budgetProgress}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    Duration & Members
                ================================================= */}

                <div className="flex flex-col justify-center gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:border-l lg:border-r lg:border-slate-100 lg:px-6">

                  {/* Duration */}

                  <div className="flex items-center gap-3 rounded-2xl border border-blue-100/50 bg-blue-50/40 p-2.5">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">

                      <Calendar className="h-4 w-4" />

                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Duration
                      </p>

                      <p className="text-xs font-bold text-slate-800">
                        {project.duration}
                      </p>

                    </div>

                  </div>

                  {/* Team Members */}

                  <div className="flex items-center gap-3 rounded-2xl border border-indigo-100/50 bg-indigo-50/40 p-2.5">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">

                      <Users className="h-4 w-4" />

                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Team Members
                      </p>

                      <p className="text-xs font-bold text-slate-800">

                        {project.membersCount} Member
                        {project.membersCount !== 1
                          ? "s"
                          : ""}

                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    Tasks Counters
                ================================================= */}

                <div className="flex items-center gap-4 lg:col-span-3 lg:justify-end">

                  {/* Total Tasks */}

                  <div className="min-w-[90px] flex-1 rounded-2xl border border-sky-100 bg-sky-50/60 p-3 text-center lg:flex-none">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-sky-500">
                      Total Tasks
                    </p>

                    <p className="mt-1 text-xl font-black text-slate-900">
                      {project.totalTasks}
                    </p>

                  </div>

                  {/* Completed */}

                  <div className="min-w-[90px] flex-1 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3 text-center lg:flex-none">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                      Completed
                    </p>

                    <p className="mt-1 text-xl font-black text-slate-900">
                      {project.completedTasks}
                    </p>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;