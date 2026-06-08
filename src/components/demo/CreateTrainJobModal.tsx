"use client";

import { Form } from "@arco-design/web-react";
import { useMemo, useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoButton } from "@/components/demo/DemoButton";
import { DemoModal } from "@/components/demo/DemoModal";
import { DemoModalActions } from "@/components/demo/DemoModalActions";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { demoToastSuccess } from "@/components/demo/demoToast";
import { MODEL_TRAIN_OPTIONS } from "@/lib/demo/trainingUtils";
import type { TrainingDataset } from "@/lib/types/demo";

type CreateTrainJobModalProps = {
  availableDatasets: TrainingDataset[];
  onSubmit: (input: { model: string; dataset: string }) => void;
};

export function CreateTrainJobModal({
  availableDatasets,
  onSubmit,
}: CreateTrainJobModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(MODEL_TRAIN_OPTIONS[0]?.value ?? "");
  const [datasetName, setDatasetName] = useState("");
  const [error, setError] = useState("");

  const datasetsForModel = useMemo(
    () => availableDatasets.filter((item) => item.modelType === model),
    [availableDatasets, model]
  );

  const datasetOptions = useMemo(
    () =>
      datasetsForModel.map((item) => ({
        value: item.name,
        label: `${item.name} · ${item.version} · ${item.samples.toLocaleString()} 样本`,
      })),
    [datasetsForModel]
  );

  const handleOpen = () => {
    setModel(MODEL_TRAIN_OPTIONS[0]?.value ?? "");
    setDatasetName("");
    setError("");
    setOpen(true);
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setDatasetName("");
    setError("");
  };

  const handleSubmit = () => {
    if (!datasetName) {
      setError("请选择与该模型类型匹配的数据集");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      onSubmit({ model, dataset: datasetName });
      demoToastSuccess("训练任务已加入队列（Demo）");
      setLoading(false);
      setOpen(false);
    }, 500);
  };

  return (
    <>
      <DemoButton
        variant="primary"
        size="sm"
        disabled={availableDatasets.length === 0}
        onClick={handleOpen}
      >
        新建训练任务
      </DemoButton>
      <DemoModal
        open={open}
        onClose={() => !loading && setOpen(false)}
        title={
          <CardTitleWithHint
            title="新建训练任务"
            hint="仅可选用标注 100% 且模型类型匹配的数据集"
          />
        }
        width={480}
        footer={
          <DemoModalActions
            loading={loading}
            onCancel={() => setOpen(false)}
            onConfirm={handleSubmit}
            confirmText="提交"
          />
        }
      >
        <Form layout="vertical" size="small">
          <Form.Item label="目标模型" required>
            <NativeSelect
              value={model}
              options={MODEL_TRAIN_OPTIONS}
              onChange={handleModelChange}
            />
          </Form.Item>
          <Form.Item
            label="训练数据集"
            required
            validateStatus={error ? "error" : undefined}
            help={
              error ||
              (datasetsForModel.length === 0
                ? `暂无「${model}」类型且标注 100% 的数据集`
                : undefined)
            }
          >
            <NativeSelect
              value={datasetName}
              placeholder={
                datasetsForModel.length === 0
                  ? "请先在训练数据集页创建对应类型数据集"
                  : "请选择数据集"
              }
              disabled={datasetsForModel.length === 0}
              options={datasetOptions}
              onChange={(value) => {
                setDatasetName(value);
                setError("");
              }}
            />
          </Form.Item>
        </Form>
      </DemoModal>
    </>
  );
}
