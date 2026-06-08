"use client";

import { Radio } from "@arco-design/web-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { useTrainingDemo } from "@/lib/demo/trainingStore";
import type { SandErrorType } from "@/lib/types/demo";

const zoneAlertColumns = [
  { title: "编号", dataIndex: "id", width: 110 },
  { title: "列车", dataIndex: "train", width: 80 },
  { title: "司机", dataIndex: "driverName", width: 90 },
  { title: "公里标", dataIndex: "km", width: 100 },
  { title: "场景", dataIndex: "scenario", width: 100 },
  {
    title: "历史易错",
    dataIndex: "errorType",
    width: 90,
    render: (v: unknown) => (
      <LarkStatusTag value={String(v) as SandErrorType} />
    ),
  },
  { title: "距离", dataIndex: "distance", width: 100 },
  { title: "干预建议", dataIndex: "suggestion" },
  {
    title: "状态",
    dataIndex: "status",
    width: 90,
    render: (v: unknown) => <LarkStatusTag value={String(v)} />,
  },
] as const;

export function ModelPredictPage() {
  const { predictMonitor, activeShifts, profileZoneAlerts } = useTrainingDemo();
  const [trainFilter, setTrainFilter] = useState<string>("all");

  const boundTrains = useMemo(
    () => activeShifts.map((item) => item.train),
    [activeShifts],
  );

  useEffect(() => {
    if (trainFilter === "all") return;
    if (!boundTrains.includes(trainFilter)) {
      setTrainFilter(boundTrains[0] ?? "all");
    }
  }, [boundTrains, trainFilter]);

  const filteredAlerts = useMemo(() => {
    if (trainFilter === "all") return profileZoneAlerts;
    return profileZoneAlerts.filter((item) => item.train === trainFilter);
  }, [profileZoneAlerts, trainFilter]);

  const filteredMonitor = useMemo(() => {
    if (trainFilter === "all") return predictMonitor;
    return predictMonitor.filter((item) => item.train === trainFilter);
  }, [predictMonitor, trainFilter]);

  const hasZoneAlerts = profileZoneAlerts.length > 0;

  return (
    <div className="space-y-5">
      <MetricCards
        moduleKey="model-predict"
        items={[
          {
            key: "infer",
            label: "实时推理",
            value: 8640,
            unit: "次/日",
            trend: "up",
            trendValue: "+6%",
          },
          {
            key: "latency",
            label: "平均推理",
            value: 8,
            unit: "ms",
            trend: "down",
            trendValue: "-1ms",
          },
          {
            key: "npu",
            label: "NPU 负载",
            value: 34,
            unit: "%",
            trend: "flat",
            trendValue: "—",
          },
          {
            key: "fail",
            label: "推理异常",
            value: 0,
            unit: "次",
            trend: "flat",
            trendValue: "—",
          },
        ]}
      />

      {activeShifts.length > 0 ? (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            hasZoneAlerts
              ? "border-amber-200 bg-amber-50 text-amber-900"
              : "border-sky-200 bg-sky-50 text-sky-800"
          }`}
        >
          {hasZoneAlerts ? (
            <>
              <span className="font-medium">多列车并行 · 区段预警已激活</span>
              <span className="ml-2">
                {activeShifts.length} 列值乘中，共 {profileZoneAlerts.length}{" "}
                处薄弱区段提前提示
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeShifts.map((shift) => (
                  <span
                    key={shift.sessionId}
                    className="rounded-md border border-amber-200 bg-white px-2 py-0.5 text-xs"
                  >
                    {shift.train} · {shift.driverName}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              已绑定 {activeShifts.length} 列值乘，暂无匹配的薄弱区段画像。
            </>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border px-4 py-3 text-sm text-text-secondary">
          未绑定今日值乘。请先在
          <Link
            href="/model/evaluate"
            className="mx-1 text-primary hover:underline"
          >
            模型评估
          </Link>
          页绑定司机；Demo 可试：李师傅 · G101 + 王师傅 · G205 并行。
        </div>
      )}

      {activeShifts.length > 0 ? (
        <Radio.Group
          type="button"
          value={trainFilter}
          onChange={(value) => setTrainFilter(String(value))}
        >
          <Radio value="all">全部列车</Radio>
          {boundTrains.map((train) => (
            <Radio key={train} value={train}>
              {train}
            </Radio>
          ))}
        </Radio.Group>
      ) : null}

      {hasZoneAlerts ? (
        <DataTableCard
          title={
            <CardTitleWithHint
              title="司机画像区段提前预警"
              hint={
                trainFilter === "all"
                  ? "多列车并行，按列车隔离"
                  : `仅 ${trainFilter} 值乘预警`
              }
            />
          }
          data={filteredAlerts}
          columns={[...zoneAlertColumns]}
        />
      ) : null}

      <DataTableCard
        title={
          <CardTitleWithHint
            title="车端实时预测监控"
            hint={
              trainFilter === "all" ? undefined : `筛选：${trainFilter}`
            }
          />
        }
        data={filteredMonitor}
        columns={[
          { title: "编号", dataIndex: "id", width: 70 },
          { title: "列车", dataIndex: "train", width: 80 },
          { title: "模型", dataIndex: "model", width: 100 },
          {
            title: "部署版本",
            dataIndex: "deployedVersion",
            width: 100,
            render: (v) => String(v ?? "—"),
          },
          { title: "推理(ms)", dataIndex: "inferenceMs", width: 90 },
          { title: "建议输出", dataIndex: "suggestion" },
          {
            title: "状态",
            dataIndex: "status",
            width: 80,
            render: (v) => <LarkStatusTag value={String(v)} />,
          },
        ]}
      />
    </div>
  );
}
