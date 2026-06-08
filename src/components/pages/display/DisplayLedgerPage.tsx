"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { deviceLedger } from "@/lib/mock/pages";

export function DisplayLedgerPage() {
  return (
    <div className="space-y-5">
      <MetricCards moduleKey="display-ledger"
        items={[
          { key: "total", label: "台账设备", value: deviceLedger.length, unit: "台", trend: "flat", trendValue: "—" },
          { key: "running", label: "运行中", value: 3, unit: "台", trend: "flat", trendValue: "—" },
          { key: "due", label: "待保养", value: 1, unit: "台", trend: "flat", trendValue: "—" },
          { key: "rate", label: "完好率", value: 100, unit: "%", trend: "flat", trendValue: "—" },
        ]}
      />
      <DataTableCard
        title="设备台账"
        data={deviceLedger}
        columns={[
          { title: "编号", dataIndex: "id", width: 80 },
          { title: "设备名称", dataIndex: "name" },
          { title: "类型", dataIndex: "type", width: 100 },
          { title: "厂商", dataIndex: "vendor", width: 100 },
          { title: "安装日期", dataIndex: "installDate", width: 110 },
          { title: "保养周期", dataIndex: "maintainCycle", width: 90 },
          { title: "上次保养", dataIndex: "lastMaintain", width: 110 },
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
