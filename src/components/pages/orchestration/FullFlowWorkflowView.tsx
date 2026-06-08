"use client";

import { useEffect, useMemo, useState } from "react";
import { Drawer } from "@arco-design/web-react";
import { ChevronRight } from "lucide-react";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import {
  buildFullFlowStagesForTask,
  countFullFlowBlocks,
  getActiveStepIndex,
  getDefaultFullFlowDeviceId,
  getDefaultFullFlowTaskId,
  getFullFlowDevice,
  getFullFlowDeviceOptions,
  getFullFlowSummary,
  getFullFlowTask,
  getFullFlowTaskOptions,
  getLinkedDeviceId,
  getLinkedTaskId,
  getStageShortLabel,
  isStageActive,
  isStageCompleted,
  type FullFlowStage,
} from "@/lib/demo/fullFlowUtils";
import type { DeviceStatusItem, OrchestrationTask } from "@/lib/types/demo";

function FlowOverviewBar({
  train,
  stage,
  progress,
  blocks,
}: {
  train: string;
  stage: string;
  progress: number;
  blocks: number;
}) {
  return (
    <div className="lark-flow-overview flex h-[72px] items-center gap-0 rounded-lg border border-border bg-card px-4">
      <div className="flex min-w-0 flex-1 items-center gap-5 overflow-hidden">
        <div className="shrink-0">
          <p className="text-[11px] leading-4 text-text-secondary">列车</p>
          <p className="text-base font-semibold leading-6 text-text-primary">
            {train}
          </p>
        </div>
        <div className="h-8 w-px shrink-0 bg-border" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] leading-4 text-text-secondary">当前环节</p>
          <p className="truncate text-sm font-medium leading-5 text-text-primary">
            {stage}
          </p>
        </div>
        <div className="h-8 w-px shrink-0 bg-border" />
        <div className="shrink-0 text-right">
          <p className="text-[11px] leading-4 text-text-secondary">进度</p>
          <p className="text-base font-semibold leading-6 text-brand">
            {progress}
            <span className="text-xs font-normal text-text-secondary">%</span>
          </p>
        </div>
        <div className="h-8 w-px shrink-0 bg-border" />
        <div className="shrink-0 text-right">
          <p className="text-[11px] leading-4 text-text-secondary">阻塞</p>
          <p
            className={`text-base font-semibold leading-6 ${
              blocks > 0 ? "text-danger" : "text-text-primary"
            }`}
          >
            {blocks}
            <span className="text-xs font-normal text-text-secondary"> 个</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function FlowSummaryRow({
  summary,
}: {
  summary: ReturnType<typeof getFullFlowSummary>;
}) {
  const items = [
    { label: "总步骤", value: summary.total },
    { label: "已完成", value: summary.completed },
    { label: "执行中", value: summary.running },
    { label: "待执行", value: summary.pending },
    { label: "预计完成", value: summary.estimatedCompletion },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-xs text-text-secondary">
      {items.map((item, index) => (
        <span key={item.label} className="inline-flex items-center gap-1">
          {index > 0 ? <span className="text-border">·</span> : null}
          <span>{item.label}</span>
          <span className="font-medium text-text-primary">{item.value}</span>
        </span>
      ))}
    </div>
  );
}

function CompactStepBar({
  stages,
  activeIndex,
  selectedIndex,
  onSelect,
}: {
  stages: FullFlowStage[];
  activeIndex: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="lark-flow-step-bar mb-3 flex items-start gap-0 overflow-x-auto pb-1">
      {stages.map((stage, index) => {
        const done = isStageCompleted(stage.status);
        const active = isStageActive(stage.status);
        const selected = index === selectedIndex;
        const isLast = index === stages.length - 1;

        return (
          <div key={stage.stage} className="flex min-w-0 flex-1 items-center">
            <button
              type="button"
              onClick={() => onSelect(index)}
              className={`group flex min-w-0 flex-1 flex-col items-center gap-1 px-0.5 ${
                selected ? "opacity-100" : "opacity-90"
              }`}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] transition-colors ${
                  done
                    ? "bg-success text-white"
                    : active
                      ? "bg-brand text-white ring-2 ring-brand/20"
                      : selected
                        ? "border-2 border-brand bg-card text-brand"
                        : "border border-border bg-card text-text-secondary"
                }`}
              >
                {done ? "✓" : active ? "●" : "○"}
              </span>
              <span
                className={`max-w-full truncate text-[10px] leading-3 ${
                  active || selected
                    ? "font-medium text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {getStageShortLabel(stage.stage)}
              </span>
            </button>
            {!isLast ? (
              <div
                className={`mx-0.5 mb-4 h-px min-w-2 flex-1 ${
                  index < activeIndex ? "bg-success/60" : "bg-border"
                }`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function StepRow({
  stage,
  index,
  selected,
  onSelect,
  onOpenDetail,
}: {
  stage: FullFlowStage;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onOpenDetail: () => void;
}) {
  const active = isStageActive(stage.status);
  const done = isStageCompleted(stage.status);

  return (
    <div
      className={`lark-flow-step-row flex h-12 items-center gap-2 border-b border-border/60 px-2 last:border-b-0 ${
        selected ? "bg-brand-light/60" : "hover:bg-app/80"
      } ${active ? "border-l-2 border-l-brand pl-[6px]" : ""}`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
      >
        <span
          className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
            done
              ? "bg-success/15 text-success"
              : active
                ? "bg-brand text-white"
                : "bg-app text-text-secondary"
          }`}
        >
          {index + 1}
        </span>
        <span
          className={`min-w-0 flex-1 truncate text-sm ${
            selected || active
              ? "font-medium text-text-primary"
              : "text-text-primary"
          }`}
        >
          {stage.stage}
        </span>
      </button>
      <LarkStatusTag value={stage.status} className="shrink-0" />
      <span className="w-10 shrink-0 text-right text-xs text-text-secondary">
        {stage.time}
      </span>
      <button
        type="button"
        aria-label="查看详情"
        onClick={onOpenDetail}
        className={`flex size-7 shrink-0 items-center justify-center rounded p-1 text-text-secondary hover:bg-app hover:text-brand ${
          selected ? "invisible pointer-events-none" : ""
        }`}
      >
        <ChevronRight className="size-3.5" />
      </button>
    </div>
  );
}

function StepDetailPanel({
  stage,
  task,
  device,
}: {
  stage: FullFlowStage;
  task: OrchestrationTask;
  device?: DeviceStatusItem;
}) {
  const fields = [
    { label: "节点", value: stage.stage },
    { label: "责任模块", value: stage.module },
    { label: "状态", value: stage.status },
    { label: "时间", value: stage.time },
    { label: "工单", value: `${task.id} · ${task.taskType ?? "—"}` },
    { label: "列车", value: task.train ?? "—" },
    {
      label: "关联设备",
      value: device ? `${device.name} · ${device.value}` : "—",
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-text-primary">{stage.stage}</h3>
        <LarkStatusTag value={stage.status} />
      </div>
      <p className="mb-4 rounded-md bg-app px-3 py-2 text-sm leading-6 text-text-primary">
        {stage.detail}
      </p>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {fields.map((field) => (
          <div key={field.label} className="min-w-0">
            <dt className="text-text-secondary">{field.label}</dt>
            <dd className="mt-0.5 truncate font-medium text-text-primary">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
      {task.params ? (
        <div className="mt-4 rounded-md border border-dashed border-border px-3 py-2 text-xs text-text-secondary">
          参数摘要：{task.params}
        </div>
      ) : null}
    </div>
  );
}

function StepDetailDrawer({
  visible,
  stage,
  task,
  onClose,
}: {
  visible: boolean;
  stage: FullFlowStage | null;
  task: OrchestrationTask;
  onClose: () => void;
}) {
  return (
    <Drawer
      width={420}
      title={stage ? `${stage.stage} · 节点详情` : "节点详情"}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {stage ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <LarkStatusTag value={stage.status} />
            <span className="text-xs text-text-secondary">{stage.time}</span>
          </div>
          <p className="text-sm leading-6 text-text-primary">{stage.detail}</p>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-text-secondary">责任模块</dt>
              <dd className="mt-1 text-text-primary">{stage.module}</dd>
            </div>
            <div>
              <dt className="text-xs text-text-secondary">平台工单</dt>
              <dd className="mt-1 text-text-primary">
                {task.id} · {task.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-text-secondary">触发来源</dt>
              <dd className="mt-1 text-text-primary">{task.trigger}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </Drawer>
  );
}

export function FullFlowWorkflowView() {
  const [taskId, setTaskId] = useState(getDefaultFullFlowTaskId);
  const [deviceId, setDeviceId] = useState(() =>
    getDefaultFullFlowDeviceId(getDefaultFullFlowTaskId()),
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [drawerStage, setDrawerStage] = useState<FullFlowStage | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const task = useMemo(() => getFullFlowTask(taskId), [taskId]);
  const device = useMemo(() => getFullFlowDevice(deviceId), [deviceId]);
  const stages = useMemo(
    () => (task ? buildFullFlowStagesForTask(task) : []),
    [task],
  );
  const activeIndex = useMemo(() => getActiveStepIndex(stages), [stages]);
  const summary = useMemo(
    () => (task ? getFullFlowSummary(stages, task) : null),
    [stages, task],
  );
  const selectedStage = stages[selectedIndex] ?? stages[activeIndex];
  const activeStage = stages[activeIndex] ?? selectedStage;

  useEffect(() => {
    setSelectedIndex(activeIndex);
  }, [taskId, activeIndex]);

  const handleTaskChange = (nextTaskId: string) => {
    setTaskId(nextTaskId);
    const linked = getLinkedDeviceId(nextTaskId);
    if (linked) setDeviceId(linked);
  };

  const handleDeviceChange = (nextDeviceId: string) => {
    setDeviceId(nextDeviceId);
    const linked = getLinkedTaskId(nextDeviceId);
    if (linked) setTaskId(linked);
  };

  const openDrawer = (stage: FullFlowStage) => {
    setDrawerStage(stage);
    setDrawerVisible(true);
  };

  if (!task || !summary || !selectedStage) {
    return null;
  }

  const blocks = countFullFlowBlocks(task, device);

  return (
    <div className="lark-flow-workspace space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2">
        <p className="text-sm font-medium text-text-primary">
          上砂/砂处理全流程
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary">平台工单</span>
            <NativeSelect
              value={taskId}
              onChange={handleTaskChange}
              options={getFullFlowTaskOptions()}
              size="small"
              style={{ width: 240 }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary">关联设备</span>
            <NativeSelect
              value={deviceId}
              onChange={handleDeviceChange}
              options={getFullFlowDeviceOptions()}
              size="small"
              style={{ width: 240 }}
            />
          </div>
        </div>
      </div>

      <FlowOverviewBar
        train={task.train ?? "—"}
        stage={activeStage.stage}
        progress={task.progress}
        blocks={blocks}
      />

      <FlowSummaryRow summary={summary} />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-10">
        <div className="rounded-lg border border-border bg-card p-3 lg:col-span-4">
          <CompactStepBar
            stages={stages}
            activeIndex={activeIndex}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
          <div className="max-h-[320px] overflow-y-auto rounded-md border border-border/70">
            {stages.map((stage, index) => (
              <StepRow
                key={stage.stage}
                stage={stage}
                index={index}
                selected={index === selectedIndex}
                onSelect={() => setSelectedIndex(index)}
                onOpenDetail={() => openDrawer(stage)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 lg:col-span-6">
          <StepDetailPanel
            stage={selectedStage}
            task={task}
            device={device}
          />
        </div>
      </div>

      <StepDetailDrawer
        visible={drawerVisible}
        stage={drawerStage}
        task={task}
        onClose={() => setDrawerVisible(false)}
      />
    </div>
  );
}
