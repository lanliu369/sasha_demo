import type { SandLifecycleBatch } from "@/lib/types/demo";

/** 砂批次全生命周期追溯 · 设备/子系统上报汇聚至平台存储 */
export const sandLifecycleBatches: SandLifecycleBatch[] = [
  {
    batchId: "SLB-018",
    sandBatch: "B-202505-018",
    supplier: "华北砂业",
    currentStage: "撒砂执行",
    status: "已撒砂",
    relatedTrain: "G101",
    stages: [
      {
        key: "procurement",
        label: "采购与验收",
        time: "2025-05-25 14:20",
        status: "已完成",
        uploadSource: "采购验收子系统",
        details: [
          { label: "供应商", value: "华北砂业（SP01 · A级）" },
          { label: "对接员工", value: "张明 · 采购科" },
          { label: "采购单", value: "PO-202505-018" },
          { label: "验收结果", value: "合格 · 50吨 / 1000袋" },
          { label: "验收员", value: "李检测 · 质检科" },
        ],
      },
      {
        key: "warehouse",
        label: "AGV 入库转运",
        time: "2025-05-25 16:45",
        status: "已完成",
        uploadSource: "仓储转运子系统 · AGV-03",
        details: [
          { label: "AGV 编号", value: "AGV-03" },
          { label: "起点", value: "验收月台 A · 卸货区" },
          { label: "存放库位", value: "1号仓 · A区-12 架" },
          { label: "在库数量", value: "820袋" },
          { label: "仓储员", value: "王仓管 · 物资科" },
        ],
      },
      {
        key: "loading",
        label: "上砂至撒砂设备",
        time: "2025-05-29 10:28",
        status: "已完成",
        uploadSource: "移动上砂装置 · 3道上砂机-01",
        details: [
          { label: "上砂装置", value: "移动上砂装置-01" },
          { label: "站台/股道", value: "3道 · G101 进站" },
          { label: "目标设备", value: "G101 车载砂箱 · 主机-101" },
          { label: "补给量", value: "120袋" },
          { label: "操作员", value: "调度员 · 运调中心" },
        ],
      },
      {
        key: "spreading",
        label: "撒砂作业执行",
        time: "2025-05-29 10:32 ~ 10:38",
        status: "已完成",
        uploadSource: "车载设备 · 主机-101",
        details: [
          { label: "列车", value: "G101 · CR400AF-101" },
          { label: "撒砂区段", value: "K128+400 ~ K130+200" },
          { label: "场景", value: "3道进站 · 上坡区段" },
          { label: "撒砂量", value: "约 86kg · 4次触发" },
          { label: "模型建议", value: "按图行车 v2.3.1 · 合规" },
        ],
      },
    ],
  },
  {
    batchId: "SLB-022",
    sandBatch: "B-202505-022",
    supplier: "中原材料",
    currentStage: "AGV 入库转运",
    status: "在库",
    relatedTrain: "G205",
    stages: [
      {
        key: "procurement",
        label: "采购与验收",
        time: "2025-05-28 09:10",
        status: "已完成",
        uploadSource: "采购验收子系统",
        details: [
          { label: "供应商", value: "中原材料（SP02 · B级）" },
          { label: "对接员工", value: "赵丽 · 采购科" },
          { label: "采购单", value: "PO-202505-022" },
          { label: "验收结果", value: "合格 · 30吨 / 600袋" },
          { label: "验收员", value: "陈检测 · 质检科" },
        ],
      },
      {
        key: "warehouse",
        label: "AGV 入库转运",
        time: "2025-05-28 11:30",
        status: "进行中",
        uploadSource: "仓储转运子系统 · AGV-07",
        details: [
          { label: "AGV 编号", value: "AGV-07" },
          { label: "起点", value: "验收月台 B" },
          { label: "目标库位", value: "2号仓 · B区-05 架（转运中）" },
          { label: "在途数量", value: "300袋" },
          { label: "仓储员", value: "刘仓管 · 物资科" },
        ],
      },
      {
        key: "loading",
        label: "上砂至撒砂设备",
        time: "—",
        status: "待执行",
        uploadSource: "移动上砂装置（待上报）",
        details: [
          { label: "计划装置", value: "移动上砂装置-02" },
          { label: "计划列车", value: "G205" },
          { label: "计划补给", value: "80袋" },
        ],
      },
      {
        key: "spreading",
        label: "撒砂作业执行",
        time: "—",
        status: "待执行",
        uploadSource: "车载设备（待上报）",
        details: [{ label: "状态", value: "等待上砂完成" }],
      },
    ],
  },
  {
    batchId: "SLB-029",
    sandBatch: "#029",
    supplier: "华北砂业",
    currentStage: "上砂补给",
    status: "已上砂",
    relatedTrain: "G101",
    stages: [
      {
        key: "procurement",
        label: "采购与验收",
        time: "2025-05-20 08:00",
        status: "已完成",
        uploadSource: "采购验收子系统",
        details: [
          { label: "供应商", value: "华北砂业" },
          { label: "对接员工", value: "张明 · 采购科" },
          { label: "采购单", value: "PO-202505-010" },
          { label: "验收结果", value: "合格" },
        ],
      },
      {
        key: "warehouse",
        label: "AGV 入库转运",
        time: "2025-05-20 10:15",
        status: "已完成",
        uploadSource: "仓储转运子系统 · AGV-01",
        details: [
          { label: "AGV 编号", value: "AGV-01" },
          { label: "存放库位", value: "1号仓 · C区-08 架" },
          { label: "在库数量", value: "500袋" },
        ],
      },
      {
        key: "loading",
        label: "上砂至撒砂设备",
        time: "2025-05-29 10:30",
        status: "已完成",
        uploadSource: "移动上砂装置 · 3道上砂机-01",
        details: [
          { label: "上砂装置", value: "移动上砂装置-01" },
          { label: "站台/股道", value: "3道" },
          { label: "目标设备", value: "G101 车载砂箱" },
          { label: "进度", value: "72%" },
        ],
      },
      {
        key: "spreading",
        label: "撒砂作业执行",
        time: "—",
        status: "待执行",
        uploadSource: "车载设备（待上报）",
        details: [{ label: "状态", value: "上砂完成后开始采集" }],
      },
    ],
  },
];

export function getSandLifecycleBatch(batchId: string): SandLifecycleBatch | undefined {
  return sandLifecycleBatches.find(
    (item) =>
      item.batchId === batchId ||
      item.sandBatch === batchId ||
      item.relatedTrain === batchId,
  );
}

export function searchSandLifecycleBatches(keyword: string): SandLifecycleBatch[] {
  const q = keyword.trim().toLowerCase();
  if (!q) return sandLifecycleBatches;
  return sandLifecycleBatches.filter(
    (item) =>
      item.batchId.toLowerCase().includes(q) ||
      item.sandBatch.toLowerCase().includes(q) ||
      item.supplier.toLowerCase().includes(q) ||
      item.relatedTrain?.toLowerCase().includes(q) ||
      item.stages.some((stage) =>
        stage.details.some(
          (d) =>
            d.label.toLowerCase().includes(q) ||
            d.value.toLowerCase().includes(q),
        ),
      ),
  );
}

export function getSandLifecycleBatchOptions() {
  return sandLifecycleBatches.map((item) => ({
    value: item.batchId,
    label: `${item.sandBatch} · ${item.supplier} · ${item.status}`,
  }));
}
