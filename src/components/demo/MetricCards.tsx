"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { getCountList } from "@/lib/mock/countLists";
import type { MetricItem } from "@/lib/types/demo";

type MetricCardsProps = {
  items: MetricItem[];
  columns?: 2 | 3 | 4;
  moduleKey?: string;
};

export function MetricCards({ items, columns = 4, moduleKey }: MetricCardsProps) {
  const gridClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 xl:grid-cols-4";

  return (
    <div className={`grid grid-cols-1 gap-4 ${gridClass}`}>
      {items.map((item) => {
        const listKey = moduleKey ? `${moduleKey}:${item.key}` : undefined;
        const countList = listKey ? getCountList(listKey, item) : undefined;

        return (
          <StatCard key={item.key} item={item} countList={countList} />
        );
      })}
    </div>
  );
}
