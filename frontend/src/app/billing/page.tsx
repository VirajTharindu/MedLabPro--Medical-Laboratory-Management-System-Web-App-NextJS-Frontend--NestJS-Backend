"use client";

import { useEffect, useState } from "react";
import type { BillingEntry } from "../../domain/types";
import { deleteItem, getAll, putItem } from "../../lib/indexedDb";

export default function BillingPage() {
  const [entries, setEntries] = useState<BillingEntry[]>([]);
  const [form, setForm] = useState<Partial<BillingEntry>>({
    patientId: "",
    testOrderId: "",
    amount: 0,
    status: "pending",
  });

  useEffect(() => {
    void loadEntries();
  }, []);

  async function loadEntries() {
    const all = await getAll("billing");
    setEntries(all);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.patientId || !form.amount) return;
    const id = crypto.randomUUID();
    const entry: BillingEntry = {
      id,
      patientId: form.patientId!,
      testOrderId: form.testOrderId ?? "",
      amount: Number(form.amount ?? 0),
      status: (form.status as BillingEntry["status"]) ?? "pending",
      createdAt: new Date().toISOString(),
    };
    await putItem("billing", entry);
    await loadEntries();
    setForm({
      patientId: "",
      testOrderId: "",
      amount: 0,
      status: "pending",
    });
  }

  async function handleDelete(id: string) {
    await deleteItem("billing", id);
    await loadEntries();
  }

  return (
    <div className="space-y-8">
      <header className="page-header">
        <h1 className="page-title">Billing</h1>
        <p className="page-subtitle">Track patient invoices and payment statuses.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="card-container grid gap-6 md:grid-cols-4"
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Patient ID</label>
          <input
            className="input-field"
            value={form.patientId ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, patientId: e.target.value }))
            }
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Amount</label>
          <input
            type="number"
            className="input-field"
            value={form.amount ?? 0}
            onChange={(e) =>
              setForm((f) => ({ ...f, amount: Number(e.target.value) }))
            }
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Status</label>
          <select
            className="input-field"
            value={form.status ?? "pending"}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                status: e.target.value as BillingEntry["status"],
              }))
            }
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full">
            Add billing entry
          </button>
        </div>
      </form>

      <section className="card-container !p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Order Ref</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td className="font-medium text-white">{e.patientId}</td>
                <td className="font-mono text-xs">{e.testOrderId || "N/A"}</td>
                <td>
                  <span className="text-slate-500">$</span>
                  {e.amount.toFixed(2)}
                </td>
                <td>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    e.status === 'paid' ? 'bg-green-500/10 text-green-400' : 
                    e.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {e.status}
                  </span>
                </td>
                <td className="text-xs text-slate-400">
                  {new Date(e.createdAt).toLocaleDateString()}
                </td>
                <td className="text-right">
                  <button
                    onClick={() => void handleDelete(e.id)}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  No billing records. Invoices will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

