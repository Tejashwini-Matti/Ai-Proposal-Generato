import { NextResponse } from "next/server";
import { saveProposal } from "@/services/proposalService";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      industry?: string;
      revenue?: string;
      pain_points?: string;
      proposal_text?: string;
    };

    if (!body.industry || !body.revenue || !body.pain_points || !body.proposal_text) {
      return NextResponse.json(
        { error: "industry, revenue, pain_points, proposal_text are required" },
        { status: 400 },
      );
    }

    const saved = await saveProposal({
      industry: body.industry,
      revenue: body.revenue,
      pain_points: body.pain_points,
      proposal_text: body.proposal_text,
    });

    return NextResponse.json({ proposal: saved });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
