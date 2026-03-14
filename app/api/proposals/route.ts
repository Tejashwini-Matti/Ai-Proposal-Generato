import { NextResponse } from "next/server";
import { listProposals } from "@/services/proposalService";

export async function GET() {
  try {
    const proposals = await listProposals();
    return NextResponse.json({ proposals });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
