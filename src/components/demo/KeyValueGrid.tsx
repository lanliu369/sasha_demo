"use client";

import type { ReactNode } from "react";
import { Card } from "@arco-design/web-react";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { TruncatedText } from "@/components/demo/TruncatedText";
import type { DataFieldUnit } from "@/lib/types/demo";

type KeyValueItem = {
  label: string;
  value: string;
  updatedAt?: string;
  units?: DataFieldUnit[];
};

type KeyValueGridProps = {
  title: string;
  items: KeyValueItem[];
  columns?: 2 | 3;
  /** 标题行右侧工具区（如数据流切换） */
  headerExtra?: ReactNode;
};

function DeviceUnitsList({ units }: { units: DataFieldUnit[] }) {
  return (
    <ul className="mt-2 space-y-2">
      {units.map((unit) => (
        <li
          key={unit.id}
          className="flex items-start justify-between gap-2 rounded-md border border-border/70 bg-white px-2.5 py-2"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-text-primary">
                {unit.name}
              </span>
              <LarkStatusTag value={unit.status} />
            </div>
            <p className="mt-0.5 truncate text-xs text-text-secondary">
              {unit.detail}
            </p>
          </div>
          <span className="shrink-0 text-[11px] tabular-nums text-text-secondary">
            {unit.updatedAt}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function KeyValueGrid({
  title,
  items,
  columns = 2,
  headerExtra,
}: KeyValueGridProps) {
  const gridClass = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <Card
      title={title}
      extra={
        headerExtra ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-normal">
            {headerExtra}
          </div>
        ) : undefined
      }
      bordered
      className="lark-card-elevated"
    >
      <div className={`grid grid-cols-1 gap-3 ${gridClass}`}>
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-lg border border-border bg-app/50 px-4 py-3 ${
              item.units?.length ? "md:col-span-2" : ""
            }`}
          >
            <p className="text-xs text-text-secondary">{item.label}</p>
            <p className="mt-1 text-sm font-medium text-text-primary">
              <TruncatedText text={item.value} title={item.value} />
            </p>

            {item.units && item.units.length > 0 ? (
              <DeviceUnitsList units={item.units} />
            ) : null}

            {item.updatedAt && !item.units?.length ? (
              <p className="mt-1 text-xs text-text-secondary">
                更新 {item.updatedAt}
              </p>
            ) : item.updatedAt && item.units?.length ? (
              <p className="mt-2 text-xs text-text-secondary">
                汇总更新 {item.updatedAt}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
