const STEPS = [
  {
    number: "01",
    title: "Set up your workspace",
    description:
      "Add your company, branches, and team in minutes. Import existing leads and property listings with a guided setup.",
    accent: "text-brand-blue border-brand-blue/25 bg-brand-blue-soft",
  },
  {
    number: "02",
    title: "Bring your team on board",
    description:
      "Invite agents, assign roles and approval layers, and let RealBiz route new leads automatically.",
    accent: "text-brand-teal border-brand-teal/25 bg-brand-teal-soft",
  },
  {
    number: "03",
    title: "Track, close, and grow",
    description:
      "Follow every deal from first contact to registration, with reports that show exactly where to focus next.",
    accent: "text-brand-violet border-brand-violet/25 bg-brand-violet-soft",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono-accent)] text-[11.5px] font-semibold tracking-wider text-brand-teal">
            HOW IT WORKS
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Up and running in three steps
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full border font-[family-name:var(--font-mono-accent)] text-[14px] font-semibold ${step.accent}`}
              >
                {step.number}
              </span>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-[17px] font-semibold text-brand-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-brand-ink/55">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
