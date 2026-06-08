"use client";

import { useState } from "react";
import { DemoButton } from "@/components/demo/DemoButton";
import { SyncLogsModal } from "@/components/demo/SyncLogsModal";
import type { SyncLogItem } from "@/lib/types/demo";

type SyncLogsTriggerProps = {
  data: SyncLogItem[];
  label?: string;
  modalTitle?: string;
};

export function SyncLogsTrigger({
  data,
  label = "同步日志",
  modalTitle = "同步日志",
}: SyncLogsTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DemoButton variant="secondary" size="sm" onClick={() => setOpen(true)}>
        {label} · {data.length} 条
      </DemoButton>
      <SyncLogsModal
        open={open}
        onClose={() => setOpen(false)}
        data={data}
        title={modalTitle}
      />
    </>
  );
}
