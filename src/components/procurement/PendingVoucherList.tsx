"use client";

import { Eye, Search, FileCheck2 } from "lucide-react";
import { pendingVouchers } from "@/data/procurement/procurement.mock";

export default function PendingVoucherList() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-3">
        <div className="rounded-lg bg-cyan-100 p-2 text-cyan-600">
          <FileCheck2 size={20} />
        </div>

        <div>
          <h3 className="font-bold text-slate-800">
            Pending Voucher/Invoice
          </h3>

          <p className="text-xs text-slate-500">
            Awaiting approval
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search with Project/Code/Reference..."
          className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Voucher List */}
      <div className="max-h-[370px] space-y-2 overflow-y-auto pr-1">
        {pendingVouchers.map((voucher) => (
          <div
            key={voucher.id}
            className="rounded-xl border border-slate-200 p-3 transition hover:border-blue-200 hover:shadow-sm"
          >
            {/* Reference + Type */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Reference
              </span>

              <span className="rounded-md bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-600">
                Offer
              </span>
            </div>

            {/* Voucher Content */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-0.5 text-sm">
                <p className="font-semibold text-slate-800">
                  Project:{" "}
                  <span className="font-normal">
                    {voucher.project}
                  </span>
                </p>

                <p className="text-slate-600">
                  Contact: {voucher.contact}
                </p>

                <p className="text-slate-600">
                  Added By: {voucher.addedBy}
                </p>

                <p className="text-slate-500">
                  {voucher.date}
                </p>

                <p className="font-semibold text-blue-600">
                  {voucher.saleOffer}
                </p>
              </div>

              {/* View Button */}
              <button
                type="button"
                className="shrink-0 rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
              >
                <Eye size={17} />
              </button>
            </div>

            {/* Status */}
            <p className="mt-2 text-xs font-semibold text-red-500">
              {voucher.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}