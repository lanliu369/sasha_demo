"use client";

import { useMemo, useState } from "react";
import { Card, Input } from "@arco-design/web-react";
import {
  MapPin,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { NativeSelect } from "@/components/demo/NativeSelect";
import {
  getSandLifecycleBatchOptions,
  sandLifecycleBatches,
  searchSandLifecycleBatches,
} from "@/lib/mock/sandLifecycleTrace";
import type {
  SandLifecycleBatch,
  SandLifecycleStage,
  SandLifecycleStageKey,
} from "@/lib/types/demo";

const stageIcons: Record<SandLifecycleStageKey, typeof ShoppingCart> = {
  procurement: ShoppingCart,
  warehouse: Truck,
  loading: Package,
  spreading: MapPin,
};

const stageHints: Record<SandLifecycleStageKey, string> = {
  procurement: "供应商是谁、哪位员工对接采购与验收",
  warehouse: "AGV 将砂运送至哪个库位存放",
  loading: "何时上砂至哪台撒砂/车载设备",
  spreading: "最终在哪些区段、站台执行撒砂",
};

function StageTimelineItem({
  stage,
  index,
  isLast,
  selected,
  onSelect,
}: {
  stage: SandLifecycleStage;
  index: number;
  isLast: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = stageIcons[stage.key];
  const done = stage.status === "已完成";
  const active = stage.status === "进行中";

  return (
    <div className="flex min-h-[72px] flex-1 gap-3">
      <div className="flex flex-col items-center self-stretch">
        <button
          type="button"
          onClick={onSelect}
          className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
            selected
              ? "border-brand bg-brand text-white"
              : done
                ? "border-success/30 bg-success/10 text-success"
                : active
                  ? "border-brand/40 bg-brand-light text-brand"
                  : "border-border bg-app text-text-secondary"
          }`}
        >
          <Icon className="size-4" aria-hidden />
        </button>
        {!isLast ? (
          <div
            className={`my-1 w-px flex-1 ${
              done ? "bg-success/40" : "bg-border"
            }`}
          />
        ) : null}
      </div>
      <button
        type="button"
        onClick={onSelect}
        className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-left transition-colors ${
          selected
            ? "border-brand/30 bg-brand-light/50"
            : "border-transparent hover:border-border hover:bg-app/60"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-medium text-text-primary">
            {index + 1}. {stage.label}
          </span>
          <LarkStatusTag value={stage.status} />
        </div>
        <p className="mt-1 text-xs text-text-secondary">{stage.time}</p>
        <p className="mt-0.5 text-[11px] text-text-secondary">
          上报：{stage.uploadSource}
        </p>
      </button>
    </div>
  );
}

function StageDetailPanel({ stage }: { stage: SandLifecycleStage }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-text-primary">{stage.label}</h3>
          <p className="mt-1 text-xs text-text-secondary">{stageHints[stage.key]}</p>
        </div>
        <LarkStatusTag value={stage.status} />
      </div>
      <p className="mb-4 rounded-md bg-app px-3 py-2 text-xs text-text-secondary">
        数据来源：<span className="text-text-primary">{stage.uploadSource}</span>
        <span className="mx-2 text-border">·</span>
        平台只读汇聚存储，业务在子系统/设备端执行
      </p>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stage.details.map((item) => (
          <div key={item.label} className="rounded-md border border-border/70 px-3 py-2">
            <dt className="text-xs text-text-secondary">{item.label}</dt>
            <dd className="mt-1 text-sm font-medium text-text-primary">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function BatchSummaryBar({ batch }: { batch: SandLifecycleBatch }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-border bg-app/40 px-4 py-3 text-sm">
      <span>
        砂批次{" "}
        <span className="font-semibold text-text-primary">{batch.sandBatch}</span>
      </span>
      <span>
        供应商{" "}
        <span className="font-medium text-text-primary">{batch.supplier}</span>
      </span>
      {batch.relatedTrain ? (
        <span>
          关联列车{" "}
          <span className="font-medium text-text-primary">{batch.relatedTrain}</span>
        </span>
      ) : null}
      <span>
        当前环节{" "}
        <span className="font-medium text-brand">{batch.currentStage}</span>
      </span>
      <LarkStatusTag value={batch.status} />
    </div>
  );
}

export function SandLifecycleTracePage() {
  const [keyword, setKeyword] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState(
    sandLifecycleBatches[0]?.batchId ?? "",
  );
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  const filtered = useMemo(
    () => searchSandLifecycleBatches(keyword),
    [keyword],
  );

  const batch = useMemo(() => {
    const fromSelect = sandLifecycleBatches.find((b) => b.batchId === selectedBatchId);
    if (fromSelect && filtered.some((b) => b.batchId === fromSelect.batchId)) {
      return fromSelect;
    }
    return filtered[0];
  }, [selectedBatchId, filtered]);

  const selectedStage =
    batch?.stages[selectedStageIndex] ?? batch?.stages[0];

  const handleBatchChange = (batchId: string) => {
    setSelectedBatchId(batchId);
    const next = sandLifecycleBatches.find((b) => b.batchId === batchId);
    if (!next) return;
    const runningIdx = next.stages.findIndex((s) => s.status === "进行中");
    if (runningIdx >= 0) {
      setSelectedStageIndex(runningIdx);
      return;
    }
    const lastDone = [...next.stages]
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.status === "已完成")
      .pop()?.i;
    setSelectedStageIndex(lastDone ?? 0);
  };

  if (!batch) {
    return (
      <Card bordered className="lark-card-elevated">
        <p className="text-sm text-text-secondary">未找到匹配的砂批次追溯记录。</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card
        title={
          <CardTitleWithHint
            title="砂数据追溯"
            hint="采购对接 → AGV 入库 → 上砂至设备 → 撒砂区段；各环节由设备/子系统上报，平台汇聚存储"
          />
        }
        bordered
        className="lark-card-elevated"
      >
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[200px] flex-1">
            <p className="mb-1 text-xs text-text-secondary">关键字</p>
            <Input
              value={keyword}
              placeholder="批次 / 供应商 / 列车 / 员工 / 库位"
              onChange={setKeyword}
              allowClear
            />
          </div>
          <div className="min-w-[240px]">
            <p className="mb-1 text-xs text-text-secondary">砂批次</p>
            <NativeSelect
              value={batch.batchId}
              options={
                filtered.length > 0
                  ? filtered.map((b) => ({
                      value: b.batchId,
                      label: `${b.sandBatch} · ${b.supplier} · ${b.status}`,
                    }))
                  : getSandLifecycleBatchOptions()
              }
              onChange={handleBatchChange}
            />
          </div>
        </div>
      </Card>

      <BatchSummaryBar batch={batch} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-10 lg:items-stretch">
        <div className="flex h-full lg:col-span-4">
          <Card
            title="生命周期环节"
            bordered
            className="lark-card-elevated flex h-full w-full flex-col [&_.arco-card-body]:flex-1"
          >
            <div className="flex h-full min-h-[320px] flex-col pt-1">
              {batch.stages.map((stage, index) => (
                <StageTimelineItem
                  key={stage.key}
                  stage={stage}
                  index={index}
                  isLast={index === batch.stages.length - 1}
                  selected={index === selectedStageIndex}
                  onSelect={() => setSelectedStageIndex(index)}
                />
              ))}
            </div>
          </Card>
        </div>

        <div className="flex h-full lg:col-span-6">
          <Card
            bordered
            className="lark-card-elevated flex h-full w-full flex-col [&_.arco-card-body]:flex-1"
          >
            {selectedStage ? (
              <StageDetailPanel stage={selectedStage} />
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  );
}
