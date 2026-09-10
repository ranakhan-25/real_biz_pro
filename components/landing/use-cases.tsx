"use client";

import { useState } from "react";
import { UserRound, Users, Crown, Check } from "lucide-react";

const ROLES = [
  {
    id: "agent",
    label: "Agents",
    icon: UserRound,
    accent: "bg-brand-blue-soft text-brand-blue border-brand-blue/30",
    headline: "Spend your day closing, not chasing paperwork",
    description:
      "Every lead you're assigned shows up with full context — source, budget, past calls, and what to say next. No more digging through group chats to remember who you spoke to last week.",
    points: [
      "See today's calls, visits, and follow-ups in one list",
      "Log a call or note in two taps from your phone",
      "Get notified before a follow-up is missed, not after",
    ],
  },
  {
    id: "manager",
    label: "Sales Managers",
    icon: Users,
    accent: "bg-brand-teal-soft text-brand-teal border-brand-teal/30",
    headline: "Know exactly where every deal stands, in real time",
    description:
      "Stop asking agents for status updates in meetings. Watch leads move through stages live, spot deals that have gone quiet, and rebalance workload across your team in a few clicks.",
    points: [
      "Pipeline view across the whole team, not just one agent",
      "Reassign leads instantly when someone's overloaded",
      "Weekly performance breakdown by agent and source",
    ],
  },
  {
    id: "owner",
    label: "Business Owners",
    icon: Crown,
    accent: "bg-brand-violet-soft text-brand-violet border-brand-violet/30",
    headline: "See the health of the business without asking anyone",
    description:
      "From one dashboard, understand which lead sources actually convert, which branches are outperforming, and where revenue is sitting in the pipeline — without waiting for a monthly report.",
    points: [
      "Multi-branch reporting rolled up into one view",
      "Lead source ROI, so you know where to spend on ads",
      "Approval layers so nothing moves without sign-off",
    ],
  },
] as const;

export function UseCases() {
  const [active, setActive] = useState<(typeof ROLES)[number]["id"]>("agent");
  const role = ROLES.find((r) => r.id === active) ?? ROLES[0];

  return (
    <section id="use-cases" className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono-accent text-[11.5px] font-semibold tracking-wider text-brand-blue">
            BUILT FOR EVERY ROLE
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            One platform, tailored to how each person works
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/60">
            Agents, managers, and owners all need different things from a CRM.
            RealBiz gives each of them exactly that, from the same data.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const isActive = r.id === active;
            return (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? r.accent
                    : "border-brand-ink/10 text-brand-ink/60 hover:text-brand-ink"
                }`}
              >
                <Icon size={15} />
                {r.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 rounded-3xl border border-brand-ink/[0.07] bg-brand-canvas p-8 md:grid-cols-2 md:p-12">
          <div>
            <h3 className="font-display text-2xl font-semibold text-brand-ink">
              {role.headline}
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-brand-ink/60">
              {role.description}
            </p>
            <ul className="mt-6 space-y-3">
              {role.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check size={15} className="mt-0.5 shrink-0 text-brand-teal" />
                  <span className="text-[13.5px] text-brand-ink/70">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-ink/10 bg-white p-5 shadow-lg shadow-brand-ink/5">
            <div className="flex items-center gap-2.5 border-b border-brand-ink/6 pb-4">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${role.accent}`}
              >
                <role.icon size={16} />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-brand-ink">{role.label} view</p>
                <p className="text-[11.5px] text-brand-ink/45">Live preview</p>
              </div>
            </div>
            <div className="mt-4 space-y-2.5">
              {[1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between rounded-lg border border-brand-ink/6 px-3 py-2.5"
                >
                  <div className="h-2 w-24 rounded-full bg-brand-ink/10" />
                  <div className="h-2 w-10 rounded-full bg-brand-ink/8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
