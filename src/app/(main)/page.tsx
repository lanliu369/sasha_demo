import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AlertList } from "@/components/dashboard/AlertList";
import { CockpitSection } from "@/components/dashboard/CockpitSection";
import { DashboardCockpit } from "@/components/dashboard/DashboardCockpit";
import { ProgressSummary } from "@/components/dashboard/ProgressSummary";
import { SubsystemPanel } from "@/components/dashboard/SubsystemPanel";
import { TaskList } from "@/components/dashboard/TaskList";
import {
  jobProgress,
  pendingTasks,
  recentAlerts,
} from "@/lib/mock/dashboard";

export default function DashboardPage() {
  return (
    <AppLayout title="工作台">
      <div className="cockpit-page space-y-10">
        <CockpitSection
          index="01"
          title="运营态势总览"
          hint="在线列车 · 今日任务 · 预警 · 撒砂成功率 · 模型健康 · 司机风险"
        >
          <DashboardCockpit />
        </CockpitSection>

        <CockpitSection
          index="02"
          title="外围模块交互"
          hint="核心业务 · 展示终端 · 检测辅助 · 点击查看模块对接"
          action={
            <Link
              href="/exchange/monitor"
              className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
            >
              接口健康监控
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          }
        >
          <SubsystemPanel embedded />
        </CockpitSection>

        <CockpitSection
          index="03"
          title="待办与告警"
          hint="调度工单处理 · 实时预警跟踪 · 卡片右上角进入对应功能模块"
        >
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-5 lg:gap-5">
            <div className="flex min-h-[320px] lg:col-span-3">
              <TaskList tasks={pendingTasks} fillHeight />
            </div>
            <div className="flex min-h-[320px] lg:col-span-2">
              <AlertList alerts={recentAlerts} fillHeight />
            </div>
          </div>
        </CockpitSection>

        <CockpitSection
          index="04"
          title="作业进度概览"
          hint="上砂 · 砂处理 · 加砂计划 · 异常处置 · 详情见运行监测"
          action={
            <Link
              href="/display/progress"
              className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
            >
              查看作业进度
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          }
        >
          <ProgressSummary items={jobProgress} embedded />
        </CockpitSection>
      </div>
    </AppLayout>
  );
}
