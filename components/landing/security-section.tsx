import { ShieldCheck, Lock, Database, UserCog } from "lucide-react";

const POINTS = [
  {
    icon: Lock,
    title: "Encrypted in transit and at rest",
    description:
      "All data moving between your team and RealBiz is encrypted with TLS, and stored data is encrypted at the database level.",
    color: "bg-brand-blue-soft text-brand-blue",
  },
  {
    icon: UserCog,
    title: "Role-based access control",
    description:
      "Agents see their own leads. Managers see their branch. Owners see everything. Approval layers control who can close or discount a deal.",
    color: "bg-brand-teal-soft text-brand-teal",
  },
  {
    icon: Database,
    title: "Your data stays yours",
    description:
      "Export your leads, properties, and reports at any time. There's no lock-in — if you ever leave, you leave with everything you put in.",
    color: "bg-brand-amber-soft text-brand-amber",
  },
  {
    icon: ShieldCheck,
    title: "Daily automated backups",
    description:
      "Every account is backed up daily, with point-in-time recovery available on Growth and Enterprise plans.",
    color: "bg-brand-violet-soft text-brand-violet",
  },
];

export function SecuritySection() {
  return (
    <section id="security" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono-accent text-[11.5px] font-semibold tracking-wider text-brand-violet">
            SECURITY &amp; DATA
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Your leads and client data, handled responsibly
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/60">
            Real estate businesses hold sensitive client and financial
            information. RealBiz is built with that responsibility in mind
            from the ground up, not bolted on afterward.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {POINTS.map((point) => (
            <div
              key={point.title}
              className="flex gap-4 rounded-2xl border border-brand-ink/[0.07] bg-white p-6"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${point.color}`}
              >
                <point.icon size={19} />
              </span>
              <div>
                <h3 className="font-display text-[15.5px] font-semibold text-brand-ink">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-brand-ink/55">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
