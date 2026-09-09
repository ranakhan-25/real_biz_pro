"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderOpenDot,
  Contact2,
  Wallet,
  Share2,
  ClipboardList,
  Receipt,
  Building2,
  FileText,
  ChevronDown,
  Home,
} from "lucide-react";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  gradient: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  {
    label: "Project",
    icon: FolderOpenDot,
    gradient: "from-blue-500 to-cyan-500",
    children: [
      { label: "Project Type", href: "/project/project-type" },
      { label: "Project", href: "/project/project" },
      { label: "Site", href: "/project/site" },
      { label: "Reports", href: "/project/reports" },
    ],
  },
  {
    label: "Contact",
    icon: Contact2,
    gradient: "from-emerald-500 to-teal-500",
    children: [
      { label: "Customer-Accounts", href: "/contact/customer-accounts" },
      { label: "Supplier Accounts", href: "/contact/supplier-accounts" },
      { label: "Labour/Workers/Contractor", href: "/contact/groups" },
    ],
  },
  {
    label: "Investment",
    icon: Wallet,
    gradient: "from-amber-500 to-orange-500",
    children: [
      { label: "Investors", href: "/investment/investors" },
      { label: "Investment Plans", href: "/investment/plans" },
      { label: "Returns", href: "/investment/returns" },
    ],
  },
  {
    label: "Share Project",
    icon: Share2,
    gradient: "from-fuchsia-500 to-pink-500",
    children: [
      { label: "Shared With Me", href: "/share-project/shared" },
      { label: "Share Settings", href: "/share-project/settings" },
    ],
  },
  {
    label: "Requisition",
    icon: ClipboardList,
    gradient: "from-rose-500 to-red-500",
    children: [
      { label: "All Requisitions", href: "/requisition" },
      { label: "New Requisition", href: "/requisition/new" },
      { label: "Approvals", href: "/requisition/approvals" },
    ],
  },
  {
    label: "Billing",
    icon: Receipt,
    gradient: "from-sky-500 to-blue-600",
    children: [
      { label: "Invoices", href: "/billing/invoices" },
      { label: "Payments", href: "/billing/payments" },
      { label: "Billing Settings", href: "/billing/settings" },
    ],
  },
  {
    label: "Flat/Land",
    icon: Building2,
    gradient: "from-lime-500 to-green-600",
    children: [
      { label: "Flats", href: "/flat-land/flats" },
      { label: "Land", href: "/flat-land/land" },
      { label: "Bookings", href: "/flat-land/bookings" },
    ],
  },
  {
    label: "Document",
    icon: FileText,
    gradient: "from-purple-500 to-indigo-600",
    children: [
      { label: "All Documents", href: "/document" },
      { label: "Upload Document", href: "/document/upload" },
      { label: "Templates", href: "/document/templates" },
    ],
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>("Project");

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const isChildActive = (children?: SubItem[]) =>
    children?.some((c) => pathname?.startsWith(c.href));

  return (
    <aside className="relative flex flex-col h-screen w-[280px] bg-gradient-to-b from-white to-slate-50 text-slate-500 overflow-hidden border-r border-slate-200/70">
      {/* ambient glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-16 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl" />

      {/* Brand */}
      <div className="relative flex items-center gap-3 px-6 h-[76px] border-b border-slate-200/70">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200">
          <Home className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-[15px] text-slate-800 tracking-tight">
            RealEstate Pro
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Build Better Tomorrow
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-5 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            openMenu === item.label || isChildActive(item.children);
          const isOpen = openMenu === item.label;

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleMenu(item.label)}
                className={`group relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-white text-slate-800 shadow-md shadow-slate-200/70 ring-1 ring-slate-200/70"
                    : "text-slate-500 hover:bg-white/70 hover:text-slate-700"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-gradient-to-b from-indigo-400 to-violet-500" />
                )}

                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} shadow-sm ${
                    active ? "opacity-100" : "opacity-90 group-hover:opacity-100"
                  } transition-opacity`}
                >
                  <Icon className="w-4 h-4 text-white" strokeWidth={2.2} />
                </span>

                <span className="flex-1 text-left text-[13.5px] font-medium tracking-tight">
                  {item.label}
                </span>

                {item.children && (
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-slate-600" : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.children && (
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-1"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ml-[19px] pl-4 border-l border-slate-200 space-y-0.5 py-0.5">
                      {item.children.map((sub) => {
                        const subActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block relative px-3 py-2 rounded-lg text-[13px] transition-colors duration-150 ${
                              subActive
                                ? "text-indigo-700 bg-indigo-50 font-medium"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/70"
                            }`}
                          >
                            {subActive && (
                              <span className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            )}
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative px-6 py-5 border-t border-slate-200/70">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            Real Estate Management System
          </p>
          <p className="text-[10px] text-slate-400">v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;