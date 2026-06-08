import type { PaginationProps } from "@arco-design/web-react";

export const DEFAULT_PAGE_SIZE = 5;

export function getTablePagination(
  pageSize: number = DEFAULT_PAGE_SIZE
): PaginationProps {
  return {
    pageSize,
    size: "small",
    showTotal: (total, range) =>
      total > 0 && range
        ? `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`
        : "暂无数据",
    hideOnSinglePage: false,
    sizeCanChange: false,
  };
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE
) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const rangeStart = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = Math.min(safePage * pageSize, total);
  const pageItems = items.slice(rangeStart - 1, rangeEnd);

  return {
    page: safePage,
    totalPages,
    total,
    pageSize,
    rangeStart,
    rangeEnd,
    pageItems,
  };
}
