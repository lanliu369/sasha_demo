"use client";

import Link from "next/link";
import { Card } from "@arco-design/web-react";
import { ArrowRight, Layers, Radio, Settings2 } from "lucide-react";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkTag } from "@/components/demo/LarkTag";
import { CenterScreenMock } from "@/components/pages/display/CenterScreenMock";

const dataSources = [
  { label: "设备状态", active: true },
  { label: "作业进度", active: true },
  { label: "KPI 指标", active: true },
  { label: "告警摘要", active: true },
];

export function DisplayScreenPage() {
  return (
    <div className="space-y-5">
      <MetricCards
        moduleKey="display-screen"
        columns={4}
        items={[
          { key: "sync", label: "同步延迟", value: 120, unit: "ms", trend: "down", trendValue: "-8ms" },
          { key: "device", label: "在线设备", value: 6, unit: "台", trend: "flat", trendValue: "—" },
          { key: "task", label: "进行中作业", value: 3, unit: "项", trend: "up", trendValue: "+1" },
          { key: "alert", label: "活跃告警", value: 2, unit: "条", trend: "down", trendValue: "-1" },
        ]}
      />

      <Card
        title="中心大屏预览"
        bordered
        className="lark-card-elevated"
        extra={
          <Link
            href="/exchange/screen"
            className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
          >
            推送配置
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        }
      >
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_240px]">
          <CenterScreenMock />

          <aside className="flex flex-col gap-3">
            <div className="rounded-lg border border-border bg-app/40 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-text-primary">
                <Settings2 className="size-4 text-brand" aria-hidden />
                推送配置
              </div>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-text-secondary">通道</dt>
                  <dd className="font-medium text-text-primary">WebSocket</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-text-secondary">频率</dt>
                  <dd className="font-medium text-text-primary">2 秒/次</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-text-secondary">布局</dt>
                  <dd className="font-medium text-text-primary">v3.2</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-text-secondary">分辨率</dt>
                  <dd className="font-medium text-text-primary">3840 × 2160</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border border-border bg-app/40 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-text-primary">
                <Layers className="size-4 text-brand" aria-hidden />
                数据源组件
              </div>
              <div className="flex flex-wrap gap-2">
                {dataSources.map((item) => (
                  <LarkTag key={item.label} variant={item.active ? "info" : "neutral"}>
                    {item.label}
                  </LarkTag>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-brand/20 bg-brand-light/50 p-4">
              <div className="flex items-start gap-2">
                <Radio className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <div className="text-xs leading-relaxed text-text-secondary">
                  <p className="font-medium text-text-primary">预览说明</p>
                  <p className="mt-1">
                    左侧为 16:9 大屏布局示意，数据与「中心大屏推送配置」中勾选的组件一致；保存配置后通过 WebSocket 推送至现场大屏。
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Card>
    </div>
  );
}
