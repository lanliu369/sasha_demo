"use client";

import { Card } from "@arco-design/web-react";
import { MetricCards } from "@/components/demo/MetricCards";
import { LarkTag } from "@/components/demo/LarkTag";
import { deviceStatusList, kpiItems } from "@/lib/mock/pages";
import { StatusBadge } from "@/components/demo/StatusBadge";

export function DisplayScreenPage() {
  return (
    <div className="space-y-5">
      <MetricCards moduleKey="display-screen" columns={4}
        items={[
          { key: "sync", label: "同步延迟", value: 120, unit: "ms", trend: "down", trendValue: "-8ms" },
          { key: "device", label: "在线设备", value: 6, unit: "台", trend: "flat", trendValue: "—" },
          { key: "task", label: "进行中作业", value: 3, unit: "项", trend: "up", trendValue: "+1" },
          { key: "alert", label: "活跃告警", value: 2, unit: "条", trend: "down", trendValue: "-1" },
        ]}
      />
      <Card title="中心大屏预览（Demo）" bordered className="lark-card-elevated">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-[#0d1117] p-4 text-white lg:col-span-2">
            <p className="mb-3 text-xs text-gray-400">3840 × 2160 · 2s 刷新</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded bg-white/5 p-3">
                <p className="text-xs text-gray-400">设备状态</p>
                <div className="mt-2 space-y-2">
                  {deviceStatusList.slice(0, 3).map((d) => (
                    <div key={d.id} className="flex justify-between text-sm">
                      <span>{d.name}</span>
                      <span className="text-emerald-500/90">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded bg-white/5 p-3">
                <p className="text-xs text-gray-400">作业进度</p>
                <div className="mt-3 space-y-3">
                  {["上砂 G101", "砂处理 #029", "加砂计划"].map((name, i) => (
                    <div key={name}>
                      <div className="flex justify-between text-xs">
                        <span>{name}</span>
                        <span>{[72, 45, 100][i]}%</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-brand"
                          style={{ width: `${[72, 45, 100][i]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2 rounded bg-white/5 p-3">
                <p className="text-xs text-gray-400">KPI 指标</p>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {kpiItems.map((k) => (
                    <div key={k.label} className="text-center">
                      <p className="text-lg font-semibold text-brand">{k.value}%</p>
                      <p className="text-xs text-gray-400">{k.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Card title="推送配置" bordered size="small">
              <div className="space-y-2 text-sm">
                <p><span className="text-text-secondary">通道：</span>WebSocket</p>
                <p><span className="text-text-secondary">频率：</span>2 秒/次</p>
                <p><span className="text-text-secondary">布局：</span>v3.2</p>
              </div>
            </Card>
            <Card title="数据源" bordered size="small">
              <div className="flex flex-wrap gap-2">
                {["设备状态", "作业进度", "KPI", "告警"].map((t) => (
                  <LarkTag key={t} variant="info">{t}</LarkTag>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
