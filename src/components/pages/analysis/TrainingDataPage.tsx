"use client";

import { useMemo } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoFormModal } from "@/components/demo/DemoFormModal";
import { EditDatasetLabelModal } from "@/components/demo/EditDatasetLabelModal";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkTag } from "@/components/demo/LarkTag";
import { useTrainingDemo } from "@/lib/demo/trainingStore";
import {
  MODEL_TRAIN_OPTIONS,
  averageLabelRate,
  formatSampleTotal,
  normalizeLabeled,
} from "@/lib/demo/trainingUtils";

export function TrainingDataPage() {
  const { datasets, addDataset, updateDatasetLabeled } = useTrainingDemo();

  const metrics = useMemo(() => {
    const totalSamples = datasets.reduce((acc, item) => acc + item.samples, 0);
    return {
      sets: datasets.length,
      samples: formatSampleTotal(totalSamples),
      label: averageLabelRate(datasets),
    };
  }, [datasets]);

  const handleAddDataset = (values: Record<string, string>) => {
    const samples = Number.parseInt(values.samples?.replace(/,/g, "") ?? "0", 10);
    addDataset({
      name: values.name.trim(),
      modelType: values.modelType,
      samples: Number.isNaN(samples) ? 0 : samples,
      labeled: normalizeLabeled(values.labeled ?? "0%"),
      version: values.version?.trim() || "v1.0",
    });
  };

  return (
    <div className="space-y-5">
      <MetricCards
        moduleKey="analysis-training"
        columns={3}
        items={[
          {
            key: "sets",
            label: "数据集",
            value: metrics.sets,
            unit: "个",
            trend: "flat",
            trendValue: "—",
          },
          {
            key: "samples",
            label: "总样本",
            value: metrics.samples,
            unit: "",
            trend: "up",
            trendValue: "+12K",
          },
          {
            key: "label",
            label: "平均标注率",
            value: metrics.label,
            unit: "%",
            trend: "up",
            trendValue: "+0.3%",
          },
        ]}
      />
      <DataTableCard
        title={
          <CardTitleWithHint
            title="训练数据集"
            hint="每条数据集绑定一种模型类型，训练时按类型匹配选用"
          />
        }
        data={datasets}
        extra={
          <DemoFormModal
            buttonText="新增数据集"
            title="新增训练数据集"
            fields={[
              { name: "name", label: "数据集名称", required: true },
              {
                name: "modelType",
                label: "模型类型",
                type: "select",
                required: true,
                defaultValue: MODEL_TRAIN_OPTIONS[0]?.value ?? "",
                options: MODEL_TRAIN_OPTIONS,
              },
              {
                name: "samples",
                label: "样本数",
                placeholder: "例如 10000",
                defaultValue: "0",
              },
              { name: "version", label: "版本", defaultValue: "v1.0" },
              {
                name: "labeled",
                label: "标注完成",
                placeholder: "例如 0% 或 85%",
                defaultValue: "0%",
              },
            ]}
            successMessage="训练数据集已创建（Demo）"
            onSubmit={handleAddDataset}
          />
        }
        columns={[
          { title: "编号", dataIndex: "id", width: 70 },
          { title: "名称", dataIndex: "name" },
          { title: "模型类型", dataIndex: "modelType", width: 100 },
          { title: "样本数", dataIndex: "samples", width: 100 },
          { title: "标注完成", dataIndex: "labeled", width: 100 },
          { title: "版本", dataIndex: "version", width: 80 },
          {
            title: "状态",
            dataIndex: "labeled",
            width: 90,
            render: (v) => (
              <LarkTag variant={String(v) === "100%" ? "success" : "info"}>
                {String(v) === "100%" ? "可用" : "标注中"}
              </LarkTag>
            ),
          },
          { title: "更新", dataIndex: "updatedAt", width: 110 },
          {
            title: "操作",
            key: "actions",
            width: 100,
            render: (_value, record) => (
              <EditDatasetLabelModal
                record={record}
                onSave={updateDatasetLabeled}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
