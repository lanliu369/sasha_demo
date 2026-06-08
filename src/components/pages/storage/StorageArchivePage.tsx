"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { archivePolicies } from "@/lib/mock/pages";

export function StorageArchivePage() {
  const totalUsed = "259 GB";

  return (
    <div className="space-y-5">
      <MetricCards moduleKey="storage"
        items={[
          { key: "used", label: "已用存储", value: totalUsed, trend: "up", trendValue: "+2GB" },
          { key: "policies", label: "归档策略", value: 3, unit: "条", trend: "flat", trendValue: "—" },
          { key: "today", label: "今日归档", value: 128, unit: "MB", trend: "up", trendValue: "+12MB" },
          { key: "health", label: "存储健康", value: "正常", trend: "flat", trendValue: "—" },
        ]}
      />
      <DataTableCard
        title="归档策略"
        data={archivePolicies}
        columns={[
          { title: "编号", dataIndex: "id", width: 70 },
          { title: "数据类型", dataIndex: "name" },
          { title: "保留期", dataIndex: "retention", width: 100 },
          { title: "存储", dataIndex: "storage", width: 100 },
          { title: "已用", dataIndex: "used", width: 90 },
          {
            title: "状态",
            dataIndex: "status",
            width: 80,
            render: (v) => <LarkStatusTag value={String(v)} />,
          },
        ]}
      />
    </div>
  );
}
