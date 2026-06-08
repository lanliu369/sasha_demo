"use client";

import { Card } from "@arco-design/web-react";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { linkageRules } from "@/lib/mock/pages";

export function OrchestrationLinkagePage() {
  return (
    <div className="space-y-5">
      <MetricCards
        moduleKey="linkage"
        items={[
          {
            key: "rules",
            label: "联动规则",
            value: linkageRules.length,
            unit: "条",
            trend: "flat",
            trendValue: "—",
          },
          {
            key: "active",
            label: "今日触发",
            value: 2,
            unit: "次",
            trend: "flat",
            trendValue: "—",
          },
          {
            key: "safe",
            label: "安全保障",
            value: "正常",
            trend: "flat",
            trendValue: "—",
          },
          {
            key: "block",
            label: "阻断次数",
            value: 1,
            unit: "次",
            trend: "down",
            trendValue: "-1",
          },
        ]}
      />
      <Card title="联动执行状态" bordered className="lark-card-elevated">
        <div className="space-y-3">
          {[
            { name: "车地失步监测", status: "正常", last: "10:35" },
            { name: "高等级告警联动", status: "待命", last: "09:15" },
            { name: "检测不合格阻断", status: "正常", last: "08:55" },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
            >
              <span className="text-sm">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-secondary">{item.last}</span>
                <LarkStatusTag value={item.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="联动处置规则" bordered className="lark-card-elevated">
        <ul className="space-y-2">
          {linkageRules.map((rule) => (
            <li
              key={rule.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-sm"
            >
              <span className="font-medium text-text-primary">{rule.name}</span>
              <LarkStatusTag value={rule.enabled ? "启用" : "停用"} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
