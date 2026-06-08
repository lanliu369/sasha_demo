import type { ExchangeModuleConfig, OrchestrationTask, SyncLogItem } from "@/lib/types/demo";
import {
  getOrchestrationTaskByOrderId,
  getOrchestrationTasksByType,
  orchestrationTasks,
} from "@/lib/mock/orchestrationTasks";

/** 调度计划 ↔ 智能调度 ↔ 平台工单 关联索引 */
export type PlanCorrelation = {
  planId: string;
  planBatch: string;
  train: string;
  track?: string;
  dispatchId?: string;
  orderId?: string;
  dispatchStatus: string;
  platformStatus?: string;
  taskType?: string;
};

const TRAIN_VEHICLE: Record<string, string> = {
  G101: "CR400AF-101",
  G205: "CR400AF-205",
  D308: "CR400AF-308",
  G102: "CR400AF-102",
  D401: "CR400AF-401",
};

const TRACK_SIGNAL: Record<string, string> = {
  "1道": "X1 开放 · 进路锁闭",
  "2道": "X2 开放 · 进路锁闭",
  "3道": "X3 开放 · 进路锁闭",
  "4道": "X4 开放 · 进路锁闭",
};

/** 由编排工单反查关联关系 */
export function getPlanCorrelation(orderId: string): PlanCorrelation | undefined {
  const task = getOrchestrationTaskByOrderId(orderId);
  if (!task?.planBatch) return undefined;
  return taskToCorrelation(task);
}

export function getPlanCorrelationByBatch(batch: string): PlanCorrelation | undefined {
  const task = orchestrationTasks.find(
    (t) => t.planBatch === batch || t.planBatch === batch.replace(/^批次\s*/, ""),
  );
  return task ? taskToCorrelation(task) : undefined;
}

function taskToCorrelation(task: OrchestrationTask): PlanCorrelation {
  return {
    planId: task.planId ?? "—",
    planBatch: task.planBatch ?? "—",
    train: task.train ?? "—",
    track: task.track,
    dispatchId: task.dispatchId,
    orderId: task.id,
    dispatchStatus: task.dispatchStatus ?? "—",
    platformStatus: task.status,
    taskType: task.taskType,
  };
}

function mapDispatchPlanStatus(task: OrchestrationTask): string {
  if (task.status === "已处理") return "已完成";
  if (task.status === "处理中" || task.dispatchStatus === "执行中") return "执行中";
  if (task.dispatchStatus === "排队") return "编排中";
  if (task.dispatchStatus === "待触发") return "待编排";
  if (task.dispatchStatus === "已完成") return "已完成";
  return "待编排";
}

function formatPlanFieldValue(task: OrchestrationTask): string {
  const pipeline = [task.planId, task.dispatchId, task.id].filter(Boolean).join(" → ");
  const status = mapDispatchPlanStatus(task);
  return `批次 ${task.planBatch} · ${status}${pipeline ? ` · ${pipeline}` : ""}`;
}

