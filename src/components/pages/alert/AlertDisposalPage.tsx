"use client";

import { useMemo, useState } from "react";
import { Card } from "@arco-design/web-react";
import { CheckCircle2 } from "lucide-react";
import { AlertStatCards } from "@/components/alert/AlertStatCards";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { DemoPagination } from "@/components/demo/DemoPagination";
import { useClientPagination } from "@/components/demo/useClientPagination";
import { LarkStatusTag, LarkTag } from "@/components/demo/LarkTag";
import { alertRecords } from "@/lib/mock/pages";
import type { AlertRecord } from "@/lib/types/demo";

const pendingAlerts = alertRecords.filter((a) => a.status !== "已关闭");

const severityChart = [
  { label: "严重", value: 1, color: "#F53F3F" },
  { label: "警告", value: 3, color: "#FF7D00" },
  { label: "提示", value: 5, color: "var(--color-brand)" },
  { label: "已关闭", value: 12, color: "var(--color-text-secondary)" },
];

const disposalSteps = [
  { key: "receive", title: "告警接收" },
  { key: "match", title: "方案匹配" },
  { key: "execute", title: "执行处置" },
  { key: "close", title: "闭环归档" },
];

const ACTIVE_STEP = 2;

function levelLabel(level: AlertRecord["level"]) {
  if (level === "high") return "严重";
  if (level === "medium") return "警告";
  return "提示";
}

function levelVariant(level: AlertRecord["level"]) {
  if (level === "high") return "danger" as const;
  if (level === "medium") return "warning" as const;
  return "neutral" as const;
}

