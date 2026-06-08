"use client";

import type { TableColumnProps } from "@arco-design/web-react";
import {
  TruncatedText,
  formatTableCellText,
} from "@/components/demo/TruncatedText";

export const demoArcoTableShellClass =
  "lark-table demo-table-flat overflow-hidden bg-card";

export const DEFAULT_ARCO_COL_WIDTH = 96;
const CELL_X_PADDING = 16;

export type DemoArcoColumnDef<T extends object> = {
  title: string;
  dataIndex?: string;
  key?: string;
  width?: number;
  render?: (value: unknown, record: T) => React.ReactNode;
};

export function normalizeArcoColumns<T extends object>(
  columns: DemoArcoColumnDef<T>[],
): TableColumnProps<T>[] {
  return columns.map((col, index) => {
    const width = col.width ?? DEFAULT_ARCO_COL_WIDTH;
    const dataIndex = col.dataIndex as TableColumnProps<T>["dataIndex"];
    const userRender = col.render;

    return {
      title: col.title,
      dataIndex,
      width,
      key: col.key ?? (col.dataIndex ? `${col.dataIndex}-${index}` : `col-${index}`),
      headerCellStyle: { whiteSpace: "nowrap" },
      bodyCellStyle: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: width,
      },
      render: (value: unknown, record: T) => {
        if (userRender) {
          return userRender(value, record);
        }

        const text = formatTableCellText(value);
        return (
          <TruncatedText
            text={text}
            className="lark-table-cell-text"
            title={text}
          />
        );
      },
    };
  });
}

export function getArcoScrollWidth<T extends object>(
  columns: DemoArcoColumnDef<T>[],
): number {
  return columns.reduce(
    (sum, col) => sum + (col.width ?? DEFAULT_ARCO_COL_WIDTH),
    CELL_X_PADDING,
  );
}
