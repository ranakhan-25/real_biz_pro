/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FileSpreadsheet,
  RefreshCw,
  Building2,
  MapPin,
  CheckCircle,
  FileCheck2,
  Loader2,
  X,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import { crApi } from "@/lib/crApi";
import { showAlert } from "@/lib/swal";

export default function SaleAgreementsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [agreements, setAgreements] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  // Modal States
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState<any | null>(null);

  const [isPlotModalOpen, setIsPlotModalOpen] = useState(false);
  const [selectedAgreementForPlot, setSelectedAgreementForPlot] = useState<any | null>(null);

  // Agreement Form Fields
  const [agreementNumber, setAgreementNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [propertyType, setPropertyType] = useState("plot");
  const [unitIdentifier, setUnitIdentifier] = useState("");
  const [totalPrice, setTotalPrice] = useState<number | string>("");
  const [downPayment, setDownPayment] = useState<number | string>("");
  const [bookingMoney, setBookingMoney] = useState<number | string>("");
  const [agreementDate, setAgreementDate] = useState(new Date().toISOString().slice(0, 10));
  const [handoverDate, setHandoverDate] = useState("");
  const [numberOfInstallments, setNumberOfInstallments] = useState<number | string>(24);
  const [terms, setTerms] = useState("");

  // Plot Form Fields
  const [plotNo, setPlotNo] = useState("");
  const [roadNo, setRoadNo] = useState("");
  const [sectorBlock, setSectorBlock] = useState("");
  const [plotSizeKatha, setPlotSizeKatha] = useState<number | string>(5.0);
  const [facing, setFacing] = useState("South-Facing");
  const [allotmentStatus, setAllotmentStatus] = useState("confirmed");
  const [allotmentLetterNo, setAllotmentLetterNo] = useState("");
  const [allotmentDate, setAllotmentDate] = useState(new Date().toISOString().slice(0, 10));

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await crApi.getAgreements();
      setAgreements(data || []);
    } catch (err) {
      console.error("Failed to load sale agreements:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredAgreements = useMemo(() => {
    if (!search.trim()) return agreements;
    const q = search.toLowerCase();
    return agreements.filter(
      (a) =>
        a.agreement_number?.toLowerCase().includes(q) ||
        a.customer_name?.toLowerCase().includes(q) ||
        a.customer_phone?.toLowerCase().includes(q) ||
        a.unit_identifier?.toLowerCase().includes(q) ||
        a.property_type?.toLowerCase().includes(q)
    );
  }, [search, agreements]);

  const handleOpenCreateAgreement = () => {
    setEditingAgreement(null);
    setAgreementNumber(`AGR-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`);
    setCustomerId(`CUST-${Date.now().toString().slice(-3)}`);
    setCustomerName("");
    setCustomerPhone("");
    setPropertyType("plot");
    setUnitIdentifier("");
    setTotalPrice("");
    setDownPayment("");
    setBookingMoney("");
    setAgreementDate(new Date().toISOString().slice(0, 10));
    setHandoverDate("");
    setNumberOfInstallments(24);
    setTerms("Standard sale agreement terms with automatic installment amortization schedule.");
    setIsAgreementModalOpen(true);
  };

  const handleOpenEditAgreement = (item: any) => {
    setEditingAgreement(item);
    setAgreementNumber(item.agreement_number || "");
    setCustomerId(item.customer_id || "");
    setCustomerName(item.customer_name || "");
    setCustomerPhone(item.customer_phone || "");
    setPropertyType(item.property_type || "plot");
    setUnitIdentifier(item.unit_identifier || "");
    setTotalPrice(item.total_price || "");
    setDownPayment(item.down_payment || "");
    setBookingMoney(item.booking_money || "");
    setAgreementDate(item.agreement_date ? String(item.agreement_date).slice(0, 10) : "");
    setHandoverDate(item.handover_date ? String(item.handover_date).slice(0, 10) : "");
    setNumberOfInstallments(item.number_of_installments || 24);
    setTerms(item.terms_and_conditions || "");
    setIsAgreementModalOpen(true);
  };

  const handleSaveAgreement = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreementNumber.trim() || !customerName.trim() || !unitIdentifier.trim()) {
      showAlert.warning("Required Fields", "Please provide Agreement Number, Customer Name, and Unit Identifier.");
      return;
    }

    const priceNum = Number(totalPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      showAlert.warning("Invalid Price", "Please provide a valid total agreed sale price.");
      return;
    }

    setSubmitting(true);
    try {
      const payload: any = {
        agreement_number: agreementNumber.trim(),
        customer_id: customerId.trim() || `CUST-${Date.now().toString().slice(-3)}`,
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim() || undefined,
        property_type: propertyType,
        unit_identifier: unitIdentifier.trim(),
        total_price: priceNum,
        down_payment: downPayment !== "" ? Number(downPayment) : undefined,
        booking_money: bookingMoney !== "" ? Number(bookingMoney) : undefined,
        agreement_date: agreementDate,
        handover_date: handoverDate || undefined,
        number_of_installments: numberOfInstallments !== "" ? Number(numberOfInstallments) : 24,
        terms_and_conditions: terms.trim() || undefined,
      };

      if (editingAgreement) {
        await crApi.updateAgreement(editingAgreement.uuid, payload);
      } else {
        await crApi.createAgreement(payload);
      }

      setIsAgreementModalOpen(false);
      await loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAgreement = async (item: any) => {
    const confirmed = await showAlert.confirm(
      "Delete Sale Agreement",
      `Are you sure you want to delete agreement "${item.agreement_number}" for ${item.customer_name}? This will remove its associated amortized plans.`
    );
    if (!confirmed) return;

    try {
      await crApi.deleteAgreement(item.uuid);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenPlotModal = (agreement: any) => {
    setSelectedAgreementForPlot(agreement);
    const existingPlot = agreement.plot_distributions?.[0];
    if (existingPlot) {
      setPlotNo(existingPlot.plot_no || "");
      setRoadNo(existingPlot.road_no || "");
      setSectorBlock(existingPlot.sector_block || "");
      setPlotSizeKatha(existingPlot.plot_size_katha || 5.0);
      setFacing(existingPlot.facing || "South-Facing");
      setAllotmentStatus(existingPlot.allotment_status || "confirmed");
      setAllotmentLetterNo(existingPlot.allotment_letter_no || "");
      setAllotmentDate(existingPlot.allotment_date ? String(existingPlot.allotment_date).slice(0, 10) : "");
    } else {
      setPlotNo(agreement.unit_identifier || "Plot-");
      setRoadNo("Road-04");
      setSectorBlock("Block-B");
      setPlotSizeKatha(5.0);
      setFacing("South-Facing");
      setAllotmentStatus("confirmed");
      setAllotmentLetterNo(`AL-${Date.now().toString().slice(-5)}`);
      setAllotmentDate(new Date().toISOString().slice(0, 10));
    }
    setIsPlotModalOpen(true);
  };

  const handleSavePlotDistribution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgreementForPlot) return;

    if (!plotNo.trim()) {
      showAlert.warning("Plot Number Required", "Please specify the Plot Number.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        plot_no: plotNo.trim(),
        road_no: roadNo.trim() || undefined,
        sector_block: sectorBlock.trim() || undefined,
        plot_size_katha: plotSizeKatha !== "" ? Number(plotSizeKatha) : undefined,
        facing: facing.trim() || undefined,
        allotment_status: allotmentStatus,
        allotment_letter_no: allotmentLetterNo.trim() || undefined,
        allotment_date: allotmentDate || undefined,
      };

      await crApi.addPlotDistribution(selectedAgreementForPlot.uuid, payload);
      setIsPlotModalOpen(false);
      await loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const exportCSV = () => {
    if (!filteredAgreements.length) return;
    const headers = [
      "Agreement No",
      "Customer",
      "Phone",
      "Type",
      "Unit Identifier",
      "Total Price (BDT)",
      "Down Payment",
      "Date",
      "Plot Allocation",
    ];
    const rows = filteredAgreements.map((a) => [
      a.agreement_number,
      `"${a.customer_name?.replace(/"/g, '""')}"`,
      a.customer_phone || "",
      a.property_type,
      `"${a.unit_identifier?.replace(/"/g, '""')}"`,
      a.total_price,
      a.down_payment || 0,
      a.agreement_date?.slice(0, 10) || "",
      a.plot_distributions?.length ? a.plot_distributions[0].plot_no : "Unallocated",
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cr_sale_agreements_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="w-7 h-7 text-primary" />
            Sale Agreements & Plot Allocation
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage customer sale contracts, automatic amortization installment schedules, and physical plot allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted text-foreground transition"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted text-foreground transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Export CSV
          </button>
          <button
            onClick={handleOpenCreateAgreement}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            New Agreement
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Agreements</span>
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">{agreements.length}</div>
          <p className="text-xs text-muted-foreground mt-1">Executed sale contracts</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Contract Value</span>
            <span className="text-xs font-bold text-emerald-600">BDT</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {agreements
              .reduce((sum, a) => sum + Number(a.total_price || 0), 0)
              .toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Gross portfolio sales agreed</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Plots Allocated</span>
            <MapPin className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold text-cyan-600">
            {agreements.filter((a) => a.plot_distributions && a.plot_distributions.length > 0).length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Agreements with attached plot allotment</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Installments</span>
            <Layers className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {agreements.reduce((sum, a) => sum + (a.installment_plans?.length || 0), 0)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Scheduled amortization entries</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground w-full sm:w-auto">
            <span>Show</span>
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border border-border rounded px-2 py-1 bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search agreement #, customer, unit..."
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Agreement No</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Property Unit</th>
                <th className="py-3 px-4 text-right">Agreed Value</th>
                <th className="py-3 px-4 text-center">Schedule</th>
                <th className="py-3 px-4 text-center">Plot Allocation</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
                    Loading sale agreements...
                  </td>
                </tr>
              ) : filteredAgreements.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    No sale agreements found. Click <strong>&quot;New Agreement&quot;</strong> to register one.
                  </td>
                </tr>
              ) : (
                filteredAgreements.slice(0, entries).map((item) => {
                  const hasPlot = item.plot_distributions && item.plot_distributions.length > 0;
                  const plot = hasPlot ? item.plot_distributions[0] : null;

                  return (
                    <tr key={item.uuid || item.id} className="hover:bg-muted/30 transition">
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-primary">{item.agreement_number}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {item.agreement_date ? String(item.agreement_date).slice(0, 10) : "—"}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-foreground">{item.customer_name}</div>
                        <div className="text-xs text-muted-foreground">{item.customer_phone || item.customer_id}</div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-foreground">{item.unit_identifier}</div>
                        <span className="inline-block mt-0.5 text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                          {item.property_type || "plot"}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="font-bold text-foreground">
                          {Number(item.total_price || 0).toLocaleString()} <span className="text-xs font-normal">BDT</span>
                        </div>
                        {item.down_payment && (
                          <div className="text-xs text-muted-foreground">
                            Down: {Number(item.down_payment).toLocaleString()}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 text-xs font-medium">
                          <Layers className="w-3.5 h-3.5" />
                          {item.installment_plans?.length || item.number_of_installments || 0} Installments
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        {hasPlot ? (
                          <button
                            onClick={() => handleOpenPlotModal(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-200 transition"
                            title="Click to view/update plot distribution"
                          >
                            <CheckCircle className="w-3 h-3" />
                            {plot.plot_no} ({plot.plot_size_katha || 5} Katha)
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenPlotModal(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border border-dashed border-primary/50 text-primary hover:bg-primary/10 transition"
                          >
                            <MapPin className="w-3 h-3" />
                            Allocate Plot
                          </button>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenPlotModal(item)}
                            className="p-1.5 rounded-md hover:bg-muted text-cyan-600 transition"
                            title="Plot Allocation"
                          >
                            <MapPin className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEditAgreement(item)}
                            className="p-1.5 rounded-md hover:bg-muted text-amber-500 transition"
                            title="Edit Agreement"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAgreement(item)}
                            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-rose-600 transition"
                            title="Delete Agreement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sale Agreement Create/Edit Modal */}
      {isAgreementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-card text-card-foreground border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
              <h3 className="text-lg font-bold">
                {editingAgreement ? "Edit Sale Agreement" : "Register New Sale Agreement"}
              </h3>
              <button
                onClick={() => setIsAgreementModalOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveAgreement} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Agreement Number *
                  </label>
                  <input
                    type="text"
                    value={agreementNumber}
                    onChange={(e) => setAgreementNumber(e.target.value)}
                    required
                    placeholder="e.g. AGR-2026-0042"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground font-mono focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Customer ID
                  </label>
                  <input
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="e.g. CUST-0089"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Customer Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="e.g. Dr. Shahabuddin Ahmed"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +8801711223344"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Property Type *
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="plot">Plot</option>
                    <option value="flat">Apartment / Flat</option>
                    <option value="commercial">Commercial Space</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Unit Identifier *
                  </label>
                  <input
                    type="text"
                    value={unitIdentifier}
                    onChange={(e) => setUnitIdentifier(e.target.value)}
                    required
                    placeholder="e.g. Plot # 12, Block C, Road 4"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Total Agreed Price (BDT) *
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    required
                    placeholder="e.g. 4500000"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Down Payment (BDT)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    placeholder="e.g. 1000000"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Booking Money (BDT)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={bookingMoney}
                    onChange={(e) => setBookingMoney(e.target.value)}
                    placeholder="e.g. 500000"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Agreement Date *
                  </label>
                  <input
                    type="date"
                    value={agreementDate}
                    onChange={(e) => setAgreementDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Handover Date
                  </label>
                  <input
                    type="date"
                    value={handoverDate}
                    onChange={(e) => setHandoverDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Tenure (Installments)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={numberOfInstallments}
                    onChange={(e) => setNumberOfInstallments(e.target.value)}
                    placeholder="24"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Terms & Conditions
                </label>
                <textarea
                  rows={3}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder="Terms, penalty clauses, handover prerequisites..."
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAgreementModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted text-foreground transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingAgreement ? "Save Changes" : "Create Agreement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Plot Distribution Modal */}
      {isPlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-card text-card-foreground border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                  Plot Allocation & Distribution
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Agreement: <strong>{selectedAgreementForPlot?.agreement_number}</strong> ({selectedAgreementForPlot?.customer_name})
                </p>
              </div>
              <button
                onClick={() => setIsPlotModalOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlotDistribution} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Plot No *
                  </label>
                  <input
                    type="text"
                    value={plotNo}
                    onChange={(e) => setPlotNo(e.target.value)}
                    required
                    placeholder="e.g. Plot-12"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground font-mono focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Sector / Block
                  </label>
                  <input
                    type="text"
                    value={sectorBlock}
                    onChange={(e) => setSectorBlock(e.target.value)}
                    placeholder="e.g. Block C"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Road No
                  </label>
                  <input
                    type="text"
                    value={roadNo}
                    onChange={(e) => setRoadNo(e.target.value)}
                    placeholder="e.g. Road 5"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Plot Size (Katha)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={plotSizeKatha}
                    onChange={(e) => setPlotSizeKatha(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Facing
                  </label>
                  <input
                    type="text"
                    value={facing}
                    onChange={(e) => setFacing(e.target.value)}
                    placeholder="e.g. South-East Corner"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Allotment Status
                  </label>
                  <select
                    value={allotmentStatus}
                    onChange={(e) => setAllotmentStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="provisional">Provisional</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="registered">Registered</option>
                    <option value="handed_over">Handed Over</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Allotment Letter No
                  </label>
                  <input
                    type="text"
                    value={allotmentLetterNo}
                    onChange={(e) => setAllotmentLetterNo(e.target.value)}
                    placeholder="e.g. AL-2026-99"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Allotment Date
                  </label>
                  <input
                    type="date"
                    value={allotmentDate}
                    onChange={(e) => setAllotmentDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsPlotModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted text-foreground transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm transition disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Plot Allotment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
