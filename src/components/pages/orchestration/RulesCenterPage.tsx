"use client";

import { Card, Radio } from "@arco-design/web-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AlertThresholdConfigCard } from "@/components/alert/AlertThresholdConfigCard";
import { RulesPage } from "@/components/pages/common/RulesPage";
import {
  alertConfig,
  alertRules,
  linkageRules,
  orchestrationRules,
  processRules,
} from "@/lib/mock/pages";
import type { AlertRuleItem, AlertThresholdConfig, RuleItem } from "@/lib/types/demo";

export type RuleTabKey =
  | "orchestration"
  | "process"
  | "threshold"
  | "alert"
  | "linkage";

const ruleTabs: {
  key: RuleTabKey;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    key: "orchestration",
    label: "编排规则",
    title: "任务编排规则",
    description: "加砂计划、工单状态变化触发任务编排与车地同步。",
  },
  {
    key: "process",
    label: "数据处理",
    title: "数据处理规则",
    description: "多源数据格式转换、清洗、映射与样本分桶。",
  },
  {
    key: "threshold",
    label: "告警分级",
    title: "告警分级阈值",
    description: "高/中/低等级判定、通知对象与推送渠道。",
  },
  {
    key: "alert",
    label: "告警联动",
    title: "告警联动规则",
    description: "告警触发后的自动动作，可绑定区段、模块与设备。",
  },
  {
    key: "linkage",
    label: "联动处置",
    title: "联动处置与安全保障规则",
    description: "异常场景下的任务暂停、阻断与安全兜底。",
  },
];

const tabMeta: Record<
  Exclude<RuleTabKey, "threshold">,
  { idPrefix: string; showScope?: boolean }
> = {
  orchestration: { idPrefix: "R" },
  process: { idPrefix: "PR" },
  alert: { idPrefix: "AR", showScope: true },
  linkage: { idPrefix: "LK" },
};

type RulesCenterPageProps = {
  defaultTab?: RuleTabKey;
};

function isRuleTabKey(value: string | null): value is RuleTabKey {
  return ruleTabs.some((tab) => tab.key === value);
}

export function RulesCenterPage({ defaultTab }: RulesCenterPageProps = {}) {
  const searchParams = useSearchParams();
  const queryTab = searchParams.get("tab");
  const initialTab = isRuleTabKey(queryTab)
    ? queryTab
    : (defaultTab ?? "orchestration");

  const [activeTab, setActiveTab] = useState<RuleTabKey>(initialTab);
  const [ruleSets, setRuleSets] = useState<{
    orchestration: RuleItem[];
    process: RuleItem[];
    alert: AlertRuleItem[];
    linkage: RuleItem[];
  }>({
    orchestration: orchestrationRules,
    process: processRules,
    alert: alertRules,
    linkage: linkageRules,
  });
  const [thresholds, setThresholds] =
    useState<AlertThresholdConfig[]>(alertConfig);

  useEffect(() => {
    if (isRuleTabKey(queryTab)) {
      setActiveTab(queryTab);
    }
  }, [queryTab]);

  const current = ruleTabs.find((tab) => tab.key === activeTab) ?? ruleTabs[0];

  const summary = useMemo(
    () => [
      { label: "编排", value: ruleSets.orchestration.length },
      { label: "数据处理", value: ruleSets.process.length },
      { label: "告警分级", value: thresholds.length },
      { label: "告警联动", value: ruleSets.alert.length },
      { label: "联动处置", value: ruleSets.linkage.length },
    ],
    [ruleSets, thresholds.length],
  );

  const handleAddRule = (rule: RuleItem | AlertRuleItem) => {
    if (activeTab === "threshold") return;
    setRuleSets((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], rule],
    }));
  };

  const handleToggleRule = (id: string, enabled: boolean) => {
    if (activeTab === "threshold") return;
    setRuleSets((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((rule) =>
        rule.id === id ? { ...rule, enabled } : rule,
      ),
    }));
  };

  return (
    <div className="space-y-4">
      <Card bordered className="lark-card-elevated">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {summary.map((item) => (
            <span key={item.label} className="text-sm text-text-secondary">
              {item.label}{" "}
              <span className="font-semibold text-text-primary">{item.value}</span>
              <span className="text-text-secondary"> 条</span>
            </span>
          ))}
        </div>
      </Card>

      <Radio.Group
        type="button"
        value={activeTab}
        onChange={(value) => setActiveTab(value as RuleTabKey)}
        className="demo-radio-tabs flex flex-wrap"
      >
        {ruleTabs.map((tab) => (
          <Radio key={tab.key} value={tab.key}>
            {tab.label}
          </Radio>
        ))}
      </Radio.Group>

      <p className="text-xs text-text-secondary">{current.description}</p>

      {activeTab === "threshold" ? (
        <AlertThresholdConfigCard
          initialItems={thresholds}
          onChange={setThresholds}
        />
      ) : (
        <RulesPage
          title={current.title}
          rules={ruleSets[activeTab]}
          idPrefix={tabMeta[activeTab].idPrefix}
          showScope={tabMeta[activeTab].showScope}
          onAddRule={handleAddRule}
          onToggleRule={handleToggleRule}
        />
      )}
    </div>
  );
}
