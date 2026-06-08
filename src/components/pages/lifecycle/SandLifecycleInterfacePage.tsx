"use client";

import { DataTableCard } from "@/components/demo/DataTableCard";
import { ExchangeModulePage } from "@/components/pages/exchange/ExchangeModulePage";
import type { ExchangeModuleConfig } from "@/lib/types/demo";

type SandLifecycleInterfacePageProps = {
  config: ExchangeModuleConfig;
  moduleKey: string;
  tableTitle: string;
  data: Record<string, string>[];
  columns: {
    title: string;
    dataIndex: string;
    width?: number;
    render?: (v: unknown) => React.ReactNode;
  }[];
};

export function SandLifecycleInterfacePage({
  config,
  moduleKey,
  tableTitle,
  data,
  columns,
}: SandLifecycleInterfacePageProps) {
  return (
    <div className="space-y-5">
      <ExchangeModulePage config={config} moduleKey={moduleKey} />
      <DataTableCard title={tableTitle} data={data} columns={columns} />
    </div>
  );
}
