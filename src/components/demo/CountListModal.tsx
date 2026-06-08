"use client";

import { useMemo } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoArcoTable } from "@/components/demo/DemoArcoTable";
import { DemoModal } from "@/components/demo/DemoModal";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { TruncatedText } from "@/components/demo/TruncatedText";
import type { DemoArcoColumnDef } from "@/lib/ui/demoArcoTable";
import type { CountListColumn, CountListConfig } from "@/lib/types/demo";

type CountListModalProps = {
  visible: boolean;
  onClose: () => void;
  config: CountListConfig;
};

const PAGE_SIZE = 10;

function resolveModalWidth(columnCount: number): number {
  if (columnCount >= 8) return 920;
  if (columnCount >= 6) return 840;
  return 720;
}

function renderCell(col: CountListColumn, value: unknown) {
  const text = value == null || value === "" ? "—" : String(value);

  if (col.dataIndex === "status") {
    return <LarkStatusTag value={text} />;
  }

  if (col.dataIndex === "id") {
    return (
      <span className="font-mono text-xs text-text-secondary">{text}</span>
    );
  }

  if (col.dataIndex === "time") {
    return (
      <span className="whitespace-nowrap tabular-nums text-xs text-text-secondary">
        {text}
      </span>
    );
  }

  if (col.dataIndex === "train") {
    return <span className="font-medium text-text-primary">{text}</span>;
  }

  if (
    col.dataIndex === "km" ||
    col.dataIndex === "amount" ||
    col.dataIndex === "latency"
  ) {
    return (
      <span className="whitespace-nowrap tabular-nums text-xs text-text-primary">
        {text}
      </span>
    );
  }

  if (col.dataIndex === "source") {
    return (
      <span
        className="inline-block max-w-[128px] truncate rounded-md bg-slate-500/10 px-1.5 py-0.5 text-xs text-slate-600"
        title={text}
      >
        {text}
      </span>
    );
  }

  if (col.dataIndex === "summary") {
    return (
      <span
        className="block max-w-[200px] truncate text-xs leading-5 text-text-primary"
        title={text}
      >
        {text}
      </span>
    );
  }

  if (col.dataIndex === "model" || col.dataIndex === "version") {
    return (
      <span className="whitespace-nowrap text-xs text-text-primary">{text}</span>
    );
  }

  return (
    <TruncatedText text={text} className="text-xs text-text-primary" title={text} />
  );
}

export function CountListModal({
  visible,
  onClose,
  config,
}: CountListModalProps) {
  const rows = config.data;
  const modalWidth = useMemo(
    () => resolveModalWidth(config.columns.length),
    [config.columns.length],
  );

  const columns = useMemo<DemoArcoColumnDef<Record<string, string | number>>[]>(
    () =>
      config.columns.map((col) => ({
        title: col.title,
        dataIndex: col.dataIndex,
        width: col.width,
        render: (_value, record) => renderCell(col, record[col.dataIndex]),
      })),
    [config.columns],
  );

  return (
    <DemoModal
      open={visible}
      onClose={onClose}
      title={
        <CardTitleWithHint
          title={`${config.title}（共 ${rows.length} 条）`}
          hint={config.desc}
        />
      }
      width={modalWidth}
    >
      <DemoArcoTable
        columns={columns}
        data={rows}
        rowKey="id"
        pageSize={PAGE_SIZE}
      />
    </DemoModal>
  );
}
