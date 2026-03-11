"use client";

import { useEffect, useState } from "react";
import type { InventoryItem } from "../../domain/types";
import { deleteItem, getAll, putItem } from "../../lib/indexedDb";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [form, setForm] = useState<Partial<InventoryItem>>({
    name: "",
    category: "",
    quantity: 0,
    unit: "units",
    reorderThreshold: 10,
  });

  useEffect(() => {
    void loadItems();
  }, []);

  async function loadItems() {
    const all = await getAll("inventory");
    setItems(all);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.category) return;
    const id = crypto.randomUUID();
    const item: InventoryItem = {
      id,
      name: form.name!,
      category: form.category!,
      quantity: Number(form.quantity ?? 0),
      unit: form.unit ?? "units",
      reorderThreshold: Number(form.reorderThreshold ?? 0),
    };
    await putItem("inventory", item);
    await loadItems();
    setForm({
      name: "",
      category: "",
      quantity: 0,
      unit: "units",
      reorderThreshold: 10,
    });
  }

  async function handleDelete(id: string) {
    await deleteItem("inventory", id);
    await loadItems();
  }

  return (
    <div className="space-y-8">
      <header className="page-header">
        <h1 className="page-title">Inventory</h1>
        <p className="page-subtitle">Manage lab supplies and reorder thresholds.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="card-container grid gap-6 md:grid-cols-5"
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Name</label>
          <input
            className="input-field"
            value={form.name ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Category</label>
          <input
            className="input-field"
            value={form.category ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Quantity</label>
          <input
            type="number"
            className="input-field"
            value={form.quantity ?? 0}
            onChange={(e) =>
              setForm((f) => ({ ...f, quantity: Number(e.target.value) }))
            }
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Unit</label>
          <input
            className="input-field"
            value={form.unit ?? "units"}
            onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Reorder</label>
          <input
            type="number"
            className="input-field"
            value={form.reorderThreshold ?? 0}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                reorderThreshold: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="md:col-span-5 flex justify-end">
          <button type="submit" className="btn-primary px-8">
            Add item
          </button>
        </div>
      </form>

      <section className="card-container !p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Reorder</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>
                  <span className="font-medium text-white">{i.name}</span>
                </td>
                <td>{i.category}</td>
                <td className={i.quantity <= i.reorderThreshold ? "text-amber-400 font-semibold" : ""}>
                  {i.quantity}
                </td>
                <td>{i.unit}</td>
                <td>{i.reorderThreshold}</td>
                <td className="text-right">
                  <button
                    onClick={() => void handleDelete(i.id)}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  No inventory items. Use the form above to stock up.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

