import type { AlertCondition, AlertConditionLogic } from "@/lib/types/demo";

export type AlertMetricOption = {
  value: string;
  label: string;
  unit?: string;
  valueType: "number" | "duration" | "percent" | "enum";
  enumOptions?: { value: string; label: string }[];
};

export const alertOperators = [
  { value: "gt", label: ">" },
  { value: "gte", label: "≥" },
  { value: "lt", label: "<" },
  { value: "lte", label: "≤" },
  { value: "eq", label: "=" },
  { value: "timeout", label: "超时" },
] as const;

/** 分级阈值 · 监测指标 */
export const alertThresholdMetrics: AlertMetricOption[] = [
  {
    value: "job_stall",
    label: "作业停滞",
    unit: "min",
    valueType: "duration",
  },
  {
    value: "sand_stock",
    label: "砂仓存量",
    unit: "%",
    valueType: "percent",
  },
  {
    value: "sync_latency",
    label: "同步延迟",
    unit: "ms",
    valueType: "number",
  },
  {
    value: "comm_status",
    label: "通信状态",
    valueType: "enum",
    enumOptions: [
      { value: "jitter", label: "通信抖动" },
      { value: "non_blocking", label: "非阻塞异常" },
      { value: "offline", label: "设备离线" },
    ],
  },
];

/** 联动规则 · 触发指标 */
export const alertRuleMetrics: AlertMetricOption[] = [
  {
    value: "alert_level",
    label: "告警等级",
    valueType: "enum",
    enumOptions: [
      { value: "high", label: "高" },
      { value: "medium", label: "中" },
      { value: "low", label: "低" },
    ],
  },
  {
    value: "sand_stock",
    label: "砂仓存量",
    unit: "%",
    valueType: "percent",
  },
  {
    value: "sync_latency",
    label: "同步延迟",
    unit: "ms",
    valueType: "number",
  },
  {
    value: "interface_health",
    label: "接口健康",
    valueType: "enum",
    enumOptions: [
      { value: "abnormal", label: "异常" },
      { value: "degraded", label: "降级" },
    ],
  },
  {
    value: "inspect_result",
    label: "检测结果",
    valueType: "enum",
    enumOptions: [
      { value: "fail", label: "不合格" },
      { value: "retry", label: "上传重试" },
    ],
  },
  {
    value: "job_progress",
    label: "作业进度",
    unit: "%",
    valueType: "percent",
  },
];

export const alertLogicOptions: { value: AlertConditionLogic; label: string }[] =
  [
    { value: "or", label: "或" },
    { value: "and", label: "且" },
  ];

export function getMetricOption(
  metrics: AlertMetricOption[],
  metricValue: string,
): AlertMetricOption | undefined {
  return metrics.find((m) => m.value === metricValue);
}

export function getOperatorLabel(operator: string): string {
  return alertOperators.find((o) => o.value === operator)?.label ?? operator;
}

export function getMetricLabel(
  metrics: AlertMetricOption[],
  metricValue: string,
): string {
  return getMetricOption(metrics, metricValue)?.label ?? metricValue;
}

export function getEnumLabel(
  metrics: AlertMetricOption[],
  metricValue: string,
  enumValue: string,
): string {
  const metric = getMetricOption(metrics, metricValue);
  return (
    metric?.enumOptions?.find((o) => o.value === enumValue)?.label ?? enumValue
  );
}

export function formatAlertCondition(
  condition: AlertCondition,
  metrics: AlertMetricOption[],
): string {
  const metric = getMetricOption(metrics, condition.metric);
  const name = metric?.label ?? condition.metric;

  if (metric?.valueType === "enum") {
    const enumLabel = getEnumLabel(metrics, condition.metric, condition.value);
    return `${name}=${enumLabel}`;
  }

  if (condition.operator === "timeout") {
    return `${name} 超时 ${condition.value}${metric?.unit ?? ""}`;
  }

  const unit = metric?.unit ?? "";
  return `${name} ${getOperatorLabel(condition.operator)} ${condition.value}${unit}`;
}

export function formatCompoundCondition(
  primary: AlertCondition,
  metrics: AlertMetricOption[],
  logic?: AlertConditionLogic,
  secondary?: AlertCondition,
): string {
  const first = formatAlertCondition(primary, metrics);
  if (!secondary || !logic) return first;
  const logicLabel = logic === "or" ? "或" : "且";
  return `${first} ${logicLabel} ${formatAlertCondition(secondary, metrics)}`;
}

export function defaultConditionForMetric(
  metricValue: string,
  metrics: AlertMetricOption[],
): AlertCondition {
  const metric = getMetricOption(metrics, metricValue);
  if (metric?.valueType === "enum" && metric.enumOptions?.[0]) {
    return {
      metric: metricValue,
      operator: "eq",
      value: metric.enumOptions[0].value,
    };
  }
  if (metric?.valueType === "duration") {
    return { metric: metricValue, operator: "gt", value: "5" };
  }
  if (metric?.valueType === "percent") {
    return { metric: metricValue, operator: "lt", value: "30" };
  }
  return { metric: metricValue, operator: "gt", value: "200" };
}
