"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { DemoFormModal } from "@/components/demo/DemoFormModal";
import { apiKeys } from "@/lib/mock/pages";

export function SystemApiPage() {
  return (
    <DataTableCard
      title="API 密钥"
      data={apiKeys}
      extra={
        <DemoFormModal
          buttonText="创建密钥"
          title="创建 API 密钥"
          fields={[
            { name: "name", label: "名称", required: true },
            { name: "scope", label: "权限范围", defaultValue: "exchange/*" },
          ]}
          successMessage="API 密钥已创建（Demo）"
        />
      }
      columns={[
        { title: "编号", dataIndex: "id", width: 80 },
        { title: "名称", dataIndex: "name", width: 140 },
        { title: "密钥", dataIndex: "key" },
        { title: "范围", dataIndex: "scope", width: 160 },
        { title: "过期", dataIndex: "expires", width: 120 },
        {
          title: "操作",
          key: "actions",
          width: 80,
          render: () => (
            <DemoActionButton
              variant="ghost"
              size="sm"
              direct
              successMessage="密钥已轮换（Demo）"
            >
              轮换
            </DemoActionButton>
          ),
        },
      ]}
    />
  );
}
