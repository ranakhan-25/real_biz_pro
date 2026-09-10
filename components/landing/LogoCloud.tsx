const COMPANIES = [
  "Greenview Realty",
  "Northgate Properties",
  "Skyline Developers",
  "Harbor & Co.",
  "Metro Estates",
  "Cedarwood Group",
];

export function LogoCloud() {
  const doubled = [...COMPANIES, ...COMPANIES];

  return (
    <section className="border-y border-brand-ink/6 bg-white py-8">
      <p className="mb-6 text-center text-[11.5px] font-medium uppercase tracking-wider text-brand-ink/35">
        Trusted by growing real estate businesses
      </p>
      <div className="relative mx-auto max-w-6xl overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex w-max items-center gap-14 whitespace-nowrap"
          style={{ animation: "marquee 26s linear infinite" }}
        >
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-[16px] font-semibold text-brand-ink/25"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
