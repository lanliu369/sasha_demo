export type FlowLink = {
  label: string;
  path: string;
  desc?: string;
};

/** 各页面关联跳转 — 对齐正式建设交互链路（Demo 仅跳转，功能可 Mock） */
export const flowLinksByPath: Record<string, FlowLink[]> = {
  "/": [
    { label: "调度中心对接", path: "/exchange/dispatch", desc: "上游计划接入" },
    { label: "调度总览", path: "/orchestration/overview", desc: "多工单并行" },
    { label: "系统智能调度", path: "/orchestration/smart-dispatch", desc: "计划排队" },
    { label: "快捷操作", path: "/dashboard/quick", desc: "高频入口" },
    { label: "实时告警", path: "/alert/realtime", desc: "异常监测" },
  ],
  "/dashboard/quick": [
    { label: "工作台", path: "/" },
    { label: "编排总览", path: "/orchestration/overview" },
    { label: "接口监控", path: "/exchange/monitor" },
  ],

  "/exchange/dispatch": [
    { label: "系统智能调度", path: "/orchestration/smart-dispatch", desc: "多计划排队" },
    { label: "调度总览", path: "/orchestration/overview", desc: "编排工单" },
    { label: "移动上砂对接", path: "/exchange/loading", desc: "装置状态与进度回传" },
    { label: "规则配置", path: "/alert/config?tab=orchestration", desc: "加砂计划触发" },
    { label: "全流程管控", path: "/orchestration/full-flow", desc: "单任务闭环" },
    { label: "作业进度", path: "/display/progress", desc: "可视化" },
    { label: "接口监控", path: "/exchange/monitor", desc: "通道健康" },
  ],
  "/exchange/vehicle": [
    { label: "车地信息同步", path: "/process/vehicle-sync", desc: "上砂协同" },
    { label: "车载数据分析", path: "/analysis/vehicle" },
    { label: "模型预测", path: "/model/predict" },
    { label: "模型部署", path: "/model/deploy" },
    { label: "上砂平台工单", path: "/orchestration/overview", desc: "工单池筛选" },
    { label: "数据存储追溯", path: "/storage/trace" },
  ],
  "/exchange/loading": [
    { label: "上砂平台工单", path: "/orchestration/overview", desc: "工单池筛选" },
    { label: "车地信息同步", path: "/process/vehicle-sync" },
    { label: "全流程管控", path: "/orchestration/full-flow" },
    { label: "作业进度", path: "/display/progress" },
    { label: "调度中心", path: "/exchange/dispatch" },
  ],
  "/exchange/processing": [
    { label: "砂处理平台工单", path: "/orchestration/overview", desc: "工单池筛选" },
    { label: "设备状态", path: "/display/device" },
    { label: "全流程管控", path: "/orchestration/full-flow" },
    { label: "数据汇聚", path: "/process/aggregate" },
  ],
  "/exchange/inspection": [
    { label: "数据汇聚", path: "/process/aggregate" },
    { label: "实时告警", path: "/alert/realtime" },
    { label: "大屏展示", path: "/display/screen" },
    { label: "训练数据集", path: "/analysis/training-data" },
  ],
  "/exchange/screen": [
    { label: "大屏预览", path: "/display/screen" },
    { label: "KPI 指标", path: "/display/kpi" },
    { label: "设备状态", path: "/display/device" },
    { label: "作业进度", path: "/display/progress" },
  ],
  "/exchange/mobile": [
    { label: "移动设备权限", path: "/system/mobile" },
    { label: "告警处置", path: "/alert/disposal" },
    { label: "调度总览", path: "/orchestration/overview" },
  ],
  "/exchange/monitor": [
    { label: "调度中心", path: "/exchange/dispatch" },
    { label: "车载设备", path: "/exchange/vehicle" },
    { label: "移动上砂", path: "/exchange/loading" },
    { label: "砂处理", path: "/exchange/processing" },
    { label: "接口管理", path: "/system/api" },
  ],

  "/orchestration/overview": [
    { label: "调度中心对接", path: "/exchange/dispatch" },
    { label: "系统智能调度", path: "/orchestration/smart-dispatch" },
    { label: "上砂任务下发", path: "/orchestration/loading-task", desc: "平台工单 → 移动上砂" },
    { label: "砂处理任务下发", path: "/orchestration/processing-task", desc: "平台工单 → 砂处理" },
    { label: "规则配置", path: "/alert/config?tab=orchestration" },
  ],
  "/orchestration/smart-dispatch": [
    { label: "调度中心对接", path: "/exchange/dispatch" },
    { label: "调度总览", path: "/orchestration/overview" },
    { label: "上砂任务下发", path: "/orchestration/loading-task", desc: "选择工单下发" },
    { label: "砂处理任务下发", path: "/orchestration/processing-task" },
    { label: "全流程管控", path: "/orchestration/full-flow" },
    { label: "规则配置", path: "/alert/config?tab=orchestration" },
  ],
  "/orchestration/loading-task": [
    { label: "调度总览", path: "/orchestration/overview" },
    { label: "移动上砂对接", path: "/exchange/loading", desc: "查看装置回传" },
    { label: "车地同步", path: "/process/vehicle-sync" },
    { label: "全流程管控", path: "/orchestration/full-flow" },
    { label: "作业进度", path: "/display/progress" },
  ],
  "/orchestration/processing-task": [
    { label: "调度总览", path: "/orchestration/overview" },
    { label: "砂处理对接", path: "/exchange/processing", desc: "查看装置回传" },
    { label: "设备状态", path: "/display/device" },
    { label: "全流程管控", path: "/orchestration/full-flow" },
  ],
  "/orchestration/full-flow": [
    { label: "调度中心", path: "/exchange/dispatch" },
    { label: "智能调度", path: "/orchestration/smart-dispatch" },
    { label: "联动处置", path: "/orchestration/linkage" },
    { label: "大屏展示", path: "/display/screen" },
    { label: "存储追溯", path: "/storage/trace" },
  ],
  "/orchestration/linkage": [
    { label: "告警处置", path: "/alert/disposal" },
    { label: "规则配置", path: "/alert/config?tab=linkage" },
    { label: "全流程管控", path: "/orchestration/full-flow" },
  ],
  "/orchestration/rules": [
    { label: "规则配置", path: "/alert/config?tab=orchestration" },
    { label: "调度中心", path: "/exchange/dispatch" },
    { label: "调度总览", path: "/orchestration/overview" },
    { label: "智能调度", path: "/orchestration/smart-dispatch" },
  ],

  "/display/screen": [
    { label: "大屏推送配置", path: "/exchange/screen" },
    { label: "设备状态", path: "/display/device" },
    { label: "KPI 指标", path: "/display/kpi" },
    { label: "作业进度", path: "/display/progress" },
  ],
  "/display/device": [
    { label: "设备台账", path: "/display/ledger" },
    { label: "故障追溯", path: "/display/fault" },
    { label: "接口监控", path: "/exchange/monitor" },
  ],
  "/display/progress": [
    { label: "调度总览", path: "/orchestration/overview" },
    { label: "全流程管控", path: "/orchestration/full-flow" },
    { label: "上砂对接", path: "/exchange/loading" },
  ],
  "/display/kpi": [
    { label: "大屏推送", path: "/exchange/screen" },
    { label: "报表分析", path: "/analysis/report" },
  ],
  "/display/fault": [
    { label: "告警追溯", path: "/alert/trace" },
    { label: "告警处置", path: "/alert/disposal" },
    { label: "设备台账", path: "/display/ledger" },
  ],
  "/display/ledger": [
    { label: "设备状态", path: "/display/device" },
    { label: "故障监测", path: "/display/fault" },
  ],

  "/process/vehicle-sync": [
    { label: "车载对接", path: "/exchange/vehicle" },
    { label: "上砂对接", path: "/exchange/loading" },
    { label: "上砂平台工单", path: "/orchestration/overview", desc: "工单池筛选" },
    { label: "处理规则", path: "/alert/config?tab=process" },
  ],
  "/process/aggregate": [
    { label: "检测对接", path: "/exchange/inspection" },
    { label: "数据归档", path: "/storage/archive" },
    { label: "处理规则", path: "/alert/config?tab=process" },
  ],
  "/process/rules": [
    { label: "规则配置", path: "/alert/config?tab=process" },
    { label: "数据汇聚", path: "/process/aggregate" },
    { label: "车地同步", path: "/process/vehicle-sync" },
  ],

  "/analysis/vehicle": [
    { label: "车载对接", path: "/exchange/vehicle" },
    { label: "训练数据集", path: "/analysis/training-data" },
    { label: "模型训练", path: "/model/train" },
  ],
  "/analysis/stats": [
    { label: "报表分析", path: "/analysis/report" },
    { label: "数据导出", path: "/storage/export" },
  ],
  "/analysis/report": [
    { label: "数据统计", path: "/analysis/stats" },
    { label: "KPI 展示", path: "/display/kpi" },
  ],
  "/analysis/training-data": [
    { label: "模型训练", path: "/model/train" },
    { label: "检测对接", path: "/exchange/inspection" },
  ],

  "/model/overview": [
    { label: "模型部署", path: "/model/deploy" },
    { label: "模型训练", path: "/model/train" },
    { label: "模型预测", path: "/model/predict" },
    { label: "模型评估", path: "/model/evaluate" },
    { label: "车载对接", path: "/exchange/vehicle" },
  ],
  "/model/deploy": [
    { label: "车载对接", path: "/exchange/vehicle" },
    { label: "模型预测", path: "/model/predict" },
    { label: "模型总览", path: "/model/overview" },
  ],
  "/model/train": [
    { label: "训练数据集", path: "/analysis/training-data" },
    { label: "模型总览", path: "/model/overview" },
  ],
  "/model/predict": [
    { label: "车载对接", path: "/exchange/vehicle" },
    { label: "车载分析", path: "/analysis/vehicle" },
    { label: "模型评估", path: "/model/evaluate" },
  ],
  "/model/evaluate": [
    { label: "模型预测", path: "/model/predict" },
    { label: "车载分析", path: "/analysis/vehicle" },
  ],

  "/lifecycle/supplier": [
    { label: "采购验收", path: "/lifecycle/procurement" },
    { label: "砂数据追溯", path: "/lifecycle/trace" },
    { label: "仓储转运", path: "/lifecycle/warehouse" },
    { label: "上砂补给", path: "/lifecycle/supply" },
  ],
  "/lifecycle/procurement": [
    { label: "供应商管理", path: "/lifecycle/supplier" },
    { label: "砂数据追溯", path: "/lifecycle/trace" },
    { label: "仓储转运", path: "/lifecycle/warehouse" },
  ],
  "/lifecycle/warehouse": [
    { label: "采购验收", path: "/lifecycle/procurement" },
    { label: "砂数据追溯", path: "/lifecycle/trace" },
    { label: "上砂补给", path: "/lifecycle/supply" },
    { label: "砂处理平台工单", path: "/orchestration/overview", desc: "工单池筛选" },
  ],
  "/lifecycle/supply": [
    { label: "砂数据追溯", path: "/lifecycle/trace" },
    { label: "上砂对接", path: "/exchange/loading" },
    { label: "仓储转运", path: "/lifecycle/warehouse" },
  ],
  "/lifecycle/trace": [
    { label: "供应商管理", path: "/lifecycle/supplier" },
    { label: "采购验收", path: "/lifecycle/procurement" },
    { label: "作业追溯", path: "/storage/trace" },
    { label: "车载分析", path: "/analysis/vehicle" },
  ],

  "/alert/realtime": [
    { label: "告警处置", path: "/alert/disposal" },
    { label: "告警追溯", path: "/alert/trace" },
    { label: "联动处置", path: "/orchestration/linkage" },
    { label: "规则配置", path: "/alert/config" },
  ],
  "/alert/disposal": [
    { label: "实时告警", path: "/alert/realtime" },
    { label: "告警追溯", path: "/alert/trace" },
    { label: "联动规则", path: "/alert/config?tab=linkage" },
    { label: "调度总览", path: "/orchestration/overview" },
  ],
  "/alert/trace": [
    { label: "实时告警", path: "/alert/realtime" },
    { label: "故障监测", path: "/display/fault" },
    { label: "存储追溯", path: "/storage/trace" },
  ],
  "/alert/rules": [
    { label: "联动处置", path: "/orchestration/linkage" },
    { label: "规则配置", path: "/alert/config" },
  ],
  "/alert/config": [
    { label: "实时告警", path: "/alert/realtime" },
    { label: "告警处置", path: "/alert/disposal" },
    { label: "移动端推送", path: "/exchange/mobile" },
    { label: "大屏推送", path: "/exchange/screen" },
  ],

  "/storage/archive": [
    { label: "数据导出", path: "/storage/export" },
    { label: "全链路追溯", path: "/storage/trace" },
  ],
  "/storage/export": [
    { label: "数据归档", path: "/storage/archive" },
    { label: "报表分析", path: "/analysis/report" },
  ],
  "/storage/trace": [
    { label: "全流程管控", path: "/orchestration/full-flow" },
    { label: "车载对接", path: "/exchange/vehicle" },
  ],

  "/system/users": [
    { label: "角色权限", path: "/system/roles" },
    { label: "移动权限", path: "/system/mobile" },
  ],
  "/system/roles": [
    { label: "用户管理", path: "/system/users" },
    { label: "移动权限", path: "/system/mobile" },
  ],
  "/system/mobile": [
    { label: "移动端推送", path: "/exchange/mobile" },
    { label: "角色权限", path: "/system/roles" },
  ],
  "/system/params": [
    { label: "接口管理", path: "/system/api" },
    { label: "规则配置", path: "/alert/config?tab=orchestration" },
  ],
  "/system/api": [
    { label: "接口监控", path: "/exchange/monitor" },
    { label: "调度中心", path: "/exchange/dispatch" },
  ],
  "/system/logs": [
    { label: "告警追溯", path: "/alert/trace" },
    { label: "存储追溯", path: "/storage/trace" },
  ],
  "/system/maintenance": [
    { label: "系统参数", path: "/system/params" },
    { label: "接口管理", path: "/system/api" },
  ],
};

