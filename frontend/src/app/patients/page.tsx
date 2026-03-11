"use client";

import { useEffect, useState } from "react";
import type { Patient } from "../../domain/types";
import { deleteItem, getAll, putItem } from "../../lib/indexedDb";
import { getSocket } from "../../lib/socket";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState<Partial<Patient>>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "other",
  });

  useEffect(() => {
    void loadPatients();

    const socket = getSocket();
    socket.on("patients:changed", () => {
      void loadPatients();
    });

    return () => {
      socket.off("patients:changed");
    };
  }, []);

  async function loadPatients() {
    const all = await getAll("patients");
    setPatients(all);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.dateOfBirth) return;
    const id = crypto.randomUUID();
    const patient: Patient = {
      id,
      firstName: form.firstName!,
      lastName: form.lastName!,
      dateOfBirth: form.dateOfBirth!,
      gender: (form.gender as Patient["gender"]) ?? "other",
      phone: form.phone,
      createdAt: new Date().toISOString(),
    };
    await putItem("patients", patient);
    getSocket().emit("patients:changed", { reason: "created", patientId: id });
    await loadPatients();
    setForm({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "other",
      phone: "",
    });
  }

  async function handleDelete(id: string) {
    await deleteItem("patients", id);
    getSocket().emit("patients:changed", { reason: "deleted", patientId: id });
    await loadPatients();
  }

  return (
    <div className="space-y-8">
      <header className="page-header">
        <h1 className="page-title">Patients</h1>
        <p className="page-subtitle">Register and manage patient records.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="card-container grid gap-6 md:grid-cols-3"
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">First name</label>
          <input
            className="input-field"
            value={form.firstName ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Last name</label>
          <input
            className="input-field"
            value={form.lastName ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Date of birth</label>
          <input
            type="date"
            className="input-field"
            value={form.dateOfBirth ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, dateOfBirth: e.target.value }))
            }
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Gender</label>
          <select
            className="input-field"
            value={form.gender ?? "other"}
            onChange={(e) =>
              setForm((f) => ({ ...f, gender: e.target.value as Patient["gender"] }))
            }
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-300">Phone</label>
          <input
            className="input-field"
            value={form.phone ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full">
            Add patient
          </button>
        </div>
      </form>

      <section className="card-container !p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Phone</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>
                  <span className="font-medium text-white">
                    {p.firstName} {p.lastName}
                  </span>
                </td>
                <td>{p.dateOfBirth}</td>
                <td className="capitalize">{p.gender}</td>
                <td>{p.phone}</td>
                <td className="text-right">
                  <button
                    onClick={() => void handleDelete(p.id)}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  No patients yet. Register a new patient above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

