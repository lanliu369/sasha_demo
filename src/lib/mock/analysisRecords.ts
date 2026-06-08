/** 数据分析模块 · 明细级 Demo 数据（与 KPI / 钻取弹窗字段一致） */

export type VehicleSandAnalysisRecord = {
  id: string;
  time: string;
  train: string;
  km: string;
  scenario: string;
  amount: string;
  duration: string;
  model: string;
  adopted: "是" | "否";
  source: string;
  status: "正常" | "预警" | "异常";
};

export type StatsDetailRecord = {
  id: string;
  time: string;
  category: "撒砂作业" | "上砂作业" | "砂处理" | "检测记录";
  module: string;
  subject: string;
  summary: string;
  value: string;
  status: "成功" | "失败" | "重试";
};

export type AggregateBatchRecord = {
  id: string;
  time: string;
  pipeline: string;
  batch: string;
  source: string;
  target: string;
  records: number;
  result: string;
  status: "成功" | "失败" | "重试";
  /** 场景分类后的模型类型（非 ML 流水线可为 —） */
  modelType?: string;
  /** 路由目标训练数据集名称 */
  samplePool?: string;
};

export const vehicleSandAnalysisRecords: VehicleSandAnalysisRecord[] = [
  { id: "SA0001", time: "10:35:06", train: "G101", km: "K129+200", scenario: "上坡区段", amount: "0.8 kg", duration: "2.3s", model: "按图行车", adopted: "是", source: "NPU边缘节点-101", status: "正常" },
  { id: "SA0002", time: "10:34:58", train: "G101", km: "K129+180", scenario: "隧道入口", amount: "1.2 kg", duration: "3.1s", model: "极端工况", adopted: "是", source: "智能砂箱-G101", status: "正常" },
  { id: "SA0003", time: "10:34:51", train: "G101", km: "K128+960", scenario: "雨天场景", amount: "0.6 kg", duration: "1.8s", model: "极端工况", adopted: "是", source: "列控接口-G101", status: "正常" },
  { id: "SA0004", time: "10:34:44", train: "G205", km: "K045+320", scenario: "侧风区段", amount: "0.9 kg", duration: "2.0s", model: "按图行车", adopted: "是", source: "NPU边缘节点-205", status: "正常" },
  { id: "SA0005", time: "10:34:36", train: "G205", km: "K045+280", scenario: "空转预警", amount: "0.5 kg", duration: "1.5s", model: "自动纠正", adopted: "否", source: "车载主机-205", status: "预警" },
  { id: "SA0006", time: "10:34:28", train: "D308", km: "K201+110", scenario: "冰雪场景", amount: "1.0 kg", duration: "2.8s", model: "极端工况", adopted: "是", source: "NPU边缘节点-308", status: "正常" },
  { id: "SA0007", time: "10:34:19", train: "G101", km: "K128+720", scenario: "操作评价比对", amount: "0.7 kg", duration: "2.1s", model: "操作评价", adopted: "是", source: "智能砂箱-G101", status: "正常" },
  { id: "SA0008", time: "10:34:10", train: "G101", km: "K128+650", scenario: "迟撒检测", amount: "—", duration: "—", model: "操作评价", adopted: "否", source: "车载边缘平板-G101", status: "异常" },
  { id: "SA0009", time: "10:33:55", train: "G205", km: "K044+980", scenario: "空转预警", amount: "0.4 kg", duration: "1.2s", model: "自动纠正", adopted: "是", source: "智能砂箱-G205", status: "预警" },
  { id: "SA0010", time: "10:33:42", train: "D308", km: "K200+880", scenario: "未砂检测", amount: "0.0 kg", duration: "—", model: "操作评价", adopted: "否", source: "列控接口-D308", status: "异常" },
  { id: "SA0011", time: "10:33:28", train: "G101", km: "K128+420", scenario: "上坡区段", amount: "0.8 kg", duration: "2.4s", model: "按图行车", adopted: "是", source: "车载主机-101", status: "正常" },
  { id: "SA0012", time: "10:33:15", train: "G205", km: "K044+760", scenario: "过撒检测", amount: "1.1 kg", duration: "3.5s", model: "自动纠正", adopted: "否", source: "NPU边缘节点-205", status: "异常" },
  { id: "SA0013", time: "10:33:02", train: "D308", km: "K200+640", scenario: "隧道场景", amount: "0.6 kg", duration: "1.9s", model: "极端工况", adopted: "是", source: "智能砂箱-D308", status: "正常" },
  { id: "SA0014", time: "10:32:48", train: "G101", km: "K128+200", scenario: "空转预警", amount: "0.8 kg", duration: "2.0s", model: "自动纠正", adopted: "是", source: "车载主机-101", status: "预警" },
  { id: "SA0015", time: "10:32:30", train: "G205", km: "K044+520", scenario: "早撒检测", amount: "1.3 kg", duration: "4.0s", model: "操作评价", adopted: "否", source: "列控接口-G205", status: "异常" },
  { id: "SA0016", time: "10:32:12", train: "D308", km: "K200+400", scenario: "空转预警", amount: "0.5 kg", duration: "1.4s", model: "自动纠正", adopted: "是", source: "NPU边缘节点-308", status: "预警" },
  { id: "SA0017", time: "10:31:58", train: "G101", km: "K127+980", scenario: "按图行车", amount: "0.3 kg", duration: "1.0s", model: "按图行车", adopted: "是", source: "智能砂箱-G101", status: "正常" },
  { id: "SA0018", time: "10:31:40", train: "G205", km: "K044+300", scenario: "数据异常", amount: "12.6 kg", duration: "—", model: "—", adopted: "否", source: "车载主机-205", status: "异常" },
  { id: "SA0019", time: "10:31:22", train: "D308", km: "K200+180", scenario: "空转预警", amount: "0.9 kg", duration: "1.7s", model: "自动纠正", adopted: "是", source: "NPU边缘节点-308", status: "预警" },
  { id: "SA0020", time: "10:31:05", train: "G101", km: "K127+760", scenario: "影子控制", amount: "0.7 kg", duration: "2.2s", model: "自动纠正", adopted: "是", source: "车载主机-101", status: "正常" },
];

