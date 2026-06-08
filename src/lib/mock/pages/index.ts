import type {
  AlertRecord,
  ChartBarItem,
  DeviceStatusItem,
  ExchangeModuleConfig,
  LogRecord,
  ModelInfo,
  OrchestrationTask,
  RuleItem,
  SyncLogItem,
  TrainJob,
  TrainingDataset,
  DeployRecord,
  PredictMonitorItem,
  PushRecordItem,
  UserRecord,
} from "@/lib/types/demo";

const baseLogs: SyncLogItem[] = [
  { id: "L001", time: "10:35:12", direction: "上行", dataType: "状态心跳", size: "0.8 KB", status: "成功" },
  { id: "L002", time: "10:34:58", direction: "下行", dataType: "任务指令", size: "2.1 KB", status: "成功" },
  { id: "L003", time: "10:34:40", direction: "上行", dataType: "作业进度", size: "5.6 KB", status: "成功" },
  { id: "L004", time: "10:33:22", direction: "上行", dataType: "检测数据", size: "12.3 KB", status: "重试" },
  { id: "L005", time: "10:32:05", direction: "下行", dataType: "参数同步", size: "1.4 KB", status: "成功" },
  { id: "L006", time: "10:31:48", direction: "上行", dataType: "撒砂采集", size: "3.2 KB", status: "成功" },
  { id: "L007", time: "10:31:20", direction: "上行", dataType: "设备状态", size: "1.1 KB", status: "成功" },
  { id: "L008", time: "10:30:55", direction: "下行", dataType: "编排确认", size: "0.9 KB", status: "成功" },
  { id: "L009", time: "10:30:12", direction: "上行", dataType: "模型推理", size: "4.5 KB", status: "成功" },
  { id: "L010", time: "10:29:40", direction: "上行", dataType: "告警上报", size: "0.6 KB", status: "成功" },
  { id: "L011", time: "10:29:05", direction: "下行", dataType: "大屏推送", size: "8.2 KB", status: "成功" },
  { id: "L012", time: "10:28:30", direction: "上行", dataType: "车地同步", size: "2.8 KB", status: "重试" },
];

