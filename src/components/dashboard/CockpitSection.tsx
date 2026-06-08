"use client";

import type { ReactNode } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";

type CockpitSectionProps = {
  index: string;
  title: string;
  hint?: string;
  action?: ReactNode;
  children: ReactNode;
  /** 浅色底容器，用于无独立 Card 的内容组 */
  contained?: boolean;
};

export function CockpitSection({
  index,
  title,
  hint,
  action,
  children,
  contained = false,
}: CockpitSectionProps) {
  return (
    <section className="cockpit-section space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand text-xs font-semibold text-white">
            {index}
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-text-primary">{title}</h2>
            {hint ? (
              <p className="mt-0.5 text-xs text-text-secondary">{hint}</p>
            ) : null}
          </div>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      {contained ? (
        <div className="rounded-xl border border-border/80 bg-app/50 p-4 sm:p-5">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

/** 驾驶舱内嵌 Card 的统一标题样式 */
export function CockpitBlockTitle({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <CardTitleWithHint
      title={title}
      hint={hint}
      hintClassName="text-[11px] text-text-secondary"
    />
  );
}
