import type { TrainingDataset } from "@/lib/types/demo";

export function nextDatasetId(list: TrainingDataset[]) {
  const nums = list
    .map((item) => Number.parseInt(item.id.replace("DS", ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length > 0 ? Math.max(...nums) : 0) + 1;
  return `DS${String(next).padStart(2, "0")}`;
}

export function nextTrainJobId(list: { id: string }[]) {
  const nums = list
    .map((item) => Number.parseInt(item.id.replace("TR", ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length > 0 ? Math.max(...nums) : 0) + 1;
  return `TR${String(next).padStart(2, "0")}`;
}

export function formatSampleTotal(total: number) {
  if (total >= 1000) {
    return `${Math.round(total / 1000)}K`;
  }
  return String(total);
}

export function averageLabelRate(list: TrainingDataset[]) {
  if (list.length === 0) return "0";
  const sum = list.reduce(
    (acc, item) => acc + Number.parseFloat(item.labeled.replace("%", "")),
    0
  );
  return (sum / list.length).toFixed(1);
}

export function normalizeLabeled(value: string) {
  const trimmed = value.trim() || "0";
  const numeric = Number.parseFloat(trimmed.replace("%", ""));
  if (Number.isNaN(numeric)) return "0%";
  const clamped = Math.min(100, Math.max(0, numeric));
  return `${clamped}%`;
}

export function isDatasetAvailable(dataset: TrainingDataset) {
  return dataset.labeled === "100%";
}

export function todayDateString() {
  return new Date().toISOString().slice(0, 10);
}

export const MODEL_TRAIN_OPTIONS = [
  { value: "按图行车", label: "按图行车" },
  { value: "极端工况", label: "极端工况" },
  { value: "操作评价", label: "操作评价" },
  { value: "自动纠正", label: "自动纠正" },
];

export const MODEL_PACKAGE_PREFIX: Record<string, string> = {
  按图行车: "diagram",
  极端工况: "extreme",
  操作评价: "evaluation",
  自动纠正: "correction",
};

export const VEHICLE_DEPLOY_TARGETS = [
  { value: "车载-101", label: "车载-101 · G101 · CR400AF-101" },
  { value: "车载-205", label: "车载-205 · G205 · CR400AF-205" },
  { value: "车载-308", label: "车载-308 · D308 · CR400AF-308" },
];

export const DEFAULT_MODEL_FTP = "ftp://192.168.20.100/models/";

export function nextDeployId(list: { id: string }[]) {
  const nums = list
    .map((item) => Number.parseInt(item.id.replace("DEP", ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length > 0 ? Math.max(...nums) : 0) + 1;
  return `DEP${String(next).padStart(2, "0")}`;
}

export function buildTrainOutput(model: string, datasetVersion: string) {
  const normalized = datasetVersion.startsWith("v")
    ? datasetVersion
    : `v${datasetVersion}`;
  const outputVersion =
    normalized.split(".").length === 2 ? `${normalized}.0` : normalized;
  const prefix = MODEL_PACKAGE_PREFIX[model] ?? "model";
  return {
    outputVersion,
    packageName: `${prefix}_${outputVersion}.onnx`,
  };
}

export function nowDateTimeString() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0, 5);
  return `${date} ${time}`;
}
