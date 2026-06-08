"use client";

import Link from "next/link";
import { Card } from "@arco-design/web-react";
import { ArrowRight } from "lucide-react";
import { DemoArcoTable } from "@/components/demo/DemoArcoTable";
import { LarkTag } from "@/components/demo/LarkTag";
import { TruncatedText } from "@/components/demo/TruncatedText";
import type { DemoArcoColumnDef } from "@/lib/ui/demoArcoTable";
import { taskTypeVariant } from "@/lib/ui/larkTag";
import type { TaskItem } from "@/lib/types";

type TaskListProps = {
  tasks: TaskItem[];
  fillHeight?: boolean;
};

const statusColor: Record<
  TaskItem["status"],
  "neutral" | "info" | "danger" | "success"
> = {
  待处理: "neutral",
  待下发: "neutral",
  处理中: "info",
  进行中: "info",
  已处理: "success",
  异常: "danger",
};

const typeColor: Record<TaskItem["type"], "info" | "success" | "neutral"> = {
  上砂: "info",
  砂处理: "success",
  调度: "neutral",
};

const columns: DemoArcoColumnDef<TaskItem>[] = [
  { title: "任务编号", dataIndex: "id", width: 90 },
  {
    title: "任务名称",
    dataIndex: "title",
    width: 200,
    render: (title) => <TruncatedText text={String(title)} className="text-sm" />,
  },
  {
    title: "类型",
    dataIndex: "type",
    width: 90,
    render: (type) => (
      <LarkTag variant={taskTypeVariant[type as TaskItem["type"]] ?? typeColor[type as TaskItem["type"]]}>
        {String(type)}
      </LarkTag>
    ),
  },
  {
    title: "关联设备",
    dataIndex: "device",
    width: 130,
    render: (device) => (
      <TruncatedText text={String(device)} className="text-sm" />
    ),
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 90,
    render: (status) => (
      <LarkTag variant={statusColor[status as TaskItem["status"]]}>
        {String(status)}
      </LarkTag>
    ),
  },
  { title: "更新时间", dataIndex: "updatedAt", width: 90 },
];

export function TaskList({ tasks, fillHeight = false }: TaskListProps) {
  return (
    <Card
      title="调度工单"
      extra={
        <Link
          href="/orchestration/overview"
          className="inline-flex items-center gap-0.5 text-sm text-brand hover:underline"
        >
          调度总览
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      }
      bordered
      className={`lark-card-elevated lark-data-table-card w-full ${
        fillHeight
          ? "flex h-full flex-col [&_.arco-card-body]:flex [&_.arco-card-body]:min-h-0 [&_.arco-card-body]:flex-1 [&_.arco-card-body]:flex-col"
          : ""
      }`}
    >
      <DemoArcoTable columns={columns} data={tasks} rowKey="id" pageSize={5} />
    </Card>
  );
}
