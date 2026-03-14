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
    <section className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-900">Proposal Output</div>
        <div className="text-xs text-gray-500">
          Review and edit the generated proposal before saving or exporting.
        </div>
      </div>

      <textarea
        value={proposalText}
        onChange={(e) => onChange(e.target.value)}
        rows={18}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Your generated proposal will appear here..."
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onSave}
          disabled={!canSave || saving}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Proposal"}
        </button>

        <button
          type="button"
          onClick={() => exportProposalToPdf({ title, body: proposalText })}
          disabled={!canExport}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
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
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Copy
        </button>
      </div>
    </section>
  );
}
