export type LarkTagVariant = "success" | "warning" | "danger" | "info" | "neutral";

/** Arco Tag color 映射 — 飞书风低饱和语义色（globals.css 覆盖具体色值） */
export const larkTagArcoColor: Record<LarkTagVariant, string> = {
  success: "green",
  warning: "orange",
  danger: "red",
  info: "arcoblue",
  neutral: "gray",
};

/** 飞书风步骤/流程「已完成」节点 */
export const larkStepDoneClass = "bg-emerald-500/10 text-emerald-600";

const exactMap: Record<string, LarkTagVariant> = {
  在线: "success",
  正常: "success",
  运行中: "success",
  已完成: "success",
  已准入: "success",
  合格: "success",
  已连接: "success",
  成功: "success",
  启用: "success",
  停用: "neutral",
  已生成: "success",
  已闭环: "success",
  已关闭: "success",
  高: "danger",
  离线: "neutral",
  异常: "danger",
  失败: "danger",
  告警: "warning",
  中: "warning",
  逆向: "warning",
  补给中: "warning",
  低: "neutral",
  待部署: "neutral",
  待处理: "neutral",
  待下发: "neutral",
  待执行: "neutral",
  排队: "neutral",
  待触发: "neutral",
  待指派: "neutral",
  处理中: "info",
  进行中: "info",
  作业中: "info",
  已处理: "success",
  训练中: "info",
  未闭环: "warning",
  待处置: "danger",
  待命: "info",
};

export function resolveVariant(value: string | number | boolean): LarkTagVariant {
  if (typeof value === "boolean") {
    return value ? "success" : "neutral";
  }
  const key = String(value).trim();
  if (exactMap[key]) {
    return exactMap[key];
  }
  if (key.endsWith("%") && Number.parseFloat(key) >= 90) {
    return "success";
  }
  if (Number(key) >= 90) {
    return "success";
  }
  return "neutral";
}

export const taskTypeVariant: Record<string, LarkTagVariant> = {
  上砂: "info",
  砂处理: "success",
  调度: "neutral",
};

export const connectionVariant: Record<"online" | "warning" | "offline", LarkTagVariant> = {
  online: "success",
  warning: "warning",
  offline: "neutral",
};

export const subsystemVariant: Record<"running" | "warning" | "offline", LarkTagVariant> = {
  running: "success",
  warning: "warning",
  offline: "neutral",
};

export const alertLevelVariant: Record<"high" | "medium" | "low", LarkTagVariant> = {
  high: "danger",
  medium: "warning",
  low: "neutral",
};
