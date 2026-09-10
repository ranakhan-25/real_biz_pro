"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Case Studies", href: "#case-studies" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className={`sticky top-0 z-40 border-b bg-brand-canvas/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "border-brand-ink/8 shadow-sm shadow-brand-ink/4"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={32}
            className="h-8 w-auto object-contain select-none"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative px-3 py-2 text-[13.5px] font-medium text-brand-ink/70 transition-colors hover:text-brand-ink"
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-brand-ink/70 transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/crm-module"
            className="px-3.5 py-2 text-[13.5px] font-medium text-brand-ink/70 hover:text-brand-ink transition-colors"
          >
            View Demo
          </Link>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#pricing"
              className="group flex items-center gap-1.5 rounded-full bg-brand-ink px-4 py-2 text-[13.5px] font-medium text-white"
            >
              Get Started
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden relative flex h-9 w-9 items-center justify-center rounded-md text-brand-ink"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden border-t border-brand-ink/6 bg-brand-canvas"
          >
            <div className="px-5 py-4 space-y-3">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  className="block text-[14px] font-medium text-brand-ink/80"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: NAV_LINKS.length * 0.04 }}
              >
                <Link
                  href="/crm-module"
                  onClick={() => setOpen(false)}
                  className="block text-[14px] font-medium text-brand-ink/80"
                >
                  View Demo
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: (NAV_LINKS.length + 1) * 0.04,
                }}
              >
                <Link
                  href="#pricing"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-brand-ink px-4 py-2.5 text-center text-[14px] font-medium text-white"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
