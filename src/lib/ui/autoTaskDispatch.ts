export type AutoDispatchModule = "loading" | "processing";

const STORAGE_KEY: Record<AutoDispatchModule, string> = {
  loading: "demo.autoDispatch.loading",
  processing: "demo.autoDispatch.processing",
};

export function getAutoDispatchEnabled(module: AutoDispatchModule): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(STORAGE_KEY[module]) === "true";
}

export function setAutoDispatchEnabled(
  module: AutoDispatchModule,
  enabled: boolean,
): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY[module], String(enabled));
}

export function taskTypeToModule(taskType: "上砂" | "砂处理"): AutoDispatchModule {
  return taskType === "砂处理" ? "processing" : "loading";
}
