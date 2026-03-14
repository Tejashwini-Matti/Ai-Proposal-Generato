import { NextResponse } from "next/server";
import { generateProposalText } from "@/services/aiService";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      industry?: string;
      revenue?: string;
      pain_points?: string;
    };

    if (!body.industry || !body.revenue || !body.pain_points) {
      return NextResponse.json(
        { error: "industry, revenue, and pain_points are required" },
        { status: 400 },
      );
    }

    const proposal = await generateProposalText({
      industry: body.industry,
      revenue: body.revenue,
      pain_points: body.pain_points,
    });

    return NextResponse.json({ proposal });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
