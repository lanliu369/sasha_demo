import type { StatItem } from "@/lib/types";

export type ConnectionStatus = "online" | "warning" | "offline";

export type MetricItem = StatItem;

import type { ReactNode } from "react";

export type TableColumn<T = Record<string, unknown>> = {
  title: string;
  dataIndex: keyof T & string;
  width?: number;
  render?: (value: unknown, record: T) => ReactNode;
};

export type SyncLogItem = {
  id: string;
  time: string;
  direction: "上行" | "下行";
  dataType: string;
  size: string;
  status: "成功" | "失败" | "重试";
};

/** 大屏 / 移动终端推送记录 */
export type PushRecordItem = {
  id: string;
  time: string;
  widgets: string;
  layout: string;
  size: string;
  latency: string;
  status: "成功" | "失败" | "重试";
};

export type DataFieldUnit = {
  id: string;
  name: string;
  status: string;
  detail: string;
  updatedAt: string;
};

export type ExchangeModuleConfig = {
  moduleName: string;
  endpoint: string;
  status: ConnectionStatus;
  latency: number;
  lastSync: string;
  metrics: MetricItem[];
  dataFields: {
    label: string;
    value: string;
    updatedAt: string;
    /** 同模块下多台设备/子单元状态（如移动上砂装置多股道） */
    units?: DataFieldUnit[];
  }[];
  syncLogs: SyncLogItem[];
};

export type OrchestrationTask = {
  id: string;
  name: string;
  target: string;
  trigger: string;
  status: "待处理" | "处理中" | "已处理" | "异常" | "已完成" | "进行中";
  progress: number;
  updatedAt: string;
  /** 智能调度计划号 SDxx */
  dispatchId?: string;
  /** 调度中心计划批次 DPxx / #批次 */
  planId?: string;
  planBatch?: string;
  train?: string;
  track?: string;
  taskType?: "上砂" | "砂处理";
  /** 智能调度表状态：执行中 / 排队 / 待触发 */
  dispatchStatus?: string;
  resource?: string;
  eta?: string;
  priority?: number;
  /** 任务下发参数摘要 */
  params?: string;
  /** 关联主工单（如车地同步挂接 O001） */
  relatedOrderId?: string;
};

export type RuleItem = {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
  priority: number;
};

/** 结构化触发条件 */
export type AlertCondition = {
  metric: string;
  operator: string;
  value: string;
};

export type AlertConditionLogic = "and" | "or";

/** 告警联动规则 · 区段/模块/设备适用范围 */
export type AlertRuleItem = RuleItem & {
  scopeZone?: string;
  scopeModule?: string;
  scopeDevice?: string;
  conditionMetric?: string;
  conditionOperator?: string;
  conditionValue?: string;
};

/** 告警分级阈值配置 */
export type AlertThresholdConfig = {
  level: string;
  /** 展示用文案（由结构化条件自动生成） */
  threshold: string;
  notify: string;
  channel: string;
  scopeZone?: string;
  scopeModule?: string;
  condition: AlertCondition;
  conditionLogic?: AlertConditionLogic;
  condition2?: AlertCondition;
};

export type DeviceStatusItem = {
  id: string;
  name: string;
  module: string;
  status: ConnectionStatus;
  param: string;
  value: string;
  updatedAt: string;
};

export type ModelInfo = {
  key: string;
  name: string;
  version: string;
  status: "运行中" | "待部署" | "训练中";
  accuracy: string;
  deployTarget: string;
};

export type AlertRecord = {
  id: string;
  level: "high" | "medium" | "low";
  title: string;
  source: string;
  time: string;
  status: "未处理" | "处理中" | "已关闭";
  guide?: string;
};

export type UserRecord = {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "启用" | "禁用";
  lastLogin: string;
};

export type RoleRecord = {
  id: string;
  name: string;
  menuPermissions: string[];
  dataScope: string;
  operatePermissions: string[];
};

export type MobilePermissionRecord = {
  id: string;
  role: string;
  viewItems: string[];
  commandItems: string[];
  devices: string;
};

export type LogRecord = {
  id: string;
  time: string;
  operator: string;
  module: string;
  action: string;
  result: "成功" | "失败";
};

export type ChartBarItem = {
  label: string;
  value: number;
  max?: number;
};

/** 砂批次全生命周期 · 单环节节点 */
export type SandLifecycleStageKey =
  | "procurement"
  | "warehouse"
  | "loading"
  | "spreading";

export type SandLifecycleDetail = {
  label: string;
  value: string;
};

export type SandLifecycleStage = {
  key: SandLifecycleStageKey;
  label: string;
  time: string;
  status: "已完成" | "进行中" | "待执行";
  /** 数据上报来源（设备/子系统） */
  uploadSource: string;
  details: SandLifecycleDetail[];
};

/** 砂批次 · 全生命周期追溯链 */
export type SandLifecycleBatch = {
  batchId: string;
  sandBatch: string;
  supplier: string;
  /** 当前所处环节摘要 */
  currentStage: string;
  status: "在途" | "在库" | "已上砂" | "已撒砂" | "闭环";
  relatedTrain?: string;
  stages: SandLifecycleStage[];
};

export type TrainingDataset = {
  id: string;
  name: string;
  /** 适用的四大撒砂模型类型 */
  modelType: string;
  samples: number;
  labeled: string;
  version: string;
  updatedAt: string;
};

export type TrainJob = {
  id: string;
  model: string;
  dataset: string;
  progress: number;
  epoch: string;
  status: "训练中" | "已完成" | "排队中";
  /** 训练完成后产出的版本号 */
  outputVersion?: string;
  /** 可部署的 ONNX 包名 */
  packageName?: string;
};

export type PredictMonitorItem = {
  id: string;
  train: string;
  model: string;
  inferenceMs: number;
  suggestion: string;
  status: string;
  deployedVersion?: string;
};

export type DeployRecord = {
  id: string;
  model: string;
  target: string;
  method: string;
  time: string;
  status: "成功" | "进行中" | "失败";
  trainJobId?: string;
  packageName?: string;
};

export type SandErrorType = "迟撒" | "早撒" | "未砂" | "过撒";

export type DriverWeakSegment = {
  km: string;
  scenario: string;
  errorType: SandErrorType;
  occurrences: number;
  hint: string;
};

export type DriverAiSummary = {
  headline: string;
  mainRisks: string[];
  monthCompare: { label: string; value: string; positive?: boolean }[];
  suggestion: string;
};

export type DriverProfile = {
  id: string;
  driverId: string;
  name: string;
  train: string;
  score: number;
  trend: "up" | "down" | "flat";
  updatedAt: string;
  weakSegments: DriverWeakSegment[];
  strengthTags: string[];
  riskTags: string[];
  scoreTrend30: number[];
  scoreTrend90: number[];
  aiSummary: DriverAiSummary;
};

export type RiskLevel = "high" | "medium" | "low";

export type ActiveShift = {
  sessionId: string;
  driverId: string;
  driverName: string;
  train: string;
  startedAt: string;
};

export type ProfileZoneAlert = {
  id: string;
  train: string;
  driverName: string;
  km: string;
  scenario: string;
  errorType: SandErrorType;
  distance: string;
  suggestion: string;
  status: "即将进入" | "前方预警" | "已通过";
};

export type CountListColumn = {
  title: string;
  dataIndex: string;
  width?: number;
};

export type CountListConfig = {
  title: string;
  desc?: string;
  columns: CountListColumn[];
  data: Record<string, string | number>[];
};
