"use client";

import { Card } from "@arco-design/web-react";
import { useMemo, useState } from "react";
import { AnalysisQualityPanel } from "@/components/demo/AnalysisQualityPanel";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoButton } from "@/components/demo/DemoButton";
import { HorizontalRankChart } from "@/components/demo/HorizontalRankChart";
import { LarkTag } from "@/components/demo/LarkTag";
import { SimpleBarChart } from "@/components/demo/SimpleBarChart";
import { SimpleLineChart } from "@/components/demo/SimpleLineChart";
import {
  AnalysisViewToggle,
  BiKpiCard,
} from "@/components/lark";
import {
  computeTrainRanking,
  filterVehicleRecords,
  vehicleDrillLabels,
  vehicleTrend30,
  type VehicleDrillKey,
} from "@/lib/demo/analysisPresentation";
import {
  vehicleAnalysisColumns,
  vehicleSandAnalysisRecords,
} from "@/lib/mock/analysisRecords";
import { vehicleVolumeChart } from "@/lib/mock/pages";

export function AnalysisVehiclePage() {
  const [viewMode, setViewMode] = useState<"dashboard" | "detail">("dashboard");
  const [drillKey, setDrillKey] = useState<VehicleDrillKey>("all");

  const metrics = useMemo(() => {
    const adopted = vehicleSandAnalysisRecords.filter(
      (item) => item.adopted === "是",
    ).length;
    const total = vehicleSandAnalysisRecords.length;
    return {
      records: 4520,
      adoptRate: total > 0 ? Math.round((adopted / total) * 100) : 0,
      avgAmount: 3.2,
      warn: vehicleSandAnalysisRecords.filter((r) => r.status === "预警").length,
      anomaly: vehicleSandAnalysisRecords.filter((r) => r.status === "异常")
        .length,
    };
  }, []);

  const drillData = useMemo(
    () => filterVehicleRecords(drillKey),
    [drillKey],
  );
  const trainRanking = useMemo(() => computeTrainRanking(), []);

  const statusRender = (value: unknown) => (
    <LarkTag
      variant={
        value === "正常"
          ? "success"
          : value === "预警"
            ? "warning"
            : "danger"
      }
    >
      {String(value)}
    </LarkTag>
  );

  const tableColumns = vehicleAnalysisColumns.map((col) =>
    col.dataIndex === "status" ? { ...col, render: statusRender } : col,
  );

  const handleDrill = (key: VehicleDrillKey) => {
    setDrillKey(key);
    setViewMode("detail");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardTitleWithHint
          title="车载数据分析"
          hint="KPI 钻取至同字段明细"
        />
        <AnalysisViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <BiKpiCard
          label="撒砂记录"
          value={metrics.records}
          unit="条"
          trend="up"
          trendValue="+8%"
          active={drillKey === "all" && viewMode === "detail"}
          onClick={() => handleDrill("all")}
        />
        <BiKpiCard
          label="建议采纳率"
          value={metrics.adoptRate}
          unit="%"
          trend="up"
          trendValue="+1.2%"
          active={drillKey === "notAdopted" && viewMode === "detail"}
          onClick={() => handleDrill("notAdopted")}
        />
        <BiKpiCard
          label="空转预警"
          value={metrics.warn}
          unit="次"
          trend="down"
          trendValue="-3"
          active={drillKey === "warn" && viewMode === "detail"}
          onClick={() => handleDrill("warn")}
        />
        <BiKpiCard
          label="异常数据"
          value={metrics.anomaly}
          unit="条"
          trend="down"
          trendValue="-2"
          active={drillKey === "anomaly" && viewMode === "detail"}
          onClick={() => handleDrill("anomaly")}
        />
      </div>

      {viewMode === "dashboard" ? (
        <>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <SimpleBarChart
              title="作业与风险统计"
              unit="条/次"
              items={vehicleVolumeChart}
            />
            <Card bordered className="lark-card-elevated xl:col-span-1">
              <CardTitleWithHint
                title="撒砂量趋势"
                hint="近 30 天汇总（Demo）"
              />
              <SimpleLineChart
                labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "本周"]}
                values={vehicleTrend30}
              />
            </Card>
            <HorizontalRankChart
              title="列车撒砂分布"
              hint="当前抽样明细按列车占比"
              items={trainRanking}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <AnalysisQualityPanel
              items={[
                {
                  label: "模型建议采纳率",
                  value: metrics.adoptRate,
                  unit: "%",
                  max: 100,
                  format: "percent",
                },
                {
                  label: "平均撒砂量",
                  value: metrics.avgAmount,
                  unit: "kg/次",
                  format: "value",
                },
              ]}
            />
            <Card bordered className="lark-card-elevated xl:col-span-2">
              <CardTitleWithHint
                title="分析摘要"
                hint="基于抽样明细自动生成（Demo）"
              />
              <ul className="mt-3 space-y-2 text-sm text-text-primary">
                <li>· G101 区段预警占比最高，空转预警与操作评价异常相关</li>
                <li>· 建议采纳率 {metrics.adoptRate}%，未采纳集中在自动纠正场景</li>
                <li>· 点击上方 KPI 可钻取至字段一致的明细表</li>
              </ul>
            </Card>
          </div>
        </>
      ) : null}

      {viewMode === "detail" ? (
        <>
          {drillKey !== "all" ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#D6E4FF] bg-[#EBF1FF]/50 px-4 py-3 text-sm text-[#245BDB]">
              <span>
                当前钻取：<strong>{vehicleDrillLabels[drillKey]}</strong> ·{" "}
                {drillData.length} 条（与 KPI 同字段结构）
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
                title="撒砂分析明细"
                hint={`${vehicleDrillLabels[drillKey]} · 最多 20 条/页`}
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
