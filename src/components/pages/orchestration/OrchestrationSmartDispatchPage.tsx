"use client";

import Link from "next/link";
import { Tag } from "@arco-design/web-react";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { MetricCards } from "@/components/demo/MetricCards";
import { OrchestrationTraceCard } from "@/components/demo/OrchestrationTraceCard";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import {
  getDefaultIssueTask,
  smartDispatchPlans,
} from "@/lib/mock/orchestrationTasks";

export function OrchestrationSmartDispatchPage() {
  const focusTask = getDefaultIssueTask("上砂");

  return (
    <div className="space-y-5">
      <OrchestrationTraceCard task={focusTask} variant="dispatch" />
      <MetricCards
        moduleKey="smart-dispatch"
        items={[
          { key: "plans", label: "待调度计划", value: 3, unit: "项", trend: "up", trendValue: "+1" },
          { key: "running", label: "执行中", value: 1, unit: "项", trend: "flat", trendValue: "—" },
          { key: "queue", label: "排队", value: 1, unit: "项", trend: "flat", trendValue: "—" },
          { key: "auto", label: "自动编排", value: "开启", trend: "flat", trendValue: "—" },
        ]}
      />
      <DataTableCard
        title="智能调度计划"
        data={smartDispatchPlans}
        columns={[
          { title: "调度计划", dataIndex: "id", width: 96 },
          { title: "编排工单", dataIndex: "orderId", width: 96 },
          { title: "列车", dataIndex: "train", width: 70 },
          { title: "关联计划", dataIndex: "plan", width: 140 },
          { title: "优先级", dataIndex: "priority", width: 80 },
          { title: "分配资源", dataIndex: "resource", width: 120 },
          { title: "预计", dataIndex: "eta", width: 80 },
          {
            title: "状态",
            dataIndex: "status",
            width: 90,
            render: (v) => (
              <Tag
                color={
                  v === "执行中" ? "arcoblue" : v === "排队" ? "orange" : "gray"
                }
                className="!rounded-md"
              >
                {String(v)}
              </Tag>
            ),
          },
          {
            title: "任务下发",
            dataIndex: "issuePath",
            width: 96,
            render: (path, record) => (
              <Link
                href={String(path)}
                className="text-xs text-brand hover:underline"
                title={`平台工单 ${String(record.orderId)} · 调度中心下发`}
              >
                {record.taskType === "砂处理" ? "砂处理" : "上砂"}
              </Link>
            ),
          },
        ]}
      />
      <p className="text-xs text-text-secondary">
        说明：同一计划在「智能调度」为 <span className="font-mono text-brand">SDxx</span>，
        在「调度总览 / 任务下发」为 <span className="font-mono text-brand">Oxxx</span>，
        在「调度中心对接」为 <span className="font-mono text-brand">DPxx / 批次号</span>。
        例如 G101 上砂：DP03 → SD01 → O001。
      </p>
    </div>
  );
}
