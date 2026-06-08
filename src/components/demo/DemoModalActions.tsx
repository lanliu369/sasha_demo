"use client";

import { DemoActionBar } from "@/components/demo/DemoActionBar";
import { DemoButton } from "@/components/demo/DemoButton";

type DemoModalActionsProps = {
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
  cancelText?: string;
  confirmText?: string;
};

/** 弹窗底部操作区 — 与页面按钮风格一致 */
export function DemoModalActions({
  onCancel,
  onConfirm,
  loading = false,
  cancelText = "取消",
  confirmText = "确认",
}: DemoModalActionsProps) {
  return (
    <DemoActionBar align="end">
      <DemoButton variant="secondary" disabled={loading} onClick={onCancel}>
        {cancelText}
      </DemoButton>
      <DemoButton variant="primary" loading={loading} onClick={onConfirm}>
        {confirmText}
      </DemoButton>
    </DemoActionBar>
  );
}
