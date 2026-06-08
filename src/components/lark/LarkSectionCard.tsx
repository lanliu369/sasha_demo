"use client";

import { Card } from "@arco-design/web-react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";

type LarkSectionCardProps = {
  title: React.ReactNode;
  hint?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** 飞书风格区块卡片 — 轻阴影、弱边框 */
export function LarkSectionCard({
  title,
  hint,
  extra,
  children,
  className = "",
}: LarkSectionCardProps) {
  return (
    <Card
      bordered
      className={`lark-card-elevated ${className}`}
      title={
        hint ? <CardTitleWithHint title={title} hint={hint} /> : title
      }
      extra={extra}
    >
      {children}
    </Card>
  );
}
