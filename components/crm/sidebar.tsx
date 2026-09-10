"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";

import { NAV_TREE, NavNode } from "./side-bar-links";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(false);

  const [activeModuleId, setActiveModuleId] = useState<string>(
    NAV_TREE[0]?.id ?? "",
  );

  const [navStack, setNavStack] = useState<NavNode[]>([]);

  useEffect(() => {
    const matchingModule = NAV_TREE.find((module) => {
      const modulePath = `/${module.id}`;

      return pathname === modulePath || pathname.startsWith(`${modulePath}/`);
    });

    if (!matchingModule) return;

    if (matchingModule.id !== activeModuleId) {
      setActiveModuleId(matchingModule.id);
      setNavStack([]);
      setModuleOpen(false);
    }
  }, [pathname, activeModuleId]);

  useEffect(() => {
    if (!moduleOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("[data-module-selector]")) {
        setModuleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moduleOpen]);

  useEffect(() => {
    if (!moduleOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModuleOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [moduleOpen]);

  const activeRootModule =
    NAV_TREE.find((module) => module.id === activeModuleId) ?? NAV_TREE[0];

  const handleModuleChange = (newModuleId: string) => {
    const newModule = NAV_TREE.find((module) => module.id === newModuleId);

    if (!newModule) return;

    setActiveModuleId(newModuleId);
    setNavStack([]);
    setModuleOpen(false);

    if (collapsed) {
      setCollapsed(false);
    }

    router.push(`/${newModule.id}`);
  };

  const currentNodes =
    navStack.length > 0
      ? (navStack[navStack.length - 1]?.children ?? [])
      : (activeRootModule?.children ?? []);

  const activeParent =
    navStack.length > 0 ? navStack[navStack.length - 1] : null;

  const handleSelectNode = (node: NavNode) => {
    if (!node.children?.length) return;

    if (collapsed) {
      setCollapsed(false);
    }

    setNavStack((previous) => [...previous, node]);
  };

  const handleGoBack = () => {
    setNavStack((previous) => previous.slice(0, -1));
  };

  const handleToggleCollapsed = () => {
    setCollapsed((previous) => !previous);
    setModuleOpen(false);
  };

  if (!activeRootModule) {
    return null;
  }

  const ActiveModuleIcon = activeRootModule.icon;

  return (
    <motion.aside
      animate={{
        width: collapsed ? 76 : 250,
      }}
      transition={{
        duration: 0.22,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="hidden md:flex h-screen sticky top-0 flex-col border-r border-border bg-surface select-none"
    >
      <div className="flex items-center px-4 h-16 border-b border-border shrink-0">
        {collapsed ? (
          <div className="h-8 w-8 shrink-0 rounded-md bg-accent-soft flex items-center justify-center mx-auto">
            <Building2
              className="text-accent-strong"
              size={17}
              strokeWidth={2}
            />
          </div>
        ) : (
          <div className="h-8 w-auto max-w-full flex items-center overflow-hidden">
            <Image
              src="/logo.svg"
              alt="RealBiz Pro"
              width={120}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
          </div>
        )}
      </div>

      <div className="p-3 border-b border-border/70 shrink-0 bg-surface">
        {collapsed ? (
          <motion.button
            type="button"
            onClick={() => setCollapsed(false)}
            whileTap={{ scale: 0.96 }}
            title={activeRootModule.label}
            className="flex items-center justify-center mx-auto h-9 w-9 rounded-md bg-accent-soft text-accent-strong hover:bg-canvas transition-colors"
          >
            {ActiveModuleIcon ? (
              <ActiveModuleIcon size={20} strokeWidth={2} />
            ) : (
              <Building2 size={20} strokeWidth={2} />
            )}
          </motion.button>
        ) : (
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-ink-faint uppercase tracking-wider px-1">
              Module
            </label>

            <div className="relative" data-module-selector>
              <motion.button
                type="button"
                onClick={() => setModuleOpen((previous) => !previous)}
                whileTap={{ scale: 0.98 }}
                aria-expanded={moduleOpen}
                aria-haspopup="listbox"
                className={clsx(
                  "w-full flex items-center justify-between",
                  "rounded-md border",
                  "bg-canvas px-2.5 py-2",
                  "text-[13px] font-semibold text-ink",
                  "outline-none",
                  "transition-colors duration-150",
                  moduleOpen
                    ? "border-accent-strong"
                    : "border-border hover:border-ink-faint",
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {ActiveModuleIcon ? (
                    <ActiveModuleIcon
                      size={16}
                      strokeWidth={2}
                      className="shrink-0 text-accent-strong"
                    />
                  ) : (
                    <Building2
                      size={16}
                      strokeWidth={2}
                      className="shrink-0 text-accent-strong"
                    />
                  )}

                  <span className="truncate">{activeRootModule.label}</span>
                </div>

                <motion.div
                  animate={{
                    rotate: moduleOpen ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="shrink-0 text-ink-muted"
                >
                  <ChevronDown size={15} strokeWidth={2.5} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {moduleOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.16,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-md border border-border bg-surface shadow-lg origin-top"
                  >
                    <div className="max-h-72 overflow-y-auto p-1">
                      {NAV_TREE.map((module) => {
                        const ModuleIcon = module.icon;

                        const isSelected = module.id === activeModuleId;

                        return (
                          <motion.button
                            key={module.id}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleModuleChange(module.id)}
                            initial={{
                              opacity: 0,
                              y: -3,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            whileHover={{
                              x: 2,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                            transition={{
                              duration: 0.12,
                            }}
                            className={clsx(
                              "relative w-full flex items-center gap-2.5",
                              "rounded-md px-2.5 py-2",
                              "text-left text-[13px]",
                              "transition-colors duration-150",
                              isSelected
                                ? "bg-accent-soft text-accent-strong font-semibold"
                                : "text-ink-muted hover:bg-canvas hover:text-ink",
                            )}
                          >
                            {ModuleIcon ? (
                              <ModuleIcon
                                size={16}
                                strokeWidth={2}
                                className={clsx(
                                  "shrink-0",
                                  isSelected
                                    ? "text-accent-strong"
                                    : "text-ink-faint",
                                )}
                              />
                            ) : (
                              <Building2
                                size={16}
                                strokeWidth={2}
                                className="shrink-0 text-ink-faint"
                              />
                            )}

                            <span className="truncate">{module.label}</span>

                            <AnimatePresence>
                              {isSelected && (
                                <motion.span
                                  initial={{
                                    opacity: 0,
                                    scale: 0.5,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    scale: 1,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    scale: 0.5,
                                  }}
                                  transition={{
                                    duration: 0.15,
                                  }}
                                  className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong"
                                />
                              )}
                            </AnimatePresence>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {!collapsed && activeParent && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          transition={{
            duration: 0.15,
          }}
          className="px-2 pt-3 pb-1 border-b border-border/50 shrink-0"
        >
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full flex items-center gap-2 rounded-md px-2.5 py-2 text-ink font-semibold bg-canvas hover:bg-border/30 transition-colors text-[13px]"
          >
            <ChevronLeft className="text-accent-strong shrink-0" size={16} />

            <span className="truncate">{activeParent.label}</span>
          </button>
        </motion.div>
      )}

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeParent?.id ?? activeModuleId}
            initial={{
              opacity: 0,
              x: 10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -10,
            }}
            transition={{
              duration: 0.15,
            }}
            className="space-y-1"
          >
            {currentNodes.map((node) => {
              const Icon = node.icon;

              const hasChildren = !!node.children && node.children.length > 0;

              const isActive = node.href
                ? pathname === node.href || pathname.startsWith(`${node.href}/`)
                : false;
              if (hasChildren) {
                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    onClick={() => handleSelectNode(node)}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className={clsx(
                      "group relative w-full flex items-center justify-between",
                      "rounded-md px-2.5 py-2",
                      "text-[13px] font-medium",
                      "transition-colors duration-150",
                      "text-ink-muted",
                      "hover:text-ink",
                      "hover:bg-canvas",
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {Icon && (
                        <Icon
                          className="shrink-0 text-accent-strong"
                          size={16}
                          strokeWidth={2}
                        />
                      )}

                      {!collapsed && (
                        <span className="truncate font-medium">
                          {node.label}
                        </span>
                      )}
                    </div>

                    {!collapsed && (
                      <ChevronRight
                        className="shrink-0 text-ink-faint group-hover:text-ink"
                        size={14}
                      />
                    )}
                  </motion.button>
                );
              }
              return (
                <Link
                  key={node.id}
                  href={node.href ?? "#"}
                  aria-current={isActive ? "page" : undefined}
                  title={collapsed ? node.label : undefined}
                  className={clsx(
                    "group relative w-full flex items-center",
                    "gap-2.5 rounded-md",
                    "px-2.5 py-2",
                    "text-[12.5px] font-medium",
                    "transition-colors duration-150",
                    isActive
                      ? [
                          "text-accent-strong",
                          "font-semibold",
                          "bg-accent-soft",
                        ]
                      : ["text-ink-muted", "hover:text-ink", "hover:bg-canvas"],
                  )}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-indicator"
                        initial={{
                          opacity: 0,
                          scaleY: 0.5,
                        }}
                        animate={{
                          opacity: 1,
                          scaleY: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scaleY: 0.5,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                        className="absolute left-0 h-5 w-0.5 origin-center rounded-full bg-accent-strong"
                      />
                    )}
                  </AnimatePresence>

                  {Icon && (
                    <Icon size={15} strokeWidth={2} className="shrink-0" />
                  )}

                  {!collapsed && <span className="truncate">{node.label}</span>}
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </nav>
      <div className="p-2 border-t border-border shrink-0 bg-surface z-10">
        <motion.button
          type="button"
          onClick={handleToggleCollapsed}
          whileTap={{
            scale: 0.98,
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-full flex items-center gap-2 rounded-md px-2.5 py-2 text-ink-faint hover:text-ink-muted hover:bg-canvas transition-colors text-[13px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {collapsed ? (
              <motion.div
                key="expand"
                initial={{
                  opacity: 0,
                  rotate: -20,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: 20,
                }}
              >
                <ChevronsRight size={16} />
              </motion.div>
            ) : (
              <motion.div
                key="collapse"
                initial={{
                  opacity: 0,
                  rotate: 20,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: -20,
                }}
              >
                <ChevronsLeft size={16} />
              </motion.div>
            )}
          </AnimatePresence>

          {!collapsed && <span>Collapse Sidebar</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}
