"use client";

import { Switch } from "@arco-design/web-react";
import { useEffect, useMemo, useState } from "react";
import { CreateRuleModal } from "@/components/demo/CreateRuleModal";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import {
  formatScopeDevice,
  formatScopeModule,
  formatScopeZone,
} from "@/lib/demo/alertScopeOptions";
import type { AlertRuleItem, RuleItem } from "@/lib/types/demo";

type RulesPageProps = {
  title: string;
  rules: RuleItem[] | AlertRuleItem[];
  idPrefix?: string;
  onAddRule?: (rule: RuleItem | AlertRuleItem) => void;
  onToggleRule?: (id: string, enabled: boolean) => void;
  /** 告警规则：展示区段/模块/设备列，新增时可配置适用范围 */
  showScope?: boolean;
};

export function RulesPage({
  title,
  rules,
  idPrefix,
  onAddRule,
  onToggleRule,
  showScope = false,
}: RulesPageProps) {
  const [rows, setRows] = useState(rules);

  useEffect(() => {
    setRows(rules);
  }, [rules]);

  const handleToggle = (id: string, enabled: boolean) => {
    setRows((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, enabled } : rule)),
    );
    onToggleRule?.(id, enabled);
  };

  const handleAdd = (rule: RuleItem | AlertRuleItem) => {
    setRows((prev) => [...prev, rule]);
    onAddRule?.(rule);
  };

  const mutable = Boolean(onAddRule && idPrefix);

  const scopeColumns = useMemo(
    () =>
      showScope
        ? [
            {
              title: "适用区段",
              dataIndex: "scopeZone" as const,
              width: 100,
              render: (_: unknown, record: AlertRuleItem) =>
                formatScopeZone(record.scopeZone),
            },
            {
              title: "适用模块",
              dataIndex: "scopeModule" as const,
              width: 120,
              render: (_: unknown, record: AlertRuleItem) =>
                formatScopeModule(record.scopeModule),
            },
            {
              title: "适用设备",
              dataIndex: "scopeDevice" as const,
              width: 120,
              render: (_: unknown, record: AlertRuleItem) =>
                formatScopeDevice(record.scopeDevice),
            },
          ]
        : [],
    [showScope],
  );

  return (
    <DataTableCard
      title={title}
      data={rows}
      extra={
        mutable ? (
          <CreateRuleModal
            idPrefix={idPrefix!}
            existingRules={rows}
            showScope={showScope}
            onSubmit={handleAdd}
          />
        ) : undefined
      }
      columns={[
        { title: "编号", dataIndex: "id", width: 70 },
        { title: "规则名称", dataIndex: "name", width: 160 },
        ...scopeColumns,
        { title: "触发条件", dataIndex: "condition", width: 140 },
        { title: "执行动作", dataIndex: "action", width: 160 },
        { title: "优先级", dataIndex: "priority", width: 72 },
        {
          title: "启用",
          dataIndex: "enabled",
          width: 120,
          render: (v, record) => (
            <div className="flex items-center gap-2">
              <Switch
                checked={Boolean(v)}
                size="small"
                onChange={(checked) => handleToggle(record.id, checked)}
              />
              <LarkStatusTag value={v ? "启用" : "停用"} />
            </div>
          ),
        },
      ]}
    />
  );
}
