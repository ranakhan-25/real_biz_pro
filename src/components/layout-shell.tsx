"use client";

import { usePathname } from "next/navigation";
<<<<<<< HEAD


export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const standaloneRoutes = [
    "/",
    "/pricing",
    "/crm-module",
    "/dashboard",
    "/login",
    "/properties",
    "/about",
    "/contact",
  ];

  const isStandalone = standaloneRoutes.some(
    (route) => route === "/" ? pathname === "/" : pathname?.startsWith(route)
  );
=======
import Navbar from "@/components/Navber";
import Sidebar from "@/components/Sidebar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Pages that provide their own full-page layout, site nav, or dashboard shell
  const isStandalone =
    pathname === "/" ||
    pathname?.startsWith("/crm-module") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/properties") ||
    pathname?.startsWith("/about") ||
    pathname?.startsWith("/contact");
>>>>>>> niloy

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> niloy
