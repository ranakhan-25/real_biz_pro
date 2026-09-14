"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { getSession, type Session } from "@/lib/auth";
import { isModuleKey, type ModuleKey } from "@/lib/menus";

<<<<<<< HEAD
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
=======
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
>>>>>>> niloy
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const s = getSession();
    if (!s) router.replace("/login");
    else setSession(s);
  }, [router]);

  const rest = pathname.replace(/^\/dashboard\/?/, "");
  const [first = "", ...restParts] = rest.split("/").filter(Boolean);
  const moduleKey: ModuleKey = isModuleKey(first) ? first : "project";
  const activePath = restParts.join("/");

  if (!session) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
<<<<<<< HEAD
      <Topbar
        session={session}
        onMenu={() => setOpen(true)}
        search={search}
        onSearch={setSearch}
      />
=======
      <Topbar session={session} onMenu={() => setOpen(true)} search={search} onSearch={setSearch} />
>>>>>>> niloy
      <div className="flex">
        <Sidebar
          module={moduleKey}
          activePath={activePath}
          open={open}
          onClose={() => setOpen(false)}
          filter={search}
        />
<<<<<<< HEAD
        <main className="flex-1 px-4 md:px-6 py-5 max-w-350 w-full mx-auto">
          {children}
        </main>
=======
        <main className="min-w-0 flex-1">{children}</main>
>>>>>>> niloy
      </div>
    </div>
  );
}
