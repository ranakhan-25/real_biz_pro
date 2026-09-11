"use client";

import React, { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

// Purchase item type definition
interface PurchaseItem {
  id: number;
  itemCode: string;
  itemName: string;
  details: string;
  unit: string;
  quantity: number;
  rate: number;
  budgetQty: number;
  purchaseQty: number;
  stockQty: number;
}

// Payment transaction type definition
interface PaymentTransaction {
  id: number;
  transactionId: string;
  paymentMethod: string;
  chequeReceiptNo: string;
  amount: number;
  date: string;
}

export default function PurchaseForm() {
  // Form states
  const [isMaterialUsages, setIsMaterialUsages] = useState(false);
  const [date, setDate] = useState("10/09/2026");
  const [supplier, setSupplier] = useState("");
  const [code, setCode] = useState("PUR7987201");
  const [projectType, setProjectType] = useState("");
  const [project, setProject] = useState("");
  const [titleOfWork, setTitleOfWork] = useState("");
  const [itTask, setItTask] = useState("");
  const [site, setSite] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  // Items table state
  const [items, setItems] = useState<PurchaseItem[]>([]);

  // Financial summary states
  const [discount, setDiscount] = useState<number>(0);
  const [deliveryLabour, setDeliveryLabour] = useState<number>(0);
  const [paid, setPaid] = useState<number>(0);
  const [noteComments, setNoteComments] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  // Payment states
  const [isCheque, setIsCheque] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentDate, setPaymentDate] = useState("10/09/2026");
  const [chequeReceiptNo, setChequeReceiptNo] = useState("");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);

  // Calculations
  const subtotal = items.reduce((acc, curr) => acc + curr.quantity * curr.rate, 0);
  const grandTotal = subtotal - discount + deliveryLabour;
  const due = grandTotal - paid;

  // Add Item to Table handler (triggered by '+' button)
  const handleAddItem = () => {
    if (!selectedItem) {
      alert("Please select an item first!");
      return;
    }
    const newItem: PurchaseItem = {
      id: Date.now(),
      itemCode: `ITM${Math.floor(100 + Math.random() * 900)}`,
      itemName: selectedItem,
      details: "Sample Details",
      unit: "Pcs",
      quantity: 1,
      rate: 100,
      budgetQty: 10,
      purchaseQty: 1,
      stockQty: 5,
    };
    setItems([...items, newItem]);
    setSelectedItem("");
  };

  // Delete Item handler
  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Add Payment handler
  const handleAddPayment = () => {
    if (paymentAmount <= 0) {
      alert("Please enter a valid payment amount!");
      return;
    }
    const newPayment: PaymentTransaction = {
      id: Date.now(),
      transactionId: `TRX${Math.floor(100000 + Math.random() * 900000)}`,
      paymentMethod: isCheque ? "Cheque" : paymentMethod,
      chequeReceiptNo: isCheque ? chequeReceiptNo : "-",
      amount: paymentAmount,
      date: paymentDate,
    };
    setPayments([...payments, newPayment]);
    setPaid(paid + paymentAmount);
    setPaymentAmount(0);
    setChequeReceiptNo("");
  };

  // Delete Payment handler
  const handleDeletePayment = (id: number, amount: number) => {
    setPayments(payments.filter((p) => p.id !== id));
    setPaid(Math.max(0, paid - amount));
  };

  // Form Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const purchaseData = {
      isMaterialUsages,
      date,
      supplier,
      code,
      projectType,
      project,
      titleOfWork,
      itTask,
      site,
      category,
      items,
      subtotal,
      discount,
      deliveryLabour,
      grandTotal,
      paid,
      due,
      noteComments,
      payments,
    };
    console.log("Submitted Purchase Data:", purchaseData);
    alert("Purchase saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Main Inputs Section */}
      <div className="bg-card border border-border rounded p-4 shadow-sm space-y-4">
        {/* If Material Usages Checkbox */}
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <input
            type="checkbox"
            id="materialUsages"
            checked={isMaterialUsages}
            onChange={(e) => setIsMaterialUsages(e.target.checked)}
            className="rounded border-input text-[var(--lime)] focus:ring-[var(--lime)]"
          />
          <label
            htmlFor="materialUsages"
            className="text-xs font-medium text-foreground cursor-pointer"
          >
            If Material Usages
          </label>
        </div>

        {/* Row 1: Date, Supplier, Code, Project Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Supplier <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1">
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
              >
                <option value="">Select an option</option>
                <option value="Supplier A">Supplier A</option>
                <option value="Supplier B">Supplier B</option>
              </select>
              <button
                type="button"
                onClick={() => alert("Add Supplier modal")}
                className="bg-[var(--lime)] text-white px-2.5 py-1.5 rounded text-xs"
              >
                <FiPlus />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Project Type
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Project Type</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
            </select>
          </div>
        </div>

        {/* Row 2: Project, Title/Name of Work, It Task, Site */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Project <span className="text-red-500">*</span>
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Project</option>
              <option value="Project 1">Project 1</option>
              <option value="Project 2">Project 2</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Title/Name of Work
            </label>
            <select
              value={titleOfWork}
              onChange={(e) => setTitleOfWork(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Title/Name of Work</option>
              <option value="Work 1">Work 1</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">It Task</label>
            <select
              value={itTask}
              onChange={(e) => setItTask(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Task</option>
              <option value="Task 1">Task 1</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Site</label>
            <select
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Site</option>
              <option value="Site 1">Site 1</option>
            </select>
          </div>
        </div>

        {/* Row 3: Category, Select Item */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Category</option>
              <option value="Rod">Rod</option>
              <option value="Cement">Cement</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Select Item
            </label>
            <div className="flex gap-1">
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
              >
                <option value="">Select Item</option>
                <option value="Rod 16mm">Rod 16mm</option>
                <option value="Seven Rings Cement">Seven Rings Cement</option>
                <option value="Brick 1st Class">Brick 1st Class</option>
              </select>
              <button
                type="button"
                onClick={handleAddItem}
                className="bg-[var(--lime)] text-white px-2.5 py-1.5 rounded text-xs"
              >
                <FiPlus />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table Section */}
      <div className="bg-card border border-border rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[var(--sidebar-foreground)] text-white font-medium select-none">
                <th className="py-2.5 px-3">ITEM CODE</th>
                <th className="py-2.5 px-3">ITEM NAME</th>
                <th className="py-2.5 px-3">DETAILS</th>
                <th className="py-2.5 px-3">UNIT</th>
                <th className="py-2.5 px-3">QUANTITY</th>
                <th className="py-2.5 px-3">RATE</th>
                <th className="py-2.5 px-3">BUDGET QTY</th>
                <th className="py-2.5 px-3">PURCHASE QTY</th>
                <th className="py-2.5 px-3">STOCK QTY</th>
                <th className="py-2.5 px-3">AMOUNT</th>
                <th className="py-2.5 px-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-2 px-3 font-mono">{item.itemCode}</td>
                    <td className="py-2 px-3 font-medium">{item.itemName}</td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.details}
                        onChange={(e) => {
                          const val = e.target.value;
                          setItems(
                            items.map((i) => (i.id === item.id ? { ...i, details: val } : i)),
                          );
                        }}
                        className="bg-background border border-input rounded px-2 py-1 w-28 text-xs"
                      />
                    </td>
                    <td className="py-2 px-3">{item.unit}</td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setItems(
                            items.map((i) => (i.id === item.id ? { ...i, quantity: val } : i)),
                          );
                        }}
                        className="bg-background border border-input rounded px-2 py-1 w-16 text-xs"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setItems(items.map((i) => (i.id === item.id ? { ...i, rate: val } : i)));
                        }}
                        className="bg-background border border-input rounded px-2 py-1 w-16 text-xs"
                      />
                    </td>
                    <td className="py-2 px-3">{item.budgetQty}</td>
                    <td className="py-2 px-3">{item.purchaseQty}</td>
                    <td className="py-2 px-3">{item.stockQty}</td>
                    <td className="py-2 px-3 font-medium">{item.quantity * item.rate}</td>
                    <td className="py-2 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center py-6 text-muted-foreground">
                    No items added yet. Select an item above and click '+' to add.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subtotal / Discount / Grand Total Bar */}
      <div className="bg-card border border-border rounded p-4 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div>
            <label className="block font-medium text-muted-foreground mb-1">SUBTOTAL</label>
            <input
              type="text"
              readOnly
              value={subtotal}
              className="w-full bg-muted border border-input rounded px-2 py-1.5 font-medium"
            />
          </div>
          <div>
            <label className="block font-medium text-muted-foreground mb-1">DISCOUNT</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              placeholder="discount"
              className="w-full bg-background border border-input rounded px-2 py-1.5"
            />
          </div>
          <div>
            <label className="block font-medium text-muted-foreground mb-1">DELIVERY/LABOUR</label>
            <input
              type="number"
              value={deliveryLabour}
              onChange={(e) => setDeliveryLabour(Number(e.target.value))}
              placeholder="delivery_char"
              className="w-full bg-background border border-input rounded px-2 py-1.5"
            />
          </div>
          <div>
            <label className="block font-medium text-muted-foreground mb-1">GRAND TOTAL</label>
            <input
              type="text"
              readOnly
              value={grandTotal}
              className="w-full bg-muted border border-input rounded px-2 py-1.5 font-medium"
            />
          </div>
          <div>
            <label className="block font-medium text-muted-foreground mb-1">PAID</label>
            <input
              type="text"
              readOnly
              value={paid}
              className="w-full bg-muted border border-input rounded px-2 py-1.5 font-medium"
            />
          </div>
          <div>
            <label className="block font-medium text-muted-foreground mb-1">DUE</label>
            <input
              type="text"
              readOnly
              value={due}
              className="w-full bg-muted border border-input rounded px-2 py-1.5 font-medium"
            />
          </div>
          <div>
            <label className="block font-medium text-muted-foreground mb-1">NOTE/COMMENTS</label>
            <input
              type="text"
              value={noteComments}
              onChange={(e) => setNoteComments(e.target.value)}
              className="w-full bg-background border border-input rounded px-2 py-1.5"
            />
          </div>
        </div>

        {/* Attachment Field */}
        <div className="mt-4 pt-3 border-t border-border flex items-center gap-4 text-xs">
          <span className="font-medium text-muted-foreground">ATTACHMENT</span>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files?.[0] || null)}
            className="text-xs text-muted-foreground file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-muted file:text-foreground hover:file:bg-muted/80"
          />
        </div>
      </div>

      {/* Bottom Layout: Transaction Table & Payment Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Payment Transactions Table */}
        <div className="bg-card border border-border rounded shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[var(--sidebar-foreground)] text-white font-medium select-none">
                  <th className="py-2.5 px-3">TRANSACTION ID</th>
                  <th className="py-2.5 px-3">PAYMENT METHOD</th>
                  <th className="py-2.5 px-3">CHEQUE RECEIPT NO</th>
                  <th className="py-2.5 px-3">AMOUNT</th>
                  <th className="py-2.5 px-3">DATE</th>
                  <th className="py-2.5 px-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payments.length > 0 ? (
                  payments.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                      <td className="py-2 px-3 font-mono">{p.transactionId}</td>
                      <td className="py-2 px-3">{p.paymentMethod}</td>
                      <td className="py-2 px-3">{p.chequeReceiptNo}</td>
                      <td className="py-2 px-3 font-medium">{p.amount}</td>
                      <td className="py-2 px-3">{p.date}</td>
                      <td className="py-2 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleDeletePayment(p.id, p.amount)}
                          className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-muted-foreground">
                      No payments added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Payment Input Panel & Submit */}
        <div className="bg-card border border-border rounded p-4 shadow-sm space-y-4">
          {/* If Cheque Checkbox */}
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <input
              type="checkbox"
              id="ifCheque"
              checked={isCheque}
              onChange={(e) => setIsCheque(e.target.checked)}
              className="rounded border-input text-[var(--lime)] focus:ring-[var(--lime)]"
            />
            <label
              htmlFor="ifCheque"
              className="text-xs font-medium text-foreground cursor-pointer"
            >
              If cheque
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={isCheque ? "Cheque" : paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={isCheque}
                className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Payment Date
              </label>
              <input
                type="text"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Cheque Receipt No
              </label>
              <input
                type="text"
                value={chequeReceiptNo}
                onChange={(e) => setChequeReceiptNo(e.target.value)}
                placeholder="Cheque Receipt No"
                disabled={!isCheque}
                className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                placeholder="0"
                className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleAddPayment}
              className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded text-xs font-medium transition-all shadow-sm"
            >
              Add Payment
            </button>

            <button
              type="submit"
              className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-2 rounded text-sm font-medium transition-all shadow-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
