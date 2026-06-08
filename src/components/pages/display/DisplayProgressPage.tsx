"use client";

import { Card } from "@arco-design/web-react";
import { ProgressBoard } from "@/components/dashboard/ProgressBoard";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { jobProgress, progressKpis } from "@/lib/mock/dashboard";
import type { StatItem } from "@/lib/types";

function CompactKpiRow({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.key}
          bordered
          className="lark-card-elevated lark-kpi-compact !shadow-none"
        >
          <p className="text-xs leading-5 text-text-secondary">{item.label}</p>
          <p className="mt-0.5 text-lg font-semibold leading-6 text-text-primary">
            {item.value}
            {item.unit ? (
              <span className="ml-1 text-xs font-normal text-text-secondary">
                {item.unit}
              </span>
            ) : null}
          </p>
        </Card>
      ))}
    </div>
  );
}

export function DisplayProgressPage() {
  return (
    <div className="space-y-4">
      <CompactKpiRow items={progressKpis} />
      <ProgressBoard
        items={jobProgress}
        density="compact"
        title={
          <CardTitleWithHint
            title="作业进度看板"
            hint="运行监测 · 全量任务明细与进度追踪"
          />
        }
      />
    </div>
  );
}
