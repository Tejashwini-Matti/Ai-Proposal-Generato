"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, History } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";
  const isHistory = pathname === "/history";

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-zinc-200/70 bg-white/80 text-zinc-900 backdrop-blur md:flex">
      <div className="px-5 pb-4 pt-6">
        <div className="text-sm font-semibold tracking-tight">AI Proposal Generator</div>
        <div className="mt-1 text-xs text-zinc-500">Proposal workspace</div>
      </div>

      <nav className="grid gap-1 px-3">
        <Link
          href="/dashboard"
          className={
            isDashboard
              ? "flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm"
              : "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          }
        >
          <FileText className="h-4 w-4" />
          Generate Proposal
        </Link>

        <Link
          href="/history"
          className={
            isHistory
              ? "flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm"
              : "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          }
        >
          <History className="h-4 w-4" />
          Proposal History
        </Link>
      </nav>

      <div className="mt-auto px-5 pb-6 pt-6 text-xs text-zinc-500">
        <div className="rounded-xl border border-zinc-200 bg-white px-3 py-2">
          <div className="font-semibold text-zinc-700">Environment</div>
          <div className="mt-1 font-mono">DATABASE_URL</div>
          <div className="font-mono">GEMINI_API_KEY</div>
        </div>
      </div>
    </aside>
  );
}