export const exchangeModules: Record<string, ExchangeModuleConfig> = {
  dispatch: {
    moduleName: "调度中心",
    endpoint: "tcp://192.168.10.10:8801/dispatch",
    status: "online",
    latency: 45,
    lastSync: "10:35:12",
    metrics: [
      { key: "in", label: "今日接收", value: 1286, unit: "条", trend: "up", trendValue: "+12%" },
      { key: "out", label: "今日下发", value: 342, unit: "条", trend: "flat", trendValue: "—" },
      { key: "plan", label: "加砂计划", value: 18, unit: "批", trend: "up", trendValue: "+2" },
      { key: "err", label: "同步失败", value: 0, unit: "次", trend: "flat", trendValue: "—" },
    ],
    dataFields: [
      { label: "进站信息", value: "G101 · 10:28 进站 · 3道", updatedAt: "10:35:10" },
      { label: "道口信号", value: "X3 开放 · 进路锁闭", updatedAt: "10:35:08" },
      { label: "加砂计划", value: "批次 #20250529-03 · 待编排", updatedAt: "10:34:55" },
      { label: "列车编号", value: "CR400AF-101", updatedAt: "10:34:50" },
    ],
    syncLogs: baseLogs,
  },
  vehicle: {
    moduleName: "车载设备",
    endpoint: "mqtt://192.168.20.0:1883/vehicle",
    status: "online",
    latency: 82,
    lastSync: "10:35:08",
    metrics: [
      { key: "sand", label: "撒砂采集", value: 4520, unit: "条", trend: "up", trendValue: "+8%" },
      { key: "dump", label: "车地转储", value: 128, unit: "次", trend: "up", trendValue: "+5" },
      { key: "predict", label: "推理回传", value: 8640, unit: "次", trend: "flat", trendValue: "—" },
      { key: "model", label: "模型版本", value: "v2.3.1", trend: "flat", trendValue: "—" },
    ],
    dataFields: [
      { label: "当前车速", value: "86 km/h", updatedAt: "10:35:06" },
      { label: "砂箱余量", value: "62%", updatedAt: "10:35:06" },
      { label: "NPU 负载", value: "34%", updatedAt: "10:35:05" },
      { label: "运行图区段", value: "K128+400 ~ K130+200", updatedAt: "10:35:04" },
    ],
    syncLogs: baseLogs,
  },
  loading: {
    moduleName: "移动上砂装置",
    endpoint: "http://192.168.30.15:8080/api/loading",
    status: "warning",
    latency: 156,
    lastSync: "10:34:55",
    metrics: [
      { key: "task", label: "任务接收", value: 24, unit: "项", trend: "up", trendValue: "+3" },
      { key: "progress", label: "进度上报", value: 186, unit: "次", trend: "up", trendValue: "+15" },
      { key: "done", label: "完成上砂", value: 18, unit: "次", trend: "flat", trendValue: "—" },
      { key: "err", label: "异常上报", value: 1, unit: "次", trend: "down", trendValue: "-1" },
    ],
    dataFields: [
      {
        label: "设备状态",
        value: "4 台 · 2 作业中 · 1 补给中 · 1 异常",
        updatedAt: "10:34:52",
        units: [
          {
            id: "LU01",
            name: "3道上砂机-01",
            status: "作业中",
            detail: "正向上砂 · G101 · 72%",
            updatedAt: "10:34:52",
          },
          {
            id: "LU02",
            name: "2道上砂机-02",
            status: "待命",
            detail: "待触发 · 无关联任务",
            updatedAt: "10:34:50",
          },
          {
            id: "LU03",
            name: "1道上砂机-03",
            status: "补给中",
            detail: "移动上砂补给 · 余量 38%",
            updatedAt: "10:34:48",
          },
          {
            id: "LU04",
            name: "4道上砂机-04",
            status: "异常",
            detail: "进度上报超时 · 待排查",
            updatedAt: "10:33:20",
          },
        ],
      },
      { label: "当前任务", value: "O001 · SD01 · G101 3道", updatedAt: "10:34:50" },
      { label: "作业进度", value: "72%", updatedAt: "10:34:48" },
      { label: "车地同步", value: "已对齐 · 延迟 120ms", updatedAt: "10:34:45" },
    ],
    syncLogs: baseLogs,
  },
  processing: {
    moduleName: "智能砂处理装置",
    endpoint: "http://192.168.30.20:8080/api/processing",
    status: "online",
    latency: 68,
    lastSync: "10:35:00",
    metrics: [
      { key: "task", label: "任务接收", value: 15, unit: "项", trend: "up", trendValue: "+2" },
      { key: "stock", label: "砂仓存量", value: 78, unit: "%", trend: "down", trendValue: "-5%" },
      { key: "tank", label: "储砂罐", value: 65, unit: "%", trend: "flat", trendValue: "—" },
      { key: "auto", label: "全自动运行", value: "是", trend: "flat", trendValue: "—" },
    ],
    dataFields: [
      { label: "处理模式", value: "全自动 · 批次 #029", updatedAt: "10:34:58" },
      { label: "砂仓 A", value: "820 kg / 1050 kg", updatedAt: "10:34:55" },
      { label: "储砂罐 B", value: "650 kg / 1000 kg", updatedAt: "10:34:55" },
      { label: "当前任务", value: "O002 · SD02 · 待处理", updatedAt: "10:34:40" },
    ],
    syncLogs: baseLogs,
  },
  inspection: {
    moduleName: "便携式砂品监测装置",
    endpoint: "http://192.168.30.25:8080/api/inspection",
    status: "online",
    latency: 52,
    lastSync: "10:34:48",
    metrics: [
      { key: "sample", label: "今日抽检", value: 36, unit: "次", trend: "up", trendValue: "+4" },
      { key: "pass", label: "合格率", value: 97.2, unit: "%", trend: "up", trendValue: "+0.5%" },
      { key: "upload", label: "数据上传", value: 36, unit: "条", trend: "flat", trendValue: "—" },
      { key: "fail", label: "上传失败", value: 0, unit: "次", trend: "flat", trendValue: "—" },
    ],
    dataFields: [
      { label: "最近检测", value: "批次 #029 · 合格", updatedAt: "10:34:45" },
      { label: "粒度指标", value: "0.8mm ±0.05", updatedAt: "10:34:45" },
      { label: "湿度", value: "3.2%", updatedAt: "10:34:45" },
      { label: "检测员", value: "张工 · 移动端", updatedAt: "10:34:40" },
    ],
    syncLogs: baseLogs,
  },
  screen: {
    moduleName: "中心大屏",
    endpoint: "ws://192.168.10.50:9000/screen/push",
    status: "online",
    latency: 35,
    lastSync: "10:35:12",
    metrics: [
      { key: "push", label: "今日推送", value: 8640, unit: "次", trend: "flat", trendValue: "—" },
      { key: "delay", label: "平均延迟", value: 120, unit: "ms", trend: "down", trendValue: "-8ms" },
      { key: "layout", label: "布局版本", value: "v3.2", trend: "flat", trendValue: "—" },
      { key: "kpi", label: "KPI 指标数", value: 12, unit: "项", trend: "flat", trendValue: "—" },
    ],
    dataFields: [
      { label: "推送通道", value: "WebSocket · 已连接", updatedAt: "10:35:12" },
      { label: "展示模块", value: "设备状态 / 作业进度 / KPI", updatedAt: "10:35:10" },
      { label: "刷新频率", value: "2 秒/次", updatedAt: "10:35:10" },
      { label: "大屏分辨率", value: "3840 × 2160", updatedAt: "—" },
    ],
    syncLogs: baseLogs,
  },
  mobile: {
    moduleName: "移动设备",
    endpoint: "https://192.168.10.60:8443/mobile",
    status: "online",
    latency: 95,
    lastSync: "10:34:58",
    metrics: [
      { key: "online", label: "在线终端", value: 8, unit: "台", trend: "flat", trendValue: "—" },
      { key: "cmd", label: "指令下发", value: 56, unit: "次", trend: "up", trendValue: "+6" },
      { key: "view", label: "数据浏览", value: 234, unit: "次", trend: "up", trendValue: "+18" },
      { key: "deny", label: "权限拒绝", value: 2, unit: "次", trend: "down", trendValue: "-1" },
    ],
    dataFields: [
      { label: "岗位策略", value: "调度员 / 设备员 / 检测员", updatedAt: "10:34:55" },
      { label: "简版指标", value: "任务 · 告警 · 设备摘要", updatedAt: "10:34:55" },
      { label: "可操作部件", value: "按角色隔离", updatedAt: "—" },
      { label: "最近指令", value: "确认告警 A001", updatedAt: "10:34:50" },
    ],
    syncLogs: baseLogs,
  },
};

