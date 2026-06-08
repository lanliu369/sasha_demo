"use client";

import Link from "next/link";
import { Card, Progress } from "@arco-design/web-react";
import {
  Activity,
  Box,
  Brain,
  RotateCcw,
  Rocket,
  Sparkles,
} from "lucide-react";
import { useMemo } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoButton } from "@/components/demo/DemoButton";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { demoToastSuccess } from "@/components/demo/demoToast";
import {
  computeModelOverviewStats,
  modelCardMeta,
} from "@/lib/demo/modelOverviewMeta";
import { useTrainingDemo } from "@/lib/demo/trainingStore";
import type { ModelInfo, TrainJob } from "@/lib/types/demo";

const modelIcons: Record<string, typeof Brain> = {
  diagram: Activity,
  extreme: Sparkles,
  evaluation: Brain,
  correction: Box,
};

const modelGradients: Record<string, string> = {
  diagram: "from-[#3370FF] to-[#6B9AFF]",
  extreme: "from-[#FF7D00] to-[#FFB266]",
  evaluation: "from-[#7B61FF] to-[#3370FF]",
  correction: "from-[#00B578] to-[#14C0FF]",
};

function resolveDisplayStatus(model: ModelInfo, trainJobs: TrainJob[]) {
  const training = trainJobs.find(
    (job) => job.model === model.name && job.status === "训练中",
  );
  if (training) return "训练中" as const;
  return model.status;
}

export function ModelOverviewPage() {
  const {
    runtimeModels,
    trainJobs,
    latestDeployVersion,
    deployRecords,
    rollbackModel,
  } = useTrainingDemo();

  const stats = useMemo(
    () => computeModelOverviewStats(runtimeModels, trainJobs),
    [runtimeModels, trainJobs],
  );

  const recentDeploy = deployRecords[0];

  const handleRollback = (model: ModelInfo) => {
    const version = rollbackModel(model.name);
    if (!version) return;
    demoToastSuccess(
      `${model.name} 已回滚至 ${version}（Demo · FTP 热更新模拟）`,
    );
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "模型总数", value: stats.total, unit: "个" },
          { label: "在线模型", value: stats.running, unit: "个" },
          { label: "训练中", value: stats.training, unit: "个" },
          { label: "异常/待部署", value: stats.anomaly, unit: "个" },
        ].map((item) => (
          <Card key={item.label} bordered className="lark-card-elevated">
            <p className="lark-caption">{item.label}</p>
            <p className="mt-2 text-[28px] font-semibold text-text-primary">
              {item.value}
              <span className="ml-1 text-sm font-normal text-text-secondary">
                {item.unit}
              </span>
            </p>
          </Card>
        ))}
      </div>

      {recentDeploy ? (
        <div className="rounded-xl border border-[#D6E4FF] bg-[#EBF1FF]/50 px-5 py-3 text-sm text-[#245BDB]">
          最近部署：{recentDeploy.model} → {recentDeploy.target} ·{" "}
          {recentDeploy.status} · {recentDeploy.time}
          <span className="ml-3 text-text-secondary">
            全局版本 {latestDeployVersion}
          </span>
        </div>
      ) : null}

      <div>
        <CardTitleWithHint
          title="模型卡片"
          hint="支持一键部署、回滚与查看评估，功能与部署页联动"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          {runtimeModels.map((model) => {
            const meta = modelCardMeta[model.key];
            const Icon = modelIcons[model.key] ?? Brain;
            const displayStatus = resolveDisplayStatus(model, trainJobs);
            const trainingJob = trainJobs.find(
              (job) => job.model === model.name && job.status === "训练中",
            );

            return (
              <Card
                key={model.key}
                bordered
                className="lark-card-elevated overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${modelGradients[model.key] ?? "from-brand to-[#6B9AFF]"}`}
                  >
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-medium text-text-primary">
                          {model.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-text-secondary">
                          {meta?.description ?? model.deployTarget}
                        </p>
                      </div>
                      <LarkStatusTag value={displayStatus} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-app p-3 text-sm">
                  <div>
                    <p className="text-xs text-text-secondary">车端版本</p>
                    <p className="mt-0.5 font-semibold text-text-primary">
                      {model.version}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">准确率</p>
                    <p className="mt-0.5 font-semibold text-text-primary">
                      {model.accuracy}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">最近训练</p>
                    <p className="mt-0.5 font-semibold text-text-primary">
                      {meta?.lastTrainedAt ?? "—"}
                    </p>
                  </div>
                </div>

                {trainingJob ? (
                  <div className="mt-3 rounded-lg border border-border px-3 py-2">
                    <div className="mb-1 flex justify-between text-xs text-text-secondary">
                      <span>训练任务 {trainingJob.id}</span>
                      <span>{trainingJob.epoch}</span>
                    </div>
                    <Progress percent={trainingJob.progress} size="small" />
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                  <Link href="/model/deploy">
                    <DemoButton size="sm" icon={Rocket}>
                      一键部署
                    </DemoButton>
                  </Link>
                  <DemoButton
                    size="sm"
                    variant="secondary"
                    icon={RotateCcw}
                    onClick={() => handleRollback(model)}
                    disabled={!meta?.previousVersion}
                  >
                    回滚 {meta?.previousVersion ?? "—"}
                  </DemoButton>
                  {meta?.evaluatePath ? (
                    <Link href={meta.evaluatePath}>
                      <DemoButton size="sm" variant="ghost">
                        查看评估
                      </DemoButton>
                    </Link>
                  ) : (
                    <Link href="/model/train">
                      <DemoButton size="sm" variant="ghost">
                        训练任务
                      </DemoButton>
                    </Link>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
