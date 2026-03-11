"use client";

import { useEffect, useState } from "react";
import type { LabTestDefinition } from "../../domain/types";
import { deleteItem, getAll, putItem } from "../../lib/indexedDb";

export default function TestsPage() {
  const [tests, setTests] = useState<LabTestDefinition[]>([]);
  const [form, setForm] = useState<Partial<LabTestDefinition>>({
    code: "",
    name: "",
    price: 0,
  });

  useEffect(() => {
    void loadTests();
  }, []);

  async function loadTests() {
    const all = await getAll("testDefinitions");
    setTests(all);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.code || !form.name) return;
    const id = crypto.randomUUID();
    const test: LabTestDefinition = {
      id,
      code: form.code!,
      name: form.name!,
      description: form.description,
      price: Number(form.price ?? 0),
      typicalTurnaroundHours: form.typicalTurnaroundHours
        ? Number(form.typicalTurnaroundHours)
        : undefined,
    };
    await putItem("testDefinitions", test);
    await loadTests();
    setForm({ code: "", name: "", description: "", price: 0 });
  }

  async function handleDelete(id: string) {
    await deleteItem("testDefinitions", id);
    await loadTests();
  }

  return (
    <div className="space-y-8">
      <header className="page-header">
        <h1 className="page-title">Test Catalogue</h1>
        <p className="page-subtitle">Define available lab tests and their pricing.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="card-container grid gap-6 md:grid-cols-4"
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Code</label>
          <input
            className="input-field"
            value={form.code ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Name</label>
          <input
            className="input-field"
            value={form.name ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Price</label>
          <input
            type="number"
            className="input-field"
            value={form.price ?? 0}
            onChange={(e) =>
              setForm((f) => ({ ...f, price: Number(e.target.value) }))
            }
          />
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full">
            Add test
          </button>
        </div>
      </form>

      <section className="card-container !p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Price</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((t) => (
              <tr key={t.id}>
                <td className="font-mono text-cyan-500">{t.code}</td>
                <td className="font-medium text-white">{t.name}</td>
                <td>
                  <span className="text-slate-300">$</span>
                  {t.price.toFixed(2)}
                </td>
                <td className="text-right">
                  <button
                    onClick={() => void handleDelete(t.id)}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tests.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  No tests defined. Add your first test definition above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