/** 砂数据全生命周期 §5.2–5.4：子系统接口对接，中台只接收汇聚数据 */
export const lifecycleInterfaces: Record<string, ExchangeModuleConfig> = {
  procurement: {
    moduleName: "采购验收子系统",
    endpoint: "http://192.168.40.10:8080/api/procurement",
    status: "online",
    latency: 58,
    lastSync: "10:34:40",
    metrics: [
      { key: "in", label: "今日接收", value: 86, unit: "条", trend: "up", trendValue: "+6" },
      { key: "order", label: "采购订单", value: 12, unit: "单", trend: "flat", trendValue: "—" },
      { key: "accept", label: "验收记录", value: 10, unit: "单", trend: "up", trendValue: "+2" },
      { key: "err", label: "同步失败", value: 0, unit: "次", trend: "flat", trendValue: "—" },
    ],
    dataFields: [
      { label: "对接方式", value: "REST · 定时拉取 + 推送", updatedAt: "—" },
      { label: "最近采购单", value: "PO-202505-022", updatedAt: "10:34:38" },
      { label: "最近验收", value: "合格 · 中原材料 30吨", updatedAt: "10:34:35" },
      { label: "数据归属", value: "§5.2 采购与验收 · 只读汇聚", updatedAt: "—" },
    ],
    syncLogs: baseLogs,
  },
  warehouse: {
    moduleName: "仓储转运子系统",
    endpoint: "http://192.168.40.20:8080/api/warehouse",
    status: "online",
    latency: 62,
    lastSync: "10:35:05",
    metrics: [
      { key: "in", label: "今日接收", value: 142, unit: "条", trend: "up", trendValue: "+8" },
      { key: "stock", label: "库存变动", value: 28, unit: "次", trend: "flat", trendValue: "—" },
      { key: "transit", label: "转运批次", value: 6, unit: "批", trend: "up", trendValue: "+1" },
      { key: "err", label: "同步失败", value: 0, unit: "次", trend: "flat", trendValue: "—" },
    ],
    dataFields: [
      { label: "对接方式", value: "REST · 事件订阅", updatedAt: "—" },
      { label: "总库存", value: "1120 袋 · 3 个库位", updatedAt: "10:35:02" },
      { label: "在途转运", value: "B-202505-022 → 2号仓", updatedAt: "10:34:55" },
      { label: "数据归属", value: "§5.3 仓储与转运 · 只读汇聚", updatedAt: "—" },
    ],
    syncLogs: baseLogs,
  },
  supply: {
    moduleName: "移动上砂补给子系统",
    endpoint: "http://192.168.30.15:8080/api/supply",
    status: "online",
    latency: 72,
    lastSync: "10:34:50",
    metrics: [
      { key: "in", label: "今日接收", value: 64, unit: "条", trend: "up", trendValue: "+4" },
      { key: "plan", label: "补给计划", value: 8, unit: "项", trend: "flat", trendValue: "—" },
      { key: "exec", label: "执行回传", value: 6, unit: "项", trend: "up", trendValue: "+1" },
      { key: "err", label: "同步失败", value: 0, unit: "次", trend: "flat", trendValue: "—" },
    ],
    dataFields: [
      { label: "对接方式", value: "REST · 关联移动上砂装置", updatedAt: "—" },
      { label: "关联装置", value: "移动上砂装置-01 / -02", updatedAt: "10:34:48" },
      { label: "进行中补给", value: "G101 · 120袋", updatedAt: "10:34:45" },
      { label: "数据归属", value: "§5.4 移动上砂补给 · 只读汇聚", updatedAt: "—" },
    ],
    syncLogs: baseLogs,
  },
};

export const interfaceMonitor = [
  { id: "IF01", module: "调度中心", tier: "核心业务", endpoint: "/api/v1/dispatch", health: "正常", qps: 12, errors: 0 },
  { id: "IF02", module: "车载设备", tier: "核心业务", endpoint: "/mqtt/vehicle/#", health: "正常", qps: 86, errors: 0 },
  { id: "IF03", module: "移动上砂装置", tier: "核心业务", endpoint: "/api/v1/loading", health: "异常", qps: 8, errors: 1 },
  { id: "IF04", module: "智能砂处理装置", tier: "核心业务", endpoint: "/api/v1/processing", health: "正常", qps: 6, errors: 0 },
  { id: "IF05", module: "砂品监测装置", tier: "检测辅助", endpoint: "/api/v1/inspection", health: "正常", qps: 4, errors: 0 },
  { id: "IF06", module: "中心大屏", tier: "展示终端", endpoint: "/ws/screen", health: "正常", qps: 120, errors: 0 },
  { id: "IF07", module: "移动设备", tier: "展示终端", endpoint: "/api/v1/mobile", health: "正常", qps: 18, errors: 0 },
];

export {
  getDefaultIssueTask,
  getOrchestrationTaskByDispatchId,
  getOrchestrationTasksByType,
  getPendingSmartDispatchList,
  orchestrationTasks,
  smartDispatchPlans,
} from "@/lib/mock/orchestrationTasks";

export const orchestrationRules: RuleItem[] = [
  { id: "R01", name: "加砂计划触发上砂", condition: "调度中心推送加砂计划", action: "生成上砂平台工单（待处理）", enabled: true, priority: 1 },
  { id: "R02", name: "砂仓低存量触发处理", condition: "砂仓存量 < 30%", action: "生成砂处理平台工单（待处理）", enabled: true, priority: 2 },
  { id: "R03", name: "上砂开始车地同步", condition: "平台工单状态=处理中", action: "启用车地信息同步链路", enabled: true, priority: 1 },
  { id: "R04", name: "检测完成数据推送", condition: "砂品检测上传成功", action: "推送大屏 + 归档", enabled: true, priority: 3 },
  { id: "R05", name: "异常告警联动", condition: "告警等级=高", action: "暂停任务下发 + 通知调度", enabled: false, priority: 1 },
];

