"use client";

import { Pagination } from "@arco-design/web-react";
import { DEFAULT_PAGE_SIZE } from "@/lib/ui/demoPagination";

type DemoPaginationProps = {
  page: number;
  total: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
  extra?: React.ReactNode;
};

function formatTotalText(
  total: number,
  page: number,
  pageSize: number,
): string {
  if (total <= 0) return "暂无数据";
  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);
  return `显示 ${rangeStart}-${rangeEnd} 条，共 ${total} 条`;
}

export function DemoPagination({
  page,
  total,
  pageSize = DEFAULT_PAGE_SIZE,
  onPageChange,
  className = "",
  extra,
}: DemoPaginationProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 ${className}`}
    >
      <span className="text-xs text-text-secondary">
        {formatTotalText(total, page, pageSize)}
      </span>
      <div className="ml-auto flex items-center gap-3">
        <Pagination
          current={page}
          total={total}
          pageSize={pageSize}
          size="small"
          hideOnSinglePage={false}
          onChange={(nextPage) => onPageChange(nextPage)}
        />
        {extra}
      </div>
    </div>
  );
}
