"use client";

import React, { useState } from "react";
import { X, Handshake } from "lucide-react";
import { NegotiationRecord, AcquisitionLead, NegotiationStatus } from "@/types/lams";

interface AddNegotiationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNegotiation: (record: NegotiationRecord) => void;
  acquisitionLeads: AcquisitionLead[];
}

const STATUSES: NegotiationStatus[] = [
  "In Progress",
  "Agreed",
  "Revision Needed",
  "Declined",
];

export function AddNegotiationModal({
  isOpen,
  onClose,
  onAddNegotiation,
  acquisitionLeads,
}: AddNegotiationModalProps) {
  const [acquisitionLeadId, setAcquisitionLeadId] = useState(acquisitionLeads[0]?.id || "");
  const [offeredTotalPrice, setOfferedTotalPrice] = useState<number>(38500000);
  const [offeredPricePerDecimal, setOfferedPricePerDecimal] = useState<number>(1100000);
  const [counterOfferByOwner, setCounterOfferByOwner] = useState<number>(42000000);
  const [counterPricePerDecimal, setCounterPricePerDecimal] = useState<number>(1200000);
  const [negotiationStatus, setNegotiationStatus] = useState<NegotiationStatus>("In Progress");
  const [meetingDate, setMeetingDate] = useState("2026-09-18 11:30 AM");
  const [attendedBy, setAttendedBy] = useState("Sakib Al Hasan & Legal Valuer");
  const [remarks, setRemarks] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lead = acquisitionLeads.find((l) => l.id === acquisitionLeadId) || acquisitionLeads[0];

    const newRecord: NegotiationRecord = {
      id: `NEG-${Date.now()}`,
      acquisitionLeadId,
      leadTitle: lead ? lead.title : "Land Parcel",
      mouza: lead ? lead.mouza : "Mouza",
      dagNo: lead ? lead.dagNo : "Dag No",
      offeredTotalPrice: Number(offeredTotalPrice) || 0,
      offeredPricePerDecimal: Number(offeredPricePerDecimal) || 0,
      counterOfferByOwner: Number(counterOfferByOwner) || 0,
      counterPricePerDecimal: Number(counterPricePerDecimal) || 0,
      negotiationStatus,
      meetingDate: meetingDate || "2026-09-20 10:00 AM",
      attendedBy: attendedBy || "Acquisition Officer",
      remarks,
    };

    onAddNegotiation(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add Negotiation Record
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Log price offers, owner counter-offers, and meeting notes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form (matches screenshot 11negotiation-p.jpg) */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Acquisition Lead */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Acquisition Lead <span className="text-rose-500">*</span>
              </label>
              <select
                value={acquisitionLeadId}
                onChange={(e) => setAcquisitionLeadId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {acquisitionLeads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title} (Dag {l.dagNo})
                  </option>
                ))}
              </select>
            </div>

            {/* Offered Total Price */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Offered Total Price (৳ BDT) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={offeredTotalPrice}
                onChange={(e) => setOfferedTotalPrice(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            {/* Offered Price Per Decimal */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Offered Price Per Decimal (৳) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={offeredPricePerDecimal}
                onChange={(e) => setOfferedPricePerDecimal(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            {/* Counter Offer By Owner */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Counter Offer By Owner (৳ BDT) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={counterOfferByOwner}
                onChange={(e) => setCounterOfferByOwner(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            {/* Negotiation Status */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Negotiation Status <span className="text-rose-500">*</span>
              </label>
              <select
                value={negotiationStatus}
                onChange={(e) => setNegotiationStatus(e.target.value as NegotiationStatus)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Meeting Date */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Meeting Date & Time
              </label>
              <input
                type="text"
                placeholder="YYYY-MM-DD HH:MM AM/PM"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Attended By */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Attended Officers / Representatives
            </label>
            <input
              type="text"
              placeholder="e.g. Sakib Al Hasan, Valuation Specialist"
              value={attendedBy}
              onChange={(e) => setAttendedBy(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Negotiation Remarks & Terms
            </label>
            <textarea
              rows={3}
              placeholder="Payment schedule discussion, token advance terms, registration cost split..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md shadow-amber-600/20"
            >
              Submit Negotiation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
