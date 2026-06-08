import type { CountListConfig } from "@/lib/types/demo";
import type { StatItem } from "@/lib/types";
import { buildAutoCountList } from "@/lib/mock/countListFactory";
import {
  mobileCommandRecords,
  mobileDenyRecords,
  mobileOnlineTerminals,
  mobileViewRecords,
} from "@/lib/mock/mobileTerminals";
import {
  vehicleDumpRecords,
  vehicleModelRecords,
  vehiclePredictRecords,
  vehicleSandRecords,
} from "@/lib/mock/vehicleRecords";
import {
  getOrchestrationTasksByType,
  getPendingSmartDispatchList,
  orchestrationTasks,
  smartDispatchPlans,
} from "@/lib/mock/orchestrationTasks";
import { buildDispatchPlans } from "@/lib/mock/exchangeDataFlow";

const dispatchPlans = buildDispatchPlans();

const receiveTypes = [
  "进站信息",
  "道口信号",
  "加砂计划",
  "列车编号",
  "状态心跳",
  "作业进度",
];

const dispatchReceived = Array.from({ length: 12 }, (_, i) => ({
  id: `IN${String(i + 1).padStart(3, "0")}`,
  time: `10:${String(25 + i).padStart(2, "0")}`,
  dataType: receiveTypes[i % receiveTypes.length],
  train: ["G101", "G205", "D308"][i % 3],
  size: `${(0.8 + i * 0.3).toFixed(1)} KB`,
  status: i === 10 ? "重试" : "成功",
}));

const dispatchSent = Array.from({ length: 8 }, (_, i) => ({
  id: `OUT${String(i + 1).padStart(3, "0")}`,
  time: `10:${String(30 + i).padStart(2, "0")}`,
  dataType: ["任务指令", "参数同步", "状态回传", "编排确认"][i % 4],
  target: ["移动上砂", "砂处理", "调度中心", "大屏推送"][i % 4],
  size: `${(1.2 + i * 0.5).toFixed(1)} KB`,
  status: "成功",
}));

