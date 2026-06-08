/** 移动终端 / 在线终端 Demo 数据 — 覆盖七大模块及现场作业终端类型 */

export type MobileTerminalItem = {
  id: string;
  device: string;
  type: string;
  module: string;
  role: string;
  location: string;
  lastActive: string;
  status: string;
};

export const mobileOnlineTerminals: MobileTerminalItem[] = [
  {
    id: "MT01",
    device: "调度手持终端-运调01",
    type: "手持终端",
    module: "调度中心",
    role: "调度员",
    location: "运调室",
    lastActive: "10:35",
    status: "在线",
  },
  {
    id: "MT02",
    device: "上砂现场屏-3道",
    type: "工业平板",
    module: "移动上砂装置",
    role: "设备员",
    location: "3道作业面",
    lastActive: "10:34",
    status: "在线",
  },
  {
    id: "MT03",
    device: "便携砂品检测仪-03",
    type: "便携检测终端",
    module: "砂品监测装置",
    role: "检测员",
    location: "质检工位",
    lastActive: "10:34",
    status: "在线",
  },
  {
    id: "MT04",
    device: "砂处理巡检Pad-A",
    type: "工业平板",
    module: "智能砂处理装置",
    role: "设备员",
    location: "砂处理区",
    lastActive: "10:33",
    status: "在线",
  },
  {
    id: "MT05",
    device: "车载边缘平板-G101",
    type: "车载平板",
    module: "车载设备",
    role: "运维员",
    location: "G101 随车",
    lastActive: "10:35",
    status: "在线",
  },
  {
    id: "MT06",
    device: "现场加固手持机-调车场",
    type: "加固手持机",
    module: "移动设备",
    role: "调度员",
    location: "调车场",
    lastActive: "10:32",
    status: "在线",
  },
  {
    id: "MT07",
    device: "补给协同终端-02",
    type: "工业平板",
    module: "移动上砂补给",
    role: "设备员",
    location: "补给作业点",
    lastActive: "10:31",
    status: "在线",
  },
  {
    id: "MT08",
    device: "中控简控Pad",
    type: "展示控制平板",
    module: "中心大屏",
    role: "调度员",
    location: "中控室",
    lastActive: "10:35",
    status: "在线",
  },
];

export const mobileCommandRecords = [
  { id: "CMD001", command: "确认告警 A001", target: "调度员", module: "调度中心", device: "调度手持终端-运调01", time: "10:34", status: "成功" },
  { id: "CMD002", command: "审批上砂任务 T001", target: "设备员", module: "移动上砂装置", device: "上砂现场屏-3道", time: "10:33", status: "成功" },
  { id: "CMD003", command: "上传检测复核", target: "检测员", module: "砂品监测装置", device: "便携砂品检测仪-03", time: "10:32", status: "成功" },
  { id: "CMD004", command: "砂处理参数微调", target: "设备员", module: "智能砂处理装置", device: "砂处理巡检Pad-A", time: "10:31", status: "成功" },
  { id: "CMD005", command: "车地同步确认", target: "运维员", module: "车载设备", device: "车载边缘平板-G101", time: "10:30", status: "成功" },
  { id: "CMD006", command: "查看作业进度", target: "调度员", module: "移动设备", device: "现场加固手持机-调车场", time: "10:29", status: "成功" },
  { id: "CMD007", command: "补给计划确认", target: "设备员", module: "移动上砂补给", device: "补给协同终端-02", time: "10:28", status: "成功" },
  { id: "CMD008", command: "大屏布局切换", target: "调度员", module: "中心大屏", device: "中控简控Pad", time: "10:27", status: "成功" },
];

export const mobileViewRecords = [
  { id: "VW001", content: "加砂计划摘要", module: "调度中心", device: "调度手持终端-运调01", time: "10:35", status: "成功" },
  { id: "VW002", content: "上砂进度 72%", module: "移动上砂装置", device: "上砂现场屏-3道", time: "10:34", status: "成功" },
  { id: "VW003", content: "批次 #029 检测合格", module: "砂品监测装置", device: "便携砂品检测仪-03", time: "10:34", status: "成功" },
  { id: "VW004", content: "砂仓存量 78%", module: "智能砂处理装置", device: "砂处理巡检Pad-A", time: "10:33", status: "成功" },
  { id: "VW005", content: "NPU 负载 34%", module: "车载设备", device: "车载边缘平板-G101", time: "10:35", status: "成功" },
  { id: "VW006", content: "实时告警 2 条", module: "移动设备", device: "现场加固手持机-调车场", time: "10:32", status: "成功" },
  { id: "VW007", content: "补给余量预警", module: "移动上砂补给", device: "补给协同终端-02", time: "10:31", status: "成功" },
  { id: "VW008", content: "KPI 简版看板", module: "中心大屏", device: "中控简控Pad", time: "10:35", status: "成功" },
];

export const mobileDenyRecords = [
  { id: "DN01", action: "下发砂处理参数", role: "检测员", module: "智能砂处理装置", reason: "岗位无砂处理操作权限", status: "拒绝" },
  { id: "DN02", action: "审批调度计划", role: "设备员", module: "调度中心", reason: "岗位无调度审批权限", status: "拒绝" },
];
