const STATS = [
  { value: "12,000+", label: "Leads managed monthly" },
  { value: "3,400+", label: "Properties tracked" },
  { value: "180+", label: "Teams onboarded" },
  { value: "99.9%", label: "Platform uptime" },
];

export function StatsBar() {
  return (
    <section className="border-y border-brand-ink/6 bg-brand-ink px-5 py-10 md:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-semibold text-white md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[12.5px] text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
