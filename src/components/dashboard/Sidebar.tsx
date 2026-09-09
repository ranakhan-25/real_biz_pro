"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MENUS, MODULES, type MenuNode, type ModuleKey } from "@/lib/menus";
import { cn } from "@/lib/utils";

type Props = {
  module: ModuleKey;
  activePath: string; // path within module ("" for module root)
  open: boolean;
  onClose: () => void;
  filter: string;
};

function filterTree(nodes: MenuNode[], q: string): MenuNode[] {
  if (!q) return nodes;
  const out: MenuNode[] = [];
  for (const n of nodes) {
    const kids = n.children ? filterTree(n.children, q) : [];
    if (n.label.toLowerCase().includes(q) || kids.length) {
      out.push({
        ...n,
        children: kids.length
          ? kids
          : n.children && n.label.toLowerCase().includes(q)
            ? n.children
            : undefined,
      });
    }
  }
  return out;
}

export function Sidebar({ module, activePath, open, onClose, filter }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const q = filter.trim().toLowerCase();
  const tree = useMemo(() => filterTree(MENUS[module], q), [module, q]);

  // Expanded groups: auto-open ancestors of the active item.
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  useEffect(() => {
    const parts = activePath.split("/").filter(Boolean);
    const next = new Set<string>();
    for (let i = 1; i < parts.length; i++) next.add(parts.slice(0, i).join("/"));
    setExpanded((prev) => new Set([...prev, ...next]));
  }, [activePath, module]);

  const toggle = (path: string) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(path)) {
        n.delete(path);
      } else {
        n.add(path);
      }
      return n;
    });
  };

  const renderNodes = (nodes: MenuNode[], depth = 0) => (
    <ul className={cn("space-y-0.5", depth > 0 && "ml-3 border-l border-border pl-2")}>
      {nodes.map((n) => {
        const isActive = n.path === activePath;
        const isAncestor = activePath.startsWith(n.path + "/");
        const isOpen = !!q || expanded.has(n.path);
        if (n.children?.length) {
          return (
            <li key={n.path}>
              <button
                onClick={() => toggle(n.path)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm transition",
                  depth === 0 ? "font-semibold" : "font-medium",
                  isAncestor
                    ? "bg-accent/15 text-foreground ring-1 ring-accent/40"
                    : "text-foreground/80 hover:bg-foreground/5",
                )}
              >
                <span className="flex items-center gap-1.5">
                  {isAncestor ? <span className="h-3.5 w-1 rounded bg-accent" /> : null}
                  {n.label}
                </span>
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 text-muted-foreground transition-transform",
                    isOpen && "rotate-90",
                  )}
                />
              </button>
              {isOpen ? <div className="mt-0.5">{renderNodes(n.children, depth + 1)}</div> : null}
            </li>
          );
        }
        return (
          <li key={n.path}>
            <Link
              href={n.path ? `/dashboard/${module}/${n.path}` : `/dashboard/${module}`}
              onClick={onClose}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition",
                isActive
                  ? "bg-accent/15 font-semibold text-foreground ring-1 ring-accent/40"
                  : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
              )}
            >
              {isActive ? <span className="h-3.5 w-1 rounded bg-accent" /> : null}
              {n.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {open ? <div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" onClick={onClose} /> : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b border-sidebar-border p-4">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="module-select"
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Module
            </label>
            <button onClick={onClose} className="lg:hidden" aria-label="Close sidebar">
              <X className="h-4 w-4" />
            </button>
          </div>
          <select
            id="module-select"
            value={module}
            onChange={(e) => {
              const next = `/dashboard/${e.target.value}`;
              if (pathname !== next) router.push(next);
            }}
            className="w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-accent"
          >
            {MODULES.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <nav className="grow overflow-y-auto px-3 py-3">
          {tree.length ? (
            renderNodes(tree)
          ) : (
            <p className="px-2 text-sm text-muted-foreground">No menu matches.</p>
          )}
        </nav>
        <div className="border-t border-sidebar-border px-4 py-3 text-[11px] text-muted-foreground">
          Menu follows the selected module.
        </div>
      </aside>
    </>
  );
}
