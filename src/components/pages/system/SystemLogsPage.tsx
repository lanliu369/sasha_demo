"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { systemLogs } from "@/lib/mock/pages";

export function SystemLogsPage() {
  return (
    <DataTableCard
      title="操作日志"
      data={systemLogs}
      columns={[
        { title: "编号", dataIndex: "id", width: 80 },
        { title: "时间", dataIndex: "time", width: 100 },
        { title: "操作人", dataIndex: "operator", width: 100 },
        { title: "模块", dataIndex: "module", width: 100 },
        { title: "操作", dataIndex: "action" },
        {
          title: "结果",
          dataIndex: "result",
          width: 80,
          render: (v) => <LarkStatusTag value={String(v)} />,
        },
      ]}
    />
  );
}
