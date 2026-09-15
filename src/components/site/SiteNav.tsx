"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/Logo";
import { useTheme } from "@/lib/theme";
import { useLanguage } from "@/lib/language";
import { SiteFooter } from "@/components/Footer";

const links = [
  { to: "/", labelKey: "nav.home" },
  { to: "/properties", labelKey: "nav.properties" },
  { to: "/pricing", labelKey: "nav.pricing" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/contact", labelKey: "nav.contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const navRef = useRef<HTMLElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Logo />

        {/* Desktop Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => {
            const active =
              l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`text-sm font-medium transition ${
                  active
                    ? "font-semibold text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {t(l.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-md border border-border p-0.5">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`h-6 min-w-7 rounded px-1.5 text-[10px] font-semibold transition ${
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("bn")}
              className={`h-6 min-w-7 rounded px-1.5 text-[10px] font-semibold transition ${
                language === "bn"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              BN
            </button>
          </div>

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-md text-foreground/70 hover:bg-foreground/5"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <Link
            href="/login"
            className="hidden sm:inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {t("nav.login")}
          </Link>

          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-border/50 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Simple Animated Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="border-b border-border bg-background px-4 py-3 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => {
                const active =
                  l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                return (
                  <Link
                    key={l.to}
                    href={l.to}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2 text-base font-medium transition ${
                      active
                        ? "bg-accent/15 font-semibold text-foreground"
                        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                    }`}
                  >
                    {t(l.labelKey)}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-3 border-t border-border pt-3 sm:hidden">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full rounded-md bg-primary py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                {t("nav.login")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}