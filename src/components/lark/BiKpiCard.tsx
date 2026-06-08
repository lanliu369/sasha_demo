"use client";

import { Card } from "@arco-design/web-react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

type BiKpiCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "flat";
  trendValue?: string;
  active?: boolean;
  onClick?: () => void;
};

const trendConfig = {
  up: { icon: ArrowUp, className: "text-success" },
  down: { icon: ArrowDown, className: "text-danger" },
  flat: { icon: Minus, className: "text-text-secondary" },
} as const;

/** 飞书 BI 风格 KPI 卡 — 支持点击钻取 */
export function BiKpiCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  active,
  onClick,
}: BiKpiCardProps) {
  const trendMeta = trend ? trendConfig[trend] : null;
  const TrendIcon = trendMeta?.icon;

  return (
    <Card
      bordered
      className={`lark-card-elevated transition-all ${
        onClick ? "cursor-pointer hover:border-brand/40" : ""
      } ${active ? "!border-brand !shadow-[0_4px_16px_rgba(51,112,255,0.12)]" : ""}`}
      onClick={onClick}
    >
      <p className="lark-caption">{label}</p>
      <p className="mt-2 text-[28px] font-semibold leading-none text-text-primary">
        {value}
        {unit ? (
          <span className="ml-1 text-sm font-normal text-text-secondary">
            {unit}
          </span>
        ) : null}
      </p>
      {trend && TrendIcon && trendValue ? (
        <p className={`mt-2 flex items-center gap-0.5 text-xs ${trendMeta.className}`}>
          <TrendIcon className="size-3" />
          {trendValue}
        </p>
      ) : null}
      {onClick ? (
        <p className="mt-2 text-xs text-brand">点击钻取明细</p>
      ) : null}
    </Card>
  );
}
