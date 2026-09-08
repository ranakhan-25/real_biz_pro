import { overflowMaterials } from "@/data/procurement/procurement.mock";

const statusClasses = {
  Pending: "bg-amber-100 text-amber-700",
  Issued: "bg-emerald-100 text-emerald-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function OverflowMaterialTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Overflow Material
          </h3>

          <p className="text-sm text-slate-500">
            Material budget and issue overview
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">SL</th>
              <th className="px-5 py-4">Description</th>
              <th className="px-5 py-4">Budget Qty</th>
              <th className="px-5 py-4">Budget Amount</th>
              <th className="px-5 py-4">Issue Qty</th>
              <th className="px-5 py-4">Issue Amount</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {overflowMaterials.map((item, index) => (
              <tr key={item.id} className="transition hover:bg-slate-50">
                <td className="px-5 py-4">{index + 1}</td>

                <td className="px-5 py-4 font-semibold text-slate-700">
                  {item.description}
                </td>

                <td className="px-5 py-4">{item.budgetQty.toLocaleString()}</td>

                <td className="px-5 py-4">
                  ৳ {item.budgetAmount.toLocaleString()}
                </td>

                <td className="px-5 py-4">{item.issueQty.toLocaleString()}</td>

                <td className="px-5 py-4">
                  ৳ {item.issueAmount.toLocaleString()}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-5 py-3 text-sm text-slate-500">
        Showing {overflowMaterials.length} of {overflowMaterials.length} entries
      </div>
    </div>
  );
}
