"use client";

import { Button } from "@arco-design/web-react";
import { type LucideIcon } from "lucide-react";
import {
  resolveArcoButtonProps,
  resolveArcoButtonSize,
  type DemoButtonSize,
  type DemoButtonVariant,
} from "@/lib/ui/demoButton";

type DemoButtonProps = {
  children: React.ReactNode;
  variant?: DemoButtonVariant;
  size?: DemoButtonSize;
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function DemoButton({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
}: DemoButtonProps) {
  const arcoProps = resolveArcoButtonProps(variant);

  return (
    <Button
      htmlType={type}
      {...arcoProps}
      size={resolveArcoButtonSize(size)}
      loading={loading}
      disabled={disabled}
      className={className}
      icon={Icon ? <Icon className="size-3.5 shrink-0" aria-hidden /> : undefined}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
