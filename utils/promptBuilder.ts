import { calculateRoi } from "@/utils/roiCalculator";

export type PromptInputs = {
  industry: string;
  revenue: string;
  pain_points: string;
};

// Builds a structured prompt for Gemini so output is consistent.
export function buildProposalPrompt(input: PromptInputs): string {
  const roi = calculateRoi({ revenue: input.revenue, painPoints: input.pain_points });

  return [
    "You are a senior AI solutions architect and pre-sales consultant.",
    "Write a professional business proposal for an AI system, tailored to the client inputs.",
    "Return plain text only.",
    "",
    "Client Inputs:",
    `Industry: ${input.industry}`,
    `Revenue Size: ${input.revenue}`,
    `Pain Points: ${input.pain_points}`,
    "",
    "Use this exact section format (with headings):",
    "Executive Summary",
    "Problem Breakdown",
    "Proposed AI System Architecture",
    "Technology Stack",
    "Implementation Timeline",
    "ROI Projection",
    "",
    "ROI guidance (use these estimates as a starting point, adjust reasonably):",
    `Estimated Annual Savings (USD): ${roi.estimatedAnnualSavingsUsd}`,
    `Estimated Implementation Cost (USD): ${roi.estimatedImplementationCostUsd}`,
    `Estimated ROI (%): ${roi.estimatedRoiPercent}`,
    "",
    "Make the proposal realistic, specific, and implementation-oriented.",
    "Include bullet points where appropriate.",
  ].join("\n");
}
