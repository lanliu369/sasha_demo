"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { DemoButton } from "@/components/demo/DemoButton";
import { DemoModal } from "@/components/demo/DemoModal";
import { DemoModalActions } from "@/components/demo/DemoModalActions";
import { demoToastSuccess } from "@/components/demo/demoToast";
import {
  resolveDemoButtonSize,
  resolveDemoButtonVariant,
  type DemoButtonSize,
  type DemoButtonVariant,
} from "@/lib/ui/demoButton";

type DemoActionButtonProps = {
  children: React.ReactNode;
  /** 语义变体 */
  variant?: DemoButtonVariant;
  /** sm / md / lg，或兼容旧版 small / mini 等 */
  size?: DemoButtonSize | "small" | "default" | "large" | "mini";
  icon?: LucideIcon;
  className?: string;
  /** 兼容旧版 Arco 风格 props */
  type?: "primary" | "outline" | "text" | "secondary" | "dashed";
  status?: "danger" | "warning" | "success" | "default";
  confirmTitle?: string;
  confirmContent?: string;
  successMessage?: string;
  direct?: boolean;
  disabled?: boolean;
  onConfirm?: () => void;
};

function resolveSize(
  size?: DemoButtonSize | "small" | "default" | "large" | "mini"
): DemoButtonSize {
  if (size === "sm" || size === "md" || size === "lg") return size;
  return resolveDemoButtonSize(size);
}

export function DemoActionButton({
  children,
  variant,
  size,
  icon,
  className,
  type = "primary",
  status,
  confirmTitle = "确认操作",
  confirmContent = "此为 Demo 演示，确认继续？",
  successMessage = "操作成功（Demo）",
  direct = false,
  disabled = false,
  onConfirm,
}: DemoActionButtonProps) {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const resolvedVariant = variant ?? resolveDemoButtonVariant(type, status);
  const resolvedSize = resolveSize(size);

  const runSuccess = () => {
    onConfirm?.();
    demoToastSuccess(successMessage);
    setConfirmOpen(false);
  };

  const handleConfirm = () => {
    setLoading(true);
    window.setTimeout(() => {
      runSuccess();
      setLoading(false);
    }, 400);
  };

  const handleClick = () => {
    if (disabled) {
      return;
    }
    if (direct) {
      runSuccess();
      return;
    }
    setConfirmOpen(true);
  };

  return (
    <>
      <DemoButton
        variant={resolvedVariant}
        size={resolvedSize}
        icon={icon}
        loading={loading && direct}
        disabled={disabled}
        className={className}
        onClick={handleClick}
      >
        {children}
      </DemoButton>
      <DemoModal
        open={confirmOpen}
        onClose={() => !loading && setConfirmOpen(false)}
        title={confirmTitle}
        width={420}
        footer={
          <DemoModalActions
            loading={loading}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleConfirm}
          />
        }
      >
        <p className="text-sm text-text-primary">{confirmContent}</p>
      </DemoModal>
    </>
  );
}
