"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import HistoryTable from "@/components/HistoryTable";
import type { ProposalListItem } from "@/components/ProposalHistory";

type ProposalsResponse = { proposals: ProposalListItem[] };

export default function HistoryPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [items, setItems] = useState<ProposalListItem[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErrorMessage("");
      try {
        const res = await fetch("/api/proposals", { method: "GET" });
        if (!res.ok) {
          const err = (await res.json()) as { error?: string };
          throw new Error(err.error ?? "Failed to load proposals");
        }
        const data = (await res.json()) as ProposalsResponse;
        setItems(data.proposals);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load proposals";
        setErrorMessage(msg);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Proposal History</h1>
        <p className="mt-1 text-sm text-gray-600">
          View all saved proposals generated from the dashboard.
        </p>
      </div>

      {errorMessage ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <div className="font-semibold">Failed to load history</div>
          <div className="mt-1 break-words">{errorMessage}</div>
        </div>
      ) : null}

      {loading ? (
        <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm text-gray-700 shadow-md">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400/60 border-t-gray-700" />
          Loading proposals...
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-sm text-gray-700 shadow-md">
          No proposals saved yet.
        </div>
      ) : (
        <HistoryTable items={items} />
      )}
    </Layout>
  );
}
