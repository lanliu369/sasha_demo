import { deviceStatusList, vehicleSyncSessions } from "@/lib/mock/pages";
import {
  orchestrationTasks,
} from "@/lib/mock/orchestrationTasks";
import type { DeviceStatusItem, OrchestrationTask } from "@/lib/types/demo";

export type FullFlowStage = {
  stage: string;
  module: string;
  status: "已完成" | "已处理" | "处理中" | "进行中" | "待执行" | "异常";
  time: string;
  detail: string;
};

/** 平台工单 ↔ 运行监测设备（Demo 关联） */
const taskDeviceLinks: Record<string, string> = {
  O001: "D01",
  O002: "D02",
  O006: "D01",
  O008: "D02",
  O007: "D01",
};

const deviceTaskLinks: Record<string, string> = {
  D01: "O001",
  D02: "O002",
  D03: "O001",
  D04: "O002",
  D05: "O001",
  D06: "O001",
};

export function getFullFlowTasks(): OrchestrationTask[] {
  return orchestrationTasks.filter((t) => Boolean(t.taskType));
}

export function getFullFlowDevices(): DeviceStatusItem[] {
  return deviceStatusList;
}

export function getFullFlowTaskOptions() {
  return getFullFlowTasks().map((t) => ({
    value: t.id,
    label: `${t.id} · ${t.train ?? "—"} ${t.taskType} · ${t.status}`,
  }));
}

export function getFullFlowDeviceOptions() {
  return getFullFlowDevices().map((d) => ({
    value: d.id,
    label: `${d.name} · ${d.module} · ${d.value}`,
  }));
}

export function getLinkedDeviceId(taskId: string): string | undefined {
  return taskDeviceLinks[taskId];
}

export function getLinkedTaskId(deviceId: string): string | undefined {
  return deviceTaskLinks[deviceId];
}

export function getFullFlowTask(taskId: string): OrchestrationTask | undefined {
  return getFullFlowTasks().find((t) => t.id === taskId);
}

export function getFullFlowDevice(deviceId: string): DeviceStatusItem | undefined {
  return deviceStatusList.find((d) => d.id === deviceId);
}

function resolveStageStatus(
  stepIndex: number,
  activeStep: number,
  task: OrchestrationTask,
): FullFlowStage["status"] {
  if (task.status === "已处理") return "已完成";
  if (stepIndex < activeStep) return "已完成";
  if (stepIndex > activeStep) return "待执行";
  if (task.status === "待处理") return "待执行";
  if (task.status === "异常") return "异常";
  return "处理中";
}

function getActiveStep(task: OrchestrationTask): number {
  if (task.status === "已处理") return 6;
  if (task.status === "待处理") return 2;
  if (task.progress >= 90) return 5;
  if (task.progress >= 35) return 4;
  if (task.progress >= 5) return 3;
  return 2;
}

function formatPlanDetail(task: OrchestrationTask): string {
  if (task.planId && task.planBatch) {
    return `加砂计划 ${task.planId} · ${task.planBatch}`;
  }
  if (task.planBatch) return task.planBatch;
  return task.trigger;
}

function formatDispatchDetail(task: OrchestrationTask): string {
  const dispatch = task.dispatchId ?? "—";
  const transition =
    task.status === "待处理"
      ? "待处理"
      : task.status === "已处理"
        ? "已处理"
        : "待处理→处理中";
  return `智能调度 ${dispatch} → 平台工单 ${task.id}（${transition}）`;
}

function formatIssueDetail(task: OrchestrationTask): string {
  if (task.status === "待处理") {
    return `${task.id} 待在调度中心下发至${task.target}`;
  }
  return `${task.id} 已由调度中心下发至${task.target}`;
}

function formatSyncDetail(task: OrchestrationTask): string {
  const session = vehicleSyncSessions.find((s) => s.train === task.train);
  if (task.taskType === "砂处理") {
    return `${task.resource ?? "—"} 就绪 · 存量联动校验通过`;
  }
  if (!session || session.status === "等待") {
    return "等待车地链路建立";
  }
  return `延迟 ${session.latency}ms · 工单${task.status === "处理中" ? "处理中" : task.status}`;
}

function formatExecuteDetail(task: OrchestrationTask): string {
  const label = task.taskType === "砂处理" ? "砂处理" : "上砂";
  if (task.status === "已处理") {
    return `${label}完成 · ${task.params ?? "已回传"}`;
  }
  if (task.status === "待处理") {
    return "等待任务下发";
  }
  return `进度 ${task.progress}% · 等待回传`;
}

function formatReturnDetail(task: OrchestrationTask): string {
  if (task.status === "已处理") {
    return "业务模块已回传，平台工单已闭环";
  }
  return "完成后回传平台，工单变已处理";
}

function formatArchiveDetail(task: OrchestrationTask): string {
  if (task.status === "已处理") {
    return `工单 ${task.id} 已归档 · ${task.updatedAt}`;
  }
  return `参考 ${task.id === "O007" ? "O007" : "O007"} 已处理样例`;
}

