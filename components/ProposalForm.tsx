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
    <section className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-900">
          Client Details
        </div>
        <div className="text-xs text-gray-500">
          Enter the minimum inputs needed to generate a proposal.
        </div>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-1">
          <span className="text-xs font-medium text-gray-700">
            Industry
          </span>
          <input
            value={values.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Retail, Healthcare, FinTech"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-gray-700">
            Revenue Size
          </span>
          <input
            value={values.revenue}
            onChange={(e) => onChange({ revenue: e.target.value })}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., $5,000,000"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-gray-700">
            Pain Points
          </span>
          <textarea
            value={values.pain_points}
            onChange={(e) => onChange({ pain_points: e.target.value })}
            rows={4}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Comma-separated or sentences. e.g., slow support response, manual reporting, fraud risk"
          />
        </label>

        <button
          type="button"
          onClick={onGenerate}
          disabled={!isValid || generating}
          className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
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
