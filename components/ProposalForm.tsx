"use client";

import { useMemo } from "react";

export type ProposalFormValues = {
  industry: string;
  revenue: string;
  pain_points: string;
};

type ProposalFormProps = {
  values: ProposalFormValues;
  onChange: (patch: Partial<ProposalFormValues>) => void;
  onGenerate: () => void;
  generating: boolean;
};

export default function ProposalForm({
  values,
  onChange,
  onGenerate,
  generating,
}: ProposalFormProps) {
  const isValid = useMemo(() => {
    return Boolean(values.industry && values.revenue && values.pain_points);
  }, [values.industry, values.revenue, values.pain_points]);

  return (
    <section className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <div className="text-sm font-semibold text-zinc-900">
          Client Details
        </div>
        <div className="text-xs text-zinc-500">
          Enter the minimum inputs needed to generate a proposal.
        </div>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700">
            Industry
          </span>
          <input
            value={values.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            className="h-10 rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            placeholder="e.g., Retail, Healthcare, FinTech"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700">
            Revenue Size
          </span>
          <input
            value={values.revenue}
            onChange={(e) => onChange({ revenue: e.target.value })}
            className="h-10 rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            placeholder="e.g., $5,000,000"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700">
            Pain Points
          </span>
          <textarea
            value={values.pain_points}
            onChange={(e) => onChange({ pain_points: e.target.value })}
            rows={4}
            className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            placeholder="Comma-separated or sentences. e.g., slow support response, manual reporting, fraud risk"
          />
        </label>

        <button
          type="button"
          onClick={onGenerate}
          disabled={!isValid || generating}
          className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {generating ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
              Generating proposal...
            </span>
          ) : (
            "Generate Proposal"
          )}
        </button>
      </div>
    </section>
  );
}
