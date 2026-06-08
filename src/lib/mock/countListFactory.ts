import type { CountListConfig } from "@/lib/types/demo";
import type { StatItem } from "@/lib/types";
import type { StatsDetailRecord } from "@/lib/mock/analysisRecords";
import {
  aggregateBatchRecords,
  aggregateFailRecords,
  statsDetailRecords,
  vehicleAnomalyRecords,
  vehicleSandAnalysisRecords,
  vehicleWarnRecords,
} from "@/lib/mock/analysisRecords";
import {
  mobileCommandRecords,
  mobileDenyRecords,
  mobileOnlineTerminals,
  mobileViewRecords,
} from "@/lib/mock/mobileTerminals";
import {
  moduleDefaultSources,
  vehicleDumpRecords,
  vehicleModelRecords,
  vehiclePredictRecords,
  vehicleSandRecords,
} from "@/lib/mock/vehicleRecords";
import {
  getPendingSmartDispatchList,
  smartDispatchPlans,
} from "@/lib/mock/orchestrationTasks";

const MAX_ROWS = 20;

/** 从指标值解析可展示的行数（Demo 抽样，最多 20 条） */
export function resolveMetricRowCount(value: string | number): number {
  if (typeof value === "number") {
    if (value <= 0) return 1;
    return Math.min(Math.max(Math.floor(value), 1), MAX_ROWS);
  }
  const text = String(value).trim();
  if (text === "—" || text === "正常" || text === "开启" || text.startsWith("v")) {
    return 3;
  }
  const kMatch = text.match(/^([\d.]+)K$/i);
  if (kMatch) {
    return Math.min(Math.max(Math.floor(Number(kMatch[1]) / 10), 5), MAX_ROWS);
  }
  const num = Number.parseFloat(text);
  if (!Number.isNaN(num) && num > 0) {
    return Math.min(Math.max(Math.floor(num), 1), MAX_ROWS);
  }
  return 3;
}

const terminalNames = mobileOnlineTerminals.map((t) => t.device);

function resolveModuleSources(listKey: string): string[] {
  const [moduleKey] = listKey.split(":");
  if (moduleKey === "mobile") return terminalNames;
  return moduleDefaultSources[moduleKey] ?? ["系统中台 · 数据汇聚"];
}

export function buildAutoCountList(
  listKey: string,
  metric: StatItem
): CountListConfig {
  const rowCount = resolveMetricRowCount(metric.value);
  const [, metricKey = "item"] = listKey.split(":");
  const title = `${metric.label}明细`;
  const desc = `与指标「${metric.label}」对应的抽样明细（Demo，共展示 ${rowCount} 条）。`;

  if (listKey.startsWith("analysis-vehicle:")) {
    return buildAnalysisVehicleList(metricKey, metric, rowCount, title, desc);
  }
  if (listKey.startsWith("analysis-stats:")) {
    return buildAnalysisStatsList(metricKey, metric, rowCount, title, desc);
  }
  if (listKey.startsWith("process:")) {
    return buildProcessList(metricKey, metric, rowCount, title, desc);
  }
  if (listKey.startsWith("mobile:")) {
    return buildMobileList(metricKey, metric, rowCount, title, desc);
  }
  if (listKey.startsWith("screen:")) {
    return buildScreenList(metricKey, metric, rowCount, title, desc);
  }
  if (listKey.startsWith("vehicle:")) {
    return buildVehicleList(metricKey, metric, rowCount, title, desc);
  }
  if (listKey.startsWith("smart-dispatch:")) {
    return buildSmartDispatchList(metricKey, metric, rowCount, title, desc);
  }

  const sources = resolveModuleSources(listKey);
  const rows = Array.from({ length: rowCount }, (_, i) => ({
    id: `${listKey.replace(":", "-").toUpperCase()}-${String(i + 1).padStart(2, "0")}`,
    time: `10:${String(10 + i).padStart(2, "0")}`,
    summary: `${metric.label}记录 #${i + 1}`,
    source: sources[i % sources.length],
    status: i === rowCount - 1 && metric.key.includes("err") ? "异常" : "成功",
  }));

  return {
    title,
    desc,
    columns: [
      { title: "编号", dataIndex: "id", width: 90 },
      { title: "时间", dataIndex: "time", width: 80 },
      { title: "摘要", dataIndex: "summary" },
      { title: "来源", dataIndex: "source", width: 110 },
      { title: "状态", dataIndex: "status", width: 80 },
    ],
    data: rows,
  };
}

