"use client";

import { Card } from "@arco-design/web-react";
import { useMemo } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkStatusTag, LarkTag } from "@/components/demo/LarkTag";
import {
  aggregateBatchColumns,
  aggregateBatchRecords,
  aggregateFailRecords,
  sumAggregateIngestByPool,
} from "@/lib/mock/analysisRecords";
import { useTrainingDemo } from "@/lib/demo/trainingStore";
import { aggregatePipelines, processRules } from "@/lib/mock/pages";

export function ProcessAggregatePage() {
  const { aggregateSynced, syncAggregateToDatasets } = useTrainingDemo();

  const metrics = useMemo(
    () => ({
      pipe: aggregatePipelines.length,
      records: 13804,
      fail: aggregateFailRecords.length,
      lag: 0,
    }),
    []
  );

  const ingestPreview = useMemo(() => sumAggregateIngestByPool(), []);

  return (
    <div className="space-y-5">
      <MetricCards
        moduleKey="process"
        items={[
          {
            key: "pipe",
            label: "运行流水线",
            value: metrics.pipe,
            unit: "条",
            trend: "flat",
            trendValue: "—",
          },
          {
            key: "records",
            label: "今日处理",
            value: metrics.records,
            unit: "条",
            trend: "up",
            trendValue: "+8%",
          },
          {
            key: "fail",
            label: "转换失败",
            value: metrics.fail,
            unit: "条",
            trend: "down",
            trendValue: "-2",
          },
          {
            key: "lag",
            label: "积压队列",
            value: metrics.lag,
            unit: "条",
            trend: "flat",
            trendValue: "—",
          },
        ]}
      />

      <Card
        title={
          <CardTitleWithHint
            title="清洗与分桶规则"
            hint="PR04：车载撒砂经场景识别后路由至对应 modelType 训练样本池"
          />
        }
        bordered
        className="lark-card-elevated"
      >
        <div className="space-y-2">
          {processRules.map((rule) => (
            <div
              key={rule.id}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border px-3 py-2 text-sm"
            >
              <LarkTag variant={rule.enabled ? "success" : "neutral"}>
                {rule.id}
              </LarkTag>
              <span className="font-medium text-text-primary">{rule.name}</span>
              <span className="text-text-secondary">{rule.condition}</span>
              <span className="text-text-secondary">→ {rule.action}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title={
          <CardTitleWithHint
            title="训练样本池入池预览"
            hint="汇总今日已成功批次，同步后累加至训练数据集样本数"
          />
        }
        extra={
          <DemoActionButton
            variant="primary"
            size="sm"
            direct
            disabled={aggregateSynced}
            successMessage="已同步至训练数据集（Demo）"
            onConfirm={syncAggregateToDatasets}
          >
            {aggregateSynced ? "已同步" : "同步至训练数据集"}
          </DemoActionButton>
        }
        bordered
        className="lark-card-elevated"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(ingestPreview).map(([pool, count]) => (
            <div
              key={pool}
              className="rounded-lg border border-border bg-app/40 px-4 py-3"
            >
              <p className="text-xs text-text-secondary">{pool}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-text-primary">
                +{count.toLocaleString()}
                <span className="ml-1 text-sm font-normal text-text-secondary">
                  条
                </span>
              </p>
            </div>
          ))}
        </div>
      </Card>

      <DataTableCard
        title={
          <CardTitleWithHint
            title="汇聚流水线"
            hint="P001 车载撒砂已路由至训练样本池，非 ML 流水线不入池"
          />
        }
        data={aggregatePipelines}
        columns={[
          { title: "编号", dataIndex: "id", width: 70 },
          { title: "流水线", dataIndex: "name" },
          { title: "来源", dataIndex: "source", width: 120 },
          { title: "目标", dataIndex: "target", width: 120 },
          { title: "记录数", dataIndex: "records", width: 90 },
          {
            title: "状态",
            dataIndex: "status",
            width: 90,
            render: (v) => <LarkStatusTag value={String(v)} />,
          },
        ]}
      />
      <DataTableCard
        title={
          <CardTitleWithHint
            title="批次转换明细"
            hint="含 modelType / 样本池字段；仅「成功」批次参与入池同步"
          />
        }
        data={aggregateBatchRecords}
        columns={aggregateBatchColumns.map((col) =>
          col.dataIndex === "status"
            ? {
                ...col,
                render: (v) => <LarkStatusTag value={String(v)} />,
              }
            : col
        )}
      />
    </div>
  );
}
