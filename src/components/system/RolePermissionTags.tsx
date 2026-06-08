"use client";

import { LarkTag } from "@/components/demo/LarkTag";
import {
  isAllMenuPermissions,
  isAllOperatePermissions,
} from "@/lib/demo/rolePermissionOptions";

type RolePermissionTagsProps = {
  items: string[];
  variant?: "neutral" | "info";
  allLabel?: string;
  kind?: "menu" | "operate" | "default";
};

export function RolePermissionTags({
  items,
  variant = "neutral",
  allLabel = "全部",
  kind = "default",
}: RolePermissionTagsProps) {
  if (items.length === 0) {
    return <span className="text-sm text-text-secondary">—</span>;
  }

  const showAll =
    kind === "menu"
      ? isAllMenuPermissions(items)
      : kind === "operate"
        ? isAllOperatePermissions(items)
        : false;

  if (showAll) {
    return <LarkTag variant={variant}>{allLabel}</LarkTag>;
  }

  return (
    <div className="mt-1 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <LarkTag key={item} variant={variant}>
          {item}
        </LarkTag>
      ))}
    </div>
  );
}
