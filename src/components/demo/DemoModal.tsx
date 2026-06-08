"use client";

import { Modal } from "@arco-design/web-react";

type DemoModalProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  width?: number | string;
};

export function DemoModal({
  open,
  onClose,
  title,
  children,
  footer,
  extra,
  width = 560,
}: DemoModalProps) {
  return (
    <Modal
      visible={open}
      title={
        extra ? (
          <div className="flex w-full items-center justify-between gap-3 pr-6">
            <span>{title}</span>
            {extra}
          </div>
        ) : (
          title
        )
      }
      onCancel={onClose}
      footer={footer}
      style={{ width, maxWidth: "calc(100vw - 32px)" }}
      autoFocus={false}
      unmountOnExit
      maskClosable
      escToExit
    >
      {children}
    </Modal>
  );
}
