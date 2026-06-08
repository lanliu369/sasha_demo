"use client";

import { Card, Form, Input } from "@arco-design/web-react";
import { useEffect, useMemo, useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoButton } from "@/components/demo/DemoButton";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { demoToastSuccess } from "@/components/demo/demoToast";
import { useTrainingDemo } from "@/lib/demo/trainingStore";
import {
  DEFAULT_MODEL_FTP,
  VEHICLE_DEPLOY_TARGETS,
} from "@/lib/demo/trainingUtils";

export function ModelDeployPage() {
  const { deployRecords, deployableTrainJobs, startDeploy } = useTrainingDemo();
  const [trainJobId, setTrainJobId] = useState("");
  const [target, setTarget] = useState(VEHICLE_DEPLOY_TARGETS[0]?.value ?? "");
  const [ftpUrl, setFtpUrl] = useState(DEFAULT_MODEL_FTP);
  const [packageName, setPackageName] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedJob = useMemo(
    () => deployableTrainJobs.find((job) => job.id === trainJobId),
    [deployableTrainJobs, trainJobId]
  );

  useEffect(() => {
    if (deployableTrainJobs.length === 0) {
      setTrainJobId("");
      setPackageName("");
      return;
    }
    if (!deployableTrainJobs.some((job) => job.id === trainJobId)) {
      const first = deployableTrainJobs[0];
      setTrainJobId(first.id);
      setPackageName(first.packageName ?? "");
    }
  }, [deployableTrainJobs, trainJobId]);

  useEffect(() => {
    if (selectedJob?.packageName) {
      setPackageName(selectedJob.packageName);
    }
  }, [selectedJob]);

  const trainJobOptions = deployableTrainJobs.map((job) => ({
    value: job.id,
    label: `${job.id} · ${job.model} ${job.outputVersion ?? ""} · ${job.dataset}`,
  }));

  const handleDeploy = () => {
    if (!selectedJob?.outputVersion || !selectedJob.packageName) return;

    setLoading(true);
    window.setTimeout(() => {
      startDeploy({
        trainJobId: selectedJob.id,
        model: selectedJob.model,
        outputVersion: selectedJob.outputVersion!,
        packageName: packageName.trim() || selectedJob.packageName!,
        target,
        ftpUrl,
      });
      demoToastSuccess("模型部署任务已启动（Demo）");
      setLoading(false);
    }, 400);
  };

  return (
    <div className="space-y-5">
      <Card
        title={
          <CardTitleWithHint
            title="FTP 热更新部署"
            hint="仅可选择「模型训练」中已完成的任务；部署记录实时写入下方列表"
          />
        }
        bordered
        className="lark-card-elevated"
      >
        <Form layout="vertical" className="max-w-xl">
          <Form.Item
            label="训练任务"
            extra={
              deployableTrainJobs.length === 0
                ? "请先在「模型训练」页点击「完成训练」"
                : undefined
            }
          >
            <NativeSelect
              value={trainJobId}
              placeholder="请选择已完成的训练任务"
              disabled={deployableTrainJobs.length === 0}
              options={trainJobOptions}
              onChange={(value) => setTrainJobId(value)}
            />
          </Form.Item>
          <Form.Item label="FTP 地址">
            <Input value={ftpUrl} onChange={setFtpUrl} />
          </Form.Item>
          <Form.Item label="目标车辆">
            <NativeSelect
              value={target}
              options={VEHICLE_DEPLOY_TARGETS}
              onChange={setTarget}
            />
          </Form.Item>
          <Form.Item label="模型包">
            <Input
              value={packageName}
              placeholder="选择训练任务后自动填充"
              onChange={setPackageName}
            />
          </Form.Item>
          <Form.Item>
            <DemoButton
              variant="primary"
              loading={loading}
              disabled={!selectedJob || !packageName.trim()}
              onClick={handleDeploy}
            >
              开始部署
            </DemoButton>
          </Form.Item>
        </Form>
      </Card>
      <DataTableCard
        title="部署记录"
        data={deployRecords}
        columns={[
          { title: "编号", dataIndex: "id", width: 80 },
          { title: "模型", dataIndex: "model" },
          { title: "目标", dataIndex: "target", width: 100 },
          { title: "方式", dataIndex: "method", width: 110 },
          { title: "时间", dataIndex: "time", width: 160 },
          {
            title: "状态",
            dataIndex: "status",
            width: 90,
            render: (v) => <LarkStatusTag value={String(v)} />,
          },
        ]}
      />
    </div>
  );
}
