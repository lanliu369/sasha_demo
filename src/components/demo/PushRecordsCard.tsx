"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { TruncatedText } from "@/components/demo/TruncatedText";
import type { DataTableColumnDef } from "@/components/demo/DataTableCard";
import type { PushRecordItem, SyncLogItem } from "@/lib/types/demo";

const columns: DataTableColumnDef<PushRecordItem>[] = [
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
    title: "推送组件",
    dataIndex: "widgets",
    render: (value) => <TruncatedText text={String(value)} className="text-xs" />,
  },
  {
    title: "布局版本",
    dataIndex: "layout",
    width: 90,
    render: (value) => <span className="text-xs">{String(value)}</span>,
  },
  {
    title: "数据量",
    dataIndex: "size",
    width: 90,
    render: (value) => <span className="text-xs">{String(value)}</span>,
  },
  {
    title: "延迟",
    dataIndex: "latency",
    width: 90,
    render: (value) => (
      <span className="text-xs tabular-nums">{String(value)}</span>
    ),
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 80,
    render: (value) => <LarkStatusTag value={String(value)} />,
  },
];

export function pushRecordsToSyncLogs(records: PushRecordItem[]): SyncLogItem[] {
  return records.map((record) => ({
    id: record.id,
    time: record.time,
    direction: "下行",
    dataType: record.widgets,
    size: record.size,
    status: record.status,
  }));
}

type PushRecordsCardProps = {
  records: PushRecordItem[];
  channelLabel?: string;
};

export function PushRecordsCard({
  records,
  channelLabel = "WebSocket",
}: PushRecordsCardProps) {
  return (
    <DataTableCard
      title={
        <CardTitleWithHint
          title="推送记录"
          hint={`${channelLabel} 下行推送 · 共 ${records.length} 条`}
        />
      }
      columns={columns}
      data={records}
      rowKey="id"
      pageSize={8}
    />
  );
}
