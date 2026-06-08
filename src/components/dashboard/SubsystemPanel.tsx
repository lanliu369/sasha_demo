"use client";

import Link from "next/link";
import { Card } from "@arco-design/web-react";
import { ArrowRight } from "lucide-react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { LarkTag } from "@/components/demo/LarkTag";
import { subsystemVariant } from "@/lib/ui/larkTag";
import { subsystems, type SubsystemTier } from "@/lib/mock/menu";

const statusConfig = {
  running: { label: "运行中", hint: "数据交互正常" },
  warning: { label: "告警", hint: "存在异常，请关注" },
  offline: { label: "离线", hint: "连接中断" },
};

const tierSections: {
  tier: SubsystemTier;
  title: string;
  hint: string;
}[] = [
  {
    tier: "core",
    title: "核心业务对接",
    hint: "计划 · 车端 · 上砂 · 砂处理 · 作业主链路",
  },
  {
    tier: "display",
    title: "展示与终端",
    hint: "大屏 / 移动端 · 中台数据推送呈现",
  },
  {
    tier: "support",
    title: "检测与辅助",
    hint: "砂品质量 · 辅助数据汇聚",
  },
];

function SubsystemCard({
  sub,
}: {
  sub: (typeof subsystems)[number];
}) {
  const status = statusConfig[sub.status as keyof typeof statusConfig];
  const emphasized = sub.tier === "core";

  return (
    <Link
      href={sub.menuPath}
      className={`group flex items-center justify-between rounded-xl border bg-app/30 p-4 transition-all hover:border-brand/30 hover:bg-brand-light/40 hover:shadow-card ${
        emphasized
          ? "border-brand/20 ring-1 ring-brand/5"
          : "border-border"
      }`}
    >
      <div className="min-w-0">
        <LarkTag variant={subsystemVariant[sub.status as keyof typeof subsystemVariant]}>
          {status.label}
        </LarkTag>
        <p
          className={`mt-2 text-text-primary ${
            emphasized ? "text-sm font-semibold" : "text-sm font-medium"
          }`}
        >
          {sub.name}
        </p>
        <p className="mt-0.5 text-xs text-text-secondary">{sub.role}</p>
        <p
          className={`mt-1 text-[11px] ${
            sub.status === "warning" ? "text-warning" : "text-text-secondary"
          }`}
        >
          {status.hint}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-text-secondary transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
    </Link>
  );
}

export function SubsystemPanel({ embedded = false }: { embedded?: boolean }) {
  const content = (
    <div className="space-y-5">
      {tierSections.map((section) => {
        const items = subsystems.filter((s) => s.tier === section.tier);
        return (
          <section key={section.tier}>
            <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h4 className="text-xs font-medium text-text-primary">
                {section.title}
              </h4>
              <span className="text-[11px] text-text-secondary">
                {section.hint}
              </span>
            </div>
            <div
              className={`grid grid-cols-1 gap-3 ${
                section.tier === "core"
                  ? "sm:grid-cols-2 xl:grid-cols-4"
                  : section.tier === "display"
                    ? "sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:max-w-md"
              }`}
            >
              {items.map((sub) => (
                <SubsystemCard key={sub.key} sub={sub} />
              ))}
            </div>
          </section>
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
            title="外围模块交互概览"
            hint="驾驶舱摘要 · 业务数据见各模块对接页"
          />
          <Link
            href="/exchange/monitor"
            className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
          >
            接口健康监控
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      }
    >
      {content}
    </Card>
  );
}