export const vehicleWarnRecords = vehicleSandAnalysisRecords.filter(
  (item) => item.status === "预警"
);

export const vehicleAnomalyRecords = vehicleSandAnalysisRecords.filter(
  (item) => item.status === "异常"
);

export const vehicleAdoptRecords = vehicleSandAnalysisRecords.filter(
  (item) => item.adopted === "否"
);

export const statsDetailRecords: StatsDetailRecord[] = [
  { id: "ST0001", time: "10:35:06", category: "撒砂作业", module: "车载设备", subject: "G101", summary: "K129+200 单次撒砂采集", value: "1 条", status: "成功" },
  { id: "ST0002", time: "10:34:50", category: "撒砂作业", module: "车载设备", subject: "G205", summary: "K045+320 侧风区段撒砂", value: "1 条", status: "成功" },
  { id: "ST0003", time: "10:34:30", category: "上砂作业", module: "移动上砂装置", subject: "上砂装置-01", summary: "G101 股道上砂进度回传", value: "1 次", status: "成功" },
  { id: "ST0004", time: "10:34:12", category: "上砂作业", module: "移动上砂装置", subject: "上砂装置-02", summary: "G205 补给作业启动", value: "1 次", status: "成功" },
  { id: "ST0005", time: "10:33:58", category: "砂处理", module: "智能砂处理装置", subject: "A线", summary: "砂仓转装批次 B-202505-018", value: "1 次", status: "成功" },
  { id: "ST0006", time: "10:33:40", category: "砂处理", module: "智能砂处理装置", subject: "B线", summary: "储砂罐计量上报", value: "1 次", status: "成功" },
  { id: "ST0007", time: "10:33:22", category: "检测记录", module: "砂品监测装置", subject: "检测仪-03", summary: "粒度抽检 · 合格", value: "1 条", status: "成功" },
  { id: "ST0008", time: "10:33:05", category: "检测记录", module: "砂品监测装置", subject: "检测仪-05", summary: "含水率复检", value: "1 条", status: "成功" },
  { id: "ST0009", time: "10:32:48", category: "撒砂作业", module: "车载设备", subject: "D308", summary: "K201+110 冰雪场景撒砂", value: "1 条", status: "成功" },
  { id: "ST0010", time: "10:32:30", category: "上砂作业", module: "移动上砂装置", subject: "上砂装置-01", summary: "G101 车地同步包", value: "1 次", status: "重试" },
  { id: "ST0011", time: "10:32:10", category: "砂处理", module: "智能砂处理装置", subject: "A线", summary: "全自动砂处理任务拆解", value: "1 次", status: "成功" },
  { id: "ST0012", time: "10:31:50", category: "撒砂作业", module: "车载设备", subject: "G101", summary: "模型推理回传 · 按图行车", value: "1 条", status: "成功" },
  { id: "ST0013", time: "10:31:30", category: "检测记录", module: "砂品监测装置", subject: "检测仪-03", summary: "杂质检测 · 合格", value: "1 条", status: "成功" },
  { id: "ST0014", time: "10:31:10", category: "上砂作业", module: "移动上砂装置", subject: "上砂装置-02", summary: "G205 上砂进度 68%", value: "1 次", status: "成功" },
  { id: "ST0015", time: "10:30:55", category: "砂处理", module: "智能砂处理装置", subject: "C线", summary: "砂仓存砂量检测", value: "1 次", status: "成功" },
  { id: "ST0016", time: "10:30:40", category: "撒砂作业", module: "车载设备", subject: "G205", summary: "空转预警关联撒砂", value: "1 条", status: "成功" },
  { id: "ST0017", time: "10:30:22", category: "检测记录", module: "砂品监测装置", subject: "检测仪-01", summary: "外观检测 · 合格", value: "1 条", status: "成功" },
  { id: "ST0018", time: "10:30:05", category: "上砂作业", module: "移动上砂装置", subject: "上砂装置-03", summary: "D308 待触发补给", value: "1 次", status: "成功" },
  { id: "ST0019", time: "10:29:48", category: "撒砂作业", module: "车载设备", subject: "G101", summary: "异常数据隔离 SC0014", value: "1 条", status: "失败" },
  { id: "ST0020", time: "10:29:30", category: "砂处理", module: "智能砂处理装置", subject: "A线", summary: "转装完成回传", value: "1 次", status: "成功" },
];

