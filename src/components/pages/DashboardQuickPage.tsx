"use client";

import Link from "next/link";
import { Card } from "@arco-design/web-react";
import {
  Activity,
  ArrowRight,
  BellRing,
  Building2,
  ClipboardList,
  Cog,
  GitBranch,
  Monitor,
  PackagePlus,
  Radio,
  Route,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { quickActions } from "@/lib/mock/pages";

const quickActionIcons: Record<string, LucideIcon> = {
  "/exchange/dispatch": Radio,
  "/orchestration/smart-dispatch": GitBranch,
  "/orchestration/overview": ClipboardList,
  "/orchestration/loading-task": PackagePlus,
  "/orchestration/processing-task": Cog,
  "/orchestration/full-flow": Route,
  "/exchange/screen": Monitor,
  "/exchange/mobile": Smartphone,
  "/alert/disposal": BellRing,
  "/exchange/monitor": Activity,
  "/lifecycle/supplier": Building2,
};

export function DashboardQuickPage() {
  return (
    <div className="space-y-5">
      <Card title="高频功能入口" bordered className="lark-card-elevated">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = quickActionIcons[action.path] ?? ClipboardList;

            return (
              <Link
                key={action.path}
                href={action.path}
                className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-brand/30 hover:bg-[#EBF1FF]/30"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand transition-colors group-hover:bg-brand/10">
                  <Icon className="size-5" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    {action.label}
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">{action.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-text-secondary group-hover:text-brand" />
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
