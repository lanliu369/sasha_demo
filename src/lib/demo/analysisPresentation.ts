import {
  statsDetailRecords,
  vehicleSandAnalysisRecords,
  type StatsDetailRecord,
  type VehicleSandAnalysisRecord,
} from "@/lib/mock/analysisRecords";

export type VehicleDrillKey = "all" | "warn" | "anomaly" | "notAdopted";

export type StatsDrillKey =
  | "all"
  | "撒砂作业"
  | "上砂作业"
  | "砂处理"
  | "检测记录";

export const vehicleDrillLabels: Record<VehicleDrillKey, string> = {
  all: "全部撒砂记录",
  warn: "空转预警",
  anomaly: "异常数据",
  notAdopted: "未采纳建议",
};

export const statsDrillLabels: Record<StatsDrillKey, string> = {
  all: "全部统计明细",
  撒砂作业: "撒砂作业",
  上砂作业: "上砂作业",
  砂处理: "砂处理",
  检测记录: "检测记录",
};

export function filterVehicleRecords(
  key: VehicleDrillKey,
): VehicleSandAnalysisRecord[] {
  switch (key) {
    case "warn":
      return vehicleSandAnalysisRecords.filter((r) => r.status === "预警");
    case "anomaly":
      return vehicleSandAnalysisRecords.filter((r) => r.status === "异常");
    case "notAdopted":
      return vehicleSandAnalysisRecords.filter((r) => r.adopted === "否");
    default:
      return vehicleSandAnalysisRecords;
  }
}

export function filterStatsRecords(key: StatsDrillKey): StatsDetailRecord[] {
  if (key === "all") return statsDetailRecords;
  return statsDetailRecords.filter((r) => r.category === key);
}

export function computeTrainRanking() {
  const totals = new Map<string, number>();
  for (const row of vehicleSandAnalysisRecords) {
    totals.set(row.train, (totals.get(row.train) ?? 0) + 1);
  }
  const grand =
    [...totals.values()].reduce((sum, value) => sum + value, 0) || 1;
  return [...totals.entries()]
    .map(([label, value]) => ({
      label,
      value,
      pct: Math.round((value / grand) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

export const vehicleTrend30 = [420, 445, 460, 448, 472, 485, 502, 520];
export const statsTrend30 = [3800, 3950, 4100, 4280, 4390, 4450, 4520, 4520];
