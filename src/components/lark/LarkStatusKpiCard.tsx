"use client";

import { Card } from "@arco-design/web-react";
import { getStatusIconMeta, isSpinningStatus } from "@/lib/ui/larkStatusIcon";
import type { LarkTagVariant } from "@/lib/ui/larkTag";

type LarkStatusKpiCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  /** 用于匹配状态图标，默认同 label */
  statusKey?: string;
  variant?: LarkTagVariant;
};

/** 飞书风 KPI 卡 — 右侧语义状态图标 */
export function LarkStatusKpiCard({
  label,
  value,
  unit = "项",
  statusKey,
  variant,
}: LarkStatusKpiCardProps) {
  const meta = getStatusIconMeta(statusKey ?? label, variant);
  const Icon = meta.Icon;
  const spin = isSpinningStatus(statusKey ?? label);

  return (
    <Card bordered className="lark-card-elevated">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="lark-caption">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {value}
            {unit ? (
              <span className="ml-1 text-sm font-normal text-text-secondary">
                {unit}
              </span>
            ) : null}
          </p>
        </div>
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${meta.bgClass}`}
        >
          <Icon
            className={`size-5 ${meta.iconClass} ${spin ? "animate-spin" : ""}`}
            strokeWidth={1.75}
            aria-hidden
          />
        </div>
      </div>
    </Card>
  );
}