/** 数据交互页 · 实时字段级跳转 */
export const exchangeFieldLinks: Record<string, Record<string, FlowLink>> = {
  dispatch: {
    加砂计划: { label: "去智能调度", path: "/orchestration/smart-dispatch" },
    进站信息: { label: "看作业进度", path: "/display/progress" },
  },
  loading: {
    设备状态: { label: "设备监测", path: "/display/device" },
    当前任务: { label: "平台工单", path: "/orchestration/overview" },
    作业进度: { label: "进度展示", path: "/display/progress" },
    车地同步: { label: "同步处理", path: "/process/vehicle-sync" },
  },
  vehicle: {
    运行图区段: { label: "车载分析", path: "/analysis/vehicle" },
    砂箱余量: { label: "模型预测", path: "/model/predict" },
  },
  processing: {
    当前任务: { label: "平台工单", path: "/orchestration/overview" },
  },
  inspection: {
    最近检测: { label: "数据汇聚", path: "/process/aggregate" },
  },
  supply: {
    计划: { label: "上砂对接", path: "/exchange/loading" },
  },
};

export function getFlowLinks(path: string): FlowLink[] {
  return flowLinksByPath[path] ?? [];
}

export function getExchangeFieldLink(
  moduleKey: string,
  fieldLabel: string
): FlowLink | undefined {
  return exchangeFieldLinks[moduleKey]?.[fieldLabel];
}
