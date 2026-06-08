"use client";

import { useMemo, useState } from "react";
import { Card, Input, Switch } from "@arco-design/web-react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { demoToastInfo } from "@/components/demo/demoToast";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { useAutoTaskDispatch } from "@/components/demo/useAutoTaskDispatch";
import {
  getDefaultIssueTask,
  getOrchestrationTasksByType,
} from "@/lib/mock/orchestrationTasks";

type BusinessTaskDispatchCardProps = {
  taskType: "上砂" | "砂处理";
  moduleName: string;
};

function CompactField({
  label,
  value,
  required,
  className = "",
}: {
  label: string;
  value: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-1 text-xs text-text-secondary">
        {label}
        {required ? <span className="text-rose-500"> *</span> : null}
      </p>
      <Input
        readOnly
        size="small"
        value={value || "—"}
        title={value}
        className="!bg-app/50"
      />
    </div>
  );
}

export function BusinessTaskDispatchCard({
  taskType,
  moduleName,
}: BusinessTaskDispatchCardProps) {
  const tasks = getOrchestrationTasksByType(taskType);
  const pendingTasks = tasks.filter((t) => t.status === "待处理");
  const defaultTask = pendingTasks[0] ?? getDefaultIssueTask(taskType);
  const { autoEnabled, toggleAutoDispatch, ready } = useAutoTaskDispatch(taskType);
  const [selectedId, setSelectedId] = useState(defaultTask?.id ?? "");

  const activeTask = useMemo(
    () =>
      pendingTasks.find((t) => t.id === selectedId) ??
      pendingTasks[0] ??
      defaultTask,
    [pendingTasks, selectedId, defaultTask],
  );

  const dispatchPlan =
    activeTask?.dispatchId
      ? `${activeTask.dispatchId} · ${activeTask.planBatch ?? "—"}`
      : "—";

  const handleAutoToggle = (checked: boolean) => {
    toggleAutoDispatch(checked);
    demoToastInfo(
      checked
        ? `${taskType}已开启自动下发（待处理 ${pendingTasks.length} 项）`
        : `${taskType}已切换为手动下发`,
    );
  };

  const modeHint = autoEnabled
    ? `自动模式：待处理工单将推送至${moduleName}（${pendingTasks.length} 项）`
    : `手动模式：选择工单后下发至${moduleName}`;

  return (
    <>
      <Card
        title={
          <CardTitleWithHint
            title={`${taskType}任务下发`}
            hint={modeHint}
            hintClassName={autoEnabled ? "text-brand" : "text-text-secondary"}
          />
        }
        bordered
        className="lark-card-elevated [&_.arco-card-body]:py-4"
        extra={
          ready ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary">自动下发</span>
              <Switch
                checked={autoEnabled}
                onChange={handleAutoToggle}
                size="small"
              />
            </div>
          ) : null
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
          <div className="sm:col-span-2 lg:col-span-5">
            <p className="mb-1 text-xs text-text-secondary">
              平台工单<span className="text-rose-500"> *</span>
            </p>
            {pendingTasks.length > 0 ? (
              <NativeSelect
                value={activeTask?.id ?? ""}
                onChange={setSelectedId}
                options={pendingTasks.map((t) => ({
                  value: t.id,
                  label: `${t.id} · ${t.train ?? "—"} · ${t.planBatch ?? t.name}`,
                }))}
              />
            ) : (
              <NativeSelect
                value="—"
                disabled
                options={[{ value: "—", label: "暂无待处理工单" }]}
              />
            )}
          </div>

          <CompactField
            className="lg:col-span-3"
            label="智能调度计划"
            value={dispatchPlan}
          />
          <CompactField
            className="lg:col-span-2"
            label="执行模块"
            value={moduleName}
            required
          />
          <CompactField
            className="sm:col-span-2 lg:col-span-2"
            label="任务参数"
            value={activeTask?.params ?? activeTask?.name ?? "—"}
          />

          <div className="flex sm:col-span-2 lg:col-span-12 lg:justify-end">
            <DemoActionButton
              size="sm"
              confirmTitle={`确认下发至${moduleName}`}
              confirmContent={`调度中心将平台工单 ${activeTask?.id ?? "—"} 推送至${moduleName}，状态变为「处理中」。Demo 演示。`}
              successMessage={`工单 ${activeTask?.id ?? "—"} 已下发（Demo）`}
              disabled={!activeTask || activeTask.status !== "待处理"}
            >
              {autoEnabled ? "手动补发" : "确认下发"}
            </DemoActionButton>
          </div>
        </div>
      </Card>
      <DataTableCard
        title={`${taskType}平台工单`}
        data={tasks}
        columns={[
          { title: "平台工单", dataIndex: "id", width: 96 },
          {
            title: "调度计划",
            dataIndex: "dispatchId",
            width: 96,
            render: (v) => (v ? String(v) : "—"),
          },
          { title: "列车", dataIndex: "train", width: 70 },
          { title: "计划批次", dataIndex: "planBatch", width: 120 },
          { title: "任务", dataIndex: "name" },
          {
            title: "工单状态",
            dataIndex: "status",
            width: 90,
            render: (v) => <LarkStatusTag value={String(v)} />,
          },
          {
            title: "进度",
            dataIndex: "progress",
            width: 70,
            render: (v) => `${v}%`,
          },
          { title: "更新", dataIndex: "updatedAt", width: 80 },
        ]}
      />
    </>
  );
}