export const deviceStatusList: DeviceStatusItem[] = [
  { id: "D01", name: "移动上砂装置-01", module: "移动上砂装置", status: "warning", param: "作业进度", value: "72%", updatedAt: "10:35" },
  { id: "D02", name: "砂处理装置-A", module: "智能砂处理装置", status: "online", param: "运行模式", value: "全自动", updatedAt: "10:35" },
  { id: "D03", name: "车载主机-101", module: "车载设备", status: "online", param: "NPU", value: "34%", updatedAt: "10:35" },
  { id: "D04", name: "监测终端-03", module: "砂品监测装置", status: "online", param: "状态", value: "待机", updatedAt: "10:34" },
  { id: "D05", name: "调度接口服务", module: "调度中心", status: "online", param: "连接", value: "正常", updatedAt: "10:35" },
  { id: "D06", name: "大屏推送服务", module: "中心大屏", status: "online", param: "延迟", value: "120ms", updatedAt: "10:35" },
];

export const kpiItems: ChartBarItem[] = [
  { label: "上砂完成率", value: 92, max: 100 },
  { label: "砂处理效率", value: 88, max: 100 },
  { label: "检测合格率", value: 97, max: 100 },
  { label: "任务准时率", value: 95, max: 100 },
  { label: "大屏同步成功率", value: 99, max: 100 },
];

export const statsChart: ChartBarItem[] = [
  { label: "撒砂作业", value: 4520 },
  { label: "上砂作业", value: 1286 },
  { label: "砂处理", value: 864 },
  { label: "检测记录", value: 360 },
  { label: "告警事件", value: 42 },
];

export const vehicleSyncSessions = [
  { id: "S001", train: "G101", loadingDevice: "上砂装置-01", status: "同步中", latency: 120, startTime: "10:28", packets: 1286 },
  { id: "S002", train: "G205", loadingDevice: "上砂装置-02", status: "已完成", latency: 95, startTime: "09:45", packets: 980 },
  { id: "S003", train: "D308", loadingDevice: "上砂装置-01", status: "等待", latency: 0, startTime: "—", packets: 0 },
];

export const aggregatePipelines = [
  { id: "P001", name: "车载撒砂 → 样本池", source: "车载设备", target: "训练样本池", records: 4520, status: "运行中" },
  { id: "P002", name: "检测数据 → 大屏", source: "砂品监测", target: "中心大屏", records: 360, status: "运行中" },
  { id: "P003", name: "调度计划 → 编排", source: "调度中心", target: "任务编排", records: 128, status: "运行中" },
  { id: "P004", name: "设备状态 → 展示", source: "各模块", target: "数据展示", records: 8640, status: "运行中" },
];

export const processRules: RuleItem[] = [
  { id: "PR01", name: "撒砂数据格式转换", condition: "来源=车载设备", action: "JSON → 标准 Schema", enabled: true, priority: 1 },
  { id: "PR02", name: "异常值过滤", condition: "砂量 < 0 或 > 阈值", action: "标记异常并隔离", enabled: true, priority: 2 },
  { id: "PR03", name: "检测数据字段映射", condition: "来源=砂品监测", action: "映射至统一检测模型", enabled: true, priority: 1 },
  {
    id: "PR04",
    name: "训练样本按场景分桶",
    condition: "场景∈{上坡/隧道/雨雪/迟撒/空转…}",
    action: "路由至四大 modelType 样本池",
    enabled: true,
    priority: 1,
  },
];

export const reports = [
  { id: "RP01", name: "日作业汇总", period: "2025-05-29", type: "作业", status: "已生成", size: "2.4 MB" },
  { id: "RP02", name: "周 KPI 分析", period: "2025-W22", type: "KPI", status: "已生成", size: "1.8 MB" },
  { id: "RP03", name: "班组操作评价", period: "2025-05", type: "模型", status: "生成中", size: "—" },
];

export const trainingDatasets: TrainingDataset[] = [
  {
    id: "DS01",
    name: "撒砂样本集 v2.3",
    modelType: "按图行车",
    samples: 128000,
    labeled: "100%",
    version: "v2.3",
    updatedAt: "2025-05-28",
  },
  {
    id: "DS02",
    name: "极端工况样本",
    modelType: "极端工况",
    samples: 45000,
    labeled: "100%",
    version: "v1.8",
    updatedAt: "2025-05-25",
  },
  {
    id: "DS03",
    name: "操作评价样本",
    modelType: "操作评价",
    samples: 86000,
    labeled: "100%",
    version: "v2.1",
    updatedAt: "2025-05-27",
  },
  {
    id: "DS04",
    name: "自动纠正样本",
    modelType: "自动纠正",
    samples: 52000,
    labeled: "100%",
    version: "v1.5",
    updatedAt: "2025-05-26",
  },
];

export const models: ModelInfo[] = [
  { key: "diagram", name: "按图行车", version: "v2.3.1", status: "运行中", accuracy: "94.2%", deployTarget: "车载 NPU" },
  { key: "extreme", name: "极端工况", version: "v1.8.0", status: "运行中", accuracy: "91.5%", deployTarget: "车载 NPU" },
  { key: "evaluation", name: "操作评价", version: "v2.1.0", status: "运行中", accuracy: "96.8%", deployTarget: "云端 + 车端" },
  { key: "correction", name: "自动纠正", version: "v1.5.2", status: "运行中", accuracy: "SIL4", deployTarget: "车载 NPU" },
];