export const countLists: Record<string, CountListConfig> = {
  "dispatch:plan": {
    title: "加砂计划队列",
    desc: "与编排工单 Oxxx、智能调度 SDxx 自动关联；状态随平台工单同步（Demo）。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "批次", dataIndex: "batch", width: 120 },
      { title: "列车", dataIndex: "train", width: 70 },
      { title: "股道", dataIndex: "track", width: 60 },
      { title: "调度计划", dataIndex: "dispatchId", width: 80 },
      { title: "编排工单", dataIndex: "orderId", width: 80 },
      { title: "状态", dataIndex: "status", width: 90 },
      { title: "接收", dataIndex: "receivedAt", width: 80 },
    ],
    data: dispatchPlans,
  },
  "dispatch:in": {
    title: "今日接收明细",
    desc: "调度中心 → 系统中台 上行数据抽样列表。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "时间", dataIndex: "time", width: 80 },
      { title: "类型", dataIndex: "dataType", width: 100 },
      { title: "列车", dataIndex: "train", width: 70 },
      { title: "大小", dataIndex: "size", width: 80 },
      { title: "状态", dataIndex: "status", width: 70 },
    ],
    data: dispatchReceived,
  },
  "dispatch:out": {
    title: "今日下发明细",
    desc: "系统中台 → 调度中心 / 下游模块 下行指令抽样列表。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "时间", dataIndex: "time", width: 80 },
      { title: "类型", dataIndex: "dataType", width: 100 },
      { title: "目标", dataIndex: "target", width: 100 },
      { title: "大小", dataIndex: "size", width: 80 },
      { title: "状态", dataIndex: "status", width: 70 },
    ],
    data: dispatchSent,
  },
  "dispatch:err": {
    title: "同步失败记录",
    desc: "今日无失败记录；以下为历史样例。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "时间", dataIndex: "time", width: 90 },
      { title: "类型", dataIndex: "dataType", width: 100 },
      { title: "原因", dataIndex: "reason" },
      { title: "状态", dataIndex: "status", width: 80 },
    ],
    data: [
      {
        id: "ERR01",
        time: "2025-05-28 16:22",
        dataType: "检测数据",
        reason: "超时重试后成功",
        status: "已恢复",
      },
    ],
  },
  "orchestration:pending": {
    title: "待处理工单",
    desc: "任务编排已生成、待在调度中心下发的平台工单。",
    columns: [
      { title: "平台工单", dataIndex: "id", width: 80 },
      { title: "调度计划", dataIndex: "dispatchId", width: 80 },
      { title: "任务", dataIndex: "name" },
      { title: "列车", dataIndex: "train", width: 70 },
      { title: "目标", dataIndex: "target", width: 130 },
      { title: "状态", dataIndex: "status", width: 90 },
    ],
    data: getOrchestrationTasksByType("上砂")
      .concat(getOrchestrationTasksByType("砂处理"))
      .filter((t) => t.status === "待处理")
      .map((t) => ({
        id: t.id,
        dispatchId: t.dispatchId ?? "—",
        name: t.name,
        train: t.train ?? "—",
        target: t.target,
        status: t.status,
      })),
  },
  "orchestration:running": {
    title: "处理中工单",
    desc: "已由业务模块下发、正在执行的平台工单。",
    columns: [
      { title: "平台工单", dataIndex: "id", width: 80 },
      { title: "调度计划", dataIndex: "dispatchId", width: 80 },
      { title: "任务", dataIndex: "name" },
      { title: "目标", dataIndex: "target", width: 130 },
      { title: "进度", dataIndex: "progress", width: 70 },
      { title: "状态", dataIndex: "status", width: 90 },
    ],
    data: orchestrationTasks
      .filter((t) => t.taskType && t.status === "处理中")
      .map((t) => ({
        id: t.id,
        dispatchId: t.dispatchId ?? "—",
        name: t.name,
        target: t.target,
        progress: `${t.progress}%`,
        status: t.status,
      })),
  },
  "orchestration:done": {
    title: "今日已处理",
    desc: "业务模块已回传处理结果、平台闭环的工单。",
    columns: [
      { title: "编号", dataIndex: "id", width: 80 },
      { title: "任务", dataIndex: "name" },
      { title: "目标", dataIndex: "target", width: 130 },
      { title: "状态", dataIndex: "status", width: 90 },
    ],
    data: orchestrationTasks
      .filter((t) => t.taskType && t.status === "已处理")
      .map((t) => ({
        id: t.id,
        name: t.name,
        target: t.target,
        status: t.status,
      })),
  },
  "dashboard:alerts": {
    title: "未处理告警",
    desc: "工作台汇总 · 待处置告警。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "等级", dataIndex: "level", width: 60 },
      { title: "内容", dataIndex: "title" },
      { title: "来源", dataIndex: "source", width: 120 },
      { title: "状态", dataIndex: "status", width: 90 },
    ],
    data: [
      {
        id: "A001",
        level: "高",
        title: "移动上砂装置作业进度滞后",
        source: "移动上砂装置",
        status: "未处理",
      },
      {
        id: "A002",
        level: "中",
        title: "智能砂处理装置砂仓存量偏低",
        source: "智能砂处理装置",
        status: "处理中",
      },
      {
        id: "A003",
        level: "低",
        title: "车载设备通信延迟偏高",
        source: "车载设备",
        status: "未处理",
      },
    ],
  },
  "alert:pending": {
    title: "未闭环告警",
    desc: "预警中心待处置告警列表。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "等级", dataIndex: "level", width: 60 },
      { title: "内容", dataIndex: "title" },
      { title: "状态", dataIndex: "status", width: 90 },
    ],
    data: [
      { id: "A001", level: "高", title: "上砂进度停滞超 5 分钟", status: "未处理" },
      { id: "A002", level: "中", title: "砂仓存量低于阈值", status: "处理中" },
    ],
  },
  "alert:total": {
    title: "今日告警",
    desc: "今日全部告警记录。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "等级", dataIndex: "level", width: 60 },
      { title: "内容", dataIndex: "title" },
      { title: "状态", dataIndex: "status", width: 90 },
    ],
    data: [
      { id: "A001", level: "高", title: "上砂进度停滞", status: "未处理" },
      { id: "A002", level: "中", title: "砂仓存量偏低", status: "处理中" },
      { id: "A003", level: "低", title: "通信延迟偏高", status: "已关闭" },
    ],
  },
  "alert:high": {
    title: "高等级告警",
    desc: "需优先处置的高等级告警。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "内容", dataIndex: "title" },
      { title: "来源", dataIndex: "source", width: 120 },
      { title: "状态", dataIndex: "status", width: 90 },
    ],
    data: [
      {
        id: "A001",
        title: "上砂进度停滞超 5 分钟",
        source: "移动上砂装置",
        status: "未处理",
      },
    ],
  },
  "dashboard:tasks": {
    title: "今日任务",
    desc: "工作台 · 调度工单列表。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "任务", dataIndex: "title" },
      { title: "类型", dataIndex: "type", width: 80 },
      { title: "状态", dataIndex: "status", width: 90 },
    ],
    data: [
      {
        id: "O001",
        title: "G101 上砂 · 平台工单",
        type: "上砂",
        status: "处理中",
      },
      {
        id: "O002",
        title: "批次 #029 砂处理 · 平台工单",
        type: "砂处理",
        status: "待处理",
      },
      {
        id: "T003",
        title: "调度中心 · 加砂计划同步编排",
        type: "调度",
        status: "进行中",
      },
      {
        id: "T004",
        title: "车载设备 · 撒砂数据回传异常跟进",
        type: "调度",
        status: "异常",
      },
    ],
  },
  "mobile:online": {
    title: "在线终端",
    desc: "覆盖调度、上砂、检测、砂处理、车载、补给及大屏简控等现场终端。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "终端", dataIndex: "device" },
      { title: "类型", dataIndex: "type", width: 110 },
      { title: "所属模块", dataIndex: "module", width: 120 },
      { title: "岗位", dataIndex: "role", width: 80 },
      { title: "位置", dataIndex: "location", width: 110 },
      { title: "最近活跃", dataIndex: "lastActive", width: 90 },
      { title: "状态", dataIndex: "status", width: 70 },
    ],
    data: mobileOnlineTerminals,
  },
  "mobile:cmd": {
    title: "指令下发明细",
    desc: "各模块现场终端今日接收的指令抽样。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "指令", dataIndex: "command" },
      { title: "目标岗位", dataIndex: "target", width: 90 },
      { title: "所属模块", dataIndex: "module", width: 120 },
      { title: "终端", dataIndex: "device" },
      { title: "时间", dataIndex: "time", width: 80 },
      { title: "状态", dataIndex: "status", width: 80 },
    ],
    data: mobileCommandRecords,
  },
  "mobile:view": {
    title: "数据浏览明细",
    desc: "各模块终端浏览简版指标与作业数据的抽样。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "浏览内容", dataIndex: "content" },
      { title: "所属模块", dataIndex: "module", width: 120 },
      { title: "终端", dataIndex: "device" },
      { title: "时间", dataIndex: "time", width: 80 },
      { title: "状态", dataIndex: "status", width: 80 },
    ],
    data: mobileViewRecords,
  },
  "mobile:deny": {
    title: "权限拒绝明细",
    desc: "岗位权限不足导致的操作拒绝记录。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "操作", dataIndex: "action" },
      { title: "岗位", dataIndex: "role", width: 90 },
      { title: "所属模块", dataIndex: "module", width: 120 },
      { title: "原因", dataIndex: "reason" },
      { title: "状态", dataIndex: "status", width: 80 },
    ],
    data: mobileDenyRecords,
  },
  "smart-dispatch:plans": {
    title: "待调度计划明细",
    desc: "与智能调度 SDxx、编排工单 Oxxx 一一对应；资源分配完成后前往对应任务下发页执行。",
    columns: [
      { title: "调度计划", dataIndex: "id", width: 80 },
      { title: "编排工单", dataIndex: "orderId", width: 80 },
      { title: "调度批次", dataIndex: "planId", width: 80 },
      { title: "列车", dataIndex: "train", width: 70 },
      { title: "计划批次", dataIndex: "planBatch", width: 120 },
      { title: "类型", dataIndex: "taskType", width: 70 },
      { title: "分配资源", dataIndex: "resource", width: 110 },
      { title: "调度状态", dataIndex: "dispatchStatus", width: 90 },
    ],
    data: getPendingSmartDispatchList(),
  },
  "smart-dispatch:running": {
    title: "执行中计划",
    desc: "已下发至下游模块、与编排工单关联的在执行计划。",
    columns: [
      { title: "调度计划", dataIndex: "id", width: 80 },
      { title: "编排工单", dataIndex: "orderId", width: 80 },
      { title: "列车", dataIndex: "train", width: 70 },
      { title: "计划", dataIndex: "plan" },
      { title: "资源", dataIndex: "resource", width: 110 },
      { title: "状态", dataIndex: "status", width: 80 },
    ],
    data: smartDispatchPlans
      .filter((p) => p.status === "执行中")
      .map((p) => ({
        id: p.id,
        orderId: p.orderId,
        train: p.train,
        plan: p.plan,
        resource: p.resource,
        status: p.status,
      })),
  },
  "smart-dispatch:queue": {
    title: "排队计划",
    desc: "已分配资源、等待前序任务完成后触发的计划。",
    columns: [
      { title: "调度计划", dataIndex: "id", width: 80 },
      { title: "编排工单", dataIndex: "orderId", width: 80 },
      { title: "列车", dataIndex: "train", width: 70 },
      { title: "计划", dataIndex: "plan" },
      { title: "资源", dataIndex: "resource", width: 110 },
      { title: "状态", dataIndex: "status", width: 80 },
    ],
    data: smartDispatchPlans
      .filter((p) => p.status === "排队")
      .map((p) => ({
        id: p.id,
        orderId: p.orderId,
        train: p.train,
        plan: p.plan,
        resource: p.resource,
        status: p.status,
      })),
  },
  "vehicle:sand": {
    title: "撒砂采集明细",
    desc: "车端智能砂箱、列控接口与 NPU 边缘节点上报的撒砂采集记录抽样。",
    columns: [
      { title: "编号", dataIndex: "id", width: 80 },
      { title: "时间", dataIndex: "time", width: 80 },
      { title: "列车", dataIndex: "train", width: 70 },
      { title: "来源", dataIndex: "source", width: 130 },
      { title: "撒砂量", dataIndex: "amount", width: 80 },
      { title: "状态", dataIndex: "status", width: 70 },
    ],
    data: vehicleSandRecords,
  },
  "vehicle:dump": {
    title: "车地转储明细",
    desc: "车载主机经 FTP / 局域网关向系统中台转储的数据批次。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "时间", dataIndex: "time", width: 80 },
      { title: "列车", dataIndex: "train", width: 70 },
      { title: "摘要", dataIndex: "summary" },
      { title: "目标", dataIndex: "target", width: 120 },
      { title: "来源", dataIndex: "source", width: 130 },
      { title: "大小", dataIndex: "size", width: 80 },
      { title: "状态", dataIndex: "status", width: 70 },
    ],
    data: vehicleDumpRecords,
  },
  "vehicle:predict": {
    title: "推理回传明细",
    desc: "四大模型在车端 NPU 推理后回传至系统中台的记录抽样。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "时间", dataIndex: "time", width: 80 },
      { title: "列车", dataIndex: "train", width: 70 },
      { title: "模型", dataIndex: "model", width: 130 },
      { title: "摘要", dataIndex: "summary" },
      { title: "来源", dataIndex: "source", width: 130 },
      { title: "延迟", dataIndex: "latency", width: 70 },
      { title: "状态", dataIndex: "status", width: 70 },
    ],
    data: vehiclePredictRecords,
  },
  "vehicle:model": {
    title: "模型版本明细",
    desc: "控制中心经 FTP 热更新部署至各车载边缘节点的模型版本。",
    columns: [
      { title: "编号", dataIndex: "id", width: 70 },
      { title: "模型", dataIndex: "model", width: 90 },
      { title: "版本", dataIndex: "version", width: 80 },
      { title: "部署目标", dataIndex: "target", width: 130 },
      { title: "方式", dataIndex: "method", width: 100 },
      { title: "来源", dataIndex: "source", width: 90 },
      { title: "更新时间", dataIndex: "time", width: 130 },
      { title: "状态", dataIndex: "status", width: 80 },
    ],
    data: vehicleModelRecords,
  },
};

