"use client";

import { Info } from "lucide-react";

type LarkPageIntroProps = {
  description: string;
};

/** 飞书风格页面说明条 */
export function LarkPageIntro({ description }: LarkPageIntroProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-gradient-to-r from-[#EBF1FF]/60 to-card px-4 py-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10">
        <Info className="size-4 text-brand" />
      </div>
      <p className="m-0 min-w-0 flex-1 text-sm leading-[22px] text-text-secondary">
        {description}
      </p>
    </div>
  );
}
