export type RoiInputs = {
  revenue: string;
  painPoints: string;
};

export type RoiResult = {
  estimatedAnnualSavingsUsd: number;
  estimatedImplementationCostUsd: number;
  estimatedRoiPercent: number;
};

// Simple heuristic ROI calculator for a student project.
// You can replace this with a more realistic model later.
export function calculateRoi({ revenue, painPoints }: RoiInputs): RoiResult {
  const revenueNumber = parseRevenueToNumber(revenue);
  const painFactor = Math.min(0.25, 0.05 + painPoints.split(",").filter(Boolean).length * 0.03);

  const estimatedAnnualSavingsUsd = Math.round(revenueNumber * painFactor);
  const estimatedImplementationCostUsd = Math.max(25000, Math.round(revenueNumber * 0.02));

  const estimatedRoiPercent =
    estimatedImplementationCostUsd === 0
      ? 0
      : Math.round(((estimatedAnnualSavingsUsd - estimatedImplementationCostUsd) / estimatedImplementationCostUsd) * 100);

  return {
    estimatedAnnualSavingsUsd,
    estimatedImplementationCostUsd,
    estimatedRoiPercent,
  };
}

function parseRevenueToNumber(revenue: string): number {
  const cleaned = revenue.replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return 1_000_000;
  if (n <= 0) return 1_000_000;
  return n;
}
