import { db } from "@/lib/db";

export type SaveProposalInput = {
  industry: string;
  revenue: string;
  pain_points: string;
  proposal_text: string;
};

// Saves a proposal and auto-increments version per (industry,revenue,pain_points).
export async function saveProposal(input: SaveProposalInput) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const latestRes = await client.query<{ version: number }>(
      'SELECT COALESCE(MAX("version"), 0) AS version FROM "Proposal" WHERE "industry" = $1 AND "revenue" = $2 AND "pain_points" = $3',
      [input.industry, input.revenue, input.pain_points],
    );

    const nextVersion = (latestRes.rows[0]?.version ?? 0) + 1;

    const insertRes = await client.query(
      'INSERT INTO "Proposal" ("industry", "revenue", "pain_points", "proposal_text", "version") VALUES ($1, $2, $3, $4, $5) RETURNING "id", "industry", "revenue", "pain_points", "proposal_text", "version", "createdAt"',
      [
        input.industry,
        input.revenue,
        input.pain_points,
        input.proposal_text,
        nextVersion,
      ],
    );

    await client.query("COMMIT");
    return insertRes.rows[0];
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // ignore
    }
    throw err;
  } finally {
    client.release();
  }
}

// Lists proposals for the history page.
export async function listProposals() {
  const res = await db.query(
    'SELECT "id", "industry", "revenue", "pain_points", "proposal_text", "version", "createdAt" FROM "Proposal" ORDER BY "createdAt" DESC',
  );
  return res.rows;
}