const STAGE_TIMES = ["10:28", "10:29", "10:30", "10:31", "10:32", "10:33", "10:34"];

export function buildFullFlowStagesForTask(task: OrchestrationTask): FullFlowStage[] {
  const activeStep = getActiveStep(task);
  const isProcessing = task.taskType === "砂处理";
  const syncStage = isProcessing
    ? { stage: "设备状态确认", module: task.target }
    : { stage: "车地信息同步", module: "车载+上砂" };
  const execStage = isProcessing
    ? { stage: "砂处理作业执行", module: "智能砂处理装置" }
    : { stage: "上砂作业执行", module: "移动上砂装置" };

  const templates = [
    {
      stage: "调度计划接收",
      module: "调度中心",
      detail: formatPlanDetail(task),
    },
    {
      stage: "任务智能编排",
      module: "系统控制中心",
      detail: formatDispatchDetail(task),
    },
    {
      stage: "调度中心任务下发",
      module: "调度中心",
      detail: formatIssueDetail(task),
    },
    {
      ...syncStage,
      detail: formatSyncDetail(task),
    },
    {
      ...execStage,
      detail: formatExecuteDetail(task),
    },
    {
      stage: "处理结果回传",
      module: task.target,
      detail: formatReturnDetail(task),
    },
    {
      stage: "平台闭环归档",
      module: "系统控制中心",
      detail: formatArchiveDetail(task),
    },
  ];

  return templates.map((item, index) => ({
    ...item,
    status: resolveStageStatus(index, activeStep, task),
    time: task.status === "已处理" || index <= activeStep ? STAGE_TIMES[index] : "—",
  }));
}

export function getCurrentFullFlowStage(stages: FullFlowStage[]): FullFlowStage | undefined {
  return (
    stages.find((s) => s.status === "处理中" || s.status === "进行中") ??
    stages.find((s) => s.status === "待执行")
  );
}

export function countFullFlowBlocks(
  task: OrchestrationTask,
  device?: DeviceStatusItem,
): number {
  let blocks = 0;
  if (task.status === "异常") blocks += 1;
  if (device?.status === "warning" && task.status === "处理中") blocks += 1;
  return blocks;
}

export function getDefaultFullFlowTaskId(): string {
  return (
    getFullFlowTasks().find((t) => t.status === "处理中")?.id ??
    getFullFlowTasks()[0]?.id ??
    "O001"
  );
}

export function getDefaultFullFlowDeviceId(taskId: string): string {
  return getLinkedDeviceId(taskId) ?? deviceStatusList[0]?.id ?? "D01";
}

export function getActiveStepIndex(stages: FullFlowStage[]): number {
  const running = stages.findIndex(
    (s) => s.status === "处理中" || s.status === "进行中",
  );
  if (running >= 0) return running;
  const pending = stages.findIndex((s) => s.status === "待执行");
  if (pending >= 0) return pending;
  return stages.length - 1;
}

const STAGE_SHORT_LABELS: Record<string, string> = {
  调度计划接收: "计划接收",
  任务智能编排: "智能编排",
  调度中心任务下发: "任务下发",
  车地信息同步: "车地同步",
  设备状态确认: "状态确认",
  上砂作业执行: "上砂执行",
  砂处理作业执行: "砂处理",
  处理结果回传: "结果回传",
  平台闭环归档: "闭环归档",
};

export function getStageShortLabel(stage: string): string {
  return STAGE_SHORT_LABELS[stage] ?? stage;
}

export type FullFlowSummary = {
  total: number;
  completed: number;
  running: number;
  pending: number;
  estimatedCompletion: string;
};

function parseEstimatedCompletion(task: OrchestrationTask): string {
  if (task.status === "已处理") return "已完成";
  if (task.eta && task.eta !== "—") {
    const minutes = Number.parseInt(task.eta, 10);
    if (!Number.isNaN(minutes)) {
      const [h, m] = (task.updatedAt ?? "10:35").split(":").map(Number);
      const total = h * 60 + m + minutes;
      const hh = Math.floor(total / 60) % 24;
      const mm = total % 60;
      return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    }
  }
  if (task.progress >= 70) return "10:45";
  if (task.progress > 0) return "11:00";
  return "11:30";
}

export function getFullFlowSummary(
  stages: FullFlowStage[],
  task: OrchestrationTask,
): FullFlowSummary {
  const completed = stages.filter(
    (s) => s.status === "已完成" || s.status === "已处理",
  ).length;
  const running = stages.filter(
    (s) => s.status === "处理中" || s.status === "进行中",
  ).length;
  const pending = stages.filter((s) => s.status === "待执行").length;
  return {
    total: stages.length,
    completed,
    running,
    pending,
    estimatedCompletion: parseEstimatedCompletion(task),
  };
}

export function isStageCompleted(status: FullFlowStage["status"]): boolean {
  return status === "已完成" || status === "已处理";
}

export function isStageActive(status: FullFlowStage["status"]): boolean {
  return status === "处理中" || status === "进行中";
}
