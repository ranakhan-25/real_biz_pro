"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileKey2,
  KeyRound,
  Menu,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Active Users",
    value: "1,182",
    change: "+8.2%",
    icon: UserCheck,
  },
  {
    title: "Total Roles",
    value: "18",
    change: "+3",
    icon: ShieldCheck,
  },
  {
    title: "Permissions",
    value: "96",
    change: "+8",
    icon: FileKey2,
  },
];

const activities = [
  {
    title: "New user created",
    description: "Rahim Ahmed was added as HR Manager",
    time: "5 min ago",
    icon: UserPlus,
  },
  {
    title: "Role updated",
    description: "HR Manager permissions were updated",
    time: "24 min ago",
    icon: ShieldCheck,
  },
  {
    title: "Permission added",
    description: "Employee salary.view permission created",
    time: "1 hour ago",
    icon: KeyRound,
  },
  {
    title: "Module activated",
    description: "Payroll module was activated",
    time: "2 hours ago",
    icon: Boxes,
  },
];

const activityData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 68 },
  { day: "Wed", value: 51 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 63 },
  { day: "Sat", value: 91 },
  { day: "Sun", value: 74 },
];

const roleData = [
  { name: "Admin", value: 82 },
  { name: "HR", value: 68 },
  { name: "Manager", value: 57 },
  { name: "Employee", value: 43 },
  { name: "Auditor", value: 31 },
];

const quickActions = [
  {
    label: "Users",
    description: "Manage users",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Roles",
    description: "Manage roles",
    icon: ShieldCheck,
    href: "/admin/roles",
  },
  {
    label: "Permissions",
    description: "Manage access",
    icon: KeyRound,
    href: "/admin/permissions",
  },
  {
    label: "Modules",
    description: "Manage modules",
    icon: Boxes,
    href: "/admin/modules",
  },
];

function ActivityChart() {
  const width = 760;
  const height = 260;
  const paddingX = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const max = 100;

  const points = activityData.map((item, index) => {
    const x =
      paddingX + (index / (activityData.length - 1)) * (width - paddingX * 2);

    const y =
      paddingTop +
      (1 - item.value / max) * (height - paddingTop - paddingBottom);

    return {
      x,
      y,
      value: item.value,
      day: item.day,
    };
  });

  const linePath = points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    .join(" ");

  const areaPath = `${linePath}
    L ${points[points.length - 1].x} ${height - paddingBottom}
    L ${points[0].x} ${height - paddingBottom}
    Z`;

  return (
    <div className="relative h-[270px] w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="activityArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D6BB2" stopOpacity="0.20" />

            <stop offset="100%" stopColor="#1D6BB2" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 25, 50, 75, 100].map((value) => {
          const y =
            paddingTop +
            (1 - value / max) * (height - paddingTop - paddingBottom);

          return (
            <g key={value}>
              <line
                x1={paddingX}
                x2={width - paddingX}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 6"
              />

              <text x={0} y={y + 4} fontSize="10" fill="#94a3b8">
                {value}
              </text>
            </g>
          );
        })}

        {/* Area */}
        <motion.path
          d={areaPath}
          fill="url(#activityArea)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#1D6BB2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        />

        {/* Points */}
        {points.map((point, index) => (
          <motion.circle
            key={point.day}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#ffffff"
            stroke="#1D6BB2"
            strokeWidth="2.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.5 + index * 0.08,
            }}
          />
        ))}
      </svg>

      {/* Bottom labels */}
      <div className="absolute bottom-0 left-8 right-4 flex justify-between">
        {activityData.map((item) => (
          <span
            key={item.day}
            className="text-[10px] font-medium text-slate-400"
          >
            {item.day}
          </span>
        ))}
      </div>
    </div>
  );
}

