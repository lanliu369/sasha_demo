"use client";

import { Card, Radio } from "@arco-design/web-react";
import { FileBarChart, FileText } from "lucide-react";
import { useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoFormModal } from "@/components/demo/DemoFormModal";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { reports } from "@/lib/mock/pages";

type ViewMode = "cards" | "list";

export function AnalysisReportPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardTitleWithHint
          title="报表分析"
          hint="卡片预览 · 列表管理 · 支持生成报表"
        />
        <div className="flex flex-wrap items-center gap-3">
          <Radio.Group
            type="button"
            value={viewMode}
            onChange={(v) => setViewMode(v as ViewMode)}
          >
            <Radio value="cards">卡片</Radio>
            <Radio value="list">列表</Radio>
          </Radio.Group>
          <DemoFormModal
            buttonText="生成报表"
            title="生成报表"
            fields={[
              { name: "name", label: "报表名称", required: true },
              {
                name: "period",
                label: "统计周期",
                defaultValue: "2025-05 月度",
              },
              { name: "type", label: "类型", defaultValue: "运营" },
            ]}
            successMessage="报表生成任务已提交（Demo）"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "报表总数", value: reports.length, unit: "份" },
          {
            label: "已生成",
            value: reports.filter((r) => r.status === "已生成").length,
            unit: "份",
          },
          {
            label: "生成中",
            value: reports.filter((r) => r.status === "生成中").length,
            unit: "份",
          },
          { label: "本月新增", value: 2, unit: "份" },
        ].map((item) => (
          <Card key={item.label} bordered className="lark-card-elevated">
            <p className="lark-caption">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {item.value}
              <span className="ml-1 text-sm font-normal text-text-secondary">
                {item.unit}
              </span>
            </p>
          </Card>
        ))}
      </div>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.id} bordered className="lark-card-elevated">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                  {report.type === "KPI" ? (
                    <FileBarChart className="size-5" />
                  ) : (
                    <FileText className="size-5" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-text-primary">{report.name}</h4>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {report.id} · {report.period}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <LarkStatusTag value={report.status} />
                    <span className="text-xs text-text-secondary">
                      {report.type} · {report.size}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <DataTableCard
          title=""
          data={reports}
          columns={[
            { title: "编号", dataIndex: "id", width: 80 },
            { title: "报表名称", dataIndex: "name" },
            { title: "周期", dataIndex: "period", width: 140 },
            { title: "类型", dataIndex: "type", width: 80 },
            {
              title: "状态",
              dataIndex: "status",
              width: 90,
              render: (v) => <LarkStatusTag value={String(v)} />,
            },
            { title: "大小", dataIndex: "size", width: 90 },
          ]}
        />
      )}
    </div>
  );
}