export const deployRecords: DeployRecord[] = [
  { id: "DEP01", model: "按图行车 v2.3.1", target: "车载-101", method: "FTP 热更新", time: "2025-05-28 14:30", status: "成功" },
  { id: "DEP02", model: "极端工况 v1.8.0", target: "车载-101", method: "FTP 热更新", time: "2025-05-27 09:15", status: "成功" },
  { id: "DEP03", model: "按图行车 v2.3.2", target: "车载-205", method: "FTP 热更新", time: "2025-05-29 08:00", status: "进行中" },
];

export const trainJobs: TrainJob[] = [
  {
    id: "TR01",
    model: "按图行车",
    dataset: "撒砂样本集 v2.3",
    progress: 78,
    epoch: "42/54",
    status: "训练中",
  },
  {
    id: "TR02",
    model: "操作评价",
    dataset: "操作评价样本",
    progress: 100,
    epoch: "30/30",
    status: "已完成",
    outputVersion: "v2.1.0",
    packageName: "evaluation_v2.1.0.onnx",
  },
  {
    id: "TR03",
    model: "极端工况",
    dataset: "极端工况样本",
    progress: 0,
    epoch: "0/48",
    status: "排队中",
  },
];

export const predictMonitor: PredictMonitorItem[] = [
  { id: "PV01", train: "G101", model: "按图行车", inferenceMs: 12, suggestion: "K129+200 撒砂 3.2s", status: "正常", deployedVersion: "v2.3.1" },
  { id: "PV02", train: "G101", model: "极端工况", inferenceMs: 8, suggestion: "隧道场景 · 精量点砂", status: "正常", deployedVersion: "v1.8.0" },
  { id: "PV03", train: "G101", model: "自动纠正", inferenceMs: 5, suggestion: "影子控制 · 无阻断", status: "正常", deployedVersion: "v1.5.2" },
  { id: "PV04", train: "G205", model: "操作评价", inferenceMs: 28, suggestion: "司机操作合规比对", status: "正常", deployedVersion: "v2.1.0" },
];

export const evaluateRecords = [
  { id: "EV01", driver: "李师傅", train: "G101", late: 2, early: 1, missing: 0, over: 0, score: 92 },
  { id: "EV02", driver: "王师傅", train: "G205", late: 0, early: 0, missing: 1, over: 1, score: 88 },
  { id: "EV03", driver: "张师傅", train: "D308", late: 1, early: 2, missing: 0, over: 0, score: 90 },
];

export const alertRecords: AlertRecord[] = [
  { id: "A001", level: "high", title: "移动上砂装置作业进度滞后", source: "移动上砂装置", time: "10:15", status: "未处理", guide: "检查车地同步链路，确认上砂任务参数" },
  { id: "A002", level: "medium", title: "智能砂处理装置砂仓存量偏低", source: "智能砂处理装置", time: "09:42", status: "处理中", guide: "下发砂处理任务或人工补砂" },
  { id: "A003", level: "low", title: "车载设备通信延迟偏高", source: "车载设备", time: "09:10", status: "未处理", guide: "检查 MQTT 连接与网络质量" },
  { id: "A004", level: "medium", title: "检测数据上传重试", source: "砂品监测装置", time: "08:55", status: "已关闭", guide: "已自动重传成功" },
];

export const alertRules: import("@/lib/types/demo").AlertRuleItem[] = [
  {
    id: "AR01",
    name: "高等级告警通知调度",
    condition: "告警等级=高",
    conditionMetric: "alert_level",
    conditionOperator: "eq",
    conditionValue: "high",
    action: "推送调度中心 + 移动设备",
    enabled: true,
    priority: 1,
    scopeZone: "all",
    scopeModule: "all",
    scopeDevice: "all",
  },
  {
    id: "AR02",
    name: "存量低触发砂处理",
    condition: "砂仓存量 < 30%",
    conditionMetric: "sand_stock",
    conditionOperator: "lt",
    conditionValue: "30",
    action: "生成砂处理任务",
    enabled: true,
    priority: 2,
    scopeZone: "hub",
    scopeModule: "智能砂处理装置",
    scopeDevice: "D02",
  },
  {
    id: "AR03",
    name: "接口异常联动",
    condition: "接口健康=异常",
    conditionMetric: "interface_health",
    conditionOperator: "eq",
    conditionValue: "abnormal",
    action: "暂停相关任务下发",
    enabled: true,
    priority: 1,
    scopeZone: "all",
    scopeModule: "模块对接",
    scopeDevice: "all",
  },
];

export const alertConfig: import("@/lib/types/demo").AlertThresholdConfig[] = [
  {
    level: "高",
    threshold: "作业停滞 > 5min",
    notify: "调度员、设备员",
    channel: "大屏 + 移动端",
    scopeZone: "all",
    scopeModule: "移动上砂装置",
    condition: { metric: "job_stall", operator: "gt", value: "5" },
  },
  {
    level: "中",
    threshold: "砂仓存量 < 30% 或 同步延迟 > 200ms",
    notify: "设备员",
    channel: "移动端",
    scopeZone: "G101",
    scopeModule: "智能砂处理装置",
    condition: { metric: "sand_stock", operator: "lt", value: "30" },
    conditionLogic: "or",
    condition2: { metric: "sync_latency", operator: "gt", value: "200" },
  },
  {
    level: "低",
    threshold: "通信状态=非阻塞异常",
    notify: "系统管理员",
    channel: "系统日志",
    scopeZone: "all",
    scopeModule: "车载设备",
    condition: {
      metric: "comm_status",
      operator: "eq",
      value: "non_blocking",
    },
  },
];

