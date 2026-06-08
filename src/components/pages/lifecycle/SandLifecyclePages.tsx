"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoFormModal } from "@/components/demo/DemoFormModal";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { SandLifecycleInterfacePage } from "@/components/pages/lifecycle/SandLifecycleInterfacePage";
import {
  lifecycleInterfaces,
  sandProcurements,
  sandSuppliers,
  sandSupplyRecords,
  sandWarehouse,
} from "@/lib/mock/pages";

export function SandSupplierPage() {
  return (
    <DataTableCard
      title="供应商管理"
      data={sandSuppliers}
      extra={
        <DemoFormModal
          buttonText="新建供应商"
          title="新建供应商"
          fields={[
            { name: "name", label: "供应商名称", required: true },
            { name: "contact", label: "联系人", required: true },
            { name: "level", label: "等级", defaultValue: "A" },
          ]}
          successMessage="供应商添加成功（Demo）"
        />
      }
      columns={[
        { title: "编号", dataIndex: "id", width: 70 },
        { title: "供应商", dataIndex: "name" },
        { title: "等级", dataIndex: "level", width: 80 },
        {
          title: "准入",
          dataIndex: "cert",
          width: 90,
          render: (v) => <LarkStatusTag value={String(v)} />,
        },
        { title: "联系人", dataIndex: "contact", width: 90 },
        { title: "更新", dataIndex: "updatedAt", width: 110 },
      ]}
    />
  );
}

export function SandProcurementPage() {
  return (
    <SandLifecycleInterfacePage
      config={lifecycleInterfaces.procurement}
      moduleKey="procurement"
      tableTitle="接口接收 · 采购与验收数据"
      data={sandProcurements}
      columns={[
        { title: "编号", dataIndex: "id", width: 70 },
        { title: "采购单", dataIndex: "order" },
        { title: "砂批次", dataIndex: "batch", width: 120 },
        { title: "供应商", dataIndex: "supplier", width: 100 },
        { title: "对接员工", dataIndex: "handler", width: 110 },
        { title: "数量", dataIndex: "qty", width: 80 },
        {
          title: "验收",
          dataIndex: "accept",
          width: 80,
          render: (v) => <LarkStatusTag value={String(v)} />,
        },
        { title: "同步日期", dataIndex: "date", width: 110 },
      ]}
    />
  );
}

export function SandWarehousePage() {
  return (
    <SandLifecycleInterfacePage
      config={lifecycleInterfaces.warehouse}
      moduleKey="warehouse"
      tableTitle="接口接收 · 仓储与转运数据"
      data={sandWarehouse}
      columns={[
        { title: "编号", dataIndex: "id", width: 70 },
        { title: "批次", dataIndex: "batch", width: 120 },
        { title: "AGV", dataIndex: "agv", width: 80 },
        { title: "起点", dataIndex: "fromLocation", width: 110 },
        { title: "存放库位", dataIndex: "location", width: 130 },
        { title: "库存", dataIndex: "qty", width: 90 },
        { title: "转运", dataIndex: "transit", width: 100 },
        { title: "同步时间", dataIndex: "updatedAt", width: 110 },
      ]}
    />
  );
}

export function SandSupplyPage() {
  return (
    <SandLifecycleInterfacePage
      config={lifecycleInterfaces.supply}
      moduleKey="supply"
      tableTitle="接口接收 · 移动上砂补给数据"
      data={sandSupplyRecords}
      columns={[
        { title: "编号", dataIndex: "id", width: 70 },
        { title: "上砂装置", dataIndex: "device", width: 150 },
        { title: "批次", dataIndex: "batch", width: 130 },
        { title: "计划", dataIndex: "plan", width: 120 },
        { title: "补给量", dataIndex: "qty", width: 90 },
        { title: "余量", dataIndex: "remain", width: 80 },
        {
          title: "状态",
          dataIndex: "status",
          width: 90,
          render: (v) => <LarkStatusTag value={String(v)} />,
        },
      ]}
    />
  );
}
