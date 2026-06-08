"use client";

import { useEffect, useState } from "react";
import { ConnectionHeader } from "@/components/demo/ConnectionHeader";
import { KeyValueGrid } from "@/components/demo/KeyValueGrid";
import { MetricCards } from "@/components/demo/MetricCards";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { QueuePreviewCard } from "@/components/demo/QueuePreviewCard";
import { SyncLogsTrigger } from "@/components/demo/SyncLogsTrigger";
import { useExchangeLiveData } from "@/components/demo/useExchangeLiveData";
import {
  buildDispatchPlans,
  buildInspectionDevices,
  buildVehicleDevices,
} from "@/lib/mock/exchangeDataFlow";
import {
  getDefaultExchangeStreamKey,
  getExchangeStreamOptions,
} from "@/lib/mock/exchangeDataFlow";
import type { ExchangeModuleConfig } from "@/lib/types/demo";

const LIVE_MODULES = new Set([
  "dispatch",
  "vehicle",
  "inspection",
  "loading",
  "processing",
]);

type ExchangeModulePageProps = {
  config: ExchangeModuleConfig;
  moduleKey: string;
};

function ExchangeStreamSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <NativeSelect
      value={value}
      onChange={onChange}
      options={options}
      size="small"
      style={{ width: 240, maxWidth: "100%" }}
      className="demo-stream-select"
    />
  );
}

export function ExchangeModulePage({
  config,
  moduleKey,
}: ExchangeModulePageProps) {
  const streamSelectable = LIVE_MODULES.has(moduleKey);
  const streamOptions = streamSelectable
    ? getExchangeStreamOptions(moduleKey)
    : [];
  const [streamKey, setStreamKey] = useState(
    () => getDefaultExchangeStreamKey(moduleKey) ?? "",
  );

  useEffect(() => {
    setStreamKey(getDefaultExchangeStreamKey(moduleKey) ?? "");
  }, [moduleKey]);

  const { live, pushLabel } = useExchangeLiveData(
    moduleKey,
    streamKey || undefined,
  );

  const dataFields = live?.dataFields ?? config.dataFields;
  const syncLogs = live?.syncLogs ?? config.syncLogs;
  const headerConfig = {
    ...config,
    lastSync: live?.lastSync ?? config.lastSync,
  };
  const metrics = config.metrics.map((metric) =>
    metric.key === "plan" && live?.planMetricValue != null
      ? { ...metric, value: String(live.planMetricValue) }
      : metric,
  );

  const fieldItems = dataFields;

  const planMetric = metrics.find((m) => m.key === "plan");
  const showPlanQueue = moduleKey === "dispatch" && planMetric;
  const showVehicleDevices = moduleKey === "vehicle";
  const showInspectionDevices = moduleKey === "inspection";
  const planItems = buildDispatchPlans();
  const vehicleItems = buildVehicleDevices();
  const inspectionItems = buildInspectionDevices();
  const streamLabel =
    moduleKey === "vehicle"
      ? "当前车载设备"
      : moduleKey === "inspection"
        ? "当前检测终端"
        : "当前数据流";

  const streamToolbar =
    streamSelectable && streamOptions.length > 0 ? (
      <>
        <span className="shrink-0 text-xs font-medium text-text-secondary">
          {streamLabel}
        </span>
        <ExchangeStreamSelect
          value={streamKey}
          options={streamOptions}
          onChange={setStreamKey}
        />
        {pushLabel ? (
          <span className="shrink-0 text-xs text-brand">{pushLabel}</span>
        ) : null}
      </>
    ) : pushLabel ? (
      <span className="text-xs text-brand">{pushLabel}</span>
    ) : undefined;

  return (
    <div className="space-y-5">
      <ConnectionHeader
        config={headerConfig}
        extra={<SyncLogsTrigger data={syncLogs} />}
      />
      <MetricCards items={metrics} moduleKey={moduleKey} />
      {showPlanQueue && (
        <QueuePreviewCard
          title="加砂计划队列"
          items={planItems}
          previewColumns={[
            { label: "批次", key: "batch" },
            { label: "列车", key: "train" },
            { label: "调度", key: "dispatchId" },
            { label: "工单", key: "orderId" },
            { label: "接收", key: "receivedAt" },
          ]}
          selectedRowId={streamKey}
          onRowSelect={(row) => setStreamKey(String(row.id))}
          selectableHint="点击计划行可切换下方「实时数据字段」查看对应批次"
        />
      )}
      {showVehicleDevices && (
        <QueuePreviewCard
          title="车载设备列表"
          items={vehicleItems}
          previewColumns={[
            { label: "列车", key: "train" },
            { label: "主机", key: "host" },
            { label: "编号", key: "vehicleNo" },
            { label: "砂箱", key: "sand" },
            { label: "同步", key: "lastSync" },
          ]}
          selectedRowId={streamKey}
          onRowSelect={(row) => setStreamKey(String(row.id))}
          selectableHint="点击设备行可切换下方「实时数据字段」查看对应车载数据"
        />
      )}
      {showInspectionDevices && (
        <QueuePreviewCard
          title="检测终端列表"
          items={inspectionItems}
          previewColumns={[
            { label: "终端", key: "device" },
            { label: "工位", key: "location" },
            { label: "批次", key: "batch" },
            { label: "结果", key: "result" },
            { label: "同步", key: "lastSync" },
          ]}
          selectedRowId={streamKey}
          onRowSelect={(row) => setStreamKey(String(row.id))}
          selectableHint="点击终端行可切换下方「实时数据字段」查看对应检测数据"
        />
      )}
      <KeyValueGrid
        title="实时数据字段"
        items={fieldItems}
        columns={2}
        headerExtra={streamToolbar}
      />
    </div>
  );
}
