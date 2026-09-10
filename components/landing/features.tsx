import {
  UserRound,
  Building2,
  PieChart,
  Receipt,
  ClipboardList,
  FileText,
  LandPlot,
  FileBarChart2,
  Users,
  type LucideIcon,
} from "lucide-react";

interface Module {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

const MODULES: Module[] = [
  {
    icon: UserRound,
    title: "CRM & Lead Management",
    description:
      "Capture, assign, and follow up on every lead with stage tracking, call logs, and a full activity timeline per contact.",
    iconBg: "bg-brand-blue-soft",
    iconColor: "text-brand-blue",
  },
  {
    icon: Building2,
    title: "Property & Flat/Land Sales",
    description:
      "Manage flats, land, and blocks end-to-end — booking, sale offers, and the full sale record in one inventory system.",
    iconBg: "bg-brand-teal-soft",
    iconColor: "text-brand-teal",
  },
  {
    icon: PieChart,
    title: "Investment & Share Management",
    description:
      "Track investors, investment plans, and returns, plus shareholder allocations, collections, and penalty reports.",
    iconBg: "bg-brand-violet-soft",
    iconColor: "text-brand-violet",
  },
  {
    icon: Receipt,
    title: "Billing & Invoicing",
    description:
      "Generate contractor bills, work orders, period and adjustment billing, quotes, and track every payment in one place.",
    iconBg: "bg-brand-amber-soft",
    iconColor: "text-brand-amber",
  },
  {
    icon: ClipboardList,
    title: "Procurement & Requisition",
    description:
      "Route requisitions through approvals, issue purchase orders, log GRNs, and reconcile purchase bills without email chains.",
    iconBg: "bg-brand-blue-soft",
    iconColor: "text-brand-blue",
  },
  {
    icon: FileText,
    title: "Document Management",
    description:
      "Store, template, and organize every project and legal document with verification status tracked against each record.",
    iconBg: "bg-brand-teal-soft",
    iconColor: "text-brand-teal",
  },
  {
    icon: LandPlot,
    title: "Land Acquisition",
    description:
      "Track land owners, acquisition leads, and the negotiation process, with legal document verification built in.",
    iconBg: "bg-brand-violet-soft",
    iconColor: "text-brand-violet",
  },
  {
    icon: FileBarChart2,
    title: "Reports & KPIs",
    description:
      "From sales pipeline funnels to aging and installment reports, every module feeds dashboards built for daily decisions.",
    iconBg: "bg-brand-amber-soft",
    iconColor: "text-brand-amber",
  },
  {
    icon: Users,
    title: "Team, Roles & Approvals",
    description:
      "Set up branches, user roles, and approval layers so requisitions, bills, and deals move through the right sign-offs.",
    iconBg: "bg-brand-blue-soft",
    iconColor: "text-brand-blue",
  },
];

export function Features() {
  return (
    <section id="features" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono-accent text-[11.5px] font-semibold tracking-wider text-brand-violet">
            MODULES
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Every part of the business, in one platform
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/60">
            RealBiz isn&apos;t just a CRM. It&apos;s the full operating system
            for a real estate business &mdash; from the first lead to the
            final handover, and everything in between.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module) => (
            <div
              key={module.title}
              className="group rounded-2xl border border-brand-ink/[0.07] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-ink/6"
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${module.iconBg} ${module.iconColor}`}
              >
                <module.icon size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-4 font-display text-[16.5px] font-semibold text-brand-ink">
                {module.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-brand-ink/55">
                {module.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
