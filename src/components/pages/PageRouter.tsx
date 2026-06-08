"use client";

import type { ComponentType } from "react";
import { PlaceholderPage } from "@/components/common/PlaceholderPage";
import { DashboardQuickPage } from "@/components/pages/DashboardQuickPage";
import { ExchangeModulePage } from "@/components/pages/exchange/ExchangeModulePage";
import { ExchangeMonitorPage } from "@/components/pages/exchange/ExchangeMonitorPage";
import { PushConfigPage } from "@/components/pages/exchange/PushConfigPage";
import { OrchestrationOverviewPage } from "@/components/pages/orchestration/OrchestrationOverviewPage";
import { OrchestrationSmartDispatchPage } from "@/components/pages/orchestration/OrchestrationSmartDispatchPage";
import { OrchestrationFullFlowPage } from "@/components/pages/orchestration/OrchestrationFullFlowPage";
import { OrchestrationLinkagePage } from "@/components/pages/orchestration/OrchestrationLinkagePage";
import { TaskIssuePage } from "@/components/pages/orchestration/TaskIssuePage";
import { DisplayScreenPage } from "@/components/pages/display/DisplayScreenPage";
import { DisplayDevicePage } from "@/components/pages/display/DisplayDevicePage";
import { DisplayProgressPage } from "@/components/pages/display/DisplayProgressPage";
import { DisplayKpiPage } from "@/components/pages/display/DisplayKpiPage";
import { DisplayFaultPage } from "@/components/pages/display/DisplayFaultPage";
import { DisplayLedgerPage } from "@/components/pages/display/DisplayLedgerPage";
import { ProcessVehicleSyncPage } from "@/components/pages/process/ProcessVehicleSyncPage";
import { ProcessAggregatePage } from "@/components/pages/process/ProcessAggregatePage";
import { AnalysisVehiclePage } from "@/components/pages/analysis/AnalysisVehiclePage";
import { AnalysisStatsPage } from "@/components/pages/analysis/AnalysisStatsPage";
import { AnalysisReportPage } from "@/components/pages/analysis/AnalysisReportPage";
import { TrainingDataPage } from "@/components/pages/analysis/TrainingDataPage";
import { ModelOverviewPage } from "@/components/pages/model/ModelOverviewPage";
import { ModelDeployPage } from "@/components/pages/model/ModelDeployPage";
import { ModelTrainPage } from "@/components/pages/model/ModelTrainPage";
import { ModelPredictPage } from "@/components/pages/model/ModelPredictPage";
import { ModelEvaluatePage } from "@/components/pages/model/ModelEvaluatePage";
import { AlertRealtimePage } from "@/components/pages/alert/AlertRealtimePage";
import { AlertDisposalPage } from "@/components/pages/alert/AlertDisposalPage";
import { AlertTracePage } from "@/components/pages/alert/AlertTracePage";
import { AlertConfigPage } from "@/components/pages/alert/AlertConfigPage";
import { StorageArchivePage } from "@/components/pages/storage/StorageArchivePage";
import { StorageExportPage } from "@/components/pages/storage/StorageExportPage";
import { StorageTracePage } from "@/components/pages/storage/StorageTracePage";
import { SystemUsersPage } from "@/components/pages/system/SystemUsersPage";
import { SystemRolesPage } from "@/components/pages/system/SystemRolesPage";
import { SystemMobilePage } from "@/components/pages/system/SystemMobilePage";
import { SystemParamsPage } from "@/components/pages/system/SystemParamsPage";
import { SystemApiPage } from "@/components/pages/system/SystemApiPage";
import { SystemLogsPage } from "@/components/pages/system/SystemLogsPage";
import { SystemMaintenancePage } from "@/components/pages/system/SystemMaintenancePage";
import { LarkStandardPageShell } from "@/components/lark";
import {
  getPageLayoutMeta,
  shouldUseStandardShell,
} from "@/lib/design-system/pageLayoutConfig";
import { exchangeModules } from "@/lib/mock/pages";

