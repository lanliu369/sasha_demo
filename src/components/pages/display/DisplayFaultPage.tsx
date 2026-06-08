"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { faultRecords } from "@/lib/mock/pages";

export function DisplayFaultPage() {
  return (
    <div className="space-y-5">
      <MetricCards moduleKey="display-fault"
        items={[
          { key: "active", label: "活跃故障", value: 1, unit: "条", trend: "down", trendValue: "-1" },
          { key: "today", label: "今日故障", value: 3, unit: "条", trend: "flat", trendValue: "—" },
          { key: "closed", label: "已闭环", value: 2, unit: "条", trend: "up", trendValue: "+1" },
          { key: "mttr", label: "平均修复", value: 18, unit: "min", trend: "down", trendValue: "-5min" },
        ]}
      />
      <DataTableCard
        title="故障监测与追溯"
        data={faultRecords}
        columns={[
          { title: "编号", dataIndex: "id", width: 70 },
          { title: "设备", dataIndex: "device", width: 150 },
          { title: "故障码", dataIndex: "code", width: 90 },
          { title: "描述", dataIndex: "desc" },
          {
            title: "等级",
            dataIndex: "level",
            width: 70,
            render: (v) => <LarkStatusTag value={String(v)} />,
          },
          { title: "时间", dataIndex: "time", width: 80 },
          { title: "根因", dataIndex: "rootCause", width: 140 },
          {
            title: "状态",
            dataIndex: "status",
            width: 90,
            render: (v) => <LarkStatusTag value={String(v)} />,
          },
        ]}
      />
    </div>
  );
}
