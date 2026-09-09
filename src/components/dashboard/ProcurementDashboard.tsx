export default function ProcurementDashboard() {
  const cards = [
    { label: "RFQs", value: "38", tone: "bg-sky-500/10 text-sky-600" },
    { label: "POs", value: "26", tone: "bg-violet-500/10 text-violet-600" },
    { label: "GRNs", value: "19", tone: "bg-emerald-500/10 text-emerald-600" },
    { label: "Bills", value: "14", tone: "bg-orange-500/10 text-orange-600" },
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
              Live status
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-4 text-sm font-semibold text-foreground">Procurement pipeline</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-semibold">Requisition</th>
                <th className="px-3 py-2 font-semibold">Vendor</th>
                <th className="px-3 py-2 font-semibold">Stage</th>
                <th className="px-3 py-2 font-semibold">ETA</th>
                <th className="px-3 py-2 text-right font-semibold">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["MAT-2048", "Urban Build Supply", "PO approved", "12-Sept-2026", "৳ 4.8M"],
                ["MAT-2051", "Prime Structural Ltd.", "GRN pending", "15-Sept-2026", "৳ 2.6M"],
                ["MAT-2057", "Metro Trade Co.", "RFQ in review", "18-Sept-2026", "৳ 1.9M"],
              ].map(([request, vendor, stage, eta, value]) => (
                <tr key={request} className="hover:bg-foreground/3">
                  <td className="px-3 py-3 font-medium text-foreground">{request}</td>
                  <td className="px-3 py-3 text-muted-foreground">{vendor}</td>
                  <td className="px-3 py-3">
                    <span className="rounded px-2 py-0.5 text-xs font-bold bg-accent/20 text-foreground">
                      {stage}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{eta}</td>
                  <td className="px-3 py-3 text-right font-mono text-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
