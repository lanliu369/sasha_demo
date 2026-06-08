"use client";

import { Card } from "@arco-design/web-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cockpitStats } from "@/lib/mock/dashboard";

export function DashboardCockpit() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {cockpitStats.map((item) => {
        const TrendIcon =
          item.trend === "up"
            ? ArrowUp
            : item.trend === "down"
              ? ArrowDown
              : null;
        return (
          <Card key={item.key} bordered className="lark-card-elevated">
            <p className="lark-caption">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {item.value}
              {item.unit ? (
                <span className="ml-1 text-sm font-normal text-text-secondary">
                  {item.unit}
                </span>
              ) : null}
            </p>
            {item.trendValue && TrendIcon ? (
              <p
                className={`mt-1 flex items-center gap-0.5 text-xs ${
                  item.trend === "up" ? "text-success" : "text-danger"
                }`}
              >
                <TrendIcon className="size-3" />
                {item.trendValue}
              </p>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