const countListActionLinks: Record<string, { label: string; path: string }> = {
  "dispatch:plan": { label: "前往系统智能调度", path: "/orchestration/smart-dispatch" },
  "dispatch:in": { label: "查看调度中心对接", path: "/exchange/dispatch" },
  "dispatch:out": { label: "查看编排总览", path: "/orchestration/overview" },
  "orchestration:pending": { label: "上砂任务下发", path: "/orchestration/loading-task" },
  "orchestration:running": { label: "全流程管控", path: "/orchestration/full-flow" },
  "orchestration:done": { label: "调度总览", path: "/orchestration/overview" },
  "alert:pending": { label: "告警处置", path: "/alert/disposal" },
  "alert:total": { label: "实时告警", path: "/alert/realtime" },
  "alert:high": { label: "告警处置", path: "/alert/disposal" },
  "dashboard:alerts": { label: "告警处置", path: "/alert/disposal" },
  "dashboard:tasks": { label: "调度总览", path: "/orchestration/overview" },
  "mobile:online": { label: "移动设备权限", path: "/system/mobile" },
  "mobile:cmd": { label: "告警处置", path: "/alert/disposal" },
  "mobile:view": { label: "调度总览", path: "/orchestration/overview" },
  "mobile:deny": { label: "移动设备权限", path: "/system/mobile" },
  "screen:push": { label: "大屏预览", path: "/display/screen" },
  "monitor:total": { label: "接口监控", path: "/exchange/monitor" },
  "monitor:warn": { label: "接口监控", path: "/exchange/monitor" },
  "smart-dispatch:plans": { label: "调度总览", path: "/orchestration/overview" },
  "smart-dispatch:running": { label: "全流程管控", path: "/orchestration/full-flow" },
  "smart-dispatch:queue": { label: "上砂任务下发", path: "/orchestration/loading-task" },
  "vehicle:sand": { label: "车载数据分析", path: "/analysis/vehicle" },
  "vehicle:dump": { label: "数据存储", path: "/storage/archive" },
  "vehicle:predict": { label: "模型预测", path: "/model/predict" },
  "vehicle:model": { label: "模型部署", path: "/model/deploy" },
};

export function getCountList(
  key: string,
  metric?: StatItem
): CountListConfig | undefined {
  if (countLists[key]) {
    return countLists[key];
  }
  if (metric) {
    return buildAutoCountList(key, metric);
  }
  return undefined;
}

export function getCountListActionLink(
  key: string
): { label: string; path: string } | undefined {
  return countListActionLinks[key];
}

/** 调度中心页 · 计划队列快捷条（展示前 5 条 + 查看全部） */
export function getDispatchPlanPreview() {
  return buildDispatchPlans().slice(0, 5);
}

export function getDispatchPlanList(): CountListConfig {
  return countLists["dispatch:plan"]!;
}
