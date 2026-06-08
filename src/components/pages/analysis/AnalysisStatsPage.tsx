"use client";

import { Card } from "@arco-design/web-react";
import { useMemo, useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoButton } from "@/components/demo/DemoButton";
import { HorizontalRankChart } from "@/components/demo/HorizontalRankChart";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { SimpleBarChart } from "@/components/demo/SimpleBarChart";
import { SimpleLineChart } from "@/components/demo/SimpleLineChart";
import {
  AnalysisViewToggle,
  BiKpiCard,
} from "@/components/lark";
import {
  filterStatsRecords,
  statsDrillLabels,
  statsTrend30,
  type StatsDrillKey,
} from "@/lib/demo/analysisPresentation";
import {
  statsDetailColumns,
  statsDetailRecords,
} from "@/lib/mock/analysisRecords";
import { statsChart } from "@/lib/mock/pages";

const categoryTotals = {
  sand: 4520,
  load: 1286,
  process: 864,
  inspect: 360,
} as const;

const kpiToDrill: Record<string, StatsDrillKey> = {
  sand: "撒砂作业",
  load: "上砂作业",
  process: "砂处理",
  inspect: "检测记录",
};

export function AnalysisStatsPage() {
  const [viewMode, setViewMode] = useState<"dashboard" | "detail">("dashboard");
  const [drillKey, setDrillKey] = useState<StatsDrillKey>("all");

  const drillData = useMemo(() => filterStatsRecords(drillKey), [drillKey]);

  const moduleRanking = useMemo(() => {
    const totals = new Map<string, number>();
    for (const row of statsDetailRecords) {
      totals.set(row.module, (totals.get(row.module) ?? 0) + 1);
    }
    const grand =
      [...totals.values()].reduce((sum, value) => sum + value, 0) || 1;
    return [...totals.entries()]
      .map(([label, value]) => ({
        label,
        value,
        pct: Math.round((value / grand) * 100),
      }))
      .sort((a, b) => b.value - a.value);
  }, []);

  const handleDrill = (key: string) => {
    setDrillKey(kpiToDrill[key] ?? "all");
    setViewMode("detail");
  };

  const tableColumns = statsDetailColumns.map((col) =>
    col.dataIndex === "status"
      ? { ...col, render: (v: unknown) => <LarkStatusTag value={String(v)} /> }
      : col,
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardTitleWithHint
          title="数据统计"
          hint="分类 KPI 钻取明细"
        />
        <AnalysisViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <BiKpiCard
          label="撒砂记录"
          value={categoryTotals.sand}
          unit="条"
          trend="up"
          trendValue="+8%"
          active={drillKey === "撒砂作业" && viewMode === "detail"}
          onClick={() => handleDrill("sand")}
        />
        <BiKpiCard
          label="上砂作业"
          value={categoryTotals.load}
          unit="次"
          trend="up"
          trendValue="+5%"
          active={drillKey === "上砂作业" && viewMode === "detail"}
          onClick={() => handleDrill("load")}
        />
        <BiKpiCard
          label="砂处理"
          value={categoryTotals.process}
          unit="次"
          trend="flat"
          trendValue="—"
          active={drillKey === "砂处理" && viewMode === "detail"}
          onClick={() => handleDrill("process")}
        />
        <BiKpiCard
          label="检测记录"
          value={categoryTotals.inspect}
          unit="条"
          trend="up"
          trendValue="+4"
          active={drillKey === "检测记录" && viewMode === "detail"}
          onClick={() => handleDrill("inspect")}
        />
      </div>

      {viewMode === "dashboard" ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <SimpleBarChart title="多维数据统计" items={statsChart} />
          <Card bordered className="lark-card-elevated">
            <CardTitleWithHint title="数据量趋势" hint="近 30 天汇总" />
            <SimpleLineChart
              labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "本周"]}
              values={statsTrend30}
            />
          </Card>
          <HorizontalRankChart
            title="模块数据占比"
            hint="抽样明细按来源模块"
            items={moduleRanking}
          />
        </div>
      ) : null}

      {viewMode === "detail" ? (
        <>
          {drillKey !== "all" ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#D6E4FF] bg-[#EBF1FF]/50 px-4 py-3 text-sm text-[#245BDB]">
              <span>
                当前钻取：<strong>{statsDrillLabels[drillKey]}</strong> ·{" "}
                {drillData.length} 条
              </span>
              <DemoButton
                size="sm"
                variant="ghost"
                onClick={() => setDrillKey("all")}
              >
                清除钻取
              </DemoButton>
            </div>
          ) : null}
          <DataTableCard
            title={
              <CardTitleWithHint
                title="统计明细"
                hint={`${statsDrillLabels[drillKey]} · 与 KPI 同字段结构`}
              />
            }
            data={drillData}
            columns={tableColumns}
          />
        </>
      ) : null}
    </div>
  );
}
