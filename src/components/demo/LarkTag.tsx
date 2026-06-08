"use client";

import { Tag } from "@arco-design/web-react";
import {
  larkTagArcoColor,
  resolveVariant,
  type LarkTagVariant,
} from "@/lib/ui/larkTag";
import { getStatusIconMeta, hasStatusIcon, isSpinningStatus } from "@/lib/ui/larkStatusIcon";

type LarkTagProps = {
  children: React.ReactNode;
  variant?: LarkTagVariant;
  className?: string;
  icon?: React.ReactNode;
};

export function LarkTag({
  children,
  variant = "neutral",
  className = "",
  icon,
}: LarkTagProps) {
  return (
    <Tag
      color={larkTagArcoColor[variant]}
      bordered={false}
      size="small"
      className={`lark-status-tag ${icon ? "lark-status-tag--with-icon" : ""} ${className}`.trim()}
    >
      {icon ? <span className="lark-status-tag__icon">{icon}</span> : null}
      {children}
    </Tag>
  );
}

type LarkStatusTagProps = {
  value: string | number | boolean;
  variant?: LarkTagVariant;
  className?: string;
  showIcon?: boolean;
};

/** 按文案自动映射飞书风语义色 + 状态图标 */
export function LarkStatusTag({
  value,
  variant,
  className,
  showIcon = true,
}: LarkStatusTagProps) {
  const resolved = variant ?? resolveVariant(value);
  const meta = getStatusIconMeta(value, resolved);
  const Icon = meta.Icon;
  const spin = isSpinningStatus(value);
  const withIcon = showIcon && (hasStatusIcon(value) || variant != null);

  return (
    <LarkTag
      variant={resolved}
      className={className}
      icon={
        withIcon ? (
          <Icon
            className={`size-3 shrink-0 ${spin ? "animate-spin" : ""}`}
            strokeWidth={2}
            aria-hidden
          />
        ) : undefined
      }
    >
      {String(value)}
    </LarkTag>
  );
}
