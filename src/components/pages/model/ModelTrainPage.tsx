"use client";

import { Progress, Tag } from "@arco-design/web-react";
import { useMemo } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { CreateTrainJobModal } from "@/components/demo/CreateTrainJobModal";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { MetricCards } from "@/components/demo/MetricCards";
import { useTrainingDemo } from "@/lib/demo/trainingStore";
import type { TrainJob } from "@/lib/types/demo";

export function ModelTrainPage() {
  const { trainJobs, availableDatasets, addTrainJob, completeTrainJob } =
    useTrainingDemo();

  const metrics = useMemo(() => {
    const running = trainJobs.filter((job) => job.status === "训练中").length;
    const queue = trainJobs.filter((job) => job.status === "排队中").length;
    const done = trainJobs.filter((job) => job.status === "已完成").length;
    return { running, queue, done };
  }, [trainJobs]);

  const renderCompleteAction = (_value: unknown, record: TrainJob) => {
    if (record.status === "已完成") {
      return (
        <span className="text-xs text-text-secondary">
          {record.outputVersion ?? "—"}
        </span>
      );
    }

    return (
      <DemoActionButton
        variant="ghost"
        size="sm"
        direct
        successMessage={`训练任务 ${record.id} 已完成（Demo）`}
        onConfirm={() => completeTrainJob(record.id)}
      >
        完成训练
      </DemoActionButton>
    );
  };

  return (
    <div className="space-y-5">
      <MetricCards
        moduleKey="model-train"
        items={[
          {
            key: "running",
            label: "训练中",
            value: metrics.running,
            unit: "项",
            trend: "flat",
            trendValue: "—",
          },
          {
            key: "queue",
            label: "排队",
            value: metrics.queue,
            unit: "项",
            trend: "flat",
            trendValue: "—",
          },
          {
            key: "done",
            label: "本周完成",
            value: metrics.done,
            unit: "项",
            trend: "up",
            trendValue: "+1",
          },
          {
            key: "gpu",
            label: "算力占用",
            value: 68,
            unit: "%",
            trend: "up",
            trendValue: "+5%",
          },
        ]}
      />
      <DataTableCard
        title={
          <CardTitleWithHint
            title="训练任务"
            hint="数据集须标注 100% 且模型类型与目标模型一致"
          />
        }
        data={trainJobs}
        extra={
          <CreateTrainJobModal
            availableDatasets={availableDatasets}
            onSubmit={addTrainJob}
          />
        }
        columns={[
          { title: "编号", dataIndex: "id", width: 80 },
          { title: "模型", dataIndex: "model", width: 100 },
          { title: "数据集", dataIndex: "dataset" },
          {
            title: "进度",
            dataIndex: "progress",
            width: 160,
            render: (v) => <Progress percent={Number(v)} size="small" />,
          },
          { title: "Epoch", dataIndex: "epoch", width: 90 },
          {
            title: "状态",
            dataIndex: "status",
            width: 90,
            render: (v) => (
              <Tag
                color={
                  v === "已完成" ? "green" : v === "训练中" ? "arcoblue" : "gray"
                }
                className="!rounded-md"
              >
                {String(v)}
              </Tag>
            ),
          },
          {
            title: "操作",
            key: "actions",
            width: 100,
            render: renderCompleteAction,
          },
        ]}
      />
    </div>
  );
}
