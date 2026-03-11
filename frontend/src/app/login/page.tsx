"use client";

import { useState } from "react";

const BACKEND_URL = "http://localhost:3001";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@lab.local");
  const [password, setPassword] = useState("admin123");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const user = await res.json();
      setMessage(`Logged in as ${user.name} (${user.role})`);
    } else {
      setMessage("Login failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <header className="mb-10 text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
        <p className="text-slate-400">Please sign in to access your account</p>
      </header>
      
      <form
        onSubmit={handleSubmit}
        className="card-container w-full max-w-md space-y-6"
      >
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">Email Address</label>
          <input
            className="input-field"
            type="email"
            placeholder="admin@lab.local"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn-primary w-full py-3">
          Sign in
        </button>

        {message && (
          <div className={`rounded-lg p-3 text-sm text-center ${
            message.includes('failed') ? 'bg-red-500/10 text-red-400' : 'bg-cyan-500/10 text-cyan-400'
          }`}>
            {message}
          </div>
        )}
      </form>

      <div className="mt-8 card-container !p-4 w-full max-w-md bg-slate-900/20">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Demo Access</h3>
        <div className="grid grid-cols-1 gap-1 text-xs text-slate-400">
          <p><span className="text-cyan-500 font-medium">Admin:</span> admin@lab.local / admin123</p>
          <p><span className="text-cyan-500 font-medium">Technician:</span> tech@lab.local / tech123</p>
          <p><span className="text-cyan-500 font-medium">Doctor:</span> doctor@lab.local / doctor123</p>
        </div>
      </div>
    </div>
  );
}

