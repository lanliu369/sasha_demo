"use client";

import { useState } from "react";
import { Card } from "@arco-design/web-react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { CountListModal } from "@/components/demo/CountListModal";
import { LarkTag } from "@/components/demo/LarkTag";
import type { CountListConfig } from "@/lib/types/demo";
import type { StatItem } from "@/lib/types";

type StatCardProps = {
  item: StatItem;
  countList?: CountListConfig;
};

const trendConfig = {
  up: { icon: ArrowUp, className: "text-success" },
  down: { icon: ArrowDown, className: "text-danger" },
  flat: { icon: Minus, className: "text-text-secondary" },
} as const;

export function StatCard({ item, countList }: StatCardProps) {
  const [listOpen, setListOpen] = useState(false);
  const trend = item.trend ? trendConfig[item.trend] : null;
  const TrendIcon = trend?.icon;
  const clickable = Boolean(countList && countList.data.length > 0);

  return (
    <>
      <Card
        bordered
        className={`lark-card-elevated ${
          clickable
            ? "cursor-pointer transition-all hover:border-brand/30 hover:shadow-card-hover"
            : ""
        }`}
        onClick={clickable ? () => setListOpen(true) : undefined}
      >
        <p className="lark-caption">{item.label}</p>
        <div className="mt-2 flex items-start justify-between gap-2">
          <p className="text-[28px] font-semibold leading-none text-text-primary">
            {item.value}
            {item.unit ? (
              <span className="ml-1 text-sm font-normal text-text-secondary">
                {item.unit}
              </span>
            ) : null}
          </p>
          {trend && TrendIcon && item.trendValue ? (
            <LarkTag
              variant={
                item.trend === "up"
                  ? "success"
                  : item.trend === "down"
                    ? "danger"
                    : "neutral"
              }
              className="shrink-0"
            >
              <span className="flex items-center gap-0.5">
                <TrendIcon className="h-3 w-3" />
                {item.trendValue}
              </span>
            </LarkTag>
          ) : null}
        </div>
        {clickable ? (
          <p className="mt-2 text-xs text-brand">点击查看明细</p>
        ) : null}
      </Card>
      {countList ? (
        <CountListModal
          visible={listOpen}
          onClose={() => setListOpen(false)}
          config={countList}
        />
      ) : null}
    </>
  );
}
