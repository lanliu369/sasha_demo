import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Clock,
  Loader2,
  PauseCircle,
  PlayCircle,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import { resolveVariant, type LarkTagVariant } from "@/lib/ui/larkTag";

export type StatusIconMeta = {
  Icon: LucideIcon;
  bgClass: string;
  iconClass: string;
  variant: LarkTagVariant;
};

const variantStyle: Record<
  LarkTagVariant,
  { bgClass: string; iconClass: string }
> = {
  success: {
    bgClass: "bg-emerald-500/10",
    iconClass: "text-emerald-600",
  },
  warning: {
    bgClass: "bg-amber-500/10",
    iconClass: "text-amber-600",
  },
  danger: {
    bgClass: "bg-rose-500/10",
    iconClass: "text-rose-600",
  },
  info: {
    bgClass: "bg-brand/10",
    iconClass: "text-brand",
  },
  neutral: {
    bgClass: "bg-slate-500/10",
    iconClass: "text-text-secondary",
  },
};

/** 状态文案 → 飞书风语义图标 */
const statusIconMap: Record<string, LucideIcon> = {
  待处理: Clock,
  待下发: Clock,
  待执行: Clock,
  待触发: Clock,
  待指派: Clock,
  待部署: Clock,
  排队: PauseCircle,
  停用: PauseCircle,
  处理中: Loader2,
  进行中: PlayCircle,
  作业中: PlayCircle,
  训练中: Loader2,
  同步中: Loader2,
  待命: PlayCircle,
  运行中: PlayCircle,
  已处理: CheckCircle2,
  已完成: CheckCircle2,
  今日已处理: CheckCircle2,
  已闭环: CheckCircle2,
  已关闭: CheckCircle2,
  已生成: CheckCircle2,
  已连接: CheckCircle2,
  成功: CheckCircle2,
  正常: CheckCircle2,
  在线: CheckCircle2,
  合格: CheckCircle2,
  已准入: CheckCircle2,
  启用: CheckCircle2,
  异常: AlertTriangle,
  失败: XCircle,
  待处置: ShieldAlert,
  告警: AlertCircle,
  未闭环: AlertCircle,
  高: ShieldAlert,
  中: AlertCircle,
  低: CircleDashed,
  离线: CircleDashed,
  逆向: AlertTriangle,
  补给中: Loader2,
};

export function getStatusIconMeta(
  value: string | number | boolean,
  variant?: LarkTagVariant,
): StatusIconMeta {
  const key = String(value).trim();
  const resolvedVariant = variant ?? resolveVariant(value);
  const Icon = statusIconMap[key] ?? CircleDashed;
  const style = variantStyle[resolvedVariant];

  return {
    Icon,
    variant: resolvedVariant,
    ...style,
  };
}

const spinningStatuses = new Set(["处理中", "训练中", "同步中", "补给中"]);

export function hasStatusIcon(value: string | number | boolean): boolean {
  return Object.hasOwn(statusIconMap, String(value).trim());
}

export function isSpinningStatus(value: string | number | boolean): boolean {
  return spinningStatuses.has(String(value).trim());
}
