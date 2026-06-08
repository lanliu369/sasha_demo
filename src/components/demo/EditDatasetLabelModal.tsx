"use client";

import { Form, Input } from "@arco-design/web-react";
import { useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoButton } from "@/components/demo/DemoButton";
import { DemoModal } from "@/components/demo/DemoModal";
import { DemoModalActions } from "@/components/demo/DemoModalActions";
import { demoToastSuccess } from "@/components/demo/demoToast";
import type { TrainingDataset } from "@/lib/types/demo";

type EditDatasetLabelModalProps = {
  record: TrainingDataset;
  onSave: (id: string, labeled: string) => void;
};

export function EditDatasetLabelModal({
  record,
  onSave,
}: EditDatasetLabelModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [labeled, setLabeled] = useState(record.labeled);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setLabeled(record.labeled);
    setError("");
    setOpen(true);
  };

  const handleSubmit = () => {
    const numeric = Number.parseFloat(labeled.replace("%", "").trim());
    if (Number.isNaN(numeric) || numeric < 0 || numeric > 100) {
      setError("请输入 0–100 之间的数值");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      onSave(record.id, labeled);
      demoToastSuccess("标注进度已更新（Demo）");
      setLoading(false);
      setOpen(false);
    }, 400);
  };

  return (
    <>
      <DemoButton variant="ghost" size="sm" onClick={handleOpen}>
        编辑标注
      </DemoButton>
      <DemoModal
        open={open}
        onClose={() => !loading && setOpen(false)}
        title={
          <CardTitleWithHint
            title="编辑标注进度"
            hint={`${record.name} · ${record.id}`}
          />
        }
        width={420}
        footer={
          <DemoModalActions
            loading={loading}
            onCancel={() => setOpen(false)}
            onConfirm={handleSubmit}
            confirmText="保存"
          />
        }
      >
        <Form layout="vertical" size="small">
          <Form.Item
            label="标注完成"
            validateStatus={error ? "error" : undefined}
            help={error || "100% 时数据集状态变为「可用」，可用于模型训练"}
          >
            <Input
              value={labeled}
              placeholder="例如 85% 或 100"
              suffix="%"
              onChange={(value) => {
                setLabeled(value);
                setError("");
              }}
            />
          </Form.Item>
        </Form>
      </DemoModal>
    </>
  );
}
