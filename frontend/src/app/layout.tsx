import type { Metadata } from "next";
import "./globals.css";
import { LayoutNav } from "./layout-nav";

export const metadata: Metadata = {
  title: "MedLabPro",
  description: "Next.js + NestJS powered medical lab platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <header className="mb-10 px-2 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                MedLabPro
              </h1>
              <p className="text-sm text-slate-400">
                Medical Laboratory Management System
              </p>
            </div>
            <LayoutNav />
          </header>
          <div className="px-2">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

