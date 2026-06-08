"use client";

import { Card, Radio } from "@arco-design/web-react";
import { useMemo, useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { LarkStatusKpiCard } from "@/components/lark";
import { getStatusIconMeta } from "@/lib/ui/larkStatusIcon";
import {
  countPlatformTasksByStatus,
  orchestrationTasks,
} from "@/lib/mock/orchestrationTasks";
import type { OrchestrationTask } from "@/lib/types/demo";

type ViewMode = "board" | "timeline" | "list";

const boardColumns: {
  key: OrchestrationTask["status"];
  label: string;
}[] = [
  { key: "待处理", label: "待处理" },
  { key: "处理中", label: "处理中" },
  { key: "已处理", label: "已处理" },
  { key: "异常", label: "异常" },
];

function TaskBoardCard({ task }: { task: OrchestrationTask }) {
  return (
    <Card bordered className="lark-card-elevated mb-2 last:mb-0">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-text-primary">{task.name}</p>
        <span className="shrink-0 text-xs text-text-secondary">{task.id}</span>
      </div>
      <p className="mt-1 text-xs text-text-secondary">
        {task.train ?? "—"} · {task.target}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {task.taskType ? (
          <LarkStatusTag value={task.taskType} />
        ) : null}
        <LarkStatusTag value={task.status} />
      </div>
      <p className="mt-2 text-xs text-text-secondary">
        进度 {task.progress}% · {task.updatedAt}
      </p>
    </Card>
  );
}

function BoardColumnHeader({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  const meta = getStatusIconMeta(label);
  const Icon = meta.Icon;

  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
        <span
          className={`flex size-6 items-center justify-center rounded-md ${meta.bgClass}`}
        >
          <Icon className={`size-3.5 ${meta.iconClass}`} strokeWidth={2} aria-hidden />
        </span>
        {label}
      </span>
      <span className="rounded-full bg-card px-2 py-0.5 text-xs text-text-secondary">
        {count}
      </span>
    </div>
  );
}

export function OrchestrationOverviewPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("board");
  const platformTasks = useMemo(
    () => orchestrationTasks.filter((t) => t.taskType),
    [],
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <LarkStatusKpiCard
          label="待处理"
          value={countPlatformTasksByStatus("待处理")}
        />
        <LarkStatusKpiCard
          label="处理中"
          value={countPlatformTasksByStatus("处理中")}
        />
        <LarkStatusKpiCard
          label="今日已处理"
          statusKey="已处理"
          value={countPlatformTasksByStatus("已处理")}
        />
        <LarkStatusKpiCard
          label="异常"
          value={countPlatformTasksByStatus("异常")}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardTitleWithHint
          title="平台工单"
          hint="看板 · 时间轴 · 列表"
        />
        <Radio.Group
          type="button"
          value={viewMode}
          onChange={(v) => setViewMode(v as ViewMode)}
        >
          <Radio value="board">看板</Radio>
          <Radio value="timeline">时间轴</Radio>
          <Radio value="list">列表</Radio>
        </Radio.Group>
      </div>

      {viewMode === "board" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {boardColumns.map((col) => {
            const items = platformTasks.filter((t) => t.status === col.key);
            return (
              <div
                key={col.key}
                className="rounded-xl border border-border bg-app/50 p-3"
              >
                <BoardColumnHeader label={col.label} count={items.length} />
                {items.length === 0 ? (
                  <p className="py-8 text-center text-xs text-text-secondary">
                    暂无工单
                  </p>
                ) : (
                  items.map((task) => <TaskBoardCard key={task.id} task={task} />)
                )}
              </div>
            );
          })}
        </div>
      ) : null}

      {viewMode === "timeline" ? (
        <Card bordered className="lark-card-elevated">
          <div className="relative space-y-0 pl-6">
            <div className="absolute bottom-0 left-2 top-0 w-px bg-border" />
            {[...platformTasks]
              .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
              .map((task) => {
                const meta = getStatusIconMeta(task.status);
                const Icon = meta.Icon;
                return (
                  <div key={task.id} className="relative pb-6 last:pb-0">
                    <span
                      className={`absolute -left-6 top-1 flex size-4 items-center justify-center rounded-full ring-2 ring-card ${meta.bgClass}`}
                    >
                      <Icon
                        className={`size-2.5 ${meta.iconClass}`}
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    </span>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-medium text-text-primary">{task.name}</p>
                        <span className="text-xs text-text-secondary">
                          {task.updatedAt}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-text-secondary">
                        {task.trigger}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <LarkStatusTag value={task.status} />
                        <span className="text-xs text-text-secondary">
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      ) : null}

      {viewMode === "list" ? (
        <DataTableCard
          title=""
          data={platformTasks}
          columns={[
            { title: "平台工单", dataIndex: "id", width: 96 },
            {
              title: "调度计划",
              dataIndex: "dispatchId",
              width: 96,
              render: (v) => (v ? String(v) : "—"),
            },
            { title: "任务名称", dataIndex: "name" },
            { title: "列车", dataIndex: "train", width: 70 },
            { title: "目标模块", dataIndex: "target", width: 140 },
            { title: "触发条件", dataIndex: "trigger", width: 160 },
            {
              title: "工单状态",
              dataIndex: "status",
              width: 110,
              render: (v) => <LarkStatusTag value={String(v)} />,
            },
            {
              title: "进度",
              dataIndex: "progress",
              width: 80,
              render: (v) => `${v}%`,
            },
            { title: "更新", dataIndex: "updatedAt", width: 80 },
          ]}
        />
      ) : null}
    </div>
  );
}
