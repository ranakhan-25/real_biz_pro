import { Check, Minus, X } from "lucide-react";

type CellValue = "yes" | "partial" | "no" | string;

const ROWS: { feature: string; realbiz: CellValue; spreadsheets: CellValue; genericCrm: CellValue }[] = [
  { feature: "Built for real estate workflows", realbiz: "yes", spreadsheets: "no", genericCrm: "partial" },
  { feature: "Automatic lead assignment", realbiz: "yes", spreadsheets: "no", genericCrm: "partial" },
  { feature: "Property & inventory matching", realbiz: "yes", spreadsheets: "no", genericCrm: "no" },
  { feature: "Missed follow-up alerts", realbiz: "yes", spreadsheets: "no", genericCrm: "partial" },
  { feature: "Multi-branch reporting", realbiz: "yes", spreadsheets: "partial", genericCrm: "partial" },
  { feature: "Facebook Lead Ads capture", realbiz: "yes", spreadsheets: "no", genericCrm: "partial" },
  { feature: "Setup time", realbiz: "Under a day", spreadsheets: "Ongoing manual work", genericCrm: "Weeks" },
];

function Cell({ value }: { value: CellValue }) {
  if (value === "yes")
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-teal-soft text-brand-teal">
        <Check size={13} />
      </span>
    );
  if (value === "no")
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-ink/[0.06] text-brand-ink/30">
        <X size={13} />
      </span>
    );
  if (value === "partial")
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-amber-soft text-brand-amber">
        <Minus size={13} />
      </span>
    );
  return <span className="text-[12.5px] text-brand-ink/60">{value}</span>;
}

export function ComparisonTable() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono-accent)] text-[11.5px] font-semibold tracking-wider text-brand-amber">
            WHY REALBIZ
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Purpose-built beats general-purpose
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/60">
            Spreadsheets don&apos;t scale, and generic CRMs make you configure
            everything from scratch. RealBiz already knows what a real estate
            business needs.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-brand-ink/[0.08]">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-brand-ink/[0.08] bg-brand-canvas">
                <th className="px-5 py-4 text-[13px] font-medium text-brand-ink/50">Feature</th>
                <th className="px-5 py-4 text-center text-[13px] font-semibold text-brand-blue">
                  RealBiz
                </th>
                <th className="px-5 py-4 text-center text-[13px] font-medium text-brand-ink/50">
                  Spreadsheets
                </th>
                <th className="px-5 py-4 text-center text-[13px] font-medium text-brand-ink/50">
                  Other software
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i !== ROWS.length - 1 ? "border-b border-brand-ink/[0.06]" : ""}
                >
                  <td className="px-5 py-4 text-[13.5px] text-brand-ink">{row.feature}</td>
                  <td className="px-5 py-4 text-center">
                    <Cell value={row.realbiz} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Cell value={row.spreadsheets} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Cell value={row.genericCrm} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
