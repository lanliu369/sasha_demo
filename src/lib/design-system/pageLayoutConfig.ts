import type { ChartBarItem, MetricItem } from "@/lib/types/demo";
import { statsChart } from "@/lib/mock/pages";

export type PageLayoutMeta = {
  /** 页面自带 KPI，壳层不再注入 */
  hasOwnKpis?: boolean;
  /** 无自带 KPI 时使用的默认指标 */
  defaultKpis?: MetricItem[];
  /** 趋势图数据；空数组表示不展示 */
  chartItems?: ChartBarItem[];
  chartTitle?: string;
  chartHint?: string;
};

/** 各菜单首个功能页 + 已深度改版的页面，不套标准壳层 */
export const SKIP_SHELL_PATHS = new Set([
  "/orchestration/overview",
  "/display/device",
  "/analysis/vehicle",
  "/analysis/stats",
  "/analysis/report",
  "/model/overview",
  "/model/evaluate",
  "/alert/realtime",
  "/alert/disposal",
  "/lifecycle/supplier",
  "/lifecycle/trace",
  "/lifecycle/trace",
  "/system/users",
]);

/**
 * 配置/规则/台账类页面 — 仅保留说明条 + 业务内容，不注入模块 KPI 与通用趋势图
 */
export const INTRO_ONLY_SHELL_PATHS = new Set([
  "/dashboard/quick",
  "/alert/config",
  "/system/roles",
  "/system/mobile",
  "/system/params",
  "/system/api",
  "/system/logs",
  "/system/maintenance",
  "/lifecycle/procurement",
  "/lifecycle/warehouse",
  "/lifecycle/supply",
  "/lifecycle/trace",
  "/storage/export",
  "/storage/trace",
  "/model/deploy",
]);

export function shouldUseStandardShell(path: string): boolean {
  return !SKIP_SHELL_PATHS.has(path);
}

const sectionDefaultKpis: Record<string, MetricItem[]> = {
  工作台: [
    { key: "online", label: "在线列车", value: 12, unit: "列", trend: "up", trendValue: "+1" },
    { key: "task", label: "进行中任务", value: 8, unit: "项", trend: "flat", trendValue: "—" },
    { key: "alert", label: "待处理告警", value: 3, unit: "条", trend: "down", trendValue: "-1" },
  ],
  调度中心: [
    { key: "pending", label: "待处理工单", value: 4, unit: "项", trend: "up", trendValue: "+1" },
    { key: "running", label: "执行中", value: 2, unit: "项", trend: "flat", trendValue: "—" },
    { key: "done", label: "今日完成", value: 6, unit: "项", trend: "up", trendValue: "+2" },
    { key: "auto", label: "自动编排", value: "开启", trend: "flat", trendValue: "—" },
  ],
  运行监测: [
    { key: "device", label: "在线设备", value: 24, unit: "台", trend: "up", trendValue: "+2" },
    { key: "progress", label: "进行中作业", value: 5, unit: "项", trend: "flat", trendValue: "—" },
    { key: "fault", label: "故障告警", value: 1, unit: "条", trend: "down", trendValue: "-1" },
    { key: "kpi", label: "KPI 达标率", value: 96, unit: "%", trend: "up", trendValue: "+1%" },
  ],
  模块对接: [
    { key: "device", label: "在线设备", value: 24, unit: "台", trend: "up", trendValue: "+2" },
    { key: "sync", label: "数据同步", value: 1286, unit: "条/时", trend: "up", trendValue: "+8%" },
    { key: "warn", label: "异常连接", value: 1, unit: "路", trend: "down", trendValue: "-1" },
    { key: "latency", label: "平均延迟", value: 86, unit: "ms", trend: "down", trendValue: "-12ms" },
  ],
  分析中心: [
    { key: "records", label: "分析记录", value: 4520, unit: "条", trend: "up", trendValue: "+320" },
    { key: "pipeline", label: "汇聚管道", value: 4, unit: "路运行", trend: "flat", trendValue: "—" },
    { key: "quality", label: "数据质量", value: 96, unit: "%", trend: "up", trendValue: "+1%" },
    { key: "sample", label: "样本入库", value: 864, unit: "条/日", trend: "up", trendValue: "+12%" },
  ],
  模型中心: [
    { key: "train", label: "训练中", value: 1, unit: "项", trend: "flat", trendValue: "—" },
    { key: "deploy", label: "待部署", value: 2, unit: "项", trend: "up", trendValue: "+1" },
    { key: "infer", label: "推理中", value: 8, unit: "车", trend: "up", trendValue: "+1" },
    { key: "acc", label: "平均准确率", value: 94, unit: "%", trend: "up", trendValue: "+0.5%" },
  ],
  砂数据追溯: [
    { key: "records", label: "数据记录", value: 1286, unit: "条", trend: "up", trendValue: "+86" },
    { key: "supplier", label: "准入供应商", value: 12, unit: "家", trend: "up", trendValue: "+1" },
    { key: "procure", label: "本月采购", value: 8, unit: "批", trend: "flat", trendValue: "—" },
    { key: "supply", label: "补给计划", value: 5, unit: "项", trend: "up", trendValue: "+2" },
  ],
  预警中心: [
    { key: "records", label: "数据记录", value: 1286, unit: "条", trend: "up", trendValue: "+86" },
    { key: "alert", label: "待处置", value: 2, unit: "条", trend: "down", trendValue: "-1" },
    { key: "today", label: "今日告警", value: 6, unit: "条", trend: "flat", trendValue: "—" },
    { key: "closed", label: "已闭环", value: 12, unit: "条", trend: "up", trendValue: "+3" },
  ],
  数据存储: [
    { key: "records", label: "数据记录", value: 1286, unit: "条", trend: "up", trendValue: "+86" },
    { key: "archive", label: "归档容量", value: 2.4, unit: "TB", trend: "up", trendValue: "+0.1TB" },
    { key: "export", label: "导出任务", value: 3, unit: "项", trend: "flat", trendValue: "—" },
    { key: "trace", label: "追溯查询", value: 36, unit: "次/日", trend: "flat", trendValue: "—" },
  ],
  系统管理: [
    { key: "users", label: "活跃用户", value: 18, unit: "人", trend: "flat", trendValue: "—" },
    { key: "roles", label: "角色数", value: 6, unit: "个", trend: "flat", trendValue: "—" },
    { key: "api", label: "API 密钥", value: 4, unit: "个", trend: "flat", trendValue: "—" },
    { key: "health", label: "系统健康", value: 100, unit: "%", trend: "up", trendValue: "正常" },
  ],
};

