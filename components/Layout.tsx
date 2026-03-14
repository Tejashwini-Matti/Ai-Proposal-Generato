"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <Sidebar />
      <main className="ml-0 min-h-screen md:ml-64">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
