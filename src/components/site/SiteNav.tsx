"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { useTheme } from "@/lib/theme";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                href={l.to}
                className={[
                  "text-sm font-medium text-foreground/70 transition hover:text-foreground",
                  active && "nav-active font-semibold text-foreground",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-md text-foreground/70 transition hover:bg-foreground/5"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <Link
            href="/login"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Log in
          </Link>
          <button
            className="grid h-9 w-9 place-items-center rounded-md md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-3 md:hidden">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className={[
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  active && "bg-accent/15 font-semibold",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <span className="font-display font-semibold text-foreground">RealBiz</span>
        <span>© {new Date().getFullYear()} RealBiz. Built for operators, not just owners.</span>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
