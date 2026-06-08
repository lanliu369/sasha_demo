"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Cpu,
  Monitor,
  Package,
  Radio,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { StatusBadge } from "@/components/demo/StatusBadge";
import type { DeviceStatusItem } from "@/lib/types/demo";

type ModuleMeta = {
  path: string;
  icon: LucideIcon;
};

const moduleMetaByName: Record<string, ModuleMeta> = {
  移动上砂装置: { path: "/exchange/loading", icon: Package },
  智能砂处理装置: { path: "/exchange/processing", icon: Activity },
  车载设备: { path: "/exchange/vehicle", icon: Truck },
  砂品监测装置: { path: "/exchange/inspection", icon: Cpu },
  调度中心: { path: "/exchange/dispatch", icon: Radio },
  中心大屏: { path: "/exchange/screen", icon: Monitor },
};

function resolveModuleMeta(module: string): ModuleMeta {
  return (
    moduleMetaByName[module] ?? {
      path: "/exchange/monitor",
      icon: Activity,
    }
  );
}

export function DeviceMonitorCard({ device }: { device: DeviceStatusItem }) {
  const meta = resolveModuleMeta(device.module);
  const Icon = meta.icon;

  return (
    <Link href={meta.path} className="group block h-full">
      <article className="flex h-full min-h-[152px] flex-col rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-lark-card)] transition-colors hover:border-brand/30 hover:bg-brand-light/25">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
            <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className="truncate text-sm font-medium leading-[22px] text-text-primary">
                {device.name}
              </h4>
              <StatusBadge status={device.status} />
            </div>
            <p className="mt-0.5 truncate lark-caption">{device.module}</p>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-3">
          <div className="min-w-0">
            <p className="lark-caption">{device.param}</p>
            <p className="mt-1 truncate text-base font-semibold tabular-nums leading-6 text-text-primary">
              {device.value}
            </p>
          </div>
          <div className="flex shrink-0 items-end gap-3">
            <div className="text-right">
              <p className="lark-caption">更新</p>
              <p className="mt-1 text-sm tabular-nums leading-[22px] text-text-primary">
                {device.updatedAt}
              </p>
            </div>
            <ArrowRight
              className="mb-0.5 size-4 shrink-0 text-text-secondary transition-colors group-hover:text-brand"
              aria-hidden
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