export const archivePolicies = [
  { id: "AR01", name: "撒砂原始数据", retention: "180 天", storage: "对象存储", used: "128 GB", status: "正常" },
  { id: "AR02", name: "作业任务记录", retention: "365 天", storage: "时序库", used: "45 GB", status: "正常" },
  { id: "AR03", name: "检测与模型数据", retention: "730 天", storage: "对象存储", used: "86 GB", status: "正常" },
];

export const exportJobs = [
  { id: "EX01", name: "5月作业报表", format: "Excel", range: "2025-05-01 ~ 2025-05-29", status: "已完成", time: "10:20" },
  { id: "EX02", name: "告警追溯包", format: "ZIP", range: "近 7 天", status: "进行中", time: "10:32" },
];

export const traceRecords = [
  { id: "TR001", train: "G101", batch: "#029", stage: "调度计划", time: "10:28", data: "加砂计划已接收" },
  { id: "TR002", train: "G101", batch: "#029", stage: "任务编排", time: "10:29", data: "上砂任务 O001 生成" },
  { id: "TR003", train: "G101", batch: "#029", stage: "上砂作业", time: "10:30", data: "进度 72%" },
  { id: "TR004", train: "G101", batch: "#029", stage: "砂品检测", time: "10:25", data: "抽检合格" },
];

export const users: UserRecord[] = [
  { id: "U001", name: "调度员", role: "调度员", department: "运调中心", status: "启用", lastLogin: "2025-05-29 08:30" },
  { id: "U002", name: "设备员", role: "设备维护", department: "设备科", status: "启用", lastLogin: "2025-05-29 09:15" },
  { id: "U003", name: "检测员", role: "砂品检测", department: "质检科", status: "启用", lastLogin: "2025-05-28 16:40" },
  { id: "U004", name: "系统管理员", role: "管理员", department: "信息科", status: "启用", lastLogin: "2025-05-29 07:50" },
];

export const roles = [
  {
    id: "RL01",
    name: "调度员",
    menuPermissions: ["工作台", "调度中心", "运行监测", "预警中心"],
    dataScope: "全线路",
    operatePermissions: ["任务下发", "告警确认"],
  },
  {
    id: "RL02",
    name: "设备维护",
    menuPermissions: ["模块对接", "分析中心", "模型中心", "系统管理"],
    dataScope: "设备数据",
    operatePermissions: ["参数配置", "接口管理"],
  },
  {
    id: "RL03",
    name: "砂品检测",
    menuPermissions: ["模块对接", "分析中心", "模型中心"],
    dataScope: "检测数据",
    operatePermissions: ["检测数据查看"],
  },
  {
    id: "RL04",
    name: "管理员",
    menuPermissions: [
      "工作台",
      "调度中心",
      "运行监测",
      "模块对接",
      "分析中心",
      "模型中心",
      "预警中心",
      "数据存储",
      "系统管理",
    ],
    dataScope: "全部",
    operatePermissions: [
      "任务下发",
      "告警确认",
      "规则配置",
      "参数配置",
      "接口管理",
      "检测数据查看",
      "数据导出",
      "用户管理",
    ],
  },
];

export const mobilePermissions = [
  {
    id: "MP01",
    role: "调度员",
    viewItems: ["任务", "告警", "KPI 摘要"],
    commandItems: ["告警确认", "任务审批"],
    devices: "全部移动终端",
  },
  {
    id: "MP02",
    role: "设备员",
    viewItems: ["设备状态", "接口健康"],
    commandItems: ["参数微调", "重启服务"],
    devices: "授权终端",
  },
  {
    id: "MP03",
    role: "检测员",
    viewItems: ["检测记录", "合格率"],
    commandItems: [],
    devices: "检测专用终端",
  },
];

export const systemParams = [
  { key: "sync.interval", label: "大屏推送间隔", value: "2000", unit: "ms" },
  { key: "alert.high.timeout", label: "高等级告警超时", value: "300", unit: "s" },
  { key: "ftp.host", label: "模型 FTP 地址", value: "192.168.20.100", unit: "" },
  { key: "orchestration.auto", label: "自动编排", value: "true", unit: "" },
  { key: "loading.auto.dispatch", label: "上砂自动下发", value: "false", unit: "" },
  { key: "processing.auto.dispatch", label: "砂处理自动下发", value: "false", unit: "" },
];

export const apiKeys = [
  { id: "AK01", name: "调度中心接入", key: "sk-disp-****8f2a", scope: "exchange/dispatch", expires: "2026-05-29" },
  { id: "AK02", name: "大屏推送", key: "sk-scrn-****3b1c", scope: "exchange/screen", expires: "2026-03-15" },
];

export const systemLogs: LogRecord[] = [
  { id: "LG001", time: "10:35:12", operator: "调度员", module: "任务编排", action: "下发上砂任务 T001", result: "成功" },
  { id: "LG002", time: "10:34:50", operator: "系统", module: "数据交互", action: "车载数据汇聚", result: "成功" },
  { id: "LG003", time: "10:33:22", operator: "设备员", module: "模型部署", action: "FTP 热更新 v2.3.2", result: "成功" },
  { id: "LG004", time: "10:32:05", operator: "检测员", module: "砂品监测", action: "上传检测数据", result: "成功" },
];

export const maintenanceItems = [
  { name: "数据库备份", lastRun: "2025-05-29 02:00", nextRun: "2025-05-30 02:00", status: "正常" },
  { name: "接口健康巡检", lastRun: "2025-05-29 10:00", nextRun: "2025-05-29 11:00", status: "正常" },
  { name: "系统版本", lastRun: "v2.0.0", nextRun: "—", status: "当前版本" },
];

