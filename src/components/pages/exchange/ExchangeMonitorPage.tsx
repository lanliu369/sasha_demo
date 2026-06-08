"use client";

import Link from "next/link";
import { Card } from "@arco-design/web-react";
import { ArrowRight } from "lucide-react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { interfaceMonitor } from "@/lib/mock/pages";

const tierOrder = ["核心业务", "展示终端", "检测辅助"];

export function ExchangeMonitorPage() {
  const sorted = [...interfaceMonitor].sort(
    (a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier),
  );

  return (
    <div className="space-y-5">
      <Card bordered className="lark-card-elevated">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitleWithHint
              title="接口监控"
              hint="通道级健康监测 · 端点 / QPS / 错误率"
            />
            <p className="mt-2 max-w-3xl text-sm text-text-secondary">
              本页关注<strong className="font-medium text-text-primary">接口通道</strong>
              是否通畅；各模块的业务数据内容与回传详情，请进入
              <Link href="/exchange/dispatch" className="mx-1 text-brand hover:underline">
                模块对接
              </Link>
              对应子页查看。
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1 text-sm text-brand hover:underline"
          >
            返回驾驶舱概览
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </Card>

      <MetricCards
        moduleKey="monitor"
        columns={3}
        items={[
          { key: "total", label: "接口总数", value: 7, unit: "个", trend: "flat", trendValue: "—" },
          { key: "ok", label: "健康接口", value: 6, unit: "个", trend: "flat", trendValue: "—" },
          { key: "warn", label: "异常接口", value: 1, unit: "个", trend: "flat", trendValue: "—" },
        ]}
      />

      <DataTableCard
        title={
          <CardTitleWithHint
            title="各模块接口健康度"
            hint="按模块层级排序 · 核心业务优先"
          />
        }
        data={sorted}
        columns={[
          {
            title: "层级",
            dataIndex: "tier",
            width: 100,
            render: (v) => (
              <span
                className={`text-xs ${
                  v === "核心业务"
                    ? "font-medium text-brand"
                    : "text-text-secondary"
                }`}
              >
                {String(v)}
              </span>
            ),
          },
          { title: "模块", dataIndex: "module", width: 140 },
          {
            title: "端点",
            dataIndex: "endpoint",
            render: (v) => (
              <span className="font-mono text-[13px] text-text-secondary">
                {String(v)}
              </span>
            ),
          },
          {
            title: "健康",
            dataIndex: "health",
            width: 100,
            render: (v) => <LarkStatusTag value={String(v)} />,
          },
          { title: "QPS", dataIndex: "qps", width: 70 },
          { title: "错误", dataIndex: "errors", width: 70 },
        ]}
      />
    </div>
  );
}
