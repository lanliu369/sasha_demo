"use client";

import { Card } from "@arco-design/web-react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import type { ChartBarItem } from "@/lib/types/demo";

type SimpleBarChartProps = {
  title: string;
  hint?: string;
  /** 统一量纲说明，如「条/次」 */
  unit?: string;
  items: ChartBarItem[];
  /** 柱区域高度 px */
  height?: number;
};

function resolveBarHeight(item: ChartBarItem, sharedMax: number) {
  const cap = item.max ?? sharedMax;
  if (cap <= 0) return 0;
  return Math.min(100, Math.round((item.value / cap) * 100));
}

function formatBarValue(item: ChartBarItem) {
  if (item.max === 100 && item.value <= 100) {
    return `${item.value}%`;
  }
  return String(item.value);
}

export function SimpleBarChart({
  title,
  hint,
  unit,
  items,
  height = 160,
}: SimpleBarChartProps) {
  const sharedMax = Math.max(...items.map((i) => i.max ?? i.value), 1);

  return (
    <Card
      title={
        hint || unit ? (
          <CardTitleWithHint
            title={title}
            hint={
              hint ??
              (unit ? `统一量纲：${unit}，柱高按同一比例尺对比` : undefined)
            }
          />
        ) : (
          title
        )
      }
      bordered
      className="lark-card-elevated"
    >
      <div
        className="relative rounded-lg bg-app/50 px-4 pt-6"
        style={{ paddingBottom: 12 }}
      >
        {/* Y 轴参考线 */}
        <div
          className="pointer-events-none absolute inset-x-4 top-6 border-b border-dashed border-border"
          style={{ bottom: 48 }}
        />
        <div
          className="pointer-events-none absolute inset-x-4 border-b border-dashed border-border/60"
          style={{ bottom: 48 + height * 0.5 }}
        />
        <div
          className="pointer-events-none absolute inset-x-4 border-b border-dashed border-border/40"
          style={{ bottom: 48 + height * 0.25 }}
        />

        <div
          className="flex items-end justify-around gap-2"
          style={{ height, marginBottom: 36 }}
        >
          {items.map((item) => {
            const pct = resolveBarHeight(item, sharedMax);
            const barHeight = pct > 0 ? Math.max(pct, 3) : 0;

            return (
              <div
                key={item.label}
                className="flex min-w-0 flex-1 flex-col items-center justify-end"
                style={{ height: "100%" }}
              >
                <span className="mb-1.5 text-xs font-medium tabular-nums text-text-primary">
                  {formatBarValue(item)}
                </span>
                <div
                  className="flex w-full max-w-12 flex-1 items-end justify-center"
                  style={{ minHeight: 0 }}
                >
                  <div
                    className="w-8 rounded-t-md bg-brand transition-all"
                    style={{
                      height: `${barHeight}%`,
                      minHeight: barHeight > 0 ? 4 : 0,
                    }}
                    title={`${item.label}: ${formatBarValue(item)}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-around gap-2 border-t border-border pt-2">
          {items.map((item) => (
            <span
              key={item.label}
              className="min-w-0 flex-1 truncate text-center text-xs text-text-secondary"
              title={item.label}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
