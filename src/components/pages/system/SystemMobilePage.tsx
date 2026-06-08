"use client";

import { useMemo, useState } from "react";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { DemoButton } from "@/components/demo/DemoButton";
import { MobilePermissionFormModal } from "@/components/system/MobilePermissionFormModal";
import { formatMobilePermissionList } from "@/lib/demo/mobilePermissionOptions";
import { mobilePermissions as initialPermissions } from "@/lib/mock/pages";
import type { MobilePermissionRecord } from "@/lib/types/demo";

export function SystemMobilePage() {
  const [permissionList, setPermissionList] =
    useState<MobilePermissionRecord[]>(initialPermissions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MobilePermissionRecord | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (record: MobilePermissionRecord) => {
    setEditing(record);
    setModalOpen(true);
  };

  const handleSave = (record: MobilePermissionRecord) => {
    setPermissionList((prev) => {
      const exists = prev.some((item) => item.id === record.id);
      if (exists) {
        return prev.map((item) => (item.id === record.id ? record : item));
      }
      return [...prev, record];
    });
  };

  const handleDelete = (id: string) => {
    setPermissionList((prev) => prev.filter((item) => item.id !== id));
  };

  const columns = useMemo(
    () => [
      { title: "岗位", dataIndex: "role" as const, width: 100 },
      {
        title: "可见数据",
        dataIndex: "viewItems" as const,
        render: (value: unknown) =>
          formatMobilePermissionList(value as string[]),
      },
      {
        title: "可下发指令",
        dataIndex: "commandItems" as const,
        width: 180,
        render: (value: unknown) =>
          formatMobilePermissionList(value as string[]),
      },
      { title: "终端范围", dataIndex: "devices" as const, width: 140 },
      {
        title: "操作",
        dataIndex: "id" as const,
        width: 120,
        render: (_: unknown, record: MobilePermissionRecord) => (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="text-sm text-brand hover:underline"
              onClick={() => openEdit(record)}
            >
              编辑
            </button>
            <DemoActionButton
              variant="ghost"
              size="sm"
              confirmTitle="删除岗位策略"
              confirmContent={`确认删除「${record.role}」的移动设备权限策略？`}
              successMessage="策略已删除（Demo）"
              onConfirm={() => handleDelete(record.id)}
            >
              删除
            </DemoActionButton>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <DataTableCard
        title="移动设备岗位权限策略"
        data={permissionList}
        rowKey="id"
        extra={
          <DemoButton variant="primary" size="sm" onClick={openCreate}>
            新增策略
          </DemoButton>
        }
        columns={columns}
      />

      <MobilePermissionFormModal
        open={modalOpen}
        editing={editing}
        existingRecords={permissionList}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
      />
    </>
  );
}
