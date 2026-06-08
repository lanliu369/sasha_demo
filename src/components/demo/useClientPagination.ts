"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_PAGE_SIZE,
  paginateItems,
} from "@/lib/ui/demoPagination";

export function useClientPagination<T>(
  items: T[],
  pageSize: number = DEFAULT_PAGE_SIZE,
  resetKey?: string
) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [resetKey, items.length]);

  const result = useMemo(
    () => paginateItems(items, page, pageSize),
    [items, page, pageSize]
  );

  return {
    ...result,
    setPage,
  };
}
