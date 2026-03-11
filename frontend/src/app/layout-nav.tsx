import Link from "next/link";

export function LayoutNav() {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-sm font-medium text-slate-400">
      <Link href="/" className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
        Dashboard
      </Link>
      <Link href="/patients" className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
        Patients
      </Link>
      <Link href="/inventory" className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
        Inventory
      </Link>
      <Link href="/tests" className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
        Tests
      </Link>
      <Link href="/schedule" className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
        Schedule
      </Link>
      <Link href="/billing" className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
        Billing
      </Link>
      <div className="h-4 w-px bg-slate-800 mx-2 hidden md:block" />
      <Link href="/login" className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors md:ml-2">
        Login
      </Link>
    </nav>
  );
}

