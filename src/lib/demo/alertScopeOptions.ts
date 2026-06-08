export const ALERT_SCOPE_ALL = "all";

export const alertZoneOptions = [
  { value: ALERT_SCOPE_ALL, label: "全站" },
  { value: "G101", label: "G101 区段" },
  { value: "G205", label: "G205 区段" },
  { value: "hub", label: "枢纽站场" },
];

export const alertModuleOptions = [
  { value: ALERT_SCOPE_ALL, label: "全部模块" },
  { value: "移动上砂装置", label: "移动上砂装置" },
  { value: "智能砂处理装置", label: "智能砂处理装置" },
  { value: "车载设备", label: "车载设备" },
  { value: "砂品监测装置", label: "砂品监测装置" },
  { value: "调度中心", label: "调度中心" },
  { value: "中心大屏", label: "中心大屏" },
  { value: "模块对接", label: "模块对接（接口）" },
];

/** 与运行监测 deviceStatusList 保持一致 */
const alertDeviceLabels: Record<string, string> = {
  D01: "移动上砂装置-01",
  D02: "砂处理装置-A",
  D03: "车载主机-101",
  D04: "监测终端-03",
  D05: "调度接口服务",
  D06: "大屏推送服务",
};

export const alertDeviceOptions = [
  { value: ALERT_SCOPE_ALL, label: "全部设备" },
  ...Object.entries(alertDeviceLabels).map(([id, name]) => ({
    value: id,
    label: name,
  })),
];

function findLabel(
  options: { value: string; label: string }[],
  value?: string,
): string {
  if (!value || value === ALERT_SCOPE_ALL) {
    return options.find((o) => o.value === ALERT_SCOPE_ALL)?.label ?? "全站";
  }
  return options.find((o) => o.value === value)?.label ?? value;
}

export function formatScopeZone(value?: string): string {
  return findLabel(alertZoneOptions, value);
}

export function formatScopeModule(value?: string): string {
  return findLabel(alertModuleOptions, value);
}

export function formatScopeDevice(value?: string): string {
  if (!value || value === ALERT_SCOPE_ALL) return "全部设备";
  return alertDeviceLabels[value] ?? value;
}
