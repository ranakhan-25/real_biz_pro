export default function LamsDashboard() {
  const cards = [
    { label: "Land owners", value: "126", tone: "bg-blue-500/10 text-blue-600" },
    { label: "Acquisition leads", value: "42", tone: "bg-violet-500/10 text-violet-600" },
    { label: "Negotiations", value: "19", tone: "bg-amber-500/10 text-amber-600" },
    { label: "Docs pending", value: "8", tone: "bg-rose-500/10 text-rose-600" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {card.label}
            </div>
            <div className="mt-3 text-2xl font-display font-bold tracking-tight text-foreground">
              {card.value}
            </div>
            <div
              className={`mt-3 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${card.tone}`}
            >
              This cycle
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-4 text-sm font-semibold text-foreground">LAMS pipeline</div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Acquired", "71", "New land tied up"],
            ["In negotiation", "29", "Awaiting approvals"],
            ["Legal review", "12", "Documents under review"],
          ].map(([label, value, note]) => (
            <div key={label} className="rounded-lg border border-border bg-background p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </div>
              <div className="mt-3 text-3xl font-display font-bold text-foreground">{value}</div>
              <div className="mt-2 text-xs text-muted-foreground">{note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
