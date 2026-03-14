"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, History } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";
  const isHistory = pathname === "/history";

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-gray-800 bg-gray-900 text-gray-100 md:flex">
      <div className="px-5 pb-4 pt-6">
        <div className="text-lg font-semibold tracking-tight">AI Proposal Generator</div>
        <div className="mt-1 text-xs text-gray-400">SaaS Dashboard</div>
      </div>

      <nav className="grid gap-1 px-3">
        <Link
          href="/dashboard"
          className={
            isDashboard
              ? "flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white"
              : "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          }
        >
          <FileText className="h-4 w-4" />
          Generate Proposal
        </Link>

        <Link
          href="/history"
          className={
            isHistory
              ? "flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white"
              : "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          }
        >
          <History className="h-4 w-4" />
          Proposal History
        </Link>
      </nav>

      <div className="mt-auto px-5 pb-6 text-xs text-gray-400">
        Configure:
        <div className="mt-2 font-mono">DATABASE_URL</div>
        <div className="font-mono">GEMINI_API_KEY</div>
      </div>
    </aside>
  );
}
