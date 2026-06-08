"use client";

import { LarkTag } from "./LarkTag";
import { connectionVariant } from "@/lib/ui/larkTag";
import type { ConnectionStatus } from "@/lib/types/demo";

const config: Record<ConnectionStatus, { label: string }> = {
  online: { label: "在线" },
  warning: { label: "异常" },
  offline: { label: "离线" },
};

type StatusBadgeProps = {
  status: ConnectionStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label } = config[status];
  return <LarkTag variant={connectionVariant[status]}>{label}</LarkTag>;
}
