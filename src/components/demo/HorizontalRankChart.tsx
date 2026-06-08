"use client";

import { Card } from "@arco-design/web-react";

type HorizontalRankItem = {
  label: string;
  value: number;
  pct: number;
};

type HorizontalRankChartProps = {
  title: string;
  hint?: string;
  items: HorizontalRankItem[];
};

export function HorizontalRankChart({
  title,
  hint,
  items,
}: HorizontalRankChartProps) {
  const maxPct = Math.max(...items.map((item) => item.pct), 1);

  return (
    <Card bordered className="lark-card-elevated h-full">
      <div className="mb-4">
        <h3 className="text-base font-medium text-text-primary">{title}</h3>
        {hint ? (
          <p className="mt-1 text-xs text-text-secondary">{hint}</p>
        ) : null}
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-text-primary">
                <span className="flex size-5 items-center justify-center rounded bg-[#EBF1FF] text-xs font-medium text-brand">
                  {index + 1}
                </span>
                {item.label}
              </span>
              <span className="tabular-nums text-text-secondary">
                {item.pct}% · {item.value} 次
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#F2F3F5]">
              <div
                className="h-full rounded-full bg-brand transition-all"
                style={{ width: `${(item.pct / maxPct) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
