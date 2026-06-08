"use client";

import { Card, Radio } from "@arco-design/web-react";
import { MessageSquare, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { AlertStatCards } from "@/components/alert/AlertStatCards";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoButton } from "@/components/demo/DemoButton";
import { LarkStatusTag, LarkTag } from "@/components/demo/LarkTag";
import { demoToastInfo, demoToastSuccess } from "@/components/demo/demoToast";
import { alertLevelVariant } from "@/lib/ui/larkTag";
import { alertRecords } from "@/lib/mock/pages";
import type { AlertRecord } from "@/lib/types/demo";

type ViewMode = "feed" | "list";

const levelGroups: {
  key: AlertRecord["level"];
  label: string;
  accent: string;
}[] = [
  { key: "high", label: "严重", accent: "border-l-rose-500" },
  { key: "medium", label: "警告", accent: "border-l-amber-500" },
  { key: "low", label: "提示", accent: "border-l-slate-400" },
];

const levelLabel: Record<string, string> = {
  high: "严重",
  medium: "警告",
  low: "提示",
};

function AlertFeedCard({ alert }: { alert: AlertRecord }) {
  return (
    <Card
      bordered
      className={`lark-card-elevated border-l-4 ${
        alert.level === "high"
          ? "border-l-rose-500"
          : alert.level === "medium"
            ? "border-l-amber-500"
            : "border-l-slate-400"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <LarkTag variant={alertLevelVariant[alert.level]}>
              {levelLabel[alert.level]}
            </LarkTag>
            <span className="text-xs text-text-secondary">{alert.id}</span>
            <LarkStatusTag value={alert.status} />
          </div>
          <p className="mt-2 text-sm font-medium text-text-primary">
            {alert.title}
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            {alert.source} · {alert.time}
          </p>
          {alert.guide ? (
            <p className="mt-2 rounded-lg bg-app px-3 py-2 text-xs text-text-secondary">
              {alert.guide}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
        <DemoButton
          size="sm"
          variant="secondary"
          icon={UserPlus}
          onClick={() =>
            demoToastSuccess(`告警 ${alert.id} 已指派给值班员（Demo）`)
          }
        >
          指派
        </DemoButton>
        <DemoButton
          size="sm"
          variant="ghost"
          icon={MessageSquare}
          onClick={() => demoToastInfo(`打开 ${alert.id} 协作评论（Demo）`)}
        >
          评论
        </DemoButton>
        <LinkToDisposal />
      </div>
    </Card>
  );
}

function LinkToDisposal() {
  return (
    <a href="/alert/disposal">
      <DemoButton size="sm" variant="ghost">
        去处置
      </DemoButton>
    </a>
  );
}

export function AlertRealtimePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("feed");
  const pending = alertRecords.filter((a) => a.status !== "已关闭").length;

  const grouped = useMemo(
    () =>
      levelGroups.map((group) => ({
        ...group,
        items: alertRecords.filter((a) => a.level === group.key),
      })),
    [],
  );

  return (
    <div className="space-y-5">
      <AlertStatCards
        items={[
          { label: "今日告警", value: alertRecords.length, unit: "条" },
          { label: "未闭环", value: pending, unit: "条" },
          {
            label: "严重",
            value: alertRecords.filter((a) => a.level === "high").length,
            unit: "条",
          },
          { label: "平均处置", value: 8, unit: "min" },
        ]}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardTitleWithHint
          title="实时告警"
          hint="消息流聚合 · 支持指派与协作（Demo）"
        />
        <Radio.Group
          type="button"
          value={viewMode}
          onChange={(v) => setViewMode(v as ViewMode)}
        >
          <Radio value="feed">消息流</Radio>
          <Radio value="list">列表</Radio>
        </Radio.Group>
      </div>

      {viewMode === "feed" ? (
        <div className="space-y-5">
          {grouped.map((group) =>
            group.items.length > 0 ? (
              <div key={group.key}>
                <div className="mb-3 flex items-center gap-2">
                  <h3 className="lark-module-title">{group.label}</h3>
                  <span className="rounded-full bg-app px-2 py-0.5 text-xs text-text-secondary">
                    {group.items.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {group.items.map((alert) => (
                    <AlertFeedCard key={alert.id} alert={alert} />
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </div>
      ) : null}

      {viewMode === "list" ? (
        <DataTableCard
          title=""
          data={alertRecords}
          columns={[
            { title: "编号", dataIndex: "id", width: 70 },
            {
              title: "等级",
              dataIndex: "level",
              width: 60,
              render: (v) => (
                <LarkTag
                  variant={
                    alertLevelVariant[String(v) as keyof typeof alertLevelVariant]
                  }
                >
                  {levelLabel[String(v)]}
                </LarkTag>
              ),
            },
            { title: "告警内容", dataIndex: "title" },
            { title: "来源", dataIndex: "source", width: 140 },
            { title: "时间", dataIndex: "time", width: 80 },
            {
              title: "状态",
              dataIndex: "status",
              width: 90,
              render: (v) => <LarkStatusTag value={String(v)} />,
            },
          ]}
        />
      ) : null}
    </div>
  );
}
