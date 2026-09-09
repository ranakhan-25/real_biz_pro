export default function CrDashboard() {
  const cards = [
    { label: "Receipts", value: "৳ 18.4M", tone: "bg-emerald-500/10 text-emerald-600" },
    { label: "Overdue", value: "14", tone: "bg-rose-500/10 text-rose-600" },
    { label: "Collections", value: "82%", tone: "bg-blue-500/10 text-blue-600" },
    { label: "Aging", value: "36 days", tone: "bg-violet-500/10 text-violet-600" },
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
              Updated today
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-4 text-sm font-semibold text-foreground">Realisation overview</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-semibold">Customer</th>
                <th className="px-3 py-2 font-semibold">Project</th>
                <th className="px-3 py-2 font-semibold">Due</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Mr. Raju Raz", "Sheba Eyecon Tower", "03-Sept-2026", "Pending", "৳ 3.2M"],
                ["Mr. Arif Hossain", "Lake Garden", "05-Sept-2026", "Follow-up", "৳ 1.7M"],
                ["Mrs. Nabila", "Meridian Yards", "07-Sept-2026", "On track", "৳ 2.1M"],
              ].map(([customer, project, due, status, amount]) => (
                <tr key={customer} className="hover:bg-foreground/3">
                  <td className="px-3 py-3 font-medium text-foreground">{customer}</td>
                  <td className="px-3 py-3 text-muted-foreground">{project}</td>
                  <td className="px-3 py-3 text-muted-foreground">{due}</td>
                  <td className="px-3 py-3">
                    <span className="rounded px-2 py-0.5 text-xs font-bold bg-accent/20 text-foreground">
                      {status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-foreground">{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