function DonutChart() {
  return (
    <div className="relative mx-auto h-48 w-48">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(#1D6BB2 0deg 300deg, #60A5FA 300deg 340deg, #93C5FD 340deg 352deg, #E2E8F0 352deg 360deg)",
        }}
      />

      <div className="absolute inset-[18px] flex flex-col items-center justify-center rounded-full bg-white">
        <span className="text-3xl font-bold tracking-tight text-slate-900">
          1,248
        </span>

        <span className="mt-1 text-[11px] text-slate-400">Total Users</span>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto w-full max-w-[1600px]">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1D6BB2]" />

            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1D6BB2]">
              Super Administration
            </p>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor and manage your GarmenTek platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            All systems operational
          </div>

          {/* <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#1D6BB2] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#185d9c]"
          >
            <Plus className="h-4 w-4" />
            Quick Create
          </button> */}
        </div>
      </motion.div>

      {/* =====================================================
          STATS
      ====================================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
              }}
              whileHover={{ y: -3 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#1D6BB2]/[0.035] transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1D6BB2]/10 text-[#1D6BB2] transition-all group-hover:bg-[#1D6BB2] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>

              <p className="relative mt-5 text-xs font-medium text-slate-500">
                {stat.title}
              </p>

              <h2 className="relative mt-1 text-2xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </h2>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${55 + index * 10}%`,
                  }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.7,
                  }}
                  className="h-full rounded-full bg-[#1D6BB2]"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =====================================================
          CHART ROW
      ====================================================== */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_1fr]">
        {/* USER ACTIVITY */}
        <motion.section
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  User Activity
                </h2>

                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600">
                  +18.4%
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                User registrations over the last 7 days
              </p>
            </div>

            <select className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-500 outline-none focus:border-[#1D6BB2] focus:ring-4 focus:ring-[#1D6BB2]/10">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          <div className="mt-5 flex items-center gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Total activity
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">475</p>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Peak
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">91</p>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Avg / day
              </p>

              <p className="mt-1 flex items-center gap-1 text-xl font-bold text-[#1D6BB2]">
                67.8
              </p>
            </div>
          </div>

          <div className="mt-5">
            <ActivityChart />
          </div>
        </motion.section>

        {/* USER DISTRIBUTION */}
        <motion.section
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                User Distribution
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Current account status
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3">
            <DonutChart />
          </div>

          <div className="mt-2 space-y-2">
            {[
              ["Active", "1,182", "bg-[#1D6BB2]"],
              ["Inactive", "42", "bg-blue-300"],
              ["Pending", "18", "bg-blue-200"],
              ["Suspended", "6", "bg-slate-300"],
            ].map(([label, value, dot]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${dot}`} />

                  <span className="text-[11px] font-medium text-slate-500">
                    {label}
                  </span>
                </div>

                <span className="text-xs font-bold text-slate-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          ANALYTICS ROW
      ====================================================== */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
        {/* ROLE ACTIVITY */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Role Activity
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                User distribution by role
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-5 gap-3">
            {roleData.map((item, index) => (
              <div key={item.name} className="flex flex-col">
                <div className="flex h-40 items-end justify-center rounded-xl bg-slate-50 p-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${item.value}%`,
                    }}
                    transition={{
                      delay: 0.5 + index * 0.08,
                      duration: 0.7,
                    }}
                    className="w-full max-w-[38px] rounded-t-lg bg-[#1D6BB2]"
                  />
                </div>

                <p className="mt-2 text-center text-[10px] font-semibold text-slate-600">
                  {item.name}
                </p>

                <p className="mt-0.5 text-center text-[10px] text-slate-400">
                  {item.value}%
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SYSTEM HEALTH */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                System Health
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Platform service status
              </p>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              <span className="text-[9px] font-bold text-emerald-600">
                Healthy
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            {[
              ["Authentication", "Operational", true],
              ["Authorization", "Operational", true],
              ["User Management", "Operational", true],
              ["Database", "Operational", true],
              ["Background Jobs", "Degraded", false],
            ].map(([label, status, good]) => (
              <div
                key={label as string}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-3"
              >
                <div className="flex items-center gap-2.5">
                  {good ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-amber-500" />
                  )}

                  <span className="text-[11px] font-medium text-slate-600">
                    {label as string}
                  </span>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                    good
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {status as string}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1D6BB2]/10 text-[#1D6BB2]">
              <Activity className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[10px] text-slate-400">System uptime</p>

              <p className="text-sm font-bold text-slate-900">99.98%</p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          BOTTOM ROW
      ====================================================== */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
        {/* RECENT ACTIVITY */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest administrative actions
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold text-[#1D6BB2] hover:underline"
            >
              View all
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.6 + index * 0.08,
                  }}
                  className="flex items-center gap-3.5 py-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1D6BB2]/10 text-[#1D6BB2]">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800">
                      {activity.title}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-slate-400">
                      {activity.description}
                    </p>
                  </div>

                  <span className="flex shrink-0 items-center gap-1 text-[10px] text-slate-400">
                    <Clock3 className="h-3 w-3" />
                    {activity.time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* QUICK ACTIONS */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div>
            <h2 className="text-sm font-bold text-slate-900">Quick Actions</h2>

            <p className="mt-1 text-xs text-slate-400">
              Frequently used administration tools
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.label}
                  href={action.href}
                  className="group rounded-xl border border-slate-200 p-4 transition-all hover:border-[#1D6BB2]/30 hover:bg-[#1D6BB2]/5 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1D6BB2]/10 text-[#1D6BB2] transition group-hover:bg-[#1D6BB2] group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>

                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition group-hover:text-[#1D6BB2]" />
                  </div>

                  <p className="mt-3 text-xs font-bold text-slate-700">
                    {action.label}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {action.description}
                  </p>
                </a>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["12", "Modules", Boxes],
              ["48", "Menus", Menu],
              ["96", "Keys", FileKey2],
            ].map(([value, label, Icon]) => {
              const MiniIcon = Icon as typeof Boxes;

              return (
                <div
                  key={label as string}
                  className="rounded-xl bg-slate-50 p-3 text-center"
                >
                  <MiniIcon className="mx-auto h-4 w-4 text-slate-400" />

                  <p className="mt-1.5 text-sm font-bold text-slate-800">
                    {value as string}
                  </p>

                  <p className="text-[9px] text-slate-400">{label as string}</p>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
