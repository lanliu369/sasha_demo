"use client";

import { Card } from "@arco-design/web-react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoArcoTable } from "@/components/demo/DemoArcoTable";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { TruncatedText } from "@/components/demo/TruncatedText";
import type { DemoArcoColumnDef } from "@/lib/ui/demoArcoTable";

type QueuePreviewCardProps = {
  title: string;
  items: Record<string, string | number>[];
  previewColumns: { label: string; key: string }[];
  selectedRowId?: string;
  onRowSelect?: (row: Record<string, string | number>) => void;
  selectableHint?: string;
  pageSize?: number;
};

export function QueuePreviewCard({
  title,
  items,
  previewColumns,
  selectedRowId,
  onRowSelect,
  selectableHint,
  pageSize = 5,
}: QueuePreviewCardProps) {
  const columns: DemoArcoColumnDef<Record<string, string | number>>[] = [
    ...previewColumns.map((col) => ({
      title: col.label,
      dataIndex: col.key,
      width: 120,
      render: (value: unknown) => (
        <TruncatedText text={String(value ?? "—")} className="lark-table-cell-text" />
      ),
    })),
    {
      title: "状态",
      dataIndex: "status",
      width: 90,
      render: (value: unknown) => <LarkStatusTag value={String(value)} />,
    },
  ];

  return (
    <Card
      title={<CardTitleWithHint title={title} hint={selectableHint} />}
      bordered
      className="lark-card-elevated lark-data-table-card"
    >
      <DemoArcoTable
        columns={columns}
        data={items}
        rowKey="id"
        pageSize={pageSize}
        onRow={
          onRowSelect
            ? (record) => ({
                onClick: () => onRowSelect(record),
                style: { cursor: "pointer" },
              })
            : undefined
        }
        rowClassName={(record) =>
          selectedRowId === String(record.id)
            ? "demo-arco-table-row-selected"
            : ""
        }
      />
    </Card>
  );
}
