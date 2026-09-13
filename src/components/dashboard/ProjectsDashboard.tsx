"use client";

import React from "react";
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
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  status: "Completed" | "In Progress" | "Pending";
  progress: number;
  date: string;
}

interface DashboardData {
  totalProjects: number;
  totalUsers: number;
  completedProjects: number;
  pendingProjects: number;
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

const dashboardData: DashboardData = {
  totalProjects: 6,
  totalUsers: 50,
  completedProjects: 6,
  pendingProjects: 0,

  projectStats: [
    { month: "Rifat Eyecon City", projects: 0 },
    { month: "Hena Heights", projects: 0 },
    { month: "Sheba Eyecon Tower", projects: 2 },
    { month: "Estern 19", projects: 0 },
    { month: "Lake Garden", projects: 0 },
    { month: "Head Office", projects: 0 },
  ],

  projectStatus: [
    { name: "On Track", value: 6 },
    { name: "At Risk", value: 0 },
    { name: "In Trouble", value: 0 },
  ],

  recentProjects: [
    { id: 1, name: "Rifat Eyecon City", status: "In Progress", progress: 0, date: "51 Months" },
    { id: 2, name: "Hena Heights", status: "In Progress", progress: 0, date: "15 Months" },
    { id: 3, name: "Sheba Eyecon Tower", status: "In Progress", progress: 0, date: "0 Months" },
    { id: 4, name: "Estern 19", status: "In Progress", progress: 0, date: "0 Months" },
  ],
};

const statusColors = ["#10b981", "#f59e0b", "#ef4444"];

const statusBadgeStyles: Record<Project["status"], string> = {
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:ring-emerald-800",
  "In Progress": "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-800",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:ring-amber-800",
};

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white/95 dark:bg-gray-900/95 dark:border-gray-800 px-4 py-3 shadow-xl backdrop-blur-sm">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          {p.value}
        </p>
      ))}
    </div>
  );
}

const DashboardPage = () => {
  const data = dashboardData;

  const stats = [
    {
      title: "Total Projects",
      value: data.totalProjects,
      description: "6 running currently",
      icon: FolderKanban,
      accent: "from-indigo-500 to-violet-600",
      glow: "shadow-indigo-200 dark:shadow-none",
    },
    {
      title: "Total Tasks",
      value: data.totalUsers,
      description: "Across all projects",
      icon: ListChecks,
      accent: "from-sky-500 to-blue-600",
      glow: "shadow-sky-200 dark:shadow-none",
    },
    {
      title: "On Track",
      value: data.completedProjects,
      description: "Projects on schedule",
      icon: ShieldCheck,
      accent: "from-emerald-500 to-teal-600",
      glow: "shadow-emerald-200 dark:shadow-none",
    },
    {
      title: "At Risk",
      value: data.pendingProjects,
      description: "Needs attention",
      icon: AlertTriangle,
      accent: "from-rose-500 to-orange-500",
      glow: "shadow-rose-200 dark:shadow-none",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/60 dark:from-gray-950 dark:to-gray-900 p-6 transition-colors">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Welcome back! Here&apos;s what&apos;s happening with your projects.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white dark:bg-gray-900 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800">
          <TrendingUp className="h-3.5 w-3.5" />
          All systems on track
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${item.glow}`}
            >
              <div
                className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${item.accent} opacity-10 blur-xl transition-opacity duration-300 group-hover:opacity-20`}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {item.value}
                  </h2>
                  <p className="mt-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                    {item.description}
                  </p>
                </div>
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} shadow-md`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Area Chart */}
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Project Overview
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Running progress across active projects
              </p>
            </div>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.projectStats}>
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" strokeOpacity={0.1} vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 11, fontWeight: 500 }}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                  interval={0}
                  axisLine={{ stroke: "#e5e7eb", strokeOpacity: 0.2 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="projects"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#colorProjects)"
                  dot={{ r: 4, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Project Status
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Current project distribution
          </p>

          <div className="relative mt-2 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.projectStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={3}
                  cornerRadius={6}
                  stroke="none"
                >
                  {data.projectStatus.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={statusColors[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {data.totalProjects}
              </span>
              <span className="text-[11px] font-medium text-gray-400">Total</span>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {data.projectStatus.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-400">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: statusColors[i] }}
                  />
                  {s.name}
                </span>
                <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mt-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Working &amp; Financial Progress
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Financial progress by the project
          </p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.projectStats} barSize={34}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" strokeOpacity={0.1} vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 11, fontWeight: 500 }}
                angle={-20}
                textAnchor="end"
                height={60}
                interval={0}
                axisLine={{ stroke: "#e5e7eb", strokeOpacity: 0.2 }}
                tickLine={false}
              />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.05)" }} />
              <Bar dataKey="projects" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="border-b border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Recent Projects
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Latest projects added to the system
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/70 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Duration
                </th>
              </tr>
            </thead>

            <tbody>
              {data.recentProjects.map((project) => (
                <tr
                  key={project.id}
                  className="border-t border-gray-50 dark:border-gray-800/60 transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/40"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeStyles[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {project.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;