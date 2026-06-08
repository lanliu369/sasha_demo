"use client";

import { larkStepDoneClass } from "@/lib/ui/larkTag";

type StepItem = {
  title: string;
  description?: string;
};

type StepTimelineProps = {
  steps: StepItem[];
  current: number;
};

export function StepTimeline({ steps, current }: StepTimelineProps) {
  return (
    <div className="max-w-md space-y-0">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <div key={step.title} className="flex gap-3 pb-5 last:pb-0">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                  active
                    ? "bg-brand text-white"
                    : done
                      ? larkStepDoneClass
                      : "bg-app text-text-secondary"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-border" />
              )}
            </div>
            <div className="min-w-0 pt-0.5">
              <p
                className={`text-sm font-medium ${
                  active ? "text-brand" : "text-text-primary"
                }`}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="mt-1 text-xs text-text-secondary">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
