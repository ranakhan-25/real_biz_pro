export default function ProjectsDashboard() {
  const metrics = [
    { label: "Active projects", value: "38", tone: "bg-emerald-500/10 text-emerald-600" },
    { label: "Revenue YTD", value: "৳ 1.9B", tone: "bg-blue-500/10 text-blue-600" },
    { label: "Open work orders", value: "127", tone: "bg-violet-500/10 text-violet-600" },
    { label: "On-time delivery", value: "99.2%", tone: "bg-amber-500/10 text-amber-600" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {metric.label}
            </div>
            <div className="mt-3 text-2xl font-display font-bold tracking-tight text-foreground">
              {metric.value}
            </div>
            <div
              className={`mt-3 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${metric.tone}`}
            >
              Performance status
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-4 text-sm font-semibold text-foreground">Project status roll-up</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-170 text-left text-sm">
            <thead className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-semibold">Project</th>
                <th className="px-3 py-2 font-semibold">Type</th>
                <th className="px-3 py-2 font-semibold">Progress</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 text-right font-semibold">Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Riverside Horizon", "Residential", "68%", "On track", "৳ 420M"],
                ["Meridian Tower", "Commercial", "41%", "In build", "৳ 780M"],
                ["Meridian Yards", "Mixed-use", "88%", "Handover", "৳ 315M"],
              ].map(([name, type, progress, status, budget]) => (
                <tr key={name} className="hover:bg-foreground/3">
                  <td className="px-3 py-3 font-medium text-foreground">{name}</td>
                  <td className="px-3 py-3 text-muted-foreground">{type}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-28 rounded-full bg-foreground/10">
                        <div className="h-1.5 rounded-full bg-accent" style={{ width: progress }} />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{progress}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded px-2 py-0.5 text-xs font-bold bg-accent/20 text-foreground">
                      {status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-foreground">{budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
