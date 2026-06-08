"use client";

import { Card } from "@arco-design/web-react";
import { DemoArcoTable } from "@/components/demo/DemoArcoTable";
import type { DemoArcoColumnDef } from "@/lib/ui/demoArcoTable";
import { DEFAULT_PAGE_SIZE } from "@/lib/ui/demoPagination";

export type DataTableColumnDef<T extends object> = DemoArcoColumnDef<T>;

type DataTableCardProps<T extends object> = {
  title: React.ReactNode;
  columns: DataTableColumnDef<T>[];
  data: T[];
  extra?: React.ReactNode;
  rowKey?: string;
  pageSize?: number;
};

export function DataTableCard<T extends object>({
  title,
  columns,
  data,
  extra,
  rowKey = "id",
  pageSize = DEFAULT_PAGE_SIZE,
}: DataTableCardProps<T>) {
  return (
    <Card
      title={title}
      extra={extra}
      bordered
      className="lark-card-elevated lark-data-table-card"
    >
      <DemoArcoTable
        columns={columns}
        data={data}
        rowKey={rowKey}
        pageSize={pageSize}
      />
    </Card>
  );
}
