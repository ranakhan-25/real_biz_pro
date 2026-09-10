"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { useRouter } from "next/navigation";
import { Search, User, PhoneCall, Building2, FileText, CheckCircle2, X } from "lucide-react";
import { fetchStatCards, fetchNewLeads, fetchFollowUps, fetchPropertyStatusCounts } from "@/lib/api";

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Settings" | "Leads" | "Lead Stages" | "Properties";
  href: string;
  icon?: ElementType;
}

interface SearchBarProps {
  settingsItems: ReadonlyArray<{
    label: string;
    href: string;
    icon: ElementType;
  }>;
}

export function SearchBar({ settingsItems }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchData, setSearchData] = useState<SearchItem[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Combine Settings, Lead Stages, and Leads into a unified search dataset
  useEffect(() => {
    async function loadData() {
      const settingsMap: SearchItem[] = settingsItems.map((item) => ({
        id: `setting-${item.label}`,
        title: item.label,
        subtitle: "Settings page",
        category: "Settings",
        href: item.href,
        icon: item.icon,
      }));

      try {
        const [statCards, newLeads, followUps, propertyStatuses] = await Promise.all([
          fetchStatCards(),
          fetchNewLeads(),
          fetchFollowUps(),
          fetchPropertyStatusCounts(),
        ]);

        const stagesMap: SearchItem[] = statCards.map((card) => ({
          id: `stage-${card.id}`,
          title: card.label,
          subtitle: `${card.value} items`,
          category: "Lead Stages",
          href:
            card.leadStageId != null
              ? `/crm-module/add-lead-account?lead_stages=${card.leadStageId}`
              : `/crm-module/add-lead-account`,
          icon: CheckCircle2,
        }));

        const newLeadsMap: SearchItem[] = newLeads.map((lead) => ({
          id: `new-lead-${lead.id}`,
          title: lead.name,
          subtitle: `${lead.leadId} \u2022 Caller: ${lead.caller}`,
          category: "Leads",
          href: `/crm-module/leads/${lead.leadId}`,
          icon: User,
        }));

        const followUpsMap: SearchItem[] = followUps.map((lead) => ({
          id: `followup-${lead.id}`,
          title: lead.name,
          subtitle: `${lead.leadId} \u2022 Follow-up \u2022 ${lead.timestamp}`,
          category: "Leads",
          href: `/crm-module/leads/${lead.leadId}`,
          icon: PhoneCall,
        }));

        const propertiesMap: SearchItem[] = propertyStatuses.map((property) => ({
          id: `property-${property.status}`,
          title: property.status,
          subtitle: `${property.count} properties`,
          category: "Properties",
          href: `/crm-module/property?status=${encodeURIComponent(property.status)}`,
          icon: Building2,
        }));

        setSearchData([
          ...settingsMap,
          ...stagesMap,
          ...newLeadsMap,
          ...followUpsMap,
          ...propertiesMap,
        ]);
      } catch (err) {
        console.error("Failed to fetch search data", err);
        setSearchData(settingsMap);
      }
    }

    loadData();
  }, [settingsItems]);

  const filteredResults =
    query.trim() === ""
      ? []
      : searchData.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            item.subtitle?.toLowerCase().includes(query.toLowerCase()),
        );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    setQuery("");
    router.push(item.href);
  };

  // Keyboard shortcuts: Cmd/Ctrl+K to focus, Escape/Arrow keys/Enter to navigate results
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }

      if (!isOpen || filteredResults.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredResults[selectedIndex];
        if (selected) handleSelect(selected);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filteredResults, selectedIndex]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 max-w-md" ref={containerRef}>
      <div className="relative flex items-center">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search leads, properties, settings..."
          className="w-full rounded-md border border-border bg-canvas pl-9 pr-8 py-2 text-[13px] text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-2.5 text-ink-faint hover:text-ink"
          >
            <X size={14} />
          </button>
        ) : (
          <kbd className="absolute right-2.5 hidden sm:inline-flex items-center justify-center gap-1 rounded border border-border bg-surface px-1.5 py-0.5 font-medium leading-none text-ink-faint pointer-events-none select-none">
            <span className="text-[10px] leading-none">&#8984;</span>
            <span className="text-[14px] leading-none">K</span>
          </kbd>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 mt-2 max-h-96 overflow-y-auto rounded-lg border border-border bg-surface shadow-lg shadow-black/5 z-50 divide-y divide-border animate-[dropdown-in_0.15s_ease-out]">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => {
              const Icon = item.icon ?? FileText;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3.5 py-2.5 flex items-center gap-3 transition-colors ${
                    isSelected ? "bg-accent-soft text-accent-strong" : "hover:bg-canvas text-ink"
                  }`}
                >
                  <Icon size={16} className="shrink-0 text-ink-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-[11px] text-ink-faint truncate">{item.subtitle}</p>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-canvas text-ink-muted shrink-0 border border-border">
                    {item.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="px-3.5 py-6 text-center text-[13px] text-ink-faint">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}