function buildAnalysisVehicleList(
  metricKey: string,
  metric: StatItem,
  rowCount: number,
  title: string,
  desc: string
): CountListConfig {
  const columns = [
    { title: "编号", dataIndex: "id", width: 80 },
    { title: "时间", dataIndex: "time", width: 80 },
    { title: "列车", dataIndex: "train", width: 70 },
    { title: "公里标", dataIndex: "km", width: 100 },
    { title: "场景", dataIndex: "scenario", width: 100 },
    { title: "撒砂量", dataIndex: "amount", width: 80 },
    { title: "持续", dataIndex: "duration", width: 70 },
    { title: "关联模型", dataIndex: "model", width: 90 },
    { title: "采纳", dataIndex: "adopted", width: 60 },
    { title: "来源", dataIndex: "source", width: 130 },
    { title: "状态", dataIndex: "status", width: 70 },
  ];

  if (metricKey === "records") {
    return {
      title,
      desc: "车端撒砂采集与模型回传的单条分析记录抽样，字段与页面明细表一致。",
      columns,
      data: vehicleSandAnalysisRecords.slice(0, rowCount),
    };
  }
  if (metricKey === "adopt") {
    return {
      title: "建议采纳明细",
      desc: "模型建议与实际操作比对记录抽样，「采纳」列反映是否按建议执行。",
      columns,
      data: vehicleSandAnalysisRecords.slice(0, rowCount),
    };
  }
  if (metricKey === "warn") {
    return {
      title: "空转预警明细",
      desc: "关联空转风险与自动纠正模型的预警记录抽样。",
      columns,
      data: vehicleWarnRecords.slice(0, rowCount),
    };
  }
  if (metricKey === "anomaly") {
    return {
      title: "异常数据明细",
      desc: "已隔离或待复核的异常撒砂/推理记录抽样。",
      columns,
      data: vehicleAnomalyRecords.slice(0, rowCount),
    };
  }
  return buildAutoCountList(`generic:${metricKey}`, metric);
}

type StatsDetailRecordCategory = StatsDetailRecord["category"];

const statsCategoryMap: Record<string, StatsDetailRecordCategory> = {
  sand: "撒砂作业",
  load: "上砂作业",
  process: "砂处理",
  inspect: "检测记录",
};

function buildAnalysisStatsList(
  metricKey: string,
  metric: StatItem,
  rowCount: number,
  title: string,
  desc: string
): CountListConfig {
  const columns = [
    { title: "编号", dataIndex: "id", width: 80 },
    { title: "时间", dataIndex: "time", width: 80 },
    { title: "类型", dataIndex: "category", width: 90 },
    { title: "来源模块", dataIndex: "module", width: 120 },
    { title: "对象", dataIndex: "subject", width: 110 },
    { title: "摘要", dataIndex: "summary" },
    { title: "计量", dataIndex: "value", width: 70 },
    { title: "状态", dataIndex: "status", width: 70 },
  ];

  const category = statsCategoryMap[metricKey];
  const data = category
    ? statsDetailRecords.filter((item) => item.category === category).slice(0, rowCount)
    : statsDetailRecords.slice(0, rowCount);

  return {
    title,
    desc: category
      ? `「${category}」类数据的单条统计记录抽样，与页面明细表字段一致。`
      : desc,
    columns,
    data,
  };
}

