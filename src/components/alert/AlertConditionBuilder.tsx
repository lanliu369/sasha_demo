"use client";

import { Input } from "@arco-design/web-react";
import { NativeSelect } from "@/components/demo/NativeSelect";
import {
  alertLogicOptions,
  alertOperators,
  defaultConditionForMetric,
  formatAlertCondition,
  formatCompoundCondition,
  getMetricOption,
  type AlertMetricOption,
} from "@/lib/demo/alertConditionOptions";
import type {
  AlertCondition,
  AlertConditionLogic,
  AlertRuleItem,
} from "@/lib/types/demo";

type AlertConditionBuilderProps = {
  metrics: AlertMetricOption[];
  condition: AlertCondition;
  onChange: (condition: AlertCondition) => void;
  logic?: AlertConditionLogic;
  onLogicChange?: (logic: AlertConditionLogic) => void;
  secondCondition?: AlertCondition;
  onSecondChange?: (condition: AlertCondition) => void;
  allowCompound?: boolean;
  className?: string;
};

function ConditionRow({
  metrics,
  condition,
  onChange,
}: {
  metrics: AlertMetricOption[];
  condition: AlertCondition;
  onChange: (condition: AlertCondition) => void;
}) {
  const metricDef = getMetricOption(metrics, condition.metric);
  const isEnum = metricDef?.valueType === "enum";

  const handleMetricChange = (metric: string) => {
    onChange(defaultConditionForMetric(metric, metrics));
  };

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      <NativeSelect
        value={condition.metric}
        options={metrics.map((m) => ({ value: m.value, label: m.label }))}
        onChange={handleMetricChange}
      />
      {!isEnum ? (
        <NativeSelect
          value={condition.operator}
          options={alertOperators.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
          onChange={(operator) => onChange({ ...condition, operator })}
        />
      ) : (
        <NativeSelect
          value="eq"
          options={[{ value: "eq", label: "=" }]}
          onChange={() => undefined}
        />
      )}
      {isEnum ? (
        <NativeSelect
          value={condition.value}
          options={
            metricDef?.enumOptions?.map((o) => ({
              value: o.value,
              label: o.label,
            })) ?? []
          }
          onChange={(value) => onChange({ ...condition, value, operator: "eq" })}
        />
      ) : (
        <Input
          size="small"
          value={condition.value}
          suffix={metricDef?.unit}
          placeholder={`阈值${metricDef?.unit ? `（${metricDef.unit}）` : ""}`}
          onChange={(value) => onChange({ ...condition, value })}
        />
      )}
    </div>
  );
}

export function AlertConditionBuilder({
  metrics,
  condition,
  onChange,
  logic,
  onLogicChange,
  secondCondition,
  onSecondChange,
  allowCompound = false,
  className = "",
}: AlertConditionBuilderProps) {
  const preview = formatCompoundCondition(
    condition,
    metrics,
    logic,
    secondCondition,
  );

  return (
    <div className={className}>
      <ConditionRow
        metrics={metrics}
        condition={condition}
        onChange={onChange}
      />
      {allowCompound && onLogicChange && onSecondChange && secondCondition ? (
        <>
          <div className="my-2 flex items-center gap-2">
            <span className="text-xs text-text-secondary">组合逻辑</span>
            <NativeSelect
              value={logic ?? "or"}
              options={alertLogicOptions}
              style={{ width: 88 }}
              onChange={(value) => onLogicChange(value as AlertConditionLogic)}
            />
          </div>
          <ConditionRow
            metrics={metrics}
            condition={secondCondition}
            onChange={onSecondChange}
          />
        </>
      ) : null}
      <p className="mt-2 rounded-lg bg-app px-3 py-1.5 text-xs text-text-secondary">
        预览：{preview}
      </p>
    </div>
  );
}

export function ruleItemToCondition(rule: AlertRuleItem): AlertCondition {
  if (
    rule.conditionMetric &&
    rule.conditionOperator &&
    rule.conditionValue
  ) {
    return {
      metric: rule.conditionMetric,
      operator: rule.conditionOperator,
      value: rule.conditionValue,
    };
  }
  return {
    metric: "alert_level",
    operator: "eq",
    value: "high",
  };
}

export function buildRuleConditionFields(
  condition: AlertCondition,
  metrics: AlertMetricOption[],
): Pick<
  AlertRuleItem,
  "condition" | "conditionMetric" | "conditionOperator" | "conditionValue"
> {
  return {
    condition: formatAlertCondition(condition, metrics),
    conditionMetric: condition.metric,
    conditionOperator: condition.operator,
    conditionValue: condition.value,
  };
}
