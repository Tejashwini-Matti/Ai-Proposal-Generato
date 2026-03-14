"use client";

export type ProposalListItem = {
  id: number;
  industry: string;
  revenue: string;
  pain_points: string;
  proposal_text: string;
  version: number;
  createdAt: string;
};

type ProposalHistoryProps = {
  items: ProposalListItem[];
  loading: boolean;
  onSelect: (item: ProposalListItem) => void;
};

export default function ProposalHistory({
  items,
  loading,
  onSelect,
}: ProposalHistoryProps) {
  return (
    <section className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-black">
      <div className="mb-4">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Saved Proposals
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Click an item to load it into the editor.
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-zinc-600 dark:text-zinc-300">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          No proposals saved yet.
        </div>
      ) : (
        <div className="grid gap-2">
          {items.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p)}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-left shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:hover:bg-zinc-900"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {p.industry}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  v{p.version}
                </div>
              </div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                Revenue: {p.revenue}
              </div>
              <div className="mt-1 max-h-10 overflow-hidden text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                {p.pain_points}
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