function buildProcessList(
  metricKey: string,
  metric: StatItem,
  rowCount: number,
  title: string,
  desc: string
): CountListConfig {
  const columns = [
    { title: "编号", dataIndex: "id", width: 80 },
    { title: "时间", dataIndex: "time", width: 80 },
    { title: "流水线", dataIndex: "pipeline" },
    { title: "批次", dataIndex: "batch", width: 160 },
    { title: "模型类型", dataIndex: "modelType", width: 90 },
    { title: "样本池", dataIndex: "samplePool", width: 130 },
    { title: "记录数", dataIndex: "records", width: 80 },
    { title: "转换结果", dataIndex: "result", width: 160 },
    { title: "状态", dataIndex: "status", width: 70 },
  ];

  if (metricKey === "fail") {
    return {
      title: "转换失败明细",
      desc: "格式转换或字段映射失败的批次记录抽样。",
      columns,
      data: aggregateFailRecords.slice(0, rowCount),
    };
  }
  if (metricKey === "lag") {
    return {
      title: "积压队列",
      desc: "当前无积压批次；以下为最近成功批次抽样。",
      columns,
      data: aggregateBatchRecords.filter((item) => item.status === "成功").slice(0, 3),
    };
  }
  if (metricKey === "pipe") {
    return {
      title: "流水线批次明细",
      desc: "各汇聚流水线最近处理批次抽样。",
      columns,
      data: aggregateBatchRecords.slice(0, rowCount),
    };
  }
  return {
    title,
    desc: "今日处理批次的单条转换记录抽样，与页面明细表字段一致。",
    columns,
    data: aggregateBatchRecords.slice(0, rowCount),
  };
}

function buildMobileList(
  metricKey: string,
  metric: StatItem,
  rowCount: number,
  title: string,
  desc: string
): CountListConfig {
  if (metricKey === "online") {
    return {
      title,
      desc,
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
      data: mobileOnlineTerminals.slice(0, rowCount),
    };
  }
  if (metricKey === "cmd") {
    return {
      title,
      desc,
      columns: [
        { title: "编号", dataIndex: "id", width: 70 },
        { title: "指令", dataIndex: "command" },
        { title: "目标岗位", dataIndex: "target", width: 90 },
        { title: "所属模块", dataIndex: "module", width: 120 },
        { title: "终端", dataIndex: "device" },
        { title: "时间", dataIndex: "time", width: 80 },
        { title: "状态", dataIndex: "status", width: 80 },
      ],
      data: mobileCommandRecords.slice(0, rowCount),
    };
  }
  if (metricKey === "view") {
    return {
      title,
      desc,
      columns: [
        { title: "编号", dataIndex: "id", width: 70 },
        { title: "浏览内容", dataIndex: "content" },
        { title: "所属模块", dataIndex: "module", width: 120 },
        { title: "终端", dataIndex: "device" },
        { title: "时间", dataIndex: "time", width: 80 },
        { title: "状态", dataIndex: "status", width: 80 },
      ],
      data: mobileViewRecords.slice(0, rowCount),
    };
  }
  if (metricKey === "deny") {
    return {
      title,
      desc,
      columns: [
        { title: "编号", dataIndex: "id", width: 70 },
        { title: "操作", dataIndex: "action" },
        { title: "岗位", dataIndex: "role", width: 90 },
        { title: "所属模块", dataIndex: "module", width: 120 },
        { title: "原因", dataIndex: "reason" },
        { title: "状态", dataIndex: "status", width: 80 },
      ],
      data: mobileDenyRecords.slice(0, Math.max(rowCount, 2)),
    };
  }
  return buildAutoCountList(`generic:${metricKey}`, metric);
}

