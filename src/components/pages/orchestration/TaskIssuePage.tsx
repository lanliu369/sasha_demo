"use client";

import { Card } from "@arco-design/web-react";
import { BusinessTaskDispatchCard } from "@/components/demo/BusinessTaskDispatchCard";
import { OrchestrationTraceCard } from "@/components/demo/OrchestrationTraceCard";
import { getDefaultIssueTask } from "@/lib/mock/orchestrationTasks";

type TaskIssuePageProps = {
  taskType: "上砂" | "砂处理";
  targetModule: string;
};

export function TaskIssuePage({ taskType, targetModule }: TaskIssuePageProps) {
  const activeTask = getDefaultIssueTask(taskType);

  return (
    <div className="space-y-5">
      <OrchestrationTraceCard task={activeTask} variant="issue" />
      <Card title={`${taskType}平台工单`} bordered className="lark-card-elevated">
        <p className="max-w-2xl text-sm leading-relaxed text-text-primary">
          任务编排生成平台工单，初始状态为
          <span className="mx-1 font-medium text-brand">待处理</span>。
          在本页选择工单并下发至{targetModule}后变为
          <span className="mx-1 font-medium text-brand">处理中</span>；
          装置执行完成并回传数据后，平台更新为
          <span className="mx-1 font-medium text-emerald-600">已处理</span>。
        </p>
        <ol className="mt-4 max-w-2xl space-y-2 text-xs text-text-secondary">
          <li>1. 智能调度完成资源分配 → 生成平台工单（待处理）</li>
          <li>2. 调度中心手动下发或开启自动下发 → 指令推送至{targetModule}</li>
          <li>3. 装置执行并回传进度/结果 → 模块对接页展示，工单闭环为已处理</li>
        </ol>
      </Card>
      <BusinessTaskDispatchCard taskType={taskType} moduleName={targetModule} />
    </div>
  );
}