const PATHS_WITH_OWN_KPIS = new Set([
  "/exchange/dispatch",
  "/exchange/vehicle",
  "/exchange/loading",
  "/exchange/processing",
  "/exchange/inspection",
  "/exchange/screen",
  "/exchange/mobile",
  "/exchange/monitor",
  "/display/progress",
  "/display/kpi",
  "/display/fault",
  "/display/ledger",
  "/display/screen",
  "/orchestration/smart-dispatch",
  "/orchestration/loading-task",
  "/orchestration/processing-task",
  "/orchestration/full-flow",
  "/orchestration/linkage",
  "/process/vehicle-sync",
  "/process/aggregate",
  "/analysis/training-data",
  "/model/train",
  "/model/predict",
  "/storage/archive",
  "/alert/trace",
]);

const pathOverrides: Record<string, Partial<PageLayoutMeta>> = {
  "/model/predict": {
    hasOwnKpis: true,
  },
  "/alert/disposal": {
    chartItems: [
      { label: "严重", value: 1 },
      { label: "警告", value: 3 },
      { label: "提示", value: 5 },
      { label: "已关闭", value: 12 },
    ],
    chartTitle: "告警分级分布",
  },
};

export function getPageLayoutMeta(
  path: string,
  sectionLabel: string,
): PageLayoutMeta {
  if (INTRO_ONLY_SHELL_PATHS.has(path)) {
    return {
      hasOwnKpis: true,
      defaultKpis: [],
      chartItems: [],
    };
  }

  const override = pathOverrides[path] ?? {};
  const hasOwnKpis =
    override.hasOwnKpis ?? PATHS_WITH_OWN_KPIS.has(path);

  /** 页面已有业务 KPI/规则内容时，不再附加通用趋势图（除非 pathOverrides 显式配置） */
  const chartItems =
    override.chartItems ?? (hasOwnKpis ? [] : statsChart);

  return {
    hasOwnKpis,
    defaultKpis: sectionDefaultKpis[sectionLabel] ?? sectionDefaultKpis["砂数据追溯"],
    chartTitle: override.chartTitle ?? "业务数据趋势",
    chartHint: override.chartHint ?? "近 7 日汇总",
    ...override,
    chartItems,
  };
}