export const quickActions = [
  { label: "调度中心对接", path: "/exchange/dispatch", desc: "上游计划与信号接入" },
  { label: "系统智能调度", path: "/orchestration/smart-dispatch", desc: "多计划排队与资源分配" },
  { label: "调度总览", path: "/orchestration/overview", desc: "编排工单并行看板" },
  { label: "上砂任务下发", path: "/orchestration/loading-task", desc: "向移动上砂装置下发任务" },
  { label: "砂处理任务下发", path: "/orchestration/processing-task", desc: "向智能砂处理装置下发任务" },
  { label: "全流程管控", path: "/orchestration/full-flow", desc: "计划→下发→执行→闭环" },
  { label: "大屏推送配置", path: "/exchange/screen", desc: "Web 配置并推送至中心大屏" },
  { label: "告警处置", path: "/alert/disposal", desc: "处理未闭环告警" },
  { label: "接口监控", path: "/exchange/monitor", desc: "各模块通道健康度" },
];

export const pushConfigs = {
  screen: {
    title: "中心大屏",
    endpoint: "ws://192.168.10.50:9000/screen/push",
    pushInterval: "2000 ms",
    layout: "v3.2",
    widgets: ["设备状态", "作业进度", "KPI 指标", "告警摘要"],
    presetWidgets: ["模型监控", "砂处理进度", "故障摘要", "列车运行图", "砂数据概览"],
    lastPush: "10:35:12",
    status: "online" as const,
    pushRecords: [
      {
        id: "SP001",
        time: "10:35:12",
        widgets: "设备状态 · 作业进度 · KPI 指标 · 告警摘要",
        layout: "v3.2",
        size: "8.2 KB",
        latency: "118 ms",
        status: "成功",
      },
      {
        id: "SP002",
        time: "10:35:10",
        widgets: "设备状态 · 作业进度 · KPI 指标 · 告警摘要",
        layout: "v3.2",
        size: "8.1 KB",
        latency: "125 ms",
        status: "成功",
      },
      {
        id: "SP003",
        time: "10:35:08",
        widgets: "设备状态 · 作业进度 · KPI 指标",
        layout: "v3.2",
        size: "6.4 KB",
        latency: "132 ms",
        status: "成功",
      },
      {
        id: "SP004",
        time: "10:34:55",
        widgets: "布局配置 · 设备状态 · 作业进度",
        layout: "v3.2",
        size: "12.6 KB",
        latency: "156 ms",
        status: "成功",
      },
      {
        id: "SP005",
        time: "10:34:22",
        widgets: "KPI 指标 · 告警摘要",
        layout: "v3.1",
        size: "3.8 KB",
        latency: "98 ms",
        status: "成功",
      },
      {
        id: "SP006",
        time: "10:33:48",
        widgets: "设备状态 · 作业进度 · KPI 指标 · 告警摘要",
        layout: "v3.1",
        size: "8.0 KB",
        latency: "210 ms",
        status: "重试",
      },
      {
        id: "SP007",
        time: "10:32:10",
        widgets: "模型监控 · 故障摘要",
        layout: "v3.1",
        size: "5.2 KB",
        latency: "—",
        status: "失败",
      },
    ] satisfies PushRecordItem[],
  },
  mobile: {
    title: "移动终端",
    endpoint: "https://192.168.10.60:8443/mobile/push",
    pushInterval: "5000 ms",
    layout: "简版 v2.1",
    widgets: ["任务摘要", "告警提醒", "设备状态", "指令待办"],
    presetWidgets: ["作业进度", "KPI 简报", "联动待办", "砂品检测", "值乘预警"],
    lastPush: "10:34:58",
    status: "online" as const,
    pushRecords: [
      {
        id: "MP001",
        time: "10:34:58",
        widgets: "任务摘要 · 告警提醒 · 设备状态 · 指令待办",
        layout: "简版 v2.1",
        size: "2.4 KB",
        latency: "86 ms",
        status: "成功",
      },
      {
        id: "MP002",
        time: "10:34:53",
        widgets: "任务摘要 · 告警提醒 · 设备状态 · 指令待办",
        layout: "简版 v2.1",
        size: "2.3 KB",
        latency: "92 ms",
        status: "成功",
      },
      {
        id: "MP003",
        time: "10:34:40",
        widgets: "告警提醒 · 指令待办",
        layout: "简版 v2.1",
        size: "1.1 KB",
        latency: "78 ms",
        status: "成功",
      },
      {
        id: "MP004",
        time: "10:34:12",
        widgets: "岗位策略 · 任务摘要 · 设备状态",
        layout: "简版 v2.1",
        size: "3.6 KB",
        latency: "105 ms",
        status: "成功",
      },
      {
        id: "MP005",
        time: "10:33:25",
        widgets: "指令模板 · 联动待办",
        layout: "简版 v2.0",
        size: "1.8 KB",
        latency: "112 ms",
        status: "成功",
      },
      {
        id: "MP006",
        time: "10:32:50",
        widgets: "任务摘要 · 告警提醒 · 设备状态 · 指令待办",
        layout: "简版 v2.0",
        size: "2.2 KB",
        latency: "240 ms",
        status: "重试",
      },
    ] satisfies PushRecordItem[],
  },
};

export const faultRecords = [
  { id: "F001", device: "移动上砂装置-01", code: "E-1024", desc: "作业进度超时", level: "中", time: "10:15", status: "处理中", rootCause: "车地同步延迟" },
  { id: "F002", device: "车载主机-101", code: "E-2048", desc: "MQTT 通信抖动", level: "低", time: "09:10", status: "已恢复", rootCause: "网络拥塞" },
  { id: "F003", device: "砂处理装置-A", code: "E-512", desc: "砂仓传感器异常", level: "高", time: "08:42", status: "已闭环", rootCause: "传感器校准偏差" },
];

