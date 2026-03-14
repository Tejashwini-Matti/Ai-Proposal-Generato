import { prisma } from "@/lib/db";

export type SaveProposalInput = {
  industry: string;
  revenue: string;
  pain_points: string;
  proposal_text: string;
};

// Saves a proposal and auto-increments version per (industry,revenue,pain_points).
export async function saveProposal(input: SaveProposalInput) {
  const latest = await prisma.proposal.findFirst({
    where: {
      industry: input.industry,
      revenue: input.revenue,
      pain_points: input.pain_points,
    },
    orderBy: { version: "desc" },
    select: { version: true },
  });

  const nextVersion = (latest?.version ?? 0) + 1;

  return prisma.proposal.create({
    data: {
      industry: input.industry,
      revenue: input.revenue,
      pain_points: input.pain_points,
      proposal_text: input.proposal_text,
      version: nextVersion,
    },
  });
}

// Lists proposals for the history page.
export async function listProposals() {
  return prisma.proposal.findMany({
    orderBy: { createdAt: "desc" },
  });
}
