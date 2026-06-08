"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoFormModal } from "@/components/demo/DemoFormModal";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { users } from "@/lib/mock/pages";

export function SystemUsersPage() {
  return (
    <DataTableCard
      title="用户列表"
      data={users}
      extra={
        <DemoFormModal
          buttonText="新增用户"
          title="新增用户"
          fields={[
            { name: "name", label: "姓名", required: true },
            { name: "role", label: "角色", defaultValue: "调度员" },
            { name: "department", label: "部门", defaultValue: "运调中心" },
          ]}
          successMessage="用户已创建（Demo）"
        />
      }
      columns={[
        { title: "编号", dataIndex: "id", width: 80 },
        { title: "姓名", dataIndex: "name", width: 100 },
        { title: "角色", dataIndex: "role", width: 100 },
        { title: "部门", dataIndex: "department", width: 120 },
        {
          title: "状态",
          dataIndex: "status",
          width: 80,
          render: (v) => <LarkStatusTag value={String(v)} />,
        },
        { title: "最近登录", dataIndex: "lastLogin", width: 160 },
      ]}
    />
  );
}