function buildVehicleList(
  metricKey: string,
  metric: StatItem,
  rowCount: number,
  title: string,
  desc: string
): CountListConfig {
  if (metricKey === "sand") {
    return {
      title,
      desc: "车端智能砂箱、列控接口与 NPU 边缘节点上报的撒砂采集记录抽样。",
      columns: [
        { title: "编号", dataIndex: "id", width: 80 },
        { title: "时间", dataIndex: "time", width: 80 },
        { title: "列车", dataIndex: "train", width: 70 },
        { title: "来源", dataIndex: "source", width: 130 },
        { title: "撒砂量", dataIndex: "amount", width: 80 },
        { title: "状态", dataIndex: "status", width: 70 },
      ],
      data: vehicleSandRecords.slice(0, rowCount),
    };
  }
  if (metricKey === "dump") {
    return {
      title,
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
      data: vehicleDumpRecords.slice(0, rowCount),
    };
  }
  if (metricKey === "predict") {
    return {
      title,
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
      data: vehiclePredictRecords.slice(0, rowCount),
    };
  }
  if (metricKey === "model") {
    return {
      title,
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
      data: vehicleModelRecords.slice(0, rowCount),
    };
  }
  return buildAutoCountList(`generic:${metricKey}`, metric);
}

function buildSmartDispatchList(
  metricKey: string,
  metric: StatItem,
  rowCount: number,
  title: string,
  desc: string
): CountListConfig {
  if (metricKey === "plans") {
    return {
      title,
      desc: "与智能调度 SDxx、编排工单 Oxxx 一一对应。",
      columns: [
        { title: "调度计划", dataIndex: "id", width: 80 },
        { title: "编排工单", dataIndex: "orderId", width: 80 },
        { title: "列车", dataIndex: "train", width: 70 },
        { title: "计划批次", dataIndex: "planBatch", width: 120 },
        { title: "类型", dataIndex: "taskType", width: 70 },
        { title: "调度状态", dataIndex: "dispatchStatus", width: 90 },
      ],
      data: getPendingSmartDispatchList().slice(0, rowCount),
    };
  }
  if (metricKey === "running") {
    return {
      title,
      desc,
      columns: [
        { title: "调度计划", dataIndex: "id", width: 80 },
        { title: "编排工单", dataIndex: "orderId", width: 80 },
        { title: "列车", dataIndex: "train", width: 70 },
        { title: "计划", dataIndex: "plan" },
        { title: "状态", dataIndex: "status", width: 80 },
      ],
      data: smartDispatchPlans
        .filter((p) => p.status === "执行中")
        .slice(0, rowCount)
        .map((p) => ({
          id: p.id,
          orderId: p.orderId,
          train: p.train,
          plan: p.plan,
          status: p.status,
        })),
    };
  }
  if (metricKey === "queue") {
    return {
      title,
      desc,
      columns: [
        { title: "调度计划", dataIndex: "id", width: 80 },
        { title: "编排工单", dataIndex: "orderId", width: 80 },
        { title: "列车", dataIndex: "train", width: 70 },
        { title: "计划", dataIndex: "plan" },
        { title: "状态", dataIndex: "status", width: 80 },
      ],
      data: smartDispatchPlans
        .filter((p) => p.status === "排队")
        .slice(0, rowCount)
        .map((p) => ({
          id: p.id,
          orderId: p.orderId,
          train: p.train,
          plan: p.plan,
          status: p.status,
        })),
    };
  }
  return buildAutoCountList(`generic:${metricKey}`, metric);
}

function buildScreenList(
  metricKey: string,
  metric: StatItem,
  rowCount: number,
  title: string,
  desc: string
): CountListConfig {
  if (metricKey === "push") {
    return {
      title,
      desc,
      columns: [
        { title: "编号", dataIndex: "id", width: 70 },
        { title: "时间", dataIndex: "time", width: 90 },
        { title: "模块", dataIndex: "module", width: 100 },
        { title: "延迟", dataIndex: "delay", width: 70 },
        { title: "状态", dataIndex: "status", width: 80 },
      ],
      data: Array.from({ length: rowCount }, (_, i) => ({
        id: `PS${String(i + 1).padStart(3, "0")}`,
        time: `10:${String(35 - (i % 30)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}`,
        module: ["设备状态", "作业进度", "KPI", "告警摘要"][i % 4],
        delay: `${110 + (i % 20)}ms`,
        status: "成功",
      })),
    };
  }
  return buildAutoCountList(`generic:${metricKey}`, metric);
}
