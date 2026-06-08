export const mobileViewOptions = [
  { value: "任务", label: "任务" },
  { value: "告警", label: "告警" },
  { value: "KPI 摘要", label: "KPI 摘要" },
  { value: "设备状态", label: "设备状态" },
  { value: "接口健康", label: "接口健康" },
  { value: "检测记录", label: "检测记录" },
  { value: "合格率", label: "合格率" },
  { value: "作业进度", label: "作业进度" },
  { value: "模型状态", label: "模型状态" },
];

export const mobileCommandOptions = [
  { value: "告警确认", label: "告警确认" },
  { value: "任务审批", label: "任务审批" },
  { value: "任务下发", label: "任务下发" },
  { value: "参数微调", label: "参数微调" },
  { value: "重启服务", label: "重启服务" },
  { value: "规则配置", label: "规则配置" },
];

export const mobileDeviceScopeOptions = [
  { value: "全部移动终端", label: "全部移动终端" },
  { value: "授权终端", label: "授权终端" },
  { value: "检测专用终端", label: "检测专用终端" },
  { value: "本岗位终端", label: "本岗位终端" },
];

export function formatMobilePermissionList(items: string[]): string {
  if (items.length === 0) return "无";
  return items.join("、");
}