type PageComponent = ComponentType;

function ExchangePage({ moduleKey }: { moduleKey: string }) {
  const config = exchangeModules[moduleKey];
  if (!config) return null;
  return <ExchangeModulePage config={config} moduleKey={moduleKey} />;
}

const pageRegistry: Record<string, PageComponent> = {
  "/dashboard/quick": DashboardQuickPage,

  "/exchange/dispatch": () => <ExchangePage moduleKey="dispatch" />,
  "/exchange/vehicle": () => <ExchangePage moduleKey="vehicle" />,
  "/exchange/loading": () => <ExchangePage moduleKey="loading" />,
  "/exchange/processing": () => <ExchangePage moduleKey="processing" />,
  "/exchange/inspection": () => <ExchangePage moduleKey="inspection" />,
  "/exchange/screen": () => <PushConfigPage type="screen" />,
  "/exchange/monitor": ExchangeMonitorPage,

  "/orchestration/overview": OrchestrationOverviewPage,
  "/orchestration/smart-dispatch": OrchestrationSmartDispatchPage,
  "/orchestration/loading-task": () => (
    <TaskIssuePage taskType="上砂" targetModule="移动上砂装置" />
  ),
  "/orchestration/processing-task": () => (
    <TaskIssuePage taskType="砂处理" targetModule="智能砂处理装置" />
  ),
  "/orchestration/full-flow": OrchestrationFullFlowPage,
  "/orchestration/linkage": OrchestrationLinkagePage,

  "/display/screen": DisplayScreenPage,
  "/display/device": DisplayDevicePage,
  "/display/progress": DisplayProgressPage,
  "/display/kpi": DisplayKpiPage,
  "/display/fault": DisplayFaultPage,
  "/display/ledger": DisplayLedgerPage,

  "/process/vehicle-sync": ProcessVehicleSyncPage,
  "/process/aggregate": ProcessAggregatePage,

  "/analysis/vehicle": AnalysisVehiclePage,
  "/analysis/stats": AnalysisStatsPage,
  "/analysis/report": AnalysisReportPage,
  "/analysis/training-data": TrainingDataPage,

  "/model/overview": ModelOverviewPage,
  "/model/deploy": ModelDeployPage,
  "/model/train": ModelTrainPage,
  "/model/predict": ModelPredictPage,
  "/model/evaluate": ModelEvaluatePage,

  "/alert/realtime": AlertRealtimePage,
  "/alert/disposal": AlertDisposalPage,
  "/alert/trace": AlertTracePage,
  "/alert/config": AlertConfigPage,

  "/storage/archive": StorageArchivePage,
  "/storage/export": StorageExportPage,
  "/storage/trace": StorageTracePage,

  "/system/users": SystemUsersPage,
  "/system/roles": SystemRolesPage,
  "/system/mobile": SystemMobilePage,
  "/system/params": SystemParamsPage,
  "/system/api": SystemApiPage,
  "/system/logs": SystemLogsPage,
  "/system/maintenance": SystemMaintenancePage,
};

type PageRouterProps = {
  path: string;
  title: string;
  description: string;
  sectionLabel: string;
};

export function PageRouter({
  path,
  title,
  description,
  sectionLabel,
}: PageRouterProps) {
  const PageComponent = pageRegistry[path];

  if (PageComponent) {
    const content = <PageComponent />;

    if (shouldUseStandardShell(path)) {
      const layout = getPageLayoutMeta(path, sectionLabel);
      return (
        <LarkStandardPageShell
          description={description}
          sectionLabel={sectionLabel}
          layout={layout}
        >
          {content}
        </LarkStandardPageShell>
      );
    }

    return <div className="space-y-5">{content}</div>;
  }

  return (
    <PlaceholderPage
      title={title}
      description={description}
      sectionLabel={sectionLabel}
    />
  );
}
