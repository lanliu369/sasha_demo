"use client";

import { SimpleBarChart } from "@/components/demo/SimpleBarChart";
import { MetricCards } from "@/components/demo/MetricCards";
import type { PageLayoutMeta } from "@/lib/design-system/pageLayoutConfig";
import { LarkPageIntro } from "./LarkPageIntro";

type LarkStandardPageShellProps = {
  description: string;
  sectionLabel: string;
  layout: PageLayoutMeta;
  children: React.ReactNode;
};

/** 非首屏功能页统一飞书风格壳层：说明条 ·（可选）KPI ·（可选）趋势图 */
export function LarkStandardPageShell({
  description,
  sectionLabel,
  layout,
  children,
}: LarkStandardPageShellProps) {
  const { hasOwnKpis, defaultKpis, chartItems, chartTitle, chartHint } =
    layout;

  const chartSection =
    chartItems && chartItems.length > 0 ? (
      <SimpleBarChart
        title={chartTitle ?? "数据趋势"}
        hint={chartHint}
        items={chartItems}
        height={120}
      />
    ) : null;

  return (
    <div className="space-y-5">
      <LarkPageIntro description={description} />

      {!hasOwnKpis && defaultKpis && defaultKpis.length > 0 ? (
        <MetricCards items={defaultKpis} moduleKey={`shell:${sectionLabel}`} />
      ) : null}

      {chartSection}

      {children}
    </div>
  );
}
