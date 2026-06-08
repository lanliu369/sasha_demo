"use client";

import { Card } from "@arco-design/web-react";

type LarkCardProps = {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bordered?: boolean;
  onClick?: () => void;
};

/** 飞书风格卡片 — 全站统一圆角/阴影/边框 */
export function LarkCard({
  title,
  extra,
  children,
  className = "",
  bordered = true,
  onClick,
}: LarkCardProps) {
  return (
    <Card
      title={title}
      extra={extra}
      bordered={bordered}
      className={`lark-card-elevated ${className}`}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}
