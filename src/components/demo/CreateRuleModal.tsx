"use client";

import { Form, Input, Switch } from "@arco-design/web-react";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  AlertConditionBuilder,
  buildRuleConditionFields,
} from "@/components/alert/AlertConditionBuilder";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoButton } from "@/components/demo/DemoButton";
import { DemoModal } from "@/components/demo/DemoModal";
import { DemoModalActions } from "@/components/demo/DemoModalActions";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { demoToastSuccess } from "@/components/demo/demoToast";
import {
  alertRuleMetrics,
  defaultConditionForMetric,
} from "@/lib/demo/alertConditionOptions";
import {
  ALERT_SCOPE_ALL,
  alertDeviceOptions,
  alertModuleOptions,
  alertZoneOptions,
} from "@/lib/demo/alertScopeOptions";
import type { AlertCondition, AlertRuleItem, RuleItem } from "@/lib/types/demo";

type CreateRuleModalProps = {
  idPrefix: string;
  existingRules: RuleItem[];
  onSubmit: (rule: RuleItem | AlertRuleItem) => void;
  /** 告警规则：增加区段/模块/设备适用范围 */
  showScope?: boolean;
};

function nextRuleId(prefix: string, rules: RuleItem[]): string {
  const nums = rules
    .map((rule) => rule.id.match(new RegExp(`^${prefix}(\\d+)$`)))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => Number(match[1]));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `${prefix}${String(next).padStart(2, "0")}`;
}

const priorityOptions = [
  { value: "1", label: "1 · 最高" },
  { value: "2", label: "2 · 高" },
  { value: "3", label: "3 · 中" },
  { value: "4", label: "4 · 低" },
  { value: "5", label: "5 · 最低" },
];

export function CreateRuleModal({
  idPrefix,
  existingRules,
  onSubmit,
  showScope = false,
}: CreateRuleModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [alertCondition, setAlertCondition] = useState<AlertCondition>(() =>
    defaultConditionForMetric("sand_stock", alertRuleMetrics),
  );
  const [action, setAction] = useState("");
  const [priority, setPriority] = useState("2");
  const [enabled, setEnabled] = useState(true);
  const [scopeZone, setScopeZone] = useState(ALERT_SCOPE_ALL);
  const [scopeModule, setScopeModule] = useState(ALERT_SCOPE_ALL);
  const [scopeDevice, setScopeDevice] = useState(ALERT_SCOPE_ALL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setName("");
    setCondition("");
    setAlertCondition(defaultConditionForMetric("sand_stock", alertRuleMetrics));
    setAction("");
    setPriority("2");
    setEnabled(true);
    setScopeZone(ALERT_SCOPE_ALL);
    setScopeModule(ALERT_SCOPE_ALL);
    setScopeDevice(ALERT_SCOPE_ALL);
    setErrors({});
  };

  const handleOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "请填写规则名称";
    if (!showScope && !condition.trim()) nextErrors.condition = "请填写触发条件";
    if (!action.trim()) nextErrors.action = "请填写执行动作";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    window.setTimeout(() => {
      const id = nextRuleId(idPrefix, existingRules);
      const conditionFields = showScope
        ? buildRuleConditionFields(alertCondition, alertRuleMetrics)
        : { condition: condition.trim() };
      const base = {
        id,
        name: name.trim(),
        ...conditionFields,
        action: action.trim(),
        priority: Number(priority),
        enabled,
      };
      onSubmit(
        showScope
          ? {
              ...base,
              scopeZone,
              scopeModule,
              scopeDevice,
            }
          : base,
      );
      demoToastSuccess(`规则 ${id} 已新增（Demo）`);
      setLoading(false);
      setOpen(false);
    }, 400);
  };

  return (
    <>
      <DemoButton variant="primary" size="sm" icon={Plus} onClick={handleOpen}>
        新增规则
      </DemoButton>
      <DemoModal
        open={open}
        onClose={() => !loading && setOpen(false)}
        title={
          <CardTitleWithHint
            title="新增规则"
            hint={
              showScope
                ? "可绑定区段/模块/设备；Demo 演示，刷新后恢复"
                : "Demo 演示，刷新页面后恢复"
            }
          />
        }
        width={showScope ? 560 : 520}
        footer={
          <DemoModalActions
            loading={loading}
            onCancel={() => setOpen(false)}
            onConfirm={handleSubmit}
            confirmText="保存"
          />
        }
      >
        <Form layout="vertical" size="small">
          <Form.Item
            label={
              <>
                规则名称<span className="text-rose-500"> *</span>
              </>
            }
            validateStatus={errors.name ? "error" : undefined}
            help={errors.name}
          >
            <Input
              value={name}
              placeholder="如：高等级告警通知调度"
              onChange={setName}
            />
          </Form.Item>
          <Form.Item
            label={
              <>
                触发条件<span className="text-rose-500"> *</span>
              </>
            }
            validateStatus={errors.condition ? "error" : undefined}
            help={errors.condition}
          >
            {showScope ? (
              <AlertConditionBuilder
                metrics={alertRuleMetrics}
                condition={alertCondition}
                onChange={setAlertCondition}
              />
            ) : (
              <Input
                value={condition}
                placeholder="如：调度中心推送加砂计划"
                onChange={setCondition}
              />
            )}
          </Form.Item>
          <Form.Item
            label={
              <>
                执行动作<span className="text-rose-500"> *</span>
              </>
            }
            validateStatus={errors.action ? "error" : undefined}
            help={errors.action}
          >
            <Input
              value={action}
              placeholder="如：生成砂处理任务"
              onChange={setAction}
            />
          </Form.Item>
          {showScope ? (
            <>
              <Form.Item label="适用区段">
                <NativeSelect
                  value={scopeZone}
                  options={alertZoneOptions}
                  onChange={setScopeZone}
                />
              </Form.Item>
              <Form.Item label="适用模块">
                <NativeSelect
                  value={scopeModule}
                  options={alertModuleOptions}
                  onChange={setScopeModule}
                />
              </Form.Item>
              <Form.Item label="适用设备">
                <NativeSelect
                  value={scopeDevice}
                  options={alertDeviceOptions}
                  onChange={setScopeDevice}
                />
              </Form.Item>
            </>
          ) : null}
          <Form.Item label="优先级">
            <NativeSelect
              value={priority}
              options={priorityOptions}
              onChange={setPriority}
            />
          </Form.Item>
          <Form.Item label="启用">
            <Switch checked={enabled} onChange={setEnabled} size="small" />
          </Form.Item>
        </Form>
      </DemoModal>
    </>
  );
}
