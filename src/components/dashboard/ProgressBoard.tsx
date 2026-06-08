"use client";

import { Card, Progress } from "@arco-design/web-react";
import { Clock, MapPin, User } from "lucide-react";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import type { ProgressItem, ProgressTaskDetail } from "@/lib/types";

type ProgressBoardProps = {
  items: ProgressItem[];
  density?: "default" | "compact";
  title?: React.ReactNode;
};

const statusColor: Record<ProgressItem["status"], string> = {
  正常: "#3370FF",
  逆向: "#D97706",
  异常: "#E11D48",
};

const taskProgressColor = (status: ProgressTaskDetail["status"]) => {
  if (status === "异常") return "#E11D48";
  if (status === "处理中") return "#D97706";
  return "#3370FF";
};

const BOARD_SCROLL_MAX = "min(68vh,640px)";
const TASK_LIST_SCROLL_MAX = 240;

function formatLocation(task: ProgressTaskDetail) {
  if (task.train && task.track) {
    return `${task.train} · ${task.track}`;
  }
  if (task.train) {
    return task.train;
  }
  return null;
}

function formatTaskMeta(task: ProgressTaskDetail) {
  const location = formatLocation(task);
  const operator = task.operator.split("·").pop()?.trim() ?? task.operator;
  const time =
    task.startedAt === "—"
      ? "未开始"
      : task.eta && task.eta !== "—"
        ? `${task.startedAt} · ${task.eta}`
        : task.startedAt;
  return [location, task.phase, operator, time].filter(Boolean).join(" · ");
}

function CompactTaskRow({ task }: { task: ProgressTaskDetail }) {
  return (
    <div className="flex h-12 min-h-[48px] items-center gap-2 border-b border-border/50 px-2 last:border-b-0 hover:bg-[#F5F6F7]/80">
      <span className="w-10 shrink-0 font-mono text-[11px] text-text-secondary">
        {task.id}
      </span>
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-xs font-medium text-text-primary">
            {task.title}
          </span>
          <LarkStatusTag value={task.status} showIcon={false} />
        </div>
        <p className="truncate text-[11px] leading-4 text-text-secondary">
          {formatTaskMeta(task)}
        </p>
      </div>
      <div className="flex w-[88px] shrink-0 items-center gap-1.5 sm:w-24">
        <Progress
          percent={task.progress}
          showText={false}
          color={taskProgressColor(task.status)}
          size="small"
          className="min-w-0 flex-1 [&_.arco-progress-line-outer]:!h-1"
        />
        <span className="w-7 shrink-0 text-right text-[11px] font-medium tabular-nums text-brand">
          {task.progress}%
        </span>
      </div>
    </div>
  );
}

