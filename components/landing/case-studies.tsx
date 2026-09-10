import { ArrowUpRight } from "lucide-react";

const CASE_STUDIES = [
  {
    company: "Greenview Realty",
    tag: "42 agents \u00b7 3 branches",
    metric: "38%",
    metricLabel: "faster lead response time",
    summary:
      "Greenview was routing leads through a shared inbox that agents checked inconsistently. After moving to RealBiz's auto-assignment and missed-followup alerts, average first-contact time dropped from 6 hours to under 4.",
    accent: "bg-brand-blue-soft text-brand-blue",
  },
  {
    company: "Northgate Properties",
    tag: "15 agents \u00b7 1 branch",
    metric: "2.1x",
    metricLabel: "more deals closed per quarter",
    summary:
      "Northgate's sales pipeline was tracked across three separate spreadsheets that were always out of sync. Consolidating into RealBiz's pipeline view let managers spot stalled deals early and intervene before they went cold.",
    accent: "bg-brand-teal-soft text-brand-teal",
  },
  {
    company: "Cedarwood Group",
    tag: "60 agents \u00b7 5 branches",
    metric: "6 hrs/week",
    metricLabel: "saved per manager on reporting",
    summary:
      "With branches spread across three cities, Cedarwood's owners had no single view of performance. RealBiz's multi-branch reports replaced manually compiled spreadsheets that took each manager most of a Friday to prepare.",
    accent: "bg-brand-violet-soft text-brand-violet",
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono-accent)] text-[11.5px] font-semibold tracking-wider text-brand-blue">
            CASE STUDIES
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Real results from real teams
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.company}
              className="group flex flex-col rounded-2xl border border-brand-ink/[0.07] p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-ink/[0.06]"
            >
              <span
                className={`inline-block w-fit rounded-md px-2.5 py-1 text-[11px] font-medium ${study.accent}`}
              >
                {study.tag}
              </span>

              <p className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold text-brand-ink">
                {study.metric}
              </p>
              <p className="mt-1 text-[12.5px] font-medium text-brand-ink/50">
                {study.metricLabel}
              </p>

              <p className="mt-5 flex-1 text-[13.5px] leading-relaxed text-brand-ink/60">
                {study.summary}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-brand-ink/[0.06] pt-5">
                <span className="font-[family-name:var(--font-display)] text-[14px] font-semibold text-brand-ink">
                  {study.company}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-brand-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-ink"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