function padTime(base: string, tick: number): string {
  const [h, m, s] = base.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return base;
  const total = h * 3600 + m * 60 + (s || 0) + tick;
  const nh = Math.floor(total / 3600) % 24;
  const nm = Math.floor((total % 3600) / 60);
  const ns = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}:${String(ns).padStart(2, "0")}`;
}

/** 调度中心 · 加砂计划队列（与编排数据对齐） */
export function buildDispatchPlans() {
  const linked = orchestrationTasks.filter(
    (t) => t.taskType === "上砂" && t.planId && t.planId.startsWith("DP"),
  );

  const rows = linked.map((task, index) => ({
    id: task.planId!,
    batch: task.planBatch ?? "—",
    train: task.train ?? "—",
    track: task.track ?? `${(index % 4) + 1}道`,
    status: mapDispatchPlanStatus(task),
    receivedAt: task.updatedAt,
    dispatchId: task.dispatchId ?? "—",
    orderId: task.id,
  }));

  const extras = [
    { id: "DP01", batch: "#20250529-01", train: "G205", track: "1道", status: "待编排", receivedAt: "10:22", dispatchId: "—", orderId: "—" },
    { id: "DP05", batch: "#20250529-05", train: "D401", track: "4道", status: "待编排", receivedAt: "10:19", dispatchId: "—", orderId: "—" },
  ];

  return [...rows, ...extras];
}

export function buildDispatchPlanPreview() {
  return buildDispatchPlans().slice(0, 5);
}

export type DispatchPlanRow = ReturnType<typeof buildDispatchPlans>[number];

function findDispatchPlan(planId: string): DispatchPlanRow | undefined {
  return buildDispatchPlans().find((plan) => plan.id === planId);
}

/** 默认展示：执行中计划；否则取队列首条 */
export function getDefaultExchangeStreamKey(moduleKey: string): string | undefined {
  if (moduleKey === "dispatch") {
    const plans = buildDispatchPlans();
    const active = plans.find((plan) => plan.status === "执行中");
    return active?.id ?? plans[0]?.id;
  }
  if (moduleKey === "vehicle") {
    const devices = buildVehicleDevices();
    const active = devices.find((device) => device.status === "在线");
    return active?.id ?? devices[0]?.id;
  }
  if (moduleKey === "inspection") {
    const devices = buildInspectionDevices();
    const active = devices.find((device) => device.status === "在线");
    return active?.id ?? devices[0]?.id;
  }
  if (moduleKey === "loading") {
    const tasks = getOrchestrationTasksByType("上砂");
    const active = tasks.find((task) => task.status === "处理中");
    return active?.id ?? tasks[0]?.id;
  }
  if (moduleKey === "processing") {
    const tasks = getOrchestrationTasksByType("砂处理");
    return tasks.find((task) => task.status === "待处理")?.id ?? tasks[0]?.id;
  }
  return undefined;
}

export function getExchangeStreamOptions(
  moduleKey: string,
): { value: string; label: string }[] {
  if (moduleKey === "dispatch") {
    return buildDispatchPlans().map((plan) => ({
      value: plan.id,
      label: `${plan.batch} · ${plan.train}${
        plan.orderId !== "—" ? ` · ${plan.orderId}` : ""
      }`,
    }));
  }
  if (moduleKey === "vehicle") {
    return buildVehicleDevices().map((device) => ({
      value: device.id,
      label: `${device.train} · ${device.host} · ${device.status}`,
    }));
  }
  if (moduleKey === "inspection") {
    return buildInspectionDevices().map((device) => ({
      value: device.id,
      label: `${device.device} · ${device.location} · ${device.status}`,
    }));
  }
  if (moduleKey === "loading") {
    return getOrchestrationTasksByType("上砂").map((task) => ({
      value: task.id,
      label: `${task.id} · ${task.train ?? "—"} · ${task.status}`,
    }));
  }
  if (moduleKey === "processing") {
    return getOrchestrationTasksByType("砂处理").map((task) => ({
      value: task.id,
      label: `${task.id} · ${task.planBatch ?? "—"} · ${task.status}`,
    }));
  }
  return [];
}

function resolveDispatchFocusTask(planId: string): OrchestrationTask | undefined {
  const plan = findDispatchPlan(planId);
  if (!plan || plan.orderId === "—") {
    return undefined;
  }
  return getOrchestrationTaskByOrderId(plan.orderId);
}

function buildDispatchDataFieldsFromTask(task: OrchestrationTask, tick = 0) {
  const syncAt = padTime("10:35:12", tick);
  const entryTime =
    task.status === "处理中"
      ? "10:28 进站"
      : task.status === "已处理"
        ? "09:40 已离站"
        : "待进站";

  return [
    {
      label: "进站信息",
      value: `${task.train} · ${entryTime} · ${task.track ?? "—"}`,
      updatedAt: padTime("10:35:10", tick),
    },
    {
      label: "道口信号",
      value: task.track ? TRACK_SIGNAL[task.track] ?? "进路锁闭" : "—",
      updatedAt: padTime("10:35:08", tick),
    },
    {
      label: "加砂计划",
      value: formatPlanFieldValue(task),
      updatedAt: padTime("10:34:55", tick),
    },
    {
      label: "列车编号",
      value: task.train ? TRAIN_VEHICLE[task.train] ?? task.train : "—",
      updatedAt: padTime("10:34:50", tick),
    },
    {
      label: "数据推送",
      value: `模拟 WebSocket · 最近 ${syncAt}`,
      updatedAt: syncAt,
    },
  ];
}

function buildDispatchDataFieldsFromPlan(plan: DispatchPlanRow, tick = 0) {
  const syncAt = padTime("10:35:12", tick);

  return [
    {
      label: "进站信息",
      value: `${plan.train} · 待进站 · ${plan.track}`,
      updatedAt: padTime("10:35:10", tick),
    },
    {
      label: "道口信号",
      value: TRACK_SIGNAL[plan.track] ?? "待开放",
      updatedAt: padTime("10:35:08", tick),
    },
    {
      label: "加砂计划",
      value: `批次 ${plan.batch} · ${plan.status} · ${plan.id}`,
      updatedAt: padTime("10:34:55", tick),
    },
    {
      label: "列车编号",
      value: TRAIN_VEHICLE[plan.train] ?? plan.train,
      updatedAt: padTime("10:34:50", tick),
    },
    {
      label: "数据推送",
      value: `模拟 WebSocket · 最近 ${syncAt}`,
      updatedAt: syncAt,
    },
  ];
}

/** 调度中心 · 实时字段（按所选计划批次） */
export function buildDispatchDataFields(planId: string, tick = 0) {
  const plan = findDispatchPlan(planId);
  if (!plan) {
    return [];
  }

  const task = resolveDispatchFocusTask(planId);
  if (task) {
    return buildDispatchDataFieldsFromTask(task, tick);
  }

  return buildDispatchDataFieldsFromPlan(plan, tick);
}

/** 移动上砂 · 实时字段（按所选平台工单） */
export function buildLoadingDataFields(orderId: string, tick = 0) {
  const focus =
    getOrchestrationTaskByOrderId(orderId) ??
    getOrchestrationTaskByOrderId("O001");
  if (!focus) {
    return [];
  }
  const pending = getOrchestrationTasksByType("上砂").filter(
    (task) => task.status === "待处理",
  );

  return [
    {
      label: "设备状态",
      value: "4 台 · 2 作业中 · 1 补给中 · 1 异常",
      updatedAt: padTime("10:34:52", tick),
      units: [
        {
          id: "LU01",
          name: `${focus.track ?? "3道"}上砂机-01`,
          status: focus.status === "处理中" ? "作业中" : "待命",
          detail: focus
            ? `${focus.id} · ${focus.dispatchId ?? "—"} · ${focus.train ?? "—"} · ${focus.progress}%`
            : "—",
          updatedAt: padTime("10:34:52", tick),
        },
        {
          id: "LU02",
          name: "2道上砂机-02",
          status: pending[0] ? "待命" : "空闲",
          detail: pending[0]
            ? `待下发 ${pending[0].id} · ${pending[0].dispatchId ?? "—"}`
            : "无待处理工单",
          updatedAt: padTime("10:34:50", tick),
        },
        {
          id: "LU03",
          name: "1道上砂机-03",
          status: "补给中",
          detail: "移动上砂补给 · 余量 38%",
          updatedAt: padTime("10:34:48", tick),
        },
        {
          id: "LU04",
          name: "4道上砂机-04",
          status: "异常",
          detail: "进度上报超时 · 待排查",
          updatedAt: padTime("10:33:20", tick),
        },
      ],
    },
    {
      label: "当前任务",
      value: focus
        ? `${focus.id} · ${focus.dispatchId ?? "—"} · ${focus.train ?? "—"} ${focus.track ?? ""} · ${focus.status}`
        : "—",
      updatedAt: padTime("10:34:50", tick),
    },
    {
      label: "作业进度",
      value: focus ? `${focus.progress}%` : "—",
      updatedAt: padTime("10:34:48", tick),
    },
    {
      label: "车地同步",
      value:
        focus.status === "处理中"
          ? "已对齐 · 工单处理中"
          : focus.status === "已处理"
            ? "已归档 · 作业完成"
            : "待对齐 · 等待下发",
      updatedAt: padTime("10:34:45", tick),
    },
  ];
}

/** 砂处理 · 实时字段（按所选平台工单） */
export function buildProcessingDataFields(orderId: string, tick = 0) {
  const tasks = getOrchestrationTasksByType("砂处理");
  const focus =
    getOrchestrationTaskByOrderId(orderId) ?? tasks.find((task) => task.status === "待处理");
  const pending = tasks.filter((task) => task.status === "待处理");

  return [
    {
      label: "处理模式",
      value: focus ? `全自动 · ${focus.planBatch ?? "—"}` : "全自动 · 待机",
      updatedAt: padTime("10:34:58", tick),
    },
    {
      label: "砂仓 A",
      value: focus?.id === "O002" ? "820 kg / 1050 kg" : "760 kg / 1050 kg",
      updatedAt: padTime("10:34:55", tick),
    },
    {
      label: "储砂罐 B",
      value: focus?.id === "O008" ? "650 kg / 1000 kg" : "710 kg / 1000 kg",
      updatedAt: padTime("10:34:55", tick),
    },
    {
      label: "当前任务",
      value: focus
        ? `${focus.id} · ${focus.dispatchId ?? "—"} · ${focus.status}（待下发 ${pending.length} 项）`
        : "—",
      updatedAt: padTime("10:34:40", tick),
    },
  ];
}

export type VehicleDeviceRow = {
  id: string;
  train: string;
  host: string;
  vehicleNo: string;
  sand: string;
  npu: string;
  status: string;
  lastSync: string;
};

type VehicleDeviceProfile = VehicleDeviceRow & {
  speed: number;
  sandLevel: number;
  npuLoad: number;
  section: string;
};

const vehicleDeviceProfiles: VehicleDeviceProfile[] = [
  {
    id: "VH101",
    train: "G101",
    host: "车载主机-101",
    vehicleNo: "CR400AF-101",
    sand: "62%",
    npu: "34%",
    status: "在线",
    lastSync: "10:35:08",
    speed: 86,
    sandLevel: 62,
    npuLoad: 34,
    section: "K128+400 ~ K130+200",
  },
  {
    id: "VH205",
    train: "G205",
    host: "车载主机-205",
    vehicleNo: "CR400AF-205",
    sand: "78%",
    npu: "18%",
    status: "在线",
    lastSync: "10:34:52",
    speed: 0,
    sandLevel: 78,
    npuLoad: 18,
    section: "K115+800 ~ K116+200 · 待发",
  },
  {
    id: "VH308",
    train: "D308",
    host: "车载主机-308",
    vehicleNo: "CR400AF-308",
    sand: "55%",
    npu: "41%",
    status: "同步中",
    lastSync: "10:35:05",
    speed: 45,
    sandLevel: 55,
    npuLoad: 41,
    section: "K142+100 ~ K144+600",
  },
  {
    id: "VH102",
    train: "G102",
    host: "车载主机-102",
    vehicleNo: "CR400AF-102",
    sand: "91%",
    npu: "—",
    status: "离线",
    lastSync: "09:55:20",
    speed: 0,
    sandLevel: 91,
    npuLoad: 0,
    section: "—",
  },
];

export function buildVehicleDevices(): VehicleDeviceRow[] {
  return vehicleDeviceProfiles.map(({ id, train, host, vehicleNo, sand, npu, status, lastSync }) => ({
    id,
    train,
    host,
    vehicleNo,
    sand,
    npu,
    status,
    lastSync,
  }));
}

function findVehicleDevice(deviceId: string): VehicleDeviceProfile | undefined {
  return vehicleDeviceProfiles.find((device) => device.id === deviceId);
}

/** 车载设备 · 实时字段（按所选列车/主机） */
export function buildVehicleDataFields(deviceId: string, tick = 0) {
  const device =
    findVehicleDevice(deviceId) ?? findVehicleDevice("VH101");
  if (!device) {
    return [];
  }

  const syncAt = padTime("10:35:08", tick);
  const speedValue =
    device.status === "离线"
      ? "—"
      : device.speed > 0
        ? `${device.speed + (tick % 3)} km/h`
        : "0 km/h · 待发";

  return [
    {
      label: "列车编号",
      value: device.vehicleNo,
      updatedAt: padTime("10:35:07", tick),
    },
    {
      label: "当前车速",
      value: speedValue,
      updatedAt: padTime("10:35:06", tick),
    },
    {
      label: "砂箱余量",
      value: device.status === "离线" ? `${device.sandLevel}% · 离线缓存` : device.sand,
      updatedAt: padTime("10:35:06", tick),
    },
    {
      label: "NPU 负载",
      value: device.status === "离线" ? "—" : device.npu,
      updatedAt: padTime("10:35:05", tick),
    },
    {
      label: "运行图区段",
      value: device.section,
      updatedAt: padTime("10:35:04", tick),
    },
    {
      label: "数据推送",
      value: `MQTT · ${device.host} · 最近 ${syncAt}`,
      updatedAt: syncAt,
    },
  ];
}

export type InspectionDeviceRow = {
  id: string;
  device: string;
  location: string;
  batch: string;
  result: string;
  inspector: string;
  status: string;
  lastSync: string;
};

type InspectionDeviceProfile = InspectionDeviceRow & {
  granularity: string;
  humidity: string;
};

const inspectionDeviceProfiles: InspectionDeviceProfile[] = [
  {
    id: "IN03",
    device: "便携砂品检测仪-03",
    location: "质检工位",
    batch: "批次 #029",
    result: "合格",
    inspector: "张工 · 移动端",
    status: "在线",
    lastSync: "10:34:48",
    granularity: "0.8mm ±0.05",
    humidity: "3.2%",
  },
  {
    id: "IN01",
    device: "便携砂品检测仪-01",
    location: "1号砂仓抽检点",
    batch: "批次 #028",
    result: "合格",
    inspector: "李工 · 移动端",
    status: "在线",
    lastSync: "10:33:20",
    granularity: "0.75mm ±0.04",
    humidity: "2.8%",
  },
  {
    id: "IN02",
    device: "便携砂品检测仪-02",
    location: "补给线抽检点",
    batch: "批次 #030",
    result: "复核中",
    inspector: "王工 · 移动端",
    status: "检测中",
    lastSync: "10:34:55",
    granularity: "测定中",
    humidity: "测定中",
  },
  {
    id: "IN04",
    device: "监测终端-04",
    location: "临时工位",
    batch: "—",
    result: "—",
    inspector: "—",
    status: "待机",
    lastSync: "10:20:10",
    granularity: "—",
    humidity: "—",
  },
];

export function buildInspectionDevices(): InspectionDeviceRow[] {
  return inspectionDeviceProfiles.map(
    ({ id, device, location, batch, result, inspector, status, lastSync }) => ({
      id,
      device,
      location,
      batch,
      result,
      inspector,
      status,
      lastSync,
    }),
  );
}

function findInspectionDevice(deviceId: string): InspectionDeviceProfile | undefined {
  return inspectionDeviceProfiles.find((device) => device.id === deviceId);
}

/** 砂品监测 · 实时字段（按所选检测终端） */
export function buildInspectionDataFields(deviceId: string, tick = 0) {
  const device =
    findInspectionDevice(deviceId) ?? findInspectionDevice("IN03");
  if (!device) {
    return [];
  }

  const syncAt = padTime("10:34:48", tick);

  return [
    {
      label: "检测终端",
      value: `${device.device} · ${device.location}`,
      updatedAt: padTime("10:34:47", tick),
    },
    {
      label: "最近检测",
      value:
        device.batch === "—"
          ? "暂无检测记录"
          : `${device.batch} · ${device.result}`,
      updatedAt: padTime("10:34:45", tick),
    },
    {
      label: "粒度指标",
      value: device.granularity,
      updatedAt: padTime("10:34:45", tick),
    },
    {
      label: "湿度",
      value: device.humidity,
      updatedAt: padTime("10:34:45", tick),
    },
    {
      label: "检测员",
      value: device.inspector === "—" ? "未指派" : device.inspector,
      updatedAt: padTime("10:34:40", tick),
    },
    {
      label: "数据推送",
      value: `HTTP 上传 · ${device.device} · 最近 ${syncAt}`,
      updatedAt: syncAt,
    },
  ];
}

const baseLogTemplates: Omit<SyncLogItem, "id" | "time">[] = [
  { direction: "上行", dataType: "状态心跳", size: "0.8 KB", status: "成功" },
  { direction: "下行", dataType: "任务指令", size: "2.1 KB", status: "成功" },
  { direction: "上行", dataType: "作业进度", size: "5.6 KB", status: "成功" },
  { direction: "上行", dataType: "编排确认", size: "0.9 KB", status: "成功" },
  { direction: "下行", dataType: "参数同步", size: "1.4 KB", status: "成功" },
];

export function buildModuleSyncLogs(
  moduleKey: string,
  tick = 0,
  streamKey?: string,
): SyncLogItem[] {
  const now = padTime("10:35:12", tick);
  const defaultKey = getDefaultExchangeStreamKey(moduleKey);
  const activeKey = streamKey ?? defaultKey;

  let correlation = "—";

  if (moduleKey === "dispatch" && activeKey) {
    const plan = findDispatchPlan(activeKey);
    const task = plan ? resolveDispatchFocusTask(activeKey) : undefined;
    correlation = task
      ? `${task.planBatch ?? "—"} · ${task.dispatchId ?? "—"} · ${task.id}`
      : plan
        ? `${plan.batch} · ${plan.dispatchId} · 待编排`
        : "—";
  } else if (moduleKey === "loading" && activeKey) {
    const task = getOrchestrationTaskByOrderId(activeKey);
    correlation = `${task?.id ?? "—"} 进度 ${task?.progress ?? 0}%`;
  } else if (moduleKey === "processing" && activeKey) {
    const task = getOrchestrationTaskByOrderId(activeKey);
    correlation = `${task?.id ?? "—"} ${task?.status ?? "—"}`;
  } else if (moduleKey === "vehicle" && activeKey) {
    const device = findVehicleDevice(activeKey);
    correlation = device
      ? `${device.train} · ${device.host} · ${device.status}`
      : "—";
  } else if (moduleKey === "inspection" && activeKey) {
    const device = findInspectionDevice(activeKey);
    correlation = device
      ? `${device.device} · ${device.batch} · ${device.result}`
      : "—";
  }

  const head: SyncLogItem = {
    id: `L-PUSH-${tick}`,
    time: now,
    direction: "上行",
    dataType:
      moduleKey === "dispatch"
        ? "计划推送"
        : moduleKey === "vehicle"
          ? "车载字段推送"
          : moduleKey === "inspection"
            ? "检测字段推送"
            : "字段推送",
    size: "1.0 KB",
    status: "成功",
  };

  const body = baseLogTemplates.map((item, index) => ({
    id: `L${String(index + 1).padStart(3, "0")}`,
    time: padTime(`10:3${4 + (index % 2)}:${String(40 + index * 3).padStart(2, "0")}`, tick),
    ...item,
    dataType:
      index === 1 && moduleKey !== "dispatch"
        ? `${item.dataType} · ${correlation}`
        : index === 0 &&
            (moduleKey === "dispatch" ||
              moduleKey === "vehicle" ||
              moduleKey === "inspection")
          ? `${item.dataType} · ${correlation}`
          : item.dataType,
  }));

  return [head, ...body];
}

export type LiveExchangeSlice = Pick<
  ExchangeModuleConfig,
  "dataFields" | "lastSync" | "syncLogs"
> & {
  dispatchPlanPreview?: ReturnType<typeof buildDispatchPlanPreview>;
  planMetricValue?: number;
};

export function buildLiveExchangeSlice(
  moduleKey: string,
  tick = 0,
  streamKey?: string,
): LiveExchangeSlice | null {
  const activeKey = streamKey ?? getDefaultExchangeStreamKey(moduleKey);
  const lastSync = padTime("10:35:12", tick);

  if (moduleKey === "dispatch" && activeKey) {
    const plans = buildDispatchPlans();
    return {
      dataFields: buildDispatchDataFields(activeKey, tick),
      lastSync,
      syncLogs: buildModuleSyncLogs("dispatch", tick, activeKey),
      dispatchPlanPreview: buildDispatchPlanPreview(),
      planMetricValue: plans.length,
    };
  }

  if (moduleKey === "loading" && activeKey) {
    return {
      dataFields: buildLoadingDataFields(activeKey, tick),
      lastSync: padTime("10:34:55", tick),
      syncLogs: buildModuleSyncLogs("loading", tick, activeKey),
    };
  }

  if (moduleKey === "processing" && activeKey) {
    return {
      dataFields: buildProcessingDataFields(activeKey, tick),
      lastSync: padTime("10:35:00", tick),
      syncLogs: buildModuleSyncLogs("processing", tick, activeKey),
    };
  }

  if (moduleKey === "vehicle" && activeKey) {
    const device = findVehicleDevice(activeKey);
    return {
      dataFields: buildVehicleDataFields(activeKey, tick),
      lastSync: device?.lastSync ?? padTime("10:35:08", tick),
      syncLogs: buildModuleSyncLogs("vehicle", tick, activeKey),
    };
  }

  if (moduleKey === "inspection" && activeKey) {
    const device = findInspectionDevice(activeKey);
    return {
      dataFields: buildInspectionDataFields(activeKey, tick),
      lastSync: device?.lastSync ?? padTime("10:34:48", tick),
      syncLogs: buildModuleSyncLogs("inspection", tick, activeKey),
    };
  }

  return null;
}