export const deviceLedger = [
  { id: "LD001", name: "移动上砂装置-01", type: "上砂设备", vendor: "XX机电", installDate: "2024-03-15", maintainCycle: "90天", lastMaintain: "2025-04-20", status: "运行中" },
  { id: "LD002", name: "智能砂处理装置-A", type: "砂处理", vendor: "YY智能", installDate: "2024-01-10", maintainCycle: "60天", lastMaintain: "2025-05-01", status: "运行中" },
  { id: "LD003", name: "车载主机-101", type: "车载边缘", vendor: "ZZ科技", installDate: "2023-11-08", maintainCycle: "180天", lastMaintain: "2025-03-12", status: "运行中" },
  { id: "LD004", name: "便携式监测终端-03", type: "检测设备", vendor: "AA仪器", installDate: "2024-06-01", maintainCycle: "365天", lastMaintain: "2025-01-15", status: "待机" },
];

export const fullFlowStages = [
  { stage: "调度计划接收", module: "调度中心", status: "已完成", time: "10:28", detail: "加砂计划 DP03 · #20250529-03" },
  { stage: "任务智能编排", module: "系统控制中心", status: "已完成", time: "10:29", detail: "智能调度 SD01 → 平台工单 O001（待处理→处理中）" },
  { stage: "调度中心任务下发", module: "调度中心", status: "已完成", time: "10:30", detail: "O001 已由调度中心下发至移动上砂装置" },
  { stage: "车地信息同步", module: "车载+上砂", status: "处理中", time: "10:31", detail: "延迟 120ms · 工单处理中" },
  { stage: "上砂作业执行", module: "移动上砂装置", status: "处理中", time: "10:32", detail: "进度 72% · 等待回传" },
  { stage: "处理结果回传", module: "移动上砂装置", status: "待执行", time: "—", detail: "完成后回传平台，工单变已处理" },
  { stage: "平台闭环归档", module: "系统控制中心", status: "待执行", time: "—", detail: "参考 O007 已处理样例" },
];

export const linkageRules: RuleItem[] = [
  { id: "LK01", name: "高等级告警暂停下发", condition: "告警等级=高", action: "暂停任务下发 + 通知调度", enabled: true, priority: 1 },
  { id: "LK02", name: "车地失步中止上砂", condition: "同步延迟>500ms", action: "暂停上砂 + 触发告警", enabled: true, priority: 1 },
  { id: "LK03", name: "存量低联动砂处理", condition: "砂仓<30%", action: "自动生成砂处理任务", enabled: true, priority: 2 },
  { id: "LK04", name: "检测不合格阻断补给", condition: "抽检不合格", action: "阻断补给编排 + 通知质检", enabled: true, priority: 1 },
];

export const vehicleVolumeChart: ChartBarItem[] = [
  { label: "撒砂次数", value: 4520 },
  { label: "空转预警", value: 12 },
  { label: "异常数据", value: 8 },
];

/** @deprecated 混合量纲，请用 vehicleVolumeChart + AnalysisQualityPanel */
export const vehicleAnalysisChart: ChartBarItem[] = [
  { label: "撒砂次数", value: 4520, max: 5000 },
  { label: "平均撒砂量", value: 3.2, max: 10 },
  { label: "空转预警", value: 12, max: 20 },
  { label: "模型建议采纳率", value: 94, max: 100 },
  { label: "异常数据", value: 8, max: 20 },
];

export const sandSuppliers = [
  { id: "SP01", name: "华北砂业", level: "A级", cert: "已准入", contact: "李经理", updatedAt: "2025-05-20" },
  { id: "SP02", name: "中原材料", level: "B级", cert: "已准入", contact: "王经理", updatedAt: "2025-04-15" },
  { id: "SP03", name: "西部供应", level: "—", cert: "审核中", contact: "张经理", updatedAt: "2025-05-28" },
];

export const sandProcurements = [
  {
    id: "PC01",
    order: "PO-202505-018",
    batch: "B-202505-018",
    supplier: "华北砂业",
    handler: "张明 · 采购科",
    qty: "50吨",
    accept: "合格",
    date: "2025-05-25",
  },
  {
    id: "PC02",
    order: "PO-202505-022",
    batch: "B-202505-022",
    supplier: "中原材料",
    handler: "赵丽 · 采购科",
    qty: "30吨",
    accept: "合格",
    date: "2025-05-28",
  },
];

export const sandWarehouse = [
  {
    id: "WH01",
    batch: "B-202505-018",
    agv: "AGV-03",
    fromLocation: "验收月台 A",
    location: "1号仓 · A区-12 架",
    qty: "820袋",
    transit: "—",
    updatedAt: "2025-05-29",
  },
  {
    id: "WH02",
    batch: "B-202505-022",
    agv: "AGV-07",
    fromLocation: "验收月台 B",
    location: "转运中 → 2号仓 B区",
    qty: "300袋",
    transit: "→ 2号仓",
    updatedAt: "2025-05-29",
  },
];

export const sandSupplyRecords = [
  {
    id: "SU01",
    device: "移动上砂装置-01 · 3道上砂机-01",
    batch: "B-202505-018",
    plan: "G101 补给 · 3道",
    qty: "120袋",
    remain: "62%",
    status: "补给中",
  },
  {
    id: "SU02",
    device: "移动上砂装置-02",
    batch: "B-202505-022",
    plan: "G205 补给",
    qty: "80袋",
    remain: "78%",
    status: "待执行",
  },
];
