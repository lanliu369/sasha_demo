import type { OrchestrationTask } from "@/lib/types/demo";

/** 任务编排 · 统一 Mock（智能调度 ↔ 平台工单 ↔ 业务模块下发 共用） */
export const orchestrationTasks: OrchestrationTask[] = [
  {
    id: "O001",
    dispatchId: "SD01",
    planId: "DP03",
    planBatch: "#20250529-03",
    train: "G101",
    track: "3道",
    taskType: "上砂",
    name: "G101 上砂任务编排",
    target: "移动上砂装置",
    trigger: "调度中心加砂计划 #20250529-03",
    status: "处理中",
    dispatchStatus: "执行中",
    progress: 72,
    resource: "上砂装置-01",
    eta: "15min",
    priority: 1,
    params: "3道 · 正向 · 预计 15min",
    updatedAt: "10:35",
  },
  {
    id: "O002",
    dispatchId: "SD02",
    planId: "—",
    planBatch: "批次 #029",
    train: "G205",
    taskType: "砂处理",
    name: "批次 #029 砂处理",
    target: "智能砂处理装置",
    trigger: "砂仓存量低于阈值",
    status: "待处理",
    dispatchStatus: "排队",
    progress: 0,
    resource: "砂处理装置-A",
    eta: "25min",
    priority: 2,
    params: "批次 #029 · 全自动 · 目标存量 80%",
    updatedAt: "10:28",
  },
  {
    id: "O006",
    dispatchId: "SD03",
    planId: "DP04",
    planBatch: "#20250529-04",
    train: "D308",
    track: "2道",
    taskType: "上砂",
    name: "D308 上砂任务编排",
    target: "移动上砂装置",
    trigger: "调度中心加砂计划 #20250529-04",
    status: "待处理",
    dispatchStatus: "待触发",
    progress: 0,
    resource: "上砂装置-02",
    eta: "—",
    priority: 3,
    params: "2道 · 正向 · 预计 18min",
    updatedAt: "10:20",
  },
  {
    id: "O008",
    dispatchId: "SD05",
    planId: "—",
    planBatch: "批次 #030",
    train: "D401",
    taskType: "砂处理",
    name: "批次 #030 砂处理",
    target: "智能砂处理装置",
    trigger: "储砂罐存量联动",
    status: "待处理",
    dispatchStatus: "排队",
    progress: 0,
    resource: "砂处理装置-B",
    eta: "30min",
    priority: 3,
    params: "批次 #030 · 全自动 · 目标存量 85%",
    updatedAt: "10:18",
  },
  {
    id: "O007",
    dispatchId: "SD04",
    planId: "DP02",
    planBatch: "#20250529-02",
    train: "G102",
    track: "1道",
    taskType: "上砂",
    name: "G102 上砂任务编排",
    target: "移动上砂装置",
    trigger: "调度中心加砂计划 #20250529-02",
    status: "已处理",
    dispatchStatus: "已完成",
    progress: 100,
    resource: "上砂装置-03",
    eta: "—",
    priority: 4,
    params: "1道 · 正向 · 已完成 120袋",
    updatedAt: "09:55",
  },
  {
    id: "O003",
    name: "车地同步校验",
    target: "车载设备 + 上砂装置",
    trigger: "上砂任务 O001 处理中",
    status: "已处理",
    progress: 100,
    relatedOrderId: "O001",
    updatedAt: "10:15",
  },
  {
    id: "O004",
    name: "检测数据归档编排",
    target: "数据存储",
    trigger: "抽检完成",
    status: "已处理",
    progress: 100,
    updatedAt: "09:58",
  },
  {
    id: "O005",
    name: "大屏 KPI 刷新",
    target: "中心大屏",
    trigger: "定时 2s",
    status: "处理中",
    progress: 100,
    updatedAt: "10:35",
  },
];

export type SmartDispatchPlanRow = {
  id: string;
  orderId: string;
  planId: string;
  train: string;
  plan: string;
  planBatch: string;
  priority: number;
  resource: string;
  eta: string;
  status: string;
  taskType: string;
  issuePath: string;
};

export const smartDispatchPlans: SmartDispatchPlanRow[] = orchestrationTasks
  .filter((t): t is OrchestrationTask & { dispatchId: string } => Boolean(t.dispatchId))
  .map((t) => ({
    id: t.dispatchId!,
    orderId: t.id,
    planId: t.planId ?? "—",
    train: t.train ?? "—",
    planBatch: t.planBatch ?? "—",
    plan: t.planBatch
      ? t.planBatch.startsWith("#")
        ? `加砂计划 ${t.planBatch}`
        : t.planBatch
      : "—",
    priority: t.priority ?? 0,
    resource: t.resource ?? "—",
    eta: t.eta ?? "—",
    status: t.dispatchStatus ?? t.status,
    taskType: t.taskType ?? "—",
    issuePath:
      t.taskType === "砂处理"
        ? "/orchestration/processing-task"
        : "/orchestration/loading-task",
  }));

export function getOrchestrationTasksByType(taskType: "上砂" | "砂处理") {
  return orchestrationTasks.filter((t) => t.taskType === taskType);
}

export function getOrchestrationTaskByOrderId(orderId: string) {
  return orchestrationTasks.find((t) => t.id === orderId);
}

export function getOrchestrationTaskByDispatchId(dispatchId: string) {
  return orchestrationTasks.find((t) => t.dispatchId === dispatchId);
}

/** 智能调度 · 待调度计划（与 SD 编号一一对应） */
export function getPendingSmartDispatchList() {
  return smartDispatchPlans.map((p) => ({
    id: p.id,
    orderId: p.orderId,
    planId: p.planId,
    train: p.train,
    planBatch: p.planBatch,
    plan: p.plan,
    resource: p.resource,
    dispatchStatus: p.status,
    taskType: p.taskType,
    issueLabel: p.taskType === "砂处理" ? "砂处理任务下发" : "上砂任务下发",
  }));
}

/** 业务模块下发页默认工单（优先待处理，否则处理中） */
export function getDefaultIssueTask(taskType: "上砂" | "砂处理") {
  const typed = getOrchestrationTasksByType(taskType);
  return (
    typed.find((t) => t.status === "待处理") ??
    typed.find((t) => t.status === "处理中") ??
    typed[0]
  );
}

export function countPlatformTasksByStatus(
  status: OrchestrationTask["status"],
  taskType?: "上砂" | "砂处理"
) {
  return orchestrationTasks.filter(
    (t) =>
      t.status === status &&
      (taskType ? t.taskType === taskType : Boolean(t.taskType))
  ).length;
}
