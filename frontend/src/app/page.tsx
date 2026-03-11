export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome to MedLabPro. Manage your laboratory operations efficiently.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card-container">
          <h2 className="text-lg font-semibold text-white">Patients & Tests</h2>
          <p className="mt-2 text-sm text-slate-400">
            Register patients, order tests, and view results in real-time.
          </p>
        </div>
        <div className="card-container">
          <h2 className="text-lg font-semibold text-white">Sample Tracking</h2>
          <p className="mt-2 text-sm text-slate-400">
            Track specimens from collection to reporting with full history.
          </p>
        </div>
        <div className="card-container">
          <h2 className="text-lg font-semibold text-white">Inventory</h2>
          <p className="mt-2 text-sm text-slate-400">
            Manage reagents, kits, and consumables with automated thresholds.
          </p>
        </div>
        <div className="card-container">
          <h2 className="text-lg font-semibold text-white">Billing</h2>
          <p className="mt-2 text-sm text-slate-400">
            Associate tests with prices and generate seamless billing entries.
          </p>
        </div>
        <div className="card-container">
          <h2 className="text-lg font-semibold text-white">Scheduling</h2>
          <p className="mt-2 text-sm text-slate-400">
            Organize staff shifts and equipment usage for optimal throughput.
          </p>
        </div>
        <div className="card-container border-cyan-500/20 bg-cyan-500/5">
          <h2 className="text-lg font-semibold text-cyan-400">Real-time Sync</h2>
          <p className="mt-2 text-sm text-slate-400">
            Experience live updates across all modules via WebSockets.
          </p>
        </div>
      </section>
    </div>
  );
}

