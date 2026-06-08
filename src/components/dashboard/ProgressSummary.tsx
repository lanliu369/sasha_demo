"use client";

import Link from "next/link";
import { Card, Progress } from "@arco-design/web-react";
import { ArrowRight } from "lucide-react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import type { ProgressItem } from "@/lib/types";

const statusColor: Record<ProgressItem["status"], string> = {
  正常: "#3370FF",
  逆向: "#D97706",
  异常: "#E11D48",
};

type ProgressSummaryProps = {
  items: ProgressItem[];
};

function activeTaskLabel(item: ProgressItem) {
  const active =
    item.tasks?.find((t) => t.status === "进行中" || t.status === "处理中") ??
    item.tasks?.[0];
  if (!active) return null;
  return `${active.id} ${active.title} · ${active.progress}%`;
}

export function ProgressSummary({
  items,
  embedded = false,
}: ProgressSummaryProps & { embedded?: boolean }) {
  const content = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const percent = Math.round((item.current / item.total) * 100);
        const highlight = activeTaskLabel(item);

        return (
          <Link
            key={item.id}
            href="/display/progress"
            className="group rounded-lg border border-border bg-white p-3 transition-colors hover:border-brand/30 hover:bg-brand-light/30"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-text-primary">
                {item.name}
              </span>
              <LarkStatusTag value={item.status} showIcon={false} />
            </div>
            <div className="mb-1.5 flex items-center gap-2">
              <Progress
                percent={percent}
                showText={false}
                color={statusColor[item.status]}
                size="small"
                className="min-w-0 flex-1 [&_.arco-progress-line-outer]:!h-1"
              />
              <span
                className="w-9 shrink-0 text-right text-xs font-medium tabular-nums"
                style={{ color: statusColor[item.status] }}
              >
                {percent}%
              </span>
            </div>
            <p className="text-[11px] text-text-secondary">
              {item.current}/{item.total}
              {item.summary ? ` · ${item.summary.split("·")[0]?.trim()}` : ""}
            </p>
            {highlight ? (
              <p className="mt-1.5 truncate text-[11px] text-brand group-hover:underline">
                当前：{highlight}
              </p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );

  if (embedded) {
    return (
      <Card bordered className="lark-card-elevated !shadow-none">
        {content}
      </Card>
    );
  }

  return (
    <Card
      bordered
      className="lark-card-elevated"
      title={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitleWithHint
            title="作业进度概览"
            hint="驾驶舱摘要 · 详情见运行监测"
          />
          <Link
            href="/display/progress"
            className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
          >
            查看作业进度
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      }
    >
      {content}
    </Card>
  );
}
