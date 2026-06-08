"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoFormModal } from "@/components/demo/DemoFormModal";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { exportJobs } from "@/lib/mock/pages";

export function StorageExportPage() {
  return (
    <DataTableCard
      title="导出任务"
      data={exportJobs}
      extra={
        <DemoFormModal
          buttonText="新建导出"
          title="新建导出任务"
          fields={[
            { name: "name", label: "任务名称", required: true },
            { name: "format", label: "格式", defaultValue: "CSV" },
            { name: "range", label: "数据范围", defaultValue: "近 7 日作业数据" },
          ]}
          successMessage="导出任务已创建（Demo）"
        />
      }
      columns={[
        { title: "编号", dataIndex: "id", width: 80 },
        { title: "任务名称", dataIndex: "name" },
        { title: "格式", dataIndex: "format", width: 80 },
        { title: "范围", dataIndex: "range", width: 180 },
        {
          title: "状态",
          dataIndex: "status",
          width: 90,
          render: (v) => <LarkStatusTag value={String(v)} />,
        },
        { title: "时间", dataIndex: "time", width: 80 },
      ]}
    />
  );
}
