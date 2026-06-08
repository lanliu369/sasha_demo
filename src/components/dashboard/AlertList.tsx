"use client";

import Link from "next/link";
import { Card } from "@arco-design/web-react";
import { ArrowRight } from "lucide-react";
import { DemoPagination } from "@/components/demo/DemoPagination";
import { useClientPagination } from "@/components/demo/useClientPagination";
import { LarkTag } from "@/components/demo/LarkTag";
import { alertLevelVariant } from "@/lib/ui/larkTag";
import type { AlertItem } from "@/lib/types";

type AlertListProps = {
  alerts: AlertItem[];
  fillHeight?: boolean;
};

const levelLabel: Record<AlertItem["level"], string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export function AlertList({ alerts, fillHeight = false }: AlertListProps) {
  const { page, setPage, pageItems, total } = useClientPagination(alerts);

  return (
    <Card
      title="实时告警"
      extra={
        <Link
          href="/alert/realtime"
          className="inline-flex items-center gap-0.5 text-sm text-brand hover:underline"
        >
          实时告警
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      }
      bordered
      className={`lark-card-elevated w-full ${
        fillHeight
          ? "flex h-full flex-col [&_.arco-card-body]:flex [&_.arco-card-body]:min-h-0 [&_.arco-card-body]:flex-1 [&_.arco-card-body]:flex-col"
          : ""
      }`}
    >
      <ul className={`space-y-3 ${fillHeight ? "min-h-0 flex-1" : ""}`}>
        {pageItems.map((alert) => (
          <li
            key={alert.id}
            className="flex items-start gap-3 rounded-lg border border-border bg-white p-3"
          >
            <LarkTag variant={alertLevelVariant[alert.level]}>
              {levelLabel[alert.level]}
            </LarkTag>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug text-text-primary">
                {alert.title}
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                {alert.source} · {alert.time} · {alert.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <DemoPagination
        className={`border-t border-border pt-3 ${fillHeight ? "mt-auto shrink-0" : "mt-4"}`}
        page={page}
        total={total}
        onPageChange={setPage}
      />
    </Card>
  );
}
