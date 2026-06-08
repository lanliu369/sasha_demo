"use client";

import { useEffect, useState } from "react";
import { Card, Input } from "@arco-design/web-react";
import { AlertConditionBuilder } from "@/components/alert/AlertConditionBuilder";
import { DemoButton } from "@/components/demo/DemoButton";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { demoToastSuccess } from "@/components/demo/demoToast";
import {
  alertThresholdMetrics,
  formatCompoundCondition,
} from "@/lib/demo/alertConditionOptions";
import {
  alertModuleOptions,
  alertZoneOptions,
  formatScopeModule,
  formatScopeZone,
} from "@/lib/demo/alertScopeOptions";
import type { AlertCondition, AlertThresholdConfig } from "@/lib/types/demo";

type AlertThresholdConfigCardProps = {
  initialItems: AlertThresholdConfig[];
  onChange?: (items: AlertThresholdConfig[]) => void;
};

function syncThresholdText(item: AlertThresholdConfig): AlertThresholdConfig {
  return {
    ...item,
    threshold: formatCompoundCondition(
      item.condition,
      alertThresholdMetrics,
      item.conditionLogic,
      item.condition2,
    ),
  };
}

export function AlertThresholdConfigCard({
  initialItems,
  onChange,
}: AlertThresholdConfigCardProps) {
  const [items, setItems] = useState(initialItems.map(syncThresholdText));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(initialItems.map(syncThresholdText));
  }, [initialItems]);

  const updateItem = (
    level: string,
    patch: Partial<AlertThresholdConfig>,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.level !== level) return item;
        return syncThresholdText({ ...item, ...patch });
      }),
    );
  };

  const handleConditionChange = (level: string, condition: AlertCondition) => {
    updateItem(level, { condition });
  };

  const handleSave = () => {
    setSaving(true);
    window.setTimeout(() => {
      onChange?.(items);
      demoToastSuccess("分级阈值已保存（Demo）");
      setSaving(false);
    }, 400);
  };

  return (
    <Card
      title="分级阈值配置"
      bordered
      className="lark-card-elevated"
      extra={
        <DemoButton
          variant="primary"
          size="sm"
          loading={saving}
          onClick={handleSave}
        >
          保存配置
        </DemoButton>
      }
    >
      <p className="mb-4 text-xs text-text-secondary">
        触发条件由监测指标、运算符与阈值组合生成；「中」等级支持双条件组合（或/且）。
      </p>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.level}
            className="rounded-lg border border-border p-4"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex min-w-8 items-center justify-center rounded bg-app px-2 py-0.5 text-sm font-semibold text-text-primary">
                {item.level}
              </span>
              <span className="text-xs text-text-secondary">
                适用 {formatScopeZone(item.scopeZone)} ·{" "}
                {formatScopeModule(item.scopeModule)}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <span className="mb-1 block text-xs text-text-secondary">
                  触发条件
                </span>
                <AlertConditionBuilder
                  metrics={alertThresholdMetrics}
                  condition={item.condition}
                  onChange={(condition) =>
                    handleConditionChange(item.level, condition)
                  }
                  allowCompound={item.level === "中"}
                  logic={item.conditionLogic}
                  onLogicChange={(logic) =>
                    updateItem(item.level, { conditionLogic: logic })
                  }
                  secondCondition={
                    item.condition2 ?? {
                      metric: "sync_latency",
                      operator: "gt",
                      value: "200",
                    }
                  }
                  onSecondChange={(condition2) =>
                    updateItem(item.level, { condition2 })
                  }
                />
              </div>
              <label className="block">
                <span className="mb-1 block text-xs text-text-secondary">
                  通知对象
                </span>
                <Input
                  size="small"
                  value={item.notify}
                  onChange={(value) => updateItem(item.level, { notify: value })}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-text-secondary">
                  推送渠道
                </span>
                <Input
                  size="small"
                  value={item.channel}
                  onChange={(value) =>
                    updateItem(item.level, { channel: value })
                  }
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-text-secondary">
                  适用区段
                </span>
                <NativeSelect
                  value={item.scopeZone ?? "all"}
                  options={alertZoneOptions}
                  onChange={(value) =>
                    updateItem(item.level, { scopeZone: value })
                  }
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-text-secondary">
                  适用模块
                </span>
                <NativeSelect
                  value={item.scopeModule ?? "all"}
                  options={alertModuleOptions}
                  onChange={(value) =>
                    updateItem(item.level, { scopeModule: value })
                  }
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
