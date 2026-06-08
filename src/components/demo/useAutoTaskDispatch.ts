"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAutoDispatchEnabled,
  setAutoDispatchEnabled,
  taskTypeToModule,
  type AutoDispatchModule,
} from "@/lib/ui/autoTaskDispatch";

export function useAutoTaskDispatch(taskType: "上砂" | "砂处理") {
  const module = taskTypeToModule(taskType);
  const [autoEnabled, setAutoEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAutoEnabled(getAutoDispatchEnabled(module));
    setReady(true);
  }, [module]);

  const toggleAutoDispatch = useCallback(
    (enabled: boolean) => {
      setAutoEnabled(enabled);
      setAutoDispatchEnabled(module, enabled);
    },
    [module],
  );

  return { autoEnabled, toggleAutoDispatch, ready, module };
}

export type { AutoDispatchModule };
