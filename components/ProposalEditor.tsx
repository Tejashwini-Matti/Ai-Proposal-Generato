"use client";

import { exportProposalToPdf } from "@/services/pdfService";

type ProposalEditorProps = {
  proposalText: string;
  onChange: (next: string) => void;
  onSave: () => void;
  saving: boolean;
  canSave: boolean;
  title: string;
};

export default function ProposalEditor({
  proposalText,
  onChange,
  onSave,
  saving,
  canSave,
  title,
}: ProposalEditorProps) {
  const canExport = proposalText.trim().length > 0;
  const canCopy = proposalText.trim().length > 0;

  return (
    <section className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <div className="text-sm font-semibold text-zinc-900">Proposal Output</div>
        <div className="text-xs text-zinc-500">
          Review and edit the generated proposal before saving or exporting.
        </div>
      </div>

      <textarea
        value={proposalText}
        onChange={(e) => onChange(e.target.value)}
        rows={18}
        className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        placeholder="Your generated proposal will appear here..."
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onSave}
          disabled={!canSave || saving}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Proposal"}
        </button>

        <button
          type="button"
          onClick={() => exportProposalToPdf({ title, body: proposalText })}
          disabled={!canExport}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Export PDF
        </button>

        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(proposalText);
            } catch {
              // ignore
            }
          }}
          disabled={!canCopy}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Copy
        </button>
      </div>
    </section>
  );
}
