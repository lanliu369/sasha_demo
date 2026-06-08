import type { DriverProfile, RiskLevel } from "@/lib/types/demo";

export function resolveSegmentRiskLevel(occurrences: number): RiskLevel {
  if (occurrences >= 2) return "high";
  if (occurrences === 1) return "medium";
  return "low";
}

export const riskLevelMeta: Record<
  RiskLevel,
  { label: string; dot: string; badge: string }
> = {
  high: {
    label: "高风险",
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 border-rose-100",
  },
  medium: {
    label: "中风险",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
  },
  low: {
    label: "低风险",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
};

export function computeProfileOverview(profiles: DriverProfile[]) {
  const total = profiles.length;
  const avgScore =
    total === 0
      ? 0
      : Math.round(
          profiles.reduce((sum, item) => sum + item.score, 0) / total,
        );
  const highRiskDrivers = profiles.filter(
    (item) =>
      item.score < 90 ||
      item.weakSegments.some((seg) => seg.occurrences >= 2),
  ).length;
  const improving = profiles.filter((item) => item.trend === "up").length;
  const improveRate =
    total === 0 ? 0 : Math.round((improving / total) * 100);

  return { total, avgScore, highRiskDrivers, improveRate };
}

export function computeScenarioHeatRanking(profiles: DriverProfile[]) {
  const totals = new Map<string, number>();
  for (const profile of profiles) {
    for (const segment of profile.weakSegments) {
      totals.set(
        segment.scenario,
        (totals.get(segment.scenario) ?? 0) + segment.occurrences,
      );
    }
  }
  const grand = [...totals.values()].reduce((sum, value) => sum + value, 0) || 1;
  return [...totals.entries()]
    .map(([label, value]) => ({
      label,
      value,
      pct: Math.round((value / grand) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

export function driverAvatarText(name: string) {
  return name.replace(/师傅$/, "").slice(0, 1) || name.slice(0, 1);
}

export const avatarGradients = [
  "from-[#3370FF] to-[#6B9AFF]",
  "from-[#14C0FF] to-[#3370FF]",
  "from-[#7B61FF] to-[#3370FF]",
];

export function avatarGradient(index: number) {
  return avatarGradients[index % avatarGradients.length];
}
