"use client";

import { Tag } from "@arco-design/web-react";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { MetricCards } from "@/components/demo/MetricCards";
import { vehicleSyncSessions } from "@/lib/mock/pages";

export function ProcessVehicleSyncPage() {
  return (
    <div className="space-y-5">
      <MetricCards moduleKey="process-sync"
        items={[
          { key: "active", label: "同步中会话", value: 1, unit: "个", trend: "flat", trendValue: "—" },
          { key: "done", label: "今日完成", value: 12, unit: "次", trend: "up", trendValue: "+2" },
          { key: "latency", label: "平均延迟", value: 108, unit: "ms", trend: "down", trendValue: "-12ms" },
          { key: "fail", label: "校验失败", value: 0, unit: "次", trend: "flat", trendValue: "—" },
        ]}
      />
      <DataTableCard
        title="车地同步会话"
        data={vehicleSyncSessions}
        columns={[
          { title: "会话", dataIndex: "id", width: 80 },
          { title: "列车", dataIndex: "train", width: 80 },
          { title: "上砂装置", dataIndex: "loadingDevice" },
          {
            title: "状态",
            dataIndex: "status",
            width: 90,
            render: (v) => (
              <Tag
                color={
                  v === "同步中" ? "arcoblue" : v === "已完成" ? "green" : "gray"
                }
                className="!rounded-md"
              >
                {String(v)}
              </Tag>
            ),
          },
          { title: "延迟(ms)", dataIndex: "latency", width: 90 },
          { title: "开始", dataIndex: "startTime", width: 80 },
          { title: "包数", dataIndex: "packets", width: 70 },
        ]}
      />
    </div>
  );
}
