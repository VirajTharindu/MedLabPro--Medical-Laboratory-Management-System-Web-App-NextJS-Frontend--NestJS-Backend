"use client";

import { useEffect, useState } from "react";
import type { ScheduleEntry, Role } from "../../domain/types";
import { deleteItem, getAll, putItem } from "../../lib/indexedDb";

export default function SchedulePage() {
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [form, setForm] = useState<Partial<ScheduleEntry>>({
    staffName: "",
    role: "technician",
    start: "",
    end: "",
    location: "",
  });

  useEffect(() => {
    void loadEntries();
  }, []);

  async function loadEntries() {
    const all = await getAll("schedule");
    setEntries(all);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.staffName || !form.start || !form.end) return;
    const id = crypto.randomUUID();
    const entry: ScheduleEntry = {
      id,
      staffName: form.staffName!,
      role: (form.role as Role) ?? "technician",
      start: form.start!,
      end: form.end!,
      location: form.location,
    };
    await putItem("schedule", entry);
    await loadEntries();
    setForm({
      staffName: "",
      role: "technician",
      start: "",
      end: "",
      location: "",
    });
  }

  async function handleDelete(id: string) {
    await deleteItem("schedule", id);
    await loadEntries();
  }

  return (
    <div className="space-y-8">
      <header className="page-header">
        <h1 className="page-title">Staff Schedule</h1>
        <p className="page-subtitle">Manage shifts and rotations for laboratory personnel.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="card-container grid gap-6 md:grid-cols-5"
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Staff Name</label>
          <input
            className="input-field"
            value={form.staffName ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, staffName: e.target.value }))
            }
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Role</label>
          <select
            className="input-field"
            value={form.role ?? "technician"}
            onChange={(e) =>
              setForm((f) => ({ ...f, role: e.target.value as Role }))
            }
          >
            <option value="admin">Admin</option>
            <option value="technician">Technician</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Start</label>
          <input
            type="datetime-local"
            className="input-field"
            value={form.start ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, start: e.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">End</label>
          <input
            type="datetime-local"
            className="input-field"
            value={form.end ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, end: e.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Location</label>
          <input
            className="input-field"
            value={form.location ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
          />
        </div>
        <div className="md:col-span-5 flex justify-end">
          <button type="submit" className="btn-primary px-8">
            Add entry
          </button>
        </div>
      </form>

      <section className="card-container !p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Start</th>
              <th>End</th>
              <th>Location</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td>
                  <span className="font-medium text-white">{e.staffName}</span>
                </td>
                <td className="capitalize">{e.role}</td>
                <td>{e.start}</td>
                <td>{e.end}</td>
                <td>{e.location}</td>
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
                  No active shifts. Use the form above to schedule staff.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