function CompactSection({ item }: { item: ProgressItem }) {
  const percent = Math.round((item.current / item.total) * 100);

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-sm font-medium text-text-primary">
            {item.name}
          </span>
          <LarkStatusTag value={item.status} showIcon={false} />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-[11px] text-text-secondary sm:inline">
            {item.current}/{item.total}
          </span>
          <div className="w-14 sm:w-16">
            <Progress
              percent={percent}
              showText={false}
              color={statusColor[item.status]}
              size="small"
              className="[&_.arco-progress-line-outer]:!h-1"
            />
          </div>
          <span
            className="w-8 text-right text-[11px] font-medium tabular-nums"
            style={{ color: statusColor[item.status] }}
          >
            {percent}%
          </span>
        </div>
      </div>
      {item.summary ? (
        <p className="truncate border-b border-border/40 bg-app/40 px-3 py-1 text-[11px] text-text-secondary">
          {item.summary}
        </p>
      ) : null}
      {item.tasks && item.tasks.length > 0 ? (
        <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
          {item.tasks.map((task) => (
            <CompactTaskRow key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <p className="px-3 py-6 text-center text-xs text-text-secondary">
          暂无任务
        </p>
      )}
    </section>
  );
}

function CompactProgressBoard({
  items,
  title = "作业进度看板",
}: {
  items: ProgressItem[];
  title?: React.ReactNode;
}) {
  return (
    <Card
      title={title}
      bordered
      className="lark-card-elevated lark-progress-board-compact"
    >
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {items.map((item) => (
          <CompactSection key={item.id} item={item} />
        ))}
      </div>
    </Card>
  );
}

function TaskScrollList({
  tasks,
}: {
  tasks: NonNullable<ProgressItem["tasks"]>;
}) {
  return (
    <div>
      <div
        className="space-y-2 overflow-y-auto rounded-lg bg-slate-50/80 p-3 [scrollbar-color:rgba(0,0,0,0.15)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/15"
        style={{ maxHeight: TASK_LIST_SCROLL_MAX }}
      >
        {tasks.map((task) => {
          const location = formatLocation(task);
          return (
            <div
              key={task.id}
              className="rounded-md border border-border/60 bg-white px-3 py-2.5"
            >
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-text-secondary">
                      {task.id}
                    </span>
                    <span className="text-sm text-text-primary">
                      {task.title}
                    </span>
                    <LarkStatusTag value={task.status} />
                  </div>
                  {location ? (
                    <div className="mt-1 flex items-center gap-1 text-xs text-text-secondary">
                      <MapPin className="size-3 shrink-0" />
                      {location}
                    </div>
                  ) : null}
                </div>
                <span className="text-xs font-medium tabular-nums text-brand">
                  {task.progress}%
                </span>
              </div>

              <div className="mb-2">
                <Progress
                  percent={task.progress}
                  showText={false}
                  color={taskProgressColor(task.status)}
                  size="small"
                />
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary">
                <span>阶段 · {task.phase}</span>
                <span className="inline-flex items-center gap-1">
                  <User className="size-3" />
                  {task.operator}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" />
                  {task.startedAt === "—"
                    ? "未开始"
                    : `${task.startedAt} 起`}
                  {task.eta && task.eta !== "—"
                    ? ` · 预计 ${task.eta}`
                    : null}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {tasks.length > 2 ? (
        <p className="mt-1.5 text-center text-[11px] text-text-secondary">
          共 {tasks.length} 项 · 上下滑动查看
        </p>
      ) : null}
    </div>
  );
}

function DefaultProgressBoard({ items }: { items: ProgressItem[] }) {
  return (
    <Card title="作业进度看板" bordered className="lark-card-elevated">
      <div
        className="overflow-y-auto pr-1 [scrollbar-color:rgba(0,0,0,0.15)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/15"
        style={{ maxHeight: BOARD_SCROLL_MAX }}
      >
        <div className="divide-y divide-border">
          {items.map((item) => {
            const percent = Math.round((item.current / item.total) * 100);
            return (
              <div key={item.id} className="py-5 first:pt-0 last:pb-0">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-primary">
                      {item.name}
                    </span>
                    <LarkStatusTag value={item.status} />
                  </div>
                  <span className="text-xs text-text-secondary">
                    {item.current}/{item.total} · 完成 {percent}%
                  </span>
                </div>

                {item.summary ? (
                  <p className="mb-3 text-xs text-text-secondary">
                    {item.summary}
                  </p>
                ) : null}

                <div className="mb-3 flex items-center gap-3">
                  <Progress
                    percent={percent}
                    showText={false}
                    color={statusColor[item.status]}
                    size="small"
                    className="flex-1"
                  />
                  <span
                    className="w-10 text-right text-xs font-medium tabular-nums"
                    style={{ color: statusColor[item.status] }}
                  >
                    {percent}%
                  </span>
                </div>

                {item.tasks && item.tasks.length > 0 ? (
                  <TaskScrollList tasks={item.tasks} />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      {items.length > 2 ? (
        <p className="mt-3 border-t border-border pt-3 text-center text-[11px] text-text-secondary">
          共 {items.length} 类作业 · 看板区域可上下滑动
        </p>
      ) : null}
    </Card>
  );
}

export function ProgressBoard({
  items,
  density = "default",
  title,
}: ProgressBoardProps) {
  if (density === "compact") {
    return <CompactProgressBoard items={items} title={title} />;
  }
  return <DefaultProgressBoard items={items} />;
}
