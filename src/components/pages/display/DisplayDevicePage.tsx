"use client";

import { Card, Radio } from "@arco-design/web-react";
import { useMemo, useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { StatusBadge } from "@/components/demo/StatusBadge";
import { DeviceMonitorCard } from "@/components/pages/display/DeviceMonitorCard";
import { deviceStatusList } from "@/lib/mock/pages";

type ViewMode = "list" | "card" | "map";

export function DisplayDevicePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const online = deviceStatusList.filter((d) => d.status === "online").length;
  const warning = deviceStatusList.filter((d) => d.status === "warning").length;

  const mapZones = useMemo(
    () => [
      { label: "G101 区段", devices: deviceStatusList.slice(0, 3) },
      { label: "G205 区段", devices: deviceStatusList.slice(3, 6) },
      { label: "枢纽站场", devices: deviceStatusList.slice(6) },
    ],
    [],
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "设备总数", value: deviceStatusList.length, unit: "台", tone: "neutral" },
          { label: "在线", value: online, unit: "台", tone: "success" },
          { label: "异常", value: warning, unit: "台", tone: "warning" },
          {
            label: "在线率",
            value: Math.round((online / deviceStatusList.length) * 100),
            unit: "%",
            tone: "brand",
          },
        ].map((item) => (
          <Card
            key={item.label}
            bordered
            className={`lark-card-elevated ${
              item.tone === "success"
                ? "border-success/20 bg-success/[0.04]"
                : item.tone === "warning"
                  ? "border-warning/25 bg-warning/[0.06]"
                  : item.tone === "brand"
                    ? "border-brand/20 bg-brand-light/30"
                    : ""
            }`}
          >
            <p className="lark-caption">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {item.value}
              <span className="ml-1 text-sm font-normal text-text-secondary">
                {item.unit}
              </span>
            </p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardTitleWithHint title="设备运行监测" hint="列表 · 卡片 · 地图三视图" />
        <Radio.Group
          type="button"
          value={viewMode}
          onChange={(v) => setViewMode(v as ViewMode)}
        >
          <Radio value="card">卡片</Radio>
          <Radio value="list">列表</Radio>
          <Radio value="map">地图</Radio>
        </Radio.Group>
      </div>

      {viewMode === "list" ? (
        <DataTableCard
          title=""
          data={deviceStatusList}
          columns={[
            { title: "设备", dataIndex: "name" },
            { title: "所属模块", dataIndex: "module", width: 140 },
            {
              title: "状态",
              dataIndex: "status",
              width: 80,
              render: (v) => (
                <StatusBadge status={v as "online" | "warning" | "offline"} />
              ),
            },
            { title: "参数", dataIndex: "param", width: 100 },
            { title: "当前值", dataIndex: "value", width: 100 },
            { title: "更新", dataIndex: "updatedAt", width: 80 },
          ]}
        />
      ) : null}

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {deviceStatusList.map((device) => (
            <DeviceMonitorCard key={device.id} device={device} />
          ))}
        </div>
      ) : null}

      {viewMode === "map" ? (
        <Card bordered className="lark-card-elevated">
          <div className="relative min-h-[420px] rounded-xl bg-gradient-to-br from-[#EEF3FF] via-app to-[#F0FFF4] p-6">
            <p className="mb-4 text-sm text-text-secondary">
              线路地图模式（Demo）· 按区段聚合设备状态
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {mapZones.map((zone) => (
                <div
                  key={zone.label}
                  className="rounded-xl border border-dashed border-brand/30 bg-card/80 p-4 backdrop-blur-sm"
                >
                  <p className="mb-3 text-sm font-medium text-brand">
                    {zone.label}
                  </p>
                  <div className="space-y-2">
                    {zone.devices.map((device) => (
                      <div
                        key={device.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm"
                      >
                        <span className="truncate">{device.name}</span>
                        <LarkStatusTag
                          value={
                            device.status === "online"
                              ? "正常"
                              : device.status === "warning"
                                ? "告警"
                                : "离线"
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
