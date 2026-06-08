"use client";

import { Table } from "@arco-design/web-react";
import type { TableProps } from "@arco-design/web-react";
import {
  type DemoArcoColumnDef,
  demoArcoTableShellClass,
  getArcoScrollWidth,
  normalizeArcoColumns,
} from "@/lib/ui/demoArcoTable";
import {
  DEFAULT_PAGE_SIZE,
  getTablePagination,
} from "@/lib/ui/demoPagination";

type DemoArcoTableProps<T extends object> = {
  columns: DemoArcoColumnDef<T>[];
  data: T[];
  rowKey?: string;
  pageSize?: number;
  pagination?: boolean;
  scrollX?: number;
  className?: string;
  onRow?: TableProps<T>["onRow"];
  rowClassName?: TableProps<T>["rowClassName"];
};

export function DemoArcoTable<T extends object>({
  columns,
  data,
  rowKey = "id",
  pageSize = DEFAULT_PAGE_SIZE,
  pagination = true,
  scrollX,
  className = "",
  onRow,
  rowClassName,
}: DemoArcoTableProps<T>) {
  const tableColumns = normalizeArcoColumns(columns);

  const computedScrollX = scrollX ?? getArcoScrollWidth(columns);

  return (
    <div className={`${demoArcoTableShellClass} ${className}`.trim()}>
      <Table
        columns={tableColumns}
        data={data}
        rowKey={rowKey}
        size="small"
        border={false}
        stripe={false}
        tableLayoutFixed
        scroll={computedScrollX > 0 ? { x: computedScrollX } : undefined}
        pagination={pagination ? getTablePagination(pageSize) : false}
        onRow={onRow}
        rowClassName={rowClassName}
      />
    </div>
  );
}
