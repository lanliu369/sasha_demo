"use client";

import { useMemo } from "react";
import { DemoArcoTable } from "@/components/demo/DemoArcoTable";
import { DemoModal } from "@/components/demo/DemoModal";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { TruncatedText } from "@/components/demo/TruncatedText";
import type { DemoArcoColumnDef } from "@/lib/ui/demoArcoTable";
import type { SyncLogItem } from "@/lib/types/demo";

const PAGE_SIZE = 10;

type SyncLogsModalProps = {
  open: boolean;
  onClose: () => void;
  data: SyncLogItem[];
  title?: string;
};

const columns: DemoArcoColumnDef<SyncLogItem>[] = [
  {
    title: "时间",
    dataIndex: "time",
    width: 100,
    render: (value) => (
      <span className="text-xs tabular-nums text-text-secondary">
        {String(value)}
      </span>
    ),
  },
  {
    title: "方向",
    dataIndex: "direction",
    width: 80,
    render: (value) => <span className="text-xs">{String(value)}</span>,
  },
  {
    title: "数据类型",
    dataIndex: "dataType",
    width: 240,
    render: (value) => <TruncatedText text={String(value)} className="text-xs" />,
  },
  {
    title: "大小",
    dataIndex: "size",
    width: 90,
    render: (value) => <span className="text-xs">{String(value)}</span>,
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 80,
    render: (value) => <LarkStatusTag value={String(value)} />,
  },
];

export function SyncLogsModal({
  open,
  onClose,
  data,
  title = "最近推送记录",
}: SyncLogsModalProps) {
  return (
    <DemoModal
      open={open}
      onClose={onClose}
      title={`${title}（共 ${data.length} 条）`}
      width={760}
    >
      <DemoArcoTable
        columns={columns}
        data={data}
        rowKey="id"
        pageSize={PAGE_SIZE}
      />
    </DemoModal>
  );
}
