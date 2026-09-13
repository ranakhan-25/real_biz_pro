export default function HrmDashboard() {
  const stats = [
    { label: "Employees", value: "486", tone: "bg-blue-500/10 text-blue-600" },
    { label: "Open roles", value: "12", tone: "bg-violet-500/10 text-violet-600" },
    { label: "Attendance", value: "94.2%", tone: "bg-emerald-500/10 text-emerald-600" },
    { label: "Leaves", value: "17", tone: "bg-orange-500/10 text-orange-600" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {stat.label}
            </div>
            <div className="mt-3 text-2xl font-display font-bold tracking-tight text-foreground">
              {stat.value}
            </div>
            <div
              className={`mt-3 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${stat.tone}`}
            >
              Live data
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-4 text-sm font-semibold text-foreground">People activity</div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["New hires", "7", "Across project teams"],
            ["Training", "18", "Courses scheduled"],
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
