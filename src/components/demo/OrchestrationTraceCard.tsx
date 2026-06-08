"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { OrchestrationTask } from "@/lib/types/demo";

type OrchestrationTraceCardProps = {
  task?: OrchestrationTask;
  variant?: "dispatch" | "issue";
};

function getTaskIssuePath(taskType?: string) {
  return taskType === "砂处理"
    ? "/orchestration/processing-task"
    : "/orchestration/loading-task";
}

function getTaskIssueLabel(taskType?: string) {
  return taskType === "砂处理" ? "砂处理任务下发" : "上砂任务下发";
}

export function OrchestrationTraceCard({
  task,
  variant = "issue",
}: OrchestrationTraceCardProps) {
  if (!task?.dispatchId) {
    return (
      <div className="rounded-lg border border-border bg-app/60 px-4 py-3 text-xs text-text-secondary">
        暂无关联的智能调度计划。请先在
        <Link href="/orchestration/smart-dispatch" className="mx-1 text-brand hover:underline">
          系统智能调度
        </Link>
        中完成计划排队与资源分配，生成平台工单。
      </div>
    );
  }

  const issuePath = getTaskIssuePath(task.taskType);
  const issueLabel = getTaskIssueLabel(task.taskType);

  const steps =
    variant === "dispatch"
      ? [
          { label: "调度计划", value: task.planId ?? "—", href: "/exchange/dispatch" },
          { label: "智能调度", value: task.dispatchId, href: "/orchestration/smart-dispatch" },
          { label: "平台工单", value: task.id, href: "/orchestration/overview" },
          { label: "任务下发", value: issueLabel, href: issuePath },
        ]
      : [
          { label: "调度计划", value: `${task.planBatch}${task.planId ? ` · ${task.planId}` : ""}`, href: "/exchange/dispatch" },
          { label: "智能调度", value: task.dispatchId, href: "/orchestration/smart-dispatch" },
          { label: "平台工单", value: task.id, href: "/orchestration/overview" },
        ];

  return (
    <div className="rounded-lg border border-brand/20 bg-brand/[0.04] px-4 py-3">
      <p className="mb-2 text-xs font-medium text-text-primary">
        任务关联链路（待处理 → 调度中心下发 → 装置回传）
      </p>
      <div className="flex flex-wrap items-center gap-1 text-xs">
        {steps.map((step, index) => (
          <span key={step.label} className="inline-flex items-center gap-1">
            {index > 0 ? (
              <ArrowRight className="size-3 text-text-secondary" aria-hidden />
            ) : null}
            <Link href={step.href} className="text-text-secondary hover:text-brand">
              {step.label}
            </Link>
            <span className="font-mono font-medium text-brand">{step.value}</span>
          </span>
        ))}
      </div>
      {variant === "issue" && task.status === "待处理" ? (
        <p className="mt-2 text-xs text-amber-600">
          平台工单「待处理」— 请在本页选择工单并下发至 {task.target}；装置执行状态请在模块对接页查看。
        </p>
      ) : null}
      {variant === "issue" && task.status === "处理中" ? (
        <p className="mt-2 text-xs text-brand">
          工单处理中 — 等待 {task.target} 执行并回传进度；可在
          <Link
            href={task.taskType === "砂处理" ? "/exchange/processing" : "/exchange/loading"}
            className="mx-1 hover:underline"
          >
            模块对接
          </Link>
          查看装置数据。
        </p>
      ) : null}
    </div>
  );
}
