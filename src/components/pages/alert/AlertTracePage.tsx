"use client";

import { SimpleBarChart } from "@/components/demo/SimpleBarChart";
import { MetricCards } from "@/components/demo/MetricCards";

export function AlertTracePage() {
  return (
    <div className="space-y-5">
      <MetricCards moduleKey="alert-trace"
        items={[
          { key: "week", label: "本周告警", value: 42, unit: "条", trend: "down", trendValue: "-8" },
          { key: "close", label: "闭环率", value: 95, unit: "%", trend: "up", trendValue: "+2%" },
          { key: "avg", label: "平均处置时长", value: 8, unit: "min", trend: "down", trendValue: "-2min" },
          { key: "repeat", label: "重复告警", value: 3, unit: "条", trend: "down", trendValue: "-1" },
        ]}
      />
      <SimpleBarChart
        title="告警来源分布"
        items={[
          { label: "移动上砂装置", value: 12 },
          { label: "智能砂处理装置", value: 8 },
          { label: "车载设备", value: 10 },
          { label: "砂品监测", value: 5 },
          { label: "接口异常", value: 7 },
        ]}
      />
    </div>
  );
}
