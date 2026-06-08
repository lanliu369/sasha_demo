"use client";

import { Card } from "@arco-design/web-react";

export type AlertStatItem = {
  label: string;
  value: string | number;
  unit?: string;
};

type AlertStatCardsProps = {
  items: AlertStatItem[];
  className?: string;
};

/** 预警中心 · 状态统计卡片（与实时告警/规则配置等页统一） */
export function AlertStatCards({ items, className = "" }: AlertStatCardsProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-4 lg:grid-cols-4 ${className}`.trim()}
    >
      {items.map((item) => (
        <Card key={item.label} bordered className="lark-card-elevated">
          <p className="lark-caption">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {item.value}
            {item.unit ? (
              <span className="ml-1 text-sm font-normal text-text-secondary">
                {item.unit}
              </span>
            ) : null}
          </p>
        </Card>
      ))}
    </div>
  );
}
