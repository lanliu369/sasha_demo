"use client";

import type { ReactNode } from "react";
import { Card } from "@arco-design/web-react";
import { Clock } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { ExchangeModuleConfig } from "@/lib/types/demo";

type ConnectionHeaderProps = {
  config: Pick<
    ExchangeModuleConfig,
    "moduleName" | "status" | "lastSync"
  >;
  extra?: ReactNode;
};

export function ConnectionHeader({ config, extra }: ConnectionHeaderProps) {
  return (
    <Card bordered className="lark-card-elevated">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="lark-module-title">{config.moduleName}</h3>
          <StatusBadge status={config.status} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Clock className="size-4 shrink-0 text-text-secondary" aria-hidden />
          <span className="text-sm leading-5 text-text-secondary">最近同步</span>
          <span className="text-sm leading-5 text-text-primary">{config.lastSync}</span>
          {extra}
        </div>
      </div>
    </Card>
  );
}