function SeverityBarChart() {
  const max = Math.max(...severityChart.map((item) => item.value), 1);

  return (
    <Card
      title="告警分级分布"
      bordered
      className="lark-card-elevated h-full"
    >
      <p className="-mt-1 mb-4 lark-caption">当前周期统计</p>
      <div className="flex flex-col">
        <div className="flex min-h-[160px] items-end justify-around gap-3">
          {severityChart.map((item) => {
            const height = Math.max(8, Math.round((item.value / max) * 100));
            return (
              <div
                key={item.label}
                className="flex min-w-0 flex-1 flex-col items-center justify-end"
              >
                <span className="mb-1 text-xs font-medium tabular-nums text-text-primary">
                  {item.value}
                </span>
                <div
                  className="w-8 rounded-t-md"
                  style={{ height: `${height}px`, backgroundColor: item.color }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-around gap-2 border-t border-border pt-2">
          {severityChart.map((item) => (
            <span
              key={item.label}
              className="min-w-0 flex-1 truncate text-center text-xs text-text-secondary"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

function HorizontalDisposalSteps({ guide }: { guide?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-start">
        {disposalSteps.map((step, index) => {
          const done = index < ACTIVE_STEP;
          const active = index === ACTIVE_STEP;
          const isLast = index === disposalSteps.length - 1;

          return (
            <div key={step.key} className="flex min-w-0 flex-1 items-start">
              <div className="flex min-w-0 flex-1 flex-col items-center px-1">
                <span
                  className={`flex size-5 items-center justify-center rounded-full text-[10px] ${
                    done
                      ? "bg-success text-white"
                      : active
                        ? "bg-brand text-white ring-2 ring-brand/20"
                        : "border border-border bg-card text-text-secondary"
                  }`}
                >
                  {done ? "✓" : active ? "●" : "○"}
                </span>
                <span
                  className={`mt-1 max-w-full truncate text-xs ${
                    active ? "font-medium text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {!isLast ? (
                <div
                  className={`mt-2.5 h-px min-w-3 flex-1 ${
                    index < ACTIVE_STEP ? "bg-success/50" : "bg-border"
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-3 rounded-lg bg-app px-3 py-2 text-sm text-text-primary">
        {guide ?? "暂无处置引导"}
      </p>
    </div>
  );
}

export function AlertDisposalPage() {
  const [selectedId, setSelectedId] = useState(pendingAlerts[0]?.id ?? "");
  const { page, setPage, pageItems, total } = useClientPagination(pendingAlerts);

  const current = useMemo(
    () => pendingAlerts.find((a) => a.id === selectedId) ?? pendingAlerts[0],
    [selectedId],
  );

  const stats = useMemo(
    () => [
      { label: "待处置", value: pendingAlerts.length, unit: "条" },
      {
        label: "高等级",
        value: pendingAlerts.filter((a) => a.level === "high").length,
        unit: "条",
      },
      {
        label: "处理中",
        value: pendingAlerts.filter((a) => a.status === "处理中").length,
        unit: "条",
      },
      {
        label: "今日闭环",
        value: alertRecords.filter((a) => a.status === "已关闭").length,
        unit: "条",
      },
    ],
    [],
  );

  return (
    <div className="space-y-5">
      <AlertStatCards items={stats} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <SeverityBarChart />
        </div>

        <div className="lg:col-span-2">
          {current ? (
            <Card title="当前告警处置" bordered className="lark-card-elevated h-full">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <LarkTag variant={levelVariant(current.level)}>
                  {levelLabel(current.level)}
                </LarkTag>
                <LarkStatusTag value={current.status} />
              </div>
              <p className="text-sm font-medium text-text-primary">{current.title}</p>
              <p className="mt-1 text-xs text-text-secondary">
                来源 {current.source} · {current.time}
              </p>

              <div className="mt-4">
                <HorizontalDisposalSteps guide={current.guide} />
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <DemoActionButton
                  variant="primary"
                  size="sm"
                  icon={CheckCircle2}
                  confirmTitle="确认处置"
                  confirmContent="确认按引导方案完成处置并闭环？"
                  successMessage="告警已处置并闭环（Demo）"
                >
                  确认处置
                </DemoActionButton>
                <DemoActionButton
                  type="text"
                  size="sm"
                  confirmTitle="转派告警"
                  confirmContent="将告警转派给其他岗位处理？"
                  successMessage="已转派（Demo）"
                >
                  转派
                </DemoActionButton>
                <DemoActionButton
                  type="text"
                  size="sm"
                  confirmTitle="升级告警"
                  confirmContent="将告警升级至高等级并通知调度？"
                  successMessage="告警已升级（Demo）"
                >
                  升级
                </DemoActionButton>
              </div>
            </Card>
          ) : (
            <Card bordered className="lark-card-elevated">
              <p className="py-8 text-center text-sm text-text-secondary">
                暂无待处置告警
              </p>
            </Card>
          )}
        </div>
      </div>

      <Card
        title="待处置队列"
        extra={
          <span className="text-xs text-text-secondary">共 {total} 条</span>
        }
        bordered
        className="lark-card-elevated lark-data-table-card"
      >
        <ul>
          {pageItems.map((alert) => {
            const selected = alert.id === current?.id;
            return (
              <li key={alert.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(alert.id)}
                  className={`flex h-12 w-full items-center justify-between gap-3 border-b border-border px-4 text-left transition-colors last:border-b-0 ${
                    selected
                      ? "bg-brand-light"
                      : "bg-card hover:bg-app"
                  }`}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <LarkTag variant={levelVariant(alert.level)} className="shrink-0">
                      {levelLabel(alert.level)}
                    </LarkTag>
                    <span className="truncate text-sm text-text-primary">
                      {alert.title}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden text-xs text-text-secondary sm:inline">
                      {alert.source}
                    </span>
                    <span className="text-xs tabular-nums text-text-secondary">
                      {alert.time}
                    </span>
                    <LarkStatusTag value={alert.status} />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <DemoPagination
          className="border-t border-border px-4 py-2"
          page={page}
          total={total}
          onPageChange={setPage}
        />
      </Card>
    </div>
  );
}
