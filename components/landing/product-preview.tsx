const STAT_TILES = [
  { label: "Total Leads", value: "128", color: "bg-brand-blue-soft text-brand-blue" },
  { label: "Sold", value: "14", color: "bg-brand-teal-soft text-brand-teal" },
  { label: "Priority", value: "9", color: "bg-brand-amber-soft text-brand-amber" },
  { label: "Booked", value: "16", color: "bg-brand-violet-soft text-brand-violet" },
];

export function ProductPreview() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-20">
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute -top-10 left-1/2 h-64 w-[90%] -translate-x-1/2 rounded-full bg-brand-blue/6 blur-3xl" />
        <div className="relative overflow-hidden rounded-2xl border border-brand-ink/10 bg-white shadow-2xl shadow-brand-ink/10">
          <div className="flex items-center gap-1.5 border-b border-brand-ink/6 bg-brand-ink/2 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-teal/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-blue/70" />
            <span className="ml-3 rounded-md bg-white px-3 py-1 text-[11px] text-brand-ink/40 border border-brand-ink/6">
              app.realbiz.io/crm-module
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
            {STAT_TILES.map((tile) => (
              <div key={tile.label} className="rounded-xl border border-brand-ink/6 p-4">
                <span
                  className={`inline-block rounded-md px-2 py-0.5 text-[10.5px] font-medium ${tile.color}`}
                >
                  {tile.label}
                </span>
                <p className="mt-2 font-display text-2xl font-semibold text-brand-ink">
                  {tile.value}
                </p>
              </div>
            ))}
            <div className="col-span-2 rounded-xl border border-brand-ink/6 p-4 md:col-span-4">
              <div className="flex h-24 items-end gap-2">
                {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-t-md ${
                      ["bg-brand-blue/70", "bg-brand-teal/70", "bg-brand-amber/70", "bg-brand-violet/70"][
                        i % 4
                      ]
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
