"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import ProposalForm, { ProposalFormValues } from "@/components/ProposalForm";
import ProposalEditor from "@/components/ProposalEditor";

type GenerateResponse = { proposal: string };

type SaveResponse = {
  proposal: {
    id: number;
    industry: string;
    revenue: string;
    pain_points: string;
    proposal_text: string;
    version: number;
    createdAt: string;
  };
};

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? `Request failed with status ${res.status}`;
  } catch {
    try {
      const text = await res.text();
      return text ? text : `Request failed with status ${res.status}`;
    } catch {
      return `Request failed with status ${res.status}`;
    }
  }
}

export default function DashboardPage() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [form, setForm] = useState<ProposalFormValues>({
    industry: "",
    revenue: "",
    pain_points: "",
  });

  const [generatedProposal, setGeneratedProposal] = useState<string>("");
  const [version, setVersion] = useState<number>(0);

  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const proposalTitle = useMemo(() => {
    const base = form.industry ? `${form.industry} AI Proposal` : "AI Proposal";
    return version > 0 ? `${base} (v${version})` : base;
  }, [form.industry, version]);

  async function handleGenerate() {
    setGenerating(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(await readErrorMessage(res));
      }

      const data = (await res.json()) as GenerateResponse;
      setGeneratedProposal(data.proposal);
      setVersion(0);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to generate proposal";
      const isNetwork = typeof msg === "string" && msg.toLowerCase().includes("fetch");
      setErrorMessage(
        isNetwork
          ? `${msg}. This usually means the dev server/API route crashed or is not reachable. Check the terminal running \`npm run dev\` for the real error.`
          : msg,
      );
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/save-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          proposal_text: generatedProposal,
        }),
      });

      if (!res.ok) {
        throw new Error(await readErrorMessage(res));
      }

      const data = (await res.json()) as SaveResponse;
      setVersion(data.proposal.version);
      router.push("/history");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save proposal";
      setErrorMessage(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Generate proposal
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Create a client-ready proposal, then save versions and export to PDF.
          </p>
        </div>
        <div className="text-xs font-medium text-zinc-500">
          Draft title: <span className="font-mono">{proposalTitle}</span>
        </div>
      </div>

      {errorMessage ? (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 shadow-sm">
          <div className="font-semibold">Request failed</div>
          <div className="mt-1 break-words text-red-800/90">{errorMessage}</div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <ProposalForm
          values={form}
          onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))}
          onGenerate={handleGenerate}
          generating={generating}
        />

        <ProposalEditor
          title={proposalTitle}
          proposalText={generatedProposal}
          onChange={setGeneratedProposal}
          onSave={handleSave}
          saving={saving}
          canSave={generatedProposal.trim().length > 0}
        />
      </div>
    </Layout>
  );
}
