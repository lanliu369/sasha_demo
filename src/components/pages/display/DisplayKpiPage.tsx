"use client";

import { Card } from "@arco-design/web-react";
import { MetricCards } from "@/components/demo/MetricCards";
import { SimpleBarChart } from "@/components/demo/SimpleBarChart";
import { kpiItems } from "@/lib/mock/pages";

export function DisplayKpiPage() {
  return (
    <div className="space-y-5">
      <MetricCards moduleKey="display-kpi"
        columns={4}
        items={[
          { key: "complete", label: "综合完成率", value: 94.2, unit: "%", trend: "up", trendValue: "+1.2%" },
          { key: "ontime", label: "任务准时率", value: 95, unit: "%", trend: "flat", trendValue: "—" },
          { key: "quality", label: "检测合格率", value: 97.2, unit: "%", trend: "up", trendValue: "+0.5%" },
          { key: "sync", label: "大屏同步率", value: 99.1, unit: "%", trend: "flat", trendValue: "—" },
        ]}
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SimpleBarChart title="KPI 达成情况" items={kpiItems} />
        <Card title="今日 KPI 摘要" bordered className="lark-card-elevated">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "上砂完成", value: "18/24" },
              { label: "砂处理完成", value: "12/15" },
              { label: "检测批次", value: "36 批" },
              { label: "告警闭环", value: "86%" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border p-4">
                <p className="text-xs text-text-secondary">{item.label}</p>
                <p className="mt-1 text-xl font-semibold text-brand">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
