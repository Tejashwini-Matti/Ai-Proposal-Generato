"use client";

import { ProposalListItem } from "@/components/ProposalHistory";

export default function HistoryTable({
  items,
}: {
  items: ProposalListItem[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Industry
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Created Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 bg-white">
            {items.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900">
                  {p.industry}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-700">
                  {p.revenue}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-700">
                  v{p.version}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-700">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