export const aggregateBatchRecords: AggregateBatchRecord[] = [
  { id: "AB0001", time: "10:35:12", pipeline: "车载撒砂 → 存储", batch: "BATCH-20250529-001", source: "车载设备", target: "训练样本池", records: 128, result: "JSON → 标准 Schema · 按场景分桶", status: "成功", modelType: "按图行车", samplePool: "撒砂样本集 v2.3" },
  { id: "AB0002", time: "10:34:58", pipeline: "车载撒砂 → 存储", batch: "BATCH-20250529-002", source: "车载设备", target: "训练样本池", records: 96, result: "JSON → 标准 Schema · 极端工况", status: "成功", modelType: "极端工况", samplePool: "极端工况样本" },
  { id: "AB0003", time: "10:34:40", pipeline: "检测数据 → 大屏", batch: "BATCH-20250529-003", source: "砂品监测", target: "中心大屏", records: 24, result: "字段映射完成", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0004", time: "10:34:22", pipeline: "调度计划 → 编排", batch: "BATCH-20250529-004", source: "调度中心", target: "任务编排", records: 6, result: "计划拆解成功", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0005", time: "10:34:05", pipeline: "设备状态 → 展示", batch: "BATCH-20250529-005", source: "各模块", target: "数据展示", records: 320, result: "状态聚合完成", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0006", time: "10:33:48", pipeline: "车载撒砂 → 存储", batch: "BATCH-20250529-006", source: "车载设备", target: "训练样本池", records: 112, result: "JSON → 标准 Schema · 操作评价", status: "成功", modelType: "操作评价", samplePool: "操作评价样本" },
  { id: "AB0007", time: "10:33:30", pipeline: "检测数据 → 大屏", batch: "BATCH-20250529-007", source: "砂品监测", target: "中心大屏", records: 18, result: "字段映射完成", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0008", time: "10:33:12", pipeline: "车载撒砂 → 存储", batch: "BATCH-20250529-008", source: "车载设备", target: "训练样本池", records: 84, result: "异常值过滤 · 2 条隔离", status: "重试", modelType: "自动纠正", samplePool: "自动纠正样本" },
  { id: "AB0009", time: "10:32:55", pipeline: "设备状态 → 展示", batch: "BATCH-20250529-009", source: "各模块", target: "数据展示", records: 280, result: "状态聚合完成", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0010", time: "10:32:38", pipeline: "调度计划 → 编排", batch: "BATCH-20250529-010", source: "调度中心", target: "任务编排", records: 4, result: "计划拆解成功", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0011", time: "10:32:20", pipeline: "车载撒砂 → 存储", batch: "BATCH-20250529-011", source: "车载设备", target: "训练样本池", records: 156, result: "JSON → 标准 Schema · 按图行车", status: "成功", modelType: "按图行车", samplePool: "撒砂样本集 v2.3" },
  { id: "AB0012", time: "10:32:02", pipeline: "检测数据 → 大屏", batch: "BATCH-20250529-012", source: "砂品监测", target: "中心大屏", records: 12, result: "字段映射失败", status: "失败", modelType: "—", samplePool: "—" },
  { id: "AB0013", time: "10:31:45", pipeline: "设备状态 → 展示", batch: "BATCH-20250529-013", source: "各模块", target: "数据展示", records: 410, result: "状态聚合完成", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0014", time: "10:31:28", pipeline: "车载撒砂 → 存储", batch: "BATCH-20250529-014", source: "车载设备", target: "训练样本池", records: 92, result: "JSON → 标准 Schema · 自动纠正", status: "成功", modelType: "自动纠正", samplePool: "自动纠正样本" },
  { id: "AB0015", time: "10:31:10", pipeline: "调度计划 → 编排", batch: "BATCH-20250529-015", source: "调度中心", target: "任务编排", records: 8, result: "计划拆解成功", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0016", time: "10:30:52", pipeline: "车载撒砂 → 存储", batch: "BATCH-20250529-016", source: "车载设备", target: "训练样本池", records: 104, result: "JSON → 标准 Schema · 极端工况", status: "成功", modelType: "极端工况", samplePool: "极端工况样本" },
  { id: "AB0017", time: "10:30:35", pipeline: "检测数据 → 大屏", batch: "BATCH-20250529-017", source: "砂品监测", target: "中心大屏", records: 20, result: "字段映射完成", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0018", time: "10:30:18", pipeline: "设备状态 → 展示", batch: "BATCH-20250529-018", source: "各模块", target: "数据展示", records: 360, result: "状态聚合完成", status: "成功", modelType: "—", samplePool: "—" },
  { id: "AB0019", time: "10:30:00", pipeline: "车载撒砂 → 存储", batch: "BATCH-20250529-019", source: "车载设备", target: "训练样本池", records: 88, result: "Schema 校验失败", status: "失败", modelType: "按图行车", samplePool: "撒砂样本集 v2.3" },
  { id: "AB0020", time: "10:29:42", pipeline: "车载撒砂 → 存储", batch: "BATCH-20250529-020", source: "车载设备", target: "训练样本池", records: 76, result: "JSON → 标准 Schema · 操作评价", status: "成功", modelType: "操作评价", samplePool: "操作评价样本" },
];

export const aggregateFailRecords = aggregateBatchRecords.filter(
  (item) => item.status === "失败" || item.status === "重试"
);

export const vehicleAnalysisColumns = [
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
] as const;

export const statsDetailColumns = [
  { title: "编号", dataIndex: "id", width: 80 },
  { title: "时间", dataIndex: "time", width: 80 },
  { title: "类型", dataIndex: "category", width: 90 },
  { title: "来源模块", dataIndex: "module", width: 120 },
  { title: "对象", dataIndex: "subject", width: 110 },
  { title: "摘要", dataIndex: "summary" },
  { title: "计量", dataIndex: "value", width: 70 },
  { title: "状态", dataIndex: "status", width: 70 },
] as const;

export const aggregateBatchColumns = [
  { title: "编号", dataIndex: "id", width: 80 },
  { title: "时间", dataIndex: "time", width: 80 },
  { title: "流水线", dataIndex: "pipeline" },
  { title: "批次", dataIndex: "batch", width: 160 },
  { title: "模型类型", dataIndex: "modelType", width: 90 },
  { title: "样本池", dataIndex: "samplePool", width: 130 },
  { title: "记录数", dataIndex: "records", width: 80 },
  { title: "转换结果", dataIndex: "result", width: 160 },
  { title: "状态", dataIndex: "status", width: 70 },
] as const;

/** 按 modelType 汇总已成功入池批次（Demo） */
export function sumAggregateIngestByPool() {
  const totals: Record<string, number> = {};
  aggregateBatchRecords.forEach((batch) => {
    if (batch.status !== "成功" || !batch.samplePool || batch.samplePool === "—") {
      return;
    }
    totals[batch.samplePool] = (totals[batch.samplePool] ?? 0) + batch.records;
  });
  return totals;
}
