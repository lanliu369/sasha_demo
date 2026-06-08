"use client";

import { Card, Progress } from "@arco-design/web-react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";

type QualityMetric = {
  label: string;
  value: number;
  unit: string;
  max?: number;
  format?: "percent" | "value";
};

type AnalysisQualityPanelProps = {
  title?: string;
  hint?: string;
  items: QualityMetric[];
};

export function AnalysisQualityPanel({
  title = "质量指标",
  hint = "比率与均值各自量纲，不与计数类指标同图对比",
  items,
}: AnalysisQualityPanelProps) {
  return (
    <Card
      title={<CardTitleWithHint title={title} hint={hint} />}
      bordered
      className="lark-card-elevated"
    >
      <div className="space-y-5">
        {items.map((item) => {
          if (item.format === "percent" || item.unit === "%") {
            const max = item.max ?? 100;
            return (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-text-primary">{item.label}</span>
                  <span className="font-medium tabular-nums text-text-primary">
                    {item.value}
                    {item.unit}
                  </span>
                </div>
                <Progress
                  percent={Math.min(100, Math.round((item.value / max) * 100))}
                  size="small"
                  color="#3370FF"
                  showText={false}
                />
              </div>
            );
          }

          return (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-app/40 px-4 py-3"
            >
              <p className="text-xs text-text-secondary">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-text-primary">
                {item.value}
                <span className="ml-1 text-sm font-normal text-text-secondary">
                  {item.unit}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
