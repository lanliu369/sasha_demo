"use client";

import { Card } from "@arco-design/web-react";
import { Construction } from "lucide-react";

type PlaceholderPageProps = {
  title: string;
  description: string;
  sectionLabel?: string;
};

export function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <Card bordered className="lark-card-elevated">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-brand-light">
          <Construction className="size-6 text-brand" />
        </div>
        <h2 className="lark-module-title">{title}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
        <p className="mt-6 rounded-lg border border-border bg-app px-4 py-2 text-xs text-text-secondary">
          功能开发中 · Demo 占位页
        </p>
      </div>
    </Card>
  );
}
